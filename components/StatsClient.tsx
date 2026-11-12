"use client";

import { useLang } from "@/lib/i18n";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { btnPrimary, btnQuiet, Card, container, PageTitle } from "./ui";
import { BANK } from "@/lib/bank";
import { configToQuery } from "@/lib/config";
import {
  byDay,
  clearProgress,
  DAY,
  dayKey,
  dueIds,
  exportProgress,
  importProgress,
  isBankId,
  isInReview,
  MASTERED,
  startOfDay,
  streak,
  type DayStat,
} from "@/lib/progress";
import { newSeed } from "@/lib/random";
import { LEVELS, topicName } from "@/lib/taxonomy";
import type { Level } from "@/lib/types";
import { useProgress } from "@/lib/useProgress";
import { useNow } from "@/lib/useNow";
import { useAuth } from "@/lib/auth";
import { deleteCloudProgress } from "@/lib/sync";

const LEVEL_OF = new Map(BANK.map((q) => [q.id, q.level]));
const WEEKS = 12;
const WEEKDAYS = { zh: ["一", "二", "三", "四", "五", "六", "日"], fr: ["L", "M", "M", "J", "V", "S", "D"] };

/** 依介面語言格式化數字、日期與文字 */
function useFmt() {
  const lang = useLang();
  return {
    lang,
    tr: (zh: string, fr: string) => (lang === "fr" ? fr : zh),
    minutes: (sec: number) => (sec === 0 ? "0" : sec < 60 ? (lang === "fr" ? "< 1" : "不到 1") : String(Math.round(sec / 60))),
    md: (t: number) =>
      new Date(t).toLocaleDateString(lang === "fr" ? "fr-FR" : "zh-TW", lang === "fr" ? { day: "numeric", month: "short" } : { month: "numeric", day: "numeric" }),
  };
}

