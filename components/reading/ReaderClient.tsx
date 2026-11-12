"use client";

import { useRef, useState } from "react";
import Speak from "@/components/learn/Speak";
import type { Reading } from "@/lib/readingTypes";
import { type ActiveGloss, GlossCard, GlossList, Sentence } from "./Gloss";
import type { DrawnQuestion } from "@/lib/types";
import ReadingQuiz from "./ReadingQuiz";
import { plainText } from "@/lib/readingText";
import { speakFr, stopSpeaking } from "@/lib/speak";
import { useLang } from "@/lib/i18n";

type Mode = "show" | "tap" | "hide";

const MODES: { id: Mode; zh: string; fr: string }[] = [
  { id: "show", zh: "逐句顯示翻譯", fr: "Traduction phrase par phrase" },
  { id: "tap", zh: "點句子看翻譯", fr: "Traduction au toucher" },
  { id: "hide", zh: "只看法文", fr: "Français seul" },
];

export default function ReaderClient({ reading, questions }: { reading: Reading; questions: DrawnQuestion[] }) {
  const [mode, setMode] = useState<Mode>("show");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<ActiveGloss | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
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
            {t(m.zh, m.fr)}
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
          {playing === null ? t("全文朗讀", "Écouter le texte") : t("停止", "Arrêter")}
        </button>
        <p className="w-full text-xs text-muted">
          {t("有底線的字可以點開看解釋。", "Touchez un mot souligné pour voir son explication. ")}{mode === "tap" ? t("點一下句子就會顯示翻譯。", "Touchez une phrase pour afficher sa traduction. ") : ""}{t("這個設定也會套用到文末的閱讀測驗。", "Ce réglage s’applique aussi au quiz final.")}
        </p>
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
                    <Speak text={plainText(fr)} label={t("朗讀這一句", "Écouter cette phrase")} className="mt-1 size-7 opacity-70 group-hover:opacity-100" />
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

      {active && <GlossCard active={active} onClose={() => setActive(null)} />}

      <GlossList glossary={reading.glossary} />

      <section id={`quiz-${reading.id}`} className="mt-10 scroll-mt-20 rounded-2xl border-2 border-accent/30 bg-accent-soft/40 p-4 sm:p-6">
        <ReadingQuiz id={reading.id} level={reading.level} title={reading.title} questions={questions} zh={mode} />
      </section>
    </div>
  );
}
