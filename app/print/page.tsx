import { Suspense } from "react";
import PrintClient from "@/components/PrintClient";
import { T } from "@/components/T";

export const metadata = { title: "列印｜法文練習題" };

export default function PrintPage() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted"><T zh="載入中…" fr="Chargement…" /></p>}>
      <PrintClient />
    </Suspense>
  );
}
