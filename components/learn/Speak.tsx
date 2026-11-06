"use client";

import { useState } from "react";
import { speakFr, stopSpeaking } from "@/lib/speak";

/** 小小的朗讀按鈕 */
export default function Speak({ text, label, className = "" }: { text: string; label?: string; className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        if (on) {
          stopSpeaking();
          setOn(false);
          return;
        }
        setOn(true);
        speakFr(text, () => setOn(false));
      }}
      aria-label={label ?? `朗讀：${text}`}
      title="聽發音"
      className={`inline-grid size-8 shrink-0 place-items-center rounded-full border border-line text-[11px] text-accent transition hover:border-accent/60 hover:bg-accent-soft ${on ? "bg-accent-soft" : ""} ${className}`}
    >
      <span aria-hidden>{on ? "■" : "▶"}</span>
    </button>
  );
}
