// 檢查題庫格式：npm run validate
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { GRAMMAR, LEVELS, THEMES } from "../lib/taxonomy.ts";
import { NOTES_A1 } from "../data/learn/grammar-a1.ts";
import { NOTES_A2 } from "../data/learn/grammar-a2.ts";
import { NOTES_B1 } from "../data/learn/grammar-b1.ts";
import { NOTES_B2 } from "../data/learn/grammar-b2.ts";
import { NOTES_C1 } from "../data/learn/grammar-c1.ts";
import { NOTES_C2 } from "../data/learn/grammar-c2.ts";
import { PATTERNS } from "../data/learn/patterns.ts";
import { VOCAB } from "../data/learn/vocab.ts";
import { MORE_PHRASES_1, VOCAB_EX_1 } from "../data/learn/vocab-ex-1.ts";
import { MORE_PHRASES_2, VOCAB_EX_2 } from "../data/learn/vocab-ex-2.ts";
import { CLASSICS } from "../data/readings/classics.ts";
import { ORIGINALS } from "../data/readings/originals.ts";
import { MORE_A1 } from "../data/learn/more-a1.ts";
import { MORE_A2 } from "../data/learn/more-a2.ts";
import { MORE_B1 } from "../data/learn/more-b1.ts";
import { MORE_B2 } from "../data/learn/more-b2.ts";
import { MORE_C1 } from "../data/learn/more-c1.ts";
import { MORE_C2 } from "../data/learn/more-c2.ts";
import { MORE_PATTERNS } from "../data/learn/more-patterns.ts";

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

    if (!LEVELS.some((l) => l.id === q.level)) errors.push(`${at}：level 不正確`);
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

// ===== 模考 =====
const examDir = join(root, "data/exams");
const examsSrc = readFileSync(join(root, "lib/exams.ts"), "utf8");
const KINDS = ["delf", "dalf", "tcf", "tef", "affaires", "final"];
const SECTIONS = ["listening", "reading", "structure", "writing", "bank"];
let examCount = 0;
for (const file of walk(examDir)) {
  const rel = relative(root, file);
  if (!examsSrc.includes("@/" + rel.replace(/\\/g, "/"))) errors.push(`${rel}：沒有加進 lib/exams.ts`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let e: any;
  try {
    e = JSON.parse(readFileSync(file, "utf8"));
  } catch (err) {
    errors.push(`${rel}：JSON 格式錯誤 ${(err as Error).message}`);
    continue;
  }
  examCount++;
  const at = `${rel}`;
  if (!KINDS.includes(e.exam)) errors.push(`${at}：exam 種類不正確`);
  if (!LEVELS.some((l) => l.id === e.level)) errors.push(`${at}：level 不正確`);
  if (!e.title || !e.minutes || !Array.isArray(e.sections) || e.sections.length === 0) errors.push(`${at}：缺少標題、時間或段落`);
  for (const sec of e.sections ?? []) {
    if (!SECTIONS.includes(sec.kind)) errors.push(`${at}：段落種類「${sec.kind}」不正確`);
    if (sec.kind === "writing") {
      const w = sec.writing;
      if (!w?.prompt || !w?.model || !Array.isArray(w?.rubric) || !(w?.minWords > 0)) errors.push(`${at}：寫作題缺少題目、範文、評分項目或字數`);
      continue;
    }
    if (sec.kind === "bank") {
      if (!sec.bank) errors.push(`${at}：題庫段落缺少題數`);
      continue;
    }
    if ((sec.kind === "listening" || sec.kind === "reading") && !sec.passage?.text) errors.push(`${at}：${sec.kind} 段落缺少文章`);
    if (sec.kind === "listening" && !sec.passage?.speak) errors.push(`${at}：聽力段落要設定 speak`);
    if (!Array.isArray(sec.questions) || sec.questions.length === 0) errors.push(`${at}：段落沒有題目`);
    for (const q of sec.questions ?? []) {
      const qa = `${at} ${q.id}`;
      if (!q.id) errors.push(`${qa}：缺少 id`);
      else if (ids.has(q.id)) errors.push(`${qa}：id 重複（也出現在 ${ids.get(q.id)}）`);
      else ids.set(q.id, rel);
      if (!q.instruction || !q.explanation || typeof q.stem !== "string") errors.push(`${qa}：缺少說明、解析或題幹`);
      if (q.type === "choice") {
        if (!Array.isArray(q.options) || q.options.length < 2 || new Set(q.options).size !== q.options.length) errors.push(`${qa}：選項不正確或重複`);
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options?.length ?? 0)) errors.push(`${qa}：answer 索引超出範圍`);
      } else if (q.type === "fill" || q.type === "short") {
        if (!Array.isArray(q.answers) || q.answers.length === 0) errors.push(`${qa}：缺少 answers`);
      } else errors.push(`${qa}：type 不正確`);
    }
  }
}
console.log(`模考 ${examCount} 份。`);

