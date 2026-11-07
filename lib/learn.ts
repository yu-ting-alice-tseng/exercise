import { NOTES_A1 } from "@/data/learn/grammar-a1";
import { NOTES_A2 } from "@/data/learn/grammar-a2";
import { NOTES_B1 } from "@/data/learn/grammar-b1";
import { NOTES_B2 } from "@/data/learn/grammar-b2";
import { NOTES_C1 } from "@/data/learn/grammar-c1";
import { NOTES_C2 } from "@/data/learn/grammar-c2";
import { MORE_A1 } from "@/data/learn/more-a1";
import { MORE_A2 } from "@/data/learn/more-a2";
import { MORE_B1 } from "@/data/learn/more-b1";
import { MORE_B2 } from "@/data/learn/more-b2";
import { MORE_C1 } from "@/data/learn/more-c1";
import { MORE_C2 } from "@/data/learn/more-c2";
import { MORE_PATTERNS } from "@/data/learn/more-patterns";
import { PATTERNS } from "@/data/learn/patterns";
import { VOCAB } from "@/data/learn/vocab";
import type { Ex, GrammarNote } from "./learnTypes";
import { GRAMMAR, LEVELS, THEMES, type Topic } from "./taxonomy";
import type { Level } from "./types";

export { PATTERNS, VOCAB };

const ALL_NOTES: GrammarNote[] = [...NOTES_A1, ...NOTES_A2, ...NOTES_B1, ...NOTES_B2, ...NOTES_C1, ...NOTES_C2];
const NOTE_BY_ID = new Map(ALL_NOTES.map((n) => [n.id, n]));
const MORE: Record<string, Ex[]> = { ...MORE_A1, ...MORE_A2, ...MORE_B1, ...MORE_B2, ...MORE_C1, ...MORE_C2 };

/** 文法筆記的「更多例句」 */
export function moreExamples(id: string): Ex[] {
  return MORE[id] ?? [];
}

/** 句型總整理的「更多例句」 */
export function morePatternExamples(id: string): Ex[] {
  return MORE_PATTERNS[id] ?? [];
}

export interface NoteEntry {
  level: Level;
  topic: Topic;
  note: GrammarNote;
}

/** 依 taxonomy 的順序排好的所有文法筆記 */
export const NOTE_ENTRIES: NoteEntry[] = LEVELS.flatMap((l) =>
  GRAMMAR[l.id].flatMap((topic) => {
    const note = NOTE_BY_ID.get(topic.id);
    return note ? [{ level: l.id, topic, note }] : [];
  }),
);

export function getNote(id: string): NoteEntry | undefined {
  return NOTE_ENTRIES.find((e) => e.topic.id === id);
}

export function hasNote(id: string): boolean {
  return NOTE_BY_ID.has(id);
}

export function getPattern(id: string) {
  return PATTERNS.find((p) => p.id === id);
}

export function getVocab(id: string) {
  const theme = THEMES.find((t) => t.id === id);
  const vocab = VOCAB.find((v) => v.id === id);
  return theme && vocab ? { theme, vocab } : undefined;
}

export function wordCount(id: string): number {
  return VOCAB.find((v) => v.id === id)?.groups.reduce((s, g) => s + g.words.length, 0) ?? 0;
}
