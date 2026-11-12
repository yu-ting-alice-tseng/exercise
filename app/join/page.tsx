import { Suspense } from "react";
import JoinClient from "@/components/JoinClient";
import { T } from "@/components/T";

export const metadata = { title: "加入班級｜法文練習題" };

export default function JoinPage() {
  return (
    <Suspense fallback={<p className="p-6 text-center text-muted"><T zh="載入中…" fr="Chargement…" /></p>}>
      <JoinClient />
    </Suspense>
  );
}
