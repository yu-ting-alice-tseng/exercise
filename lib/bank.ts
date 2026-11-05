import type { Question } from "./types";

// 新增題庫檔案時，在這裡加一行 import，並加進 FILES。
// `npm run validate` 會檢查有沒有漏掉的檔案。
import a1Articles from "@/data/questions/a1/articles.json";
import a1Partitifs from "@/data/questions/a1/partitifs.json";
import a1ArticlesContractes from "@/data/questions/a1/articles-contractes.json";
import a1GenreNombre from "@/data/questions/a1/genre-nombre.json";
import a1Adjectifs from "@/data/questions/a1/adjectifs.json";
import a1Possessifs from "@/data/questions/a1/possessifs.json";
import a1Demonstratifs from "@/data/questions/a1/demonstratifs.json";
import a1PronomsToniques from "@/data/questions/a1/pronoms-toniques.json";
import a1PrepositionsLieux from "@/data/questions/a1/prepositions-lieux.json";
import a1Quantites from "@/data/questions/a1/quantites.json";
import a1EtreAvoir from "@/data/questions/a1/etre-avoir.json";
import a1PresentEr from "@/data/questions/a1/present-er.json";
import a1FuturProche from "@/data/questions/a1/futur-proche.json";
import a1Negation from "@/data/questions/a1/negation.json";
import a1Questions from "@/data/questions/a1/questions.json";
import a1ConnecteursA1 from "@/data/questions/a1/connecteurs-a1.json";
import a2PasseCompose from "@/data/questions/a2/passe-compose.json";
import a2Imparfait from "@/data/questions/a2/imparfait.json";
import a2Pronominaux from "@/data/questions/a2/pronominaux.json";
import a2Imperatif from "@/data/questions/a2/imperatif.json";
import a2PasseRecent from "@/data/questions/a2/passe-recent.json";
import a2CodCoi from "@/data/questions/a2/cod-coi.json";
import a2YEn from "@/data/questions/a2/y-en.json";
import a2Adverbes from "@/data/questions/a2/adverbes.json";
import a2PrepositionsTemps from "@/data/questions/a2/prepositions-temps.json";
import a2VerbesPrepositions from "@/data/questions/a2/verbes-prepositions.json";
import a2Comparatif from "@/data/questions/a2/comparatif.json";
import a2ConnecteursChrono from "@/data/questions/a2/connecteurs-chrono.json";
import b1FuturSimple from "@/data/questions/b1/futur-simple.json";
import b1Conditionnel from "@/data/questions/b1/conditionnel.json";
import b1PlusQueParfait from "@/data/questions/b1/plus-que-parfait.json";
import b1Subjonctif from "@/data/questions/b1/subjonctif.json";
import b1Passif from "@/data/questions/b1/passif.json";
import b1PlacePronoms from "@/data/questions/b1/place-pronoms.json";
import b1Relatifs from "@/data/questions/b1/relatifs.json";
import b1PronomsDemonstratifs from "@/data/questions/b1/pronoms-demonstratifs.json";
import b1PronomsPossessifs from "@/data/questions/b1/pronoms-possessifs.json";
import b1PronomsInterrogatifs from "@/data/questions/b1/pronoms-interrogatifs.json";
import b1Indefinis from "@/data/questions/b1/indefinis.json";
import b1SiHypothese from "@/data/questions/b1/si-hypothese.json";
import b1CauseConsequence from "@/data/questions/b1/cause-consequence.json";
import b2ConditionnelPasse from "@/data/questions/b2/conditionnel-passe.json";
import b2SubjonctifIndicatif from "@/data/questions/b2/subjonctif-indicatif.json";
import b2Gerondif from "@/data/questions/b2/gerondif.json";
import b2RelatifsComposes from "@/data/questions/b2/relatifs-composes.json";
import b2PronomsDoubles from "@/data/questions/b2/pronoms-doubles.json";
import b2PrepositionsVerbes from "@/data/questions/b2/prepositions-verbes.json";
import b2DiscoursIndirect from "@/data/questions/b2/discours-indirect.json";
import b2Connecteurs from "@/data/questions/b2/connecteurs.json";
import b2OppositionConcession from "@/data/questions/b2/opposition-concession.json";
import b2ExpressionBut from "@/data/questions/b2/expression-but.json";
import b2Articulateurs from "@/data/questions/b2/articulateurs.json";
import c1FuturAnterieur from "@/data/questions/c1/futur-anterieur.json";
import c1AccordParticipe from "@/data/questions/c1/accord-participe.json";
import c1Nominalisation from "@/data/questions/c1/nominalisation.json";
import c1PrepositionsAvancees from "@/data/questions/c1/prepositions-avancees.json";
import c1ConjonctionsSubjonctif from "@/data/questions/c1/conjonctions-subjonctif.json";
import c1MiseEnRelief from "@/data/questions/c1/mise-en-relief.json";
import c1NegationAvancee from "@/data/questions/c1/negation-avancee.json";
import c1HypotheseAvancee from "@/data/questions/c1/hypothese-avancee.json";
import c1Argumentation from "@/data/questions/c1/argumentation.json";
import c2PasseSimple from "@/data/questions/c2/passe-simple.json";
import c2SubjonctifImparfait from "@/data/questions/c2/subjonctif-imparfait.json";
import c2Expressions from "@/data/questions/c2/expressions.json";
import c2Registres from "@/data/questions/c2/registres.json";
import c2Collocations from "@/data/questions/c2/collocations.json";
import c2Inversion from "@/data/questions/c2/inversion.json";
import c2ConcessionLitteraire from "@/data/questions/c2/concession-litteraire.json";
import c2ConnecteursSoutenus from "@/data/questions/c2/connecteurs-soutenus.json";

