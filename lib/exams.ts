import { BANK } from "./bank";
import type { ExamQuestion, ExamSet } from "./examTypes";
import type { Question } from "./types";

// 新增模考檔案時，在這裡加一行 import，並加進 FILES。`npm run validate` 會檢查有沒有漏掉。
import xDelfA11 from "@/data/exams/delf-a1-1.json";
import xDelfA12 from "@/data/exams/delf-a1-2.json";
import xDelfA13 from "@/data/exams/delf-a1-3.json";
import xDelfA21 from "@/data/exams/delf-a2-1.json";
import xDelfA22 from "@/data/exams/delf-a2-2.json";
import xDelfA23 from "@/data/exams/delf-a2-3.json";
import xDelfB11 from "@/data/exams/delf-b1-1.json";
import xDelfB12 from "@/data/exams/delf-b1-2.json";
import xDelfB13 from "@/data/exams/delf-b1-3.json";
import xDelfB21 from "@/data/exams/delf-b2-1.json";
import xDelfB22 from "@/data/exams/delf-b2-2.json";
import xDelfB23 from "@/data/exams/delf-b2-3.json";
import xDalfC11 from "@/data/exams/dalf-c1-1.json";
import xDalfC12 from "@/data/exams/dalf-c1-2.json";
import xDalfC13 from "@/data/exams/dalf-c1-3.json";
import xTcf1 from "@/data/exams/tcf-1.json";
import xTcf2 from "@/data/exams/tcf-2.json";
import xTcf3 from "@/data/exams/tcf-3.json";
import xTef1 from "@/data/exams/tef-1.json";
import xTef2 from "@/data/exams/tef-2.json";
import xTef3 from "@/data/exams/tef-3.json";
import xAffairesB11 from "@/data/exams/affaires-b1-1.json";
import xAffairesB12 from "@/data/exams/affaires-b1-2.json";
import xAffairesB13 from "@/data/exams/affaires-b1-3.json";
import xAffairesB21 from "@/data/exams/affaires-b2-1.json";
import xAffairesB22 from "@/data/exams/affaires-b2-2.json";
import xAffairesB23 from "@/data/exams/affaires-b2-3.json";
import xFinalA1 from "@/data/exams/final-a1.json";
import xFinalA12 from "@/data/exams/final-a1-2.json";
import xFinalA13 from "@/data/exams/final-a1-3.json";
import xFinalA2 from "@/data/exams/final-a2.json";
import xFinalA22 from "@/data/exams/final-a2-2.json";
import xFinalA23 from "@/data/exams/final-a2-3.json";
import xFinalB1 from "@/data/exams/final-b1.json";
import xFinalB12 from "@/data/exams/final-b1-2.json";
import xFinalB13 from "@/data/exams/final-b1-3.json";
import xFinalB2 from "@/data/exams/final-b2.json";
import xFinalB22 from "@/data/exams/final-b2-2.json";
import xFinalB23 from "@/data/exams/final-b2-3.json";
import xFinalC1 from "@/data/exams/final-c1.json";
import xFinalC12 from "@/data/exams/final-c1-2.json";
import xFinalC13 from "@/data/exams/final-c1-3.json";
import xFinalC2 from "@/data/exams/final-c2.json";
import xFinalC22 from "@/data/exams/final-c2-2.json";
import xFinalC23 from "@/data/exams/final-c2-3.json";

const FILES = [
  xDelfA11,
  xDelfA12,
  xDelfA13,
  xDelfA21,
  xDelfA22,
  xDelfA23,
  xDelfB11,
  xDelfB12,
  xDelfB13,
  xDelfB21,
  xDelfB22,
  xDelfB23,
  xDalfC11,
  xDalfC12,
  xDalfC13,
  xTcf1,
  xTcf2,
  xTcf3,
  xTef1,
  xTef2,
  xTef3,
  xAffairesB11,
  xAffairesB12,
  xAffairesB13,
  xAffairesB21,
  xAffairesB22,
  xAffairesB23,
  xFinalA1,
  xFinalA12,
  xFinalA13,
  xFinalA2,
  xFinalA22,
  xFinalA23,
  xFinalB1,
  xFinalB12,
  xFinalB13,
  xFinalB2,
  xFinalB22,
  xFinalB23,
  xFinalC1,
  xFinalC12,
  xFinalC13,
  xFinalC2,
  xFinalC22,
  xFinalC23,
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
