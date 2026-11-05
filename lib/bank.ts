import type { Question } from "./types";

// 新增題庫檔案時，在這裡加一行 import，並加進 FILES。
// `npm run validate` 會檢查有沒有漏掉的檔案。
import a1Articles from "@/data/questions/a1/articles.json";
import a1EtreAvoir from "@/data/questions/a1/etre-avoir.json";
import a2PasseCompose from "@/data/questions/a2/passe-compose.json";
import b1FuturSimple from "@/data/questions/b1/futur-simple.json";

const FILES = [a1Articles, a1EtreAvoir, a2PasseCompose, b1FuturSimple];

export const BANK: Question[] = FILES.flat() as Question[];
