"use client";

import { useSyncExternalStore } from "react";
import { getAuth } from "./auth";
import {
  DIRTY_EVENT,
  loadDirty,
  loadProgress,
  mergeProgress,
  replaceProgress,
  saveDirty,
  clearProgress,
  type Progress,
  type QStat,
  type SessionRec,
} from "./progress";
import { supabase } from "./supabase";
import type { Level } from "./types";

/**
 * 學習紀錄的雲端同步。
 * - 登入時：下載雲端紀錄，和本機合併；本機比較新的部分上傳。
 * - 之後：每次練習完，把變動的部分在幾秒內上傳。
 * - 本機紀錄屬於哪個帳號記在 OWNER_KEY；換帳號登入時，不會把上一個人的紀錄混進來。
 */

const OWNER_KEY = "french-quiz:owner";
const PAGE = 1000;
const CHUNK = 500;

export interface SyncState {
  status: "idle" | "syncing" | "error";
  lastSynced: number | null;
  message: string | null;
}

let state: SyncState = { status: "idle", lastSynced: null, message: null };
const listeners = new Set<() => void>();
function set(next: Partial<SyncState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

export function useSync(): SyncState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => state,
  );
}

/* ===== 資料格式轉換 ===== */

interface StatRow extends QStat {
  question_id: string;
}
interface SessionRow {
  id: string;
  at: string;
  sec: number;
  kind: SessionRec["kind"];
  level: Level | null;
  title: string;
  res: SessionRec["res"];
  g: SessionRec["g"];
}

const toStatRow = (id: string, s: QStat, user_id: string) => ({
  user_id,
  question_id: id,
  n: s.n,
  ok: s.ok,
  miss: s.miss,
  box: s.box,
  due: Math.round(s.due),
  last: Math.round(s.last),
  r: s.r,
});

const toSessionRow = (s: SessionRec, user_id: string) => ({
  user_id,
  id: s.id,
  at: new Date(s.at).toISOString(),
  sec: Math.min(Math.max(Math.round(s.sec), 0), 86400),
  kind: s.kind,
  level: s.level ?? null,
  title: s.title.slice(0, 200),
  res: s.res,
  g: s.g,
});

const fromSessionRow = (r: SessionRow): SessionRec => ({
  id: r.id,
  at: new Date(r.at).getTime(),
  sec: r.sec,
  kind: r.kind,
  level: r.level ?? undefined,
  title: r.title,
  res: r.res ?? {},
  g: r.g ?? {},
});

/* ===== 下載與上傳 ===== */

async function fetchRemote(userId: string): Promise<Progress> {
  const sb = supabase()!;
  const q: Record<string, QStat> = {};
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from("question_stats")
      .select("question_id, n, ok, miss, box, due, last, r")
      .eq("user_id", userId)
      .range(from, from + PAGE - 1);
    if (error) throw error;
    for (const r of data as StatRow[]) {
      q[r.question_id] = { n: r.n, ok: r.ok, miss: r.miss, box: r.box, due: Number(r.due), last: Number(r.last), r: r.r };
    }
    if (!data || data.length < PAGE) break;
  }
  const { data, error } = await sb
    .from("sessions")
    .select("id, at, sec, kind, level, title, res, g")
    .eq("user_id", userId)
    .order("at", { ascending: false })
    .limit(PAGE);
  if (error) throw error;
  const s = (data as SessionRow[]).map(fromSessionRow).sort((a, b) => a.at - b.at);
  return { v: 1, q, s };
}

async function upload(userId: string, ids: { q: string[]; s: string[] }, p: Progress) {
  const sb = supabase()!;
  const stats = ids.q.filter((id) => p.q[id]).map((id) => toStatRow(id, p.q[id], userId));
  const byId = new Map(p.s.map((s) => [s.id, s]));
  const sessions = ids.s.filter((id) => byId.has(id)).map((id) => toSessionRow(byId.get(id)!, userId));
  for (let i = 0; i < stats.length; i += CHUNK) {
    const { error } = await sb.from("question_stats").upsert(stats.slice(i, i + CHUNK));
    if (error) throw error;
  }
  for (let i = 0; i < sessions.length; i += CHUNK) {
    const { error } = await sb.from("sessions").upsert(sessions.slice(i, i + CHUNK));
    if (error) throw error;
  }
}

