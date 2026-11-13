/**
 * 把單字與對話轉成可以複習的項目（只在伺服器端用，結果以 props 傳給頁面）。
 */
import { DIALOGUES } from "./dialogues";
import type { Dialogue } from "./dialogueTypes";
import { VOCAB } from "./learn";
import { plainText } from "./readingText";
import { dialogueGlossId, dialoguePhraseId, plainEx, vocabPhraseId, vocabWordId, type StudyItem } from "./study";
import { THEMES } from "./taxonomy";


/** 主題單字與主題常用句 */
export function vocabStudyItems(): StudyItem[] {
  return VOCAB.flatMap((v) => {
    const from = THEMES.find((t) => t.id === v.id)?.zh;
    const words: StudyItem[] = v.groups.flatMap((g) =>
      g.words.map((w) => ({ id: vocabWordId(v.id, w.fr), fr: w.fr, zh: w.zh, ex: plainEx(w.ex), group: `${v.id}:w`, from })),
    );
    const phrases: StudyItem[] = (v.phrases ?? []).map(([fr, zh]) => ({ id: vocabPhraseId(v.id, fr), fr, zh, group: `${v.id}:p`, from }));
    return [...words, ...phrases];
  });
}


/** 一段對話的「實用說法」與單字表 */
export function dialogueItems(d: Dialogue): StudyItem[] {
  const phrases: StudyItem[] = d.phrases.flatMap((ph) =>
    ph.rows.map(([fr, zh]) => ({ id: dialoguePhraseId(d.id, fr), fr, zh, group: "phrase", from: `${d.title}・${ph.t}` })),
  );
  const glosses: StudyItem[] = Object.entries(d.glossary).map(([key, g]) => {
    const line = d.lines.find(([, fr]) => fr.includes(`[[${key}]]`) || fr.includes(`|${key}]]`));
    return {
      id: dialogueGlossId(d.id, key),
      fr: plainText(g.lemma),
      zh: g.zh,
      ex: line ? [plainText(line[1]), line[2]] : undefined,
      group: "gloss",
      from: d.title,
    };
  });
  return [...phrases, ...glosses];
}

export function dialogueStudyItems(): StudyItem[] {
  return DIALOGUES.flatMap(dialogueItems);
}
