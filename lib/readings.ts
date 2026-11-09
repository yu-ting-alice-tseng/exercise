import { CLASSICS } from "@/data/readings/classics";
import { ORIGINALS } from "@/data/readings/originals";
import { plainText } from "./readingText";
import type { Reading } from "./readingTypes";
import { LEVELS } from "./taxonomy";
import type { DrawnQuestion } from "./types";

const ORDER = LEVELS.map((l) => l.id);

/** 依等級排序，同等級原創在前 */
export const READINGS: Reading[] = [...ORIGINALS, ...CLASSICS].sort(
  (a, b) => ORDER.indexOf(a.level) - ORDER.indexOf(b.level) || (a.kind === b.kind ? 0 : a.kind === "original" ? -1 : 1),
);

export function getReading(id: string): Reading | undefined {
  return READINGS.find((r) => r.id === id);
}


export function wordCount(r: Reading): number {
  return r.paragraphs
    .flat()
    .map(([fr]) => plainText(fr))
    .join(" ")
    .split(/[\s’']+/)
    .filter((w) => /\p{L}/u.test(w)).length;
}

/** 閱讀測驗轉成題庫格式，選項順序在畫面上再打亂 */
export function readingQuestions(r: Reading): DrawnQuestion[] {
  return r.quiz.map((q, i) => {
    // 用固定的方式打亂選項，伺服器與瀏覽器結果一致
    const order = q.options.map((_, k) => k).sort((a, b) => ((a * 7 + i * 3) % 5) - ((b * 7 + i * 3) % 5));
    return {
      id: `read-${r.id}-${i + 1}`,
      level: r.level,
      grammar: "lecture",
      themes: [r.theme],
      type: "choice",
      difficulty: 2,
      instruction: q.q,
      stem: "",
      options: q.options,
      answer: 0,
      explanation: q.why,
      displayOptions: order.map((k) => q.options[k]),
      displayAnswer: order.indexOf(0),
    };
  });
}
