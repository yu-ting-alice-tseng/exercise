import { Fragment } from "react";

/** 把題幹裡的 ___ 換成空格線或指定的元素（例如輸入框） */
export default function Stem({
  text,
  blank,
}: {
  text: string;
  blank?: (index: number) => React.ReactNode;
}) {
  const parts = text.split(/_{3,}/);
  return (
    <span lang="fr" className="fr">
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 &&
            (blank ? (
              blank(i)
            ) : (
              <span className="mx-1 inline-block min-w-16 border-b-2 border-current align-baseline">&nbsp;</span>
            ))}
        </Fragment>
      ))}
    </span>
  );
}

export const hasBlank = (text: string) => /_{3,}/.test(text);
