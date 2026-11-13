"use client";

import StudyReview, { type StudyRange } from "./StudyReview";
import { SrsExplainer, useDeck } from "./LearnBits";
import { dialogueDeck, vocabDeck } from "@/lib/idiomSrs";
import { useLang } from "@/lib/i18n";
import type { StudyItem } from "@/lib/study";
import { useNow } from "@/lib/useNow";

const DECKS = { vocab: vocabDeck, dialogue: dialogueDeck };

/** 伺服器頁面用：放一個間隔複習區（單字或對話） */
export default function DeckReview({
  deck,
  ranges,
  all,
  title,
  fileName,
  noun,
}: {
  deck: keyof typeof DECKS;
  ranges: StudyRange[];
  all: StudyItem[];
  title: string;
  fileName: string;
  noun: { zh: string; fr: string };
}) {
  const d = DECKS[deck];
  const store = useDeck(d);
  const now = useNow();
  const lang = useLang();
  return (
    <section id="review" className="mt-10 scroll-mt-6 rounded-2xl border-2 border-ok/30 bg-ok-soft/40 p-4 sm:p-6">
      {lang === "zh" && <div className="eyebrow">Révisions espacées</div>}
      <h2 className="display text-xl font-bold">{lang === "fr" ? "Révisions espacées" : "間隔複習"}</h2>
      <SrsExplainer />
      <StudyReview deck={d} store={store} now={now} ranges={ranges} all={all} title={title} fileName={fileName} noun={noun} />
    </section>
  );
}
