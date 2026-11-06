"use client";

import { useState } from "react";
import type { Ex, VocabGroup } from "@/lib/learnTypes";
import Speak from "./Speak";

const LVL_LABEL = { 1: "A1", 2: "A2", 3: "B1+" } as const;

type Mode = "all" | "hideZh" | "hideFr";
type Lvl = 0 | 1 | 2 | 3;

const MODES: { id: Mode; zh: string }[] = [
  { id: "all", zh: "全部顯示" },
  { id: "hideZh", zh: "遮住中文" },
  { id: "hideFr", zh: "遮住法文" },
];

const LVLS: { id: Lvl; zh: string }[] = [
  { id: 0, zh: "全部" },
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

export default function VocabClient({ groups, phrases }: { groups: VocabGroup[]; phrases?: Ex[] }) {
  const [mode, setMode] = useState<Mode>("all");
  const [lvl, setLvl] = useState<Lvl>(0);
  const [shown, setShown] = useState<Set<string>>(new Set());

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
    .map((g, gi) => ({ ...g, gi, words: g.words.map((w, wi) => ({ ...w, k: `${gi}-${wi}` })).filter((w) => !lvl || w.lvl === lvl) }))
    .filter((g) => g.words.length);

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 mb-5 space-y-2 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-10 text-xs text-muted">模式</span>
          {MODES.map((m) => (
            <Chip
              key={m.id}
              on={mode === m.id}
              onClick={() => {
                setMode(m.id);
                setShown(new Set());
              }}
            >
              {m.zh}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-10 text-xs text-muted">等級</span>
          {LVLS.map((l) => (
            <Chip key={l.id} on={lvl === l.id} onClick={() => setLvl(l.id)}>
              {l.zh}
            </Chip>
          ))}
        </div>
        {mode !== "all" && <p className="text-xs text-muted">先在心裡回想答案，再點一下卡片看答案。</p>}
      </div>

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
                  <li key={w.k} className="flex items-start gap-2.5 rounded-lg border border-line bg-surface px-3 py-2.5">
                    <Speak text={speakable(w.fr)} className="mt-0.5" />
                    <button
                      type="button"
                      disabled={!quiz}
                      onClick={() => toggle(w.k)}
                      aria-label={quiz ? (hideFr || hideZh ? "顯示答案" : "再遮起來") : undefined}
                      className="min-w-0 flex-1 text-left disabled:cursor-default"
                    >
                      <span lang="fr" className={`block font-medium ${hideFr ? "rounded bg-sunken text-transparent select-none" : ""}`}>
                        {w.fr}
                      </span>
                      <span className={`block text-sm text-muted ${hideZh ? "rounded bg-sunken text-transparent select-none" : ""}`}>
                        {w.zh}
                      </span>
                      {w.ex && !hideFr && !hideZh && (
                        <span className="mt-1 block text-sm">
                          <span lang="fr" className="italic">
                            {w.ex[0]}
                          </span>
                          <span className="text-muted">　{w.ex[1]}</span>
                        </span>
                      )}
                    </button>
                    <span className="shrink-0 rounded bg-sunken px-1.5 text-[11px] leading-5 text-muted tabular-nums">{LVL_LABEL[w.lvl]}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        {phrases && phrases.length > 0 && (
          <section>
            <h2 className="display mb-3 text-lg font-bold">
              常用句子 <span className="text-sm font-normal text-muted italic">Phrases utiles</span>
            </h2>
            <ul className="space-y-2">
              {phrases.map(([fr, zh], i) => {
                const k = `p-${i}`;
                const quiz = mode !== "all";
                const hideFr = hidden(k, "fr");
                const hideZh = hidden(k, "zh");
                return (
                  <li key={k} className="flex items-start gap-2.5 rounded-lg bg-sunken/70 px-3 py-2">
                    <Speak text={fr} className="mt-0.5" />
                    <button type="button" disabled={!quiz} onClick={() => toggle(k)} className="min-w-0 flex-1 text-left disabled:cursor-default">
                      <span lang="fr" className={`fr block ${hideFr ? "rounded bg-line text-transparent select-none" : ""}`}>
                        {fr}
                      </span>
                      <span className={`block text-sm text-muted ${hideZh ? "rounded bg-line text-transparent select-none" : ""}`}>{zh}</span>
                    </button>
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
