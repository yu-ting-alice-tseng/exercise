"use client";

import { useState, useSyncExternalStore } from "react";
import { countWords } from "@/lib/writing";
import type { WritingPrompt } from "@/lib/writingTypes";
import { useLang } from "@/lib/i18n";

const KEY = "french-quiz:writing:v1";

type Store = Record<string, { text?: string; checks?: number[] }>;

function load(): Store {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Store;
  } catch {
    return {};
  }
}

function save(id: string, patch: { text?: string; checks?: number[] }) {
  try {
    const all = load();
    all[id] = { ...all[id], ...patch };
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // 無痕模式或儲存空間被封鎖時，草稿只是不保留，寫作照常
  }
}

const noop = () => () => {};

/** 寫作練習：字數即時計算、檢查清單、草稿存在這台瀏覽器 */
export default function WritingPad({ guideId, prompts, checklist }: { guideId: string; prompts: WritingPrompt[]; checklist: string[] }) {
  // 草稿只存在瀏覽器裡，等到瀏覽器端才顯示編輯區，伺服器產生的畫面才會一致
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const [idx, setIdx] = useState(0);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  if (!mounted) return <p className="text-sm text-muted">{t("載入寫作練習…", "Chargement…")}</p>;
  return (
    <div>
      {prompts.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-2" role="tablist" aria-label={t("選擇題目", "Choisir un sujet")}>
          {prompts.map((p, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={idx === i}
              onClick={() => setIdx(i)}
              className={`inline-flex min-h-9 items-center rounded-full border px-3 text-sm transition ${
                idx === i ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-accent/60"
              }`}
            >
              {t("題目", "Sujet")} {i + 1}（{p.level}）
            </button>
          ))}
        </div>
      )}
      <Editor key={`${guideId}-${idx}`} id={`${guideId}-${idx}`} prompt={prompts[idx]} checklist={checklist} />
    </div>
  );
}

function Editor({ id, prompt, checklist }: { id: string; prompt: WritingPrompt; checklist: string[] }) {
  const [text, setText] = useState(() => load()[id]?.text ?? "");
  const [checks, setChecks] = useState<Set<number>>(() => new Set(load()[id]?.checks ?? []));
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  const n = countWords(text);
  const ok = n >= prompt.min && (prompt.max === undefined || n <= prompt.max);
  const range = prompt.max ? t(`${prompt.min}–${prompt.max} 字`, `${prompt.min} à ${prompt.max} mots`) : t(`至少 ${prompt.min} 字`, `${prompt.min} mots minimum`);

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-sunken/70 p-3">
        <p lang="fr" className="fr font-medium">
          {prompt.fr}
        </p>
        <p className="mt-1 text-sm text-muted">
          {prompt.zh}（{range}）
        </p>
      </div>
      <div>
        <textarea
          lang="fr"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            save(id, { text: e.target.value });
          }}
          rows={10}
          spellCheck
          placeholder={t("在這裡用法文寫作…", "Écrivez ici en français…")}
          aria-label={t("寫作區", "Zone de rédaction")}
          className="seyes fr block w-full resize-y rounded-xl border border-line px-4 py-2 outline-none focus:border-accent"
        />
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
          <span className={`rounded-full px-2.5 py-0.5 font-semibold tabular-nums ${ok ? "bg-ok-soft text-ok" : n ? "bg-warn-soft text-warn" : "bg-sunken text-muted"}`}>
            {n} {t("字", "mots")}／{range}
          </span>
          <span className="text-xs text-muted">{t("草稿只存在這台裝置的瀏覽器裡。字數依空格計算，僅供參考。", "Le brouillon reste dans ce navigateur. Le nombre de mots est indicatif (compté par espaces).")}</span>
          {text && (
            <button
              type="button"
              onClick={() => {
                if (!window.confirm(t("確定要清除這份草稿嗎？", "Effacer ce brouillon ?"))) return;
                setText("");
                setChecks(new Set());
                save(id, { text: "", checks: [] });
              }}
              className="ml-auto text-xs text-muted underline-offset-4 hover:text-bad hover:underline"
            >
              {t("清除草稿", "Effacer le brouillon")}
            </button>
          )}
        </div>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-bold">{t("寫完後逐項檢查", "Relisez point par point")}</legend>
        <ul className="space-y-1">
          {checklist.map((c, i) => (
            <li key={i}>
              <label className="flex min-h-9 cursor-pointer items-start gap-2.5 rounded-md px-1 py-1 hover:bg-sunken/60">
                <input
                  type="checkbox"
                  checked={checks.has(i)}
                  onChange={() => {
                    const next = new Set(checks);
                    if (next.has(i)) next.delete(i);
                    else next.add(i);
                    setChecks(next);
                    save(id, { checks: [...next] });
                  }}
                  className="mt-1 size-4 accent-[var(--accent)]"
                />
                <span className={`text-sm ${checks.has(i) ? "text-muted line-through" : ""}`}>{c}</span>
              </label>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted tabular-nums">
          {t(`已完成 ${checks.size}／${checklist.length} 項`, `${checks.size}／${checklist.length} vérifiés`)}
        </p>
      </fieldset>
    </div>
  );
}
