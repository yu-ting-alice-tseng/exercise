/**
 * 學習紀錄：存在瀏覽器的 localStorage。
 * - q：每一題的作答統計與間隔複習（Leitner 卡片盒）狀態
 * - s：每一次「檢查答案」的練習紀錄（時間、題數、答對數）
 */
import type { Level } from "./types";

const KEY = "french-quiz:progress:v1";
const EVENT = "french-quiz:progress";
const MAX_SESSIONS = 1000;
const DAY = 86_400_000;

export type Result = "c" | "a" | "w"; // 答對、差一點（重音）、答錯

export interface QStat {
  /** 作答次數 */
  n: number;
  /** 答對次數 */
  ok: number;
  /** 卡片盒：1～5 需要複習，6 代表已掌握 */
  box: number;
  /** 下次複習時間（毫秒） */
  due: number;
  /** 最後一次作答時間 */
  last: number;
  /** 最後一次結果 */
  r: Result;
  /** 答錯（含差一點）的總次數 */
  miss: number;
}

export interface SessionRec {
  id: string;
  at: number;
  /** 實際作答秒數（畫面開著且有操作的時間） */
  sec: number;
  kind: "practice" | "review";
  level?: Level;
  title: string;
  /** 每一題的結果 */
  res: Record<string, Result>;
  /** 每一題對應的文法點，供統計用 */
  g: Record<string, string>;
}

export interface Progress {
  v: 1;
  q: Record<string, QStat>;
  s: SessionRec[];
}

export const MASTERED = 6;
/** 進入下一個盒子後，隔幾天再複習 */
const INTERVAL_DAYS: Record<number, number> = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 };

const empty = (): Progress => ({ v: 1, q: {}, s: [] });

/* ===== 讀寫 ===== */

