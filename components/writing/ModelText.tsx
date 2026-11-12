"use client";

import { useState } from "react";
import Speak from "@/components/learn/Speak";
import { countWords } from "@/lib/writing";
import type { ModelPart } from "@/lib/writingTypes";

/** 範文：每段標出在結構中的角色，可以切換中文翻譯 */
export default function ModelText({ parts, context, note }: { parts: ModelPart[]; context?: ModelPart[]; note?: string }) {
  const [zh, setZh] = useState(true);
  const [labels, setLabels] = useState(true);
  const words = parts.filter((p) => !/主旨|標題|稱呼|署名|大綱/.test(p.label)).reduce((n, p) => n + countWords(p.fr), 0);

  const chip = (on: boolean, set: (v: boolean) => void, a: string, b: string) => (
    <button
      type="button"
      onClick={() => set(!on)}
      aria-pressed={on}
      className={`inline-flex min-h-9 items-center rounded-full border px-3 text-sm transition ${
        on ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-accent/60"
      }`}
    >
      {on ? a : b}
    </button>
  );

  const block = (p: ModelPart, i: number, kind: "context" | "model") => (
    <div key={`${kind}-${i}`} className="group">
      {labels && (
        <div className={`mb-1 inline-block rounded px-2 py-0.5 text-[11px] font-bold ${kind === "context" ? "bg-sunken text-muted" : "bg-rouge-soft text-rouge"}`}>{p.label}</div>
      )}
      <div className="flex gap-2">
        <Speak text={p.fr} label={`朗讀：${p.label}`} className="mt-1 size-7 opacity-70 group-hover:opacity-100" />
        <div className="min-w-0 flex-1">
          <p lang="fr" className="fr whitespace-pre-line">
            {p.fr}
          </p>
          {zh && <p className="mt-0.5 text-sm whitespace-pre-line text-muted">{p.zh}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {chip(zh, setZh, "顯示中文", "只看法文")}
        {chip(labels, setLabels, "顯示結構標籤", "隱藏結構標籤")}
        <span className="ml-auto text-xs text-muted tabular-nums">範文正文 {words} 字</span>
      </div>
      {context && context.length > 0 && <div className="mb-4 space-y-4 rounded-xl border border-dashed border-line bg-sunken/50 p-4">{context.map((p, i) => block(p, i, "context"))}</div>}
      <article className="feuille space-y-4 rounded-xl px-4 py-5 sm:px-6">{parts.map((p, i) => block(p, i, "model"))}</article>
      {note && <p className="mt-3 rounded-lg bg-warn-soft px-3 py-2 text-sm">{note}</p>}
    </div>
  );
}
