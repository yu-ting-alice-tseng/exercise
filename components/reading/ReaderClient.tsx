"use client";

import { Fragment, useRef, useState } from "react";
import Speak from "@/components/learn/Speak";
import type { Gloss, Reading } from "@/lib/readingTypes";
import { glossKey, MARK, plainText } from "@/lib/readingText";
import { speakFr, stopSpeaking } from "@/lib/speak";

type Mode = "show" | "tap" | "hide";

const MODES: { id: Mode; zh: string }[] = [
  { id: "show", zh: "逐句顯示翻譯" },
  { id: "tap", zh: "點句子看翻譯" },
  { id: "hide", zh: "只看法文" },
];

interface Active {
  key: string;
  word: string;
  g: Gloss;
}

/** 把 [[字]] 換成可以點的按鈕 */
function Sentence({
  fr,
  glossary,
  active,
  onWord,
}: {
  fr: string;
  glossary: Reading["glossary"];
  active: string | null;
  onWord: (a: Active) => void;
}) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of fr.matchAll(MARK)) {
    const [all, word, key] = m;
    const k = glossKey(word, key);
    const g = glossary[k];
    if (m.index > last) out.push(fr.slice(last, m.index));
    out.push(
      g ? (
        <button
          key={m.index}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onWord({ key: k, word, g });
          }}
          className={`rounded-sm underline decoration-accent/50 decoration-dotted decoration-2 underline-offset-4 transition hover:bg-accent-soft ${
            active === k ? "bg-accent-soft text-accent" : ""
          }`}
        >
          {word}
        </button>
      ) : (
        word
      ),
    );
    last = m.index + all.length;
  }
  out.push(fr.slice(last));
  return <>{out}</>;
}

export default function ReaderClient({ reading }: { reading: Reading }) {
  const [mode, setMode] = useState<Mode>("show");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<Active | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const stop = useRef(false);

  const sentences = reading.paragraphs.flatMap((p, pi) => p.map((s, si) => ({ id: `${pi}-${si}`, fr: s[0] })));

  function playFrom(i: number) {
    if (i === 0) stop.current = false;
    const s = sentences[i];
    if (stop.current || !s) {
      setPlaying(null);
      return;
    }
    if (s.fr === "[…]") return playFrom(i + 1);
    setPlaying(s.id);
    speakFr(plainText(s.fr), () => {
      if (!stop.current) window.setTimeout(() => playFrom(i + 1), 400);
    });
  }

  function stopAll() {
    stop.current = true;
    stopSpeaking();
    setPlaying(null);
  }

  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 mb-5 flex flex-wrap items-center gap-2 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={mode === m.id}
            onClick={() => {
              setMode(m.id);
              setOpen(new Set());
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
          onClick={() => (playing === null ? playFrom(0) : stopAll())}
          className="ml-auto inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-sm hover:border-accent/60"
        >
          <span aria-hidden className="text-accent">
            {playing === null ? "▶" : "■"}
          </span>
          {playing === null ? "全文朗讀" : "停止"}
        </button>
        <p className="w-full text-xs text-muted">有底線的字可以點開看解釋。{mode === "tap" ? "點一下句子就會顯示翻譯。" : ""}</p>
      </div>

      <article className="feuille rounded-xl px-4 py-5 sm:px-6">
        {reading.paragraphs.map((p, pi) => (
          <div key={pi} className={pi ? "mt-5" : ""}>
            {p.map(([fr, zh], si) => {
              const id = `${pi}-${si}`;
              if (fr === "[…]")
                return (
                  <p key={id} className="my-3 text-center text-sm text-muted">
                    <span lang="fr" className="mr-2">
                      […]
                    </span>
                    {zh}
                  </p>
                );
              const showZh = mode === "show" || (mode === "tap" && open.has(id));
              return (
                <div
                  key={id}
                  onClick={mode === "tap" ? () => toggle(id) : undefined}
                  className={`group -mx-2 flex gap-2 rounded-lg px-2 py-1.5 transition ${playing === id ? "bg-accent-soft" : ""} ${
                    mode === "tap" ? "cursor-pointer hover:bg-sunken/70" : ""
                  }`}
                >
                  <span onClick={(e) => e.stopPropagation()} className="contents">
                    <Speak text={plainText(fr)} label="朗讀這一句" className="mt-1 size-7 opacity-70 group-hover:opacity-100" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p lang="fr" className={`fr ${reading.verse ? "whitespace-pre-line" : ""}`}>
                      <Sentence fr={fr} glossary={reading.glossary} active={active?.key ?? null} onWord={setActive} />
                    </p>
                    {showZh && <p className={`mt-0.5 text-sm text-muted ${reading.verse ? "whitespace-pre-line" : ""}`}>{zh}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </article>

      {/* 單字卡：固定在畫面底部，手機和電腦都好按 */}
      {active && (
        <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-4 sm:mx-auto sm:max-w-md" role="dialog" aria-label={`單字：${active.word}`}>
          <div className="anim-rise rounded-2xl border border-accent/40 bg-surface p-4 shadow-xl">
            <div className="flex items-start gap-3">
              <Speak text={plainText(active.g.lemma).replace(/\s*\([^)]*\)/g, "")} label={`朗讀 ${active.g.lemma}`} className="mt-0.5" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span lang="fr" className="display text-xl font-bold">
                    {active.g.lemma}
                  </span>
                  <span className="text-xs text-muted">{active.g.pos}</span>
                </div>
                <div className="font-medium">{active.g.zh}</div>
                {active.word.toLowerCase() !== active.g.lemma.toLowerCase() && (
                  <div className="mt-0.5 text-xs text-muted">
                    文中寫作 <span lang="fr" className="font-medium text-ink">{active.word}</span>
                  </div>
                )}
                {active.g.note && <p className="mt-1.5 text-sm text-muted">{active.g.note}</p>}
              </div>
              <button type="button" onClick={() => setActive(null)} className="grid size-9 shrink-0 place-items-center rounded-full text-muted hover:bg-sunken" aria-label="關閉單字卡">
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="mt-8">
        <h2 className="display mb-3 text-lg font-bold">
          單字表 <span className="text-sm font-normal text-muted italic">Vocabulaire</span>
        </h2>
        <dl className="grid gap-2 sm:grid-cols-2">
          {Object.entries(reading.glossary).map(([k, g]) => (
            <Fragment key={k}>
              <div className="flex items-start gap-2.5 rounded-lg border border-line bg-surface px-3 py-2">
                <Speak text={g.lemma.replace(/\s*\([^)]*\)/g, "")} className="mt-0.5 size-7" />
                <div className="min-w-0">
                  <dt lang="fr" className="font-medium">
                    {g.lemma} <span className="text-xs font-normal text-muted">{g.pos}</span>
                  </dt>
                  <dd className="text-sm text-muted">
                    {g.zh}
                    {g.note && <span className="block text-xs">{g.note}</span>}
                  </dd>
                </div>
              </div>
            </Fragment>
          ))}
        </dl>
      </section>
    </div>
  );
}
