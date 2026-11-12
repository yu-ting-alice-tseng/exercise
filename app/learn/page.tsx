import Link from "next/link";
import { container } from "@/components/ui";
import { Skyline } from "@/components/Decor";
import { NOTE_ENTRIES, PATTERNS, VOCAB, wordCount } from "@/lib/learn";
import { READINGS } from "@/lib/readings";
import { GUIDES } from "@/lib/writing";
import { DIALOGUES, SCENES } from "@/lib/dialogues";
import { CATEGORIES, LEVELS, THEMES } from "@/lib/taxonomy";
import { T, ZhOnly } from "@/components/T";

export const metadata = { title: "文法與單字整理｜法文練習題" };

const JUMP = [
  { href: "#dialogues", zh: "情境對話", fr: "Dialogues" },
  { href: "#lectures", zh: "閱讀", fr: "Lectures" },
  { href: "#ecriture", zh: "寫作", fr: "Écriture" },
  { href: "#phrases", zh: "句型總整理", fr: "Fiches de synthèse" },
  { href: "#grammaire", zh: "文法筆記", fr: "Grammaire" },
  { href: "#vocabulaire", zh: "主題單字", fr: "Vocabulaire" },
];

export default function LearnPage() {
  const totalWords = VOCAB.reduce((s, v) => s + wordCount(v.id), 0);
  return (
    <main className={`${container} pt-6 sm:pt-10`}>
      <div className="relative mb-6">
        <Skyline className="pointer-events-none absolute -bottom-3 right-0 hidden h-24 w-[420px] text-accent opacity-[0.1] md:block" />
        <ZhOnly>
          <div className="eyebrow">Mes fiches de révision</div>
        </ZhOnly>
        <h1 className="display text-3xl font-bold sm:text-4xl">
          <T zh="文法與單字整理" fr="Mes fiches de révision" />
        </h1>
        <p className="mt-2 max-w-2xl text-muted">
          <T
            zh={`${READINGS.length} 篇中法對照閱讀、${PATTERNS.length} 份句型總整理、${NOTE_ENTRIES.length} 個文法點的規則筆記、${VOCAB.length} 個主題共 ${totalWords} 個單字。每個例句都可以聽發音，讀完可以直接練習。`}
            fr={`${READINGS.length} textes bilingues, ${PATTERNS.length} fiches de synthèse, ${NOTE_ENTRIES.length} fiches de grammaire et ${totalWords} mots répartis en ${VOCAB.length} thèmes. Chaque exemple peut être écouté, et chaque fiche mène à des exercices.`}
          />
        </p>
      </div>

      <nav aria-label="跳到" className="scroll-x -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {JUMP.map((j) => (
          <a
            key={j.href}
            href={j.href}
            className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium hover:border-accent/60"
          >
            <T zh={<>{j.zh} <span className="display text-xs text-muted italic">{j.fr}</span></>} fr={j.fr} />
          </a>
        ))}
      </nav>

      <section id="dialogues" className="mb-12 scroll-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <ZhOnly>
              <div className="eyebrow">Dialogues en situation</div>
            </ZhOnly>
            <h2 className="display mb-1 text-2xl font-bold">
              <T zh="情境對話" fr="Dialogues en situation" />
            </h2>
            <p className="mb-4 text-sm text-muted">
              <T
                zh={`${DIALOGUES.length} 段不同場合的對話，從點餐、問路到面試、談加薪。可以聽、看解釋，也可以選角色開口練習。`}
                fr={`${DIALOGUES.length} dialogues pour toutes les situations, du café à l’entretien d’embauche. Écoutez, lisez les explications ou jouez un rôle.`}
              />
            </p>
          </div>
          <Link href="/learn/dialogues/" className="mb-4 text-sm text-accent underline-offset-4 hover:underline">
            <T zh={`全部 ${DIALOGUES.length} 段`} fr={`Les ${DIALOGUES.length} dialogues`} /> →
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SCENES.map((sc) => {
            const n = DIALOGUES.filter((d) => d.scene === sc.id).length;
            return (
              <li key={sc.id}>
                <Link
                  href={`/learn/dialogues/#${sc.id}`}
                  className="block h-full rounded-xl border border-line bg-surface p-3 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                >
                  <div className="text-sm font-bold">
                    <T zh={sc.zh} fr={sc.fr} />
                  </div>
                  <div className="mt-1 text-xs text-muted tabular-nums">
                    <T zh={`${n} 段對話`} fr={`${n} dialogues`} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="lectures" className="mb-12 scroll-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <ZhOnly>
              <div className="eyebrow">Lectures</div>
            </ZhOnly>
            <h2 className="display mb-1 text-2xl font-bold">
              <T zh="閱讀" fr="Lectures" />
            </h2>
            <p className="mb-4 text-sm text-muted">
              <T zh="中法對照的分級文章：點字看解釋、逐句朗讀、讀完做測驗。" fr="Textes gradués avec traduction : glossaire au toucher, lecture phrase par phrase, quiz final." />
            </p>
          </div>
          <Link href="/learn/read/" className="mb-4 text-sm text-accent underline-offset-4 hover:underline">
            <T zh={`全部 ${READINGS.length} 篇`} fr={`Les ${READINGS.length} textes`} /> →
          </Link>
        </div>
        <ul className="scroll-x -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {READINGS.map((r) => (
            <li key={r.id} className="w-64 shrink-0 snap-start sm:w-auto">
              <Link
                href={`/learn/read/${r.id}/`}
                className="feuille block h-full rounded-xl py-3 pr-3 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-1 flex items-center gap-1.5 text-[11px]">
                  <span className="rounded bg-accent px-1.5 font-bold text-accent-ink">{r.level}</span>
                  <span className={`rounded px-1.5 font-bold ${r.kind === "classic" ? "bg-warn-soft text-warn" : "bg-accent-soft text-accent"}`}>
                    {r.kind === "classic" ? <T zh="經典" fr="Classique" /> : <T zh="原創" fr="Original" />}
                  </span>
                </div>
                <div lang="fr" className="display font-bold">
                  {r.title}
                </div>
                <ZhOnly>
                  <div className="text-sm text-muted">{r.zh}</div>
                </ZhOnly>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="ecriture" className="mb-12 scroll-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <ZhOnly>
              <div className="eyebrow">Guide de l’écrit</div>
            </ZhOnly>
            <h2 className="display mb-1 text-2xl font-bold">
              <T zh="寫作指南" fr="Guide de l’écrit" />
            </h2>
            <p className="mb-4 text-sm text-muted">
              <T
                zh={`${GUIDES.length} 種文類的結構、句型、範文與練習，從朋友間的訊息到論文式寫作。`}
                fr={`${GUIDES.length} types de textes, du message amical à la dissertation : plan, tournures, modèles et exercices.`}
              />
            </p>
          </div>
          <Link href="/learn/write/" className="mb-4 text-sm text-accent underline-offset-4 hover:underline">
            <T zh="全部文類與考試要求" fr="Tous les types et les épreuves" /> →
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <li>
            <Link href="/learn/write/techniques/" className="block h-full rounded-xl border-2 border-accent/30 bg-accent-soft/40 p-3 transition hover:border-accent/60">
              <div className="text-[11px] font-bold text-accent">
                <T zh="先讀" fr="À lire d’abord" />
              </div>
              <div className="text-sm font-bold">
                <T zh="寫作通用技巧" fr="Techniques d’écriture" />
              </div>
            </Link>
          </li>
          {GUIDES.map((g) => (
            <li key={g.id}>
              <Link href={`/learn/write/${g.id}/`} className="block h-full rounded-xl border border-line bg-surface p-3 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md">
                <div className="text-[11px] font-bold text-muted tabular-nums">{g.levels}</div>
                <div className="text-sm font-bold">
                  <T zh={g.zh} fr={g.fr} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="phrases" className="scroll-mt-20">
        <ZhOnly>
          <div className="eyebrow">Fiches de synthèse</div>
        </ZhOnly>
        <h2 className="display mb-1 text-2xl font-bold">
          <T zh="句型總整理" fr="Fiches de synthèse" />
        </h2>
        <p className="mb-4 text-sm text-muted">
          <T zh="跨等級整理：時態、疑問、感嘆、否定、連接詞等，一頁看完一個主題。" fr="Tous niveaux : temps, interrogation, exclamation, négation, connecteurs… un thème par page." />
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PATTERNS.map((p, i) => (
            <li key={p.id}>
              <Link
                href={`/learn/patterns/${p.id}/`}
                className="group relative block h-full overflow-hidden rounded-xl border border-line bg-surface p-4 pl-5 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
              >
                <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: i % 3 === 0 ? "#1f3a93" : i % 3 === 1 ? "var(--line)" : "#c8283c" }} aria-hidden />
                <ZhOnly>
                  <div className="display text-xs text-muted italic" lang="fr">
                    {p.fr}
                  </div>
                </ZhOnly>
                <div className="display text-lg font-bold group-hover:text-accent">
                  <T zh={p.zh} fr={p.fr} />
                </div>
                <p className="mt-1 text-sm text-muted">{p.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="grammaire" className="mt-12 scroll-mt-20">
        <ZhOnly>
          <div className="eyebrow">Grammaire</div>
        </ZhOnly>
        <h2 className="display mb-1 text-2xl font-bold">
          <T zh="文法筆記" fr="Grammaire" />
        </h2>
        <p className="mb-4 text-sm text-muted">
          <T zh="每個文法點都有規則、表格、例句和常見錯誤，最後可以直接練習。" fr="Pour chaque point : règles, tableaux, exemples, erreurs fréquentes, puis exercices." />
        </p>
        <div className="space-y-4">
          {LEVELS.map((l) => {
            const entries = NOTE_ENTRIES.filter((e) => e.level === l.id);
            return (
              <div key={l.id} className="rounded-xl border border-line bg-surface p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="timbre display grid size-11 shrink-0 place-items-center bg-accent text-sm font-bold text-accent-ink">{l.id}</span>
                  <div>
                    <div className="font-bold">
                      <T zh={<>{l.zh} <span className="display text-sm font-normal text-muted italic">{l.fr}</span></>} fr={l.fr} />
                    </div>
                    <div className="text-xs text-muted">
                      <T zh={l.desc} fr={l.descFr} />
                    </div>
                  </div>
                </div>
                <div className="grid gap-x-6 gap-y-3 md:grid-cols-3">
                  {CATEGORIES.map((c) => {
                    const list = entries.filter((e) => e.topic.cat === c.id);
                    if (!list.length) return null;
                    return (
                      <div key={c.id}>
                        <div className="mb-1 text-xs font-medium text-muted">
                          <T zh={c.zh} fr={c.fr} />
                        </div>
                        <ul>
                          {list.map((e) => (
                            <li key={e.topic.id}>
                              <Link href={`/learn/grammar/${e.topic.id}/`} className="flex min-h-9 items-center gap-1.5 text-sm hover:text-accent">
                                <span className="text-rouge" aria-hidden>
                                  ›
                                </span>
                                <T zh={e.topic.zh} fr={e.topic.fr} />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="vocabulaire" className="mt-12 scroll-mt-20">
        <ZhOnly>
          <div className="eyebrow">Vocabulaire thématique</div>
        </ZhOnly>
        <h2 className="display mb-1 text-2xl font-bold">
          <T zh="主題單字" fr="Vocabulaire thématique" />
        </h2>
        <p className="mb-4 text-sm text-muted">
          <T zh="依生活主題分類，標出建議的學習等級。可以遮住中文或法文自我測驗。" fr="Classé par thème avec un niveau conseillé. Masquez le chinois ou le français pour vous tester." />
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {THEMES.map((t) => (
            <li key={t.id}>
              <Link
                href={`/learn/vocab/${t.id}/`}
                className="block h-full rounded-xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
              >
                <ZhOnly>
                  <div className="display text-xs text-muted italic" lang="fr">
                    {t.fr}
                  </div>
                </ZhOnly>
                <div className="font-bold">
                  <T zh={t.zh} fr={t.fr} />
                </div>
                <div className="mt-2 text-xs text-muted tabular-nums">
                  <T zh={`${wordCount(t.id)} 個單字`} fr={`${wordCount(t.id)} mots`} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
