"use client";

import { useState } from "react";
import type { Ex, VocabGroup } from "@/lib/learnTypes";
import { Rich } from "./Blocks";
import Speak from "./Speak";
import { useLang } from "@/lib/i18n";
import { LearnToggle, Memory, useDeck } from "@/components/study/LearnBits";
import { isDue, vocabDeck } from "@/lib/idiomSrs";
import { vocabPhraseId, vocabWordId } from "@/lib/study";
import { useNow } from "@/lib/useNow";

const LVL_LABEL = { 1: "A1", 2: "A2", 3: "B1+" } as const;

type Mode = "all" | "hideZh" | "hideFr";
type Lvl = 0 | 1 | 2 | 3;
type Status = "all" | "new" | "learned" | "due";

const MODES: { id: Mode; zh: string; fr: string }[] = [
  { id: "all", zh: "全部顯示", fr: "Tout afficher" },
  { id: "hideZh", zh: "遮住中文", fr: "Masquer le chinois" },
  { id: "hideFr", zh: "遮住法文", fr: "Masquer le français" },
];

const LVLS: { id: Lvl; zh: string; fr?: string }[] = [
  { id: 0, zh: "全部", fr: "Tous" },
  { id: 1, zh: "A1" },
  { id: 2, zh: "A2" },
  { id: 3, zh: "B1+" },
];

/** 念的時候拿掉 (m.)、（說明）這類標註，斜線改成停頓 */
export function speakable(fr: string): string {
  return fr
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/（[^）]*）/g, "")
    .replace(/\s*\/\s*/g, ", ")
    .trim();
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`inline-flex min-h-9 items-center rounded-full border px-3 text-sm transition ${
        on ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-accent/60"
      }`}
    >
      {children}
    </button>
  );
}

