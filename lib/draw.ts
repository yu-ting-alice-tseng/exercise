import { BANK } from "./bank";
import { mulberry32, shuffle } from "./random";
import { TYPE_ORDER } from "./taxonomy";
import type { DrawnQuestion, PaperConfig, Question, QuestionType } from "./types";

export type Version = "A" | "B";

/** 符合等級、主題／文法、難度條件的題目 */
export function filterPool(config: Omit<PaperConfig, "counts" | "seed">): Question[] {
  return BANK.filter((q) => {
    if (q.level !== config.level) return false;
    if (config.difficulty !== "all" && q.difficulty !== config.difficulty) return false;
    if (config.topics.length === 0) return true;
    return config.by === "grammar"
      ? config.topics.includes(q.grammar)
      : q.themes.some((t) => config.topics.includes(t));
  });
}

export function countByType(pool: Question[]): Record<QuestionType, number> {
  const counts: Record<QuestionType, number> = { choice: 0, fill: 0, short: 0 };
  for (const q of pool) counts[q.type]++;
  return counts;
}

export interface DrawResult {
  A: DrawnQuestion[];
  B: DrawnQuestion[];
  /** B 卷是否因為題庫不足而和 A 卷重複 */
  overlap: boolean;
}

/**
 * 依 seed 抽出 A／B 兩卷：先各取不重複的題目，
 * 題庫不夠時 B 卷才回頭用 A 卷用過的題目。
 */
export function drawPaper(config: PaperConfig): DrawResult {
  const rand = mulberry32(config.seed);
  const pool = filterPool(config);
  const A: DrawnQuestion[] = [];
  const B: DrawnQuestion[] = [];
  let overlap = false;

  for (const type of TYPE_ORDER) {
    const n = config.counts[type];
    if (n <= 0) continue;
    const ofType = shuffle(
      pool.filter((q) => q.type === type),
      rand,
    );
    const a = ofType.slice(0, n);
    let b = ofType.slice(n, n * 2);
    if (b.length < a.length) {
      overlap = true;
      const used = new Set(b.map((q) => q.id));
      const refill = shuffle(a, rand).filter((q) => !used.has(q.id));
      b = [...b, ...refill].slice(0, a.length);
    }
    A.push(...a.map((q) => prepare(q, rand)));
    B.push(...b.map((q) => prepare(q, rand)));
  }
  return { A, B, overlap };
}

export function prepare(q: Question, rand: () => number): DrawnQuestion {
  if (q.type !== "choice") return q;
  const order = shuffle(
    q.options.map((_, i) => i),
    rand,
  );
  return {
    ...q,
    displayOptions: order.map((i) => q.options[i]),
    displayAnswer: order.indexOf(q.answer),
  };
}

export const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];
