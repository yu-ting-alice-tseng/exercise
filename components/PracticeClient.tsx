"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AccentBar from "./AccentBar";
import { Confetti, Tampon } from "./Decor";
import Stem, { hasBlank } from "./Stem";
import { BottomBar, btnPrimary, btnSecondary, Card, container, PageTitle, Progress, twoCol } from "./ui";
import { checkFill, checkShort, joinTokens, type ShortCheck, type Token } from "@/lib/check";
import { configToQuery, queryToConfig } from "@/lib/config";
import { drawPaper, OPTION_LETTERS, type Version } from "@/lib/draw";
import { saveHistory } from "@/lib/history";
import { getStat, recordSession, updateAnswer, type QStat, type Result as RecResult } from "@/lib/progress";
import { newSeed } from "@/lib/random";
import { TYPE_LABELS } from "@/lib/taxonomy";
import { paperTitle } from "@/lib/title";
import type { DrawnQuestion, Level, PaperConfig } from "@/lib/types";
import { useActiveTimer } from "@/lib/useActiveTimer";

export type Answer = string | number | undefined;
export type Verdict = "correct" | "wrong" | "accent" | "pending";
export interface Result {
  verdict: Verdict;
  short?: ShortCheck;
  /** 系統判錯，但學生按了「我的寫法也對」 */
  overridden?: boolean;
}

export default function PracticeClient() {
  const params = useSearchParams();
  // 網址改變（換一批題目）時重新掛載，作答狀態自然清空
  return <PracticeSession key={params.toString()} query={params.toString()} />;
}

function PracticeSession({ query }: { query: string }) {
  const router = useRouter();
  const params = useMemo(() => new URLSearchParams(query), [query]);
  const config = useMemo(() => queryToConfig(params), [params]);
  const version: Version = params.get("v") === "B" ? "B" : "A";
  const questions = useMemo(() => (config ? drawPaper(config)[version] : []), [config, version]);

  if (!config) return <Invalid />;
  if (questions.length === 0) return <Invalid message="沒有符合條件的題目，請回到設定頁調整。" />;

  return (
    <QuizRunner
      questions={questions}
      kind="practice"
      level={config.level}
      title={paperTitle(config)}
      historyConfig={config}
      header={{ back: { href: "/", label: "回到設定" }, fr: "Exercice en ligne", zh: paperTitle(config), sub: "線上練習" }}
      onNewBatch={() => {
        router.replace(`/practice/?${configToQuery({ ...config, seed: newSeed() })}`);
        window.scrollTo({ top: 0 });
      }}
    />
  );
}

export function praise(ratio: number): { fr: string; zh: string } {
  if (ratio >= 1) return { fr: "Parfait !", zh: "全部答對，太厲害了！" };
  if (ratio >= 0.9) return { fr: "Excellent !", zh: "太厲害了，幾乎全對！" };
  if (ratio >= 0.7) return { fr: "Très bien !", zh: "很好，再看看答錯的地方。" };
  if (ratio >= 0.5) return { fr: "Pas mal !", zh: "不錯，重做答錯的題目會更熟。" };
  return { fr: "Courage !", zh: "別灰心，看完解析再挑戰一次。" };
}

export function judge(q: DrawnQuestion, answer: Answer, mark: boolean | undefined): Result {
  const text = typeof answer === "string" ? answer : "";
  if (q.type === "choice") return { verdict: answer === q.displayAnswer ? "correct" : "wrong" };
  if (q.type === "fill") {
    const c = checkFill(text, q.answers);
    return { verdict: c === "correct" ? "correct" : c === "accent" ? "accent" : "wrong" };
  }
  if (q.open) return { verdict: mark === undefined ? "pending" : mark ? "correct" : "wrong" };
  const short = checkShort(text, q.answers);
  const base: Verdict = short.result === "correct" ? "correct" : short.result === "accent" ? "accent" : "wrong";
  return mark ? { verdict: "correct", short, overridden: true } : { verdict: base, short };
}

