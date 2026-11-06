import type { Level, QuestionType } from "./types";

/** 模考的種類 */
export type ExamKind = "delf" | "dalf" | "tcf" | "tef" | "affaires" | "final";

/** 模考裡的題目：和題庫題目相同，但等級、文法點由整份考卷決定 */
interface ExamQBase {
  id: string;
  instruction: string;
  stem: string;
  explanation: string;
}
export type ExamQuestion =
  | (ExamQBase & { type: "choice"; options: string[]; answer: number })
  | (ExamQBase & { type: "fill"; answers: string[] })
  | (ExamQBase & { type: "short"; answers: string[] });

export interface ExamPassage {
  /** 文章或聽力稿（法文） */
  text: string;
  /** 文章標題或文件類型，例如「電子郵件」 */
  title?: string;
  /** 聽力題：用語音朗讀，作答後才顯示逐字稿 */
  speak?: boolean;
  /** 朗讀時的角色（對話），每行「A：…」的格式 */
  dialogue?: boolean;
}

export interface WritingTask {
  prompt: string;
  /** 題目要求的字數 */
  minWords: number;
  maxWords?: number;
  /** 自我檢核項目（參考 DELF 評分項目） */
  rubric: string[];
  /** 範文 */
  model: string;
}

export type SectionKind = "listening" | "reading" | "structure" | "writing" | "bank";

export interface ExamSection {
  kind: SectionKind;
  title: string;
  fr: string;
  instruction: string;
  passage?: ExamPassage;
  questions?: ExamQuestion[];
  writing?: WritingTask;
  /** kind = bank：考試時從題庫隨機抽題 */
  bank?: Record<QuestionType, number>;
}

export interface ExamSet {
  id: string;
  exam: ExamKind;
  level: Level;
  title: string;
  fr: string;
  /** 建議作答時間（分鐘） */
  minutes: number;
  desc: string;
  sections: ExamSection[];
}

export const EXAM_KINDS: { id: ExamKind; zh: string; fr: string; desc: string }[] = [
  { id: "delf", zh: "DELF 模擬卷", fr: "Diplôme d'études en langue française", desc: "法國教育部的法語文憑，A1～B2。題型：聽力、閱讀、寫作（口說請另外練習）。" },
  { id: "dalf", zh: "DALF 模擬卷", fr: "Diplôme approfondi de langue française", desc: "進階法語文憑，C1～C2。長篇閱讀、講座聽力與論證寫作。" },
  { id: "tcf", zh: "TCF 風格", fr: "Test de connaissance du français", desc: "法國教育國際中心的法語能力測驗，常用於留學與移民。全部為選擇題，難度由淺到深。" },
  { id: "tef", zh: "TEF 風格", fr: "Test d'évaluation de français", desc: "巴黎工商會的法語能力測驗，常用於加拿大與法國移民。以實用文件的閱讀和聽力為主。" },
  { id: "affaires", zh: "商務與財經法語", fr: "Français des affaires", desc: "參考商務法語證書（DFP Affaires）的題型：商務書信、財經新聞、職場與財經用語。" },
  { id: "final", zh: "期末綜合卷", fr: "Examen final", desc: "依等級出一份綜合考卷：文法題從題庫隨機抽，加上一篇閱讀和一題寫作。每次抽到的文法題都不同。" },
];

/** 官方範例試題的網站（只連到官網，不轉載真題） */
export const OFFICIAL_LINKS = [
  { label: "France Éducation international（DELF、DALF、TCF 官方網站）", href: "https://www.france-education-international.fr/" },
  { label: "Le français des affaires（巴黎工商會：TEF、商務法語證書官方網站）", href: "https://www.lefrancaisdesaffaires.fr/" },
];
