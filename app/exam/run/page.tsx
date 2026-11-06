import { Suspense } from "react";
import ExamRunnerPage from "@/components/ExamRunner";

export const metadata = { title: "模擬考｜法文練習題" };

export default function ExamRunPage() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted">載入中…</p>}>
      <ExamRunnerPage />
    </Suspense>
  );
}
