"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Card } from "./ui";
import { clearHistory, historySnapshot, parseHistory, subscribeHistory } from "@/lib/history";

export default function RecentList() {
  const raw = useSyncExternalStore(subscribeHistory, historySnapshot, () => null);
  const [cleared, setCleared] = useState(false);
  const items = useMemo(() => (cleared ? [] : parseHistory(raw)), [raw, cleared]);

  if (items.length === 0) return null;

  return (
    <Card className="overflow-hidden">
      <div className="flex items-end justify-between px-4 pt-4 pb-2 sm:px-5">
        <div>
          <div className="eyebrow">Historique</div>
          <h2 className="display text-lg font-bold">最近的紀錄</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            clearHistory();
            setCleared(true);
          }}
          className="min-h-9 text-sm text-muted hover:text-ink"
        >
          清除
        </button>
      </div>
      <ul className="divide-y divide-line">
        {items.slice(0, 8).map((h) => (
          <li key={`${h.kind}-${h.query}`}>
            <Link
              href={`/${h.kind}/?${h.query}`}
              className="flex min-h-14 items-center justify-between gap-3 px-4 py-2.5 transition hover:bg-sunken sm:px-5"
            >
              <div className="min-w-0">
                <div className="truncate font-medium">{h.title}</div>
                <div className="text-xs text-muted">
                  {h.kind === "paper" ? "A／B 考卷" : "線上練習"}・
                  {new Date(h.at).toLocaleDateString("zh-TW", { month: "numeric", day: "numeric" })}
                </div>
              </div>
              {h.score ? (
                <span className="display shrink-0 text-lg font-bold text-accent">{h.score}</span>
              ) : (
                <span className="shrink-0 text-muted">›</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-4 py-2 text-xs text-muted sm:px-5">紀錄只存在這台裝置的瀏覽器裡。</p>
    </Card>
  );
}
