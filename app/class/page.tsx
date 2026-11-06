import { Suspense } from "react";
import ClassClient from "@/components/ClassClient";

export const metadata = { title: "我的班級｜法文練習題" };

export default function ClassPage() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted">載入中…</p>}>
      <ClassClient />
    </Suspense>
  );
}
