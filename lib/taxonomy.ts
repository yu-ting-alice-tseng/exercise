import type { Level, QuestionType } from "./types";

export type TopicCategory = "verbes" | "mots" | "phrase";

export interface Topic {
  id: string;
  zh: string;
  fr: string;
  /** 文法點的分類，主題沒有分類 */
  cat?: TopicCategory;
}

export const CATEGORIES: { id: TopicCategory; zh: string; fr: string }[] = [
  { id: "verbes", zh: "動詞與時態", fr: "Verbes et temps" },
  { id: "mots", zh: "詞類與代名詞", fr: "Articles, pronoms et prépositions" },
  { id: "phrase", zh: "句型與連接詞", fr: "Phrase et connecteurs" },
];

export const LEVELS: { id: Level; zh: string; fr: string; desc: string; descFr: string }[] = [
  { id: "A1", zh: "入門", fr: "Découverte", desc: "能用簡單句子介紹自己、談日常生活", descFr: "Se présenter et parler du quotidien avec des phrases simples" },
  { id: "A2", zh: "基礎", fr: "Survie", desc: "能描述過去的經驗、熟悉的人事物", descFr: "Raconter une expérience passée, décrire son environnement" },
  { id: "B1", zh: "進階", fr: "Seuil", desc: "能談論計畫、假設與自己的看法", descFr: "Parler de projets, d’hypothèses et donner son avis" },
  { id: "B2", zh: "流利", fr: "Avancé", desc: "能清楚表達與論證觀點、轉述他人說的話", descFr: "Argumenter clairement et rapporter les propos d’autrui" },
  { id: "C1", zh: "高階", fr: "Autonome", desc: "能精確、有層次地表達複雜的想法", descFr: "Exprimer des idées complexes avec précision et nuance" },
  { id: "C2", zh: "精通", fr: "Maîtrise", desc: "能掌握文學語體、慣用語與細微的語感差異", descFr: "Maîtriser le registre littéraire, les expressions et les nuances" },
];

