import Link from "next/link";
import { notFound } from "next/navigation";
import ExampleDrill from "@/components/learn/ExampleDrill";
import Fiche from "@/components/learn/Fiche";
import NoteQuiz from "@/components/learn/NoteQuiz";
import PracticeLink from "@/components/learn/PracticeLink";
import { btnPrimary, btnQuiet, container, twoCol } from "@/components/ui";
import { BANK } from "@/lib/bank";
import { getNote, moreExamples, NOTE_ENTRIES, PATTERNS } from "@/lib/learn";
import { CATEGORIES, LEVELS } from "@/lib/taxonomy";

export const dynamicParams = false;

export function generateStaticParams() {
  return NOTE_ENTRIES.map((e) => ({ id: e.topic.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const e = getNote(id);
  return { title: e ? `${e.topic.zh}（${e.level}）｜文法筆記` : "文法筆記" };
}

export default async function GrammarNotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = getNote(id);
  if (!entry) notFound();
  const { level, topic, note } = entry;
  const i = NOTE_ENTRIES.indexOf(entry);
  const prev = NOTE_ENTRIES[i - 1];
  const next = NOTE_ENTRIES[i + 1];
  const siblings = NOTE_ENTRIES.filter((e) => e.level === level);
  const patterns = PATTERNS.filter((p) => p.related?.includes(id));
  const cat = CATEGORIES.find((c) => c.id === topic.cat);
  const lv = LEVELS.find((l) => l.id === level)!;
  const pool = BANK.filter((q) => q.grammar === id);
  const more = moreExamples(id);
  const n = { choice: 0, fill: 0, short: 0 };
  for (const q of pool) n[q.type]++;

  const practice = (
    <div className="space-y-2">
      <PracticeLink level={level} by="grammar" topic={id} className={`${btnPrimary} w-full`}>
        練習這個文法（10 題）
      </PracticeLink>
      <div className="grid grid-cols-3 gap-2">
        <PracticeLink level={level} by="grammar" topic={id} counts={{ choice: Math.min(10, n.choice), fill: 0, short: 0 }} className={`${btnQuiet} px-2`}>
          選擇題
        </PracticeLink>
        <PracticeLink level={level} by="grammar" topic={id} counts={{ choice: 0, fill: Math.min(10, n.fill), short: 0 }} className={`${btnQuiet} px-2`}>
          填充題
        </PracticeLink>
        <PracticeLink level={level} by="grammar" topic={id} counts={{ choice: 0, fill: 0, short: Math.min(6, n.short) }} className={`${btnQuiet} px-2`}>
          簡答題
        </PracticeLink>
      </div>
      <p className="text-center text-xs text-muted">
        題庫裡這個文法點共 {pool.length} 題，或是
        <a href="#exercice" className="text-accent underline-offset-2 hover:underline">
          直接在下面做 5 題小測驗
        </a>
        。
      </p>
    </div>
  );

  return (
    <main className={`${container} pt-6 sm:pt-8`}>
      <Link href="/learn/#grammaire" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← 文法筆記
      </Link>
      <div className="mb-6 flex items-start gap-3">
        <span className="timbre display mt-1 grid size-12 shrink-0 place-items-center bg-accent text-sm font-bold text-accent-ink">{level}</span>
        <div className="min-w-0">
          <div className="eyebrow" lang="fr">
            {topic.fr}
          </div>
          <h1 className="display text-2xl font-bold sm:text-3xl">{topic.zh}</h1>
          <p className="mt-0.5 text-xs text-muted">
            {lv.zh}・{cat?.zh}
          </p>
        </div>
      </div>

      <div className={twoCol}>
        <article className="min-w-0">
          <div className="mb-6 flex flex-wrap gap-2 text-sm lg:hidden">
            <a href="#exercice" className="inline-flex min-h-9 items-center rounded-full border border-accent/40 bg-accent-soft px-3 font-medium text-accent">
              跳到小測驗 ↓
            </a>
            {more.length > 0 && (
              <a href="#exemples" className="inline-flex min-h-9 items-center rounded-full border border-line bg-surface px-3">
                更多例句 ↓
              </a>
            )}
          </div>

          <Fiche summary={note.summary} rules={note.rules} pitfalls={note.pitfalls} tip={note.tip} />

          {more.length > 0 && (
            <section id="exemples" className="mt-10 scroll-mt-6">
              <h3 className="display mb-1 text-lg font-bold">
                更多例句 <span className="text-sm font-normal text-muted italic">Encore des exemples</span>
              </h3>
              <p className="mb-3 text-sm text-muted">{more.length} 個例句，可以遮住一邊自我測驗，也可以全部連續朗讀。</p>
              <ExampleDrill ex={more} />
            </section>
          )}

          <div className="mt-10">
            <NoteQuiz id={id} zh={topic.zh} level={level} pool={pool} />
          </div>

          <div className="mt-6 lg:hidden">{practice}</div>

          <nav aria-label="上一個與下一個文法點" className="mt-8 grid grid-cols-2 gap-3 border-t border-line pt-5 text-sm">
            {prev ? (
              <Link href={`/learn/grammar/${prev.topic.id}/`} className="rounded-lg border border-line p-3 hover:border-accent/60">
                <div className="text-xs text-muted">← 上一個（{prev.level}）</div>
                <div className="font-medium">{prev.topic.zh}</div>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/learn/grammar/${next.topic.id}/`} className="rounded-lg border border-line p-3 text-right hover:border-accent/60">
                <div className="text-xs text-muted">下一個（{next.level}）→</div>
                <div className="font-medium">{next.topic.zh}</div>
              </Link>
            )}
          </nav>
        </article>

        <aside className="mt-8 space-y-5 lg:sticky lg:top-6 lg:mt-0">
          <div className="hidden lg:block">{practice}</div>
          {patterns.length > 0 && (
            <div className="rounded-xl border border-line bg-surface p-4">
              <div className="mb-2 text-sm font-bold">相關的句型總整理</div>
              <ul className="space-y-1">
                {patterns.map((p) => (
                  <li key={p.id}>
                    <Link href={`/learn/patterns/${p.id}/`} className="flex min-h-9 items-center text-sm hover:text-accent">
                      <span className="mr-1.5 text-rouge">›</span>
                      {p.zh}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="mb-2 text-sm font-bold">{level} 的其他文法點</div>
            <ul className="space-y-0.5">
              {siblings.map((e) => (
                <li key={e.topic.id}>
                  <Link
                    href={`/learn/grammar/${e.topic.id}/`}
                    aria-current={e.topic.id === id ? "page" : undefined}
                    className={`flex min-h-9 items-center rounded-md px-2 text-sm ${
                      e.topic.id === id ? "bg-accent-soft font-medium text-accent" : "hover:text-accent"
                    }`}
                  >
                    {e.topic.zh}
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
