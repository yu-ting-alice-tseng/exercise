import { CLASSICS } from "@/data/readings/classics";
import { CLASSICS_2 } from "@/data/readings/classics2";
import { CLASSICS_3 } from "@/data/readings/classics3";
import { ORIGINALS } from "@/data/readings/originals";
import { ORIGINALS_2 } from "@/data/readings/originals2";
import { plainText } from "./readingText";
import type { Reading } from "./readingTypes";
import { LEVELS } from "./taxonomy";
import type { DrawnQuestion } from "./types";
import { comprehensionQuestions } from "./quiz";

const ORDER = LEVELS.map((l) => l.id);

/** 參考資料的查閱日期 */
export const REFS_ACCESSED = "2026 年 11 月 9 日";
export const REFS_ACCESSED_FR = "le 9 novembre 2026";

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

/** 閱讀測驗轉成題庫格式 */
export function readingQuestions(r: Reading): DrawnQuestion[] {
  return comprehensionQuestions(`read-${r.id}`, r.level, r.theme, r.quiz, "lecture");
}
