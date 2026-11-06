"use client";

import { getAuth } from "./auth";
import type { QStat, SessionRec } from "./progress";
import { supabase } from "./supabase";
import type { Level } from "./types";

export interface ClassRow {
  id: string;
  name: string;
  join_code: string;
  teacher_id: string;
  created_at: string;
}

export interface JoinedClass {
  id: string;
  name: string;
  teacherName: string;
  joinedAt: string;
}

export interface Member {
  userId: string;
  name: string;
  joinedAt: string;
  sessions: SessionRec[];
  stats: Record<string, QStat>;
}

function sb() {
  const c = supabase();
  if (!c) throw new Error("cloud disabled");
  return c;
}

function uid() {
  const id = getAuth().user?.id;
  if (!id) throw new Error("not signed in");
  return id;
}

/** 我開的班級（附學生人數） */
export async function myClasses(): Promise<(ClassRow & { members: number })[]> {
  const { data, error } = await sb()
    .from("classes")
    .select("id, name, join_code, teacher_id, created_at, class_members(count)")
    .eq("teacher_id", uid())
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((c) => {
    const row = c as unknown as ClassRow & { class_members: { count: number }[] };
    return { ...row, members: row.class_members?.[0]?.count ?? 0 };
  });
}

export async function createClass(name: string): Promise<ClassRow> {
  const { data, error } = await sb()
    .from("classes")
    .insert({ name: name.trim().slice(0, 60) })
    .select("id, name, join_code, teacher_id, created_at")
    .single();
  if (error) throw error;
  return data as ClassRow;
}

export async function renameClass(id: string, name: string) {
  const { error } = await sb().from("classes").update({ name: name.trim().slice(0, 60) }).eq("id", id);
  if (error) throw error;
}

export async function deleteClass(id: string) {
  const { error } = await sb().from("classes").delete().eq("id", id);
  if (error) throw error;
}

export async function regenerateCode(id: string): Promise<string> {
  const { data, error } = await sb().rpc("regenerate_join_code", { cid: id });
  if (error) throw error;
  return data as string;
}

export async function joinClass(code: string): Promise<{ class_id: string; class_name: string }> {
  const { data, error } = await sb().rpc("join_class", { code: code.trim().toUpperCase() });
  if (error) throw new Error(error.message.includes("invalid join code") ? "找不到這個加入代碼，請確認後再試一次。" : error.message);
  const row = (data as { class_id: string; class_name: string }[])[0];
  return row;
}

export async function leaveClass(classId: string) {
  const { error } = await sb().from("class_members").delete().eq("class_id", classId).eq("user_id", uid());
  if (error) throw error;
}

export async function removeMember(classId: string, userId: string) {
  const { error } = await sb().from("class_members").delete().eq("class_id", classId).eq("user_id", userId);
  if (error) throw error;
}

/** 我加入的班級（附老師名字） */
export async function joinedClasses(): Promise<JoinedClass[]> {
  const me = uid();
  const { data, error } = await sb()
    .from("class_members")
    .select("joined_at, classes(id, name, teacher_id)")
    .eq("user_id", me);
  if (error) throw error;
  const rows = (data ?? []) as unknown as { joined_at: string; classes: { id: string; name: string; teacher_id: string } | null }[];
  const teacherIds = [...new Set(rows.map((r) => r.classes?.teacher_id).filter(Boolean))] as string[];
  const names = await profileNames(teacherIds);
  return rows
    .filter((r) => r.classes)
    .map((r) => ({
      id: r.classes!.id,
      name: r.classes!.name,
      teacherName: names.get(r.classes!.teacher_id) || "老師",
      joinedAt: r.joined_at,
    }));
}

async function profileNames(ids: string[]): Promise<Map<string, string>> {
  if (ids.length === 0) return new Map();
  const { data, error } = await sb().from("profiles").select("id, display_name").in("id", ids);
  if (error) throw error;
  return new Map((data ?? []).map((p) => [p.id as string, p.display_name as string]));
}

/** 班級詳細資料：成員、近 since 毫秒內的練習紀錄、每題統計 */
export async function classDetail(classId: string, since: number): Promise<{ cls: ClassRow; members: Member[] }> {
  const c = sb();
  const { data: cls, error: e1 } = await c
    .from("classes")
    .select("id, name, join_code, teacher_id, created_at")
    .eq("id", classId)
    .single();
  if (e1) throw e1;
  const { data: mem, error: e2 } = await c.from("class_members").select("user_id, joined_at").eq("class_id", classId);
  if (e2) throw e2;
  const ids = (mem ?? []).map((m) => m.user_id as string);
  const names = await profileNames(ids);
  const members = new Map<string, Member>(
    (mem ?? []).map((m) => [
      m.user_id as string,
      { userId: m.user_id as string, name: names.get(m.user_id as string) ?? "", joinedAt: m.joined_at as string, sessions: [], stats: {} },
    ]),
  );
  if (ids.length > 0) {
    for (let from = 0; from < 20000; from += 1000) {
      const { data, error } = await c
        .from("sessions")
        .select("user_id, id, at, sec, kind, level, title, res, g")
        .in("user_id", ids)
        .gte("at", new Date(since).toISOString())
        .order("at", { ascending: true })
        .range(from, from + 999);
      if (error) throw error;
      for (const r of data ?? []) {
        members.get(r.user_id as string)?.sessions.push({
          id: r.id as string,
          at: new Date(r.at as string).getTime(),
          sec: r.sec as number,
          kind: r.kind as SessionRec["kind"],
          level: (r.level as Level | null) ?? undefined,
          title: r.title as string,
          res: (r.res ?? {}) as SessionRec["res"],
          g: (r.g ?? {}) as SessionRec["g"],
        });
      }
      if (!data || data.length < 1000) break;
    }
    for (let from = 0; from < 100000; from += 1000) {
      const { data, error } = await c
        .from("question_stats")
        .select("user_id, question_id, n, ok, miss, box, due, last, r")
        .in("user_id", ids)
        .range(from, from + 999);
      if (error) throw error;
      for (const r of data ?? []) {
        const m = members.get(r.user_id as string);
        if (m)
          m.stats[r.question_id as string] = {
            n: r.n as number,
            ok: r.ok as number,
            miss: r.miss as number,
            box: r.box as number,
            due: Number(r.due),
            last: Number(r.last),
            r: r.r as QStat["r"],
          };
      }
      if (!data || data.length < 1000) break;
    }
  }
  return { cls: cls as ClassRow, members: [...members.values()] };
}

/* ===== 加入代碼暫存（未登入時先記住，登入後自動加入） ===== */

const PENDING = "french-quiz:pending-join";
export function setPendingJoin(code: string) {
  try {
    localStorage.setItem(PENDING, code.trim().toUpperCase());
  } catch {}
}
export function takePendingJoin(): string | null {
  try {
    const c = localStorage.getItem(PENDING);
    localStorage.removeItem(PENDING);
    return c;
  } catch {
    return null;
  }
}
