"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/lib/auth";
import { dueIds, isBankId } from "@/lib/progress";
import { cloudEnabled } from "@/lib/supabase";
import { useProgress } from "@/lib/useProgress";
import { useName, useT } from "@/lib/i18n";
import { ACCOUNT_SECTIONS, NAV_SECTIONS, type SectionLink } from "@/lib/sections";

const LINKS = [
  { href: "/", zh: "出題", fr: "Exercices", match: (p: string) => p === "/" || p.startsWith("/practice") || p.startsWith("/paper") },
  { href: "/learn/", zh: "學習", fr: "Apprendre", match: (p: string) => p.startsWith("/learn") },
  { href: "/exam/", zh: "模考", fr: "Examens", match: (p: string) => p.startsWith("/exam") },
  { href: "/review/", zh: "複習", fr: "Révision", match: (p: string) => p.startsWith("/review") },
  { href: "/stats/", zh: "紀錄", fr: "Suivi", match: (p: string) => p.startsWith("/stats") },
];

const ACCOUNT = (p: string) => p.startsWith("/account") || p.startsWith("/class") || p.startsWith("/join");

const PANEL_W = 248;
const trim = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);

export default function Nav() {
  const raw = usePathname() ?? "/";
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = raw.startsWith(base) ? raw.slice(base.length) || "/" : raw;
  const { progress, ready } = useProgress();
  const due = ready ? dueIds(progress).filter(isBankId).length : 0;
  const auth = useAuth();
  const t = useT();
  const name = useName();
  const signedIn = auth.status === "signedIn";
  const links = cloudEnabled
    ? [
        ...LINKS,
        {
          href: "/account/",
          zh: signedIn ? "我的" : "登入",
          fr: signedIn ? "Mon compte" : "Connexion",
          match: ACCOUNT,
        },
      ]
    : LINKS;
  const sectionsOf = (href: string): SectionLink[] => (href === "/account/" ? (signedIn ? ACCOUNT_SECTIONS : []) : (NAV_SECTIONS[href] ?? []));

  // 同一時間只開一個選單。面板用 portal 放到 body 再 fixed 定位：
  // 頁首有 backdrop-blur 會困住 fixed 元素，手機版導覽列又會橫向裁切
  const [open, setOpen] = useState<{ href: string; top: number; left: number } | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);
  const hoverable = useRef(false);

  const openAt = (href: string, anchor: HTMLElement) => {
    window.clearTimeout(timer.current);
    const r = anchor.getBoundingClientRect();
    const w = Math.min(PANEL_W, window.innerWidth - 16);
    setOpen({ href, top: r.bottom + 6, left: Math.max(8, Math.min(r.left, window.innerWidth - w - 8)) });
  };
  const closeSoon = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(null), 160);
  };

  useEffect(() => {
    hoverable.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(null);
    const onDown = (e: PointerEvent) => {
      const n = e.target as Node;
      if (!navRef.current?.contains(n) && !panelRef.current?.contains(n)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${open.href}"]`)?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close);
    };
  }, [open]);

  // 點同一頁的區塊：直接捲過去，不重新導覽
  const pick = (e: React.MouseEvent, href: string) => {
    setOpen(null);
    const [page, hash] = href.split("#");
    if (hash && trim(page) === trim(path)) {
      e.preventDefault();
      window.history.pushState(null, "", `${base}${page}#${hash}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  };

  const current = open ? sectionsOf(open.href) : [];

  return (
    <nav ref={navRef} aria-label={t("主要導覽", "Navigation principale")} className="scroll-x flex items-center gap-0.5 overflow-x-auto px-3 pb-1 sm:gap-1 sm:overflow-visible sm:px-0 sm:pb-0">
      {links.map((l) => {
        const on = l.match(path);
        const items = sectionsOf(l.href);
        const expanded = open?.href === l.href;
        const menuId = `nav-menu-${l.href.replace(/\W/g, "") || "home"}`;
        return (
          <div
            key={l.href}
            className={`relative inline-flex shrink-0 items-center rounded-lg transition ${on ? "nav-current bg-accent-soft text-accent" : "text-muted hover:text-ink"}`}
            onMouseEnter={(e) => {
              if (hoverable.current && items.length) openAt(l.href, e.currentTarget);
            }}
            onMouseLeave={() => {
              if (hoverable.current && expanded) closeSoon();
            }}
          >
            <Link
              href={l.href}
              aria-current={on ? "page" : undefined}
              onClick={() => setOpen(null)}
              className={`inline-flex min-h-10 items-center text-sm font-medium whitespace-nowrap ${items.length ? "pl-2 min-[400px]:pl-2.5 sm:pl-3" : "px-2 min-[400px]:px-2.5 sm:px-3"}`}
            >
              {name(l)}
              {l.href === "/review/" && due > 0 && <span className="ml-1 rounded-full bg-rouge px-1.5 text-[11px] leading-5 font-bold text-white tabular-nums">{due > 99 ? "99+" : due}</span>}
            </Link>
            {items.length > 0 && (
              <button
                type="button"
                data-menu={l.href}
                aria-expanded={expanded}
                aria-controls={expanded ? menuId : undefined}
                aria-label={t(`${l.zh}的區塊`, `Sections : ${l.fr}`)}
                onClick={(e) => (expanded ? setOpen(null) : openAt(l.href, e.currentTarget.parentElement!))}
                className="inline-flex min-h-10 w-6 items-center justify-center rounded-r-lg pr-1 sm:w-7"
              >
                <svg viewBox="0 0 12 12" className={`size-3 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden>
                  <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            {expanded &&
              createPortal(
                <div
                  ref={panelRef}
                  id={menuId}
                  className="fixed z-50 overflow-hidden rounded-xl border border-line bg-surface py-1.5 text-ink shadow-xl"
                  style={{ top: open.top, left: open.left, width: `min(${PANEL_W}px, calc(100vw - 16px))` }}
                  onMouseEnter={() => window.clearTimeout(timer.current)}
                  onMouseLeave={() => {
                    if (hoverable.current) closeSoon();
                  }}
                >
                  <ul>
                    {current.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          onClick={(e) => pick(e, s.href)}
                          className="flex min-h-10 items-center gap-2 px-3.5 py-1.5 text-sm hover:bg-accent-soft hover:text-accent focus-visible:bg-accent-soft"
                        >
                          <span className="text-rouge" aria-hidden>
                            ›
                          </span>
                          <span className="min-w-0 flex-1">{name(s)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>,
                document.body,
              )}
          </div>
        );
      })}
    </nav>
  );
}
