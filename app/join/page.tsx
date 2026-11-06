import { Suspense } from "react";
import JoinClient from "@/components/JoinClient";

export const metadata = { title: "加入班級｜法文練習題" };

export default function JoinPage() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted">載入中…</p>}>
      <JoinClient />
    </Suspense>
  );
}
