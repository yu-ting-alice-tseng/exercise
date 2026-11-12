import { useSyncExternalStore } from "react";

/** 介面語言：中文或法文。學習內容（法文原文、中文解釋）不受影響 */
export type Lang = "zh" | "fr";

const KEY = "french-quiz:lang";
const listeners = new Set<() => void>();

function read(): Lang {
  try {
    return localStorage.getItem(KEY) === "fr" ? "fr" : "zh";
  } catch {
    return "zh";
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function setLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    // 無法儲存時只在這次瀏覽有效
  }
  document.documentElement.lang = lang === "fr" ? "fr" : "zh-Hant-TW";
  for (const l of listeners) l();
}

/** 目前的介面語言。靜態頁面先以中文產生，瀏覽器載入後再依使用者的選擇切換 */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "zh");
}

/** 依語言挑一個字串 */
export function useT() {
  const lang = useLang();
  return (zh: string, fr: string) => (lang === "fr" ? fr : zh);
}

/** 有 zh／fr 兩個欄位的物件（等級、文法點、主題……）取目前語言的名稱 */
export function useName() {
  const lang = useLang();
  return (o: { zh: string; fr: string }) => (lang === "fr" ? o.fr : o.zh);
}
