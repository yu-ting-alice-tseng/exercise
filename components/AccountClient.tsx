"use client";

import { useLang, useT } from "@/lib/i18n";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { btnPrimary, btnQuiet, Card, container, PageTitle } from "./ui";
import { signOut, updateDisplayName, useAuth } from "@/lib/auth";
import { joinClass, joinedClasses, leaveClass, takePendingJoin, type JoinedClass } from "@/lib/classes";
import { fullSync, signOutAndClear, useSync } from "@/lib/sync";

export default function AccountClient() {
  const auth = useAuth();
  const t = useT();

  if (auth.status === "disabled") {
    return (
      <main className={`${container} pt-5 sm:pt-8`}>
        <PageTitle fr="Mon compte" zh="我的帳號" />
        <Card className="p-6 text-muted">{t("雲端功能還沒有設定，目前學習紀錄只會存在這台裝置。", "Le service en ligne n’est pas encore configuré : votre historique reste sur cet appareil.")}</Card>
      </main>
    );
  }

  if (auth.status === "loading") return <main className={`${container} py-10 text-muted`}>{t("載入中…", "Chargement…")}</main>;

  if (auth.status === "signedOut") {
    return (
      <main className={`${container} pt-5 sm:pt-8`}>
        <PageTitle fr="Connexion" zh="登入" sub={t("登入後，學習紀錄會存到雲端，換手機或電腦也能接著練習；也可以加入老師的班級。", "Connectez-vous pour sauvegarder votre progression en ligne, la retrouver sur tous vos appareils et rejoindre la classe de votre professeur.")} />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,480px)_1fr] lg:items-start">
          <Card className="p-5">
            <LoginForm />
          </Card>
          <Card className="p-5 text-sm text-muted">
            <h2 className="display mb-2 text-lg font-bold text-ink">{t("登入之後", "Une fois connecté(e)")}</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>{t("這台裝置上現有的學習紀錄，會自動合併到你的帳號。", "L’historique de cet appareil est fusionné avec votre compte.")}</li>
              <li>{t("在其他裝置登入同一個 Email，就能看到同樣的紀錄和錯題本。", "Connectez-vous avec la même adresse sur un autre appareil pour retrouver votre suivi et votre carnet d’erreurs.")}</li>
              <li>{t("輸入老師給的班級代碼，老師就能看到你的練習情況（只能看，不能修改）。", "Avec le code de classe de votre professeur, il pourra consulter votre activité (sans pouvoir la modifier).")}</li>
              <li>{t("老師可以在這裡建立班級，追蹤學生的學習進度。", "Les enseignants peuvent créer des classes et suivre leurs élèves.")}</li>
            </ul>
          </Card>
        </div>
      </main>
    );
  }

  return <SignedIn />;
}

