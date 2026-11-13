import Link from "next/link";
import { T } from "./T";

export const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

/** 電腦版：左邊主內容、右邊固定側欄；手機版：單欄 */
export const twoCol = "lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-8";

export const btnPrimary =
  "inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 font-medium text-accent-ink shadow-sm transition hover:brightness-110 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-40";

export const btnSecondary =
  "inline-flex min-h-12 items-center justify-center rounded-lg border border-accent bg-surface px-5 font-medium text-accent transition hover:bg-accent-soft active:scale-[0.99] disabled:pointer-events-none disabled:opacity-40";

export const btnQuiet =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink transition hover:border-accent/60 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-40";

export function Card({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`rounded-xl border border-line bg-surface ${id ? "scroll-mt-6" : ""} ${className}`}>
      {children}
    </section>
  );
}

/**
 * 中法對照標題，例如「Étape 1」加「選擇等級」。
 * 法文介面時：有 frTitle 就用 eyebrow + frTitle，否則只顯示 fr。
 */
export function Heading({ fr, zh, frTitle, as: Tag = "h2" }: { fr: string; zh: string; frTitle?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <div>
      <T zh={<div className="eyebrow">{fr}</div>} fr={frTitle ? <div className="eyebrow">{fr}</div> : null} />
      <Tag className="display text-lg font-bold">
        <T zh={zh} fr={frTitle ?? fr} />
      </Tag>
    </div>
  );
}

export function PageTitle({
  back,
  fr,
  zh,
  frTitle,
  sub,
}: {
  back?: { href: string; label: string };
  fr: string;
  zh: string;
  /** 法文介面的標題；有的話保留 fr 當作 eyebrow */
  frTitle?: string;
  sub?: string;
}) {
  return (
    <div className="mb-5">
      {back && (
        <Link href={back.href} className="mb-2 inline-flex min-h-9 items-center text-sm text-muted hover:text-ink">
          ← {back.label}
        </Link>
      )}
      <T zh={<div className="eyebrow">{fr}</div>} fr={frTitle ? <div className="eyebrow">{fr}</div> : null} />
      <h1 className="display text-2xl font-bold sm:text-3xl">
        <T zh={zh} fr={frTitle ?? fr} />
      </h1>
      {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
    </div>
  );
}

/** 手機底部固定操作列（電腦版隱藏，改用側欄） */
export function BottomBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-6px_20px_rgba(0,0,0,0.06)] backdrop-blur lg:hidden">
      {children}
    </div>
  );
}

export function Progress({ value, max }: { value: number; max: number }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-sunken" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}
