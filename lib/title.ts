import { topicName } from "./taxonomy";
import type { PaperConfig } from "./types";

export function paperTitle(c: PaperConfig, lang: "zh" | "fr" = "zh"): string {
  const names = c.topics.map((t) => topicName(c.level, c.by, t, lang));
  let scope: string;
  if (lang === "fr") {
    if (names.length === 0) scope = "Révision générale";
    else if (names.length <= 2) scope = names.join(", ");
    else scope = `${names.slice(0, 2).join(", ")} et ${names.length - 2} autre${names.length - 2 > 1 ? "s" : ""}`;
    return `${c.level} · ${scope}`;
  }
  if (names.length === 0) scope = "綜合練習";
  else if (names.length <= 2) scope = names.join("、");
  else scope = `${names.slice(0, 2).join("、")}等 ${names.length} 項`;
  return `${c.level}・${scope}`;
}
