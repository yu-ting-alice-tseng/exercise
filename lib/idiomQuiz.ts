import { mulberry32, shuffle } from "./random";
import type { StudyItem } from "./study";

export type QMode = "choice" | "fill" | "mix";

export interface ChoiceQ {
  type: "choice";
  item: StudyItem;
  /** fr2zh＝看法文選意思；zh2fr＝看意思選法文 */
  dir: "fr2zh" | "zh2fr";
  prompt: string;
  options: string[];
  answer: number;
}

export interface FillQ {
  type: "fill";
  item: StudyItem;
}

export type IdiomQ = ChoiceQ | FillQ;

function choiceQ(it: StudyItem, dir: ChoiceQ["dir"], all: StudyItem[], rand: () => number): ChoiceQ {
  const ok = (o: StudyItem) => o.id !== it.id && o.zh !== it.zh && o.fr !== it.fr;
  // 干擾選項先從同一組挑，不夠再從其他組補
  const same = shuffle(all.filter((o) => ok(o) && o.group === it.group), rand);
  const other = shuffle(all.filter((o) => ok(o) && o.group !== it.group), rand);
  const seen = new Set<string>([dir === "fr2zh" ? it.zh : it.fr]);
  const wrong: StudyItem[] = [];
  for (const o of [...same, ...other]) {
    const key = dir === "fr2zh" ? o.zh : o.fr;
    if (seen.has(key)) continue;
    seen.add(key);
    wrong.push(o);
    if (wrong.length === 3) break;
  }
  const right = dir === "fr2zh" ? it.zh : it.fr;
  const opts = shuffle([right, ...wrong.map((o) => (dir === "fr2zh" ? o.zh : o.fr))], rand);
  return { type: "choice", item: it, dir, prompt: dir === "fr2zh" ? it.fr : it.zh, options: opts, answer: opts.indexOf(right) };
}

/** 出題：選擇題一半看法文選意思、一半看意思選法文；混合模式選擇和填空各半 */
export function buildStudyQuiz(items: StudyItem[], all: StudyItem[], mode: QMode, seed: number): IdiomQ[] {
  const rand = mulberry32(seed);
  return shuffle(items, rand).map((it, i) => {
    const fill = mode === "fill" || (mode === "mix" && i % 2 === 1);
    if (fill) return { type: "fill", item: it };
    return choiceQ(it, i % 4 < 2 ? "fr2zh" : "zh2fr", all, rand);
  });
}

/* ===== 填空題批改 ===== */

