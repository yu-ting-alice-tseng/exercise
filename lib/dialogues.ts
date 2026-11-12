import { DIALOGUES_MANGER } from "@/data/dialogues/manger";
import { DIALOGUES_SOCIAL } from "@/data/dialogues/social";
import { DIALOGUES_TRAVAIL } from "@/data/dialogues/travail";
import { DIALOGUES_VOYAGE } from "@/data/dialogues/voyage";
import type { Dialogue } from "./dialogueTypes";
import { comprehensionQuestions } from "./quiz";
import { plainText } from "./readingText";
import { LEVELS } from "./taxonomy";
import type { DrawnQuestion } from "./types";

/** 對話的場合分類 */
export const SCENES: { id: string; zh: string; fr: string }[] = [
  { id: "manger", zh: "餐廳與咖啡館", fr: "Au café et au restaurant" },
  { id: "courses", zh: "購物", fr: "Faire des achats" },
  { id: "voyage", zh: "交通與旅行", fr: "En voyage" },
  { id: "logement", zh: "住宿與居家", fr: "Se loger" },
  { id: "sante", zh: "看病與緊急狀況", fr: "Santé et urgences" },
  { id: "demarches", zh: "銀行、郵局與行政", fr: "Services et démarches" },
  { id: "social", zh: "朋友與社交", fr: "Vie sociale" },
  { id: "travail", zh: "職場與學校", fr: "Travail et études" },
];

const ORDER = LEVELS.map((l) => l.id);
const ALL: Dialogue[] = [...DIALOGUES_MANGER, ...DIALOGUES_VOYAGE, ...DIALOGUES_SOCIAL, ...DIALOGUES_TRAVAIL];

/** 依場合、再依等級排序 */
export const DIALOGUES: Dialogue[] = [...ALL].sort(
  (a, b) => SCENES.findIndex((s) => s.id === a.scene) - SCENES.findIndex((s) => s.id === b.scene) || ORDER.indexOf(a.level) - ORDER.indexOf(b.level),
);

export function getDialogue(id: string): Dialogue | undefined {
  return DIALOGUES.find((d) => d.id === id);
}

export function lineCount(d: Dialogue): number {
  return d.lines.length;
}

export function dialogueWords(d: Dialogue): number {
  return d.lines
    .map(([, fr]) => plainText(fr))
    .join(" ")
    .split(/[\s’']+/)
    .filter((w) => /\p{L}/u.test(w)).length;
}

export function dialogueQuestions(d: Dialogue): DrawnQuestion[] {
  return comprehensionQuestions(`dial-${d.id}`, d.level, d.theme, d.quiz, "dialogue");
}

export const REGISTER: Record<Dialogue["register"], { zh: string; fr: string; hint: string; hintFr: string }> = {
  tu: { zh: "用 tu", fr: "Tutoiement", hint: "朋友、家人、同輩之間，用 tu 稱呼對方。", hintFr: "Entre amis, en famille ou entre jeunes : on se dit tu." },
  vous: { zh: "用 vous", fr: "Vouvoiement", hint: "對陌生人、店員、長輩或正式場合，用 vous 稱呼對方。", hintFr: "Avec des inconnus, des commerçants ou dans un cadre formel : on dit vous." },
  mixte: { zh: "tu 與 vous", fr: "Tu et vous", hint: "對話裡兩種都有：對朋友說 tu，對店員或陌生人說 vous。", hintFr: "Les deux à la fois : tu entre amis, vous avec les inconnus." },
};
