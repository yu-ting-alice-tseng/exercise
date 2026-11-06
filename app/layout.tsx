import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import CloudBoot from "@/components/CloudBoot";
import { ProverbeDuJour } from "@/components/Decor";
import "./globals.css";

export const metadata: Metadata = {
  title: "法文練習題｜Exercices de français",
  description: "依等級（A1～C2）、文法或主題，產生法文線上練習與可列印的 A／B 卷。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f2e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1326" },
  ],
};

const FONTS =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <header className="no-print">
          <div className="tricolore" />
          <div className="border-b border-line bg-surface/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:px-6 sm:py-3 lg:px-8">
              <Link href="/" className="group flex items-baseline gap-2.5">
                <span className="display text-lg font-bold whitespace-nowrap text-ink sm:text-xl">法文練習題</span>
                <span className="display hidden text-base text-muted italic md:inline">
                  Exercices de français
                </span>
              </Link>
              <Nav />
            </div>
          </div>
        </header>
        <CloudBoot />
        <div className="flex-1">{children}</div>
        <footer className="no-print mt-10 pb-28 text-center lg:pb-10">
          <div className="mx-auto mb-3 flex w-16 overflow-hidden rounded-full">
            <span className="h-1 flex-1 bg-[#1f3a93]" />
            <span className="h-1 flex-1 bg-line" />
            <span className="h-1 flex-1 bg-[#c8283c]" />
          </div>
          <ProverbeDuJour />
        </footer>
      </body>
    </html>
  );
}
