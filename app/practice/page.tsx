import { Suspense } from "react";
import PracticeClient from "@/components/PracticeClient";

export const metadata = { title: "線上練習｜法文練習題" };

export default function PracticePage() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted">載入中…</p>}>
      <PracticeClient />
    </Suspense>
  );
}
