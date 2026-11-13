import { EXAM_KINDS } from "./examTypes";

/** 導覽列下拉選單與頁內跳轉用的區塊清單（href 含 #錨點） */
export interface SectionLink {
  href: string;
  zh: string;
  fr: string;
}

/** 學習頁的各區塊，頁面頂端的跳轉列也用這份 */
export const LEARN_SECTIONS: SectionLink[] = [
  { href: "#dialogues", zh: "情境對話", fr: "Dialogues" },
  { href: "#expressions", zh: "俗語諺語", fr: "Expressions" },
  { href: "#lectures", zh: "閱讀", fr: "Lectures" },
  { href: "#ecriture", zh: "寫作", fr: "Écriture" },
  { href: "#phrases", zh: "句型總整理", fr: "Fiches de synthèse" },
  { href: "#grammaire", zh: "文法筆記", fr: "Grammaire" },
  { href: "#vocabulaire", zh: "主題單字", fr: "Vocabulaire" },
];

const at = (page: string, list: SectionLink[]) => list.map((s) => ({ ...s, href: `${page}${s.href}` }));

export const NAV_SECTIONS: Record<string, SectionLink[]> = {
  "/": at("/", [
    { href: "#niveau", zh: "選擇等級", fr: "Niveau" },
    { href: "#contenu", zh: "練習範圍", fr: "Contenu" },
    { href: "#types", zh: "題型與題數", fr: "Types de questions" },
    { href: "#difficulte", zh: "難度", fr: "Difficulté" },
    { href: "#recent", zh: "最近的紀錄", fr: "Activité récente" },
  ]),
  "/learn/": at("/learn/", LEARN_SECTIONS),
  "/exam/": at("/exam/", [
    ...EXAM_KINDS.map((k) => ({ href: `#${k.id}`, zh: k.zh, fr: k.id === "affaires" || k.id === "final" ? k.fr : k.id.toUpperCase() })),
    { href: "#officiels", zh: "官方範例試題", fr: "Exemples officiels" },
  ]),
  "/review/": [
    { href: "/review/#a-reviser", zh: "今日待複習", fr: "À réviser aujourd’hui" },
    { href: "/review/#carnet", zh: "錯題本", fr: "Carnet d’erreurs" },
    { href: "/learn/expressions/#review", zh: "俗語複習", fr: "Révision des expressions" },
  ],
  "/stats/": at("/stats/", [
    { href: "#calendrier", zh: "學習日曆", fr: "Calendrier" },
    { href: "#temps", zh: "每天練習時間", fr: "Temps d’étude" },
    { href: "#faibles", zh: "最需要加強的文法點", fr: "Points à retravailler" },
    { href: "#revisions", zh: "複習狀態", fr: "État des révisions" },
    { href: "#seances", zh: "最近的練習", fr: "Séances récentes" },
    { href: "#sauvegarde", zh: "備份與搬移紀錄", fr: "Sauvegarder et transférer" },
  ]),
};

/** 登入後「我的」選單 */
export const ACCOUNT_SECTIONS: SectionLink[] = at("/account/", [
  { href: "#nom", zh: "顯示名稱", fr: "Nom affiché" },
  { href: "#synchro", zh: "雲端同步", fr: "Synchronisation" },
  { href: "#classes", zh: "我加入的班級", fr: "Mes classes" },
  { href: "#enseignant", zh: "老師專區", fr: "Espace enseignant" },
]);
