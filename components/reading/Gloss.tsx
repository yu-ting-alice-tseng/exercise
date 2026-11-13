"use client";

import Speak from "@/components/learn/Speak";
import { useLang } from "@/lib/i18n";
import { glossKey, MARK, plainText } from "@/lib/readingText";
import type { Gloss } from "@/lib/readingTypes";

export interface ActiveGloss {
  key: string;
  word: string;
  g: Gloss;
}

/** 把 [[字]] 換成可以點的按鈕 */
export function Sentence({
  fr,
  glossary,
  active,
  onWord,
}: {
  fr: string;
  glossary: Record<string, Gloss>;
  active: string | null;
  onWord: (a: ActiveGloss) => void;
}) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of fr.matchAll(MARK)) {
    const [all, word, key] = m;
    const k = glossKey(word, key);
    const g = glossary[k];
    if (m.index > last) out.push(fr.slice(last, m.index));
    out.push(
      g ? (
        <button
          key={m.index}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onWord({ key: k, word, g });
          }}
          className={`rounded-sm underline decoration-accent/50 decoration-dotted decoration-2 underline-offset-4 transition hover:bg-accent-soft ${
            active === k ? "bg-accent-soft text-accent" : ""
          }`}
        >
          {word}
        </button>
      ) : (
        word
      ),
    );
    last = m.index + all.length;
  }
  out.push(fr.slice(last));
  return <>{out}</>;
}

/** 單字卡：固定在畫面底部，手機和電腦都好按 */
export function GlossCard({ active, onClose }: { active: ActiveGloss; onClose: () => void }) {
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:bottom-4 sm:mx-auto sm:max-w-md" role="dialog" aria-label={`${t("單字：", "Mot : ")}${active.word}`}>
      <div className="anim-rise rounded-2xl border border-accent/40 bg-surface p-4 shadow-xl">
        <div className="flex items-start gap-3">
          <Speak text={plainText(active.g.lemma).replace(/\s*\([^)]*\)/g, "")} label={`${t("朗讀", "Écouter")} ${active.g.lemma}`} className="mt-0.5" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span lang="fr" className="display text-xl font-bold">
                {active.g.lemma}
              </span>
              <span className="text-xs text-muted">{active.g.pos}</span>
            </div>
            <div className="font-medium">{active.g.zh}</div>
            {active.word.toLowerCase() !== active.g.lemma.toLowerCase() && (
              <div className="mt-0.5 text-xs text-muted">
                {t("文中寫作", "Dans le texte :")} <span lang="fr" className="font-medium text-ink">{active.word}</span>
              </div>
            )}
            {active.g.note && <p className="mt-1.5 text-sm text-muted">{active.g.note}</p>}
          </div>
          <button type="button" onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-full text-muted hover:bg-sunken" aria-label={t("關閉單字卡", "Fermer")}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

/** 文末的單字表 */
export function GlossList({ glossary, action }: { glossary: Record<string, Gloss>; action?: (key: string) => React.ReactNode }) {
  const lang = useLang();
  return (
    <section className="mt-8">
      <h2 className="display mb-3 text-lg font-bold">
        {lang === "fr" ? "Vocabulaire" : <>單字表 <span className="text-sm font-normal text-muted italic">Vocabulaire</span></>}
      </h2>
      <dl className="grid gap-2 sm:grid-cols-2">
        {Object.entries(glossary).map(([k, g]) => (
          <div key={k} className="flex items-start gap-2.5 rounded-lg border border-line bg-surface px-3 py-2">
            <Speak text={g.lemma.replace(/\s*\([^)]*\)/g, "")} className="mt-0.5 size-7" />
            <div className="min-w-0 flex-1">
              <dt lang="fr" className="font-medium">
                {g.lemma} <span className="text-xs font-normal text-muted">{g.pos}</span>
              </dt>
              <dd className="text-sm text-muted">
                {g.zh}
                {g.note && <span className="block text-xs">{g.note}</span>}
              </dd>
              {action?.(k)}
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
