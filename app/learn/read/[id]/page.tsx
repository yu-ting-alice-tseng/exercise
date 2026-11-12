import Link from "next/link";
import { notFound } from "next/navigation";
import ReaderClient from "@/components/reading/ReaderClient";
import { container } from "@/components/ui";
import { getReading, READINGS, readingQuestions, REFS_ACCESSED, REFS_ACCESSED_FR, wordCount } from "@/lib/readings";
import { LEVELS, THEMES } from "@/lib/taxonomy";
import { T, ZhOnly } from "@/components/T";

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
        ← <T zh="閱讀" fr="Lectures" />
      </Link>
      <div className="mb-5 flex items-start gap-3">
        <span className="timbre display mt-1 grid size-12 shrink-0 place-items-center bg-accent text-sm font-bold text-accent-ink">{r.level}</span>
        <div className="min-w-0">
          <div className="eyebrow">{r.kind === "classic" ? "Texte classique" : "Article original"}</div>
          <h1 lang="fr" className="display text-2xl font-bold sm:text-3xl">
            {r.title}
          </h1>
          <ZhOnly>
            <p className="font-medium">{r.zh}</p>
          </ZhOnly>
          <p className="mt-0.5 text-xs text-muted">
            <T
              zh={`${lv.zh}・${THEMES.find((t) => t.id === r.theme)?.zh}・約 ${wordCount(r)} 字`}
              fr={`${lv.fr} · ${THEMES.find((t) => t.id === r.theme)?.fr} · env. ${wordCount(r)} mots`}
            />
          </p>
        </div>
      </div>
      <p className="mb-5 text-muted">{r.intro}</p>

      <ReaderClient reading={r} questions={readingQuestions(r)} />

      <footer className="mt-10 border-t border-line pt-5 text-sm">
        <h2 className="mb-2 font-bold">
          <T zh={<>資料來源 <span className="display font-normal text-muted italic">Sources</span></>} fr="Sources" />
        </h2>
        {r.source ? (
          <div className="space-y-1.5">
            <p>
              <T
                zh={
                  <>
                    <span lang="fr">{r.source.author}</span>，〈<span lang="fr" className="italic">{r.title.replace(/ \(.*\)$/, "")}</span>〉，
                    <span lang="fr">{r.source.work}</span>。
                  </>
                }
                fr={
                  <>
                    {r.source.author}, « {r.title.replace(/ \(.*\)$/, "")} », <i>{r.source.work}</i>.
                  </>
                }
              />
            </p>
            <p className="text-muted">
              <T zh="法文原文取自" fr="Texte français tiré de" />
              <a href={r.source.url} target="_blank" rel="noreferrer" className="mx-1 text-accent underline-offset-2 hover:underline">
                <T zh="維基文庫" fr="Wikisource" />
              </a>
              <T zh="收錄之" fr="(" /> <span lang="fr">{r.source.edition}</span>
              <T zh={r.source.note ? `，${r.source.note}` : "。"} fr={r.source.note ? `). ${r.source.note}` : ")."} />
            </p>
            <p className="text-muted">
              <T
                zh={`著作權：作者逝世已逾百年，原作屬公有領域。${
                  r.source.modernized ? "法文依初版照錄，只把古式拼寫改成現代拼寫，用字、語序與標點未更動。" : "除了把長破折號改成短橫線外，原文未經更動。"
                }中文翻譯、單字解釋與閱讀測驗由本站製作。`}
                fr={`Droits : l’auteur est mort depuis plus de cent ans, l’œuvre est dans le domaine public. ${
                  r.source.modernized
                    ? "Texte de la première édition, en orthographe modernisée ; mots, ordre et ponctuation inchangés."
                    : "Texte inchangé, à part les tirets longs remplacés par des tirets courts."
                } Traduction chinoise, glossaire et quiz réalisés par ce site.`}
              />
            </p>
            {r.refs && r.refs.length > 0 && (
              <p className="text-muted">
                <T zh="作品簡介參考：" fr="Présentation de l’œuvre d’après : " />
                {r.refs.map((ref, k) => (
                  <span key={ref.url}>
                    {k > 0 && <T zh="；" fr=" ; " />}
                    <T
                      zh={
                        <>
                          <span lang="fr">〈{ref.title}〉</span>，{ref.site}，{REFS_ACCESSED}查閱
                        </>
                      }
                      fr={`« ${ref.title} », ${ref.site}, consulté ${REFS_ACCESSED_FR}`}
                    />
                    <a href={ref.url} target="_blank" rel="noreferrer" className="ml-1 text-accent underline-offset-2 hover:underline">
                      <T zh="連結" fr="lien" />
                    </a>
                  </span>
                ))}
                <T zh="。" fr="." />
              </p>
            )}
          </div>
        ) : r.refs && r.refs.length > 0 ? (
          <div className="space-y-1.5">
            <p className="text-muted">
              <T
                zh="本文由本站原創撰寫。文中的背景資訊參考下列資料，僅採用其中的事實，未轉載原文。"
                fr="Texte original de ce site. Les informations de contexte s’appuient sur les sources ci-dessous, dont seuls les faits sont repris, sans reproduction du texte."
              />
            </p>
            <ol className="list-decimal space-y-1 pl-5">
              {r.refs.map((ref) => (
                <li key={ref.url}>
                  <T
                    zh={
                      <>
                        <span lang="fr">〈{ref.title}〉</span>，{ref.site}，{REFS_ACCESSED}查閱。
                      </>
                    }
                    fr={`« ${ref.title} », ${ref.site}, consulté ${REFS_ACCESSED_FR}.`}
                  />
                  <a href={ref.url} target="_blank" rel="noreferrer" className="ml-1 break-all text-accent underline-offset-2 hover:underline">
                    {decodeURI(ref.url)}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="text-muted">
            <T zh="本文由本站原創撰寫，未參考或轉載其他資料。" fr="Texte original de ce site, rédigé sans source extérieure." />
          </p>
        )}
      </footer>

      <div className="mt-6 text-right">
        <Link href={`/learn/read/${next.id}/`} className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">
          <T zh={`下一篇：${next.zh}`} fr={`Texte suivant : ${next.title}`} />（{next.level}）→
        </Link>
      </div>
    </main>
  );
}
