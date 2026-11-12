import type { Gloss, ReadingQ } from "./readingTypes";
import type { Level } from "./types";

/** 對話中的角色 */
export interface Speaker {
  /** 名字或稱呼（法文），例如 Léa、Le serveur */
  name: string;
  /** 角色說明（中文），例如「服務生」 */
  zh: string;
}

export interface Dialogue {
  id: string;
  level: Level;
  /** 對應 SCENES 的 id */
  scene: string;
  /** 對應 THEMES 的 id（學習紀錄用） */
  theme: string;
  title: string;
  zh: string;
  /** 情境說明（中文） */
  intro: string;
  /** tu＝朋友家人之間；vous＝正式或陌生人；mixte＝兩種都有 */
  register: "tu" | "vous" | "mixte";
  speakers: Speaker[];
  /**
   * [說話的人（speakers 的索引）, 法文, 中文]。
   * 法文中用 [[字]] 或 [[字|鍵]] 標出可以點開的字詞，鍵對應 glossary。
   */
  lines: [who: number, fr: string, zh: string][];
  glossary: Record<string, Gloss>;
  /** 這個場合的實用說法：每組一個功能，列出可以替換的講法 */
  phrases: { t: string; rows: [fr: string, zh: string][] }[];
  /** 文化與禮貌小提醒 */
  culture?: string;
  quiz: ReadingQ[];
}
