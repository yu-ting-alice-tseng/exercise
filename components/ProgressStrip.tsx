"use client";

import { useT } from "@/lib/i18n";
import Link from "next/link";
import { useMemo } from "react";
import { btnPrimary, btnQuiet } from "./ui";
import { byDay, dayKey, dueIds, isBankId, startOfDay, streak } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";
import { useNow } from "@/lib/useNow";

/** 首頁上方的學習進度：連續天數、今天的時間、待複習題數 */
export default function ProgressStrip() {
  const { progress, ready } = useProgress();
  const now = useNow();
  const t = useT();
  const info = useMemo(() => {
    const days = byDay(progress);
    return {
      streak: streak(days, now),
      today: Math.round((days.get(dayKey(startOfDay(now)))?.sec ?? 0) / 60),
      due: dueIds(progress, now).filter(isBankId).length,
    };
  }, [progress, now]);

  if (!ready || progress.s.length === 0) return null;

  return (
    <section className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-line bg-surface px-4 py-3 sm:px-5">
      <div>
        <div className="text-xs text-muted">{t("連續學習", "Série en cours")}</div>
        <div className="flex items-center gap-2">
          <span>
            <span className="display text-2xl font-bold tabular-nums">{info.streak}</span>
            <span className="ml-1 text-sm text-muted">{t("天", info.streak > 1 ? "jours" : "jour")}</span>
          </span>
          {info.streak > 0 && (
            <span className="text-base tracking-tighter" role="img" aria-label={t(`連續 ${info.streak} 天`, `${info.streak} jours d’affilée`)} title={t("每連續學習一天，就多一個可頌", "Un croissant de plus par jour d’affilée")}>
              {"🥐".repeat(Math.min(info.streak, 7))}
              {info.streak > 7 ? <span className="ml-0.5 text-xs text-muted">+{info.streak - 7}</span> : null}
            </span>
          )}
        </div>
      </div>
      <Stat label={t("今天練習", "Aujourd’hui")} value={info.today} unit={t("分鐘", "min")} />
      <Stat label={t("待複習", "À réviser")} value={info.due} unit={t("題", info.due > 1 ? "questions" : "question")} />
      <div className="ml-auto flex w-full gap-2 sm:w-auto">
        {info.due > 0 && (
          <Link href="/review/" className={`${btnPrimary} min-h-11 flex-1 sm:flex-none`}>
            {t("開始複習", "Réviser")}
          </Link>
        )}
        <Link href="/stats/" className={`${btnQuiet} flex-1 sm:flex-none`}>
          {t("學習紀錄", "Mon suivi")}
        </Link>
      </div>
    </section>
  );
}

function Stat({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div>
      <div className="text-xs text-muted">{label}</div>
      <div>
        <span className="display text-2xl font-bold tabular-nums">{value}</span>
        <span className="ml-1 text-sm text-muted">{unit}</span>
      </div>
    </div>
  );
}
