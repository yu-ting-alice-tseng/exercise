"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BANK } from "@/lib/bank";
import { configToQuery } from "@/lib/config";
import { countByType, filterPool } from "@/lib/draw";
import { newSeed } from "@/lib/random";
import { DIFFICULTY_LABELS, GRAMMAR, LEVELS, THEMES, TYPE_LABELS, TYPE_ORDER } from "@/lib/taxonomy";
import type { DifficultyFilter, FilterBy, Level, PaperConfig, QuestionType } from "@/lib/types";

export default function SetupForm() {
  const router = useRouter();
  const [level, setLevel] = useState<Level>("A1");
  const [by, setBy] = useState<FilterBy>("grammar");
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [counts, setCounts] = useState<Record<QuestionType, number>>({ choice: 4, fill: 4, short: 2 });

  const options = by === "grammar" ? GRAMMAR[level] : THEMES;

  // 每個文法點／主題目前有幾題（不分難度），題數為 0 的顯示「準備中」
  const topicCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const q of BANK) {
      if (q.level !== level) continue;
      const keys = by === "grammar" ? [q.grammar] : q.themes;
      for (const k of keys) map.set(k, (map.get(k) ?? 0) + 1);
    }
    return map;
  }, [level, by]);

  const available = useMemo(
    () => countByType(filterPool({ level, by, topics, difficulty })),
    [level, by, topics, difficulty],
  );

  const total = TYPE_ORDER.reduce((s, t) => s + counts[t], 0);
  const short = TYPE_ORDER.filter((t) => counts[t] > available[t]);
  const abShort = TYPE_ORDER.filter((t) => counts[t] > 0 && counts[t] * 2 > available[t]);

  function changeLevel(l: Level) {
    setLevel(l);
    if (by === "grammar") setTopics([]);
  }

  function changeBy(b: FilterBy) {
    setBy(b);
    setTopics([]);
  }

  function toggleTopic(id: string) {
    setTopics((cur) => (cur.includes(id) ? cur.filter((t) => t !== id) : [...cur, id]));
  }

  function go(path: "/practice/" | "/paper/") {
    const config: PaperConfig = {
      level,
      by,
      topics,
      difficulty,
      seed: newSeed(),
      // 題數不能超過題庫現有的數量
      counts: {
        choice: Math.min(counts.choice, available.choice),
        fill: Math.min(counts.fill, available.fill),
        short: Math.min(counts.short, available.short),
      },
    };
    router.push(`${path}?${configToQuery(config)}`);
  }

  const usable = TYPE_ORDER.reduce((s, t) => s + Math.min(counts[t], available[t]), 0);

  return (
    <div className="space-y-5">
      <Section step="1" title="選擇等級">
        <div className="grid grid-cols-3 gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => changeLevel(l.id)}
              aria-pressed={level === l.id}
              className={`rounded-xl border px-2 py-3 text-center transition ${
                level === l.id
                  ? "border-accent bg-accent-soft text-ink"
                  : "border-line bg-surface text-ink hover:border-accent/50"
              }`}
            >
              <div className="text-lg font-bold">{l.id}</div>
              <div className="text-xs text-muted">{l.zh.split(" ")[1]}</div>
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted">{LEVELS.find((l) => l.id === level)?.desc}</p>
      </Section>

      <Section step="2" title="依文法或主題出題">
        <div className="mb-3 grid grid-cols-2 rounded-xl bg-bg p-1">
          {(["grammar", "theme"] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => changeBy(b)}
              aria-pressed={by === b}
              className={`rounded-lg py-2 text-sm font-medium transition ${
                by === b ? "bg-surface text-ink shadow-sm" : "text-muted"
              }`}
            >
              {b === "grammar" ? "依文法" : "依主題"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {options.map((t) => {
            const n = topicCounts.get(t.id) ?? 0;
            const on = topics.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                disabled={n === 0}
                onClick={() => toggleTopic(t.id)}
                aria-pressed={on}
                title={t.fr}
                className={`min-h-11 rounded-full border px-3.5 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-45 ${
                  on
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line bg-surface text-ink hover:border-accent/50"
                }`}
              >
                {t.zh}
                <span className={`ml-1.5 text-xs ${on ? "opacity-80" : "text-muted"}`}>
                  {n === 0 ? "準備中" : n}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-muted">
          {topics.length === 0 ? "沒有選擇時，會從這個等級的所有題目中抽題。" : `已選 ${topics.length} 項`}
        </p>
      </Section>

      <Section step="3" title="題型與題數">
        <div className="divide-y divide-line">
          {TYPE_ORDER.map((t) => (
            <div key={t} className="flex items-center justify-between py-2.5">
              <div>
                <div className="font-medium">{TYPE_LABELS[t].zh}</div>
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
      </Section>

      <Section step="4" title="難度">
        <div className="grid grid-cols-4 gap-2">
          {(["all", 1, 2, 3] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              aria-pressed={difficulty === d}
              className={`min-h-11 rounded-lg border text-sm transition ${
                difficulty === d
                  ? "border-accent bg-accent-soft font-medium"
                  : "border-line bg-surface hover:border-accent/50"
              }`}
            >
              {DIFFICULTY_LABELS[String(d)]}
            </button>
          ))}
        </div>
      </Section>

      {(short.length > 0 || abShort.length > 0) && usable > 0 && (
        <div className="rounded-xl bg-warn-soft px-4 py-3 text-sm text-warn">
          {short.length > 0 ? (
            <>題庫目前不夠，{short.map((t) => TYPE_LABELS[t].zh).join("、")}會以現有題數為準。</>
          ) : (
            <>
              {abShort.map((t) => TYPE_LABELS[t].zh).join("、")}的題目不夠 A、B 卷各用一份，B
              卷會有部分題目和 A 卷相同。
            </>
          )}
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 border-t border-line bg-bg/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={usable === 0}
            onClick={() => go("/practice/")}
            className="min-h-12 rounded-xl bg-accent font-medium text-accent-ink transition hover:opacity-90 disabled:opacity-40"
          >
            線上練習
          </button>
          <button
            type="button"
            disabled={usable === 0}
            onClick={() => go("/paper/")}
            className="min-h-12 rounded-xl border border-accent bg-surface font-medium text-accent transition hover:bg-accent-soft disabled:opacity-40"
          >
            產生 A／B 考卷
          </button>
        </div>
        <p className="mt-1.5 text-center text-xs text-muted">
          {usable === 0 ? "目前沒有符合條件的題目" : `共 ${usable} 題`}
          {total !== usable && usable > 0 ? `（你選了 ${total} 題）` : ""}
        </p>
      </div>
    </div>
  );
}

function Section({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-4">
      <h2 className="mb-3 flex items-center gap-2 font-bold">
        <span className="grid size-6 place-items-center rounded-full bg-accent-soft text-xs text-accent">
          {step}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Stepper({ value, label, onChange }: { value: number; label: string; onChange: (v: number) => void }) {
  const btn =
    "grid size-11 place-items-center rounded-lg border border-line bg-surface text-xl leading-none transition hover:border-accent/50 disabled:opacity-35";
  return (
    <div className="flex items-center gap-1">
      <button type="button" className={btn} aria-label={`${label}減少`} disabled={value <= 0} onClick={() => onChange(value - 1)}>
        −
      </button>
      <span className="w-9 text-center text-lg font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} aria-label={`${label}增加`} disabled={value >= 30} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}
