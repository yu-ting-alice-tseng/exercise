"use client";

import { useEffect } from "react";
import { setLang, useLang } from "@/lib/i18n";

/** 在伺服器元件裡放雙語文字：<T zh="閱讀" fr="Lectures" /> */
export function T({ zh, fr }: { zh: React.ReactNode; fr: React.ReactNode }) {
  return <>{useLang() === "fr" ? fr : zh}</>;
}

/** 右上角的語言切換 */
export function LangToggle() {
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang === "fr" ? "fr" : "zh-Hant-TW";
  }, [lang]);
  return (
    <div role="group" aria-label={lang === "fr" ? "Langue de l’interface" : "介面語言"} className="flex shrink-0 overflow-hidden rounded-full border border-line text-xs font-bold">
      {(["zh", "fr"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          lang={l === "fr" ? "fr" : "zh-Hant"}
          className={`min-h-8 px-2.5 transition ${lang === l ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"}`}
        >
          {l === "zh" ? "中文" : "FR"}
        </button>
      ))}
    </div>
  );
}

/** 只在中文介面顯示（例如中文標題上方的法文小標，法文介面時標題本身就是法文） */
export function ZhOnly({ children }: { children: React.ReactNode }) {
  return useLang() === "fr" ? null : <>{children}</>;
}
