"use client";

import { useLang } from "@/lib/i18n";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Invalid } from "./PracticeClient";
import Stem from "./Stem";
import { btnPrimary, btnQuiet, btnSecondary, Card, container, PageTitle, twoCol } from "./ui";
import { BASE_PATH, configToQuery, queryToConfig } from "@/lib/config";
import { drawPaper, OPTION_LETTERS, type Version } from "@/lib/draw";
import { saveHistory } from "@/lib/history";
import { newSeed } from "@/lib/random";
import { TYPE_LABELS } from "@/lib/taxonomy";
import { paperTitle } from "@/lib/title";

export default function PaperClient() {
  const params = useSearchParams();
  const router = useRouter();
  const config = useMemo(() => queryToConfig(new URLSearchParams(params.toString())), [params]);
  const result = useMemo(() => (config ? drawPaper(config) : null), [config]);
  const [version, setVersion] = useState<Version>("A");
  const [showAnswers, setShowAnswers] = useState(false);
  const [copied, setCopied] = useState(false);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);

  useEffect(() => {
    if (config) saveHistory({ config, kind: "paper", title: paperTitle(config) });
  }, [config]);

  if (!config || !result) return <Invalid />;
  if (result.A.length === 0) return <Invalid message={t("沒有符合條件的題目，請回到設定頁調整。", "Aucune question ne correspond. Modifiez les réglages.")} />;

  const query = configToQuery(config);
  const questions = result[version];

  async function copyPracticeLink() {
    const url = `${window.location.origin}${BASE_PATH}/practice/?${query}&v=${version}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(t("請複製這個連結：", "Copiez ce lien :"), url);
    }
  }

  const tabs = (
    <div className="grid grid-cols-2 rounded-lg bg-sunken p-1">
      {(["A", "B"] as const).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => setVersion(v)}
          aria-pressed={version === v}
          className={`display min-h-11 rounded-md text-lg font-bold transition ${
            version === v ? "bg-accent text-accent-ink shadow-sm" : "text-muted"
          }`}
        >
          {t(`${v} 卷`, `Copie ${v}`)}
        </button>
      ))}
    </div>
  );

  const actions = (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
      <Link href={`/print/?${query}&v=${version}&kind=q`} className={btnPrimary}>
        {t(`列印 ${version} 卷題目`, `Imprimer la copie ${version}`)}
      </Link>
      <Link href={`/print/?${query}&v=${version}&kind=a`} className={btnSecondary}>
        {t(`列印 ${version} 卷答案`, `Imprimer le corrigé ${version}`)}
      </Link>
      <button type="button" onClick={copyPracticeLink} className={btnQuiet}>
        {copied ? t("已複製連結 ✓", "Lien copié ✓") : t(`複製 ${version} 卷線上作答連結`, `Copier le lien en ligne (${version})`)}
      </button>
      <button
        type="button"
        onClick={() => router.replace(`/paper/?${configToQuery({ ...config, seed: newSeed() })}`)}
        className={btnQuiet}
      >
        {t("重新抽題", "Nouveau tirage")}
      </button>
    </div>
  );

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle
        back={{ href: "/", label: t("回到設定", "Retour aux réglages") }}
        fr="Contrôle · Version A et B"
        zh={paperTitle(config)}
        frTitle={paperTitle(config, "fr")}
        sub={t(`每份 ${questions.length} 題・A、B 卷考相同範圍，題目不同`, `${questions.length} questions par copie · même contenu, questions différentes`)}
      />

      {result.overlap && (
        <p className="mb-4 rounded-lg bg-warn-soft px-4 py-3 text-sm text-warn">{t("題庫題目不夠，B 卷有部分題目和 A 卷相同。", "Pas assez de questions : la copie B reprend quelques questions de la copie A.")}</p>
      )}

      <div className={twoCol}>
        <div>
          {/* 手機：版本切換與按鈕放在上方 */}
          <div className="mb-5 space-y-3 lg:hidden">
            {tabs}
            {actions}
            <p className="text-xs text-muted">{t("把線上作答連結傳給學生，學生打開就是同一份卷子，可以直接作答並看到批改結果。", "Envoyez le lien aux élèves : ils ouvrent la même copie, répondent en ligne et voient la correction.")}</p>
          </div>

          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-line bg-sunken/60 px-4 py-3 sm:px-5">
              <div>
                <div className="eyebrow">Aperçu</div>
                <h2 className="display text-lg font-bold">{t(`${version} 卷預覽`, `Aperçu de la copie ${version}`)}</h2>
              </div>
              <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showAnswers}
                  onChange={(e) => setShowAnswers(e.target.checked)}
                  className="size-4 accent-[var(--accent)]"
                />
                {t("顯示答案", "Afficher les réponses")}
              </label>
            </div>
            <ol className="divide-y divide-line">
              {questions.map((q, i) => (
                <li key={q.id} className="px-4 py-3 sm:px-5">
                  <div className="mb-1 flex items-baseline gap-2 text-xs text-muted">
                    <span className="display text-base font-bold text-accent">{i + 1}</span>
                    {lang === "fr" ? TYPE_LABELS[q.type].fr : TYPE_LABELS[q.type].zh}・{q.instruction}
                  </div>
                  {q.stem && <Stem text={q.stem} />}
                  {q.type === "choice" && (
                    <div
                      lang="fr"
                      className={`mt-1 grid grid-cols-2 gap-x-4 gap-y-0.5 text-sm ${
                        Math.max(...q.displayOptions.map((o) => o.length)) <= 12 ? "sm:grid-cols-4" : ""
                      }`}
                    >
                      {q.displayOptions.map((o, j) => (
                        <span key={j} className={showAnswers && j === q.displayAnswer ? "font-semibold text-ok" : ""}>
                          ({OPTION_LETTERS[j]}) {o}
                        </span>
                      ))}
                    </div>
                  )}
                  {showAnswers && q.type !== "choice" && (
                    <div lang="fr" className="mt-1 text-sm font-semibold text-ok">
                      {q.answers.join("／")}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </Card>
        </div>

        <aside className="hidden lg:sticky lg:top-6 lg:block">
          <Card className="space-y-4 p-5">
            <div>
              <div className="eyebrow">Version</div>
              <div className="display mb-2 text-lg font-bold">{t("選擇版本", "Choisir la copie")}</div>
              {tabs}
            </div>
            {actions}
            <p className="text-xs leading-relaxed text-muted">
              {t("把線上作答連結傳給學生，學生打開就是同一份卷子，可以直接作答並看到批改結果。", "Envoyez le lien aux élèves : ils ouvrent la même copie, répondent en ligne et voient la correction.")}
            </p>
          </Card>
        </aside>
      </div>
    </main>
  );
}
