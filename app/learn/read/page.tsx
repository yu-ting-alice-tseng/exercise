import Link from "next/link";
import { container } from "@/components/ui";
import { READINGS, wordCount } from "@/lib/readings";
import { LEVELS, THEMES } from "@/lib/taxonomy";
import { T, ZhOnly } from "@/components/T";

export const metadata = { title: "閱讀｜法文練習題" };

export default function ReadListPage() {
  return (
    <main className={`${container} pt-6 sm:pt-8`}>
      <Link href="/learn/" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← <T zh="學習" fr="Apprendre" />
      </Link>
      <div className="mb-6">
        <ZhOnly>
          <div className="eyebrow">Lectures</div>
        </ZhOnly>
        <h1 className="display text-3xl font-bold">
          <T zh="閱讀" fr="Lectures" />
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          <T
            zh="中法對照的分級文章：點底線的字看解釋、逐句朗讀、讀完做閱讀測驗。原創文章裡的事實都附上查證來源；經典作品已進入公有領域，原文依維基文庫版本逐字照錄。"
            fr="Des textes gradués avec traduction chinoise : touchez les mots soulignés, écoutez phrase par phrase, puis faites le quiz. Les faits des articles originaux sont sourcés ; les classiques, du domaine public, reprennent mot pour mot l’édition de Wikisource."
          />
        </p>
      </div>
      <div className="space-y-6">
        {LEVELS.map((l) => {
          const list = READINGS.filter((r) => r.level === l.id);
          if (!list.length) return null;
          return (
            <section key={l.id}>
              <h2 className="mb-2 flex items-center gap-2 font-bold">
                <span className="timbre display grid size-9 place-items-center bg-accent text-xs font-bold text-accent-ink">{l.id}</span>
                <T zh={l.zh} fr={l.fr} />
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {list.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={`/learn/read/${r.id}/`}
                      className="block h-full rounded-xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                    >
                      <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className={`rounded px-1.5 font-bold ${r.kind === "classic" ? "bg-warn-soft text-warn" : "bg-accent-soft text-accent"}`}>
                          {r.kind === "classic" ? <T zh="經典" fr="Classique" /> : <T zh="原創" fr="Original" />}
                        </span>
                        <span className="rounded bg-sunken px-1.5 text-muted"><T zh={THEMES.find((t) => t.id === r.theme)?.zh} fr={THEMES.find((t) => t.id === r.theme)?.fr} /></span>
                        <span className="text-muted tabular-nums"><T zh={`約 ${wordCount(r)} 字`} fr={`env. ${wordCount(r)} mots`} /></span>
                      </div>
                      <div lang="fr" className="display text-lg font-bold">
                        {r.title}
                      </div>
                      <div className="text-sm font-medium">{r.zh}</div>
                      <p className="mt-1 text-sm text-muted">{r.intro}</p>
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
