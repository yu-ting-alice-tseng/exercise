// 檢查題庫格式：npm run validate
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { GRAMMAR, THEMES } from "../lib/taxonomy.ts";

const root = join(import.meta.dirname, "..");
const dir = join(root, "data/questions");
const bankSrc = readFileSync(join(root, "lib/bank.ts"), "utf8");
const themeIds = new Set(THEMES.map((t) => t.id));
const errors: string[] = [];
const warnings: string[] = [];
const ids = new Map<string, string>();
const stems = new Map<string, string>();
let total = 0;

function walk(d: string): string[] {
  return readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : e.name.endsWith(".json") ? [join(d, e.name)] : [],
  );
}

for (const file of walk(dir)) {
  const rel = relative(root, file);
  const importPath = "@/" + rel.replace(/\\/g, "/");
  if (!bankSrc.includes(importPath)) errors.push(`${rel}：沒有加進 lib/bank.ts`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let list: any[];
  try {
    list = JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    errors.push(`${rel}：JSON 格式錯誤 ${(e as Error).message}`);
    continue;
  }
  for (const q of list) {
    total++;
    const at = `${rel} ${q.id ?? "(沒有 id)"}`;
    if (!q.id) errors.push(`${at}：缺少 id`);
    else if (ids.has(q.id)) errors.push(`${at}：id 重複（也出現在 ${ids.get(q.id)}）`);
    else ids.set(q.id, rel);

    if (!["A1", "A2", "B1"].includes(q.level)) errors.push(`${at}：level 不正確`);
    else if (!GRAMMAR[q.level as "A1"].some((g) => g.id === q.grammar))
      errors.push(`${at}：grammar「${q.grammar}」不在 ${q.level} 的文法清單裡`);
    if (!Array.isArray(q.themes) || q.themes.length === 0) errors.push(`${at}：至少要有一個主題`);
    else for (const t of q.themes) if (!themeIds.has(t)) errors.push(`${at}：主題「${t}」不存在`);
    if (![1, 2, 3].includes(q.difficulty)) errors.push(`${at}：difficulty 要是 1、2、3`);
    for (const f of ["instruction", "explanation"]) if (!q[f]) errors.push(`${at}：缺少 ${f}`);
    if (typeof q.stem !== "string") errors.push(`${at}：stem 要是字串`);

    if (q.type === "choice") {
      if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`${at}：選項至少兩個`);
      else if (new Set(q.options).size !== q.options.length) errors.push(`${at}：選項重複`);
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options?.length ?? 0))
        errors.push(`${at}：answer 索引超出範圍`);
    } else if (q.type === "fill" || q.type === "short") {
      if (!Array.isArray(q.answers) || q.answers.length === 0) errors.push(`${at}：缺少 answers`);
      if (q.type === "fill" && !/_{3,}/.test(q.stem)) warnings.push(`${at}：填充題的題幹沒有 ___`);
    } else errors.push(`${at}：type 要是 choice、fill、short`);

    if (q.stem) {
      const key = q.stem.trim().toLowerCase();
      if (stems.has(key)) warnings.push(`${at}：題幹和 ${stems.get(key)} 相同`);
      else stems.set(key, q.id);
    }
  }
}

for (const w of warnings) console.warn("⚠️ ", w);
for (const e of errors) console.error("❌", e);
console.log(`\n共 ${total} 題，${errors.length} 個錯誤，${warnings.length} 個提醒。`);
process.exit(errors.length ? 1 : 0);
