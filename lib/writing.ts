import { BASICS } from "@/data/writing/basics";
import { GUIDES_1 } from "@/data/writing/guides-1";
import { GUIDES_2 } from "@/data/writing/guides-2";
import type { WritingGuide } from "./writingTypes";

export { BASICS };

export const GUIDES: WritingGuide[] = [...GUIDES_1, ...GUIDES_2];

export const GROUPS: { id: WritingGuide["group"]; zh: string; fr: string }[] = [
  { id: "quotidien", zh: "日常與書信", fr: "Écrits du quotidien" },
  { id: "recit", zh: "敘事與描寫", fr: "Raconter et décrire" },
  { id: "argument", zh: "表達觀點", fr: "Argumenter" },
  { id: "academique", zh: "學術與考試", fr: "Écrits universitaires" },
];

export function getGuide(id: string): WritingGuide | undefined {
  return GUIDES.find((g) => g.id === id);
}

/** 依空格分隔計算字數（只算含字母或數字的詞） */
export function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

/** DELF／DALF 寫作要求，2026 年 11 月依 France Éducation international 官網核對 */
export const EXAM_WRITING: { level: string; task: string; url: string }[] = [
  { level: "A1", task: "填寫表格，並寫一則至少 40 字的訊息", url: "https://www.france-education-international.fr/diplome/delf-tout-public/niveau-a1" },
  { level: "A2", task: "寫兩篇短文，每篇至少 60 字", url: "https://www.france-education-international.fr/diplome/delf-tout-public/niveau-a2" },
  { level: "B1", task: "寫一篇至少 160 字的文章", url: "https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b1" },
  { level: "B2", task: "寫一篇至少 250 字的文章", url: "https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b2" },
  { level: "C1", task: "一篇 220 至 240 字的綜合摘要，加上一篇至少 250 字的文章", url: "https://www.france-education-international.fr/article/dalf-c1" },
  { level: "C2", task: "閱讀約 2,000 字的資料，3 小時 30 分內寫出至少 700 字、結構完整的文章", url: "https://www.france-education-international.fr/article/dalf-c2" },
];
