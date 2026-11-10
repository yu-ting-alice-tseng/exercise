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

/** 閱讀測驗題（法文，附中文翻譯）：options 第一個是正確答案 */
export interface ReadingQ {
  q: string;
  qZh: string;
  options: [fr: string, zh: string][];
  /** 解析（中文） */
  why: string;
}

/** 參考資料（原創文章參考過的資料，只取事實，不轉載文字） */
export interface Ref {
  title: string;
  site: string;
  url: string;
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
  source?: {
    author: string;
    work: string;
    edition: string;
    url: string;
    note?: string;
    /** 依初版改成現代拼寫（用字、語序不變） */
    modernized?: boolean;
  };
  /** 原創文章參考過的資料；沒有就代表是純虛構的故事 */
  refs?: Ref[];
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
