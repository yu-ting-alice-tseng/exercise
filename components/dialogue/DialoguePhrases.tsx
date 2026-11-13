"use client";

import Speak from "@/components/learn/Speak";
import { LearnToggle, Memory, useDeck } from "@/components/study/LearnBits";
import { useLang } from "@/lib/i18n";
import { dialogueDeck } from "@/lib/idiomSrs";
import { dialoguePhraseId } from "@/lib/study";
import { useNow } from "@/lib/useNow";

/** 對話的「實用說法」：每一句都能聽、能標為已學 */
export default function DialoguePhrases({ dialogueId, phrases }: { dialogueId: string; phrases: { t: string; rows: [string, string][] }[] }) {
  const store = useDeck(dialogueDeck);
  const now = useNow();
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  const ids = phrases.flatMap((ph) => ph.rows.map(([fr]) => dialoguePhraseId(dialogueId, fr)));
  const rest = ids.filter((id) => !store[id]);
  return (
    <section className="mt-10 space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="display text-lg font-bold">
          {lang === "fr" ? "Pour le dire autrement" : <>實用說法 <span className="text-sm font-normal text-muted italic">Pour le dire autrement</span></>}
        </h2>
        {rest.length > 1 && (
          <button type="button" onClick={() => dialogueDeck.markLearned(rest)} className="text-xs text-accent underline-offset-2 hover:underline">
            {t(`這些說法全部標為已學（${rest.length}）`, `Tout marquer comme appris (${rest.length})`)}
          </button>
        )}
      </div>
      {phrases.map((ph) => (
        <div key={ph.t}>
          <h3 className="mb-2 font-bold">{ph.t}</h3>
          <ul className="space-y-2">
            {ph.rows.map(([fr, zh]) => {
              const id = dialoguePhraseId(dialogueId, fr);
              return (
                <li key={id} className="rounded-lg border border-line bg-surface px-3 py-2">
                  <div className="flex items-start gap-2.5">
                    <Speak text={fr} className="mt-0.5 size-7 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p lang="fr" className="fr">
                        {fr}
                      </p>
                      <p className="text-sm text-muted">{zh}</p>
                    </div>
                    <LearnToggle deck={dialogueDeck} id={id} card={store[id]} compact />
                  </div>
                  {store[id] && <Memory c={store[id]} now={now} />}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
