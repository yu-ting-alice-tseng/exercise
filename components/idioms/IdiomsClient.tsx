"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import IdiomReview from "./IdiomReview";
import InlineQuiz from "@/components/learn/InlineQuiz";
import Speak from "@/components/learn/Speak";
import { btnPrimary, btnQuiet } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import type { IdiomKind } from "@/lib/idiomTypes";
import { IDIOM_KINDS, IDIOM_THEMES, IDIOMS, idiomQuiz, REG_LABEL, type IdiomEntry } from "@/lib/idioms";
import { newSeed } from "@/lib/random";
import { DAY, dueAt, isDue, markLearned, parseSrs, retention, srsSnapshot, strengthLabel, subscribeSrs, unmarkLearned, type IdiomCard } from "@/lib/idiomSrs";
import { useNow } from "@/lib/useNow";

type Mode = "all" | "guess";
type Status = "all" | "new" | "learned" | "due";

const REG_CLS: Record<IdiomEntry["reg"], string> = {
  soutenu: "bg-accent-soft text-accent",
  courant: "bg-sunken text-muted",
  familier: "bg-rouge-soft text-rouge",
};

function chip(on: boolean) {
  return `inline-flex min-h-9 shrink-0 items-center rounded-full border px-3 text-sm transition ${
    on ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface hover:border-accent/60"
  }`;
}

/** 卡片上的記憶狀態：保留率條、下次複習時間 */
function Memory({ c, now }: { c: IdiomCard; now: number }) {
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  const r = Math.round(retention(c, now) * 100);
  const left = dueAt(c) - now;
  const days = left <= 0 ? 0 : Math.max(1, Math.round(left / DAY));
  const lab = strengthLabel(c);
  return (
    <div className="mt-2 flex items-center gap-2 text-[11px] text-muted">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-sunken" aria-hidden>
        <div className={`h-full ${r >= 90 ? "bg-ok" : r >= 75 ? "bg-warn" : "bg-bad"}`} style={{ width: `${r}%` }} />
      </div>
      <span className="tabular-nums">{t(`記憶約 ${r}%`, `Mémoire ~${r} %`)}</span>
      <span>・{t(lab.zh, lab.fr)}</span>
      <span className={`ml-auto tabular-nums ${days <= 0 ? "font-bold text-accent" : ""}`}>
        {days <= 0 ? t("該複習了", "À réviser") : t(`${days} 天後複習`, `dans ${days} j`)}
      </span>
    </div>
  );
}

function Card({
  it,
  guess,
  open,
  onToggle,
  card,
  now,
}: {
  it: IdiomEntry;
  guess: boolean;
  open: boolean;
  onToggle: () => void;
  card?: IdiomCard;
  now: number;
}) {
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  const hidden = guess && !open;
  const reg = REG_LABEL[it.reg];
  return (
    <li className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-start gap-2">
        <Speak text={it.fr.replace(/\(qqn\)|qqn|qqch/g, "").replace(/\s*\/\s*/g, ", ")} label={`${t("朗讀", "Écouter")} ${it.fr}`} className="mt-0.5 size-8 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="rounded bg-accent px-1.5 font-bold text-accent-ink tabular-nums">{it.level}</span>
            <span className={`rounded px-1.5 font-bold ${REG_CLS[it.reg]}`}>{t(reg.zh, reg.fr)}</span>
            <button
              type="button"
              aria-pressed={!!card}
              onClick={() => {
                if (!card) return markLearned([it.id]);
                if (card.reps === 0 || window.confirm(t("取消「已學」會清除這則的複習紀錄，確定嗎？", "Retirer cette expression effacera son historique de révision. Continuer ?"))) unmarkLearned(it.id);
              }}
              className={`ml-auto inline-flex min-h-8 items-center rounded-full border px-2.5 text-xs font-bold transition ${
                card ? "border-ok bg-ok-soft text-ok" : "border-line text-muted hover:border-accent/60 hover:text-accent"
              }`}
            >
              {card ? t("✓ 已學", "✓ Apprise") : t("＋ 標為已學", "＋ Je l’ai appris")}
            </button>
          </div>
          <p lang="fr" className="display mt-1 text-lg leading-snug font-bold">
            {it.fr}
          </p>
          {it.lit && <p className="mt-0.5 text-xs text-muted">{it.kind === "familier" || it.kind === "jeunes" ? <span lang="fr">{it.lit}</span> : t(`字面：${it.lit}`, `Mot à mot : ${it.lit}`)}</p>}
        </div>
      </div>
      {card && now > 0 && <Memory c={card} now={now} />}

      {hidden ? (
        <button type="button" onClick={onToggle} className="mt-3 w-full rounded-lg border border-dashed border-accent/50 py-2.5 text-sm font-medium text-accent hover:bg-accent-soft">
          {t("想一想是什麼意思，再點這裡看答案", "Devinez le sens, puis touchez ici")}
        </button>
      ) : (
        <div className="mt-2 space-y-1.5">
          <p className="font-medium">{it.zh}</p>
          {it.eq && (
            <p className="text-sm">
              <span className="mr-1 rounded bg-warn-soft px-1.5 text-[11px] font-bold text-warn">{t("中文類似說法", "En chinois")}</span>
              {it.eq}
            </p>
          )}
          <div className="flex gap-2 rounded-lg bg-sunken/60 px-2.5 py-2">
            <Speak text={it.ex[0]} label={t("朗讀例句", "Écouter l’exemple")} className="mt-0.5 size-7 shrink-0" />
            <div className="min-w-0">
              <p lang="fr" className="text-[0.95rem]">
                {it.ex[0]}
              </p>
              <p className="text-sm text-muted">{it.ex[1]}</p>
            </div>
          </div>
          {it.note && (
            <p className="text-xs text-muted">
              <span className="mr-1 font-bold">{t("小知識", "Le saviez-vous ?")}</span>
              {it.note}
            </p>
          )}
          {guess && (
            <button type="button" onClick={onToggle} className="text-xs text-muted underline-offset-2 hover:underline">
              {t("再遮起來", "Masquer")}
            </button>
          )}
        </div>
      )}
    </li>
  );
}

