import { BANK } from "./bank";
import { dayKey, isInReview, MASTERED, type QStat, type SessionRec } from "./progress";
import type { Level } from "./types";

const META = new Map(BANK.map((q) => [q.id, { level: q.level, grammar: q.grammar }]));

export interface MemberSummary {
  /** 期間內練習的天數 */
  days: number;
  /** 期間內練習秒數 */
  sec: number;
  /** 期間內作答題數與答對題數 */
  answered: number;
  correct: number;
  /** 最後一次練習時間（毫秒），沒有則為 null */
  lastAt: number | null;
  due: number;
  mastered: number;
  reviewing: number;
}

export function summarize(sessions: SessionRec[], stats: Record<string, QStat>, since: number, now: number): MemberSummary {
  const inRange = sessions.filter((s) => s.at >= since);
  const days = new Set(inRange.map((s) => dayKey(s.at)));
  let answered = 0;
  let correct = 0;
  let sec = 0;
  for (const s of inRange) {
    const r = Object.values(s.res);
    answered += r.length;
    correct += r.filter((x) => x === "c").length;
    sec += s.sec;
  }
  const st = Object.values(stats);
  const lastSession = sessions.length ? Math.max(...sessions.map((s) => s.at)) : 0;
  const lastStat = st.length ? Math.max(...st.map((s) => s.last)) : 0;
  const lastAt = Math.max(lastSession, lastStat) || null;
  return {
    days: days.size,
    sec,
    answered,
    correct,
    lastAt,
    due: st.filter((s) => isInReview(s) && s.due <= now).length,
    mastered: st.filter((s) => s.box === MASTERED).length,
    reviewing: st.filter(isInReview).length,
  };
}

export interface GrammarScore {
  level: Level;
  grammar: string;
  n: number;
  ok: number;
  pct: number;
  /** 有作答過的人數 */
  people: number;
}

/** 依文法點計算正確率（作答次數至少 minN 次才列入），由低到高排序 */
export function weakestGrammar(statsList: Record<string, QStat>[], minN = 3, limit = 8): GrammarScore[] {
  const map = new Map<string, { level: Level; grammar: string; n: number; ok: number; people: Set<number> }>();
  statsList.forEach((stats, i) => {
    for (const [id, st] of Object.entries(stats)) {
      const m = META.get(id);
      if (!m) continue;
      const k = `${m.level}:${m.grammar}`;
      const g = map.get(k) ?? { ...m, n: 0, ok: 0, people: new Set<number>() };
      g.n += st.n;
      g.ok += st.ok;
      g.people.add(i);
      map.set(k, g);
    }
  });
  return [...map.values()]
    .filter((g) => g.n >= minN)
    .map((g) => ({ level: g.level, grammar: g.grammar, n: g.n, ok: g.ok, pct: Math.round((g.ok / g.n) * 100), people: g.people.size }))
    .sort((a, b) => a.pct - b.pct || b.n - a.n)
    .slice(0, limit);
}
