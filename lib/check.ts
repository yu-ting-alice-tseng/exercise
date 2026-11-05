export type CheckResult = "correct" | "accent" | "wrong" | "empty";

/** 統一大小寫、空白、撇號、œ，方便比對 */
export function normalize(s: string): string {
  return s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/\s*'\s*/g, "'")
    .replace(/[.!?;:,]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** 去掉重音符號，用來判斷「只差重音」 */
export function stripAccents(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function checkFill(input: string, answers: string[]): CheckResult {
  const given = normalize(input);
  if (!given) return "empty";
  const accepted = answers.map(normalize);
  if (accepted.includes(given)) return "correct";
  const bare = stripAccents(given);
  if (accepted.some((a) => stripAccents(a) === bare)) return "accent";
  return "wrong";
}

/* ===== 簡答題：整句比對，並標出不同的字 ===== */

export type TokenStatus = "ok" | "accent" | "wrong" | "missing";
export interface Token {
  text: string;
  status: TokenStatus;
}

export interface ShortCheck {
  result: CheckResult;
  /** 學生的句子，逐字標記 */
  mine: Token[];
  /** 最接近的參考答案，逐字標記漏掉的字 */
  reference: Token[];
  referenceText: string;
}

/** 斷字：去掉標點，撇號後面斷開（j'ai 變成 j' 和 ai），保留原本大小寫用來顯示 */
function tokenize(s: string): string[] {
  return s
    .normalize("NFC")
    .replace(/[’‘`´]/g, "'")
    .replace(/[.,!?;:«»"“”()…–—]/g, " ")
    .replace(/'\s*/g, "' ")
    .split(/\s+/)
    .filter(Boolean);
}

const key = (t: string) => normalize(t);
const bareKey = (t: string) => stripAccents(normalize(t));

/** 以「不計重音」的方式做最長共同子序列，回傳配對的索引 */
function lcs(a: string[], b: string[]): [number, number][] {
  const A = a.map(bareKey);
  const B = b.map(bareKey);
  const dp = Array.from({ length: A.length + 1 }, () => new Array<number>(B.length + 1).fill(0));
  for (let i = A.length - 1; i >= 0; i--)
    for (let j = B.length - 1; j >= 0; j--)
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const pairs: [number, number][] = [];
  let i = 0;
  let j = 0;
  while (i < A.length && j < B.length) {
    if (A[i] === B[j]) {
      pairs.push([i, j]);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return pairs;
}

export function checkShort(input: string, answers: string[]): ShortCheck {
  const mineTokens = tokenize(input);
  if (mineTokens.length === 0) {
    return { result: "empty", mine: [], reference: [], referenceText: answers[0] ?? "" };
  }

  // 找出最接近的參考答案
  let best = { score: -1, index: 0, pairs: [] as [number, number][], ref: [] as string[] };
  answers.forEach((ans, index) => {
    const ref = tokenize(ans);
    const pairs = lcs(mineTokens, ref);
    const score = (2 * pairs.length) / (mineTokens.length + ref.length);
    if (score > best.score) best = { score, index, pairs, ref };
  });

  const mine: Token[] = mineTokens.map((text) => ({ text, status: "wrong" }));
  const reference: Token[] = best.ref.map((text) => ({ text, status: "missing" }));
  for (const [i, j] of best.pairs) {
    const exact = key(mineTokens[i]) === key(best.ref[j]);
    mine[i].status = exact ? "ok" : "accent";
    reference[j].status = exact ? "ok" : "accent";
  }

  const allMatched = best.pairs.length === mineTokens.length && best.pairs.length === best.ref.length;
  const result: CheckResult = !allMatched
    ? "wrong"
    : mine.every((t) => t.status === "ok")
      ? "correct"
      : "accent";

  return { result, mine, reference, referenceText: answers[best.index] };
}

/** 把斷開的字接回句子（j' 後面不加空格） */
export function joinTokens<T extends { text: string }>(tokens: T[]): { token: T; space: boolean }[] {
  return tokens.map((token, i) => ({
    token,
    space: i < tokens.length - 1 && !token.text.endsWith("'"),
  }));
}
