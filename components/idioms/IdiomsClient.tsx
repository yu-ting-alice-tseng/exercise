"use client";

import { useMemo, useState } from "react";
import InlineQuiz from "@/components/learn/InlineQuiz";
import Speak from "@/components/learn/Speak";
import { btnPrimary, btnQuiet } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { IdiomKind } from "@/lib/idiomTypes";
import { IDIOM_KINDS, IDIOM_THEMES, IDIOMS, idiomQuiz, REG_LABEL, type IdiomEntry } from "@/lib/idioms";
import { newSeed } from "@/lib/random";

type Mode = "all" | "guess";

const REG_CLS: Record<IdiomEntry["reg"], string> = {
  soutenu: "bg-accent-soft text-accent",
  courant: "bg-sunken text-muted",
  familier: "bg-rouge-soft text-rouge",
};

function chip(on: boolean) {
  return `inline-flex min-h-9 shrink-0 items-center rounded-full border px-3 text-sm transition ${
    on ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-accent/60"
  }`;
}

function Card({ it, guess, open, onToggle }: { it: IdiomEntry; guess: boolean; open: boolean; onToggle: () => void }) {
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  const hidden = guess && !open;
  const reg = REG_LABEL[it.reg];
  return (
    <li className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-start gap-2">
        <Speak text={it.fr.replace(/\(qqn\)|qqn|qqch/g, "").replace(/\s*\/\s*/g, ", ")} label={`${t("朗讀", "Écouter")} ${it.fr}`} className="mt-0.5 size-8 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="rounded bg-accent px-1.5 font-bold text-accent-ink tabular-nums">{it.level}</span>
            <span className={`rounded px-1.5 font-bold ${REG_CLS[it.reg]}`}>{t(reg.zh, reg.fr)}</span>
          </div>
          <p lang="fr" className="display mt-1 text-lg leading-snug font-bold">
            {it.fr}
          </p>
          {it.lit && <p className="mt-0.5 text-xs text-muted">{it.kind === "familier" || it.kind === "jeunes" ? <span lang="fr">{it.lit}</span> : t(`字面：${it.lit}`, `Mot à mot : ${it.lit}`)}</p>}
        </div>
      </div>

      {hidden ? (
        <button type="button" onClick={onToggle} className="mt-3 w-full rounded-lg border border-dashed border-accent/50 py-2.5 text-sm font-medium text-accent hover:bg-accent-soft">
          {t("想一想是什麼意思，再點這裡看答案", "Devinez le sens, puis touchez ici")}
        </button>
      ) : (
        <div className="mt-2 space-y-1.5">
          <p className="font-medium">{it.zh}</p>
          {it.eq && (
            <p className="text-sm">
              <span className="mr-1 rounded bg-warn-soft px-1.5 text-[11px] font-bold text-warn">{t("中文類似說法", "En chinois")}</span>
              {it.eq}
            </p>
          )}
          <div className="flex gap-2 rounded-lg bg-sunken/60 px-2.5 py-2">
            <Speak text={it.ex[0]} label={t("朗讀例句", "Écouter l’exemple")} className="mt-0.5 size-7 shrink-0" />
            <div className="min-w-0">
              <p lang="fr" className="text-[0.95rem]">
                {it.ex[0]}
              </p>
              <p className="text-sm text-muted">{it.ex[1]}</p>
            </div>
          </div>
          {it.note && (
            <p className="text-xs text-muted">
              <span className="mr-1 font-bold">{t("小知識", "Le saviez-vous ?")}</span>
              {it.note}
            </p>
          )}
          {guess && (
            <button type="button" onClick={onToggle} className="text-xs text-muted underline-offset-2 hover:underline">
              {t("再遮起來", "Masquer")}
            </button>
          )}
        </div>
      )}
    </li>
  );
}