// 學習區：每個文法點都要有筆記，每個主題都要有單字，表格欄數要一致
{
  const notes = [...NOTES_A1, ...NOTES_A2, ...NOTES_B1, ...NOTES_B2, ...NOTES_C1, ...NOTES_C2];
  const noteIds = new Set(notes.map((n) => n.id));
  const grammarIds = new Set(Object.values(GRAMMAR).flatMap((l) => l.map((t) => t.id)));
  for (const g of grammarIds) if (!noteIds.has(g)) errors.push(`文法筆記：缺少 ${g}`);
  for (const n of notes) if (!grammarIds.has(n.id)) errors.push(`文法筆記：${n.id} 不是文法點`);
  if (noteIds.size !== notes.length) errors.push("文法筆記：id 重複");
  const rules = [...notes.flatMap((n) => n.rules.map((r) => [n.id, r] as const)), ...PATTERNS.flatMap((p) => p.sections.map((r) => [p.id, r] as const))];
  for (const [id, r] of rules) {
    if (!r.d && !r.table && !r.ex) errors.push(`學習區 ${id}「${r.t}」：沒有內容`);
    for (const row of r.table?.rows ?? []) if (row.length !== r.table!.head.length) errors.push(`學習區 ${id}「${r.t}」：表格欄數不一致`);
  }
  for (const p of PATTERNS) for (const g of p.related ?? []) if (!grammarIds.has(g)) errors.push(`句型 ${p.id}：相關文法 ${g} 不存在`);
  for (const t of THEMES) if (!VOCAB.some((v) => v.id === t.id)) errors.push(`主題單字：缺少 ${t.id}`);
  const more = { ...MORE_A1, ...MORE_A2, ...MORE_B1, ...MORE_B2, ...MORE_C1, ...MORE_C2 };
  for (const g of grammarIds) if ((more[g]?.length ?? 0) < 8) errors.push(`更多例句：${g} 少於 8 句`);
  for (const k of Object.keys(more)) if (!grammarIds.has(k)) errors.push(`更多例句：${k} 不是文法點`);
  for (const p of PATTERNS) if ((MORE_PATTERNS[p.id]?.length ?? 0) < 6) errors.push(`更多例句：句型 ${p.id} 少於 6 句`);
  for (const k of Object.keys(MORE_PATTERNS)) if (!PATTERNS.some((p) => p.id === k)) errors.push(`更多例句：${k} 不是句型頁`);
  const exList = [...Object.values(more), ...Object.values(MORE_PATTERNS)].flat();
  for (const [fr, zh] of exList) {
    if (!fr || !zh) errors.push(`更多例句：有空白的例句（${fr}）`);
    if ((fr.match(/\*\*/g)?.length ?? 0) % 2) errors.push(`更多例句：粗體標記沒有成對「${fr}」`);
  }
  const vex: Record<string, Record<string, unknown>> = { ...VOCAB_EX_1, ...VOCAB_EX_2 };
  let vexCount = 0;
  for (const v of VOCAB) {
    const words = new Set(v.groups.flatMap((g) => g.words.map((w) => w.fr)));
    for (const g of v.groups) for (const w of g.words) {
      if (w.ex || vex[v.id]?.[w.fr]) vexCount++;
      else errors.push(`主題單字 ${v.id}：「${w.fr}」沒有例句`);
    }
    for (const k of Object.keys(vex[v.id] ?? {})) if (!words.has(k)) errors.push(`主題單字 ${v.id}：例句對應的「${k}」不存在`);
  }
  for (const k of Object.keys(vex)) if (!VOCAB.some((v) => v.id === k)) errors.push(`主題單字：${k} 不是主題`);
  const phraseCount = VOCAB.reduce((s, v) => s + (v.phrases?.length ?? 0), 0) + Object.values({ ...MORE_PHRASES_1, ...MORE_PHRASES_2 }).flat().length;
  const all = JSON.stringify([notes, PATTERNS, VOCAB, more, MORE_PATTERNS, vex, MORE_PHRASES_1, MORE_PHRASES_2]);
  if (all.includes("—")) errors.push("學習區：請不要用破折號");
  const words = VOCAB.reduce((s, v) => s + v.groups.reduce((a, g) => a + g.words.length, 0), 0);
  console.log(`學習區：文法筆記 ${notes.length} 份、句型整理 ${PATTERNS.length} 份、更多例句 ${exList.length} 句、單字 ${words} 個（${vexCount} 個有例句）、主題常用句 ${phraseCount} 句。`);
}

