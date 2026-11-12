import type { Pitfall, Rule } from "@/lib/learnTypes";
import { T } from "@/components/T";
import { Pitfalls, Rich, RuleBlock } from "./Blocks";

/** 一份筆記的內文：重點卡、規則、常見錯誤、小撇步 */
export default function Fiche({
  summary,
  rules,
  pitfalls,
  tip,
}: {
  summary: string;
  rules: Rule[];
  pitfalls?: Pitfall[];
  tip?: string;
}) {
  return (
    <div className="space-y-8">
      <div className="fiche rounded-xl border border-line px-4 pt-2 pb-4 shadow-sm sm:px-6">
        <div className="display h-8 text-sm text-rouge italic">L&apos;essentiel</div>
        <p className="pt-0.5 text-[1.05rem] font-medium">
          <Rich text={summary} />
        </p>
      </div>

      {rules.map((r, i) => (
        <RuleBlock key={i} rule={r} n={i + 1} />
      ))}

      {pitfalls && pitfalls.length > 0 && (
        <section className="space-y-3">
          <h3 className="display text-lg font-bold">
            <T zh={<>常見錯誤 <span className="text-sm font-normal text-muted italic">Attention !</span></>} fr="Attention !" />
          </h3>
          <Pitfalls items={pitfalls} />
        </section>
      )}

      {tip && (
        <aside className="flex gap-3 rounded-xl border border-warn/40 bg-warn-soft px-4 py-3">
          <span className="display shrink-0 font-bold text-warn italic">Astuce</span>
          <p className="text-sm">
            <Rich text={tip} />
          </p>
        </aside>
      )}
    </div>
  );
}
