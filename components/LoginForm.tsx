"use client";

import { useT } from "@/lib/i18n";
import { useState } from "react";
import { btnPrimary } from "./ui";
import { sendLoginLink } from "@/lib/auth";

export default function LoginForm({ next = "/account/", note }: { next?: string; note?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const t = useT();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      await sendLoginLink(email.trim(), next);
      setState("sent");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        /rate|limit|security purposes/i.test(msg)
          ? t("寄信太頻繁了，請稍等一下再試。", "Trop de tentatives. Patientez un instant avant de réessayer.")
          : /invalid|email/i.test(msg)
            ? t("Email 格式好像不正確，請再檢查一次。", "L’adresse e-mail semble incorrecte. Vérifiez-la.")
            : t("寄送失敗，請稍後再試。", "L’envoi a échoué. Réessayez plus tard."),
      );
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-lg bg-ok-soft p-4 text-sm text-ok" role="status">
        <p className="font-bold">{t("登入連結已寄到", "Lien de connexion envoyé à")} {email}</p>
        <p className="mt-1">
          {t("請打開信件，點「登入」連結就完成了。沒收到的話，看看垃圾郵件匣；也可以", "Ouvrez l’e-mail et cliquez sur le lien de connexion. Rien reçu ? Vérifiez vos courriers indésirables, ou")}
          <button type="button" className="underline underline-offset-2" onClick={() => setState("idle")}>
            {t("重新寄送", "renvoyez le lien")}
          </button>
          。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-12 w-full rounded-lg border border-line bg-sunken px-3 text-base outline-none focus:border-accent focus:bg-surface"
        />
      </label>
      <button type="submit" disabled={state === "sending"} className={`${btnPrimary} w-full`}>
        {state === "sending" ? t("寄送中…", "Envoi…") : t("寄登入連結給我", "Recevoir un lien de connexion")}
      </button>
      {state === "error" && (
        <p className="text-sm text-bad" role="alert">
          {error}
        </p>
      )}
      <p className="text-xs text-muted">{note ?? t("不用設定密碼。第一次使用會自動建立帳號。", "Pas de mot de passe. Un compte est créé automatiquement à la première connexion.")}</p>
    </form>
  );
}