const FILES = [
  a1Articles,
  a1Partitifs,
  a1ArticlesContractes,
  a1GenreNombre,
  a1Adjectifs,
  a1Possessifs,
  a1Demonstratifs,
  a1PronomsToniques,
  a1PrepositionsLieux,
  a1Quantites,
  a1EtreAvoir,
  a1PresentEr,
  a1FuturProche,
  a1Negation,
  a1Questions,
  a1ConnecteursA1,
  a2PasseCompose,
  a2Imparfait,
  a2Pronominaux,
  a2Imperatif,
  a2PasseRecent,
  a2CodCoi,
  a2YEn,
  a2Adverbes,
  a2PrepositionsTemps,
  a2VerbesPrepositions,
  a2Comparatif,
  a2ConnecteursChrono,
  b1FuturSimple,
  b1Conditionnel,
  b1PlusQueParfait,
  b1Subjonctif,
  b1Passif,
  b1PlacePronoms,
  b1Relatifs,
  b1PronomsDemonstratifs,
  b1PronomsPossessifs,
  b1PronomsInterrogatifs,
  b1Indefinis,
  b1SiHypothese,
  b1CauseConsequence,
  b2ConditionnelPasse,
  b2SubjonctifIndicatif,
  b2Gerondif,
  b2RelatifsComposes,
  b2PronomsDoubles,
  b2PrepositionsVerbes,
  b2DiscoursIndirect,
  b2Connecteurs,
  b2OppositionConcession,
  b2ExpressionBut,
  b2Articulateurs,
  c1FuturAnterieur,
  c1AccordParticipe,
  c1Nominalisation,
  c1PrepositionsAvancees,
  c1ConjonctionsSubjonctif,
  c1MiseEnRelief,
  c1NegationAvancee,
  c1HypotheseAvancee,
  c1Argumentation,
  c2PasseSimple,
  c2SubjonctifImparfait,
  c2Expressions,
  c2Registres,
  c2Collocations,
  c2Inversion,
  c2ConcessionLitteraire,
  c2ConnecteursSoutenus,
];

export const BANK: Question[] = FILES.flat() as Question[];
