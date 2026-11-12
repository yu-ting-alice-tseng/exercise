"use client";

import { useLang, useT } from "@/lib/i18n";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ListenPlayer from "./ListenPlayer";
import { Confetti, Tampon } from "./Decor";
import { Invalid, judge, praise, QuestionCard, toRec, type Answer } from "./PracticeClient";
import { BottomBar, btnPrimary, btnQuiet, Card, container, PageTitle, twoCol } from "./ui";
import { drawPaper, prepare } from "@/lib/draw";
import { countWords, getExam, toQuestion } from "@/lib/exams";
import { EXAM_KINDS, type ExamSection, type ExamSet } from "@/lib/examTypes";
import { getStat, recordSession, updateAnswer, type QStat } from "@/lib/progress";
import { mulberry32 } from "@/lib/random";
import type { DrawnQuestion } from "@/lib/types";
import { useActiveTimer } from "@/lib/useActiveTimer";

const SECTION_ICON: Record<ExamSection["kind"], { zh: string; fr: string }> = {
  listening: { zh: "聽", fr: "CO" },
  reading: { zh: "讀", fr: "CE" },
  structure: { zh: "構", fr: "LS" },
  writing: { zh: "寫", fr: "PE" },
  bank: { zh: "文", fr: "G" },
};

interface Built {
  section: ExamSection;
  questions: DrawnQuestion[];
}

export default function ExamRunnerPage() {
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  const seed = Number.parseInt(params.get("seed") ?? "1", 10) || 1;
  const set = getExam(id);
  const tr = useT();
  if (!set) return <Invalid message={tr("找不到這份考卷。", "Épreuve introuvable.")} />;
  return <ExamRunner key={`${id}-${seed}`} set={set} seed={seed} />;
}

