import { Suspense } from "react";
import PracticeClient from "@/components/PracticeClient";
import { T } from "@/components/T";

export const metadata = { title: "線上練習｜法文練習題" };

export default function PracticePage() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted"><T zh="載入中…" fr="Chargement…" /></p>}>
      <PracticeClient />
    </Suspense>
  );
}
