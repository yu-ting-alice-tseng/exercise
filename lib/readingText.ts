/** 閱讀文章的文字處理（不含文章資料，讓瀏覽器端的程式比較小） */

/** [[字]] 或 [[字|鍵]] */
export const MARK = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

/** 去掉單字標記，用來朗讀和比對原文 */
export function plainText(fr: string): string {
  return fr.replace(MARK, (_, w: string) => w);
}

/** 標記對應的 glossary 鍵 */
export function glossKey(word: string, key?: string): string {
  return key ?? word;
}
