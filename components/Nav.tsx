"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dueIds } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";

const LINKS = [
  { href: "/", zh: "出題", match: (p: string) => p === "/" || p.startsWith("/practice") || p.startsWith("/paper") },
  { href: "/review/", zh: "複習", match: (p: string) => p.startsWith("/review") },
  { href: "/stats/", zh: "紀錄", match: (p: string) => p.startsWith("/stats") },
];

export default function Nav() {
  const raw = usePathname() ?? "/";
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = raw.startsWith(base) ? raw.slice(base.length) || "/" : raw;
  const { progress, ready } = useProgress();
  const due = ready ? dueIds(progress).length : 0;

  return (
    <nav aria-label="主要導覽" className="flex items-center gap-1">
      {LINKS.map((l) => {
        const on = l.match(path);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={on ? "page" : undefined}
            className={`relative inline-flex min-h-10 items-center rounded-lg px-3 text-sm font-medium transition ${
              on ? "bg-accent-soft text-accent" : "text-muted hover:text-ink"
            }`}
          >
            {l.zh}
            {l.href === "/review/" && due > 0 && (
              <span className="ml-1 rounded-full bg-rouge px-1.5 text-[11px] leading-5 font-bold text-white tabular-nums">
                {due > 99 ? "99+" : due}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