export default function VocabClient({ themeId, groups, phrases }: { themeId: string; groups: VocabGroup[]; phrases?: Ex[] }) {
  const [mode, setMode] = useState<Mode>("all");
  const [lvl, setLvl] = useState<Lvl>(0);
  const [shown, setShown] = useState<Set<string>>(new Set());
  const [showEx, setShowEx] = useState(true);
  const [status, setStatus] = useState<Status>("all");
  const store = useDeck(vocabDeck);
  const now = useNow();
  const wid = (fr: string) => vocabWordId(themeId, fr);
  const pid = (fr: string) => vocabPhraseId(themeId, fr);
  const keep = (id: string) => {
    const c = store[id];
    if (status === "new") return !c;
    if (status === "learned") return !!c;
    if (status === "due") return !!c && isDue(c, now);
    return true;
  };
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);

  const toggle = (k: string) =>
    setShown((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });

  const hidden = (k: string, part: "fr" | "zh") =>
    !shown.has(k) && ((part === "zh" && mode === "hideZh") || (part === "fr" && mode === "hideFr"));

  const visible = groups
    .map((g, gi) => ({ ...g, gi, words: g.words.map((w, wi) => ({ ...w, k: `${gi}-${wi}`, id: wid(w.fr) })).filter((w) => (!lvl || w.lvl === lvl) && keep(w.id)) }))
    .filter((g) => g.words.length);

  const shownPhrases = (phrases ?? []).map(([fr, zh], i) => ({ fr, zh, i, id: pid(fr) })).filter((p) => keep(p.id));
  const allIds = [...groups.flatMap((g) => g.words.map((w) => wid(w.fr))), ...(phrases ?? []).map(([fr]) => pid(fr))];
  const learnedHere = allIds.filter((id) => store[id]).length;
  const dueHere = allIds.filter((id) => store[id] && isDue(store[id], now)).length;
  const unlearnedShown = [...visible.flatMap((g) => g.words.map((w) => w.id)), ...shownPhrases.map((p) => p.id)].filter((id) => !store[id]);

  return (
    <div>
      {learnedHere > 0 && (
        <a href="#review" className="mb-4 flex items-center gap-3 rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm transition hover:border-accent">
          <span>
            {t(`這個主題已學 ${learnedHere}／${allIds.length}`, `${learnedHere}/${allIds.length} appris`)}
            {dueHere > 0 ? <b className="text-accent">{t(`・該複習 ${dueHere}`, ` · ${dueHere} à réviser`)}</b> : null}
          </span>
          <span className="ml-auto font-bold text-accent">{t("去複習 ↓", "Réviser ↓")}</span>
        </a>
      )}
      <div className="z-10 -mx-4 mb-5 space-y-2 border-b sm:sticky sm:top-0 border-line bg-bg/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-14 text-xs text-muted">{t("模式", "Mode")}</span>
          {MODES.map((m) => (
            <Chip
              key={m.id}
              on={mode === m.id}
              onClick={() => {
                setMode(m.id);
                setShown(new Set());
              }}
            >
              {t(m.zh, m.fr)}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-14 text-xs text-muted">{t("等級", "Niveau")}</span>
          {LVLS.map((l) => (
            <Chip key={l.id} on={lvl === l.id} onClick={() => setLvl(l.id)}>
              {t(l.zh, l.fr ?? l.zh)}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-14 text-xs text-muted">{t("例句", "Exemples")}</span>
          <Chip on={showEx} onClick={() => setShowEx(true)}>
            {t("顯示", "Afficher")}
          </Chip>
          <Chip on={!showEx} onClick={() => setShowEx(false)}>
            {t("隱藏", "Masquer")}
          </Chip>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-14 text-xs text-muted">{t("狀態", "Statut")}</span>
          {(
            [
              ["all", "全部", "Tout"],
              ["new", "還沒學", "Nouveaux"],
              ["learned", "已學", "Appris"],
              ["due", "該複習", "À réviser"],
            ] as const
          ).map(([id, zh, fr]) => (
            <Chip key={id} on={status === id} onClick={() => setStatus(id)}>
              {t(zh, fr)}
            </Chip>
          ))}
          {unlearnedShown.length > 1 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(t(`把目前列出的 ${unlearnedShown.length} 項都標為已學？`, `Marquer les ${unlearnedShown.length} éléments affichés comme appris ?`))) vocabDeck.markLearned(unlearnedShown);
              }}
              className="ml-auto text-xs text-accent underline-offset-2 hover:underline"
            >
              {t(`全部標為已學（${unlearnedShown.length}）`, `Tout marquer (${unlearnedShown.length})`)}
            </button>
          )}
        </div>
        {mode !== "all" && <p className="text-xs text-muted">{t("先在心裡回想答案，再點一下卡片看答案。", "Cherchez la réponse de tête, puis touchez la carte pour la voir.")}</p>}
      </div>

      {visible.length === 0 && shownPhrases.length === 0 && (
        <p className="rounded-xl border border-line bg-surface p-6 text-center text-muted">{t("沒有符合的單字。", "Aucun mot.")}</p>
      )}
      <div className="space-y-8">
        {visible.map((g) => (
          <section key={g.gi}>
            <h2 className="display mb-3 text-lg font-bold">{g.t}</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {g.words.map((w) => {
                const hideFr = hidden(w.k, "fr");
                const hideZh = hidden(w.k, "zh");
                const quiz = mode !== "all";
                return (
                  <li key={w.k} className="rounded-lg border border-line bg-surface px-3 py-2.5">
                    <div className="flex items-start gap-2.5">
                    <Speak text={speakable(w.fr)} className="mt-0.5" />
                    <button
                      type="button"
                      disabled={!quiz}
                      onClick={() => toggle(w.k)}
                      aria-label={quiz ? (hideFr || hideZh ? t("顯示答案", "Afficher la réponse") : t("再遮起來", "Masquer")) : undefined}
                      className="min-w-0 flex-1 text-left disabled:cursor-default"
                    >
                      <span lang="fr" className={`block font-medium ${hideFr ? "rounded bg-sunken text-transparent select-none" : ""}`}>
                        {w.fr}
                      </span>
                      <span className={`block text-sm text-muted ${hideZh ? "rounded bg-sunken text-transparent select-none" : ""}`}>
                        {w.zh}
                      </span>
                    </button>
                    <span className="flex shrink-0 flex-col items-end gap-1">
                      <span className="rounded bg-sunken px-1.5 text-[11px] leading-5 text-muted tabular-nums">{LVL_LABEL[w.lvl]}</span>
                      <LearnToggle deck={vocabDeck} id={w.id} card={store[w.id]} compact />
                    </span>
                    </div>
                    {store[w.id] && <Memory c={store[w.id]} now={now} />}
                    {showEx && w.ex && !hideFr && !hideZh && (
                      <div className="mt-2 flex items-start gap-2 border-t border-dashed border-line pt-2">
                        <Speak text={w.ex[0].replace(/\*\*/g, "")} label={`${t("朗讀例句：", "Écouter : ")}${w.ex[0].replace(/\*\*/g, "")}`} className="size-7" />
                        <div className="min-w-0 text-sm">
                          <p lang="fr" className="italic">
                            <Rich text={w.ex[0]} />
                          </p>
                          <p className="text-muted">{w.ex[1]}</p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        {shownPhrases.length > 0 && (
          <section>
            <h2 className="display mb-3 text-lg font-bold">
              {lang === "fr" ? "Phrases utiles" : <>常用句子 <span className="text-sm font-normal text-muted italic">Phrases utiles</span></>}
            </h2>
            <ul className="space-y-2">
              {shownPhrases.map(({ fr, zh, i, id }) => {
                const k = `p-${i}`;
                const quiz = mode !== "all";
                const hideFr = hidden(k, "fr");
                const hideZh = hidden(k, "zh");
                return (
                  <li key={k} className="rounded-lg bg-sunken/70 px-3 py-2">
                    <div className="flex items-start gap-2.5">
                    <Speak text={fr} className="mt-0.5" />
                    <button type="button" disabled={!quiz} onClick={() => toggle(k)} className="min-w-0 flex-1 text-left disabled:cursor-default">
                      <span lang="fr" className={`fr block ${hideFr ? "rounded bg-line text-transparent select-none" : ""}`}>
                        {fr}
                      </span>
                      <span className={`block text-sm text-muted ${hideZh ? "rounded bg-line text-transparent select-none" : ""}`}>{zh}</span>
                    </button>
                    <LearnToggle deck={vocabDeck} id={id} card={store[id]} compact />
                    </div>
                    {store[id] && <Memory c={store[id]} now={now} />}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
