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
  { id: "B2", zh: "流利", fr: "Avancé", desc: "能清楚表達與論證觀點、轉述他人說的話" },
  { id: "C1", zh: "高階", fr: "Autonome", desc: "能精確、有層次地表達複雜的想法" },
  { id: "C2", zh: "精通", fr: "Maîtrise", desc: "能掌握文學語體、慣用語與細微的語感差異" },
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
  B2: [
    { id: "conditionnel-passe", zh: "條件式過去式", fr: "Le conditionnel passé" },
    { id: "subjonctif-indicatif", zh: "虛擬式還是直陳式", fr: "Subjonctif ou indicatif" },
    { id: "gerondif", zh: "副動詞與現在分詞", fr: "Le gérondif et le participe présent" },
    { id: "relatifs-composes", zh: "複合關係代名詞", fr: "Les relatifs composés" },
    { id: "discours-indirect", zh: "間接引語", fr: "Le discours indirect" },
    { id: "connecteurs", zh: "邏輯連接詞", fr: "Les connecteurs logiques" },
    { id: "pronoms-doubles", zh: "雙重受詞代名詞", fr: "Les doubles pronoms" },
  ],
  C1: [
    { id: "futur-anterieur", zh: "先未來式", fr: "Le futur antérieur" },
    { id: "conjonctions-subjonctif", zh: "接虛擬式的連接詞", fr: "Les conjonctions + subjonctif" },
    { id: "accord-participe", zh: "過去分詞的配合", fr: "L'accord du participe passé" },
    { id: "mise-en-relief", zh: "強調句", fr: "La mise en relief" },
    { id: "nominalisation", zh: "名詞化", fr: "La nominalisation" },
    { id: "negation-avancee", zh: "進階否定與贅詞 ne", fr: "La négation complexe et le ne explétif" },
  ],
  C2: [
    { id: "passe-simple", zh: "簡單過去式", fr: "Le passé simple" },
    { id: "subjonctif-imparfait", zh: "虛擬式未完成過去式", fr: "Le subjonctif imparfait" },
    { id: "inversion", zh: "文體倒裝", fr: "L'inversion stylistique" },
    { id: "expressions", zh: "慣用語", fr: "Les expressions idiomatiques" },
    { id: "registres", zh: "語域轉換", fr: "Les registres de langue" },
    { id: "collocations", zh: "搭配詞與近義詞", fr: "Collocations et nuances lexicales" },
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
