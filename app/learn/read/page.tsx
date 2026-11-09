import Link from "next/link";
import { container } from "@/components/ui";
import { READINGS, wordCount } from "@/lib/readings";
import { LEVELS, THEMES } from "@/lib/taxonomy";

export const metadata = { title: "閱讀｜法文練習題" };

export default function ReadListPage() {
  return (
    <main className={`${container} pt-6 sm:pt-8`}>
      <Link href="/learn/" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← 學習
      </Link>
      <div className="mb-6">
        <div className="eyebrow">Lectures</div>
        <h1 className="display text-3xl font-bold">閱讀</h1>
        <p className="mt-2 max-w-2xl text-muted">
          中法對照的分級文章：點底線的字看解釋、逐句朗讀、讀完做閱讀測驗。原創文章裡的事實都附上查證來源；經典作品已進入公有領域，原文依維基文庫版本逐字照錄。
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
                {l.zh}
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
                          {r.kind === "classic" ? "經典" : "原創"}
                        </span>
                        <span className="rounded bg-sunken px-1.5 text-muted">{THEMES.find((t) => t.id === r.theme)?.zh}</span>
                        <span className="text-muted tabular-nums">約 {wordCount(r)} 字</span>
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
