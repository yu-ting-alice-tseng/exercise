export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type QuestionType = "choice" | "fill" | "short";
export type Difficulty = 1 | 2 | 3;

interface BaseQuestion {
  /** 唯一編號，例如 a1-art-001 */
  id: string;
  level: Level;
  /** 文法點代號，對應 taxonomy.ts */
  grammar: string;
  /** 主題代號，可多個 */
  themes: string[];
  difficulty: Difficulty;
  /** 題目說明（繁體中文）；閱讀測驗是法文題目 */
  instruction: string;
  /** 閱讀測驗：題目的中文翻譯 */
  instructionZh?: string;
  /** 題幹（法文）；填充題用 ___ 表示空格 */
  stem: string;
  /** 解析（繁體中文） */
  explanation: string;
}

export interface ChoiceQuestion extends BaseQuestion {
  type: "choice";
  options: string[];
  /** 正確選項在 options 裡的索引 */
  answer: number;
}

export interface FillQuestion extends BaseQuestion {
  type: "fill";
  /** 所有可接受的答案 */
  answers: string[];
}

export interface ShortQuestion extends BaseQuestion {
  type: "short";
  /** 所有可接受的寫法，第一個是主要答案；系統會自動比對 */
  answers: string[];
  /** 開放式作答（無法自動批改），學生對照參考答案後自己勾選 */
  open?: boolean;
}

export type Question = ChoiceQuestion | FillQuestion | ShortQuestion;

export type FilterBy = "grammar" | "theme";
export type DifficultyFilter = "all" | Difficulty;

export interface PaperConfig {
  level: Level;
  by: FilterBy;
  /** 選取的文法點或主題代號 */
  topics: string[];
  counts: Record<QuestionType, number>;
  difficulty: DifficultyFilter;
  seed: number;
}

/** 抽出來、選項已打亂的題目 */
export type DrawnQuestion =
  | (ChoiceQuestion & { displayOptions: string[]; displayAnswer: number; displayOptionsZh?: string[] })
  | FillQuestion
  | ShortQuestion;
