"use client";

import { useT } from "@/lib/i18n";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "./LoginForm";
import { Card, container, PageTitle } from "./ui";
import { useAuth } from "@/lib/auth";
import { setPendingJoin } from "@/lib/classes";

/** 邀請連結：/join/?code=ABC234 */
export default function JoinClient() {
  const params = useSearchParams();
  const router = useRouter();
  const auth = useAuth();
  const t = useT();
  const code = (params.get("code") ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);

  useEffect(() => {
    if (!code) return;
    // 先記住代碼；「我的帳號」頁登入後會自動加入（兩個 effect 依序執行，所以先存再跳轉）
    setPendingJoin(code);
  }, [code]);

  useEffect(() => {
    if (code && auth.status === "signedIn") router.replace("/account/");
  }, [code, auth.status, router]);

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle fr="Rejoindre une classe" zh="加入班級" sub={code ? t(`班級代碼：${code}`, `Code de la classe : ${code}`) : t("這個邀請連結沒有班級代碼。", "Ce lien d’invitation ne contient pas de code de classe.")} />
      {auth.status === "disabled" ? (
        <Card className="p-6 text-muted">{t("雲端功能還沒有設定，暫時無法加入班級。", "Le service en ligne n’est pas encore configuré : impossible de rejoindre une classe pour l’instant.")}</Card>
      ) : auth.status === "signedOut" ? (
        <Card className="max-w-lg p-5">
          <p className="mb-4 text-sm text-muted">{t("請先登入，登入後會自動加入這個班級。", "Connectez-vous d’abord : vous rejoindrez automatiquement la classe.")}</p>
          <LoginForm />
        </Card>
      ) : (
        <p className="text-muted">{t("處理中…", "Traitement en cours…")}</p>
      )}
    </main>
  );
}
