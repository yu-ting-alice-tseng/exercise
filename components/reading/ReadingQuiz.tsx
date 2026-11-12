"use client";

import { useState } from "react";
import InlineQuiz from "@/components/learn/InlineQuiz";
import { btnPrimary } from "@/components/ui";
import type { DrawnQuestion, Level } from "@/lib/types";
import { useLang } from "@/lib/i18n";

/** 文章最後的閱讀測驗，可以重做 */
export default function ReadingQuiz({
  id,
  level,
  title,
  questions,
  zh,
}: {
  id: string;
  level: Level;
  title: string;
  questions: DrawnQuestion[];
  zh: "show" | "tap" | "hide";
}) {
  const [round, setRound] = useState(0);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  return (
    <InlineQuiz
      key={round}
      questions={questions}
      level={level}
      recordTitle={`閱讀：${title}`}
      zh={zh}
      eyebrow="Compréhension écrite"
      heading={t(`閱讀測驗：${questions.length} 題`, `Quiz de lecture : ${questions.length} questions`)}
      sub={zh === "hide" ? t("讀完文章再作答，題目只顯示法文。", "Répondez après la lecture. Les questions sont en français seulement.") : zh === "tap" ? t("讀完文章再作答，按每題右上角的「看翻譯」顯示中文。", "Répondez après la lecture. Le bouton en haut à droite de chaque question affiche le chinois.") : t("讀完文章再作答，結果會記進學習紀錄。", "Répondez après la lecture. Le résultat est enregistré dans votre suivi.")}
      actions={() => (
        <button
          type="button"
          onClick={() => {
            setRound((r) => r + 1);
            document.getElementById(`quiz-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className={btnPrimary}
        >
          {t("再做一次", "Recommencer")}
        </button>
      )}
    />
  );
}
