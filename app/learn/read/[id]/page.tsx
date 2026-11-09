import Link from "next/link";
import { notFound } from "next/navigation";
import ReaderClient from "@/components/reading/ReaderClient";
import { container } from "@/components/ui";
import { getReading, READINGS, readingQuestions, REFS_ACCESSED, wordCount } from "@/lib/readings";
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

      <ReaderClient reading={r} questions={readingQuestions(r)} />

      <footer className="mt-10 border-t border-line pt-5 text-sm">
        <h2 className="mb-2 font-bold">
          資料來源 <span className="display font-normal text-muted italic">Sources</span>
        </h2>
        {r.source ? (
          <div className="space-y-1.5">
            <p>
              <span lang="fr">{r.source.author}</span>，〈<span lang="fr" className="italic">{r.title.replace(/ \(.*\)$/, "")}</span>〉，
              <span lang="fr">{r.source.work}</span>。
            </p>
            <p className="text-muted">
              法文原文取自
              <a href={r.source.url} target="_blank" rel="noreferrer" className="mx-1 text-accent underline-offset-2 hover:underline">
                維基文庫
              </a>
              收錄之 <span lang="fr">{r.source.edition}</span>
              {r.source.note ? `，${r.source.note}` : "。"}
            </p>
            <p className="text-muted">
              著作權：作者逝世已逾百年，原作屬公有領域。除了把對話破折號改成短橫線外，原文未經更動。中文翻譯、單字解釋與閱讀測驗由本站製作。
            </p>
          </div>
        ) : r.refs && r.refs.length > 0 ? (
          <div className="space-y-1.5">
            <p className="text-muted">本文由本站原創撰寫，人物與情節為虛構。文中的背景資訊參考下列資料，僅採用其中的事實，未轉載原文。</p>
            <ol className="list-decimal space-y-1 pl-5">
              {r.refs.map((ref) => (
                <li key={ref.url}>
                  <span lang="fr">〈{ref.title}〉</span>，{ref.site}，{REFS_ACCESSED}查閱。
                  <a href={ref.url} target="_blank" rel="noreferrer" className="ml-1 break-all text-accent underline-offset-2 hover:underline">
                    {decodeURI(ref.url)}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="text-muted">本文由本站原創撰寫，人物與情節為虛構，未參考或轉載其他資料。</p>
        )}
      </footer>

      <div className="mt-6 text-right">
        <Link href={`/learn/read/${next.id}/`} className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">
          下一篇：{next.zh}（{next.level}）→
        </Link>
      </div>
    </main>
  );
}
