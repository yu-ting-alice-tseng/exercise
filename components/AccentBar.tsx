"use client";

import { useT } from "@/lib/i18n";
const LETTERS = ["é", "è", "ê", "à", "â", "ç", "ù", "û", "î", "ï", "ô", "ë", "œ", "É", "À", "Ç", "'", "«", "»"];

/**
 * 手機鍵盤不一定好打法文字母，提供一排快捷鍵（可橫向滑動）。
 * onMouseDown 時 preventDefault，讓輸入框保持焦點。
 */
export default function AccentBar({
  target,
  onInsert,
}: {
  target: () => HTMLInputElement | HTMLTextAreaElement | null;
  onInsert: (value: string) => void;
}) {
  const t = useT();
  function insert(ch: string) {
    const el = target();
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    el.setRangeText(ch, start, end, "end");
    onInsert(el.value);
    el.focus();
  }

  return (
    <div className="scroll-x -mx-4 mt-2 px-4 sm:mx-0 sm:px-0" aria-label={t("法文字母快捷鍵", "Lettres accentuées")}>
      <div className="flex w-max gap-1 sm:w-auto sm:flex-wrap">
        {LETTERS.map((ch) => (
          <button
            key={ch}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => insert(ch)}
            className="grid h-10 min-w-10 place-items-center rounded-md border border-line bg-surface px-2 text-lg shadow-sm active:bg-accent-soft"
            lang="fr"
          >
            {ch}
          </button>
        ))}
      </div>
    </div>
  );
}
