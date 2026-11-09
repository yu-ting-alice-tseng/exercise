import Link from "next/link";
import { notFound } from "next/navigation";
import ReaderClient from "@/components/reading/ReaderClient";
import ReadingQuiz from "@/components/reading/ReadingQuiz";
import { container } from "@/components/ui";
import { getReading, READINGS, readingQuestions, wordCount } from "@/lib/readings";
import { LEVELS, THEMES } from "@/lib/taxonomy";

export const dynamicParams = false;

export function generateStaticParams() {
  return READINGS.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = getReading(id);
  return { title: r ? `${r.title}（${r.zh}）｜閱讀` : "閱讀" };
}

export default async function ReadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = getReading(id);
  if (!r) notFound();
  const i = READINGS.indexOf(r);
  const next = READINGS[(i + 1) % READINGS.length];
  const lv = LEVELS.find((l) => l.id === r.level)!;

  return (
    <main className={`${container} max-w-3xl pt-6 sm:pt-8`}>
      <Link href="/learn/read/" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← 閱讀
      </Link>
      <div className="mb-5 flex items-start gap-3">
        <span className="timbre display mt-1 grid size-12 shrink-0 place-items-center bg-accent text-sm font-bold text-accent-ink">{r.level}</span>
        <div className="min-w-0">
          <div className="eyebrow">{r.kind === "classic" ? "Texte classique" : "Article original"}</div>
          <h1 lang="fr" className="display text-2xl font-bold sm:text-3xl">
            {r.title}
          </h1>
          <p className="font-medium">{r.zh}</p>
          <p className="mt-0.5 text-xs text-muted">
            {lv.zh}・{THEMES.find((t) => t.id === r.theme)?.zh}・約 {wordCount(r)} 字
          </p>
        </div>
      </div>
      <p className="mb-5 text-muted">{r.intro}</p>

      <ReaderClient reading={r} />

      <section id={`quiz-${r.id}`} className="mt-10 scroll-mt-6 rounded-2xl border-2 border-accent/30 bg-accent-soft/40 p-4 sm:p-6">
        <ReadingQuiz id={r.id} level={r.level} title={r.title} questions={readingQuestions(r)} />
      </section>

      {r.source && (
        <aside className="mt-8 rounded-xl border border-line bg-surface p-4 text-sm">
          <div className="mb-1 font-bold">出處</div>
          <p>{r.source.author}</p>
          <p lang="fr" className="italic">
            {r.source.work}
          </p>
          <p className="text-muted">
            原文依據：
            <a href={r.source.url} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
              {r.source.edition}（維基文庫）
            </a>
          </p>
          {r.source.note && <p className="text-muted">{r.source.note}</p>}
          <p className="mt-1 text-xs text-muted">作品已進入公有領域。對話破折號改成短橫線，其餘文字與原版相同；中文為本站翻譯。</p>
        </aside>
      )}

      {r.facts && r.facts.length > 0 && (
        <aside className="mt-8 rounded-xl border border-line bg-surface p-4 text-sm">
          <div className="mb-1 font-bold">事實查證</div>
          <p className="mb-2 text-xs text-muted">本文是本站原創，人物與情節是虛構的。文中提到的事實已對照以下資料：</p>
          <ul className="space-y-1.5">
            {r.facts.map((f, k) => (
              <li key={k} className="flex gap-2">
                <span className="text-ok" aria-hidden>
                  ✓
                </span>
                <span>
                  {f.claim}{" "}
                  <a href={f.url} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
                    來源
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="mt-6 text-right">
        <Link href={`/learn/read/${next.id}/`} className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">
          下一篇：{next.zh}（{next.level}）→
        </Link>
      </div>
    </main>
  );
}
