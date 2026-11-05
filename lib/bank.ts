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
import b2ConditionnelPasse from "@/data/questions/b2/conditionnel-passe.json";
import b2SubjonctifIndicatif from "@/data/questions/b2/subjonctif-indicatif.json";
import b2Gerondif from "@/data/questions/b2/gerondif.json";
import b2RelatifsComposes from "@/data/questions/b2/relatifs-composes.json";
import b2DiscoursIndirect from "@/data/questions/b2/discours-indirect.json";
import b2Connecteurs from "@/data/questions/b2/connecteurs.json";
import b2PronomsDoubles from "@/data/questions/b2/pronoms-doubles.json";
import c1FuturAnterieur from "@/data/questions/c1/futur-anterieur.json";
import c1ConjonctionsSubjonctif from "@/data/questions/c1/conjonctions-subjonctif.json";
import c1AccordParticipe from "@/data/questions/c1/accord-participe.json";
import c1MiseEnRelief from "@/data/questions/c1/mise-en-relief.json";
import c1Nominalisation from "@/data/questions/c1/nominalisation.json";
import c1NegationAvancee from "@/data/questions/c1/negation-avancee.json";
import c2PasseSimple from "@/data/questions/c2/passe-simple.json";
import c2SubjonctifImparfait from "@/data/questions/c2/subjonctif-imparfait.json";
import c2Inversion from "@/data/questions/c2/inversion.json";
import c2Expressions from "@/data/questions/c2/expressions.json";
import c2Registres from "@/data/questions/c2/registres.json";
import c2Collocations from "@/data/questions/c2/collocations.json";

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
  b2ConditionnelPasse,
  b2SubjonctifIndicatif,
  b2Gerondif,
  b2RelatifsComposes,
  b2DiscoursIndirect,
  b2Connecteurs,
  b2PronomsDoubles,
  c1FuturAnterieur,
  c1ConjonctionsSubjonctif,
  c1AccordParticipe,
  c1MiseEnRelief,
  c1Nominalisation,
  c1NegationAvancee,
  c2PasseSimple,
  c2SubjonctifImparfait,
  c2Inversion,
  c2Expressions,
  c2Registres,
  c2Collocations,
];

export const BANK: Question[] = FILES.flat() as Question[];
