"use client";

import { useT } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { dayNumber, PROVERBS, WORDS } from "@/lib/daily";
import { mulberry32 } from "@/lib/random";
import { useNow } from "@/lib/useNow";

/** 巴黎屋頂剪影：鋅板屋頂、煙囪、艾菲爾鐵塔（純裝飾） */
export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 160" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      {/* 艾菲爾鐵塔 */}
      <path d="M470 158 L488 92 L494 52 L497 18 L499 6 L501 18 L504 52 L510 92 L528 158" />
      <path d="M480 158 Q499 126 518 158" />
      <path d="M486 100 L512 100 M490 72 L508 72 M494 52 L504 52" />
      <path d="M488 92 L510 92 M499 6 L499 -2" />
      {/* 奧斯曼式公寓：斜屋頂、老虎窗、煙囪 */}
      <path d="M0 158 L0 104 L20 86 L96 86 L116 104 L116 158" />
      <path d="M34 86 L34 74 L44 74 L44 86 M70 86 L70 70 L78 70 L78 86" />
      <path d="M30 100 L30 94 Q37 88 44 94 L44 100 Z M72 100 L72 94 Q79 88 86 94 L86 100 Z" />
      <path d="M14 118 L102 118 M14 132 L102 132" strokeOpacity="0.5" />
      <path d="M126 158 L126 96 L144 78 L214 78 L232 96 L232 158" />
      <path d="M156 78 L156 62 L168 62 L168 78 M196 78 L196 66 L204 66 L204 78" />
      <path d="M150 92 L150 86 Q157 80 164 86 L164 92 Z M190 92 L190 86 Q197 80 204 86 L204 92 Z" />
      <path d="M138 112 L222 112 M138 126 L222 126" strokeOpacity="0.5" />
      {/* 圓頂（像先賢祠） */}
      <path d="M262 158 L262 112 L340 112 L340 158" />
      <path d="M272 112 Q301 58 330 112" />
      <path d="M301 72 L301 56 M296 60 L306 60" />
      <path d="M350 158 L350 100 L366 86 L430 86 L446 100 L446 158" />
      <path d="M378 86 L378 74 L388 74 L388 86 M410 86 L410 70 L418 70 L418 86" />
      <path d="M362 118 L436 118 M362 132 L436 132" strokeOpacity="0.5" />
      <path d="M548 158 L548 108 L566 92 L620 92 L638 108 L638 158" />
      <path d="M576 92 L576 80 L586 80 L586 92 M604 92 L604 78 L612 78 L612 92" />
      {/* 地平線 */}
      <path d="M0 158 L640 158" strokeOpacity="0.6" />
    </svg>
  );
}

/** 老師的紅色印章 */
export function Tampon({ text }: { text: string }) {
  return <span className="tampon text-xl sm:text-2xl">{text}</span>;
}

/** 彩帶（只在第一次顯示時播放，減少動態效果的設定下不顯示） */
export function Confetti({ seed = 1 }: { seed?: number }) {
  const pieces = useMemo(() => {
    const colors = ["#3a4f8f", "#ffffff", "#c0607a", "#d9a441"];
    const rnd = mulberry32(seed);
    return Array.from({ length: 36 }, (_, i) => ({
      left: `${rnd() * 100}%`,
      color: colors[i % colors.length],
      dx: `${(rnd() - 0.5) * 160}px`,
      rot: `${(rnd() - 0.5) * 900}deg`,
      dur: `${1.6 + rnd() * 1.4}s`,
      delay: `${rnd() * 0.5}s`,
      w: 6 + Math.round(rnd() * 5),
    }));
  }, [seed]);
  return (
    <div className="confetti" aria-hidden>
      {pieces.map((p, i) => (
        <i
          key={i}
          style={
            {
              left: p.left,
              width: p.w,
              background: p.color,
              boxShadow: p.color === "#ffffff" ? "0 0 0 1px rgba(0,0,0,0.08)" : undefined,
              "--dx": p.dx,
              "--rot": p.rot,
              "--dur": p.dur,
              "--delay": p.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** 每日一字 */
export function MotDuJour() {
  const now = useNow();
  const [speaking, setSpeaking] = useState(false);
  const t = useT();
  if (!now) return null;
  const w = WORDS[dayNumber(now) % WORDS.length];

  function speak(text: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    u.rate = 0.9;
    const fr = window.speechSynthesis.getVoices().find((v) => v.lang === "fr-FR");
    if (fr) u.voice = fr;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  }

  return (
    <aside className="anim-rise relative overflow-hidden rounded-xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="eyebrow">Le mot du jour</div>
          <div className="text-xs text-muted">{t("每日一字", "Un mot par jour")}</div>
        </div>
        <span className="timbre display grid size-11 shrink-0 place-items-center bg-accent text-sm font-bold text-accent-ink" aria-hidden>
          {new Date(now).getDate()}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
        <span lang="fr" className="display text-2xl font-bold">
          {w.fr}
        </span>
        <span className="text-xs text-muted">{w.pos}</span>
      </div>
      <div className="mt-0.5 font-medium">{w.zh}</div>
      <p lang="fr" className="mt-2 text-sm italic">
        « {w.ex} »
      </p>
      <p className="text-xs text-muted">{w.exZh}</p>
      <button
        type="button"
        onClick={() => speak(`${w.fr}. ${w.ex}`)}
        className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line px-3 text-sm hover:border-accent/60"
        aria-label={t(`朗讀 ${w.fr} 和例句`, `Écouter « ${w.fr} » et l’exemple`)}
      >
        <span aria-hidden>{speaking ? "■" : "▶"}</span> {t("聽發音", "Écouter")}
      </button>
    </aside>
  );
}

/** 每日諺語（頁尾） */
export function ProverbeDuJour() {
  const now = useNow();
  if (!now) return <p className="display text-sm text-muted italic">Bon courage !</p>;
  const p = PROVERBS[dayNumber(now) % PROVERBS.length];
  return (
    <figure className="mx-auto max-w-md px-4">
      <blockquote lang="fr" className="display text-base text-ink italic">
        « {p.fr} »
      </blockquote>
      <figcaption className="mt-1 text-xs text-muted">{p.zh}</figcaption>
    </figure>
  );
}