export default function StatsClient() {
  const { progress, ready } = useProgress();
  const router = useRouter();
  const { lang, tr, minutes, md } = useFmt();

  const days = useMemo(() => byDay(progress), [progress]);
  const now = useNow();
  const today = startOfDay(now);

  const summary = useMemo(() => {
    let weekSec = 0;
    for (let i = 0; i < 7; i++) weekSec += days.get(dayKey(today - i * DAY))?.sec ?? 0;
    let answered = 0;
    let correct = 0;
    for (const d of days.values()) {
      answered += d.answered;
      correct += d.correct;
    }
    const qs = Object.values(progress.q);
    return {
      streak: streak(days, now),
      weekSec,
      todaySec: days.get(dayKey(today))?.sec ?? 0,
      answered,
      accuracy: answered ? Math.round((correct / answered) * 100) : null,
      practicedDays: days.size,
      mastered: qs.filter((q) => q.box === MASTERED).length,
      reviewing: qs.filter(isInReview).length,
      due: dueIds(progress, now).filter(isBankId).length,
    };
  }, [days, progress, today, now]);

  // 各文法點的正確率（以每一題的作答統計加總），作答至少 3 次才列入
  const weakest = useMemo(() => {
    const map = new Map<string, { level: Level; grammar: string; n: number; ok: number }>();
    const grammarOf = new Map(BANK.map((q) => [q.id, q.grammar]));
    for (const [id, st] of Object.entries(progress.q)) {
      const level = LEVEL_OF.get(id);
      const grammar = grammarOf.get(id);
      if (!level || !grammar) continue;
      const k = `${level}:${grammar}`;
      const g = map.get(k) ?? { level, grammar, n: 0, ok: 0 };
      g.n += st.n;
      g.ok += st.ok;
      map.set(k, g);
    }
    return [...map.values()]
      .filter((g) => g.n >= 3)
      .map((g) => ({ ...g, pct: Math.round((g.ok / g.n) * 100) }))
      .sort((a, b) => a.pct - b.pct || b.n - a.n)
      .slice(0, 8);
  }, [progress]);

  const byLevel = useMemo(() => {
    const map = new Map<Level, { n: number; ok: number }>();
    for (const [id, st] of Object.entries(progress.q)) {
      const level = LEVEL_OF.get(id);
      if (!level) continue;
      const g = map.get(level) ?? { n: 0, ok: 0 };
      g.n += st.n;
      g.ok += st.ok;
      map.set(level, g);
    }
    return LEVELS.filter((l) => map.has(l.id)).map((l) => {
      const g = map.get(l.id)!;
      return { level: l.id, n: g.n, pct: Math.round((g.ok / g.n) * 100) };
    });
  }, [progress]);

  const recent = useMemo(() => [...progress.s].reverse().slice(0, 10), [progress]);

  function practice(level: Level, grammar: string) {
    router.push(
      `/practice/?${configToQuery({
        level,
        by: "grammar",
        topics: [grammar],
        counts: { choice: 4, fill: 4, short: 2 },
        difficulty: "all",
        seed: newSeed(),
      })}`,
    );
  }

  if (!ready) return <main className={`${container} py-10 text-muted`}>{tr("載入中…", "Chargement…")}</main>;

  const empty = progress.s.length === 0;

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle fr="Mon carnet de progrès" zh="學習紀錄" sub={tr("每次線上練習按下「檢查答案」，都會自動記錄在這台裝置的瀏覽器裡。", "Chaque correction d’exercice en ligne est enregistrée automatiquement dans ce navigateur.")} />

      {empty ? (
        <Card className="mb-5 p-8 text-center">
          <div className="mb-2 text-5xl" aria-hidden>📒</div>
          <p className="display mb-2 text-2xl text-rouge italic">C&apos;est parti !</p>
          <p className="mb-5 text-muted">{tr("還沒有學習紀錄。完成第一次線上練習後，這裡就會出現你的學習日曆和統計。", "Aucune activité pour l’instant. Après votre premier exercice en ligne, votre calendrier et vos statistiques apparaîtront ici.")}</p>
          <Link href="/" className={btnPrimary}>
            {tr("開始練習", "Commencer")}
          </Link>
        </Card>
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Tile fr="Série" label={tr("連續學習", "Série")} value={String(summary.streak)} unit={tr("天", "j")} note={summary.todaySec ? tr("今天已練習", "Fait aujourd’hui") : tr("今天還沒練習", "Pas encore aujourd’hui")} />
            <Tile fr="Cette semaine" label={tr("最近 7 天", "7 derniers jours")} value={minutes(summary.weekSec)} unit="min" note={tr(`今天 ${minutes(summary.todaySec)} 分鐘`, `Aujourd’hui : ${minutes(summary.todaySec)} min`)} />
            <Tile fr="Questions" label={tr("累計作答", "Questions")} value={String(summary.answered)} unit={tr("題", "")} note={tr(`共 ${summary.practicedDays} 天`, `Sur ${summary.practicedDays} jour(s)`)} />
            <Tile
              fr="Réussite"
              label={tr("正確率", "Réussite")}
              value={summary.accuracy === null ? "–" : String(summary.accuracy)}
              unit="%"
              note={tr(`已掌握 ${summary.mastered} 題`, `${summary.mastered} maîtrisée(s)`)}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-4 sm:p-5">
              <div className="eyebrow">Calendrier</div>
              <h2 className="display text-lg font-bold">{tr(`學習日曆（近 ${WEEKS} 週）`, `Calendrier (${WEEKS} semaines)`)}</h2>
              <Heatmap days={days} today={today} />
            </Card>
            <Card className="p-4 sm:p-5">
              <div className="eyebrow">Temps d&apos;étude</div>
              <h2 className="display text-lg font-bold">{tr("每天練習時間（近 14 天，分鐘）", "Temps d’étude (14 jours, en minutes)")}</h2>
              <DailyBars days={days} today={today} />
            </Card>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <Card className="p-4 sm:p-5">
              <div className="eyebrow">Points faibles</div>
              <h2 className="display text-lg font-bold">{tr("最需要加強的文法點", "Points à retravailler")}</h2>
              {weakest.length === 0 ? (
                <p className="mt-3 text-sm text-muted">{tr("每個文法點作答滿 3 次後，就會出現在這裡。", "Un point de grammaire apparaît ici après 3 réponses.")}</p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {weakest.map((g) => (
                    <li key={`${g.level}-${g.grammar}`} className="flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2 text-sm">
                          <span className="truncate">
                            <span className="mr-1.5 rounded bg-accent-soft px-1.5 py-0.5 text-xs font-semibold text-accent">{g.level}</span>
                            {topicName(g.level, "grammar", g.grammar, lang)}
                          </span>
                          <span className="shrink-0 tabular-nums text-muted">
                            {g.pct}%・{tr(`${g.n} 次`, `${g.n} réponses`)}
                          </span>
                        </div>
                        <div
                          className="mt-1 h-2 overflow-hidden rounded-full bg-sunken"
                          role="img"
                          aria-label={tr(`正確率 ${g.pct}%`, `Réussite ${g.pct} %`)}
                        >
                          <div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(g.pct, 2)}%` }} />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => practice(g.level, g.grammar)}
                        className="min-h-10 shrink-0 rounded-lg border border-line px-3 text-sm hover:border-accent/60"
                      >
                        {tr("練習", "S’entraîner")}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card className="p-5">
              <div className="eyebrow">Révision</div>
              <h2 className="display text-lg font-bold">{tr("複習狀態", "État des révisions")}</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <Row label={tr("今日待複習", "À réviser aujourd’hui")} value={tr(`${summary.due} 題`, String(summary.due))} />
                <Row label={tr("錯題本", "Carnet d’erreurs")} value={tr(`${summary.reviewing} 題`, String(summary.reviewing))} />
                <Row label={tr("已掌握", "Maîtrisées")} value={tr(`${summary.mastered} 題`, String(summary.mastered))} />
              </dl>
              <Link href="/review/" className={`${btnPrimary} mt-4 w-full`}>
                {summary.due ? tr(`開始複習（${summary.due} 題）`, `Réviser (${summary.due})`) : tr("查看錯題本", "Voir le carnet d’erreurs")}
              </Link>
              {byLevel.length > 0 && (
                <>
                  <h3 className="mt-5 mb-2 text-sm font-bold">{tr("各等級正確率", "Réussite par niveau")}</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {byLevel.map((l) => (
                        <tr key={l.level} className="border-t border-line">
                          <td className="py-1.5 font-semibold">{l.level}</td>
                          <td className="py-1.5 text-right tabular-nums text-muted">{tr(`${l.n} 次`, `${l.n} rép.`)}</td>
                          <td className="py-1.5 text-right tabular-nums">{l.pct}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </Card>
          </div>

          <Card className="mt-4 overflow-hidden">
            <div className="px-4 pt-4 pb-2 sm:px-5">
              <div className="eyebrow">Historique</div>
              <h2 className="display text-lg font-bold">{tr("最近的練習", "Séances récentes")}</h2>
            </div>
            <ul className="divide-y divide-line">
              {recent.map((s) => {
                const r = Object.values(s.res);
                const ok = r.filter((x) => x === "c").length;
                return (
                  <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{s.title}</div>
                      <div className="text-xs text-muted">
                        {md(s.at)} {new Date(s.at).toLocaleTimeString(lang === "fr" ? "fr-FR" : "zh-TW", { hour: "2-digit", minute: "2-digit" })}・
                        {s.kind === "review" ? tr("複習", "Révision") : s.kind === "exam" ? tr("模考", "Examen") : tr("練習", "Exercice")}・{minutes(s.sec)} {tr("分鐘", "min")}
                      </div>
                    </div>
                    <span className="display shrink-0 text-lg font-bold tabular-nums">
                      {ok}
                      <span className="text-sm text-muted">／{r.length}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </>
      )}

      <DataTools />
    </main>
  );
}

function Tile({ fr, label, value, unit, note }: { fr: string; label: string; value: string; unit: string; note: string }) {
  return (
    <Card className="p-4">
      <div className="eyebrow text-xs">{fr}</div>
      {label !== fr && <div className="text-sm text-muted">{label}</div>}
      <div className="mt-1">
        <span className="display text-3xl font-bold tabular-nums sm:text-4xl">{value}</span>
        <span className="ml-1 text-sm text-muted">{unit}</span>
      </div>
      <div className="mt-1 text-xs text-muted">{note}</div>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}

/** 依練習分鐘數分 5 級：0、1～9、10～19、20～39、40 以上 */
function heatLevel(sec: number) {
  const m = sec / 60;
  if (sec <= 0) return 0;
  if (m < 10) return 1;
  if (m < 20) return 2;
  if (m < 40) return 3;
  return 4;
}

function Heatmap({ days, today }: { days: Map<string, DayStat>; today: number }) {
  const [sel, setSel] = useState<number | null>(null);
  const { lang, tr, minutes, md } = useFmt();
  // 從 WEEKS 週前的星期一開始，排成「每欄一週、每列一天」
  const dow = (new Date(today).getDay() + 6) % 7; // 星期一＝0
  const start = today - (dow + (WEEKS - 1) * 7) * DAY;
  const cols: number[][] = [];
  for (let w = 0; w < WEEKS; w++) cols.push(Array.from({ length: 7 }, (_, d) => start + (w * 7 + d) * DAY));

  const selDay = sel === null ? null : days.get(dayKey(sel));

  return (
    <div className="mt-3">
      <div className="flex gap-2">
        <div className="grid grid-rows-7 gap-[3px] pt-0 text-[10px] leading-none text-muted">
          {WEEKDAYS[lang].map((d, i) => (
            <span key={i} className="flex h-full items-center">
              {i % 2 === 0 ? d : ""}
            </span>
          ))}
        </div>
        <div className="grid flex-1 grid-flow-col grid-rows-7 gap-[3px]" role="grid" aria-label={tr("學習日曆", "Calendrier d’étude")}>
          {cols.flat().map((t) => {
            const future = t > today;
            const d = days.get(dayKey(t));
            const lvl = heatLevel(d?.sec ?? 0);
            const label = tr(`${md(t)}：${d ? `${minutes(d.sec)} 分鐘、${d.answered} 題` : "沒有練習"}`, `${md(t)} : ${d ? `${minutes(d.sec)} min, ${d.answered} question(s)` : "aucune activité"}`);
            return (
              <button
                key={t}
                type="button"
                disabled={future}
                onClick={() => setSel(t)}
                onMouseEnter={() => setSel(t)}
                title={label}
                aria-label={label}
                className={`aspect-square w-full rounded-[3px] transition outline-offset-1 disabled:opacity-0 ${
                  sel === t ? "outline-2 outline-ink" : ""
                }`}
                style={{ background: `var(--heat-${lvl})` }}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span className="min-h-4" aria-live="polite">
          {sel === null
            ? tr("點選日期查看當天紀錄", "Cliquez sur un jour pour voir le détail")
            : tr(`${md(sel)}：${selDay ? `練習 ${minutes(selDay.sec)} 分鐘，作答 ${selDay.answered} 題，答對 ${selDay.correct} 題` : "沒有練習"}`, `${md(sel)} : ${selDay ? `${minutes(selDay.sec)} min, ${selDay.answered} question(s), ${selDay.correct} juste(s)` : "aucune activité"}`)}
        </span>
        <span className="flex items-center gap-1">
          {tr("少", "Moins")}
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="size-3 rounded-[3px]" style={{ background: `var(--heat-${l})` }} />
          ))}
          {tr("多", "Plus")}
        </span>
      </div>
    </div>
  );
}

function DailyBars({ days, today }: { days: Map<string, DayStat>; today: number }) {
  const [sel, setSel] = useState<number | null>(null);
  const { tr, minutes, md } = useFmt();
  const list = Array.from({ length: 14 }, (_, i) => {
    const t = today - (13 - i) * DAY;
    const d = days.get(dayKey(t));
    return { t, min: d ? d.sec / 60 : 0, d };
  });
  const max = Math.max(5, ...list.map((x) => x.min));
  // 以 10 為單位，中間的參考線才會是整數
  const niceMax = Math.ceil(max / 10) * 10;
  const total = list.reduce((s, x) => s + x.min, 0);
  const shown = sel === null ? null : list.find((x) => x.t === sel);

  return (
    <div className="mt-3">
      <div className="relative h-40">
        {/* 參考線：0、一半、最大值 */}
        {[0, 0.5, 1].map((f) => (
          <div key={f} className="absolute inset-x-0 border-t border-line" style={{ bottom: `${f * 100}%` }}>
            <span className="absolute -top-2 right-0 bg-surface pl-1 text-[10px] text-muted tabular-nums">
              {Math.round(niceMax * f)}
            </span>
          </div>
        ))}
        <div className="absolute inset-y-0 right-6 left-0 flex items-end gap-[2px]">
          {list.map((x) => (
            <button
              key={x.t}
              type="button"
              onClick={() => setSel(x.t)}
              onMouseEnter={() => setSel(x.t)}
              aria-label={`${md(x.t)}：${minutes(x.d?.sec ?? 0)} min`}
              title={`${md(x.t)}：${minutes(x.d?.sec ?? 0)} min`}
              className="group flex h-full flex-1 items-end"
            >
              <span
                className={`block w-full rounded-t-[4px] transition ${sel === x.t ? "bg-ink" : "bg-accent group-hover:brightness-110"}`}
                style={{ height: x.min > 0 ? `max(${(x.min / niceMax) * 100}%, 3px)` : 0 }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-1 flex justify-between pr-6 text-[10px] text-muted">
        <span>{md(list[0].t)}</span>
        <span>{tr("今天", "Auj.")}</span>
      </div>
      <p className="mt-2 text-xs text-muted" aria-live="polite">
        {shown
          ? tr(`${md(shown.t)}：${minutes(shown.d?.sec ?? 0)} 分鐘${shown.d ? `，${shown.d.sessions} 次練習` : ""}`, `${md(shown.t)} : ${minutes(shown.d?.sec ?? 0)} min${shown.d ? `, ${shown.d.sessions} séance(s)` : ""}`)
          : tr(`14 天共 ${Math.round(total)} 分鐘，點選長條查看每天的數字`, `${Math.round(total)} min sur 14 jours. Cliquez sur une barre pour le détail.`)}
      </p>
      <details className="mt-2 text-sm">
        <summary className="cursor-pointer text-muted">{tr("以表格檢視", "Voir sous forme de tableau")}</summary>
        <table className="mt-2 w-full text-sm">
          <thead>
            <tr className="text-left text-muted">
              <th className="py-1 font-normal">{tr("日期", "Date")}</th>
              <th className="py-1 text-right font-normal">{tr("分鐘", "Minutes")}</th>
              <th className="py-1 text-right font-normal">{tr("作答題數", "Questions")}</th>
            </tr>
          </thead>
          <tbody>
            {[...list].reverse().map((x) => (
              <tr key={x.t} className="border-t border-line">
                <td className="py-1">{md(x.t)}</td>
                <td className="py-1 text-right tabular-nums">{minutes(x.d?.sec ?? 0)}</td>
                <td className="py-1 text-right tabular-nums">{x.d?.answered ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}

function DataTools() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const auth = useAuth();
  const signedIn = auth.status === "signedIn";
  const { tr } = useFmt();

  function download() {
    const blob = new Blob([exportProgress()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tr("法文練習紀錄", "exercices-francais")}-${dayKey(Date.now())}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg(tr("已下載備份檔。", "Sauvegarde téléchargée."));
  }

  async function upload(file: File) {
    try {
      const r = importProgress(await file.text());
      setMsg(tr(`匯入完成：${r.questions} 題的紀錄、${r.sessions} 次練習（和現有紀錄合併）。`, `Import terminé : ${r.questions} questions et ${r.sessions} séances (fusionnées avec l’existant).`));
    } catch {
      setMsg(tr("這個檔案無法匯入，請確認是從這裡下載的備份檔。", "Impossible d’importer ce fichier. Utilisez une sauvegarde téléchargée ici."));
    }
  }

  return (
    <Card className="mt-4 p-4 sm:p-5">
      <div className="eyebrow">Sauvegarde</div>
      <h2 className="display text-lg font-bold">{tr("備份與搬移紀錄", "Sauvegarder et transférer")}</h2>
      <p className="mt-1 text-sm text-muted">
        {signedIn ? (
          <>{tr(`已登入 ${auth.user?.email}，紀錄會自動同步到雲端，換裝置登入同一個帳號就能接著練習。也可以另外下載一份備份。`, `Connecté(e) : ${auth.user?.email}. Vos données sont synchronisées en ligne ; connectez-vous sur un autre appareil pour continuer. Vous pouvez aussi télécharger une sauvegarde.`)}</>
        ) : auth.status === "signedOut" ? (
          <>
            {tr("目前紀錄只存在這台裝置的瀏覽器裡。", "Vos données sont enregistrées uniquement dans ce navigateur. ")}
            <Link href="/account/" className="text-accent underline underline-offset-2">
              {tr("登入", "Connectez-vous")}
            </Link>
            {tr("後會自動同步到雲端，換手機或電腦也不會不見。", " pour les synchroniser et les retrouver sur un autre appareil.")}
          </>
        ) : (
          <>{tr("紀錄只存在這台裝置的瀏覽器裡。換手機或電腦時，先在這裡下載備份，再到新裝置匯入；清除瀏覽器資料也會讓紀錄消失。", "Vos données sont enregistrées uniquement dans ce navigateur. Pour changer d’appareil, téléchargez une sauvegarde ici puis importez-la. Effacer les données du navigateur supprime aussi l’historique.")}</>
        )}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className={btnQuiet} onClick={download}>
          {tr("下載備份", "Télécharger")}
        </button>
        <button type="button" className={btnQuiet} onClick={() => fileRef.current?.click()}>
          {tr("匯入備份", "Importer")}
        </button>
        <button
          type="button"
          className={`${btnQuiet} text-bad`}
          onClick={async () => {
            const text = signedIn
              ? tr("確定要清除所有學習紀錄嗎？這台裝置和雲端上的紀錄都會刪除，無法復原。", "Effacer tout l’historique ? Les données de cet appareil et du compte en ligne seront supprimées définitivement.")
              : tr("確定要清除這台裝置上所有的學習紀錄嗎？這個動作無法復原。", "Effacer tout l’historique de cet appareil ? Cette action est irréversible.");
            if (!window.confirm(text)) return;
            try {
              if (signedIn) await deleteCloudProgress();
              clearProgress();
              setMsg(tr("已清除學習紀錄。", "Historique effacé."));
            } catch {
              setMsg(tr("清除雲端紀錄失敗，請稍後再試。", "Échec de la suppression en ligne. Réessayez plus tard."));
            }
          }}
        >
          {tr("清除紀錄", "Effacer l’historique")}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
        />
      </div>
      {msg && (
        <p className="mt-2 text-sm text-accent" role="status">
          {msg}
        </p>
      )}
    </Card>
  );
}
