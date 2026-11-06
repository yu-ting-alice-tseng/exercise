"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { dueIds } from "@/lib/progress";
import { cloudEnabled } from "@/lib/supabase";
import { useProgress } from "@/lib/useProgress";

const LINKS = [
  { href: "/", zh: "出題", match: (p: string) => p === "/" || p.startsWith("/practice") || p.startsWith("/paper") },
  { href: "/review/", zh: "複習", match: (p: string) => p.startsWith("/review") },
  { href: "/stats/", zh: "紀錄", match: (p: string) => p.startsWith("/stats") },
];

const ACCOUNT = (p: string) => p.startsWith("/account") || p.startsWith("/class") || p.startsWith("/join");

export default function Nav() {
  const raw = usePathname() ?? "/";
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = raw.startsWith(base) ? raw.slice(base.length) || "/" : raw;
  const { progress, ready } = useProgress();
  const due = ready ? dueIds(progress).length : 0;
  const auth = useAuth();
  const links = cloudEnabled
    ? [...LINKS, { href: "/account/", zh: auth.status === "signedIn" ? "我的" : "登入", match: ACCOUNT }]
    : LINKS;

  return (
    <nav aria-label="主要導覽" className="flex items-center gap-1">
      {links.map((l) => {
        const on = l.match(path);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={on ? "page" : undefined}
            className={`relative inline-flex min-h-10 items-center rounded-lg px-2.5 text-sm sm:px-3 font-medium transition ${
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
