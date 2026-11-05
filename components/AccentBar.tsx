"use client";

const LETTERS = ["é", "è", "ê", "à", "â", "ç", "ù", "û", "î", "ï", "ô", "ë", "œ", "'"];

/**
 * 手機鍵盤不一定好打法文字母，提供一排快捷鍵。
 * onMouseDown 時 preventDefault，讓輸入框保持焦點。
 */
export default function AccentBar({
  target,
  onInsert,
}: {
  target: () => HTMLInputElement | HTMLTextAreaElement | null;
  onInsert: (value: string) => void;
}) {
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
    <div className="mt-2 flex flex-wrap gap-1" aria-label="法文字母快捷鍵">
      {LETTERS.map((ch) => (
        <button
          key={ch}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => insert(ch)}
          className="grid h-9 min-w-9 place-items-center rounded-md border border-line bg-bg px-2 text-base"
          lang="fr"
        >
          {ch}
        </button>
      ))}
    </div>
  );
}
