import type { Level } from "./types";

/** proverbe＝諺語；expression＝慣用語（形象化的說法）；familier＝口語與俚語 */
export type IdiomKind = "proverbe" | "expression" | "familier";

export interface Idiom {
  fr: string;
  /** 字面意思（照字翻譯） */
  lit?: string;
  /** 真正的意思 */
  zh: string;
  /** 中文裡意思相近的說法（成語、俗語） */
  eq?: string;
  /** 例句：[法文, 中文] */
  ex: [fr: string, zh: string];
  /** soutenu＝正式；courant＝一般；familier＝口語，對長輩或正式場合不要用 */
  reg: "soutenu" | "courant" | "familier";
  level: Level;
  /** 分類 id，見 IDIOM_THEMES */
  th: string;
  note?: string;
}
