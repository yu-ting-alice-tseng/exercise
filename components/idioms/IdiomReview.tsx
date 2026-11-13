"use client";

import StudyReview from "@/components/study/StudyReview";
import { IDIOMS } from "@/lib/idioms";
import { idiomDeck, type IdiomStore } from "@/lib/idiomSrs";
import type { StudyItem } from "@/lib/study";

/** 俗語轉成複習項目；口語類的 lit 是標準法文，不能當提示（會直接洩漏答案） */
const ITEMS: StudyItem[] = IDIOMS.map((it) => ({
  id: it.id,
  fr: it.fr,
  zh: it.zh,
  eq: it.eq,
  ex: it.ex,
  lit: it.kind === "familier" || it.kind === "jeunes" ? undefined : it.lit ? `字面：${it.lit}` : undefined,
  group: it.kind,
}));

export default function IdiomReview({ store, now }: { store: IdiomStore; now: number }) {
  return (
    <StudyReview
      deck={idiomDeck}
      store={store}
      now={now}
      ranges={[{ id: "all", zh: "全部", fr: "Tout", items: ITEMS }]}
      all={ITEMS}
      title="法文俗語諺語測驗"
      fileName="french-idioms-quiz"
      noun={{ zh: "說法", fr: "expression" }}
    />
  );
}