export default function IdiomsClient() {
  const [kind, setKind] = useState<IdiomKind>("expression");
  const [theme, setTheme] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<Mode>("all");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [seed, setSeed] = useState<number | null>(null);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);

  const themes = IDIOM_THEMES.filter((th) => th.kind === kind);
  const k = IDIOM_KINDS.find((x) => x.id === kind)!;

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    return IDIOMS.filter((it) => {
      if (needle) {
        const hay = `${it.fr} ${it.zh} ${it.eq ?? ""} ${it.lit ?? ""}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
        return hay.includes(needle);
      }
      return it.kind === kind && (!theme || it.th === theme);
    });
  }, [kind, theme, q]);

  const quiz = useMemo(() => (seed === null ? [] : idiomQuiz(list.length >= 4 ? list : IDIOMS.filter((it) => it.kind === kind), seed)), [seed, list, kind]);

  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label={t("類別", "Catégorie")}>
        {IDIOM_KINDS.map((x) => {
          const n = IDIOMS.filter((it) => it.kind === x.id).length;
          const on = kind === x.id && !q;
          return (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setKind(x.id);
                setTheme(null);
                setQ("");
                setSeed(null);
              }}
              className={`rounded-xl border-2 p-2.5 text-left transition sm:p-3 ${on ? "border-accent bg-accent-soft" : "border-line bg-surface hover:border-accent/50"}`}
            >
              <div className="text-sm leading-tight font-bold sm:text-base">
                {t(x.zh, x.fr)} <span className="text-xs font-normal text-muted tabular-nums sm:text-sm">{n}</span>
              </div>
              {lang === "zh" && (
                <div lang="fr" className="display hidden text-xs text-muted italic sm:block">
                  {x.fr}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="mb-3 text-sm text-muted">{t(k.desc, k.descFr)}</p>

      <div className="mb-4 space-y-2">
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSeed(null);
          }}
          placeholder={t("搜尋法文或中文，例如 chat、放鴿子", "Rechercher : chat, pluie, argent…")}
          aria-label={t("搜尋", "Rechercher")}
          className="min-h-11 w-full rounded-lg border border-line bg-surface px-3"
        />
        {!q && (
          <div className="scroll-x -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            <button type="button" onClick={() => setTheme(null)} className={chip(theme === null)}>
              {t("全部", "Tout")}
            </button>
            {themes.map((th) => (
              <button key={th.id} type="button" onClick={() => setTheme(th.id)} className={chip(theme === th.id)}>
                {t(th.zh, th.fr)}
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" aria-pressed={mode === "all"} onClick={() => setMode("all")} className={chip(mode === "all")}>
            {t("全部顯示", "Tout afficher")}
          </button>
          <button
            type="button"
            aria-pressed={mode === "guess"}
            onClick={() => {
              setMode("guess");
              setOpen(new Set());
            }}
            className={chip(mode === "guess")}
          >
            {t("先猜意思", "Deviner le sens")}
          </button>
          <span className="ml-auto text-xs text-muted tabular-nums">{t(`${list.length} 則`, `${list.length} entrées`)}</span>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="rounded-xl border border-line bg-surface p-6 text-center text-muted">{t("找不到符合的說法。", "Aucun résultat.")}</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {list.map((it) => (
            <Card key={it.id} it={it} guess={mode === "guess"} open={open.has(it.id)} onToggle={() => toggle(it.id)} />
          ))}
        </ul>
      )}

      <section id="quiz-idioms" className="mt-10 scroll-mt-6 rounded-2xl border-2 border-accent/30 bg-accent-soft/40 p-4 sm:p-6">
        {seed === null ? (
          <div>
            {lang === "zh" && <div className="eyebrow">Testez-vous !</div>}
            <h2 className="display text-xl font-bold">{t("猜意思小測驗", "Testez-vous !")}</h2>
            <p className="mt-1 mb-4 text-sm text-muted">
              {t("從目前列出的說法隨機抽 8 題，看法文選出正確意思。答錯的題目會排進複習。", "8 expressions tirées de la liste affichée : choisissez le bon sens. Les erreurs passent en révision.")}
            </p>
            <button type="button" onClick={() => setSeed(newSeed())} className={btnPrimary}>
              {t("開始測驗", "Commencer")}
            </button>
          </div>
        ) : (
          <InlineQuiz
            key={seed}
            questions={quiz}
            level={quiz[0]?.level ?? "B1"}
            recordTitle={`俗語諺語：${k.zh}`}
            eyebrow="Testez-vous !"
            heading={t(`猜意思：${quiz.length} 題`, `Que veut dire… ? ${quiz.length} questions`)}
            sub={t("選出每句話真正的意思。", "Choisissez le vrai sens de chaque expression.")}
            actions={() => (
              <button
                type="button"
                onClick={() => {
                  setSeed(newSeed());
                  document.getElementById("quiz-idioms")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={btnQuiet}
              >
                {t("再來一組", "Une autre série")}
              </button>
            )}
          />
        )}
      </section>
    </div>
  );
}