export function progressSnapshot(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function subscribeProgress(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

export function parseProgress(raw: string | null): Progress {
  try {
    const p = raw ? (JSON.parse(raw) as Progress) : null;
    if (p && p.v === 1 && p.q && Array.isArray(p.s)) return p;
  } catch {}
  return empty();
}

function load(): Progress {
  return parseProgress(progressSnapshot());
}

function save(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // 儲存空間已滿或被封鎖時略過
  }
}

/* ===== 卡片盒排程 ===== */

/** 依照作答前的狀態和這次的結果，算出新的狀態 */
function schedule(prev: QStat | undefined, r: Result, now: number): QStat {
  const base: QStat = prev ?? { n: 0, ok: 0, box: 0, due: 0, last: 0, r: "c", miss: 0 };
  const next: QStat = {
    ...base,
    n: base.n + 1,
    ok: base.ok + (r === "c" ? 1 : 0),
    miss: base.miss + (r === "c" ? 0 : 1),
    last: now,
    r,
  };
  if (r === "w") {
    // 答錯：回到第一盒，今天就要複習
    next.box = 1;
    next.due = now;
  } else if (r === "a") {
    // 只差重音：留在原本的盒子（至少第一盒），明天再複習
    next.box = Math.max(1, Math.min(base.box || 1, 5));
    next.due = now + DAY;
  } else if (!prev || base.box === 0) {
    // 第一次就答對：視為已掌握，不排入複習
    next.box = MASTERED;
    next.due = 0;
  } else if (base.box >= MASTERED) {
    next.box = MASTERED;
    next.due = 0;
  } else {
    next.box = base.box + 1;
    next.due = next.box >= MASTERED ? 0 : now + INTERVAL_DAYS[next.box] * DAY;
  }
  return next;
}

/* ===== 對外的操作 ===== */

export interface AnswerInput {
  id: string;
  grammar: string;
  result: Result;
}

/**
 * 記錄一次「檢查答案」。回傳 sessionId 和作答前的狀態，
 * 之後學生按「算我答對」時，可以從作答前的狀態重新計算。
 */
export function recordSession(
  meta: { kind: SessionRec["kind"]; level?: Level; title: string; sec: number },
  answers: AnswerInput[],
): { sessionId: string; prev: Record<string, QStat | undefined> } {
  const p = load();
  const now = Date.now();
  const prev: Record<string, QStat | undefined> = {};
  const res: Record<string, Result> = {};
  const g: Record<string, string> = {};
  for (const a of answers) {
    prev[a.id] = p.q[a.id];
    p.q[a.id] = schedule(p.q[a.id], a.result, now);
    res[a.id] = a.result;
    g[a.id] = a.grammar;
  }
  const sessionId = `${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  p.s.push({ id: sessionId, at: now, sec: meta.sec, kind: meta.kind, level: meta.level, title: meta.title, res, g });
  if (p.s.length > MAX_SESSIONS) p.s = p.s.slice(-MAX_SESSIONS);
  save(p);
  return { sessionId, prev };
}

/** 修改某一題這次的結果（例如「我的寫法也正確」、簡答自評） */
export function updateAnswer(sessionId: string, id: string, grammar: string, result: Result, prev: QStat | undefined) {
  const p = load();
  const s = p.s.find((x) => x.id === sessionId);
  if (!s) return;
  s.res[id] = result;
  s.g[id] = grammar;
  p.q[id] = schedule(prev, result, s.at);
  save(p);
}

/** 把題目移出錯題本（標記為已掌握） */
export function markMastered(id: string) {
  const p = load();
  const q = p.q[id];
  if (!q) return;
  p.q[id] = { ...q, box: MASTERED, due: 0 };
  save(p);
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVENT));
  } catch {}
}

export function exportProgress(): string {
  return JSON.stringify(load(), null, 0);
}

/** 匯入備份：同一題保留最後作答時間較新的紀錄，練習紀錄依 id 合併 */
export function importProgress(json: string): { questions: number; sessions: number } {
  const incoming = parseProgress(json);
  if (Object.keys(incoming.q).length === 0 && incoming.s.length === 0) throw new Error("empty");
  const p = load();
  for (const [id, st] of Object.entries(incoming.q)) {
    if (!p.q[id] || p.q[id].last < st.last) p.q[id] = st;
  }
  const known = new Set(p.s.map((s) => s.id));
  for (const s of incoming.s) if (!known.has(s.id)) p.s.push(s);
  p.s.sort((a, b) => a.at - b.at);
  if (p.s.length > MAX_SESSIONS) p.s = p.s.slice(-MAX_SESSIONS);
  save(p);
  return { questions: Object.keys(incoming.q).length, sessions: incoming.s.length };
}

/* ===== 查詢 ===== */

export function isInReview(st: QStat) {
  return st.box >= 1 && st.box < MASTERED;
}

export function dueIds(p: Progress, now = Date.now()): string[] {
  return Object.entries(p.q)
    .filter(([, st]) => isInReview(st) && st.due <= endOfToday(now))
    .sort((a, b) => a[1].due - b[1].due)
    .map(([id]) => id);
}

export function reviewIds(p: Progress): string[] {
  return Object.entries(p.q)
    .filter(([, st]) => isInReview(st))
    .sort((a, b) => b[1].miss - a[1].miss || a[1].due - b[1].due)
    .map(([id]) => id);
}

/* ===== 日期工具（以使用者當地時間為準） ===== */

export function dayKey(t: number): string {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function startOfDay(t: number): number {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function endOfToday(now = Date.now()): number {
  return startOfDay(now) + DAY - 1;
}

export interface DayStat {
  sec: number;
  answered: number;
  correct: number;
  sessions: number;
}

export function byDay(p: Progress): Map<string, DayStat> {
  const map = new Map<string, DayStat>();
  for (const s of p.s) {
    const k = dayKey(s.at);
    const d = map.get(k) ?? { sec: 0, answered: 0, correct: 0, sessions: 0 };
    const results = Object.values(s.res);
    d.sec += s.sec;
    d.answered += results.length;
    d.correct += results.filter((r) => r === "c").length;
    d.sessions += 1;
    map.set(k, d);
  }
  return map;
}

/** 連續學習天數：今天還沒練習時，從昨天往回算 */
export function streak(days: Map<string, DayStat>, now = Date.now()): number {
  let t = startOfDay(now);
  if (!days.has(dayKey(t))) t -= DAY;
  let n = 0;
  while (days.has(dayKey(t))) {
    n++;
    t -= DAY;
  }
  return n;
}

export { DAY };

/** 讀取單一題目目前的狀態（用於簡答自評前保存原狀態） */
export function getStat(id: string): QStat | undefined {
  return load().q[id];
}
