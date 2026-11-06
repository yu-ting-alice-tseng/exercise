"use client";

import { useRouter } from "next/navigation";
import { Card, container, PageTitle } from "./ui";
import { Skyline } from "./Decor";
import { bankQuestionCount, EXAMS, fixedQuestionCount } from "@/lib/exams";
import { EXAM_KINDS, OFFICIAL_LINKS, type SectionKind } from "@/lib/examTypes";
import { newSeed } from "@/lib/random";

const PART: Record<SectionKind, string> = { listening: "聽力", reading: "閱讀", structure: "詞彙與結構", writing: "寫作", bank: "文法" };

export default function ExamList() {
  const router = useRouter();

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <div className="relative">
      <Skyline className="pointer-events-none absolute right-0 bottom-0 hidden h-24 w-[420px] text-accent opacity-[0.12] md:block" />
      <PageTitle
        fr="Examens blancs"
        zh="模擬考"
        sub="依照 DELF、DALF、TCF、TEF、商務法語的題型原創的模擬卷，也有依等級出題的期末綜合卷。"
      />
      </div>

      <p className="mb-6 rounded-lg bg-warn-soft px-4 py-3 text-sm text-warn">
        這裡的模擬題全部是原創，依照各考試的題型和難度編寫，不是官方試題。正式考試的真題與範例試題，請到下方的官方網站下載。
      </p>

      <div className="space-y-8">
        {EXAM_KINDS.map((k) => {
          const sets = EXAMS.filter((e) => e.exam === k.id);
          if (sets.length === 0) return null;
          return (
            <section key={k.id}>
              <div className="mb-3">
                <div className="eyebrow">{k.fr}</div>
                <h2 className="display text-xl font-bold">{k.zh}</h2>
                <p className="mt-1 max-w-3xl text-sm text-muted">{k.desc}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sets.map((s) => {
                  const fixed = fixedQuestionCount(s);
                  const drawn = bankQuestionCount(s);
                  const parts = [...new Set(s.sections.map((x) => PART[x.kind]))];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => router.push(`/exam/run/?id=${s.id}&seed=${newSeed()}`)}
                      className="text-left"
                    >
                      {/* 准考證造型：兩側缺口、虛線撕線 */}
                      <div className="billet h-full rounded-xl border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-md">
                        {/* 上半部固定高度，讓兩側缺口剛好對齊撕線 */}
                        <div className="h-[84px] overflow-hidden p-4 pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <span className="display truncate text-lg font-bold">{s.title}</span>
                            <span className="timbre display shrink-0 bg-accent px-1.5 text-xs font-bold text-accent-ink">{s.level}</span>
                          </div>
                          <p className="mt-1 truncate text-sm text-muted">{parts.join("・")}</p>
                        </div>
                        <div className="billet-tear mx-4" />
                        <div className="flex items-center justify-between gap-2 px-4 py-3">
                          <p className="text-xs text-muted">
                            約 {s.minutes} 分鐘・{fixed + drawn} 題
                            {s.sections.some((x) => x.writing) ? "・含寫作" : ""}
                            {drawn ? <span className="block">其中 {drawn} 題每次隨機</span> : null}
                          </p>
                          <span className="display shrink-0 text-xs text-muted italic">N° {String(EXAMS.indexOf(s) + 1).padStart(2, "0")}</span>
                        </div>
                        <div className="px-4 pb-3 text-sm font-medium text-accent">開始作答 →</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}

        <Card className="p-5">
          <div className="eyebrow">Sujets officiels</div>
          <h2 className="display text-lg font-bold">官方範例試題</h2>
          <p className="mt-1 text-sm text-muted">考試的官方網站提供範例試題（含錄音和評分標準），建議考前一定要做過。</p>
          <ul className="mt-3 space-y-2 text-sm">
            {OFFICIAL_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </main>
  );
}
