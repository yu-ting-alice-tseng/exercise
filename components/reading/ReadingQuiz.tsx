"use client";

import { useState } from "react";
import InlineQuiz from "@/components/learn/InlineQuiz";
import { btnPrimary } from "@/components/ui";
import type { DrawnQuestion, Level } from "@/lib/types";

/** 文章最後的閱讀測驗，可以重做 */
export default function ReadingQuiz({ id, level, title, questions }: { id: string; level: Level; title: string; questions: DrawnQuestion[] }) {
  const [round, setRound] = useState(0);
  return (
    <InlineQuiz
      key={round}
      questions={questions}
      level={level}
      recordTitle={`閱讀：${title}`}
      eyebrow="Compréhension écrite"
      heading={`閱讀測驗：${questions.length} 題`}
      sub="讀完文章再作答，結果會記進學習紀錄。"
      actions={() => (
        <button
          type="button"
          onClick={() => {
            setRound((r) => r + 1);
            document.getElementById(`quiz-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className={btnPrimary}
        >
          再做一次
        </button>
      )}
    />
  );
}
