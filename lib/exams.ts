import { BANK } from "./bank";
import type { ExamQuestion, ExamSet } from "./examTypes";
import type { Question } from "./types";

// 新增模考檔案時，在這裡加一行 import，並加進 FILES。`npm run validate` 會檢查有沒有漏掉。
import xDelfA11 from "@/data/exams/delf-a1-1.json";
import xDelfA21 from "@/data/exams/delf-a2-1.json";
import xDelfB11 from "@/data/exams/delf-b1-1.json";
import xDelfB21 from "@/data/exams/delf-b2-1.json";
import xDalfC11 from "@/data/exams/dalf-c1-1.json";
import xTcf1 from "@/data/exams/tcf-1.json";
import xTef1 from "@/data/exams/tef-1.json";
import xAffairesB11 from "@/data/exams/affaires-b1-1.json";
import xAffairesB21 from "@/data/exams/affaires-b2-1.json";
import xFinalA1 from "@/data/exams/final-a1.json";
import xFinalA2 from "@/data/exams/final-a2.json";
import xFinalB1 from "@/data/exams/final-b1.json";
import xFinalB2 from "@/data/exams/final-b2.json";
import xFinalC1 from "@/data/exams/final-c1.json";
import xFinalC2 from "@/data/exams/final-c2.json";

const FILES = [
  xDelfA11,
  xDelfA21,
  xDelfB11,
  xDelfB21,
  xDalfC11,
  xTcf1,
  xTef1,
  xAffairesB11,
  xAffairesB21,
  xFinalA1,
  xFinalA2,
  xFinalB1,
  xFinalB2,
  xFinalC1,
  xFinalC2,
];

export const EXAMS: ExamSet[] = FILES as ExamSet[];

export function getExam(id: string): ExamSet | undefined {
  return EXAMS.find((e) => e.id === id);
}

/** 把模考題目轉成一般題目格式，才能沿用作答與批改元件 */
export function toQuestion(set: ExamSet, q: ExamQuestion): Question {
  return { ...q, level: set.level, grammar: `exam-${set.exam}`, themes: [], difficulty: 2 } as Question;
}

/** 一份考卷的固定題數（不含從題庫隨機抽的部分） */
export function fixedQuestionCount(set: ExamSet): number {
  return set.sections.reduce((n, s) => n + (s.questions?.length ?? 0), 0);
}

export function bankQuestionCount(set: ExamSet): number {
  return set.sections.reduce((n, s) => n + (s.bank ? s.bank.choice + s.bank.fill + s.bank.short : 0), 0);
}

export const BANK_SIZE = BANK.length;

/** 寫作字數：以空白和撇號分開計算（c'est 算兩個字），只是近似值 */
export function countWords(text: string): number {
  return text.split(/[\s'’]+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}
