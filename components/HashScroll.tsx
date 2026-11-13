"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** 換頁後的 #錨點常常要等用戶端資料載入才出現，這裡持續找一小段時間再捲過去 */
export default function HashScroll() {
  const pathname = usePathname();
  useEffect(() => {
    let raf = 0;
    const go = () => {
      cancelAnimationFrame(raf);
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const smooth = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
      const until = performance.now() + 2500;
      const step = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
          return;
        }
        if (performance.now() < until) raf = requestAnimationFrame(step);
      };
      step();
    };
    go();
    window.addEventListener("hashchange", go);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", go);
    };
  }, [pathname]);
  return null;
}
