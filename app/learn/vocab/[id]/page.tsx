import Link from "next/link";
import { notFound } from "next/navigation";
import PracticeLink from "@/components/learn/PracticeLink";
import VocabClient from "@/components/learn/VocabClient";
import DeckReview from "@/components/study/DeckReview";
import { vocabStudyItems } from "@/lib/studyItems";
import { btnQuiet, container } from "@/components/ui";
import { getVocab, VOCAB, wordCount } from "@/lib/learn";
import { THEMES } from "@/lib/taxonomy";
import type { Level } from "@/lib/types";
import { T, ZhOnly } from "@/components/T";

export const dynamicParams = false;

export function generateStaticParams() {
  return VOCAB.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = getVocab(id);
  return { title: v ? `${v.theme.zh}｜主題單字` : "主題單字" };
}

const PRACTICE_LEVELS: Level[] = ["A1", "A2", "B1", "B2"];

export default async function VocabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = getVocab(id);
  if (!v) notFound();
  const { theme, vocab } = v;
  const i = THEMES.findIndex((t) => t.id === id);
  const next = THEMES[(i + 1) % THEMES.length];
  const all = vocabStudyItems();
  const here = all.filter((it) => it.id.startsWith(`${id}:`));

  return (
    <main className={`${container} pt-6 sm:pt-8`}>
      <Link href="/learn/#vocabulaire" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← <T zh="主題單字" fr="Vocabulaire" />
      </Link>
      <div className="mb-5">
        <ZhOnly>
          <div className="eyebrow" lang="fr">
            {theme.fr}
          </div>
        </ZhOnly>
        <h1 className="display text-2xl font-bold sm:text-3xl">
          <T zh={theme.zh} fr={theme.fr} />
        </h1>
        <p className="mt-1 text-sm text-muted">
          <T zh={`${vocab.intro}（共 ${wordCount(id)} 個單字）`} fr={`${wordCount(id)} mots. ${vocab.intro}`} />
        </p>
      </div>

      <VocabClient themeId={id} groups={vocab.groups} phrases={vocab.phrases} />

      <DeckReview
        deck="vocab"
        ranges={[
          { id: "theme", zh: `這個主題：${theme.zh}`, fr: `Ce thème : ${theme.fr}`, items: here },
          { id: "all", zh: "全部主題", fr: "Tous les thèmes", items: all },
        ]}
        all={all}
        title="法文主題單字測驗"
        fileName="french-vocab-quiz"
        noun={{ zh: "單字", fr: "mot" }}
      />

      <section className="mt-10 rounded-xl border border-line bg-surface p-4 sm:p-5">
        <div className="font-bold">
          <T zh="用這個主題練習" fr="S’entraîner sur ce thème" />
        </div>
        <p className="mb-3 text-sm text-muted">
          <T zh={`從題庫抽出「${theme.zh}」主題的題目，選一個等級開始。`} fr={`Des questions sur le thème « ${theme.fr} » : choisissez un niveau.`} />
        </p>
        <div className="flex flex-wrap gap-2">
          {PRACTICE_LEVELS.map((l) => (
            <PracticeLink key={l} level={l} by="theme" topic={id} className={btnQuiet}>
              {l} <T zh="練習" fr="" />
            </PracticeLink>
          ))}
        </div>
      </section>

      <div className="mt-6 text-right">
        <Link href={`/learn/vocab/${next.id}/`} className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">
          <T zh={`下一個主題：${next.zh}`} fr={`Thème suivant : ${next.fr}`} /> →
        </Link>
      </div>
    </main>
  );
}
