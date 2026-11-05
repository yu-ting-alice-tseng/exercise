export type FillResult = "correct" | "accent" | "wrong" | "empty";

/** 統一大小寫、空白、撇號、引號，方便比對 */
export function normalize(s: string): string {
  return s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[«»“”]/g, '"')
    .replace(/\s*'\s*/g, "'")
    .replace(/[.!?;:,]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** 去掉重音符號，用來判斷「只差重音」 */
export function stripAccents(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae");
}

export function checkFill(input: string, answers: string[]): FillResult {
  const given = normalize(input);
  if (!given) return "empty";
  const accepted = answers.map(normalize);
  if (accepted.includes(given)) return "correct";
  const bare = stripAccents(given);
  if (accepted.some((a) => stripAccents(a) === bare)) return "accent";
  return "wrong";
}
