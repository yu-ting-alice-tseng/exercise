"use client";

import { useMemo, useRef, useState } from "react";
import { judge, QuestionCard, toRec, type Answer, type Result } from "@/components/PracticeClient";
import { btnPrimary } from "@/components/ui";
import { getStat, recordSession, updateAnswer, type QStat } from "@/lib/progress";
import type { DrawnQuestion, Level } from "@/lib/types";
import { useActiveTimer } from "@/lib/useActiveTimer";

/**
 * 頁面內的小測驗：當場作答、當場批改，結果記進學習紀錄。
 * 要換一組題目時，由外層換 key 重新掛載。
 */
export default function InlineQuiz({
  questions,
  level,
  recordTitle,
  eyebrow,
  heading,
  sub,
  actions,
}: {
  questions: DrawnQuestion[];
  level: Level;
  recordTitle: string;
  eyebrow: string;
  heading: string;
  sub: string;
  /** 批改後顯示的按鈕 */
  actions?: (correct: number) => React.ReactNode;
}) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [marks, setMarks] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState(false);
  const [focusId, setFocusId] = useState<string | null>(null);
  const inputs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const session = useRef<{ id: string; prev: Record<string, QStat | undefined> } | null>(null);
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
      { kind: "practice", level, title: recordTitle, sec: takeTime() },
      graded.map((q) => ({ id: q.id, grammar: q.grammar, result: toRec(judge(q, answers[q.id], marks[q.id]).verdict) })),
    );
    for (const q of questions) if (q.type === "short" && q.open) prev[q.id] = getStat(q.id);
    session.current = { id: sessionId, prev };
    setChecked(true);
  }

  if (questions.length === 0) return null;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="display text-xl font-bold">{heading}</h2>
          <p className="text-sm text-muted">{sub}</p>
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
            key={q.id}
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
          actions?.(correct)
        )}
      </div>
    </div>
  );
}
