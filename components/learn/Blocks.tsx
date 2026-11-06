import type { Ex, Pitfall, Rule, Table } from "@/lib/learnTypes";
import Speak from "./Speak";

/** 支援 **粗體**，用來標出詞尾或關鍵字 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-rouge">
            {p}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

const plain = (s: string) => s.replace(/\*\*/g, "");

export function Examples({ ex }: { ex: Ex[] }) {
  return (
    <ul className="space-y-2">
      {ex.map(([fr, zh], i) => (
        <li key={i} className="flex items-start gap-2.5 rounded-lg bg-sunken/70 px-3 py-2">
          <Speak text={plain(fr)} className="mt-0.5" />
          <div className="min-w-0">
            <p lang="fr" className="fr">
              <Rich text={fr} />
            </p>
            <p className="text-sm text-muted">{zh}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function TableView({ table }: { table: Table }) {
  const fr = new Set(table.fr ?? []);
  return (
    <div className="scroll-x -mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[420px] border-collapse text-sm">
        <thead>
          <tr>
            {table.head.map((h, i) => (
              <th key={i} className="border-b-2 border-accent/40 px-2.5 py-2 text-left font-semibold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i} className="odd:bg-sunken/50">
              {r.map((c, j) => (
                <td
                  key={j}
                  lang={fr.has(j) ? "fr" : undefined}
                  className={`border-b border-line px-2.5 py-2 align-top ${fr.has(j) ? "text-[0.95rem]" : ""} ${j === 0 ? "font-medium" : ""}`}
                >
                  <Rich text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RuleBlock({ rule, n }: { rule: Rule; n?: number }) {
  return (
    <section className="space-y-3">
      <h3 className="display flex items-baseline gap-2 text-lg font-bold">
        {n !== undefined && <span className="text-sm text-rouge tabular-nums">{String(n).padStart(2, "0")}</span>}
        <span>
          <Rich text={rule.t} />
        </span>
      </h3>
      {rule.d && (
        <p className="leading-relaxed whitespace-pre-line">
          <Rich text={rule.d} />
        </p>
      )}
      {rule.table && <TableView table={rule.table} />}
      {rule.ex && <Examples ex={rule.ex} />}
    </section>
  );
}

export function Pitfalls({ items }: { items: Pitfall[] }) {
  return (
    <ul className="space-y-3">
      {items.map((p, i) => (
        <li key={i} className="rounded-lg border border-line bg-surface p-3">
          <p lang="fr" className="fr">
            <span className="mr-1.5 inline-grid size-5 place-items-center rounded-full bg-bad-soft text-xs font-bold text-bad" aria-label="錯誤">
              ✕
            </span>
            <span className="text-muted line-through decoration-bad/60">{p.wrong}</span>
          </p>
          <p lang="fr" className="fr">
            <span className="mr-1.5 inline-grid size-5 place-items-center rounded-full bg-ok-soft text-xs font-bold text-ok" aria-label="正確">
              ✓
            </span>
            <span className="font-medium">{p.right}</span>
          </p>
          <p className="mt-1 text-sm text-muted">{p.why}</p>
        </li>
      ))}
    </ul>
  );
}
