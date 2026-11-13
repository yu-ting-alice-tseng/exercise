"use client";

import { useLang } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import { Card, container, PageTitle } from "./ui";
import { Skyline } from "./Decor";
import { bankQuestionCount, EXAMS, fixedQuestionCount } from "@/lib/exams";
import { EXAM_KINDS, OFFICIAL_LINKS, type SectionKind } from "@/lib/examTypes";
import { newSeed } from "@/lib/random";

const PART: Record<SectionKind, { zh: string; fr: string }> = {
  listening: { zh: "聽力", fr: "Écoute" },
  reading: { zh: "閱讀", fr: "Lecture" },
  structure: { zh: "詞彙與結構", fr: "Lexique et structures" },
  writing: { zh: "寫作", fr: "Écrit" },
  bank: { zh: "文法", fr: "Grammaire" },
};

export default function ExamList() {
  const router = useRouter();
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <div className="relative">
      <Skyline className="pointer-events-none absolute right-0 bottom-0 hidden h-24 w-[420px] text-accent opacity-[0.12] md:block" />
      <PageTitle
        fr="Examens blancs"
        zh="模擬考"
        sub={t("依照 DELF、DALF、TCF、TEF、商務法語的題型原創的模擬卷，也有依等級出題的期末綜合卷。", "Épreuves originales sur le modèle du DELF, du DALF, du TCF, du TEF et du français des affaires, plus un examen final par niveau.")}
      />
      </div>

      <p className="mb-6 rounded-lg bg-warn-soft px-4 py-3 text-sm text-warn">
        {t("這裡的模擬題全部是原創，依照各考試的題型和難度編寫，不是官方試題。正式考試的真題與範例試題，請到下方的官方網站下載。", "Toutes ces épreuves sont originales, rédigées sur le modèle de chaque examen : ce ne sont pas des sujets officiels. Les exemples officiels sont disponibles sur les sites indiqués plus bas.")}
      </p>

      <div className="space-y-8">
        {EXAM_KINDS.map((k) => {
          const sets = EXAMS.filter((e) => e.exam === k.id);
          if (sets.length === 0) return null;
          return (
            <section key={k.id} id={k.id} className="scroll-mt-6">
              <div className="mb-3">
                {lang === "zh" && <div className="eyebrow">{k.fr}</div>}
                <h2 className="display text-xl font-bold">{lang === "fr" ? k.fr : k.zh}</h2>
                <p className="mt-1 max-w-3xl text-sm text-muted">{lang === "fr" ? k.descFr : k.desc}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sets.map((s) => {
                  const fixed = fixedQuestionCount(s);
                  const drawn = bankQuestionCount(s);
                  const parts = [...new Set(s.sections.map((x) => (lang === "fr" ? PART[x.kind].fr : PART[x.kind].zh)))];
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => router.push(`/exam/run/?id=${s.id}&seed=${newSeed()}`)}
                      className="min-w-0 text-left"
                    >
                      {/* 准考證造型：兩側缺口、虛線撕線 */}
                      <div className="billet h-full rounded-xl border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-md">
                        {/* 上半部固定高度，讓兩側缺口剛好對齊撕線 */}
                        <div className="h-[84px] overflow-hidden p-4 pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <span className="display min-w-0 truncate text-lg font-bold">{lang === "fr" ? s.fr : s.title}</span>
                            <span className="timbre display shrink-0 bg-accent px-1.5 text-xs font-bold text-accent-ink">{s.level}</span>
                          </div>
                          <p className="mt-1 truncate text-sm text-muted">{parts.join(lang === "fr" ? " · " : "・")}</p>
                        </div>
                        <div className="billet-tear mx-4" />
                        <div className="flex items-center justify-between gap-2 px-4 py-3">
                          <p className="text-xs text-muted">
                            {t(`約 ${s.minutes} 分鐘・${fixed + drawn} 題`, `Environ ${s.minutes} min · ${fixed + drawn} questions`)}
                            {s.sections.some((x) => x.writing) ? t("・含寫作", " · avec écrit") : ""}
                            {drawn ? <span className="block">{t(`其中 ${drawn} 題每次隨機`, `dont ${drawn} tirées au hasard`)}</span> : null}
                          </p>
                          <span className="display shrink-0 text-xs text-muted italic">N° {String(EXAMS.indexOf(s) + 1).padStart(2, "0")}</span>
                        </div>
                        <div className="px-4 pb-3 text-sm font-medium text-accent">{t("開始作答 →", "Commencer →")}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}

        <Card id="officiels" className="p-5">
          <div className="eyebrow">Sujets officiels</div>
          <h2 className="display text-lg font-bold">{t("官方範例試題", "Exemples officiels")}</h2>
          <p className="mt-1 text-sm text-muted">{t("考試的官方網站提供範例試題（含錄音和評分標準），建議考前一定要做過。", "Les sites officiels proposent des exemples de sujets (avec enregistrements et grilles d’évaluation). Faites-les avant l’examen.")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {OFFICIAL_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                  {lang === "fr" ? l.labelFr : l.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </main>
  );
}
