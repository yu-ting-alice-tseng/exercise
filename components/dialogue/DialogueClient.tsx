"use client";

import { useRef, useState } from "react";
import Speak from "@/components/learn/Speak";
import ReadingQuiz from "@/components/reading/ReadingQuiz";
import { type ActiveGloss, GlossCard, GlossList, Sentence } from "@/components/reading/Gloss";
import type { Dialogue } from "@/lib/dialogueTypes";
import { useLang } from "@/lib/i18n";
import { LearnToggle, Memory, useDeck } from "@/components/study/LearnBits";
import { dialogueDeck } from "@/lib/idiomSrs";
import { dialogueGlossId } from "@/lib/study";
import { useNow } from "@/lib/useNow";
import { plainText } from "@/lib/readingText";
import { speakFr, stopSpeaking } from "@/lib/speak";
import type { DrawnQuestion } from "@/lib/types";

type Mode = "show" | "tap" | "hide";

const MODES: { id: Mode; zh: string; fr: string }[] = [
  { id: "show", zh: "顯示翻譯", fr: "Avec traduction" },
  { id: "tap", zh: "點句子看翻譯", fr: "Traduction au toucher" },
  { id: "hide", zh: "只看法文", fr: "Français seul" },
];

/** 不同說話的人用不同音高朗讀 */
const PITCH = [1, 0.75, 1.25, 0.9];

/** 每位說話者的泡泡顏色 */
const BUBBLE = ["bg-surface border-line", "bg-accent-soft border-accent/30", "bg-rouge-soft border-rouge/30", "bg-warn-soft border-warn/30"];

export default function DialogueClient({ d, questions }: { d: Dialogue; questions: DrawnQuestion[] }) {
  const [mode, setMode] = useState<Mode>("show");
  const [role, setRole] = useState<number | null>(null);
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<ActiveGloss | null>(null);
  const [playing, setPlaying] = useState<number | null>(null);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  const stop = useRef(false);
  const store = useDeck(dialogueDeck);
  const now = useNow();
  const timer = useRef<number | undefined>(undefined);

  function playFrom(i: number) {
    if (i === 0) stop.current = false;
    const line = d.lines[i];
    if (stop.current || !line) {
      setPlaying(null);
      return;
    }
    setPlaying(i);
    const [who, fr] = line;
    const next = () => {
      if (!stop.current) timer.current = window.setTimeout(() => playFrom(i + 1), 450);
    };
    // 角色扮演：輪到自己時不念，留時間讓學習者自己說
    if (role === who && !revealed.has(i)) {
      timer.current = window.setTimeout(next, 1500 + plainText(fr).length * 70);
      return;
    }
    speakFr(plainText(fr), next, 0.9, PITCH[who] ?? 1);
  }

  function stopAll() {
    stop.current = true;
    window.clearTimeout(timer.current);
    stopSpeaking();
    setPlaying(null);
  }

  const flip = (set: React.Dispatch<React.SetStateAction<Set<number>>>, i: number) =>
    set((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  const chip = (on: boolean) =>
    `inline-flex min-h-9 items-center rounded-full border px-3 text-sm transition ${on ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-accent/60"}`;

  return (
    <div>
      <div className="z-10 -mx-4 mb-5 space-y-2 border-b sm:sticky sm:top-0 border-line bg-bg/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
        <div className="flex flex-wrap items-center gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              onClick={() => {
                setMode(m.id);
                setOpen(new Set());
              }}
              className={chip(mode === m.id)}
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
            {playing === null ? t("播放對話", "Écouter") : t("停止", "Arrêter")}
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t("角色扮演", "Jeu de rôle")}>
          <span className="text-xs font-bold text-muted">{t("角色扮演", "Jeu de rôle")}</span>
          <button type="button" aria-pressed={role === null} onClick={() => setRole(null)} className={chip(role === null)}>
            {t("不扮演", "Non")}
          </button>
          {d.speakers.map((s, k) => (
            <button
              key={k}
              type="button"
              aria-pressed={role === k}
              onClick={() => {
                stopAll();
                setRole(k);
                setRevealed(new Set());
              }}
              className={chip(role === k)}
            >
              <span lang="fr">{s.name}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-muted">
          {role === null
            ? t("有底線的字詞可以點開看解釋。選一個角色，就能練習自己說那個角色的台詞。", "Touchez les mots soulignés pour leur explication. Choisissez un rôle pour vous entraîner à dire ses répliques.")
            : t("輪到你的台詞時只顯示中文：先用法文說出來，再點「看法文」對答案。播放對話時會在你的台詞停下來等你。", "Vos répliques s’affichent en chinois : dites-les en français, puis touchez « Voir le français ». L’écoute fait une pause à chacune de vos répliques.")}
        </p>
      </div>

      <div className="space-y-3">
        {d.lines.map(([who, fr, zh], i) => {
          const sp = d.speakers[who];
          const right = who === 1;
          const mine = role === who;
          const hidden = mine && !revealed.has(i);
          const showZh = mine || mode === "show" || (mode === "tap" && open.has(i));
          return (
            <div key={i} className={`flex ${right ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] sm:max-w-[75%] ${right ? "items-end text-right" : ""} flex flex-col`}>
                <div className="mb-0.5 px-1 text-xs text-muted">
                  <span lang="fr" className="font-bold text-ink">
                    {sp.name}
                  </span>{" "}
                  {sp.zh}
                  {mine && <span className="ml-1 rounded bg-accent px-1 text-[10px] font-bold text-accent-ink">{t("你", "Vous")}</span>}
                </div>
                <div
                  onClick={mode === "tap" && !mine ? () => flip(setOpen, i) : undefined}
                  className={`group flex gap-2 rounded-2xl border px-3 py-2 text-left shadow-sm transition ${BUBBLE[who] ?? BUBBLE[0]} ${
                    right ? "rounded-tr-sm" : "rounded-tl-sm"
                  } ${playing === i ? "ring-2 ring-accent" : ""} ${mode === "tap" && !mine ? "cursor-pointer" : ""}`}
                >
                  {!hidden && (
                    <span onClick={(e) => e.stopPropagation()} className="contents">
                      <Speak text={plainText(fr)} label={t("朗讀這一句", "Écouter cette phrase")} className="mt-0.5 size-7 shrink-0 opacity-70 group-hover:opacity-100" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    {hidden ? (
                      <>
                        <p className="font-medium">{zh}</p>
                        <button type="button" onClick={() => flip(setRevealed, i)} className="mt-1 text-sm font-medium text-accent underline-offset-2 hover:underline">
                          {t("看法文", "Voir le français")}
                        </button>
                      </>
                    ) : (
                      <>
                        <p lang="fr" className="fr">
                          <Sentence fr={fr} glossary={d.glossary} active={active?.key ?? null} onWord={setActive} />
                        </p>
                        {showZh && <p className="mt-0.5 text-sm text-muted">{zh}</p>}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {active && <GlossCard active={active} onClose={() => setActive(null)} />}

      <GlossList
        glossary={d.glossary}
        action={(key) => {
          const id = dialogueGlossId(d.id, key);
          return (
            <div className="mt-1">
              <LearnToggle deck={dialogueDeck} id={id} card={store[id]} compact />
              {store[id] && <Memory c={store[id]} now={now} />}
            </div>
          );
        }}
      />

      <section id={`quiz-${d.id}`} className="mt-10 scroll-mt-20 rounded-2xl border-2 border-accent/30 bg-accent-soft/40 p-4 sm:p-6">
        <ReadingQuiz id={d.id} level={d.level} title={d.title} questions={questions} zh={mode} kind="dialogue" />
      </section>
    </div>
  );
}
