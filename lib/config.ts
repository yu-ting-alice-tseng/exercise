import { GRAMMAR, LEVELS, THEMES } from "./taxonomy";
import type { DifficultyFilter, FilterBy, Level, PaperConfig } from "./types";

/** 把出題設定轉成網址參數，連結可以直接分享給學生 */
export function configToQuery(c: PaperConfig): string {
  const p = new URLSearchParams({
    level: c.level,
    by: c.by,
    topics: c.topics.join(","),
    choice: String(c.counts.choice),
    fill: String(c.counts.fill),
    short: String(c.counts.short),
    d: String(c.difficulty),
    seed: String(c.seed),
  });
  return p.toString();
}

const clampCount = (v: string | null) => {
  const n = Number.parseInt(v ?? "0", 10);
  return Number.isFinite(n) ? Math.min(Math.max(n, 0), 50) : 0;
};

export function queryToConfig(p: URLSearchParams): PaperConfig | null {
  const level = p.get("level") as Level;
  if (!LEVELS.some((l) => l.id === level)) return null;
  const by: FilterBy = p.get("by") === "theme" ? "theme" : "grammar";
  const valid = new Set((by === "grammar" ? GRAMMAR[level] : THEMES).map((t) => t.id));
  const topics = (p.get("topics") ?? "").split(",").filter((t) => valid.has(t));
  const dRaw = p.get("d");
  const difficulty: DifficultyFilter =
    dRaw === "1" || dRaw === "2" || dRaw === "3" ? (Number(dRaw) as 1 | 2 | 3) : "all";
  const seed = Number.parseInt(p.get("seed") ?? "", 10);
  return {
    level,
    by,
    topics,
    counts: {
      choice: clampCount(p.get("choice")),
      fill: clampCount(p.get("fill")),
      short: clampCount(p.get("short")),
    },
    difficulty,
    seed: Number.isFinite(seed) ? seed : 1,
  };
}

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
