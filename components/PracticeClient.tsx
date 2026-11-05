"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AccentBar from "./AccentBar";
import Stem, { hasBlank } from "./Stem";
import { checkFill, type FillResult } from "@/lib/check";
import { configToQuery, queryToConfig } from "@/lib/config";
import { drawPaper, OPTION_LETTERS, type Version } from "@/lib/draw";
import { saveHistory } from "@/lib/history";
import { newSeed } from "@/lib/random";
import { TYPE_LABELS } from "@/lib/taxonomy";
import { paperTitle } from "@/lib/title";
import type { DrawnQuestion } from "@/lib/types";

type Answer = string | number | undefined;
type Verdict = "correct" | "wrong" | "accent" | "pending";

export default function PracticeClient() {
  const params = useSearchParams();
  // 網址改變（換一批題目）時重新掛載，作答狀態自然清空
  return <PracticeSession key={params.toString()} params={params.toString()} />;
}

function PracticeSession({ params: query }: { params: string }) {
  const router = useRouter();
  const params = useMemo(() => new URLSearchParams(query), [query]);
  const config = useMemo(() => queryToConfig(params), [params]);
  const version: Version = params.get("v") === "B" ? "B" : "A";
  const questions = useMemo(() => (config ? drawPaper(config)[version] : []), [config, version]);

  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [checked, setChecked] = useState(false);
  const [selfMarks, setSelfMarks] = useState<Record<string, boolean>>({});
  const [onlyIds, setOnlyIds] = useState<string[] | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const inputs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const shown = onlyIds ? questions.filter((q) => onlyIds.includes(q.id)) : questions;

  function verdict(q: DrawnQuestion): Verdict {
    const a = answers[q.id];
    if (q.type === "choice") return a === q.displayAnswer ? "correct" : "wrong";
    if (q.type === "fill") {
      const r: FillResult = checkFill(typeof a === "string" ? a : "", q.answers);
      return r === "correct" ? "correct" : r === "accent" ? "accent" : "wrong";
    }
    if (q.id in selfMarks) return selfMarks[q.id] ? "correct" : "wrong";
    return "pending";
  }

  const answeredCount = shown.filter((q) => {
    const a = answers[q.id];
    return typeof a === "number" || (typeof a === "string" && a.trim() !== "");
  }).length;
  const verdicts = checked ? shown.map(verdict) : [];
  const correctCount = verdicts.filter((v) => v === "correct").length;
  const pendingCount = verdicts.filter((v) => v === "pending").length;
  const scoreText = `${correctCount}／${shown.length}`;

  // 全部批改完（含簡答自評）才記錄分數
  useEffect(() => {
    if (!config || !checked || pendingCount > 0 || onlyIds) return;
    saveHistory({ config, kind: "practice", title: paperTitle(config), score: scoreText });
  }, [checked, pendingCount, scoreText, config, onlyIds]);

  if (!config) return <Invalid />;
  if (questions.length === 0) return <Invalid message="沒有符合條件的題目，請回到設定頁調整。" />;

  function setAnswer(id: string, v: Answer) {
    setAnswers((cur) => ({ ...cur, [id]: v }));
  }

  function check() {
    setChecked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function redoWrong() {
    const wrong = shown.filter((q) => verdict(q) !== "correct").map((q) => q.id);
    setOnlyIds(wrong);
    setAnswers((cur) => {
      const next = { ...cur };
      for (const id of wrong) delete next[id];
      return next;
    });
    setSelfMarks((cur) => {
      const next = { ...cur };
      for (const id of wrong) delete next[id];
      return next;
    });
    setChecked(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function newBatch() {
    router.replace(`/practice/?${configToQuery({ ...config!, seed: newSeed() })}`);
    window.scrollTo({ top: 0 });
  }

  const allCorrect = checked && pendingCount === 0 && correctCount === shown.length;

  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-4">
      <div className="mb-4">
        <Link href="/" className="text-sm text-muted hover:underline">
          ← 回到設定
        </Link>
        <h1 className="mt-1 text-xl font-bold">{paperTitle(config)}</h1>
        <p className="text-sm text-muted">
          線上練習{onlyIds ? "・重做答錯的題目" : ""}・共 {shown.length} 題
        </p>
      </div>

      {checked && (
        <div
          className={`mb-4 rounded-2xl p-4 ${allCorrect ? "bg-ok-soft" : "bg-accent-soft"}`}
          role="status"
        >
          <div className="text-sm text-muted">得分</div>
          <div className="text-3xl font-bold tabular-nums">{scoreText}</div>
          {pendingCount > 0 ? (
            <p className="mt-1 text-sm">還有 {pendingCount} 題簡答題，請對照參考答案後自己批改。</p>
          ) : allCorrect ? (
            <p className="mt-1 text-sm">全部答對，Très bien !</p>
          ) : (
            <p className="mt-1 text-sm">看看下面的解析，再挑戰一次答錯的題目吧。</p>
          )}
        </div>
      )}

      <ol className="space-y-3">
        {shown.map((q, i) => (
          <QuestionCard
            key={q.id}
            q={q}
            n={i + 1}
            answer={answers[q.id]}
            checked={checked}
            verdict={checked ? verdict(q) : undefined}
            selfMark={selfMarks[q.id]}
            focused={focusId === q.id}
            onFocus={() => setFocusId(q.id)}
            onBlur={() => setFocusId((cur) => (cur === q.id ? null : cur))}
            inputRef={(el) => {
              inputs.current[q.id] = el;
            }}
            getInput={() => inputs.current[q.id] ?? null}
            onAnswer={(v) => setAnswer(q.id, v)}
            onSelfMark={(ok) => setSelfMarks((cur) => ({ ...cur, [q.id]: ok }))}
          />
        ))}
      </ol>

      <div className="sticky bottom-0 -mx-4 mt-5 border-t border-line bg-bg/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur">
        {!checked ? (
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-sm text-muted tabular-nums">
              已作答 {answeredCount}／{shown.length}
            </span>
            <button
              type="button"
              onClick={check}
              className="min-h-12 flex-1 rounded-xl bg-accent font-medium text-accent-ink transition hover:opacity-90"
            >
              檢查答案
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={redoWrong}
              disabled={allCorrect || pendingCount > 0}
              className="min-h-12 rounded-xl bg-accent font-medium text-accent-ink transition hover:opacity-90 disabled:opacity-40"
            >
              重做答錯的題目
            </button>
            <button
              type="button"
              onClick={newBatch}
              className="min-h-12 rounded-xl border border-accent bg-surface font-medium text-accent transition hover:bg-accent-soft"
            >
              換一批題目
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function QuestionCard({
  q,
  n,
  answer,
  checked,
  verdict,
  selfMark,
  focused,
  onFocus,
  onBlur,
  inputRef,
  getInput,
  onAnswer,
  onSelfMark,
}: {
  q: DrawnQuestion;
  n: number;
  answer: Answer;
  checked: boolean;
  verdict?: Verdict;
  selfMark?: boolean;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  inputRef: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
  getInput: () => HTMLInputElement | HTMLTextAreaElement | null;
  onAnswer: (v: Answer) => void;
  onSelfMark: (ok: boolean) => void;
}) {
  const text = typeof answer === "string" ? answer : "";
  const border =
    verdict === "correct"
      ? "border-ok"
      : verdict === "wrong"
        ? "border-bad"
        : verdict === "accent"
          ? "border-warn"
          : "border-line";

  const fillInput = (
    <input
      ref={inputRef}
      type="text"
      lang="fr"
      value={text}
      disabled={checked}
      onChange={(e) => onAnswer(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      spellCheck={false}
      aria-label={`第 ${n} 題答案`}
      className={`mx-1 inline-block w-36 rounded-md border-b-2 bg-bg px-2 py-0.5 align-baseline outline-none focus:border-accent disabled:opacity-100 ${
        verdict === "correct"
          ? "border-ok text-ok"
          : verdict === "wrong"
            ? "border-bad text-bad"
            : verdict === "accent"
              ? "border-warn text-warn"
              : "border-muted"
      }`}
    />
  );

  return (
    <li className={`rounded-2xl border bg-surface p-4 ${border}`}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="text-sm text-muted">
          <span className="font-semibold text-ink">第 {n} 題</span>・{TYPE_LABELS[q.type].zh}
        </div>
        {verdict && verdict !== "pending" && <Badge verdict={verdict} />}
      </div>
      <p className="mb-2 text-sm text-muted">{q.instruction}</p>

      {q.type === "choice" && (
        <>
          <p className="mb-3">
            <Stem text={q.stem} />
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {q.displayOptions.map((opt, i) => {
              const picked = answer === i;
              const isAnswer = i === q.displayAnswer;
              let cls = "border-line bg-surface hover:border-accent/50";
              if (!checked && picked) cls = "border-accent bg-accent-soft";
              if (checked && isAnswer) cls = "border-ok bg-ok-soft";
              else if (checked && picked) cls = "border-bad bg-bad-soft";
              else if (checked) cls = "border-line bg-surface opacity-60";
              return (
                <button
                  key={i}
                  type="button"
                  disabled={checked}
                  onClick={() => onAnswer(i)}
                  aria-pressed={picked}
                  className={`flex min-h-12 items-center gap-3 rounded-xl border px-3 py-2 text-left transition ${cls}`}
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-current text-xs font-semibold">
                    {OPTION_LETTERS[i]}
                  </span>
                  <span lang="fr" className="fr">
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {q.type === "fill" && (
        <>
          <p className="leading-loose">
            {hasBlank(q.stem) ? (
              <Stem text={q.stem} blank={() => fillInput} />
            ) : (
              <>
                <Stem text={q.stem} />
                <span className="mt-2 block">{fillInput}</span>
              </>
            )}
          </p>
          {focused && !checked && <AccentBar target={getInput} onInsert={onAnswer} />}
        </>
      )}

      {q.type === "short" && (
        <>
          {q.stem && (
            <p className="mb-2">
              <Stem text={q.stem} />
            </p>
          )}
          <textarea
            ref={inputRef}
            lang="fr"
            rows={2}
            value={text}
            disabled={checked}
            onChange={(e) => onAnswer(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            autoCapitalize="sentences"
            spellCheck={false}
            placeholder="請用法文作答"
            aria-label={`第 ${n} 題答案`}
            className="fr w-full rounded-xl border border-line bg-bg px-3 py-2 outline-none focus:border-accent disabled:opacity-100"
          />
          {focused && !checked && <AccentBar target={getInput} onInsert={onAnswer} />}
        </>
      )}

      {checked && (
        <div className="mt-3 space-y-2 border-t border-line pt-3 text-sm">
          {q.type === "fill" && verdict !== "correct" && (
            <p>
              {verdict === "accent" && <span className="text-warn">差一點，重音符號不對。</span>}
              正確答案：
              <span lang="fr" className="font-semibold">
                {q.answers.join("／")}
              </span>
            </p>
          )}
          {q.type === "short" && (
            <>
              <div>
                <div className="text-muted">參考答案</div>
                <ul lang="fr" className="fr mt-1 space-y-0.5 font-medium">
                  {q.answers.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onSelfMark(true)}
                  aria-pressed={selfMark === true}
                  className={`min-h-11 flex-1 rounded-lg border ${
                    selfMark === true ? "border-ok bg-ok-soft font-medium text-ok" : "border-line"
                  }`}
                >
                  我答對了
                </button>
                <button
                  type="button"
                  onClick={() => onSelfMark(false)}
                  aria-pressed={selfMark === false}
                  className={`min-h-11 flex-1 rounded-lg border ${
                    selfMark === false ? "border-bad bg-bad-soft font-medium text-bad" : "border-line"
                  }`}
                >
                  我答錯了
                </button>
              </div>
            </>
          )}
          <p className="text-muted">
            <span className="font-medium text-ink">解析：</span>
            {q.explanation}
          </p>
        </div>
      )}
    </li>
  );
}

function Badge({ verdict }: { verdict: Exclude<Verdict, "pending"> }) {
  const map = {
    correct: ["答對", "bg-ok-soft text-ok"],
    wrong: ["答錯", "bg-bad-soft text-bad"],
    accent: ["差一點", "bg-warn-soft text-warn"],
  } as const;
  const [label, cls] = map[verdict];
  return <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{label}</span>;
}

export function Invalid({ message = "這個連結的設定不完整，請回到設定頁重新選擇。" }: { message?: string }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-center">
      <p className="mb-4 text-muted">{message}</p>
      <Link href="/" className="inline-block rounded-xl bg-accent px-5 py-3 font-medium text-accent-ink">
        回到設定
      </Link>
    </main>
  );
}
