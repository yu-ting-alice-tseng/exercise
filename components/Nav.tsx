"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { dueIds, isBankId } from "@/lib/progress";
import { cloudEnabled } from "@/lib/supabase";
import { useProgress } from "@/lib/useProgress";
import { useName, useT } from "@/lib/i18n";

const LINKS = [
  { href: "/", zh: "出題", fr: "Exercices", match: (p: string) => p === "/" || p.startsWith("/practice") || p.startsWith("/paper") },
  { href: "/learn/", zh: "學習", fr: "Apprendre", match: (p: string) => p.startsWith("/learn") },
  { href: "/exam/", zh: "模考", fr: "Examens", match: (p: string) => p.startsWith("/exam") },
  { href: "/review/", zh: "複習", fr: "Révision", match: (p: string) => p.startsWith("/review") },
  { href: "/stats/", zh: "紀錄", fr: "Suivi", match: (p: string) => p.startsWith("/stats") },
];

const ACCOUNT = (p: string) => p.startsWith("/account") || p.startsWith("/class") || p.startsWith("/join");

export default function Nav() {
  const raw = usePathname() ?? "/";
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = raw.startsWith(base) ? raw.slice(base.length) || "/" : raw;
  const { progress, ready } = useProgress();
  const due = ready ? dueIds(progress).filter(isBankId).length : 0;
  const auth = useAuth();
  const t = useT();
  const name = useName();
  const links = cloudEnabled
    ? [
        ...LINKS,
        {
          href: "/account/",
          zh: auth.status === "signedIn" ? "我的" : "登入",
          fr: auth.status === "signedIn" ? "Mon compte" : "Connexion",
          match: ACCOUNT,
        },
      ]
    : LINKS;

  return (
    <nav aria-label={t("主要導覽", "Navigation principale")} className="scroll-x flex items-center gap-0.5 overflow-x-auto px-3 pb-1 sm:gap-1 sm:overflow-visible sm:px-0 sm:pb-0">
      {links.map((l) => {
        const on = l.match(path);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={on ? "page" : undefined}
            className={`relative inline-flex min-h-10 shrink-0 items-center rounded-lg px-2 text-sm whitespace-nowrap min-[400px]:px-2.5 sm:px-3 font-medium transition ${
              on ? "nav-current bg-accent-soft text-accent" : "text-muted hover:text-ink"
            }`}
          >
            {name(l)}
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