export const GRAMMAR: Record<Level, Topic[]> = {
  A1: [
    { id: "articles", zh: "定冠詞與不定冠詞", fr: "Les articles", cat: "mots" },
    { id: "partitifs", zh: "部分冠詞", fr: "Les articles partitifs", cat: "mots" },
    { id: "articles-contractes", zh: "縮合冠詞（au、du、aux、des）", fr: "Les articles contractés", cat: "mots" },
    { id: "genre-nombre", zh: "名詞陰陽性與複數", fr: "Le genre et le nombre", cat: "mots" },
    { id: "adjectifs", zh: "形容詞配合與位置", fr: "Les adjectifs", cat: "mots" },
    { id: "possessifs", zh: "所有格形容詞", fr: "Les adjectifs possessifs", cat: "mots" },
    { id: "demonstratifs", zh: "指示形容詞", fr: "Les adjectifs démonstratifs", cat: "mots" },
    { id: "pronoms-toniques", zh: "重讀人稱代名詞", fr: "Les pronoms toniques", cat: "mots" },
    { id: "prepositions-lieux", zh: "城市與國家的介系詞", fr: "Les prépositions de lieu", cat: "mots" },
    { id: "quantites", zh: "數量的表達", fr: "Les expressions de quantité", cat: "mots" },
    { id: "etre-avoir", zh: "être／avoir 現在式", fr: "Être et avoir", cat: "verbes" },
    { id: "present-er", zh: "-er 動詞現在式", fr: "Le présent des verbes en -er", cat: "verbes" },
    { id: "futur-proche", zh: "近未來式", fr: "Le futur proche", cat: "verbes" },
    { id: "negation", zh: "否定句", fr: "La négation", cat: "phrase" },
    { id: "questions", zh: "疑問句", fr: "L'interrogation", cat: "phrase" },
    { id: "connecteurs-a1", zh: "基本連接詞", fr: "Et, mais, ou, parce que, alors", cat: "phrase" },
  ],
  A2: [
    { id: "passe-compose", zh: "複合過去式", fr: "Le passé composé", cat: "verbes" },
    { id: "imparfait", zh: "未完成過去式", fr: "L'imparfait", cat: "verbes" },
    { id: "pronominaux", zh: "反身動詞", fr: "Les verbes pronominaux", cat: "verbes" },
    { id: "imperatif", zh: "命令式", fr: "L'impératif", cat: "verbes" },
    { id: "passe-recent", zh: "近過去式", fr: "Le passé récent", cat: "verbes" },
    { id: "cod-coi", zh: "直接與間接受詞代名詞（COD／COI）", fr: "Les pronoms COD et COI", cat: "mots" },
    { id: "y-en", zh: "代名詞 y 和 en", fr: "Les pronoms y et en", cat: "mots" },
    { id: "adverbes", zh: "-ment 副詞", fr: "Les adverbes en -ment", cat: "mots" },
    { id: "prepositions-temps", zh: "時間介系詞", fr: "Depuis, il y a, pendant, dans, en", cat: "mots" },
    { id: "verbes-prepositions", zh: "動詞後面接 à 或 de", fr: "Verbe + à / de + infinitif", cat: "mots" },
    { id: "comparatif", zh: "比較級與最高級", fr: "Le comparatif et le superlatif", cat: "phrase" },
    { id: "connecteurs-chrono", zh: "表示先後順序的連接詞", fr: "Les connecteurs chronologiques", cat: "phrase" },
  ],
  B1: [
    { id: "futur-simple", zh: "簡單未來式", fr: "Le futur simple", cat: "verbes" },
    { id: "conditionnel", zh: "條件式現在式", fr: "Le conditionnel présent", cat: "verbes" },
    { id: "plus-que-parfait", zh: "愈過去式", fr: "Le plus-que-parfait", cat: "verbes" },
    { id: "subjonctif", zh: "虛擬式現在式", fr: "Le subjonctif présent", cat: "verbes" },
    { id: "passif", zh: "被動語態", fr: "La voix passive", cat: "verbes" },
    { id: "place-pronoms", zh: "受詞代名詞的位置（COD／COI）", fr: "La place des pronoms", cat: "mots" },
    { id: "relatifs", zh: "關係代名詞", fr: "Les pronoms relatifs", cat: "mots" },
    { id: "pronoms-demonstratifs", zh: "指示代名詞", fr: "Les pronoms démonstratifs", cat: "mots" },
    { id: "pronoms-possessifs", zh: "所有格代名詞", fr: "Les pronoms possessifs", cat: "mots" },
    { id: "pronoms-interrogatifs", zh: "疑問代名詞", fr: "Les pronoms interrogatifs", cat: "mots" },
    { id: "indefinis", zh: "不定代名詞與不定形容詞", fr: "Les indéfinis", cat: "mots" },
    { id: "si-hypothese", zh: "si 條件句", fr: "L'hypothèse avec si", cat: "phrase" },
    { id: "cause-consequence", zh: "原因與結果", fr: "La cause et la conséquence", cat: "phrase" },
  ],
  B2: [
    { id: "conditionnel-passe", zh: "條件式過去式", fr: "Le conditionnel passé", cat: "verbes" },
    { id: "subjonctif-indicatif", zh: "虛擬式還是直陳式", fr: "Subjonctif ou indicatif", cat: "verbes" },
    { id: "gerondif", zh: "副動詞與現在分詞", fr: "Le gérondif et le participe présent", cat: "verbes" },
    { id: "relatifs-composes", zh: "複合關係代名詞", fr: "Les relatifs composés", cat: "mots" },
    { id: "pronoms-doubles", zh: "雙重受詞代名詞", fr: "Les doubles pronoms", cat: "mots" },
    { id: "prepositions-verbes", zh: "動詞與介系詞的搭配", fr: "Les constructions verbales", cat: "mots" },
    { id: "discours-indirect", zh: "間接引語", fr: "Le discours indirect", cat: "phrase" },
    { id: "connecteurs", zh: "邏輯連接詞", fr: "Les connecteurs logiques", cat: "phrase" },
    { id: "opposition-concession", zh: "對立與讓步", fr: "L'opposition et la concession", cat: "phrase" },
    { id: "expression-but", zh: "目的的表達", fr: "L'expression du but", cat: "phrase" },
    { id: "articulateurs", zh: "組織文章的連接詞", fr: "Les articulateurs du discours", cat: "phrase" },
  ],
  C1: [
    { id: "futur-anterieur", zh: "先未來式", fr: "Le futur antérieur", cat: "verbes" },
    { id: "accord-participe", zh: "過去分詞的配合", fr: "L'accord du participe passé", cat: "verbes" },
    { id: "nominalisation", zh: "名詞化", fr: "La nominalisation", cat: "mots" },
    { id: "prepositions-avancees", zh: "進階介系詞片語", fr: "Les locutions prépositionnelles", cat: "mots" },
    { id: "conjonctions-subjonctif", zh: "接虛擬式的連接詞", fr: "Les conjonctions + subjonctif", cat: "phrase" },
    { id: "mise-en-relief", zh: "強調句", fr: "La mise en relief", cat: "phrase" },
    { id: "negation-avancee", zh: "進階否定與贅詞 ne", fr: "La négation complexe et le ne explétif", cat: "phrase" },
    { id: "hypothese-avancee", zh: "進階的假設表達", fr: "L'hypothèse : au cas où, à supposer que…", cat: "phrase" },
    { id: "argumentation", zh: "論證用的連接詞", fr: "Les connecteurs de l'argumentation", cat: "phrase" },
  ],
  C2: [
    { id: "passe-simple", zh: "簡單過去式", fr: "Le passé simple", cat: "verbes" },
    { id: "subjonctif-imparfait", zh: "虛擬式未完成過去式", fr: "Le subjonctif imparfait", cat: "verbes" },
    { id: "expressions", zh: "慣用語", fr: "Les expressions idiomatiques", cat: "mots" },
    { id: "registres", zh: "語域轉換", fr: "Les registres de langue", cat: "mots" },
    { id: "collocations", zh: "搭配詞與近義詞", fr: "Collocations et nuances lexicales", cat: "mots" },
    { id: "inversion", zh: "文體倒裝", fr: "L'inversion stylistique", cat: "phrase" },
    { id: "concession-litteraire", zh: "文學語體的讓步句型", fr: "Si… que, quel que, tout… que", cat: "phrase" },
    { id: "connecteurs-soutenus", zh: "正式語體的連接詞", fr: "Les connecteurs soutenus", cat: "phrase" },
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

/** 難度的法文說明（和 DIFFICULTY_FR 相同，供介面使用） */
export const DIFFICULTY_LABELS: Record<string, string> = {
  all: "全部",
  "1": "基礎",
  "2": "標準",
  "3": "進階",
};

export function topicName(level: Level, by: "grammar" | "theme", id: string, lang: "zh" | "fr" = "zh"): string {
  const list = by === "grammar" ? GRAMMAR[level] : THEMES;
  const t = list.find((x) => x.id === id);
  return (lang === "fr" ? t?.fr : t?.zh) ?? id;
}

const GRAMMAR_IDS = new Set(Object.values(GRAMMAR).flatMap((l) => l.map((t) => t.id)));

/** 是不是題庫裡的文法點（每個文法點都有一份文法筆記） */
export function isGrammarId(id: string): boolean {
  return GRAMMAR_IDS.has(id);
}

/** 文法點的中文名稱（不分等級） */
export function grammarName(id: string, lang: "zh" | "fr" = "zh"): string {
  for (const list of Object.values(GRAMMAR)) {
    const t = list.find((x) => x.id === id);
    if (t) return lang === "fr" ? t.fr : t.zh;
  }
  return id;
}
