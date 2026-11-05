"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Invalid } from "./PracticeClient";
import Stem from "./Stem";
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

  useEffect(() => {
    if (config) saveHistory({ config, kind: "paper", title: paperTitle(config) });
  }, [config]);

  if (!config || !result) return <Invalid />;
  if (result.A.length === 0) return <Invalid message="沒有符合條件的題目，請回到設定頁調整。" />;

  const query = configToQuery(config);
  const questions = result[version];

  async function copyPracticeLink() {
    const url = `${window.location.origin}${BASE_PATH}/practice/?${query}&v=${version}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("請複製這個連結：", url);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pt-5 pb-8">
      <Link href="/" className="text-sm text-muted hover:underline">
        ← 回到設定
      </Link>
      <h1 className="mt-1 text-xl font-bold">{paperTitle(config)}</h1>
      <p className="mb-4 text-sm text-muted">每份 {questions.length} 題・A、B 卷考相同範圍，題目不同</p>

      {result.overlap && (
        <div className="mb-4 rounded-xl bg-warn-soft px-4 py-3 text-sm text-warn">
          題庫題目不夠，B 卷有部分題目和 A 卷相同。
        </div>
      )}

      <div className="mb-4 grid grid-cols-2 rounded-xl bg-surface p-1 ring-1 ring-line">
        {(["A", "B"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVersion(v)}
            aria-pressed={version === v}
            className={`min-h-11 rounded-lg font-medium transition ${
              version === v ? "bg-accent text-accent-ink" : "text-muted"
            }`}
          >
            {v} 卷
          </button>
        ))}
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2">
        <Link
          href={`/print/?${query}&v=${version}&kind=q`}
          className="grid min-h-12 place-items-center rounded-xl bg-accent font-medium text-accent-ink hover:opacity-90"
        >
          列印 {version} 卷題目
        </Link>
        <Link
          href={`/print/?${query}&v=${version}&kind=a`}
          className="grid min-h-12 place-items-center rounded-xl border border-accent bg-surface font-medium text-accent hover:bg-accent-soft"
        >
          列印 {version} 卷答案
        </Link>
        <button
          type="button"
          onClick={copyPracticeLink}
          className="min-h-12 rounded-xl border border-line bg-surface text-sm font-medium hover:border-accent/50"
        >
          {copied ? "已複製連結" : `複製 ${version} 卷線上作答連結`}
        </button>
        <button
          type="button"
          onClick={() => router.replace(`/paper/?${configToQuery({ ...config, seed: newSeed() })}`)}
          className="min-h-12 rounded-xl border border-line bg-surface text-sm font-medium hover:border-accent/50"
        >
          重新抽題
        </button>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-bold">{version} 卷預覽</h2>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showAnswers}
            onChange={(e) => setShowAnswers(e.target.checked)}
            className="size-4 accent-[var(--accent)]"
          />
          顯示答案
        </label>
      </div>

      <ol className="space-y-2">
        {questions.map((q, i) => (
          <li key={q.id} className="rounded-xl border border-line bg-surface p-3">
            <div className="mb-1 text-xs text-muted">
              {i + 1}．{TYPE_LABELS[q.type].zh}・{q.instruction}
            </div>
            {q.stem && <Stem text={q.stem} />}
            {q.type === "choice" && (
              <div
                lang="fr"
                className={`mt-1 grid grid-cols-2 gap-x-4 text-sm ${
                  Math.max(...q.displayOptions.map((o) => o.length)) <= 12 ? "sm:grid-cols-4" : ""
                }`}
              >
                {q.displayOptions.map((o, j) => (
                  <span
                    key={j}
                    className={showAnswers && j === q.displayAnswer ? "font-semibold text-ok" : ""}
                  >
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
    </main>
  );
}
