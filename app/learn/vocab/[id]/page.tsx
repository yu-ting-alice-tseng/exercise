import Link from "next/link";
import { notFound } from "next/navigation";
import PracticeLink from "@/components/learn/PracticeLink";
import VocabClient from "@/components/learn/VocabClient";
import { btnQuiet, container } from "@/components/ui";
import { getVocab, VOCAB, wordCount } from "@/lib/learn";
import { THEMES } from "@/lib/taxonomy";
import type { Level } from "@/lib/types";

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

  return (
    <main className={`${container} pt-6 sm:pt-8`}>
      <Link href="/learn/#vocabulaire" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← 主題單字
      </Link>
      <div className="mb-5">
        <div className="eyebrow" lang="fr">
          {theme.fr}
        </div>
        <h1 className="display text-2xl font-bold sm:text-3xl">{theme.zh}</h1>
        <p className="mt-1 text-sm text-muted">
          {vocab.intro}（共 {wordCount(id)} 個單字）
        </p>
      </div>

      <VocabClient groups={vocab.groups} phrases={vocab.phrases} />

      <section className="mt-10 rounded-xl border border-line bg-surface p-4 sm:p-5">
        <div className="font-bold">用這個主題練習</div>
        <p className="mb-3 text-sm text-muted">從題庫抽出「{theme.zh}」主題的題目，選一個等級開始。</p>
        <div className="flex flex-wrap gap-2">
          {PRACTICE_LEVELS.map((l) => (
            <PracticeLink key={l} level={l} by="theme" topic={id} className={btnQuiet}>
              {l} 練習
            </PracticeLink>
          ))}
        </div>
      </section>

      <div className="mt-6 text-right">
        <Link href={`/learn/vocab/${next.id}/`} className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">
          下一個主題：{next.zh} →
        </Link>
      </div>
    </main>
  );
}