export const toRec = (v: Verdict): RecResult => (v === "correct" ? "c" : v === "accent" ? "a" : "w");

/** 作答介面：一般練習和複習共用，檢查答案時自動寫入學習紀錄 */
export function QuizRunner({
  questions,
  kind,
  level,
  title,
  header,
  historyConfig,
  onNewBatch,
  newBatchLabel = "換一批題目",
}: {
  questions: DrawnQuestion[];
  kind: "practice" | "review" | "exam";
  level?: Level;
  title: string;
  header: { back?: { href: string; label: string }; fr: string; zh: string; sub: string };
  historyConfig?: PaperConfig;
  onNewBatch?: () => void;
  newBatchLabel?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [checked, setChecked] = useState(false);
  const [marks, setMarks] = useState<Record<string, boolean>>({});
  const [onlyIds, setOnlyIds] = useState<string[] | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const inputs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const session = useRef<{ id: string; prev: Record<string, QStat | undefined> } | null>(null);
  const takeTime = useActiveTimer();

  const shown = onlyIds ? questions.filter((q) => onlyIds.includes(q.id)) : questions;

  const results = useMemo(() => {
    const map = new Map<string, Result>();
    if (!checked) return map;
    for (const q of shown) map.set(q.id, judge(q, answers[q.id], marks[q.id]));
    return map;
  }, [checked, shown, answers, marks]);

  const isAnswered = (id: string) => {
    const a = answers[id];
    return typeof a === "number" || (typeof a === "string" && a.trim() !== "");
  };
  const answeredCount = shown.filter((q) => isAnswered(q.id)).length;
  const verdicts = [...results.values()].map((r) => r.verdict);
  const correctCount = verdicts.filter((v) => v === "correct").length;
  const pendingCount = verdicts.filter((v) => v === "pending").length;
  const scoreText = `${correctCount}／${shown.length}`;
  const allCorrect = checked && correctCount === shown.length;

  // 一般練習全部批改完後，記錄到「最近的紀錄」
  useEffect(() => {
    if (!historyConfig || !checked || pendingCount > 0 || onlyIds) return;
    saveHistory({ config: historyConfig, kind: "practice", title: paperTitle(historyConfig), score: scoreText });
  }, [checked, pendingCount, scoreText, historyConfig, onlyIds]);

  function check() {
    const sec = takeTime();
    const graded = shown.filter((q) => !(q.type === "short" && q.open));
    const { sessionId, prev } = recordSession(
      { kind, level, title: onlyIds ? `${title}（重做答錯）` : title, sec },
      graded.map((q) => ({ id: q.id, grammar: q.grammar, result: toRec(judge(q, answers[q.id], marks[q.id]).verdict) })),
    );
    for (const q of shown) if (q.type === "short" && q.open) prev[q.id] = getStat(q.id);
    session.current = { id: sessionId, prev };
    setChecked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function mark(q: DrawnQuestion, ok: boolean) {
    setMarks((cur) => ({ ...cur, [q.id]: ok }));
    if (session.current) updateAnswer(session.current.id, q.id, q.grammar, ok ? "c" : "w", session.current.prev[q.id]);
  }

  function redoWrong() {
    const wrong = shown.filter((q) => results.get(q.id)?.verdict !== "correct").map((q) => q.id);
    const drop = <T,>(cur: Record<string, T>) => {
      const next = { ...cur };
      for (const id of wrong) delete next[id];
      return next;
    };
    setOnlyIds(wrong);
    setAnswers(drop);
    setMarks(drop);
    setChecked(false);
    session.current = null;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function jump(id: string) {
    document.getElementById(`q-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const p = praise(shown.length ? correctCount / shown.length : 0);

  const scoreCard = (
    <div role="status">
      <div className="eyebrow">Résultat</div>
      <div className="flex items-end justify-between gap-3">
        <div className="display text-5xl leading-none font-bold tabular-nums">
          {correctCount}
          <span className="text-2xl text-muted">／{shown.length}</span>
        </div>
        <div className="pb-2 pr-1">
          <Tampon text={p.fr} />
        </div>
      </div>
      <p className="mt-2 text-sm text-muted">
        {pendingCount > 0 ? `還有 ${pendingCount} 題請對照參考答案自己批改。` : p.zh}
      </p>
      <p className="mt-1 text-xs text-muted">
        已記錄到<Link href="/stats/" className="text-accent underline-offset-2 hover:underline">學習紀錄</Link>
        ，答錯的題目會排進<Link href="/review/" className="text-accent underline-offset-2 hover:underline">複習</Link>。
      </p>
    </div>
  );

  const afterActions = (
    <div className={`grid gap-2 lg:grid-cols-1 ${onNewBatch ? "grid-cols-2" : "grid-cols-1"}`}>
      <button type="button" onClick={redoWrong} disabled={allCorrect || pendingCount > 0} className={btnPrimary}>
        重做答錯的題目
      </button>
      {onNewBatch && (
        <button type="button" onClick={onNewBatch} className={btnSecondary}>
          {newBatchLabel}
        </button>
      )}
    </div>
  );

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle
        back={header.back}
        fr={onlyIds ? "On recommence !" : header.fr}
        zh={header.zh}
        sub={`${header.sub}${onlyIds ? "・重做答錯的題目" : ""}・共 ${shown.length} 題`}
      />

      <div className={twoCol}>
        <div>
          {checked && !onlyIds && shown.length > 0 && correctCount / shown.length >= 0.8 && <Confetti seed={correctCount + shown.length} />}
          {checked && <Card className={`mb-4 p-4 lg:hidden ${allCorrect ? "bg-ok-soft" : ""}`}>{scoreCard}</Card>}
          <ol className="space-y-3 sm:space-y-4">
            {shown.map((q, i) => (
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
                onMark={(ok) => mark(q, ok)}
              />
            ))}
          </ol>
        </div>

        {/* 電腦版側欄：進度、題號導覽 */}
        <aside className="hidden lg:sticky lg:top-6 lg:block">
          <Card className="p-5">
            {checked ? (
              scoreCard
            ) : (
              <>
                <div className="eyebrow">Progression</div>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="display text-lg font-bold">作答進度</span>
                  <span className="text-sm text-muted tabular-nums">
                    {answeredCount}／{shown.length}
                  </span>
                </div>
                <Progress value={answeredCount} max={shown.length} />
              </>
            )}
            <div className="mt-4 grid grid-cols-5 gap-1.5">
              {shown.map((q, i) => {
                const v = results.get(q.id)?.verdict;
                const cls = v
                  ? v === "correct"
                    ? "border-ok bg-ok-soft text-ok"
                    : v === "accent"
                      ? "border-warn bg-warn-soft text-warn"
                      : v === "wrong"
                        ? "border-bad bg-bad-soft text-bad"
                        : "border-line"
                  : isAnswered(q.id)
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-line text-muted";
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => jump(q.id)}
                    className={`display aspect-square rounded-md border text-sm font-bold transition hover:brightness-95 ${cls}`}
                    aria-label={`跳到第 ${i + 1} 題`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div className="mt-5">
              {checked ? (
                afterActions
              ) : (
                <button type="button" onClick={check} className={`${btnPrimary} w-full`}>
                  檢查答案
                </button>
              )}
            </div>
          </Card>
        </aside>
      </div>

      <BottomBar>
        {!checked ? (
          <>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex-1">
                <Progress value={answeredCount} max={shown.length} />
              </div>
              <span className="text-xs text-muted tabular-nums">
                已作答 {answeredCount}／{shown.length}
              </span>
            </div>
            <button type="button" onClick={check} className={`${btnPrimary} w-full`}>
              檢查答案
            </button>
          </>
        ) : (
          afterActions
        )}
      </BottomBar>
    </main>
  );
}

const VERDICT_STYLE: Record<Exclude<Verdict, "pending">, { label: string; badge: string; edge: string }> = {
  correct: { label: "答對", badge: "bg-ok-soft text-ok", edge: "border-l-ok" },
  wrong: { label: "答錯", badge: "bg-bad-soft text-bad", edge: "border-l-bad" },
  accent: { label: "差一點", badge: "bg-warn-soft text-warn", edge: "border-l-warn" },
};

export function QuestionCard({
  q,
  n,
  answer,
  checked,
  result,
  mark,
  focused,
  onFocus,
  onBlur,
  inputRef,
  getInput,
  onAnswer,
  onMark,
}: {
  q: DrawnQuestion;
  n: number;
  answer: Answer;
  checked: boolean;
  result?: Result;
  mark?: boolean;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  inputRef: (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
  getInput: () => HTMLInputElement | HTMLTextAreaElement | null;
  onAnswer: (v: Answer) => void;
  onMark: (ok: boolean) => void;
}) {
  const text = typeof answer === "string" ? answer : "";
  const v = result?.verdict;
  const style = v && v !== "pending" ? VERDICT_STYLE[v] : null;

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
      className={`fr mx-1 inline-block w-[clamp(7rem,32vw,11rem)] rounded-t-md border-b-2 bg-sunken px-2 py-0 align-baseline outline-none focus:border-accent focus:bg-accent-soft disabled:opacity-100 ${
        v === "correct"
          ? "border-ok text-ok"
          : v === "wrong"
            ? "border-bad text-bad"
            : v === "accent"
              ? "border-warn text-warn"
              : "border-ink/40"
      }`}
    />
  );

  return (
    <li
      id={`q-${q.id}`}
      className={`scroll-mt-6 rounded-xl border border-l-4 border-line bg-surface p-4 sm:p-5 ${style?.edge ?? "border-l-line"} ${
        v === "correct" ? "anim-pop" : v === "wrong" ? "anim-shake" : ""
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="display text-xl font-bold text-accent">{n}</span>
          <span className="text-sm text-muted">
            {TYPE_LABELS[q.type].zh}
            <span className="display ml-1 italic">· {TYPE_LABELS[q.type].fr}</span>
          </span>
        </div>
        {style && <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}>{style.label}</span>}
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
              let cls = "border-line bg-surface hover:border-accent/60";
              if (!checked && picked) cls = "border-accent bg-accent-soft";
              if (checked && isAnswer) cls = "border-ok bg-ok-soft";
              else if (checked && picked) cls = "border-bad bg-bad-soft";
              else if (checked) cls = "border-line opacity-55";
              return (
                <button
                  key={i}
                  type="button"
                  disabled={checked}
                  onClick={() => onAnswer(i)}
                  aria-pressed={picked}
                  className={`flex min-h-12 items-center gap-3 rounded-lg border px-3 py-2 text-left transition active:scale-[0.99] ${cls}`}
                >
                  <span
                    className={`display grid size-7 shrink-0 place-items-center rounded-full border text-sm font-bold ${
                      picked && !checked ? "border-accent bg-accent text-accent-ink" : "border-current"
                    }`}
                  >
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
          <p className="leading-[2.2]">
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
            autoCorrect="off"
            spellCheck={false}
            placeholder="請用法文作答…"
            aria-label={`第 ${n} 題答案`}
            className="fr seyes w-full resize-y rounded-lg border border-line px-3 pb-1 outline-none focus:border-accent disabled:opacity-100"
          />
          {focused && !checked && <AccentBar target={getInput} onInsert={onAnswer} />}
        </>
      )}

      {checked && result && (
        <div className="mt-3 space-y-3 border-t border-dashed border-line pt-3 text-sm">
          {q.type === "fill" && v !== "correct" && (
            <p>
              {v === "accent" && <span className="text-warn">重音符號不對。</span>}
              正確答案：
              <span lang="fr" className="fr font-semibold">
                {q.answers.join("／")}
              </span>
            </p>
          )}

          {q.type === "short" && result.short && (
            <ShortFeedback check={result.short} q={q} overridden={!!result.overridden} onOverride={() => onMark(true)} />
          )}

          {q.type === "short" && q.open && (
            <OpenFeedback answers={q.answers} mark={mark} onMark={onMark} />
          )}

          <p className="rounded-lg bg-sunken px-3 py-2 text-muted">
            <span className="display mr-1 font-bold text-ink italic">Explication</span>
            {q.explanation}
          </p>
        </div>
      )}
    </li>
  );
}

function Tokens({ tokens, missingClass = "mark-missing" }: { tokens: Token[]; missingClass?: string }) {
  return (
    <span lang="fr" className="fr">
      {joinTokens(tokens).map(({ token, space }, i) => (
        <span key={i}>
          <span
            className={
              token.status === "wrong"
                ? "mark-wrong"
                : token.status === "accent"
                  ? "mark-accent"
                  : token.status === "missing"
                    ? missingClass
                    : ""
            }
          >
            {token.text}
          </span>
          {space ? " " : ""}
        </span>
      ))}
    </span>
  );
}

function ShortFeedback({
  check,
  q,
  overridden,
  onOverride,
}: {
  check: ShortCheck;
  q: Extract<DrawnQuestion, { type: "short" }>;
  overridden: boolean;
  onOverride: () => void;
}) {
  const others = q.answers.filter((a) => a !== check.referenceText);

  if (check.result === "correct") {
    return others.length > 0 ? (
      <details className="text-muted">
        <summary className="cursor-pointer">其他正確寫法</summary>
        <ul lang="fr" className="fr mt-1 list-disc pl-5">
          {others.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </details>
    ) : null;
  }

  return (
    <div className="space-y-2">
      {check.result !== "empty" && (
        <div>
          <div className="mb-0.5 text-xs text-muted">你的答案（波浪線是寫錯的字）</div>
          <Tokens tokens={check.mine} />
        </div>
      )}
      <div>
        <div className="mb-0.5 text-xs text-muted">
          參考答案{check.result !== "empty" ? "（綠底是你漏掉或寫錯的部分）" : ""}
        </div>
        {check.result === "empty" ? (
          <span lang="fr" className="fr font-semibold">
            {check.referenceText}
          </span>
        ) : (
          <Tokens tokens={check.reference} />
        )}
      </div>
      {others.length > 0 && (
        <details className="text-muted">
          <summary className="cursor-pointer">其他正確寫法（{others.length}）</summary>
          <ul lang="fr" className="fr mt-1 list-disc pl-5">
            {others.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </details>
      )}
      {check.result !== "empty" &&
        (overridden ? (
          <p className="text-ok">已改為答對。</p>
        ) : (
          <button type="button" onClick={onOverride} className="min-h-10 text-sm text-accent underline underline-offset-4">
            我的寫法也正確，算我答對
          </button>
        ))}
    </div>
  );
}

function OpenFeedback({ answers, mark, onMark }: { answers: string[]; mark?: boolean; onMark: (ok: boolean) => void }) {
  return (
    <div className="space-y-2">
      <div>
        <div className="mb-0.5 text-xs text-muted">參考答案（開放式作答，請自己對照）</div>
        <ul lang="fr" className="fr font-semibold">
          {answers.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        {[true, false].map((ok) => (
          <button
            key={String(ok)}
            type="button"
            onClick={() => onMark(ok)}
            aria-pressed={mark === ok}
            className={`min-h-11 flex-1 rounded-lg border ${
              mark === ok ? (ok ? "border-ok bg-ok-soft font-medium text-ok" : "border-bad bg-bad-soft font-medium text-bad") : "border-line"
            }`}
          >
            {ok ? "我答對了" : "我答錯了"}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Invalid({ message = "這個連結的設定不完整，請回到設定頁重新選擇。" }: { message?: string }) {
  return (
    <main className={`${container} py-16 text-center`}>
      <p className="display mb-1 text-2xl text-rouge italic">Oups !</p>
      <p className="mb-6 text-muted">{message}</p>
      <Link href="/" className={btnPrimary}>
        回到設定
      </Link>
    </main>
  );
}
