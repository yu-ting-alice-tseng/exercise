import { EXPRESSIONS } from "@/data/idioms/expressions";
import { EXPRESSIONS_2 } from "@/data/idioms/expressions2";
import { EXPRESSIONS_3 } from "@/data/idioms/expressions3";
import { FAMILIER_3 } from "@/data/idioms/familier3";
import { JEUNES_2 } from "@/data/idioms/jeunes2";
import { PROVERBES_3 } from "@/data/idioms/proverbes3";
import { FAMILIER_2 } from "@/data/idioms/familier2";
import { JEUNES } from "@/data/idioms/jeunes";
import { PROVERBES_2 } from "@/data/idioms/proverbes2";
import { FAMILIER } from "@/data/idioms/familier";
import { PROVERBES } from "@/data/idioms/proverbes";
import type { Idiom, IdiomKind } from "./idiomTypes";
import { mulberry32, shuffle } from "./random";
import type { DrawnQuestion } from "./types";

export const IDIOM_KINDS: { id: IdiomKind; zh: string; fr: string; desc: string; descFr: string }[] = [
  { id: "expression", zh: "慣用語", fr: "Expressions imagées", desc: "字面和真正意思不一樣的形象化說法，法國人天天掛在嘴邊。", descFr: "Des images qui ne veulent pas dire ce qu’elles disent, utilisées tous les jours." },
  { id: "proverbe", zh: "諺語", fr: "Proverbes", desc: "流傳已久的人生智慧，很多都能找到意思相近的中文成語。", descFr: "La sagesse populaire, souvent proche d’un chengyu chinois." },
  { id: "familier", zh: "口語與俚語", fr: "Langue familière", desc: "朋友之間的說法、倒序詞（verlan）和簡稱。聽得懂很重要，但寫作和正式場合不要用。", descFr: "Mots de tous les jours entre amis, verlan et abréviations. À comprendre, mais pas à l’écrit formel." },
  { id: "jeunes", zh: "年輕人口語", fr: "Le parler jeune", desc: "法國年輕人現在常說的流行語、網路縮寫和外來字。流行語變得很快，也有地區差異；只適合朋友之間，對長輩、老師或正式場合都不要用。", descFr: "Le langage des ados et des jeunes adultes d’aujourd’hui : expressions, abréviations SMS, mots venus d’ailleurs. Ça change vite, et c’est uniquement entre amis." },
];

export const IDIOM_THEMES: { id: string; kind: IdiomKind; zh: string; fr: string }[] = [
  { id: "animaux", kind: "expression", zh: "動物", fr: "Les animaux" },
  { id: "corps", kind: "expression", zh: "身體", fr: "Le corps" },
  { id: "nourriture", kind: "expression", zh: "食物", fr: "La nourriture" },
  { id: "couleurs", kind: "expression", zh: "顏色與數字", fr: "Couleurs et nombres" },
  { id: "temps", kind: "expression", zh: "天氣與時間", fr: "Le temps" },
  { id: "sentiments", kind: "expression", zh: "情緒與人際", fr: "Sentiments et relations" },
  { id: "vie", kind: "expression", zh: "生活與處境", fr: "Situations de la vie" },
  { id: "parole", kind: "expression", zh: "說話與溝通", fr: "La parole" },
  { id: "argent", kind: "expression", zh: "錢與工作", fr: "Argent et travail" },
  { id: "patience", kind: "proverbe", zh: "耐心與努力", fr: "Patience et effort" },
  { id: "prudence", kind: "proverbe", zh: "謹慎與判斷", fr: "Prudence et jugement" },
  { id: "relations", kind: "proverbe", zh: "人與人際", fr: "Les autres" },
  { id: "vie", kind: "proverbe", zh: "人生與機會", fr: "La vie et ses chances" },
  { id: "mots", kind: "familier", zh: "常用口語詞", fr: "Mots familiers" },
  { id: "reponses", kind: "familier", zh: "回應與感嘆", fr: "Réactions" },
  { id: "verlan", kind: "familier", zh: "倒序詞 verlan", fr: "Le verlan" },
  { id: "abreviations", kind: "familier", zh: "簡稱與省略", fr: "Abréviations" },
  { id: "reactions", kind: "jeunes", zh: "反應與感嘆", fr: "Réactions" },
  { id: "parler", kind: "jeunes", zh: "口頭禪", fr: "Tics de langage" },
  { id: "relations", kind: "jeunes", zh: "人與關係", fr: "Les gens" },
  { id: "origines", kind: "jeunes", zh: "來自阿拉伯語與非洲法語", fr: "Mots venus d’ailleurs" },
  { id: "anglais", kind: "jeunes", zh: "英文借字", fr: "Anglicismes" },
  { id: "sms", kind: "jeunes", zh: "簡訊與網路縮寫", fr: "SMS et réseaux" },
];

export interface IdiomEntry extends Idiom {
  id: string;
  kind: IdiomKind;
}

function slug(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const tag = (kind: IdiomKind) => (i: Idiom): IdiomEntry => ({ ...i, kind, id: `${kind[0]}-${slug(i.fr)}` });

export const IDIOMS: IdiomEntry[] = [
  ...[...EXPRESSIONS, ...EXPRESSIONS_2, ...EXPRESSIONS_3].map(tag("expression")),
  ...[...PROVERBES, ...PROVERBES_2, ...PROVERBES_3].map(tag("proverbe")),
  ...[...FAMILIER, ...FAMILIER_2, ...FAMILIER_3].map(tag("familier")),
  ...[...JEUNES, ...JEUNES_2].map(tag("jeunes")),
];

export const REG_LABEL: Record<Idiom["reg"], { zh: string; fr: string }> = {
  soutenu: { zh: "正式", fr: "soutenu" },
  courant: { zh: "一般", fr: "courant" },
  familier: { zh: "口語", fr: "familier" },
};

/** 猜意思小測驗：看法文選中文意思，干擾選項優先取同一類 */
export function idiomQuiz(pool: IdiomEntry[], seed: number, n = 8): DrawnQuestion[] {
  const rand = mulberry32(seed);
  const picked = shuffle(pool, rand).slice(0, n);
  return picked.map((it) => {
    const same = IDIOMS.filter((o) => o.id !== it.id && o.kind === it.kind && o.zh !== it.zh);
    const wrong = shuffle(same, rand).slice(0, 3).map((o) => o.zh);
    const options = [it.zh, ...wrong];
    const order = shuffle(options.map((_, k) => k), rand);
    return {
      id: `idiom-${it.id}`,
      level: it.level,
      grammar: "expressions",
      themes: [],
      type: "choice",
      difficulty: 2,
      instruction: "Que veut dire cette expression ?",
      instructionZh: "這句話是什麼意思？",
      stem: it.fr,
      options,
      answer: 0,
      explanation: `${it.lit ? `字面：${it.lit}　` : ""}${it.eq ? `中文類似說法：${it.eq}。` : ""}例：${it.ex[0]}`,
      displayOptions: order.map((k) => options[k]),
      displayAnswer: order.indexOf(0),
    } as DrawnQuestion;
  });
}
