import type { Question } from "./types";

// 新增題庫檔案時，在這裡加一行 import，並加進 FILES。
// `npm run validate` 會檢查有沒有漏掉的檔案。
import a1Articles from "@/data/questions/a1/articles.json";
import a1Partitifs from "@/data/questions/a1/partitifs.json";
import a1GenreNombre from "@/data/questions/a1/genre-nombre.json";
import a1EtreAvoir from "@/data/questions/a1/etre-avoir.json";
import a1PresentEr from "@/data/questions/a1/present-er.json";
import a1Negation from "@/data/questions/a1/negation.json";
import a1Questions from "@/data/questions/a1/questions.json";
import a1Adjectifs from "@/data/questions/a1/adjectifs.json";
import a1Possessifs from "@/data/questions/a1/possessifs.json";
import a1FuturProche from "@/data/questions/a1/futur-proche.json";
import a2PasseCompose from "@/data/questions/a2/passe-compose.json";
import a2Imparfait from "@/data/questions/a2/imparfait.json";
import a2Pronominaux from "@/data/questions/a2/pronominaux.json";
import a2CodCoi from "@/data/questions/a2/cod-coi.json";
import a2YEn from "@/data/questions/a2/y-en.json";
import a2Comparatif from "@/data/questions/a2/comparatif.json";
import a2Imperatif from "@/data/questions/a2/imperatif.json";
import a2PasseRecent from "@/data/questions/a2/passe-recent.json";
import b1FuturSimple from "@/data/questions/b1/futur-simple.json";
import b1Conditionnel from "@/data/questions/b1/conditionnel.json";
import b1Relatifs from "@/data/questions/b1/relatifs.json";
import b1PlusQueParfait from "@/data/questions/b1/plus-que-parfait.json";
import b1SiHypothese from "@/data/questions/b1/si-hypothese.json";
import b1Subjonctif from "@/data/questions/b1/subjonctif.json";
import b1Passif from "@/data/questions/b1/passif.json";

const FILES = [
  a1Articles,
  a1Partitifs,
  a1GenreNombre,
  a1EtreAvoir,
  a1PresentEr,
  a1Negation,
  a1Questions,
  a1Adjectifs,
  a1Possessifs,
  a1FuturProche,
  a2PasseCompose,
  a2Imparfait,
  a2Pronominaux,
  a2CodCoi,
  a2YEn,
  a2Comparatif,
  a2Imperatif,
  a2PasseRecent,
  b1FuturSimple,
  b1Conditionnel,
  b1Relatifs,
  b1PlusQueParfait,
  b1SiHypothese,
  b1Subjonctif,
  b1Passif,
];

export const BANK: Question[] = FILES.flat() as Question[];