function SignedIn() {
  const { user, profile } = useAuth();
  const sync = useSync();
  const [name, setName] = useState("");
  const [nameMsg, setNameMsg] = useState<string | null>(null);
  const [classes, setClasses] = useState<JoinedClass[] | null>(null);
  const [code, setCode] = useState("");
  const [joinMsg, setJoinMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const lang = useLang();
  const t = useCallback((zh: string, fr: string) => (lang === "fr" ? fr : zh), [lang]);

  const editingName = name !== "" ? name : (profile?.display_name ?? "");

  const refresh = useCallback(async () => {
    try {
      setClasses(await joinedClasses());
    } catch {
      setClasses([]);
    }
  }, []);

  const join = useCallback(
    async (c: string) => {
      setJoinMsg(null);
      try {
        const r = await joinClass(c);
        setJoinMsg({ ok: true, text: t(`已加入「${r.class_name}」。`, `Vous avez rejoint « ${r.class_name} ».`) });
        setCode("");
        refresh();
      } catch (e) {
        setJoinMsg({ ok: false, text: e instanceof Error ? e.message : t("加入失敗", "Échec") });
      }
    },
    [refresh, t],
  );

  useEffect(() => {
    // 從邀請連結來、但當時還沒登入：登入後自動加入
    const pending = takePendingJoin();
    const run = async () => {
      if (pending) await join(pending);
      else await refresh();
    };
    run();
  }, [join, refresh]);

  async function saveName(e: React.FormEvent) {
    e.preventDefault();
    try {
      await updateDisplayName(editingName);
      setName("");
      setNameMsg(t("已儲存。", "Enregistré."));
    } catch {
      setNameMsg(t("儲存失敗，請稍後再試。", "Échec de l’enregistrement. Réessayez plus tard."));
    }
  }

  const needName = profile !== null && !profile.display_name;

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle fr="Mon compte" zh="我的帳號" sub={user?.email ?? ""} />

      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <div className="space-y-4">
          <Card id="nom" className={`p-5 ${needName ? "ring-2 ring-rouge" : ""}`}>
            <div className="eyebrow">Mon nom</div>
            <h2 className="display text-lg font-bold">{t("顯示名稱", "Nom affiché")}</h2>
            <p className="mt-1 text-sm text-muted">
              {needName ? t("請先設定名字，老師才認得出你。", "Indiquez votre nom pour que votre professeur vous reconnaisse.") : t("老師在班級裡看到的是這個名字。", "C’est le nom que voit votre professeur.")}
            </p>
            <form onSubmit={saveName} className="mt-3 flex gap-2">
              <input
                value={editingName}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameMsg(null);
                }}
                maxLength={40}
                required
                placeholder={t("例如：王小明", "Ex. : Marie Dupont")}
                aria-label={t("顯示名稱", "Nom affiché")}
                className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-sunken px-3 text-base outline-none focus:border-accent focus:bg-surface"
              />
              <button type="submit" className={btnPrimary}>
                {t("儲存", "Enregistrer")}
              </button>
            </form>
            {nameMsg && <p className="mt-2 text-sm text-accent">{nameMsg}</p>}
          </Card>

          <Card id="synchro" className="p-5">
            <div className="eyebrow">Synchronisation</div>
            <h2 className="display text-lg font-bold">{t("雲端同步", "Synchronisation")}</h2>
            <p className="mt-1 text-sm text-muted" role="status">
              {sync.status === "syncing"
                ? t("同步中…", "Synchronisation…")
                : sync.status === "error"
                  ? t(`同步失敗：${sync.message ?? ""}`, `Échec de la synchronisation : ${sync.message ?? ""}`)
                  : sync.lastSynced
                    ? t(`已同步（${new Date(sync.lastSynced).toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })}）。每次練習完會自動上傳。`, `Synchronisé (${new Date(sync.lastSynced).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}). Envoi automatique après chaque exercice.`)
                    : t("登入後會自動同步。", "La synchronisation est automatique.")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className={btnQuiet} onClick={() => fullSync()} disabled={sync.status === "syncing"}>
                {t("立即同步", "Synchroniser")}
              </button>
              <Link href="/stats/" className={btnQuiet}>
                {t("查看學習紀錄", "Voir mon suivi")}
              </Link>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card id="classes" className="p-5">
            <div className="eyebrow">Mes classes</div>
            <h2 className="display text-lg font-bold">{t("我加入的班級", "Mes classes")}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                join(code);
              }}
              className="mt-3 flex gap-2"
            >
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                maxLength={6}
                required
                autoCapitalize="characters"
                autoComplete="off"
                placeholder={t("輸入 6 碼班級代碼", "Code de classe (6 caractères)")}
                aria-label={t("班級代碼", "Code de classe")}
                className="display h-11 min-w-0 flex-1 rounded-lg border border-line bg-sunken px-3 text-lg tracking-[0.3em] uppercase outline-none focus:border-accent focus:bg-surface"
              />
              <button type="submit" className={btnPrimary}>
                {t("加入", "Rejoindre")}
              </button>
            </form>
            {joinMsg && <p className={`mt-2 text-sm ${joinMsg.ok ? "text-ok" : "text-bad"}`}>{joinMsg.text}</p>}
            {classes === null ? (
              <p className="mt-3 text-sm text-muted">{t("載入中…", "Chargement…")}</p>
            ) : classes.length === 0 ? (
              <p className="mt-3 text-sm text-muted">{t("還沒有加入任何班級。", "Vous n’avez rejoint aucune classe.")}</p>
            ) : (
              <ul className="mt-3 divide-y divide-line">
                {classes.map((c) => (
                  <li key={c.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{c.name}</div>
                      <div className="text-xs text-muted">{t("老師：", "Professeur : ")}{c.teacherName}</div>
                    </div>
                    <button
                      type="button"
                      className="min-h-10 shrink-0 text-sm text-muted hover:text-bad"
                      onClick={async () => {
                        if (!window.confirm(t(`確定要退出「${c.name}」嗎？退出後老師就看不到你的紀錄。`, `Quitter « ${c.name} » ? Votre professeur ne verra plus votre activité.`))) return;
                        await leaveClass(c.id);
                        refresh();
                      }}
                    >
                      {t("退出", "Quitter")}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-muted">{t("加入後，老師可以看到你的練習時間、題數和正確率，但不能修改你的紀錄。", "Votre professeur voit votre temps d’étude, le nombre de questions et votre taux de réussite, sans pouvoir les modifier.")}</p>
          </Card>

          <Card id="enseignant" className="p-5">
            <div className="eyebrow">Espace enseignant</div>
            <h2 className="display text-lg font-bold">{t("老師專區", "Espace enseignant")}</h2>
            <p className="mt-1 text-sm text-muted">{t("建立班級、取得加入代碼，追蹤學生的學習進度。", "Créez une classe, obtenez un code d’accès et suivez la progression de vos élèves.")}</p>
            <Link href="/class/" className={`${btnPrimary} mt-3`}>
              {t("管理我的班級", "Gérer mes classes")}
            </Link>
          </Card>

          <button
            type="button"
            className={`${btnQuiet} w-full`}
            onClick={async () => {
              if (!window.confirm(t("確定要登出嗎？登出後，這台裝置上的學習紀錄會清除（雲端上的紀錄還在，重新登入就會回來）。", "Se déconnecter ? L’historique de cet appareil sera effacé (il reste en ligne et reviendra à la prochaine connexion)."))) return;
              await signOutAndClear(signOut);
            }}
          >
            {t("登出", "Se déconnecter")}
          </button>
        </div>
      </div>
    </main>
  );
}
