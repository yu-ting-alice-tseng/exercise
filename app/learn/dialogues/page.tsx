import Link from "next/link";
import { T, ZhOnly } from "@/components/T";
import { container } from "@/components/ui";
import { DIALOGUES, REGISTER, SCENES } from "@/lib/dialogues";

export const metadata = { title: "情境對話｜法文練習題" };

export default function DialoguesPage() {
  return (
    <main className={`${container} pt-6 sm:pt-8`}>
      <Link href="/learn/" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← <T zh="學習" fr="Apprendre" />
      </Link>
      <div className="mb-5">
        <ZhOnly>
          <div className="eyebrow">Dialogues en situation</div>
        </ZhOnly>
        <h1 className="display text-3xl font-bold">
          <T zh="情境對話" fr="Dialogues en situation" />
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          <T
            zh={`${DIALOGUES.length} 段生活中會遇到的對話：點餐、購物、問路、看醫生、租房子、面試、和朋友聊天……每段都可以聽、點字看解釋，也可以選一個角色自己開口練習，最後附實用說法和理解測驗。`}
            fr={`${DIALOGUES.length} dialogues de la vie courante : commander, faire des achats, demander son chemin, aller chez le médecin, louer un appartement, passer un entretien, discuter entre amis… Écoutez, touchez les mots pour leur sens, jouez un rôle, puis faites le quiz.`}
          />
        </p>
      </div>

      <nav aria-label="場合" className="scroll-x -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {SCENES.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-9 shrink-0 items-center rounded-full border border-line bg-surface px-3 text-sm hover:border-accent/60">
            <T zh={s.zh} fr={s.fr} />
          </a>
        ))}
      </nav>

      <div className="space-y-8">
        {SCENES.map((s) => {
          const list = DIALOGUES.filter((d) => d.scene === s.id);
          if (!list.length) return null;
          return (
            <section key={s.id} id={s.id} className="scroll-mt-6">
              <ZhOnly>
                <div className="eyebrow">{s.fr}</div>
              </ZhOnly>
              <h2 className="display mb-3 text-xl font-bold">
                <T zh={s.zh} fr={s.fr} />
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((d) => (
                  <li key={d.id}>
                    <Link
                      href={`/learn/dialogues/${d.id}/`}
                      className="block h-full rounded-xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                    >
                      <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="rounded bg-accent px-1.5 font-bold text-accent-ink">{d.level}</span>
                        <span className="rounded bg-sunken px-1.5 text-muted">
                          <T zh={REGISTER[d.register].zh} fr={REGISTER[d.register].fr} />
                        </span>
                        <span className="text-muted tabular-nums">
                          <T zh={`${d.lines.length} 句`} fr={`${d.lines.length} répliques`} />
                        </span>
                      </div>
                      <div lang="fr" className="display text-lg font-bold">
                        {d.title}
                      </div>
                      <div className="text-sm font-medium">{d.zh}</div>
                      <p className="mt-1 line-clamp-2 text-sm text-muted">{d.intro}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
