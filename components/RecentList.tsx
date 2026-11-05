"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { clearHistory, historySnapshot, parseHistory, subscribeHistory } from "@/lib/history";

export default function RecentList() {
  const raw = useSyncExternalStore(subscribeHistory, historySnapshot, () => null);
  const [cleared, setCleared] = useState(false);
  const items = useMemo(() => (cleared ? [] : parseHistory(raw)), [raw, cleared]);

  if (items.length === 0) return null;

  return (
    <section className="mt-8">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-bold">最近的紀錄</h2>
        <button
          type="button"
          onClick={() => {
            clearHistory();
            setCleared(true);
          }}
          className="text-sm text-muted underline-offset-2 hover:underline"
        >
          清除
        </button>
      </div>
      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {items.map((h) => (
          <li key={`${h.kind}-${h.query}`}>
            <Link
              href={`/${h.kind}/?${h.query}`}
              className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-bg"
            >
              <div className="min-w-0">
                <div className="truncate font-medium">{h.title}</div>
                <div className="text-xs text-muted">
                  {h.kind === "paper" ? "A／B 考卷" : "線上練習"}・
                  {new Date(h.at).toLocaleDateString("zh-TW", { month: "numeric", day: "numeric" })}
                </div>
              </div>
              {h.score && <span className="shrink-0 text-sm font-semibold text-accent">{h.score}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted">紀錄只存在這台裝置的瀏覽器裡。</p>
    </section>
  );
}
