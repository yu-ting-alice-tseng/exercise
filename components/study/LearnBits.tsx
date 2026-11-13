"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useLang } from "@/lib/i18n";
import { DAY, dueAt, parseSrs, retention, strengthLabel, type Deck, type IdiomCard } from "@/lib/idiomSrs";

/** 讀取某一組複習進度（伺服器端與第一次畫面都是空的，避免畫面不一致） */
export function useDeck(deck: Deck) {
  const raw = useSyncExternalStore(deck.subscribe, deck.snapshot, () => null);
  return useMemo(() => parseSrs(raw), [raw]);
}

/** 「標為已學／已學」按鈕 */
export function LearnToggle({ deck, id, card, compact = false }: { deck: Deck; id: string; card?: IdiomCard; compact?: boolean }) {
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  return (
    <button
      type="button"
      aria-pressed={!!card}
      onClick={(e) => {
        e.stopPropagation();
        if (!card) return deck.markLearned([id]);
        if (card.reps === 0 || window.confirm(t("取消「已學」會清除這一項的複習紀錄，確定嗎？", "Retirer cet élément effacera son historique de révision. Continuer ?"))) deck.unmarkLearned(id);
      }}
      title={card ? t("已學（再按一下取消）", "Appris (toucher pour retirer)") : t("標為已學", "Marquer comme appris")}
      className={`inline-flex shrink-0 items-center rounded-full border font-bold transition ${compact ? "min-h-7 px-2 text-[11px]" : "min-h-8 px-2.5 text-xs"} ${
        card ? "border-ok bg-ok-soft text-ok" : "border-line text-muted hover:border-accent/60 hover:text-accent"
      }`}
    >
      {card ? t("✓ 已學", "✓ Appris") : compact ? t("＋ 已學", "＋ Appris") : t("＋ 標為已學", "＋ Je l’ai appris")}
    </button>
  );
}

/** 記憶狀態：保留率條、下次複習時間 */
export function Memory({ c, now }: { c: IdiomCard; now: number }) {
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  if (!now) return null;
  const r = Math.round(retention(c, now) * 100);
  const left = dueAt(c) - now;
  const days = left <= 0 ? 0 : Math.max(1, Math.round(left / DAY));
  const lab = strengthLabel(c);
  return (
    <div className="mt-2 flex items-center gap-2 text-[11px] text-muted">
      <div className="h-1.5 w-12 shrink-0 overflow-hidden rounded-full bg-sunken" aria-hidden>
        <div className={`h-full ${r >= 90 ? "bg-ok" : r >= 75 ? "bg-warn" : "bg-bad"}`} style={{ width: `${r}%` }} />
      </div>
      <span className="tabular-nums">{t(`記憶約 ${r}%`, `~${r} %`)}</span>
      <span className="hidden sm:inline">・{t(lab.zh, lab.fr)}</span>
      <span className={`ml-auto tabular-nums ${days <= 0 ? "font-bold text-accent" : ""}`}>
        {days <= 0 ? t("該複習了", "À réviser") : t(`${days} 天後複習`, `dans ${days} j`)}
      </span>
    </div>
  );
}

/** 間隔複習的說明（放在複習區開頭） */
export function SrsExplainer() {
  const lang = useLang();
  return (
    <p className="mt-1 mb-4 text-sm text-muted">
      {lang === "fr"
        ? "D’après la courbe de l’oubli d’Ebbinghaus, on retient mieux en révisant juste avant d’oublier. Chaque bonne réponse allonge l’intervalle (environ 3, 8, 20 jours…), chaque erreur le remet à un jour. Le pourcentage affiché estime ce que vous retenez encore."
        : "依據艾賓浩斯的遺忘曲線：記憶會隨時間衰減，在快要忘記的時候複習最有效。標為已學的項目，第一次在隔天複習；每答對一次，下次間隔就拉長（約 3 天、8 天、20 天……），答錯就回到隔天重來。「記憶約 %」是依經過時間估算的保留率，到期時約為 90%。"}
    </p>
  );
}
