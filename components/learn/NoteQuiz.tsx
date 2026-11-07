"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { judge, QuestionCard, toRec, type Answer, type Result } from "@/components/PracticeClient";
import { btnPrimary, btnQuiet } from "@/components/ui";
import { prepare } from "@/lib/draw";
import { getStat, recordSession, updateAnswer, type QStat } from "@/lib/progress";
import { mulberry32, shuffle } from "@/lib/random";
import type { DrawnQuestion, Level, Question, QuestionType } from "@/lib/types";
import { useActiveTimer } from "@/lib/useActiveTimer";
import PracticeLink from "./PracticeLink";

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
function seedOf(id: string): number {
  let h = 2166136261;
  for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

/** 筆記頁底部的小測驗：5 題，當場作答、當場批改，結果也記進學習紀錄 */
export default function NoteQuiz({ id, zh, level, pool }: { id: string; zh: string; level: Level; pool: Question[] }) {
  const [seed, setSeed] = useState(() => seedOf(id));
  const questions = useMemo(() => draw(pool, seed), [pool, seed]);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [marks, setMarks] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState(false);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [round, setRound] = useState(1);
  const inputs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const session = useRef<{ id: string; prev: Record<string, QStat | undefined> } | null>(null);
  const top = useRef<HTMLElement>(null);
  const takeTime = useActiveTimer();

  const results = useMemo(() => {
    const m = new Map<string, Result>();
    if (checked) for (const q of questions) m.set(q.id, judge(q, answers[q.id], marks[q.id]));
    return m;
  }, [checked, questions, answers, marks]);
  const correct = [...results.values()].filter((r) => r.verdict === "correct").length;
  const answered = questions.filter((q) => {
    const a = answers[q.id];
    return typeof a === "number" || (typeof a === "string" && a.trim() !== "");
  }).length;

  function check() {
    const graded = questions.filter((q) => !(q.type === "short" && q.open));
    const { sessionId, prev } = recordSession(
      { kind: "practice", level, title: `${zh}・筆記小測驗`, sec: takeTime() },
      graded.map((q) => ({ id: q.id, grammar: q.grammar, result: toRec(judge(q, answers[q.id], marks[q.id]).verdict) })),
    );
    for (const q of questions) if (q.type === "short" && q.open) prev[q.id] = getStat(q.id);
    session.current = { id: sessionId, prev };
    setChecked(true);
  }

  function another() {
    setSeed(Math.floor(Math.random() * 2 ** 31));
    setAnswers({});
    setMarks({});
    setChecked(false);
    setRound((r) => r + 1);
    session.current = null;
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (questions.length === 0) return null;

  return (
    <section ref={top} id="exercice" className="scroll-mt-6 rounded-2xl border-2 border-accent/30 bg-accent-soft/40 p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="eyebrow">Exercice express{round > 1 ? ` n° ${round}` : ""}</div>
          <h2 className="display text-xl font-bold">馬上練習：{questions.length} 題小測驗</h2>
          <p className="text-sm text-muted">讀完規則直接作答，按「檢查答案」立刻批改，答錯的題目會排進複習。</p>
        </div>
        {checked && (
          <div role="status" className="display text-3xl font-bold tabular-nums">
            {correct}
            <span className="text-lg text-muted">／{questions.length}</span>
          </div>
        )}
      </div>

      <ol className="space-y-3">
        {questions.map((q, i) => (
          <QuestionCard
            key={`${round}-${q.id}`}
            q={q}
            n={i + 1}
            answer={answers[q.id]}
            checked={checked}
            result={results.get(q.id)}
            mark={marks[q.id]}
            focused={focusId === q.id}
            onFocus={() => setFocusId(q.id)}
            onBlur={() => setFocusId((cur) => (cur === q.id ? null : cur))}
            inputRef={(el) => {
              inputs.current[q.id] = el;
            }}
            getInput={() => inputs.current[q.id] ?? null}
            onAnswer={(v) => setAnswers((cur) => ({ ...cur, [q.id]: v }))}
            onMark={(ok) => {
              setMarks((cur) => ({ ...cur, [q.id]: ok }));
              if (session.current) updateAnswer(session.current.id, q.id, q.grammar, ok ? "c" : "w", session.current.prev[q.id]);
            }}
            noteLink={false}
          />
        ))}
      </ol>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {!checked ? (
          <>
            <button type="button" onClick={check} className={btnPrimary}>
              檢查答案
            </button>
            <span className="text-sm text-muted tabular-nums">
              已作答 {answered}／{questions.length}
            </span>
          </>
        ) : (
          <>
            <button type="button" onClick={another} className={btnPrimary}>
              再來 5 題
            </button>
            <PracticeLink level={level} by="grammar" topic={id} className={btnQuiet}>
              完整練習 10 題
            </PracticeLink>
            {correct < questions.length && (
              <Link href="/review/" className={btnQuiet}>
                去複習答錯的題目
              </Link>
            )}
          </>
        )}
      </div>
    </section>
  );
}
