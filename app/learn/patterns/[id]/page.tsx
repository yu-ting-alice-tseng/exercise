import Link from "next/link";
import { notFound } from "next/navigation";
import Fiche from "@/components/learn/Fiche";
import { container, twoCol } from "@/components/ui";
import { getNote, getPattern, PATTERNS } from "@/lib/learn";

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
