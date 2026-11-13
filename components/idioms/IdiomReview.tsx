"use client";

import { useRef, useState } from "react";
import Speak from "@/components/learn/Speak";
import { btnPrimary, btnQuiet, btnSecondary } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import { IDIOMS, type IdiomEntry } from "@/lib/idioms";
import { buildIdiomQuiz, fillHint, gradeFill, quizToHtml, quizToText, type IdiomQ, type QMode } from "@/lib/idiomQuiz";
import { dueAt, getCard, isDue, reviewIdiom, setCard, type IdiomCard, type IdiomStore } from "@/lib/idiomSrs";
import { recordSession } from "@/lib/progress";
import { newSeed } from "@/lib/random";
import { useActiveTimer } from "@/lib/useActiveTimer";

type Scope = "due" | "learned";
interface Done {
  item: IdiomEntry;
  ok: boolean;
  nextDays: number;
}

const LETTERS = ["A", "B", "C", "D"];

function chip(on: boolean) {
  return `inline-flex min-h-9 items-center rounded-full border px-3 text-sm transition ${
    on ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-accent/60"
  }`;
}

/** 已學的俗語：依間隔複習出題，可以線上作答，也可以匯出測驗卷 */
export default function IdiomReview({ store, now }: { store: IdiomStore; now: number }) {
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  const [mode, setMode] = useState<QMode>("choice");
  const [scope, setScope] = useState<Scope>("due");
  const [count, setCount] = useState<number>(10);
  const [qs, setQs] = useState<IdiomQ[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [fillRes, setFillRes] = useState<"c" | "a" | "w" | "o" | null>(null);
  const [hint, setHint] = useState(false);
  const [done, setDone] = useState<Done[]>([]);
  const takeTime = useActiveTimer();
  const inputRef = useRef<HTMLInputElement>(null);
  const before = useRef<IdiomCard | undefined>(undefined);

  const learned = IDIOMS.filter((it) => store[it.id]);
  const due = learned.filter((it) => isDue(store[it.id], now)).sort((a, b) => dueAt(store[a.id]) - dueAt(store[b.id]));
  const pool = scope === "due" ? due : learned;
  const size = count === 0 ? pool.length : Math.min(count, pool.length);

  /** 出題：該複習的依到期先後；全部已學的優先挑記憶最弱的 */
  function pick(): IdiomEntry[] {
    if (scope === "due") return due.slice(0, size);
    return [...learned].sort((a, b) => dueAt(store[a.id]) - dueAt(store[b.id])).slice(0, size);
  }

  function start(items = pick()) {
    if (!items.length) return;
    setQs(buildIdiomQuiz(items, mode, newSeed()));
    setIdx(0);
    setDone([]);
    reset();
    takeTime();
  }

  function reset() {
    setPicked(null);
    setInput("");
    setFillRes(null);
    setHint(false);
  }

  function record(item: IdiomEntry, ok: boolean, strength: number, override = false) {
    // 「算我答對」：先回到作答前的狀態，再用答對重新計算
    if (override) setCard(item.id, before.current);
    else before.current = getCard(item.id);
    const c = reviewIdiom(item.id, ok, strength);
    setDone((d) => [...d.filter((x) => x.item.id !== item.id), { item, ok, nextDays: Math.round(c.ivl) }]);
  }

  function finish(list: Done[]) {
    if (!list.length) return;
    recordSession(
      { kind: "review", title: "俗語諺語複習", sec: takeTime() },
      list.map((d) => ({ id: `idiom-${d.item.id}`, grammar: "expressions", result: d.ok ? "c" : "w" })),
    );
  }

  function next() {
    if (!qs) return;
    if (idx + 1 >= qs.length) {
      finish(done);
      setIdx(qs.length);
      return;
    }
    setIdx(idx + 1);
    reset();
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function exportQuiz(kind: "print" | "txt") {
    const items = pick();
    if (!items.length) return;
    const quiz = buildIdiomQuiz(items, mode, newSeed());
    const title = "法文俗語諺語測驗";
    const sub = `${new Date().toLocaleDateString("zh-TW")}・${quiz.length} 題・${mode === "choice" ? "選擇題" : mode === "fill" ? "填空題" : "選擇與填空"}`;
    if (kind === "txt") {
      const blob = new Blob([quizToText(quiz, `${title}（${sub}）`)], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `french-idioms-quiz-${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      return;
    }
    const w = window.open("", "_blank");
    if (!w) {
      window.alert(t("瀏覽器擋住了新視窗，請允許彈出視窗後再試一次。", "Le navigateur a bloqué la fenêtre. Autorisez les fenêtres pop-up puis réessayez."));
      return;
    }
    w.document.write(quizToHtml(quiz, title, sub));
    w.document.close();
  }

  if (learned.length === 0)
    return (
      <div className="rounded-xl border border-dashed border-line bg-surface p-5 text-sm text-muted">
        {t("還沒有標為已學的說法。在卡片上按「標為已學」，之後這裡就會依照遺忘曲線安排複習。", "Aucune expression marquée comme apprise. Touchez « Je l’ai appris » sur une carte : les révisions seront planifiées ici.")}
      </div>
    );

  // 作答中
  if (qs && idx < qs.length) {
    const q = qs[idx];
    const it = q.item;
    const answered = q.type === "choice" ? picked !== null : fillRes !== null;
    return (
      <div>
        <div className="mb-3 flex items-center gap-3 text-sm">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-sunken">
            <div className="h-full bg-accent transition-all" style={{ width: `${(idx / qs.length) * 100}%` }} />
          </div>
          <span className="tabular-nums text-muted">
            {idx + 1}／{qs.length}
          </span>
          <button type="button" onClick={() => setQs(null)} className="text-muted underline-offset-2 hover:underline">
            {t("結束", "Arrêter")}
          </button>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4 sm:p-5">
          {q.type === "choice" ? (
            <>
              <div className="text-xs text-muted">{q.dir === "fr2zh" ? t("這句話是什麼意思？", "Que veut dire… ?") : t("哪一句法文是這個意思？", "Quelle expression veut dire… ?")}</div>
              <div className="mt-1 flex items-start gap-2">
                {q.dir === "fr2zh" && <Speak text={it.fr.replace(/\(qqn\)|qqn|qqch/g, "")} className="mt-0.5 size-8 shrink-0" />}
                <p lang={q.dir === "fr2zh" ? "fr" : "zh-Hant"} className="display text-xl font-bold">
                  {q.prompt}
                </p>
              </div>
              <div className="mt-3 grid gap-2">
                {q.options.map((o, k) => {
                  let cls = "border-line bg-surface hover:border-accent/60";
                  if (picked !== null && k === q.answer) cls = "border-ok bg-ok-soft";
                  else if (picked === k) cls = "border-bad bg-bad-soft";
                  else if (picked !== null) cls = "border-line opacity-55";
                  return (
                    <button
                      key={k}
                      type="button"
                      disabled={picked !== null}
                      onClick={() => {
                        setPicked(k);
                        record(it, k === q.answer, 0.8);
                      }}
                      className={`flex min-h-12 items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${cls}`}
                    >
                      <span className="display grid size-7 shrink-0 place-items-center rounded-full border border-current text-sm font-bold">{LETTERS[k]}</span>
                      <span lang={q.dir === "zh2fr" ? "fr" : "zh-Hant"}>{o}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const r = gradeFill(input, it.fr);
                setFillRes(r);
                record(it, r !== "w", r === "c" && !hint ? 1 : 0.6);
              }}
            >
              <div className="text-xs text-muted">{t("寫出法文說法", "Écrivez l’expression en français")}</div>
              <p className="mt-1 text-lg font-bold">{it.zh}</p>
              {it.eq && <p className="text-sm text-muted">{t(`類似中文：${it.eq}`, `En chinois : ${it.eq}`)}</p>}
              <p className="mt-1 text-sm text-muted">
                {t("例句：", "Exemple : ")}
                {it.ex[1]}
              </p>
              {hint && (
                <p lang="fr" className="mt-2 font-mono text-sm tracking-wider text-accent">
                  {fillHint(it.fr)}
                  {it.lit && it.kind !== "familier" && it.kind !== "jeunes" && <span className="ml-2 font-sans tracking-normal text-muted">{t(`字面：${it.lit}`, `Mot à mot : ${it.lit}`)}</span>}
                </p>
              )}
              <input
                ref={inputRef}
                lang="fr"
                autoFocus
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                value={input}
                disabled={fillRes !== null}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("用法文輸入…", "Tapez en français…")}
                aria-label={t("答案", "Réponse")}
                className={`mt-3 min-h-11 w-full rounded-lg border bg-surface px-3 text-[1.05rem] ${
                  fillRes === "c" || fillRes === "o" ? "border-ok" : fillRes === "a" ? "border-warn" : fillRes === "w" ? "border-bad" : "border-line"
                }`}
              />
              {fillRes === null && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="submit" className={btnPrimary}>
                    {t("檢查", "Vérifier")}
                  </button>
                  {!hint && (
                    <button type="button" onClick={() => setHint(true)} className={btnQuiet}>
                      {t("提示", "Indice")}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setFillRes("w");
                      record(it, false, 0);
                    }}
                    className={btnQuiet}
                  >
                    {t("我不知道", "Je ne sais pas")}
                  </button>
                </div>
              )}
            </form>
          )}

          {answered && (
            <div className="mt-4 space-y-1.5 border-t border-line pt-3">
              <p className={`font-bold ${(q.type === "choice" ? picked === q.answer : fillRes !== "w") ? "text-ok" : "text-bad"}`}>
                {q.type === "choice"
                  ? picked === q.answer
                    ? t("答對了！", "Bravo !")
                    : t("答錯了", "Raté")
                  : fillRes === "c"
                    ? t("完全正確！", "Parfait !")
                    : fillRes === "a"
                      ? t("算對，但注意重音", "Correct, attention aux accents")
                      : fillRes === "o"
                        ? t("已改成答對，下次複習的間隔會拉長得少一點", "Comptée juste, avec un intervalle un peu plus court")
                        : t("還不太對", "Pas tout à fait")}
              </p>
              <div className="flex items-start gap-2">
                <Speak text={it.fr.replace(/\(qqn\)|qqn|qqch/g, "")} className="mt-0.5 size-7 shrink-0" />
                <div>
                  <p lang="fr" className="font-bold">
                    {it.fr}
                  </p>
                  <p className="text-sm">{it.zh}</p>
                </div>
              </div>
              <p lang="fr" className="text-sm">
                {it.ex[0]}
              </p>
              <p className="text-sm text-muted">{it.ex[1]}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {/* 答完直接按 Enter 就能到下一題 */}
                <button type="button" autoFocus onClick={next} className={btnPrimary}>
                  {idx + 1 >= qs.length ? t("看結果", "Résultats") : t("下一題", "Suivant")}
                </button>
                {q.type === "fill" && fillRes === "w" && input.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      setFillRes("o");
                      record(it, true, 0.6, true);
                    }}
                    className={btnQuiet}
                  >
                    {t("我的寫法也對，算我答對", "Ma réponse est correcte aussi")}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 結果
  if (qs && idx >= qs.length) {
    const right = done.filter((d) => d.ok).length;
    const wrong = done.filter((d) => !d.ok);
    return (
      <div className="rounded-xl border border-line bg-surface p-4 sm:p-5">
        <p className="display text-2xl font-bold">
          {right}／{done.length}
        </p>
        <p className="text-sm text-muted">{t("每一則的下次複習時間都已經依結果重新安排。", "La prochaine révision de chaque expression a été replanifiée.")}</p>
        <ul className="mt-3 divide-y divide-line text-sm">
          {done.map((d) => (
            <li key={d.item.id} className="flex items-center justify-between gap-3 py-2">
              <span className="min-w-0">
                <span className={d.ok ? "text-ok" : "text-bad"}>{d.ok ? "✓" : "✕"}</span> <span lang="fr">{d.item.fr}</span>
              </span>
              <span className="shrink-0 text-xs text-muted tabular-nums">{t(`${d.nextDays} 天後複習`, `dans ${d.nextDays} j`)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {wrong.length > 0 && (
            <button type="button" onClick={() => start(wrong.map((d) => d.item))} className={btnPrimary}>
              {t(`再練一次答錯的 ${wrong.length} 則`, `Revoir les ${wrong.length} erreurs`)}
            </button>
          )}
          <button type="button" onClick={() => setQs(null)} className={btnQuiet}>
            {t("回到設定", "Retour")}
          </button>
        </div>
      </div>
    );
  }

  // 設定
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl border border-line bg-surface p-3">
          <div className="display text-2xl font-bold tabular-nums">{learned.length}</div>
          <div className="text-xs text-muted">{t("已學", "Apprises")}</div>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent-soft p-3">
          <div className="display text-2xl font-bold text-accent tabular-nums">{due.length}</div>
          <div className="text-xs text-muted">{t("今天該複習", "À réviser")}</div>
        </div>
        <div className="rounded-xl border border-line bg-surface p-3">
          <div className="display text-2xl font-bold tabular-nums">{learned.filter((it) => store[it.id].ivl >= 30).length}</div>
          <div className="text-xs text-muted">{t("已熟記", "Acquises")}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-12 text-xs font-bold text-muted">{t("題型", "Type")}</span>
          {(
            [
              ["choice", "選擇題", "QCM"],
              ["fill", "填空題", "À écrire"],
              ["mix", "混合", "Mélange"],
            ] as const
          ).map(([id, zh, fr]) => (
            <button key={id} type="button" aria-pressed={mode === id} onClick={() => setMode(id)} className={chip(mode === id)}>
              {t(zh, fr)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-12 text-xs font-bold text-muted">{t("範圍", "Quoi")}</span>
          <button type="button" aria-pressed={scope === "due"} onClick={() => setScope("due")} className={chip(scope === "due")}>
            {t(`該複習的（${due.length}）`, `À réviser (${due.length})`)}
          </button>
          <button type="button" aria-pressed={scope === "learned"} onClick={() => setScope("learned")} className={chip(scope === "learned")}>
            {t(`全部已學（${learned.length}）`, `Toutes (${learned.length})`)}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-12 text-xs font-bold text-muted">{t("題數", "Nombre")}</span>
          {[10, 20, 0].map((n) => (
            <button key={n} type="button" aria-pressed={count === n} onClick={() => setCount(n)} className={chip(count === n)}>
              {n === 0 ? t("全部", "Tout") : n}
            </button>
          ))}
        </div>
      </div>

      {size === 0 ? (
        <p className="text-sm text-muted">
          {t("今天沒有到期的說法，記憶都還很新。想多練習可以選「全部已學」。", "Rien à réviser aujourd’hui. Choisissez « Toutes » pour vous entraîner quand même.")}
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => start()} className={btnPrimary}>
            {t(`開始線上複習（${size} 題）`, `Réviser en ligne (${size})`)}
          </button>
          <button type="button" onClick={() => exportQuiz("print")} className={btnSecondary}>
            {t("匯出測驗卷（列印／PDF）", "Exporter (imprimer / PDF)")}
          </button>
          <button type="button" onClick={() => exportQuiz("txt")} className={btnQuiet}>
            {t("下載文字檔", "Télécharger (.txt)")}
          </button>
        </div>
      )}
      <p className="text-xs text-muted">
        {t(
          "線上複習會依你的答案重新安排下次複習時間；匯出的測驗卷只是題目和解答，不會改變排程。",
          "La révision en ligne replanifie chaque expression selon vos réponses ; la copie exportée ne change pas le planning.",
        )}
      </p>
    </div>
  );
}
