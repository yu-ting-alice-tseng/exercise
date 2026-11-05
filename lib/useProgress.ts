"use client";

import { useMemo, useSyncExternalStore } from "react";
import { parseProgress, progressSnapshot, subscribeProgress, type Progress } from "./progress";

/** 讀取學習紀錄，其他分頁或元件更新時會自動重新渲染 */
export function useProgress(): { progress: Progress; ready: boolean } {
  const raw = useSyncExternalStore(subscribeProgress, progressSnapshot, () => "__server__");
  return useMemo(
    () => ({ progress: parseProgress(raw === "__server__" ? null : raw), ready: raw !== "__server__" }),
    [raw],
  );
}
