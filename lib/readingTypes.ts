import type { Level } from "./types";

/** 單字解釋 */
export interface Gloss {
  /** 原形或字典形式 */
  lemma: string;
  /** 詞性與文法說明，例如「陰性名詞」「aller 的現在式」 */
  pos: string;
  zh: string;
  note?: string;
}

/** 閱讀測驗題：options 第一個是正確答案 */
export interface ReadingQ {
  q: string;
  options: string[];
  why: string;
}

export interface Reading {
  id: string;
  level: Level;
  /** original＝本站原創；classic＝公有領域的經典作品 */
  kind: "original" | "classic";
  title: string;
  zh: string;
  /** 對應 THEMES 的 id */
  theme: string;
  intro: string;
  /** 經典作品的出處 */
  source?: { author: string; work: string; edition: string; url: string; note?: string };
  /** 原創文章裡事實的查證來源 */
  facts?: { claim: string; url: string }[];
  /** 詩：每句裡的換行要保留 */
  verse?: boolean;
  /**
   * 段落 → 句子 → [法文, 中文]。
   * 法文中用 [[字]] 或 [[字|鍵]] 標出可以點開的單字，鍵對應 glossary。
   */
  paragraphs: [fr: string, zh: string][][];
  glossary: Record<string, Gloss>;
  quiz: ReadingQ[];
}