function ExamRunner({ set, seed }: { set: ExamSet; seed: number }) {
  // 依 seed 建立考卷：選項打亂、題庫部分隨機抽題
  const built: Built[] = useMemo(() => {
    const rand = mulberry32(seed);
    return set.sections.map((section, i) => {
      if (section.kind === "bank" && section.bank) {
        const drawn = drawPaper({
          level: set.level,
          by: "grammar",
          topics: [],
          counts: section.bank,
          difficulty: "all",
          seed: seed + i,
        }).A;
        return { section, questions: drawn };
      }
      return { section, questions: (section.questions ?? []).map((q) => prepare(toQuestion(set, q), rand)) };
    });
  }, [set, seed]);

  const all = useMemo(() => built.flatMap((b) => b.questions), [built]);

  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [marks, setMarks] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState(false);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [writings, setWritings] = useState<Record<number, string>>({});
  const inputs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const session = useRef<{ id: string; prev: Record<string, QStat | undefined> } | null>(null);
  const takeTime = useActiveTimer();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (checked) return;
    const start = Date.now() - elapsed * 1000;
    const t = window.setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const results = useMemo(() => {
    const map = new Map<string, ReturnType<typeof judge>>();
    if (!checked) return map;
    for (const q of all) map.set(q.id, judge(q, answers[q.id], marks[q.id]));
    return map;
  }, [checked, all, answers, marks]);

  const answered = all.filter((q) => {
    const a = answers[q.id];
    return typeof a === "number" || (typeof a === "string" && a.trim() !== "");
  }).length;
  const correct = [...results.values()].filter((r) => r.verdict === "correct").length;
  const kind = EXAM_KINDS.find((k) => k.id === set.exam);
  const lang = useLang();
  const tr = (zh: string, fr: string) => (lang === "fr" ? fr : zh);

  function submit() {
    if (answered < all.length && !window.confirm(tr(`還有 ${all.length - answered} 題沒有作答，確定要交卷嗎？`, `Il reste ${all.length - answered} question(s) sans réponse. Rendre la copie quand même ?`))) return;
    const graded = all.filter((q) => !(q.type === "short" && q.open));
    const { sessionId, prev } = recordSession(
      { kind: "exam", level: set.level, title: set.title, sec: takeTime() },
      graded.map((q) => ({ id: q.id, grammar: q.grammar, result: toRec(judge(q, answers[q.id], marks[q.id]).verdict) })),
    );
    for (const q of all) if (q.type === "short" && q.open) prev[q.id] = getStat(q.id);
    session.current = { id: sessionId, prev };
    setChecked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function mark(q: DrawnQuestion, ok: boolean) {
    setMarks((cur) => ({ ...cur, [q.id]: ok }));
    if (session.current) updateAnswer(session.current.id, q.id, q.grammar, ok ? "c" : "w", session.current.prev[q.id]);
  }

  const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const over = elapsed > set.minutes * 60;
  let n = 0;

  const p = praise(all.length ? correct / all.length : 0);
  const scoreCard = (
    <div role="status">
      <div className="eyebrow">Résultat</div>
      <div className="flex items-end justify-between gap-3">
        <div className="display text-5xl leading-none font-bold tabular-nums">
          {correct}
          <span className="text-2xl text-muted">／{all.length}</span>
        </div>
        <div className="pb-2 pr-1">
          <Tampon text={p.fr} />
        </div>
      </div>
      <ul className="mt-3 space-y-1 text-sm">
        {built
          .filter((b) => b.questions.length > 0)
          .map((b, i) => {
            const ok = b.questions.filter((q) => results.get(q.id)?.verdict === "correct").length;
            return (
              <li key={i} className="flex justify-between gap-2">
                <span className="truncate text-muted">{lang === "fr" ? b.section.fr : b.section.title}</span>
                <span className="tabular-nums">
                  {ok}／{b.questions.length}
                </span>
              </li>
            );
          })}
      </ul>
      <p className="mt-2 text-xs text-muted">{tr(`寫作不計分，請依照評分項目自我檢核。作答時間 ${mmss(elapsed)}。`, `L’écrit n’est pas noté : évaluez-vous avec la grille. Durée : ${mmss(elapsed)}.`)}</p>
    </div>
  );

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle back={{ href: "/exam/", label: tr("模考", "Examens") }} fr={set.fr} zh={set.title} sub={tr(`${kind?.zh ?? ""}・建議作答時間 ${set.minutes} 分鐘・選擇與填充共 ${all.length} 題`, `${kind?.fr ?? ""} · durée conseillée ${set.minutes} min · ${all.length} questions`)} />

      <p className="mb-4 rounded-lg bg-sunken px-4 py-2 text-xs text-muted">
        {tr("本站模擬題皆為原創，依照考試題型編寫，並非官方試題，分數僅供參考。", "Épreuve originale sur le modèle de l’examen, et non un sujet officiel. Le score est indicatif.")}
      </p>

      <div className={twoCol}>
        <div className="space-y-5">
          {checked && all.length > 0 && correct / all.length >= 0.8 && <Confetti seed={correct + all.length} />}
          {checked && <Card className="p-4 lg:hidden">{scoreCard}</Card>}
          {built.map((b, si) => (
            <Card key={si} className="overflow-hidden">
              <div className="flex items-center gap-3 border-b border-line bg-sunken/60 px-4 py-3 sm:px-5">
                <span className="timbre display grid size-11 shrink-0 place-items-center bg-accent text-lg font-bold text-accent-ink" aria-hidden>
                  {lang === "fr" ? SECTION_ICON[b.section.kind].fr : SECTION_ICON[b.section.kind].zh}
                </span>
                <div className="min-w-0">
                  {lang === "zh" && <div className="eyebrow">{b.section.fr}</div>}
                  <h2 className="display text-lg font-bold">{lang === "fr" ? b.section.fr : b.section.title}</h2>
                </div>
              </div>
              <div className="space-y-4 p-4 sm:p-5">
                <p className="text-sm text-muted">{b.section.instruction}</p>

                {b.section.passage?.speak && (
                  <>
                    <ListenPlayer text={b.section.passage.text} dialogue={b.section.passage.dialogue} unlimited={checked} />
                    {checked && (
                      <details className="rounded-lg bg-sunken/60 px-3 py-2 text-sm">
                        <summary className="cursor-pointer font-medium">{tr("逐字稿 Transcription", "Transcription")}</summary>
                        <p lang="fr" className="fr mt-2 whitespace-pre-line">
                          {b.section.passage.text}
                        </p>
                      </details>
                    )}
                  </>
                )}

                {b.section.passage && !b.section.passage.speak && (
                  <article className="feuille rounded-lg border border-line px-4 py-3">
                    {b.section.passage.title && <div className="mb-1 text-xs text-muted">{b.section.passage.title}</div>}
                    <p lang="fr" className="fr whitespace-pre-line">
                      {b.section.passage.text}
                    </p>
                  </article>
                )}

                {b.questions.length > 0 && (
                  <ol className="space-y-3">
                    {b.questions.map((q) => {
                      n++;
                      return (
                        <QuestionCard
                          key={q.id}
                          q={q}
                          n={n}
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
                      );
                    })}
                  </ol>
                )}

                {b.section.writing && (
                  <WritingBox
                    task={b.section.writing}
                    value={writings[si] ?? ""}
                    onChange={(v) => setWritings((cur) => ({ ...cur, [si]: v }))}
                    revealed={checked}
                  />
                )}
              </div>
            </Card>
          ))}
        </div>

        <aside className="hidden lg:sticky lg:top-6 lg:block">
          <Card className="p-5">
            {checked ? (
              scoreCard
            ) : (
              <>
                <div className="eyebrow">Chronomètre</div>
                <div className="flex items-baseline justify-between">
                  <span className="display text-lg font-bold">{tr("作答時間", "Temps écoulé")}</span>
                  <span className={`display text-3xl font-bold tabular-nums ${over ? "text-rouge" : ""}`}>{mmss(elapsed)}</span>
                </div>
                <p className="mt-1 text-xs text-muted">{tr(`建議 ${set.minutes} 分鐘內完成${over ? "，已超過建議時間" : ""}。`, `Durée conseillée : ${set.minutes} min${over ? " (dépassée)" : ""}.`)}</p>
                <p className="mt-3 text-sm text-muted tabular-nums">
                  {tr(`已作答 ${answered}／${all.length} 題`, `Répondu : ${answered}/${all.length}`)}
                </p>
              </>
            )}
            <div className="mt-5">
              {checked ? (
                <Link href="/exam/" className={`${btnQuiet} w-full`}>
                  {tr("回到模考列表", "Retour aux examens")}
                </Link>
              ) : (
                <button type="button" onClick={submit} className={`${btnPrimary} w-full`}>
                  {tr("交卷並批改", "Rendre et corriger")}
                </button>
              )}
            </div>
          </Card>
        </aside>
      </div>

      <BottomBar>
        {checked ? (
          <Link href="/exam/" className={`${btnQuiet} w-full`}>
            {tr("回到模考列表", "Retour aux examens")}
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <span className={`shrink-0 text-sm tabular-nums ${over ? "text-rouge" : "text-muted"}`}>
              {mmss(elapsed)}・{answered}／{all.length}
            </span>
            <button type="button" onClick={submit} className={`${btnPrimary} flex-1`}>
              {tr("交卷並批改", "Rendre et corriger")}
            </button>
          </div>
        )}
      </BottomBar>
    </main>
  );
}

