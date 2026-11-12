import type { Ex, Pitfall, Rule } from "./learnTypes";
import type { Level } from "./types";

/** 範文的一個段落，label 說明它在結構中的角色 */
export interface ModelPart {
  label: string;
  fr: string;
  zh: string;
}

export interface WritingPrompt {
  level: Level;
  fr: string;
  zh: string;
  /** 最少字數；有上限的（例如 DALF C1 綜合摘要）寫 max */
  min: number;
  max?: number;
}

export interface WritingGuide {
  id: string;
  zh: string;
  fr: string;
  /** 適合的等級範圍，例如「A2–B1」 */
  levels: string;
  group: "quotidien" | "recit" | "argument" | "academique";
  blurb: string;
  intro: string;
  /** 什麼時候會寫到這種文章（含考試） */
  when: string[];
  structure: { fr: string; zh: string; d: string; ex?: Ex[] }[];
  phrases: { t: string; rows: [fr: string, zh: string][] }[];
  model: {
    title: string;
    level: Level;
    /** 題目（中文說明） */
    prompt: string;
    /** 題目原文（法文） */
    promptFr?: string;
    /** 範文前的補充，例如綜合摘要要用到的資料 */
    context?: ModelPart[];
    parts: ModelPart[];
    note?: string;
  };
  tips: Rule[];
  pitfalls?: Pitfall[];
  checklist: string[];
  prompts: WritingPrompt[];
}

export interface WritingBasics {
  intro: string;
  sections: Rule[];
  pitfalls: Pitfall[];
  checklist: string[];
}
