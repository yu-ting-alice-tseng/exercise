/** 可以標為已學、排進間隔複習的學習項目（俗語、單字、對話裡的說法） */
export interface StudyItem {
  id: string;
  fr: string;
  zh: string;
  /** 中文裡意思相近的說法 */
  eq?: string;
  /** 填空題的額外提示（例如慣用語的字面意思） */
  lit?: string;
  ex?: [fr: string, zh: string];
  /** 出選擇題時，干擾選項從同一組挑 */
  group: string;
  /** 出處，例如主題名稱或對話標題 */
  from?: string;
}

export function slug(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** 例句裡用 ** 標出的重點拿掉 */
export const plainEx = (ex?: [string, string]): [string, string] | undefined => (ex ? [ex[0].replace(/\*\*/g, ""), ex[1].replace(/\*\*/g, "")] : undefined);

/* 編號規則：伺服器端產生題目、瀏覽器端標記已學都用同一套 */
export const vocabWordId = (theme: string, fr: string) => `${theme}:w:${slug(fr)}`;
export const vocabPhraseId = (theme: string, fr: string) => `${theme}:p:${slug(fr)}`;
export const dialoguePhraseId = (d: string, fr: string) => `${d}:p:${slug(fr)}`;
export const dialogueGlossId = (d: string, key: string) => `${d}:g:${slug(key)}`;
