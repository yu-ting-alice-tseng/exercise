import Link from "next/link";
import { notFound } from "next/navigation";
import ExampleDrill from "@/components/learn/ExampleDrill";
import Fiche from "@/components/learn/Fiche";
import PracticeLink from "@/components/learn/PracticeLink";
import { container, twoCol } from "@/components/ui";
import { getNote, getPattern, morePatternExamples, PATTERNS } from "@/lib/learn";

export const dynamicParams = false;

export function generateStaticParams() {
  return PATTERNS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getPattern(id);
  return { title: p ? `${p.zh}｜句型總整理` : "句型總整理" };
}

export default async function PatternPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = getPattern(id);
  if (!page) notFound();
  const more = morePatternExamples(id);
  const related = (page.related ?? []).flatMap((g) => {
    const e = getNote(g);
    return e ? [e] : [];
  });

  return (
    <main className={`${container} pt-6 sm:pt-8`}>
      <Link href="/learn/#phrases" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← 句型總整理
      </Link>
      <div className="mb-6">
        <div className="eyebrow" lang="fr">
          {page.fr}
        </div>
        <h1 className="display text-2xl font-bold sm:text-3xl">{page.zh}</h1>
      </div>

      <div className={twoCol}>
        <article className="min-w-0">
          <Fiche summary={page.intro} rules={page.sections} pitfalls={page.pitfalls} />

          {more.length > 0 && (
            <section className="mt-10">
              <h3 className="display mb-1 text-lg font-bold">
                更多例句 <span className="text-sm font-normal text-muted italic">Encore des exemples</span>
              </h3>
              <p className="mb-3 text-sm text-muted">遮住一邊自我測驗，或全部連續朗讀。</p>
              <ExampleDrill ex={more} />
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-10 rounded-2xl border-2 border-accent/30 bg-accent-soft/40 p-4 sm:p-6">
              <div className="eyebrow">À vous !</div>
              <h3 className="display text-xl font-bold">練習這些句型</h3>
              <p className="mb-4 text-sm text-muted">每個文法點可以直接開始 10 題練習，或先看筆記再做筆記裡的小測驗。</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {related.map((e) => (
                  <li key={e.topic.id} className="flex items-center gap-2 rounded-lg border border-line bg-surface p-2.5">
                    <span className="rounded bg-accent-soft px-1.5 text-[11px] font-bold text-accent tabular-nums">{e.level}</span>
                    <Link href={`/learn/grammar/${e.topic.id}/`} className="min-w-0 flex-1 text-sm hover:text-accent">
                      {e.topic.zh}
                    </Link>
                    <PracticeLink
                      level={e.level}
                      by="grammar"
                      topic={e.topic.id}
                      className="inline-flex min-h-9 shrink-0 items-center rounded-lg bg-accent px-3 text-sm font-medium text-accent-ink hover:brightness-110"
                    >
                      練習
                    </PracticeLink>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <aside className="mt-8 space-y-5 lg:sticky lg:top-6 lg:mt-0">
          {related.length > 0 && (
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="mb-1 text-sm font-bold">相關文法筆記與練習</div>
              <p className="mb-2 text-xs text-muted">點進去看詳細規則，頁面最後可以直接練習。</p>
              <ul className="space-y-0.5">
                {related.map((e) => (
                  <li key={e.topic.id}>
                    <Link href={`/learn/grammar/${e.topic.id}/`} className="flex min-h-9 items-center gap-2 text-sm hover:text-accent">
                      <span className="rounded bg-accent-soft px-1.5 text-[11px] font-bold text-accent tabular-nums">{e.level}</span>
                      {e.topic.zh}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="mb-2 text-sm font-bold">其他句型總整理</div>
            <ul className="space-y-0.5">
              {PATTERNS.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/learn/patterns/${p.id}/`}
                    aria-current={p.id === id ? "page" : undefined}
                    className={`flex min-h-9 items-center rounded-md px-2 text-sm ${p.id === id ? "bg-accent-soft font-medium text-accent" : "hover:text-accent"}`}
                  >
                    {p.zh}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
