"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BottomBar, btnPrimary, btnSecondary, Card, Heading, twoCol } from "./ui";
import { BANK } from "@/lib/bank";
import { configToQuery } from "@/lib/config";
import { countByType, filterPool } from "@/lib/draw";
import { newSeed } from "@/lib/random";
import {
  DIFFICULTY_FR,
  DIFFICULTY_LABELS,
  GRAMMAR,
  LEVELS,
  THEMES,
  TYPE_LABELS,
  TYPE_ORDER,
  topicName,
} from "@/lib/taxonomy";
import type { DifficultyFilter, FilterBy, Level, PaperConfig, QuestionType } from "@/lib/types";

export default function SetupForm({ recent }: { recent?: React.ReactNode }) {
  const router = useRouter();
  const [level, setLevel] = useState<Level>("A1");
  const [by, setBy] = useState<FilterBy>("grammar");
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [counts, setCounts] = useState<Record<QuestionType, number>>({ choice: 4, fill: 4, short: 2 });

  const options = by === "grammar" ? GRAMMAR[level] : THEMES;

  // 每個文法點／主題目前有幾題，0 題顯示「準備中」
  const topicCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const q of BANK) {
      if (q.level !== level) continue;
      for (const k of by === "grammar" ? [q.grammar] : q.themes) map.set(k, (map.get(k) ?? 0) + 1);
    }
    return map;
  }, [level, by]);

  const available = useMemo(
    () => countByType(filterPool({ level, by, topics, difficulty })),
    [level, by, topics, difficulty],
  );

  const usableCounts = {
    choice: Math.min(counts.choice, available.choice),
    fill: Math.min(counts.fill, available.fill),
    short: Math.min(counts.short, available.short),
  };
  const usable = TYPE_ORDER.reduce((s, t) => s + usableCounts[t], 0);
  const short = TYPE_ORDER.filter((t) => counts[t] > available[t]);
  const abShort = TYPE_ORDER.filter((t) => counts[t] > 0 && counts[t] * 2 > available[t]);

  function go(path: "/practice/" | "/paper/") {
    const config: PaperConfig = { level, by, topics, difficulty, seed: newSeed(), counts: usableCounts };
    router.push(`${path}?${configToQuery(config)}`);
  }

  const scope =
    topics.length === 0
      ? `${level} 全部範圍`
      : topics.map((t) => topicName(level, by, t)).join("、");

  const notice =
    usable > 0 && short.length > 0
      ? `題庫目前不夠，${short.map((t) => TYPE_LABELS[t].zh).join("、")}會以現有題數為準。`
      : usable > 0 && abShort.length > 0
        ? `${abShort.map((t) => TYPE_LABELS[t].zh).join("、")}的題目不夠 A、B 卷各用一份，B 卷會有部分題目和 A 卷相同。`
        : null;

  const actions = (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
      <button type="button" disabled={usable === 0} onClick={() => go("/practice/")} className={btnPrimary}>
        線上練習
      </button>
      <button type="button" disabled={usable === 0} onClick={() => go("/paper/")} className={btnSecondary}>
        產生 A／B 考卷
      </button>
    </div>
  );

  return (
    <div className={twoCol}>
      <div className="space-y-4">
        <Card className="p-4 sm:p-5">
          <Heading fr="Étape 1 · Niveau" zh="選擇等級" />
          <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
            {LEVELS.map((l) => {
              const on = level === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => {
                    setLevel(l.id);
                    if (by === "grammar") setTopics([]);
                  }}
                  aria-pressed={on}
                  // 巴黎路牌：藍底白框
                  className={`rounded-lg border-2 p-1 text-center transition ${
                    on ? "border-accent bg-accent text-accent-ink shadow-md" : "border-line bg-surface hover:border-accent/50"
                  }`}
                >
                  <span
                    className={`block rounded-md border px-1 py-2.5 sm:py-3 ${
                      on ? "border-accent-ink/80" : "border-transparent"
                    }`}
                  >
                    <span className="display block text-2xl font-bold sm:text-3xl">{l.id}</span>
                    <span className="block text-xs sm:text-sm">{l.zh}</span>
                    <span className={`display block text-xs italic ${on ? "opacity-80" : "text-muted"}`}>{l.fr}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-muted">{LEVELS.find((l) => l.id === level)?.desc}</p>
        </Card>

        <Card className="p-4 sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Heading fr="Étape 2 · Thème ou grammaire" zh="練習範圍" />
            <div className="grid grid-cols-2 rounded-lg bg-sunken p-1 text-sm">
              {(["grammar", "theme"] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => {
                    setBy(b);
                    setTopics([]);
                  }}
                  aria-pressed={by === b}
                  className={`min-h-10 rounded-md px-4 font-medium transition ${
                    by === b ? "bg-surface text-ink shadow-sm" : "text-muted"
                  }`}
                >
                  {b === "grammar" ? "依文法" : "依主題"}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {options.map((t) => {
              const n = topicCounts.get(t.id) ?? 0;
              const on = topics.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  disabled={n === 0}
                  onClick={() => setTopics((cur) => (on ? cur.filter((x) => x !== t.id) : [...cur, t.id]))}
                  aria-pressed={on}
                  className={`flex min-h-14 items-center gap-3 rounded-lg border px-3 py-2 text-left transition disabled:cursor-not-allowed disabled:opacity-45 ${
                    on ? "border-accent bg-accent-soft" : "border-line bg-surface hover:border-accent/50"
                  }`}
                >
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded border text-xs ${
                      on ? "border-accent bg-accent text-accent-ink" : "border-line"
                    }`}
                    aria-hidden
                  >
                    {on ? "✓" : ""}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{t.zh}</span>
                    <span className="display block truncate text-sm text-muted italic">{t.fr}</span>
                  </span>
                  <span className="shrink-0 text-xs text-muted">{n === 0 ? "準備中" : `${n} 題`}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-muted">
            {topics.length === 0 ? "沒有勾選時，會從這個等級的所有題目抽題。" : `已選 ${topics.length} 項`}
          </p>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4 sm:p-5">
            <Heading fr="Étape 3 · Exercices" zh="題型與題數" />
            <div className="mt-2 divide-y divide-line">
              {TYPE_ORDER.map((t) => (
                <div key={t} className="flex items-center justify-between gap-3 py-2.5">
                  <div>
                    <div className="font-medium">
                      {TYPE_LABELS[t].zh}
                      <span className="display ml-1.5 text-sm font-normal text-muted italic">{TYPE_LABELS[t].fr}</span>
                    </div>
                    <div className={`text-xs ${counts[t] > available[t] ? "text-warn" : "text-muted"}`}>
                      題庫有 {available[t]} 題
                    </div>
                  </div>
                  <Stepper
                    value={counts[t]}
                    label={TYPE_LABELS[t].zh}
                    onChange={(v) => setCounts((c) => ({ ...c, [t]: v }))}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <Heading fr="Étape 4 · Difficulté" zh="難度" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(["all", 1, 2, 3] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  aria-pressed={difficulty === d}
                  className={`min-h-14 rounded-lg border px-2 transition ${
                    difficulty === d ? "border-accent bg-accent-soft" : "border-line bg-surface hover:border-accent/50"
                  }`}
                >
                  <span className="block font-medium">{DIFFICULTY_LABELS[String(d)]}</span>
                  <span className="display block text-xs text-muted italic">{DIFFICULTY_FR[String(d)]}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {notice && <p className="rounded-lg bg-warn-soft px-4 py-3 text-sm text-warn">{notice}</p>}

        {recent}
      </div>

      {/* 電腦版側欄 */}
      <aside className="hidden lg:sticky lg:top-6 lg:block">
        <Card className="overflow-hidden">
          <div className="border-b border-line bg-sunken/60 px-5 py-4">
            <div className="eyebrow">Récapitulatif</div>
            <div className="display text-lg font-bold">練習內容</div>
          </div>
          <dl className="space-y-3 px-5 py-4 text-sm">
            <Row label="等級" value={`${level}　${LEVELS.find((l) => l.id === level)?.zh}`} />
            <Row label="範圍" value={scope} />
            <Row label="難度" value={DIFFICULTY_LABELS[String(difficulty)]} />
            <Row
              label="題型"
              value={TYPE_ORDER.filter((t) => usableCounts[t] > 0)
                .map((t) => `${TYPE_LABELS[t].zh} ${usableCounts[t]}`)
                .join("、") || "未選擇"}
            />
          </dl>
          <div className="border-t border-line px-5 py-4">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-sm text-muted">共</span>
              <span>
                <span className="display text-4xl font-bold">{usable}</span>
                <span className="ml-1 text-sm text-muted">題</span>
              </span>
            </div>
            {actions}
          </div>
        </Card>
      </aside>

      {/* 手機底部操作列 */}
      <BottomBar>
        <p className="mb-2 truncate text-center text-xs text-muted">
          {usable === 0 ? "目前沒有符合條件的題目" : `${level}・${scope}・共 ${usable} 題`}
        </p>
        {actions}
      </BottomBar>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-10 shrink-0 text-muted">{label}</dt>
      <dd className="min-w-0 flex-1 font-medium">{value}</dd>
    </div>
  );
}

function Stepper({ value, label, onChange }: { value: number; label: string; onChange: (v: number) => void }) {
  const btn =
    "grid size-11 place-items-center rounded-lg border border-line bg-surface text-xl leading-none transition hover:border-accent/60 active:scale-95 disabled:opacity-35";
  return (
    <div className="flex items-center gap-1">
      <button type="button" className={btn} aria-label={`${label}減少`} disabled={value <= 0} onClick={() => onChange(value - 1)}>
        −
      </button>
      <span className="display w-9 text-center text-xl font-bold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} aria-label={`${label}增加`} disabled={value >= 30} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}