const stripAccents = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’`´]/g, "'")
    .replace(/\b(qqn|qqch)\b/g, " ")
    .replace(/[.,!?;:«»"…()]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s*'\s*/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** 所有可以接受的答案：斜線分開的寫法都算，括號裡的字可寫可不寫 */
export function acceptedAnswers(fr: string): string[] {
  const out = new Set<string>();
  for (const part of fr.split(/\s+\/\s+/)) {
    out.add(norm(part.replace(/\([^)]*\)/g, " ")));
    // 字中間的括號（un(e)、crevé(e)）接起來：une、crevée
    out.add(norm(part.replace(/(\p{L})\(([^)]*)\)/gu, "$1$2")));
    out.add(norm(part));
  }
  return [...out].filter(Boolean);
}

const ART = /^(le |la |les |l'|un |une |des |du |de la |de l')/;

/** c＝正確；a＝只有重音不同；r＝只漏了或寫錯冠詞；w＝錯 */
export function gradeFill(input: string, fr: string): "c" | "a" | "r" | "w" {
  const got = norm(input);
  if (!got) return "w";
  const answers = acceptedAnswers(fr);
  if (answers.includes(got)) return "c";
  if (answers.some((a) => stripAccents(a) === stripAccents(got))) return "a";
  const bare = (x: string) => stripAccents(x).replace(ART, "");
  if (answers.some((a) => ART.test(a) && bare(a) === bare(got))) return "r";
  return "w";
}

/** 提示：每個字只給第一個字母，例如 p____ u_ l____ */
export function fillHint(fr: string): string {
  const main = fr.split(/\s+\/\s+/)[0].replace(/\([^)]*\)/g, "").trim();
  return main
    .split(/\s+/)
    .map((w) => {
      const letters = [...w];
      let first = true;
      return letters
        .map((ch) => {
          if (!/\p{L}/u.test(ch)) return ch;
          if (first) {
            first = false;
            return ch;
          }
          return "_";
        })
        .join("");
    })
    .join(" ");
}

/* ===== 匯出測驗卷 ===== */

const LETTERS = ["A", "B", "C", "D"];

export function quizToText(qs: IdiomQ[], title: string): string {
  const lines: string[] = [title, "", "【題目】", ""];
  qs.forEach((q, i) => {
    const n = `${i + 1}.`;
    if (q.type === "choice") {
      lines.push(`${n} ${q.dir === "fr2zh" ? "這句話是什麼意思？" : "哪一句法文是這個意思？"}`);
      lines.push(`   ${q.prompt}`);
      q.options.forEach((o, k) => lines.push(`   (${LETTERS[k]}) ${o}`));
    } else {
      lines.push(`${n} 寫出法文：${q.item.zh}${q.item.eq ? `（類似中文：${q.item.eq}）` : ""}`);
      if (q.item.ex) lines.push(`   例句：${q.item.ex[1]}`);
      lines.push(`   提示：${fillHint(q.item.fr)}`);
      lines.push("   答：________________________________");
    }
    lines.push("");
  });
  lines.push("", "【解答】", "");
  qs.forEach((q, i) => {
    const ans = q.type === "choice" ? `(${LETTERS[q.answer]}) ${q.options[q.answer]}` : q.item.fr;
    lines.push(`${i + 1}. ${ans}`);
    if (q.item.ex) lines.push(`   例：${q.item.ex[0]}／${q.item.ex[1]}`);
  });
  return lines.join("\n");
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** 可以列印或存成 PDF 的測驗卷：題目一頁、解答另起一頁 */
export function quizToHtml(qs: IdiomQ[], title: string, sub: string): string {
  const items = qs
    .map((q) => {
      if (q.type === "choice") {
        const head = q.dir === "fr2zh" ? "這句話是什麼意思？" : "哪一句法文是這個意思？";
        const opts = q.options.map((o, k) => `<li><b>${LETTERS[k]}</b>　<span lang="${q.dir === "zh2fr" ? "fr" : "zh-Hant"}">${esc(o)}</span></li>`).join("");
        return `<li class="q"><div class="h">${head}</div><div class="p" lang="${q.dir === "fr2zh" ? "fr" : "zh-Hant"}">${esc(q.prompt)}</div><ol class="o">${opts}</ol></li>`;
      }
      return `<li class="q"><div class="h">寫出法文</div><div class="p">${esc(q.item.zh)}${q.item.eq ? `<span class="eq">類似中文：${esc(q.item.eq)}</span>` : ""}</div>${q.item.ex ? `<div class="ex">例句：${esc(q.item.ex[1])}</div>` : ""}<div class="hint">提示：<span lang="fr">${esc(fillHint(q.item.fr))}</span></div><div class="line"></div></li>`;
    })
    .join("");
  const keys = qs
    .map((q) => {
      const a = q.type === "choice" ? `${LETTERS[q.answer]}　${esc(q.options[q.answer])}` : `<span lang="fr">${esc(q.item.fr)}</span>`;
      return `<li>${a}${q.item.ex ? `<div class="ex" lang="fr">${esc(q.item.ex[0])}</div>` : ""}</li>`;
    })
    .join("");
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title>
<style>
body{font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif;color:#1d2433;margin:24px auto;max-width:760px;padding:0 16px;line-height:1.6;background:#fff}
h1{font-size:22px;margin:0}.sub{color:#667;font-size:13px;margin:4px 0 16px}
.name{border-bottom:1px solid #999;display:inline-block;min-width:180px;margin-left:6px}
ol.qs{padding-left:24px}.q{margin:0 0 18px;break-inside:avoid}.h{font-size:12px;color:#667}.p{font-size:17px;font-weight:600}
.eq{display:block;font-size:13px;font-weight:400;color:#667}.ex{font-size:13px;color:#556}.hint{font-size:13px;color:#556;letter-spacing:.05em}
.line{border-bottom:1px solid #999;height:28px;margin-top:4px}ol.o{list-style:none;padding:0;margin:4px 0 0;display:grid;grid-template-columns:1fr 1fr;gap:2px 16px}
.key{break-before:page;margin-top:32px}.key li{margin-bottom:6px}button{margin:0 0 16px;padding:8px 14px;font-size:14px}
@media print{button{display:none}body{margin:0}}
@media (max-width:520px){ol.o{grid-template-columns:1fr}}
</style></head><body>
<button onclick="window.print()">列印／存成 PDF</button>
<h1>${esc(title)}</h1><div class="sub">${esc(sub)}　姓名<span class="name"></span>　得分<span class="name" style="min-width:60px"></span></div>
<ol class="qs">${items}</ol>
<section class="key"><h1>解答</h1><ol>${keys}</ol></section>
</body></html>`;
}
