"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 聽力播放器：用瀏覽器內建的法語語音朗讀（Web Speech API），不需要錄音檔。
 * 作答前最多播放 maxPlays 次（比照 DELF 聽兩次），交卷後不限次數。
 */
export default function ListenPlayer({
  text,
  dialogue,
  maxPlays = 2,
  unlimited,
}: {
  text: string;
  dialogue?: boolean;
  maxPlays?: number;
  unlimited?: boolean;
}) {
  const [plays, setPlays] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [slow, setSlow] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [supported, setSupported] = useState(true);
  const queue = useRef(0);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      const t = globalThis.setTimeout(() => setSupported(false), 0);
      return () => globalThis.clearTimeout(t);
    }
    const load = () => setVoices(window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("fr")));
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      window.speechSynthesis.cancel();
    };
  }, []);

  const canPlay = unlimited || plays < maxPlays;

  function play() {
    if (!canPlay || !supported) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    // 優先選法國法語的語音
    const fr = [...voices].sort((a, b) => Number(b.lang === "fr-FR") - Number(a.lang === "fr-FR"));
    const lines = dialogue
      ? text.split("\n").filter(Boolean).map((l) => {
          const m = l.match(/^([A-Z])\s*:\s*(.*)$/);
          return { who: m ? m[1] : "A", say: m ? m[2] : l };
        })
      : [{ who: "A", say: text }];
    const id = ++queue.current;
    setSpeaking(true);
    if (!unlimited) setPlays((n) => n + 1);
    lines.forEach((line, i) => {
      const u = new SpeechSynthesisUtterance(line.say);
      u.lang = "fr-FR";
      const idx = line.who.charCodeAt(0) - 65;
      // 對話：有兩種以上語音就換人說，否則用音高區分
      if (fr.length > 0) u.voice = fr[idx % fr.length];
      if (fr.length < 2 && idx % 2 === 1) u.pitch = 0.75;
      u.rate = slow ? 0.75 : 0.95;
      if (i === lines.length - 1) {
        u.onend = () => queue.current === id && setSpeaking(false);
        u.onerror = () => queue.current === id && setSpeaking(false);
      }
      synth.speak(u);
    });
  }

  function stop() {
    queue.current++;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  if (!supported) {
    return (
      <p className="rounded-lg bg-warn-soft px-3 py-2 text-sm text-warn">
        這個瀏覽器不支援語音朗讀。請換用 Chrome、Edge 或 Safari，或交卷後直接閱讀逐字稿。
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-sunken/60 p-3">
      <div className="flex flex-wrap items-center gap-2">
        {speaking ? (
          <button type="button" onClick={stop} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-ink px-4 font-medium text-surface">
            <span aria-hidden>■</span> 停止
          </button>
        ) : (
          <button
            type="button"
            onClick={play}
            disabled={!canPlay}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-4 font-medium text-accent-ink disabled:opacity-40"
          >
            <span aria-hidden>▶</span> {plays === 0 ? "播放錄音" : "再聽一次"}
          </button>
        )}
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} className="size-4 accent-[var(--accent)]" />
          放慢語速
        </label>
        <span className="ml-auto text-xs text-muted" aria-live="polite">
          {unlimited ? "交卷後可以不限次數重聽" : `已播放 ${plays}／${maxPlays} 次`}
        </span>
      </div>
      {voices.length === 0 && (
        <p className="mt-2 text-xs text-muted">如果沒有聲音，可能是裝置沒有安裝法語語音；交卷後可以閱讀逐字稿。</p>
      )}
    </div>
  );
}
