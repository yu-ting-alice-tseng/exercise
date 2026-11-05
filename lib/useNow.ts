"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 60_000);
  return () => window.clearInterval(id);
};
// 以分鐘為單位，避免每次渲染的值都不同
const snapshot = () => Math.floor(Date.now() / 60_000) * 60_000;

/** 目前時間（每分鐘更新一次） */
export function useNow(): number {
  return useSyncExternalStore(subscribe, snapshot, () => 0);
}
