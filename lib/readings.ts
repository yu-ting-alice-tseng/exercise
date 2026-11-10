import { CLASSICS } from "@/data/readings/classics";
import { CLASSICS_2 } from "@/data/readings/classics2";
import { CLASSICS_3 } from "@/data/readings/classics3";
import { ORIGINALS } from "@/data/readings/originals";
import { ORIGINALS_2 } from "@/data/readings/originals2";
import { plainText } from "./readingText";
import type { Reading } from "./readingTypes";
import { LEVELS } from "./taxonomy";
import type { DrawnQuestion } from "./types";

const ORDER = LEVELS.map((l) => l.id);

/** 參考資料的查閱日期 */
export const REFS_ACCESSED = "2026 年 11 月 9 日";

/** 依等級排序，同等級原創在前 */
export const READINGS: Reading[] = [...ORIGINALS, ...ORIGINALS_2, ...CLASSICS, ...CLASSICS_2, ...CLASSICS_3].sort(
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

/** 閱讀測驗轉成題庫格式；選項用固定方式打亂，伺服器與瀏覽器結果一致 */
export function readingQuestions(r: Reading): DrawnQuestion[] {
  return r.quiz.map((q, i) => {
    const order = q.options.map((_, k) => k).sort((a, b) => ((a * 7 + i * 3) % 5) - ((b * 7 + i * 3) % 5));
    return {
      id: `read-${r.id}-${i + 1}`,
      level: r.level,
      grammar: "lecture",
      themes: [r.theme],
      type: "choice",
      difficulty: 2,
      instruction: q.q,
      instructionZh: q.qZh,
      stem: "",
      options: q.options.map(([fr]) => fr),
      answer: 0,
      explanation: q.why,
      displayOptions: order.map((k) => q.options[k][0]),
      displayOptionsZh: order.map((k) => q.options[k][1]),
      displayAnswer: order.indexOf(0),
    };
  });
}
