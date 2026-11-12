"use client";

import { useLang } from "@/lib/i18n";
import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Invalid } from "./PracticeClient";
import Stem from "./Stem";
import { configToQuery, queryToConfig } from "@/lib/config";
import { drawPaper, OPTION_LETTERS, type Version } from "@/lib/draw";
import { DIFFICULTY_FR, DIFFICULTY_LABELS, TYPE_LABELS, TYPE_ORDER } from "@/lib/taxonomy";
import { paperTitle } from "@/lib/title";
import type { DrawnQuestion, QuestionType } from "@/lib/types";

/** 選項都很短時排四欄，否則兩欄 */
function optionCols(opts: string[]) {
  return Math.max(...opts.map((o) => o.length)) <= 12 ? "sm:grid-cols-4" : "";
}

const SECTION_NUMS = ["一", "二", "三", "四"];

export default function PrintClient() {
  const params = useSearchParams();
  const config = useMemo(() => queryToConfig(new URLSearchParams(params.toString())), [params]);
  const version: Version = params.get("v") === "B" ? "B" : "A";
  const isAnswer = params.get("kind") === "a";
  const questions = useMemo(() => (config ? drawPaper(config)[version] : []), [config, version]);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);

  if (!config) return <Invalid />;
  if (questions.length === 0) return <Invalid message={t("沒有符合條件的題目。", "Aucune question ne correspond.")} />;

  // 依題型分區，題號連續
  const sections: { type: QuestionType; items: { q: DrawnQuestion; n: number }[] }[] = [];
  let n = 0;
  for (const type of TYPE_ORDER) {
    const items = questions.filter((q) => q.type === type).map((q) => ({ q, n: ++n }));
    if (items.length) sections.push({ type, items });
  }

  const title = lang === "fr" ? `${paperTitle(config, "fr")} · Copie ${version}${isAnswer ? " · Corrigé" : ""}` : `${paperTitle(config)}　${version} 卷${isAnswer ? "　解答" : ""}`;

  return (
    <>
      <div className="no-print sticky top-0 z-10 border-b border-line bg-surface">
        <div className="mx-auto flex max-w-[210mm] items-center justify-between gap-2 px-4 py-2">
          <Link href={`/paper/?${configToQuery(config)}`} className="text-sm text-muted hover:underline">
            ← {t("返回", "Retour")}
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-lg bg-accent px-5 font-medium text-accent-ink hover:brightness-110"
          >
            {t("列印／存成 PDF", "Imprimer / PDF")}
          </button>
        </div>
        <p className="mx-auto max-w-[210mm] px-4 pb-2 text-xs text-muted">
          {t("手機：按下按鈕後選「列印」，再用兩指放大預覽，或選擇「儲存為 PDF」。", "Sur mobile : appuyez sur le bouton puis choisissez « Imprimer » ou « Enregistrer en PDF ».")}
        </p>
      </div>

      <main className="mx-auto max-w-[210mm] bg-white px-6 py-8 text-black print:max-w-none print:p-0">
        <header className="mb-5 border-b-2 border-black pb-3">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="display text-xl font-bold">{title}</h1>
            <span className="text-sm">{t("難度：", "Difficulté : ")}{lang === "fr" ? DIFFICULTY_FR[String(config.difficulty)] : DIFFICULTY_LABELS[String(config.difficulty)]}</span>
          </div>
          {!isAnswer && (
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
              {(lang === "fr" ? ["Nom", "Classe", "Date", "Note"] : ["姓名", "班級", "日期", "分數"]).map((f) => (
                <div key={f} className="flex items-end gap-1">
                  <span className="shrink-0">{f}{lang === "fr" ? " :" : "："}</span>
                  <span className="flex-1 border-b border-black">&nbsp;</span>
                </div>
              ))}
            </div>
          )}
        </header>

        {sections.map((s, si) => (
          <section key={s.type} className="mb-6">
            <h2 className="display mb-3 font-bold">
              {lang === "fr" ? `${["I", "II", "III", "IV"][si]}. ${TYPE_LABELS[s.type].fr}` : `${SECTION_NUMS[si]}、${TYPE_LABELS[s.type].zh}（${TYPE_LABELS[s.type].fr}）`}
            </h2>
            <ol className="space-y-4">
              {s.items.map(({ q, n }) =>
                isAnswer ? <AnswerItem key={q.id} q={q} n={n} /> : <QuestionItem key={q.id} q={q} n={n} />,
              )}
            </ol>
          </section>
        ))}
      </main>
    </>
  );
}

function QuestionItem({ q, n }: { q: DrawnQuestion; n: number }) {
  return (
    <li className="avoid-break">
      <div className="flex gap-2">
        <span className="shrink-0 font-semibold">{n}.</span>
        <div className="flex-1">
          {q.type === "choice" && <span className="mr-1">（　）</span>}
          {q.stem ? <Stem text={q.stem} /> : null}
          <div className="text-sm text-neutral-600">{q.instruction}</div>
          {q.type === "choice" && (
            <div lang="fr" className={`mt-1 grid grid-cols-2 gap-x-6 ${optionCols(q.displayOptions)}`}>
              {q.displayOptions.map((o, j) => (
                <span key={j}>
                  ({OPTION_LETTERS[j]}) {o}
                </span>
              ))}
            </div>
          )}
          {q.type === "short" && (
            <div className="mt-2 space-y-6">
              <div className="border-b border-neutral-500">&nbsp;</div>
              <div className="border-b border-neutral-500">&nbsp;</div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function AnswerItem({ q, n }: { q: DrawnQuestion; n: number }) {
  const answer =
    q.type === "choice"
      ? `(${OPTION_LETTERS[q.displayAnswer]}) ${q.displayOptions[q.displayAnswer]}`
      : q.answers.join("／");
  return (
    <li className="avoid-break">
      <div className="flex gap-2">
        <span className="shrink-0 font-semibold">{n}.</span>
        <div className="flex-1">
          {q.stem && (
            <div className="text-sm text-neutral-600">
              <Stem text={q.stem} />
            </div>
          )}
          {!q.stem && <div className="text-sm text-neutral-600">{q.instruction}</div>}
          <div lang="fr" className="font-semibold">
            {answer}
          </div>
          <div className="text-sm text-neutral-700">{q.explanation}</div>
        </div>
      </div>
    </li>
  );
}