function WritingBox({
  task,
  value,
  onChange,
  revealed,
}: {
  task: NonNullable<ExamSection["writing"]>;
  value: string;
  onChange: (v: string) => void;
  revealed: boolean;
}) {
  const [done, setDone] = useState(false);
  const [checks, setChecks] = useState<boolean[]>([]);
  const tr = useT();
  const words = countWords(value);
  const range = task.maxWords ? `${task.minWords}～${task.maxWords}` : tr(`至少 ${task.minWords}`, `${task.minWords} minimum`);
  const ok = words >= task.minWords && (!task.maxWords || words <= task.maxWords);
  const show = done || revealed;

  return (
    <div className="space-y-3">
      <div className="rounded-lg border-l-4 border-accent bg-accent-soft/60 px-4 py-3">
        <p lang="fr" className="fr">
          {task.prompt}
        </p>
      </div>
      <textarea
        lang="fr"
        rows={10}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        placeholder={tr("請在這裡用法文寫作…", "Rédigez ici en français…")}
        aria-label={tr("寫作作答區", "Zone de rédaction")}
        className="fr seyes w-full resize-y rounded-lg border border-line px-3 pb-1 outline-none focus:border-accent"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className={ok ? "text-ok" : "text-muted"}>
          {tr(`目前 ${words} 字（要求 ${range} 字）`, `${words} mots (demandé : ${range})`)}
        </span>
        {!show && (
          <button type="button" className={btnQuiet} onClick={() => setDone(true)}>
            {tr("寫完了，看評分項目與範文", "Terminé : voir la grille et le modèle")}
          </button>
        )}
      </div>
      <p className="text-xs text-muted">{tr("字數以空白和撇號分開計算（c’est 算兩個字），僅供參考。", "Décompte indicatif : espaces et apostrophes séparent les mots (c’est = 2 mots).")}</p>

      {show && (
        <div className="space-y-3 rounded-lg bg-sunken/60 p-4">
          <div>
            <div className="mb-2 font-bold">{tr("自我檢核", "Auto-évaluation")}</div>
            <ul className="space-y-1.5">
              {task.rubric.map((r, i) => (
                <li key={i}>
                  <label className="flex min-h-10 items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checks[i] ?? false}
                      onChange={(e) => setChecks((c) => Object.assign([...c], { [i]: e.target.checked }))}
                      className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
                    />
                    {r}
                  </label>
                </li>
              ))}
            </ul>
            <p className="mt-1 text-xs text-muted">
              {tr(`已達成 ${checks.filter(Boolean).length}／${task.rubric.length} 項`, `Critères remplis : ${checks.filter(Boolean).length}/${task.rubric.length}`)}
            </p>
          </div>
          <details>
            <summary className="cursor-pointer font-bold">{tr("範文 Exemple de production", "Exemple de production")}</summary>
            <p lang="fr" className="fr mt-2 whitespace-pre-line">
              {task.model}
            </p>
            <p className="mt-1 text-xs text-muted">{tr(`範文 ${countWords(task.model)} 字，只是寫法之一，內容可以自由發揮。`, `Modèle de ${countWords(task.model)} mots : une possibilité parmi d’autres.`)}</p>
          </details>
        </div>
      )}
    </div>
  );
}
