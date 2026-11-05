import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "法文練習題產生器",
  description: "依等級（A1～B1）、文法或主題，產生法文線上練習與可列印的 A／B 卷。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW">
      <body className="min-h-dvh antialiased">
        <header className="no-print border-b border-line bg-surface">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-ink">法文練習題</span>
              <span className="text-sm text-muted">Exercices de français</span>
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
