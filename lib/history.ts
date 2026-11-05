import { configToQuery } from "./config";
import type { PaperConfig } from "./types";

const KEY = "french-quiz:history";
const MAX = 20;

export interface HistoryItem {
  query: string;
  title: string;
  kind: "paper" | "practice";
  at: number;
  /** 線上練習的得分，例如 "8／10" */
  score?: string;
}

export function historySnapshot(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function subscribeHistory(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

export function parseHistory(raw: string | null): HistoryItem[] {
  try {
    const list = raw ? (JSON.parse(raw) as HistoryItem[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function loadHistory(): HistoryItem[] {
  return parseHistory(historySnapshot());
}

export function saveHistory(item: Omit<HistoryItem, "query" | "at"> & { config: PaperConfig }) {
  try {
    const query = configToQuery(item.config);
    const rest = loadHistory().filter((h) => !(h.query === query && h.kind === item.kind));
    const entry: HistoryItem = {
      query,
      title: item.title,
      kind: item.kind,
      score: item.score,
      at: Date.now(),
    };
    localStorage.setItem(KEY, JSON.stringify([entry, ...rest].slice(0, MAX)));
  } catch {
    // 無痕模式或瀏覽器封鎖儲存時，略過即可
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
