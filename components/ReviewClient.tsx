"use client";

import { useLang, useT } from "@/lib/i18n";
import { useMemo, useState } from "react";
import Link from "next/link";
import { QuizRunner } from "./PracticeClient";
import Stem from "./Stem";
import { btnPrimary, btnQuiet, Card, container, PageTitle } from "./ui";
import { BANK } from "@/lib/bank";
import { prepare } from "@/lib/draw";
import { dueIds, markMastered, reviewIds, type QStat } from "@/lib/progress";
import { mulberry32, newSeed, shuffle } from "@/lib/random";
import { isGrammarId, LEVELS, TYPE_LABELS, topicName } from "@/lib/taxonomy";
import type { DrawnQuestion, Level, Question } from "@/lib/types";
import { useProgress } from "@/lib/useProgress";
import { useNow } from "@/lib/useNow";

const BY_ID = new Map(BANK.map((q) => [q.id, q]));
const BATCH = 20;

type Tab = "due" | "book";

export default function ReviewClient() {
  const { progress, ready } = useProgress();
  const [tab, setTab] = useState<Tab>("due");
  const [level, setLevel] = useState<Level | "all">("all");
  const [quiz, setQuiz] = useState<{ questions: DrawnQuestion[]; title: string; key: number } | null>(null);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);

  const due = useMemo(() => dueIds(progress).filter((id) => BY_ID.has(id)), [progress]);
  const book = useMemo(() => reviewIds(progress).filter((id) => BY_ID.has(id)), [progress]);

  function start(ids: string[], title: string) {
    const rand = mulberry32(newSeed());
    const picked = shuffle(ids, rand)
      .slice(0, BATCH)
      .map((id) => prepare(BY_ID.get(id)!, rand));
    setQuiz({ questions: picked, title, key: Date.now() });
    window.scrollTo({ top: 0 });
  }

  if (quiz) {
    return (
      <QuizRunner
        key={quiz.key}
        questions={quiz.questions}
        kind="review"
        title={quiz.title}
        header={{ fr: "Révision", zh: quiz.title, sub: t("複習", "Révision") }}
        onNewBatch={() => {
          setQuiz(null);
          window.scrollTo({ top: 0 });
        }}
        newBatchLabel={t("回到複習清單", "Retour à la révision")}
      />
    );
  }

  const bookFiltered = level === "all" ? book : book.filter((id) => BY_ID.get(id)!.level === level);

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle fr="Révision" zh="複習" sub={t("答錯的題目會依照間隔複習法排程，越熟練，複習間隔越長。", "Les erreurs reviennent selon la répétition espacée : mieux vous les maîtrisez, plus l’intervalle s’allonge.")} />

      <div className="mb-5 grid grid-cols-2 rounded-lg bg-sunken p-1 sm:inline-grid sm:w-auto">
        {(
          [
            ["due", t(`今日待複習（${ready ? due.length : "…"}）`, `À réviser aujourd’hui (${ready ? due.length : "…"})`)],
            ["book", t(`錯題本（${ready ? book.length : "…"}）`, `Carnet d’erreurs (${ready ? book.length : "…"})`)],
          ] as const
        ).map(([tb, label]) => (
          <button
            key={tb}
            type="button"
            onClick={() => setTab(tb)}
            aria-pressed={tab === tb}
            className={`min-h-11 rounded-md px-4 text-sm font-medium transition ${
              tab === tb ? "bg-surface text-ink shadow-sm" : "text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {!ready ? (
        <p className="text-muted">{t("載入中…", "Chargement…")}</p>
      ) : tab === "due" ? (
        <DueView due={due} book={book} progress={progress.q} onStart={start} />
      ) : (
        <>
          <div className="scroll-x -mx-4 mb-4 px-4">
            <div className="flex w-max gap-2">
              {(["all", ...LEVELS.map((l) => l.id)] as const).map((l) => {
                const n = l === "all" ? book.length : book.filter((id) => BY_ID.get(id)!.level === l).length;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLevel(l)}
                    aria-pressed={level === l}
                    className={`min-h-10 rounded-full border px-4 text-sm transition ${
                      level === l ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface"
                    }`}
                  >
                    {l === "all" ? t("全部", "Tous") : l}
                    <span className="ml-1 opacity-70">{n}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {bookFiltered.length === 0 ? (
            <Empty text={t("錯題本是空的。答錯的題目會自動收進這裡。", "Le carnet est vide. Les erreurs y sont ajoutées automatiquement.")} />
          ) : (
            <>
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={btnPrimary}
                  onClick={() => start(bookFiltered, t(`錯題本${level === "all" ? "" : `・${level}`}`, `Carnet d’erreurs${level === "all" ? "" : ` · ${level}`}`))}
                >
                  {t(`練習錯題（${Math.min(BATCH, bookFiltered.length)} 題）`, `Refaire les erreurs (${Math.min(BATCH, bookFiltered.length)})`)}
                </button>
              </div>
              <BookList ids={bookFiltered} stats={progress.q} />
            </>
          )}
        </>
      )}
    </main>
  );
}

function DueView({
  due,
  book,
  progress,
  onStart,
}: {
  due: string[];
  book: string[];
  progress: Record<string, QStat>;
  onStart: (ids: string[], title: string) => void;
}) {
  // 依文法點分組，方便看出今天要複習哪些主題
  const groups = useMemo(() => {
    const map = new Map<string, { level: Level; grammar: string; n: number }>();
    for (const id of due) {
      const q = BY_ID.get(id)!;
      const k = `${q.level}:${q.grammar}`;
      const g = map.get(k) ?? { level: q.level, grammar: q.grammar, n: 0 };
      g.n++;
      map.set(k, g);
    }
    return [...map.values()].sort((a, b) => b.n - a.n);
  }, [due]);

  const now = useNow();
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  const upcoming = useMemo(() => {
    return book
      .map((id) => progress[id])
      .filter((s) => s && s.due > now)
      .sort((a, b) => a.due - b.due)[0];
  }, [book, progress, now]);

  if (due.length === 0) {
    return (
      <Empty
        text={
          book.length === 0
            ? t("目前沒有需要複習的題目。先去做幾回線上練習吧！", "Rien à réviser pour l’instant. Faites quelques exercices en ligne !")
            : t(`今天的複習都完成了，Bravo !${upcoming ? `下一次複習在 ${new Date(upcoming.due).toLocaleDateString("zh-TW", { month: "numeric", day: "numeric" })}。` : ""}`, `Révision du jour terminée, bravo !${upcoming ? ` Prochaine révision le ${new Date(upcoming.due).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}.` : ""}`)
        }
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <Card className="p-5 lg:sticky lg:top-6 lg:order-2">
        <div className="eyebrow">Révision du jour</div>
        <div className="flex items-baseline justify-between">
          <span className="display text-lg font-bold">{t("今日待複習", "À réviser")}</span>
          <span>
            <span className="display text-4xl font-bold">{due.length}</span>
            <span className="ml-1 text-sm text-muted">{t("題", "questions")}</span>
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">{t(`每次最多 ${BATCH} 題。答對的題目會延後到更久以後再複習，答錯的明天會再出現。`, `${BATCH} questions maximum par séance. Les bonnes réponses reviennent plus tard, les erreurs dès demain.`)}</p>
        <button type="button" className={`${btnPrimary} mt-4 w-full`} onClick={() => onStart(due, t("今日複習", "Révision du jour"))}>
          {t("開始複習", "Commencer")}
        </button>
      </Card>
      <Card className="p-4 sm:p-5 lg:order-1">
        <div className="eyebrow">Aujourd&apos;hui</div>
        <h2 className="display text-lg font-bold">{t("今天要複習的文法點", "Points de grammaire à revoir")}</h2>
        <ul className="mt-3 divide-y divide-line">
          {groups.map((g) => (
            <li key={`${g.level}-${g.grammar}`} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <span className="mr-2 rounded bg-accent-soft px-1.5 py-0.5 text-xs font-semibold text-accent">{g.level}</span>
                <span className="font-medium">{topicName(g.level, "grammar", g.grammar, lang)}</span>
              </div>
              <span className="shrink-0 text-sm text-muted">{t(`${g.n} 題`, `${g.n} q.`)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function BookList({ ids, stats }: { ids: string[]; stats: Record<string, QStat> }) {
  const [shown, setShown] = useState(30);
  const now = useNow();
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  return (
    <>
      <ol className="space-y-3">
        {ids.slice(0, shown).map((id) => {
          const q = BY_ID.get(id)!;
          const st = stats[id];
          return (
            <li key={id}>
              <Card className="p-4 sm:p-5">
                <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                  <span className="rounded bg-accent-soft px-1.5 py-0.5 font-semibold text-accent">{q.level}</span>
                  <span>{topicName(q.level, "grammar", q.grammar, lang)}</span>
                  <span>・{lang === "fr" ? TYPE_LABELS[q.type].fr : TYPE_LABELS[q.type].zh}</span>
                  <span className="ml-auto">
                    {t(`答錯 ${st.miss} 次・`, `${st.miss} erreur(s) · `)}
                    {st.due <= now ? t("今天複習", "à revoir aujourd’hui") : t(`${new Date(st.due).toLocaleDateString("zh-TW", { month: "numeric", day: "numeric" })} 複習`, `à revoir le ${new Date(st.due).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`)}
                  </span>
                </div>
                <p className="mb-1 text-sm text-muted">{q.instruction}</p>
                {q.stem && (
                  <p>
                    <Stem text={q.stem} />
                  </p>
                )}
                <p lang="fr" className="fr mt-1 font-semibold text-ok">
                  {answerText(q)}
                </p>
                <p className="mt-2 rounded-lg bg-sunken px-3 py-2 text-sm text-muted">
                  <span className="display mr-1 font-bold text-ink italic">Explication</span>
                  {q.explanation}
                  {isGrammarId(q.grammar) && (
                    <Link href={`/learn/grammar/${q.grammar}/`} className="ml-1.5 whitespace-nowrap text-accent underline-offset-4 hover:underline">
                      {t("看文法筆記 →", "Voir la fiche →")}
                    </Link>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => markMastered(id)}
                  className="mt-2 min-h-10 text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  {t("我已經會了，移出錯題本", "Je maîtrise : retirer du carnet")}
                </button>
              </Card>
            </li>
          );
        })}
      </ol>
      {ids.length > shown && (
        <button type="button" className={`${btnQuiet} mt-4 w-full`} onClick={() => setShown((n) => n + 30)}>
          {t(`顯示更多（還有 ${ids.length - shown} 題）`, `Afficher plus (${ids.length - shown} restantes)`)}
        </button>
      )}
    </>
  );
}

function answerText(q: Question): string {
  if (q.type === "choice") return q.options[q.answer];
  return q.answers.join("／");
}

function Empty({ text }: { text: string }) {
  const t = useT();
  return (
    <Card className="p-8 text-center">
      <div className="mb-2 text-5xl" aria-hidden>☕️</div>
      <p className="display mb-2 text-2xl text-rouge italic">Rien à réviser</p>
      <p className="mb-5 text-muted">{text}</p>
      <Link href="/" className={btnPrimary}>
        {t("去練習", "S’entraîner")}
      </Link>
    </Card>
  );
}
