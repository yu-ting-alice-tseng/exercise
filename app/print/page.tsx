import { Suspense } from "react";
import PrintClient from "@/components/PrintClient";

export const metadata = { title: "列印｜法文練習題" };

export default function PrintPage() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted">載入中…</p>}>
      <PrintClient />
    </Suspense>
  );
}
