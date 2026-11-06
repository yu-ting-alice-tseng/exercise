"use client";

import { useRouter } from "next/navigation";
import type { Level } from "@/lib/types";

/** 「練習這個文法」：每次點都換一組題目 */
export default function PracticeLink({
  level,
  by,
  topic,
  className,
  children,
}: {
  level: Level;
  by: "grammar" | "theme";
  topic: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const seed = Math.floor(Math.random() * 1_000_000_000);
        const q = new URLSearchParams({
          level,
          by,
          topics: topic,
          choice: "4",
          fill: "4",
          short: "2",
          d: "all",
          seed: String(seed),
        });
        router.push(`/practice/?${q}`);
      }}
    >
      {children}
    </button>
  );
}
