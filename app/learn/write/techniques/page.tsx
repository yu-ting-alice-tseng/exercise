import Link from "next/link";
import Fiche from "@/components/learn/Fiche";
import { container, twoCol } from "@/components/ui";
import { BASICS, GUIDES } from "@/lib/writing";

export const metadata = { title: "寫作通用技巧｜寫作指南" };

export default function TechniquesPage() {
  return (
    <main className={`${container} pt-6 sm:pt-8`}>
      <Link href="/learn/write/" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← 寫作指南
      </Link>
      <div className="mb-6">
        <div className="eyebrow">Techniques d’écriture</div>
        <h1 className="display text-2xl font-bold sm:text-3xl">寫作通用技巧</h1>
      </div>
      <div className={twoCol}>
        <article className="min-w-0">
          <Fiche summary={BASICS.intro} rules={BASICS.sections} pitfalls={BASICS.pitfalls} />
          <section className="mt-8 rounded-xl border border-line bg-surface p-4">
            <h3 className="display mb-2 text-lg font-bold">交卷前的檢查清單</h3>
            <ul className="space-y-1.5">
              {BASICS.checklist.map((c) => (
                <li key={c} className="flex gap-2 text-sm">
                  <span className="text-ok" aria-hidden>
                    ✓
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </section>
        </article>
        <aside className="mt-8 lg:sticky lg:top-6 lg:mt-0">
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="mb-2 text-sm font-bold">各類文章的寫法</div>
            <ul className="space-y-0.5">
              {GUIDES.map((g) => (
                <li key={g.id}>
                  <Link href={`/learn/write/${g.id}/`} className="flex min-h-9 items-center gap-2 text-sm hover:text-accent">
                    <span className="rounded bg-accent-soft px-1.5 text-[11px] font-bold text-accent tabular-nums">{g.levels}</span>
                    {g.zh}
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
