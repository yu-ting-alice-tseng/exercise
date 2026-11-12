"use client";

import { useLang } from "@/lib/i18n";
import { queryToConfig } from "@/lib/config";
import { paperTitle } from "@/lib/title";
import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Card } from "./ui";
import { clearHistory, historySnapshot, parseHistory, subscribeHistory } from "@/lib/history";

export default function RecentList() {
  const raw = useSyncExternalStore(subscribeHistory, historySnapshot, () => null);
  const [cleared, setCleared] = useState(false);
  const items = useMemo(() => (cleared ? [] : parseHistory(raw)), [raw, cleared]);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  const titleOf = (h: { query: string; title: string }) => {
    const c = queryToConfig(new URLSearchParams(h.query));
    return c ? paperTitle(c, lang) : h.title;
  };

  if (items.length === 0) return null;

  return (
    <Card className="overflow-hidden">
      <div className="flex items-end justify-between px-4 pt-4 pb-2 sm:px-5">
        <div>
          <div className="eyebrow">Historique</div>
          <h2 className="display text-lg font-bold">{t("最近的紀錄", "Activité récente")}</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            clearHistory();
            setCleared(true);
          }}
          className="min-h-9 text-sm text-muted hover:text-ink"
        >
          {t("清除", "Effacer")}
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
                <div className="truncate font-medium">{titleOf(h)}</div>
                <div className="text-xs text-muted">
                  {h.kind === "paper" ? t("A／B 考卷", "Copies A/B") : t("線上練習", "Exercice en ligne")}・
                  {new Date(h.at).toLocaleDateString(lang === "fr" ? "fr-FR" : "zh-TW", { month: "numeric", day: "numeric" })}
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
      <p className="border-t border-line px-4 py-2 text-xs text-muted sm:px-5">{t("紀錄只存在這台裝置的瀏覽器裡。", "Cet historique est enregistré uniquement dans ce navigateur.")}</p>
    </Card>
  );
}
