import Link from "next/link";
import { notFound } from "next/navigation";
import { Examples, Pitfalls, RuleBlock, TableView } from "@/components/learn/Blocks";
import ModelText from "@/components/writing/ModelText";
import WritingPad from "@/components/writing/WritingPad";
import { container, twoCol } from "@/components/ui";
import { getGuide, GUIDES } from "@/lib/writing";
import { T, ZhOnly } from "@/components/T";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const g = getGuide(id);
  return { title: g ? `${g.zh}｜寫作指南` : "寫作指南" };
}

const SECTIONS = [
  { id: "quand", zh: "使用場合", fr: "Quand l’utiliser" },
  { id: "structure", zh: "結構", fr: "Structure" },
  { id: "expressions", zh: "實用句型", fr: "Expressions utiles" },
  { id: "modele", zh: "範文", fr: "Texte modèle" },
  { id: "conseils", zh: "技巧與常見錯誤", fr: "Conseils et pièges" },
  { id: "pratique", zh: "動手寫", fr: "À vos stylos !" },
];

export default async function GuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const g = getGuide(id);
  if (!g) notFound();
  const i = GUIDES.indexOf(g);
  const next = GUIDES[(i + 1) % GUIDES.length];

  return (
    <main className={`${container} pt-6 sm:pt-8`}>
      <Link href="/learn/write/" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← <T zh="寫作指南" fr="Guide de l’écrit" />
      </Link>
      <div className="mb-4">
        <ZhOnly>
          <div className="eyebrow" lang="fr">
            {g.fr}
          </div>
        </ZhOnly>
        <h1 className="display text-2xl font-bold sm:text-3xl">
          <T zh={g.zh} fr={g.fr} />
        </h1>
        <p className="mt-1 text-xs text-muted">
          <T zh="適合等級：" fr="Niveaux : " />
          {g.levels}
        </p>
      </div>

      <nav aria-label="本頁目錄" className="scroll-x -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {SECTIONS.map((s, k) => (
          <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-full border border-line bg-surface px-3 text-sm hover:border-accent/60">
            <span className="text-xs text-rouge tabular-nums">{k + 1}</span>
            <T zh={s.zh} fr={s.fr} />
          </a>
        ))}
      </nav>

      <div className={twoCol}>
        <article className="min-w-0 space-y-10">
          <div className="fiche rounded-xl border border-line px-4 pt-2 pb-4 shadow-sm sm:px-6">
            <div className="display h-8 text-sm text-rouge italic">L&apos;essentiel</div>
            <p className="pt-0.5 text-[1.05rem] font-medium">{g.intro}</p>
          </div>

          <section id="quand" className="scroll-mt-6">
            <h2 className="display mb-3 text-xl font-bold">
              <T zh="使用場合" fr="Quand l’utiliser" />
            </h2>
            <ul className="space-y-1.5">
              {g.when.map((w) => (
                <li key={w} className="flex gap-2">
                  <span className="text-rouge" aria-hidden>
                    ›
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </section>

          <section id="structure" className="scroll-mt-6">
            <h2 className="display mb-4 text-xl font-bold">
              <T zh="結構" fr="Structure" />
            </h2>
            <ol className="relative space-y-5 border-l-2 border-accent/30 pl-6">
              {g.structure.map((s, k) => (
                <li key={k} className="relative">
                  <span className="absolute top-0.5 -left-[34px] grid size-6 place-items-center rounded-full bg-accent text-xs font-bold text-accent-ink tabular-nums">{k + 1}</span>
                  <div className="font-bold">
                    <T zh={<>{s.zh} <span lang="fr" className="display text-sm font-normal text-muted italic">{s.fr}</span></>} fr={s.fr} />
                  </div>
                  <p className="mt-1 whitespace-pre-line">{s.d}</p>
                  {s.ex && (
                    <div className="mt-2">
                      <Examples ex={s.ex} />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section id="expressions" className="scroll-mt-6 space-y-5">
            <h2 className="display text-xl font-bold">
              <T zh="實用句型" fr="Expressions utiles" />
            </h2>
            {g.phrases.map((ph) => (
              <div key={ph.t}>
                <h3 className="mb-2 font-bold">{ph.t}</h3>
                <TableView table={{ head: ["法文", "中文"], rows: ph.rows, fr: [0] }} />
              </div>
            ))}
          </section>

          <section id="modele" className="scroll-mt-6">
            <h2 className="display mb-1 text-xl font-bold">
              <T zh="範文" fr="Texte modèle" />
            </h2>
            <p lang="fr" className="display font-bold italic">
              {g.model.title}
            </p>
            <p className="mb-4 text-sm text-muted">
              <T zh="題目" fr="Sujet" />（{g.model.level}）：{g.model.prompt}
            </p>
            <ModelText parts={g.model.parts} context={g.model.context} note={g.model.note} />
            <p className="mt-2 text-xs text-muted">
              <T zh="範文為本站原創，僅供參考寫法；人物、地點與情境皆為虛構。" fr="Texte modèle original, à titre d’exemple ; personnages, lieux et situations sont fictifs." />
            </p>
          </section>

          <section id="conseils" className="scroll-mt-6 space-y-6">
            <h2 className="display text-xl font-bold">
              <T zh="技巧與常見錯誤" fr="Conseils et pièges" />
            </h2>
            {g.tips.map((t, k) => (
              <RuleBlock key={k} rule={t} n={k + 1} />
            ))}
            {g.pitfalls && <Pitfalls items={g.pitfalls} />}
          </section>

          <section id="pratique" className="scroll-mt-6 rounded-2xl border-2 border-accent/30 bg-accent-soft/40 p-4 sm:p-6">
            <ZhOnly>
              <div className="eyebrow">À vos stylos !</div>
            </ZhOnly>
            <h2 className="display mb-3 text-xl font-bold">
              <T zh="動手寫" fr="À vos stylos !" />
            </h2>
            <WritingPad guideId={g.id} prompts={g.prompts} checklist={g.checklist} />
          </section>
        </article>

        <aside className="mt-8 space-y-5 lg:sticky lg:top-6 lg:mt-0">
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="mb-2 text-sm font-bold">
              <T zh="交稿前檢查" fr="Avant de rendre" />
            </div>
            <ul className="space-y-1.5 text-sm">
              {g.checklist.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-ok" aria-hidden>
                    ✓
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="mb-2 text-sm font-bold">
              <T zh="其他文類" fr="Autres types de textes" />
            </div>
            <ul className="space-y-0.5">
              <li>
                <Link href="/learn/write/techniques/" className="flex min-h-9 items-center text-sm hover:text-accent">
                  <T zh="寫作通用技巧" fr="Techniques générales" />
                </Link>
              </li>
              {GUIDES.map((o) => (
                <li key={o.id}>
                  <Link
                    href={`/learn/write/${o.id}/`}
                    aria-current={o.id === g.id ? "page" : undefined}
                    className={`flex min-h-9 items-center rounded-md px-2 text-sm ${o.id === g.id ? "bg-accent-soft font-medium text-accent" : "hover:text-accent"}`}
                  >
                    <T zh={o.zh} fr={o.fr} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-8 text-right">
        <Link href={`/learn/write/${next.id}/`} className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">
          <T zh={`下一種：${next.zh}`} fr={`Suivant : ${next.fr}`} /> →
        </Link>
      </div>
    </main>
  );
}