/* ===== 對外的操作 ===== */

let running: Promise<void> | null = null;

/** 登入後的完整同步（下載、合併、上傳） */
export function fullSync(): Promise<void> {
  if (running) return running;
  running = (async () => {
    const { user } = getAuth();
    if (!user || !supabase()) return;
    set({ status: "syncing", message: null });
    try {
      const remote = await fetchRemote(user.id);
      let owner: string | null = null;
      try {
        owner = localStorage.getItem(OWNER_KEY);
      } catch {}
      // 本機紀錄屬於另一個帳號：不合併，直接換成這個帳號的雲端紀錄
      const local = owner && owner !== user.id ? { v: 1 as const, q: {}, s: [] } : loadProgress();
      const pending = owner === user.id ? loadDirty() : { q: [], s: [] };
      const { merged, upload: up } = mergeProgress(local, remote);
      const toUpload = { q: [...new Set([...up.q, ...pending.q])], s: [...new Set([...up.s, ...pending.s])] };
      replaceProgress(merged);
      try {
        localStorage.setItem(OWNER_KEY, user.id);
      } catch {}
      saveDirty(toUpload);
      await upload(user.id, toUpload, merged);
      saveDirty(subtract(loadDirty(), toUpload));
      set({ status: "idle", lastSynced: Date.now() });
    } catch (e) {
      set({ status: "error", message: errorText(e) });
    } finally {
      running = null;
    }
  })();
  return running;
}

/** 只上傳還沒上傳的變更 */
export async function pushChanges() {
  const { user } = getAuth();
  if (!user || !supabase() || running) return;
  let owner: string | null = null;
  try {
    owner = localStorage.getItem(OWNER_KEY);
  } catch {}
  if (owner !== user.id) return fullSync();
  const dirty = loadDirty();
  if (dirty.q.length === 0 && dirty.s.length === 0) return;
  set({ status: "syncing", message: null });
  try {
    await upload(user.id, dirty, loadProgress());
    saveDirty(subtract(loadDirty(), dirty));
    set({ status: "idle", lastSynced: Date.now() });
  } catch (e) {
    set({ status: "error", message: errorText(e) });
  }
}

/** 登出：清掉本機紀錄（已經存在雲端），避免共用裝置時被下一個人看到 */
export async function signOutAndClear(signOut: () => Promise<void>) {
  await pushChanges();
  await signOut();
  clearProgress();
  try {
    localStorage.removeItem(OWNER_KEY);
  } catch {}
  set({ status: "idle", lastSynced: null, message: null });
}

/** 刪除雲端上這個帳號的所有學習紀錄 */
export async function deleteCloudProgress() {
  const { user } = getAuth();
  const sb = supabase();
  if (!user || !sb) return;
  const a = await sb.from("sessions").delete().eq("user_id", user.id);
  if (a.error) throw a.error;
  const b = await sb.from("question_stats").delete().eq("user_id", user.id);
  if (b.error) throw b.error;
}

function subtract(a: { q: string[]; s: string[] }, b: { q: string[]; s: string[] }) {
  const bq = new Set(b.q);
  const bs = new Set(b.s);
  return { q: a.q.filter((x) => !bq.has(x)), s: a.s.filter((x) => !bs.has(x)) };
}

function errorText(e: unknown): string {
  if (typeof navigator !== "undefined" && !navigator.onLine) return "目前離線，連上網路後會自動同步。";
  return e instanceof Error ? e.message : "同步失敗";
}

/* ===== 自動同步 ===== */

let started = false;
let timer: number | undefined;

/** 在整個網站只啟動一次：有變動時延遲幾秒上傳，離開頁面前也上傳 */
export function startAutoSync() {
  if (started || typeof window === "undefined") return;
  started = true;
  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(pushChanges, 3000);
  };
  window.addEventListener(DIRTY_EVENT, schedule);
  window.addEventListener("online", schedule);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") pushChanges();
  });
}
