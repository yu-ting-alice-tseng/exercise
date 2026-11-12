import type { ReadingQ } from "./readingTypes";
import type { DrawnQuestion, Level } from "./types";

/** 文章或對話的理解測驗轉成題庫格式；選項用固定方式打亂，伺服器與瀏覽器結果一致 */
export function comprehensionQuestions(prefix: string, level: Level, theme: string, quiz: ReadingQ[], grammar: string): DrawnQuestion[] {
  return quiz.map((q, i) => {
    const order = q.options.map((_, k) => k).sort((a, b) => ((a * 7 + i * 3) % 5) - ((b * 7 + i * 3) % 5));
    return {
      id: `${prefix}-${i + 1}`,
      level,
      grammar,
      themes: [theme],
      type: "choice",
      difficulty: 2,
      instruction: q.q,
      instructionZh: q.qZh,
      stem: "",
      options: q.options.map(([fr]) => fr),
      answer: 0,
      explanation: q.why,
      displayOptions: order.map((k) => q.options[k][0]),
      displayOptionsZh: order.map((k) => q.options[k][1]),
      displayAnswer: order.indexOf(0),
    };
  });
}
