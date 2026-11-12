"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { btnPrimary, btnQuiet } from "@/components/ui";
import { prepare } from "@/lib/draw";
import { mulberry32, shuffle } from "@/lib/random";
import type { DrawnQuestion, Level, Question, QuestionType } from "@/lib/types";
import InlineQuiz from "./InlineQuiz";
import PracticeLink from "./PracticeLink";
import { useLang } from "@/lib/i18n";

/** 每組小測驗的題型配置 */
const MIX: [QuestionType, number][] = [
  ["choice", 2],
  ["fill", 2],
  ["short", 1],
];

function draw(pool: Question[], seed: number): DrawnQuestion[] {
  const rand = mulberry32(seed);
  return MIX.flatMap(([type, n]) =>
    shuffle(
      pool.filter((q) => q.type === type),
      rand,
    )
      .slice(0, n)
      .map((q) => prepare(q, rand)),
  );
}

/** 從文法點 id 算出固定的起始種子，伺服器和瀏覽器第一次畫出來的題目才會一樣 */
export function seedOf(id: string): number {
  let h = 2166136261;
  for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

/** 筆記頁底部的小測驗：5 題，可以一直換新的一組 */
export default function NoteQuiz({ id, zh, level, pool }: { id: string; zh: string; level: Level; pool: Question[] }) {
  const [seed, setSeed] = useState(() => seedOf(id));
  const [round, setRound] = useState(1);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  const questions = useMemo(() => draw(pool, seed), [pool, seed]);
  const top = useRef<HTMLElement>(null);

  if (questions.length === 0) return null;

  return (
    <section ref={top} id="exercice" className="scroll-mt-6 rounded-2xl border-2 border-accent/30 bg-accent-soft/40 p-4 sm:p-6">
      <InlineQuiz
        key={seed}
        questions={questions}
        level={level}
        recordTitle={`${zh}・筆記小測驗`}
        eyebrow={`Exercice express${round > 1 ? ` n° ${round}` : ""}`}
        heading={t(`馬上練習：${questions.length} 題小測驗`, `Entraînez-vous : ${questions.length} questions`)}
        sub={t("讀完規則直接作答，按「檢查答案」立刻批改，答錯的題目會排進複習。", "Répondez juste après la règle. « Vérifier » corrige tout de suite, et les erreurs passent en révision.")}
        actions={(correct) => (
          <>
            <button
              type="button"
              onClick={() => {
                setSeed(Math.floor(Math.random() * 2 ** 31));
                setRound((r) => r + 1);
                top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={btnPrimary}
            >
              {t("再來 5 題", "5 autres questions")}
            </button>
            <PracticeLink level={level} by="grammar" topic={id} className={btnQuiet}>
              {t("完整練習 10 題", "Exercice complet (10 questions)")}
            </PracticeLink>
            {correct < questions.length && (
              <Link href="/review/" className={btnQuiet}>
                {t("去複習答錯的題目", "Réviser mes erreurs")}
              </Link>
            )}
          </>
        )}
      />
    </section>
  );
}
