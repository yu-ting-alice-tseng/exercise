import Link from "next/link";
import { notFound } from "next/navigation";
import DialogueClient from "@/components/dialogue/DialogueClient";
import { TableView } from "@/components/learn/Blocks";
import { T, ZhOnly } from "@/components/T";
import { container } from "@/components/ui";
import { DIALOGUES, dialogueQuestions, getDialogue, REGISTER, SCENES } from "@/lib/dialogues";
import { LEVELS } from "@/lib/taxonomy";

export const dynamicParams = false;

export function generateStaticParams() {
  return DIALOGUES.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = getDialogue(id);
  return { title: d ? `${d.title}（${d.zh}）｜情境對話` : "情境對話" };
}

export default async function DialoguePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = getDialogue(id);
  if (!d) notFound();
  const i = DIALOGUES.indexOf(d);
  const next = DIALOGUES[(i + 1) % DIALOGUES.length];
  const lv = LEVELS.find((l) => l.id === d.level)!;
  const scene = SCENES.find((s) => s.id === d.scene)!;
  const reg = REGISTER[d.register];

  return (
    <main className={`${container} max-w-3xl pt-6 sm:pt-8`}>
      <Link href="/learn/dialogues/" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← <T zh="情境對話" fr="Dialogues" />
      </Link>
      <div className="mb-4 flex items-start gap-3">
        <span className="timbre display mt-1 grid size-12 shrink-0 place-items-center bg-accent text-sm font-bold text-accent-ink">{d.level}</span>
        <div className="min-w-0">
          <ZhOnly>
            <div className="eyebrow">Dialogue</div>
          </ZhOnly>
          <h1 lang="fr" className="display text-2xl font-bold sm:text-3xl">
            {d.title}
          </h1>
          <ZhOnly>
            <p className="font-medium">{d.zh}</p>
          </ZhOnly>
          <p className="mt-0.5 text-xs text-muted">
            <T zh={`${lv.zh}・${scene.zh}・${d.lines.length} 句`} fr={`${lv.fr} · ${scene.fr} · ${d.lines.length} répliques`} />
          </p>
        </div>
      </div>
      <p className="mb-3 text-muted">{d.intro}</p>
      <p className="mb-5 flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded-full border border-accent/40 bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-accent">
          <T zh={reg.zh} fr={reg.fr} />
        </span>
        <span className="text-muted">
          <T zh={reg.hint} fr={reg.hintFr} />
        </span>
      </p>

      <DialogueClient d={d} questions={dialogueQuestions(d)} />

      <section className="mt-10 space-y-5">
        <h2 className="display text-lg font-bold">
          <T zh={<>實用說法 <span className="text-sm font-normal text-muted italic">Pour le dire autrement</span></>} fr="Pour le dire autrement" />
        </h2>
        {d.phrases.map((ph) => (
          <div key={ph.t}>
            <h3 className="mb-2 font-bold">{ph.t}</h3>
            <TableView table={{ head: ["Français", "中文"], rows: ph.rows, fr: [0] }} />
          </div>
        ))}
      </section>

      {d.culture && (
        <aside className="mt-8 rounded-xl border-l-4 border-rouge bg-rouge-soft/50 p-4">
          <div className="mb-1 text-sm font-bold text-rouge">
            <T zh="文化小提醒" fr="Le savoir-vivre" />
          </div>
          <p className="text-sm">{d.culture}</p>
        </aside>
      )}

      <p className="mt-6 text-xs text-muted">
        <T zh="本對話為本站原創，人物與店家皆為虛構。" fr="Dialogue original de ce site ; personnages et lieux fictifs." />
      </p>

      <div className="mt-6 text-right">
        <Link href={`/learn/dialogues/${next.id}/`} className="inline-flex min-h-10 items-center text-sm text-muted hover:text-ink">
          <T zh={`下一段：${next.zh}`} fr={`Suivant : ${next.title}`} />（{next.level}）→
        </Link>
      </div>
    </main>
  );
}
