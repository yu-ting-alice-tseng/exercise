"use client";

import { useRef, useState } from "react";
import type { Ex } from "@/lib/learnTypes";
import { speakFr, stopSpeaking } from "@/lib/speak";
import { Rich } from "./Blocks";
import Speak from "./Speak";

type Mode = "all" | "hideZh" | "hideFr";

const MODES: { id: Mode; zh: string; hint: string }[] = [
  { id: "all", zh: "全部顯示", hint: "" },
  { id: "hideZh", zh: "看法文猜意思", hint: "先讀法文想想意思，再點一下看翻譯。" },
  { id: "hideFr", zh: "看中文說法文", hint: "先試著說出或寫下法文，再點一下對答案。" },
];

const plain = (s: string) => s.replace(/\*\*/g, "");

/** 更多例句：可以遮住一邊自我測驗，也可以全部連續朗讀 */
export default function ExampleDrill({ ex }: { ex: Ex[] }) {
  const [mode, setMode] = useState<Mode>("all");
  const [shown, setShown] = useState<Set<number>>(new Set());
  const [playing, setPlaying] = useState<number | null>(null);
  const stop = useRef(false);

  function playAll(i = 0) {
    if (i === 0) stop.current = false;
    if (stop.current || i >= ex.length) {
      setPlaying(null);
      return;
    }
    setPlaying(i);
    speakFr(plain(ex[i][0]), () => {
      if (!stop.current) window.setTimeout(() => playAll(i + 1), 500);
    });
  }

  function stopAll() {
    stop.current = true;
    stopSpeaking();
    setPlaying(null);
  }

  const toggle = (i: number) =>
    setShown((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  const hint = MODES.find((m) => m.id === mode)!.hint;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={mode === m.id}
            onClick={() => {
              setMode(m.id);
              setShown(new Set());
            }}
            className={`inline-flex min-h-9 items-center rounded-full border px-3 text-sm transition ${
              mode === m.id ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-accent/60"
            }`}
          >
            {m.zh}
          </button>
        ))}
        <button
          type="button"
          onClick={() => (playing === null ? playAll() : stopAll())}
          className="ml-auto inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-sm hover:border-accent/60"
        >
          <span aria-hidden className="text-accent">
            {playing === null ? "▶" : "■"}
          </span>
          {playing === null ? "全部朗讀" : "停止"}
        </button>
      </div>
      {hint && <p className="mb-3 text-xs text-muted">{hint}</p>}
      <ol className="space-y-2">
        {ex.map(([fr, zh], i) => {
          const open = shown.has(i);
          const hideFr = mode === "hideFr" && !open;
          const hideZh = mode === "hideZh" && !open;
          return (
            <li
              key={i}
              className={`flex items-start gap-2.5 rounded-lg px-3 py-2 transition ${playing === i ? "bg-accent-soft" : "bg-sunken/70"}`}
            >
              <span className="display mt-1.5 w-5 shrink-0 text-right text-xs text-muted tabular-nums">{i + 1}</span>
              <Speak text={plain(fr)} className="mt-0.5" />
              <button
                type="button"
                disabled={mode === "all"}
                onClick={() => toggle(i)}
                aria-label={mode === "all" ? undefined : open ? "再遮起來" : "顯示答案"}
                className="min-w-0 flex-1 text-left disabled:cursor-default"
              >
                <span lang="fr" className={`fr block ${hideFr ? "rounded bg-line text-transparent select-none [&_*]:text-transparent" : ""}`}>
                  <Rich text={fr} />
                </span>
                <span className={`block text-sm text-muted ${hideZh ? "rounded bg-line text-transparent select-none" : ""}`}>{zh}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
