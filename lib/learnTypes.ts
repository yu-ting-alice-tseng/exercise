/** 學習區的資料型別：文法筆記、句型整理、主題單字 */

/** 例句：[法文, 中文] */
export type Ex = [fr: string, zh: string];

export interface Table {
  head: string[];
  rows: string[][];
  /** 哪幾欄是法文（從 0 開始），用來標 lang="fr" 和法文字體 */
  fr?: number[];
}

export interface Rule {
  /** 小標題 */
  t: string;
  /** 說明文字 */
  d?: string;
  table?: Table;
  ex?: Ex[];
}

export interface Pitfall {
  wrong: string;
  right: string;
  why: string;
}

export interface GrammarNote {
  id: string;
  /** 一兩句話講重點 */
  summary: string;
  rules: Rule[];
  pitfalls?: Pitfall[];
  /** 記憶小撇步 */
  tip?: string;
}

export interface PatternPage {
  id: string;
  zh: string;
  fr: string;
  /** 卡片上的一句話介紹 */
  blurb: string;
  intro: string;
  sections: Rule[];
  pitfalls?: Pitfall[];
  /** 相關的文法點 id，連到文法筆記 */
  related?: string[];
}

export interface Word {
  fr: string;
  zh: string;
  /** 建議學習等級：1＝A1、2＝A2、3＝B1 以上 */
  lvl: 1 | 2 | 3;
  ex?: Ex;
}

export interface VocabGroup {
  t: string;
  words: Word[];
}

export interface VocabTheme {
  /** 和 THEMES 的 id 一樣 */
  id: string;
  intro: string;
  groups: VocabGroup[];
  /** 這個主題常用的句子 */
  phrases?: Ex[];
}
