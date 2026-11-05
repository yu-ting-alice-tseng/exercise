import { Suspense } from "react";
import PaperClient from "@/components/PaperClient";

export const metadata = { title: "A／B 考卷｜法文練習題" };

export default function PaperPage() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted">載入中…</p>}>
      <PaperClient />
    </Suspense>
  );
}
