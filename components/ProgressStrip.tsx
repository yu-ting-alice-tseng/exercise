"use client";

import Link from "next/link";
import { useMemo } from "react";
import { btnPrimary, btnQuiet } from "./ui";
import { byDay, dayKey, dueIds, startOfDay, streak } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";
import { useNow } from "@/lib/useNow";

/** 首頁上方的學習進度：連續天數、今天的時間、待複習題數 */
export default function ProgressStrip() {
  const { progress, ready } = useProgress();
  const now = useNow();
  const info = useMemo(() => {
    const days = byDay(progress);
    return {
      streak: streak(days, now),
      today: Math.round((days.get(dayKey(startOfDay(now)))?.sec ?? 0) / 60),
      due: dueIds(progress, now).length,
    };
  }, [progress, now]);

  if (!ready || progress.s.length === 0) return null;

  return (
    <section className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-line bg-surface px-4 py-3 sm:px-5">
      <Stat label="連續學習" value={info.streak} unit="天" />
      <Stat label="今天練習" value={info.today} unit="分鐘" />
      <Stat label="待複習" value={info.due} unit="題" />
      <div className="ml-auto flex w-full gap-2 sm:w-auto">
        {info.due > 0 && (
          <Link href="/review/" className={`${btnPrimary} min-h-11 flex-1 sm:flex-none`}>
            開始複習
          </Link>
        )}
        <Link href="/stats/" className={`${btnQuiet} flex-1 sm:flex-none`}>
          學習紀錄
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