// 閱讀：標記的單字都要有解釋、解釋都要用到、測驗題選項不重複、原創文章要有查證來源
{
  const readings = [...ORIGINALS, ...CLASSICS];
  const ids = new Set<string>();
  const levelIds = new Set(LEVELS.map((l) => l.id));
  for (const r of readings) {
    const at = `閱讀 ${r.id}`;
    if (ids.has(r.id)) errors.push(`${at}：id 重複`);
    ids.add(r.id);
    if (!levelIds.has(r.level)) errors.push(`${at}：等級不正確`);
    if (!themeIds.has(r.theme)) errors.push(`${at}：主題 ${r.theme} 不存在`);
    if (r.kind === "classic" && !r.source?.url) errors.push(`${at}：經典作品要寫出處`);
    if (r.kind === "original" && r.refs?.some((f) => !f.url || !f.title)) errors.push(`${at}：參考資料缺少標題或網址`);
    const used = new Set<string>();
    for (const [fr, zh] of r.paragraphs.flat()) {
      if (!fr || !zh) errors.push(`${at}：有空白的句子`);
      if ((fr.match(/\[\[/g)?.length ?? 0) !== (fr.match(/\]\]/g)?.length ?? 0)) errors.push(`${at}：標記沒有成對「${fr.slice(0, 30)}」`);
      for (const m of fr.matchAll(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g)) {
        const k = m[2] ?? m[1];
        used.add(k);
        if (!r.glossary[k]) errors.push(`${at}：「${k}」沒有單字解釋`);
      }
    }
    for (const k of Object.keys(r.glossary)) if (!used.has(k)) errors.push(`${at}：單字解釋「${k}」沒有在文中標出`);
    if (r.quiz.length < 4) errors.push(`${at}：閱讀測驗少於 4 題`);
    for (const q of r.quiz) {
      const fr = q.options.map((o) => o[0]);
      if (fr.length < 3 || new Set(fr).size !== fr.length) errors.push(`${at}：「${q.q}」選項太少或重複`);
      if (!q.qZh || q.options.some((o) => !o[1])) errors.push(`${at}：「${q.q}」缺少中文翻譯`);
    }
    if (JSON.stringify(r).includes("—")) errors.push(`${at}：請不要用破折號`);
  }
  console.log(`閱讀：${readings.length} 篇（原創 ${ORIGINALS.length}、經典 ${CLASSICS.length}）。`);
}

for (const w of warnings) console.warn("⚠️ ", w);
for (const e of errors) console.error("❌", e);
console.log(`\n共 ${total} 題，${errors.length} 個錯誤，${warnings.length} 個提醒。`);
process.exit(errors.length ? 1 : 0);