export default function IdiomsClient() {
  const [kind, setKind] = useState<IdiomKind>("expression");
  const [theme, setTheme] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<Mode>("all");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [seed, setSeed] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("all");
  const raw = useSyncExternalStore(subscribeSrs, srsSnapshot, () => null);
  const store = useMemo(() => parseSrs(raw), [raw]);
  const now = useNow();
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);

  const themes = IDIOM_THEMES.filter((th) => th.kind === kind);
  const k = IDIOM_KINDS.find((x) => x.id === kind)!;

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    return IDIOMS.filter((it) => {
      if (needle) {
        const hay = `${it.fr} ${it.zh} ${it.eq ?? ""} ${it.lit ?? ""}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
        return hay.includes(needle);
      }
      return it.kind === kind && (!theme || it.th === theme);
    }).filter((it) => {
      const c = store[it.id];
      if (status === "new") return !c;
      if (status === "learned") return !!c;
      if (status === "due") return !!c && isDue(c, now);
      return true;
    });
  }, [kind, theme, q, status, store, now]);
  const learnedCount = Object.keys(store).length;
  const dueCount = IDIOMS.filter((it) => store[it.id] && isDue(store[it.id], now)).length;
  const unlearnedInList = list.filter((it) => !store[it.id]);

  const quiz = useMemo(() => (seed === null ? [] : idiomQuiz(list.length >= 4 ? list : IDIOMS.filter((it) => it.kind === kind), seed)), [seed, list, kind]);

  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4" role="tablist" aria-label={t("類別", "Catégorie")}>
        {IDIOM_KINDS.map((x) => {
          const n = IDIOMS.filter((it) => it.kind === x.id).length;
          const on = kind === x.id && !q;
          return (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setKind(x.id);
                setTheme(null);
                setQ("");
                setSeed(null);
              }}
              className={`rounded-xl border-2 p-2.5 text-left transition sm:p-3 ${on ? "border-accent bg-accent-soft" : "border-line bg-surface hover:border-accent/50"}`}
            >
              <div className="text-sm leading-tight font-bold sm:text-base">
                {t(x.zh, x.fr)} <span className="text-xs font-normal text-muted tabular-nums sm:text-sm">{n}</span>
              </div>
              {lang === "zh" && (
                <div lang="fr" className="display hidden text-xs text-muted italic sm:block">
                  {x.fr}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="mb-3 text-sm text-muted">{t(k.desc, k.descFr)}</p>

      {learnedCount > 0 && (
        <a
          href="#review"
          className="mb-4 flex items-center gap-3 rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm transition hover:border-accent"
        >
          <span>
            {t(`已學 ${learnedCount} 則`, `${learnedCount} apprises`)}
            {dueCount > 0 ? <b className="text-accent">{t(`・今天該複習 ${dueCount} 則`, ` · ${dueCount} à réviser`)}</b> : t("・今天沒有要複習的", " · rien à réviser")}
          </span>
          <span className="ml-auto font-bold text-accent">{t("去複習 ↓", "Réviser ↓")}</span>
        </a>
      )}

      <div className="mb-4 space-y-2">
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSeed(null);
          }}
          placeholder={t("搜尋法文或中文，例如 chat、放鴿子", "Rechercher : chat, pluie, argent…")}
          aria-label={t("搜尋", "Rechercher")}
          className="min-h-11 w-full rounded-lg border border-line bg-surface px-3"
        />
        {!q && (
          <div className="scroll-x -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            <button type="button" onClick={() => setTheme(null)} className={chip(theme === null)}>
              {t("全部", "Tout")}
            </button>
            {themes.map((th) => (
              <button key={th.id} type="button" onClick={() => setTheme(th.id)} className={chip(theme === th.id)}>
                {t(th.zh, th.fr)}
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" aria-pressed={mode === "all"} onClick={() => setMode("all")} className={chip(mode === "all")}>
            {t("全部顯示", "Tout afficher")}
          </button>
          <button
            type="button"
            aria-pressed={mode === "guess"}
            onClick={() => {
              setMode("guess");
              setOpen(new Set());
            }}
            className={chip(mode === "guess")}
          >
            {t("先猜意思", "Deviner le sens")}
          </button>
          <span className="ml-auto text-xs text-muted tabular-nums">{t(`${list.length} 則`, `${list.length} entrées`)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted">{t("學習狀態", "Statut")}</span>
          {(
            [
              ["all", "全部", "Tout"],
              ["new", "還沒學", "Nouvelles"],
              ["learned", "已學", "Apprises"],
              ["due", "該複習", "À réviser"],
            ] as const
          ).map(([id, zh, fr]) => (
            <button key={id} type="button" aria-pressed={status === id} onClick={() => setStatus(id)} className={chip(status === id)}>
              {t(zh, fr)}
            </button>
          ))}
          {unlearnedInList.length > 1 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(t(`把目前列出的 ${unlearnedInList.length} 則都標為已學？`, `Marquer les ${unlearnedInList.length} expressions affichées comme apprises ?`))) markLearned(unlearnedInList.map((it) => it.id));
              }}
              className="ml-auto text-xs text-accent underline-offset-2 hover:underline"
            >
              {t(`全部標為已學（${unlearnedInList.length}）`, `Tout marquer (${unlearnedInList.length})`)}
            </button>
          )}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="rounded-xl border border-line bg-surface p-6 text-center text-muted">{t("找不到符合的說法。", "Aucun résultat.")}</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {list.map((it) => (
            <Card key={it.id} it={it} guess={mode === "guess"} open={open.has(it.id)} onToggle={() => toggle(it.id)} card={store[it.id]} now={now} />
          ))}
        </ul>
      )}

      <section id="review" className="mt-10 scroll-mt-6 rounded-2xl border-2 border-ok/30 bg-ok-soft/40 p-4 sm:p-6">
        {lang === "zh" && <div className="eyebrow">Révisions espacées</div>}
        <h2 className="display text-xl font-bold">{t("間隔複習", "Révisions espacées")}</h2>
        <p className="mt-1 mb-4 text-sm text-muted">
          {t(
            "依據艾賓浩斯的遺忘曲線：記憶會隨時間衰減，在快要忘記的時候複習最有效。標為已學的說法，第一次在隔天複習；每答對一次，下次間隔就拉長（約 3 天、8 天、20 天……），答錯就回到隔天重來。卡片上的「記憶約 %」是依經過時間估算的保留率，到期時約為 90%。",
            "D’après la courbe de l’oubli d’Ebbinghaus, on retient mieux en révisant juste avant d’oublier. Chaque bonne réponse allonge l’intervalle (environ 3, 8, 20 jours…), chaque erreur le remet à un jour. Le pourcentage affiché estime ce que vous retenez encore.",
          )}
        </p>
        <IdiomReview store={store} now={now} />
      </section>

      <section id="quiz-idioms" className="mt-10 scroll-mt-6 rounded-2xl border-2 border-accent/30 bg-accent-soft/40 p-4 sm:p-6">
        {seed === null ? (
          <div>
            {lang === "zh" && <div className="eyebrow">Testez-vous !</div>}
            <h2 className="display text-xl font-bold">{t("隨機猜意思小測驗", "Quiz au hasard")}</h2>
            <p className="mt-1 mb-4 text-sm text-muted">
              {t("從目前列出的說法隨機抽 8 題，看法文選出正確意思，結果會記進學習紀錄。不影響間隔複習的排程。", "8 expressions tirées de la liste affichée : choisissez le bon sens. Ce quiz ne change pas le planning des révisions.")}
            </p>
            <button type="button" onClick={() => setSeed(newSeed())} className={btnPrimary}>
              {t("開始測驗", "Commencer")}
            </button>
          </div>
        ) : (
          <InlineQuiz
            key={seed}
            questions={quiz}
            level={quiz[0]?.level ?? "B1"}
            recordTitle={`俗語諺語：${k.zh}`}
            eyebrow="Testez-vous !"
            heading={t(`猜意思：${quiz.length} 題`, `Que veut dire… ? ${quiz.length} questions`)}
            sub={t("選出每句話真正的意思。", "Choisissez le vrai sens de chaque expression.")}
            actions={() => (
              <button
                type="button"
                onClick={() => {
                  setSeed(newSeed());
                  document.getElementById("quiz-idioms")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={btnQuiet}
              >
                {t("再來一組", "Une autre série")}
              </button>
            )}
          />
        )}
      </section>
    </div>
  );
}
