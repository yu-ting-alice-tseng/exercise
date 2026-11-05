import type { Level, QuestionType } from "./types";

export interface Topic {
  id: string;
  zh: string;
  fr: string;
}

export const LEVELS: { id: Level; zh: string; fr: string; desc: string }[] = [
  { id: "A1", zh: "入門", fr: "Découverte", desc: "能用簡單句子介紹自己、談日常生活" },
  { id: "A2", zh: "基礎", fr: "Survie", desc: "能描述過去的經驗、熟悉的人事物" },
  { id: "B1", zh: "進階", fr: "Seuil", desc: "能談論計畫、假設與自己的看法" },
];

export const GRAMMAR: Record<Level, Topic[]> = {
  A1: [
    { id: "articles", zh: "定冠詞與不定冠詞", fr: "Les articles" },
    { id: "partitifs", zh: "部分冠詞", fr: "Les articles partitifs" },
    { id: "genre-nombre", zh: "名詞陰陽性與複數", fr: "Le genre et le nombre" },
    { id: "etre-avoir", zh: "être／avoir 現在式", fr: "Être et avoir" },
    { id: "present-er", zh: "-er 動詞現在式", fr: "Le présent des verbes en -er" },
    { id: "negation", zh: "否定句", fr: "La négation" },
    { id: "questions", zh: "疑問句", fr: "L'interrogation" },
    { id: "adjectifs", zh: "形容詞配合與位置", fr: "Les adjectifs" },
    { id: "possessifs", zh: "所有格形容詞", fr: "Les adjectifs possessifs" },
    { id: "futur-proche", zh: "近未來式", fr: "Le futur proche" },
  ],
  A2: [
    { id: "passe-compose", zh: "複合過去式", fr: "Le passé composé" },
    { id: "imparfait", zh: "未完成過去式", fr: "L'imparfait" },
    { id: "pronominaux", zh: "反身動詞", fr: "Les verbes pronominaux" },
    { id: "cod-coi", zh: "直接與間接受詞代名詞", fr: "Les pronoms COD et COI" },
    { id: "y-en", zh: "代名詞 y 和 en", fr: "Les pronoms y et en" },
    { id: "comparatif", zh: "比較級與最高級", fr: "Le comparatif et le superlatif" },
    { id: "imperatif", zh: "命令式", fr: "L'impératif" },
    { id: "passe-recent", zh: "近過去式", fr: "Le passé récent" },
  ],
  B1: [
    { id: "futur-simple", zh: "簡單未來式", fr: "Le futur simple" },
    { id: "conditionnel", zh: "條件式現在式", fr: "Le conditionnel présent" },
    { id: "relatifs", zh: "關係代名詞", fr: "Les pronoms relatifs" },
    { id: "plus-que-parfait", zh: "愈過去式", fr: "Le plus-que-parfait" },
    { id: "si-hypothese", zh: "si 條件句", fr: "L'hypothèse avec si" },
    { id: "subjonctif", zh: "虛擬式現在式", fr: "Le subjonctif présent" },
    { id: "passif", zh: "被動語態", fr: "La voix passive" },
  ],
};

export const THEMES: Topic[] = [
  { id: "presentation", zh: "自我介紹", fr: "Se présenter" },
  { id: "famille", zh: "家庭", fr: "La famille" },
  { id: "nourriture", zh: "食物與餐廳", fr: "La nourriture" },
  { id: "achats", zh: "購物", fr: "Les achats" },
  { id: "voyage", zh: "交通與旅行", fr: "Les voyages" },
  { id: "meteo", zh: "天氣與季節", fr: "La météo" },
  { id: "quotidien", zh: "日常作息", fr: "La vie quotidienne" },
  { id: "loisirs", zh: "休閒與興趣", fr: "Les loisirs" },
  { id: "ecole-travail", zh: "學校與工作", fr: "L'école et le travail" },
  { id: "logement", zh: "住家", fr: "Le logement" },
  { id: "sante", zh: "身體與健康", fr: "La santé" },
  { id: "culture", zh: "法國節慶與文化", fr: "La culture française" },
];

export const TYPE_LABELS: Record<QuestionType, { zh: string; fr: string }> = {
  choice: { zh: "選擇題", fr: "QCM" },
  fill: { zh: "填充題", fr: "Complétez" },
  short: { zh: "簡答題", fr: "Répondez" },
};

export const TYPE_ORDER: QuestionType[] = ["choice", "fill", "short"];

export const DIFFICULTY_FR: Record<string, string> = {
  all: "Tous",
  "1": "Facile",
  "2": "Moyen",
  "3": "Difficile",
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  all: "全部",
  "1": "基礎",
  "2": "標準",
  "3": "進階",
};

export function topicName(level: Level, by: "grammar" | "theme", id: string): string {
  const list = by === "grammar" ? GRAMMAR[level] : THEMES;
  return list.find((t) => t.id === id)?.zh ?? id;
}
