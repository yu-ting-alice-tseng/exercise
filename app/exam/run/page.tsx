import { Suspense } from "react";
import ExamRunnerPage from "@/components/ExamRunner";
import { T } from "@/components/T";

export const metadata = { title: "模擬考｜法文練習題" };

export default function ExamRunPage() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted"><T zh="載入中…" fr="Chargement…" /></p>}>
      <ExamRunnerPage />
    </Suspense>
  );
}
