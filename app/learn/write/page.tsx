import Link from "next/link";
import { container } from "@/components/ui";
import { EXAM_WRITING, GROUPS, GUIDES } from "@/lib/writing";

export const metadata = { title: "寫作指南｜法文練習題" };

export default function WriteHubPage() {
  return (
    <main className={`${container} pt-6 sm:pt-8`}>
      <Link href="/learn/" className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
        ← 學習
      </Link>
      <div className="mb-6">
        <div className="eyebrow">Guide de l’écrit</div>
        <h1 className="display text-3xl font-bold">法文寫作指南</h1>
        <p className="mt-2 max-w-2xl text-muted">
          {GUIDES.length} 種常見文類：每一種都有使用場合、段落結構、實用句型、附結構標籤的範文、常見錯誤，以及可以直接動手寫的練習題。
        </p>
      </div>

      <Link
        href="/learn/write/techniques/"
        className="mb-8 flex items-center gap-4 rounded-xl border-2 border-accent/30 bg-accent-soft/40 p-4 transition hover:border-accent/60"
      >
        <span className="timbre display grid size-12 shrink-0 place-items-center bg-accent text-lg font-bold text-accent-ink" aria-hidden>
          ✎
        </span>
        <div>
          <div className="font-bold">先讀：寫作通用技巧</div>
          <p className="text-sm text-muted">動筆前要想的三件事、法文標點的空格、避免重複、語域一致、自我檢查清單。</p>
        </div>
      </Link>

      <div className="space-y-8">
        {GROUPS.map((gr) => {
          const list = GUIDES.filter((g) => g.group === gr.id);
          return (
            <section key={gr.id}>
              <div className="eyebrow">{gr.fr}</div>
              <h2 className="display mb-3 text-xl font-bold">{gr.zh}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {list.map((g) => (
                  <li key={g.id}>
                    <Link
                      href={`/learn/write/${g.id}/`}
                      className="block h-full rounded-xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                    >
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded bg-accent px-1.5 text-[11px] font-bold text-accent-ink tabular-nums">{g.levels}</span>
                        <span lang="fr" className="display text-xs text-muted italic">
                          {g.fr}
                        </span>
                      </div>
                      <div className="font-bold">{g.zh}</div>
                      <p className="mt-1 text-sm text-muted">{g.blurb}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="mt-10 rounded-xl border border-line bg-surface p-4 sm:p-5">
        <h2 className="mb-1 font-bold">DELF／DALF 寫作要求一覽</h2>
        <p className="mb-3 text-xs text-muted">依 France Éducation international 官網整理（2026 年 11 月查閱），報考前請以官方最新公告為準。</p>
        <div className="scroll-x overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b-2 border-accent/40 px-2.5 py-2 text-left">等級</th>
                <th className="border-b-2 border-accent/40 px-2.5 py-2 text-left">寫作題要求</th>
                <th className="border-b-2 border-accent/40 px-2.5 py-2 text-left">來源</th>
              </tr>
            </thead>
            <tbody>
              {EXAM_WRITING.map((e) => (
                <tr key={e.level} className="odd:bg-sunken/50">
                  <td className="border-b border-line px-2.5 py-2 font-bold">{e.level}</td>
                  <td className="border-b border-line px-2.5 py-2">{e.task}</td>
                  <td className="border-b border-line px-2.5 py-2">
                    <a href={e.url} target="_blank" rel="noreferrer" className="text-accent underline-offset-2 hover:underline">
                      官網
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
