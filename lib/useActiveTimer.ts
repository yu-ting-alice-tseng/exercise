"use client";

import { useCallback, useEffect, useRef } from "react";

const IDLE_MS = 90_000;
const ACTIVITY = ["pointerdown", "keydown", "scroll", "touchstart", "input"] as const;

/**
 * 計算「實際在練習」的時間：畫面開著，而且最近 90 秒內有操作才計時。
 * take() 回傳上次 take() 之後累積的秒數，並重新開始計算。
 */
export function useActiveTimer() {
  const acc = useRef(0);
  const last = useRef(0);
  const lastActive = useRef(0);

  const flush = useCallback(() => {
    const now = Date.now();
    if (last.current && document.visibilityState === "visible" && now - lastActive.current < IDLE_MS) {
      acc.current += now - last.current;
    }
    last.current = now;
  }, []);

  useEffect(() => {
    const now = Date.now();
    last.current = now;
    lastActive.current = now;
    const active = () => {
      flush();
      lastActive.current = Date.now();
    };
    const id = window.setInterval(flush, 5000);
    for (const e of ACTIVITY) window.addEventListener(e, active, { passive: true });
    document.addEventListener("visibilitychange", flush);
    return () => {
      window.clearInterval(id);
      for (const e of ACTIVITY) window.removeEventListener(e, active);
      document.removeEventListener("visibilitychange", flush);
    };
  }, [flush]);

  return useCallback(() => {
    flush();
    const sec = Math.round(acc.current / 1000);
    acc.current = 0;
    return sec;
  }, [flush]);
}
