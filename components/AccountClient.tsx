"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { btnPrimary, btnQuiet, Card, container, PageTitle } from "./ui";
import { signOut, updateDisplayName, useAuth } from "@/lib/auth";
import { joinClass, joinedClasses, leaveClass, takePendingJoin, type JoinedClass } from "@/lib/classes";
import { fullSync, signOutAndClear, useSync } from "@/lib/sync";

export default function AccountClient() {
  const auth = useAuth();

  if (auth.status === "disabled") {
    return (
      <main className={`${container} pt-5 sm:pt-8`}>
        <PageTitle fr="Mon compte" zh="我的帳號" />
        <Card className="p-6 text-muted">雲端功能還沒有設定，目前學習紀錄只會存在這台裝置。</Card>
      </main>
    );
  }

  if (auth.status === "loading") return <main className={`${container} py-10 text-muted`}>載入中…</main>;

  if (auth.status === "signedOut") {
    return (
      <main className={`${container} pt-5 sm:pt-8`}>
        <PageTitle fr="Connexion" zh="登入" sub="登入後，學習紀錄會存到雲端，換手機或電腦也能接著練習；也可以加入老師的班級。" />
        <div className="grid gap-4 lg:grid-cols-[minmax(0,480px)_1fr] lg:items-start">
          <Card className="p-5">
            <LoginForm />
          </Card>
          <Card className="p-5 text-sm text-muted">
            <h2 className="display mb-2 text-lg font-bold text-ink">登入之後</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>這台裝置上現有的學習紀錄，會自動合併到你的帳號。</li>
              <li>在其他裝置登入同一個 Email，就能看到同樣的紀錄和錯題本。</li>
              <li>輸入老師給的班級代碼，老師就能看到你的練習情況（只能看，不能修改）。</li>
              <li>老師可以在這裡建立班級，追蹤學生的學習進度。</li>
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
        setJoinMsg({ ok: true, text: `已加入「${r.class_name}」。` });
        setCode("");
        refresh();
      } catch (e) {
        setJoinMsg({ ok: false, text: e instanceof Error ? e.message : "加入失敗" });
      }
    },
    [refresh],
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
      setNameMsg("已儲存。");
    } catch {
      setNameMsg("儲存失敗，請稍後再試。");
    }
  }

  const needName = profile !== null && !profile.display_name;

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle fr="Mon compte" zh="我的帳號" sub={user?.email ?? ""} />

      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <div className="space-y-4">
          <Card className={`p-5 ${needName ? "ring-2 ring-rouge" : ""}`}>
            <div className="eyebrow">Mon nom</div>
            <h2 className="display text-lg font-bold">顯示名稱</h2>
            <p className="mt-1 text-sm text-muted">
              {needName ? "請先設定名字，老師才認得出你。" : "老師在班級裡看到的是這個名字。"}
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
                placeholder="例如：王小明"
                aria-label="顯示名稱"
                className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-sunken px-3 text-base outline-none focus:border-accent focus:bg-surface"
              />
              <button type="submit" className={btnPrimary}>
                儲存
              </button>
            </form>
            {nameMsg && <p className="mt-2 text-sm text-accent">{nameMsg}</p>}
          </Card>

          <Card className="p-5">
            <div className="eyebrow">Synchronisation</div>
            <h2 className="display text-lg font-bold">雲端同步</h2>
            <p className="mt-1 text-sm text-muted" role="status">
              {sync.status === "syncing"
                ? "同步中…"
                : sync.status === "error"
                  ? `同步失敗：${sync.message ?? ""}`
                  : sync.lastSynced
                    ? `已同步（${new Date(sync.lastSynced).toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })}）。每次練習完會自動上傳。`
                    : "登入後會自動同步。"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className={btnQuiet} onClick={() => fullSync()} disabled={sync.status === "syncing"}>
                立即同步
              </button>
              <Link href="/stats/" className={btnQuiet}>
                查看學習紀錄
              </Link>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="eyebrow">Mes classes</div>
            <h2 className="display text-lg font-bold">我加入的班級</h2>
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
                placeholder="輸入 6 碼班級代碼"
                aria-label="班級代碼"
                className="display h-11 min-w-0 flex-1 rounded-lg border border-line bg-sunken px-3 text-lg tracking-[0.3em] uppercase outline-none focus:border-accent focus:bg-surface"
              />
              <button type="submit" className={btnPrimary}>
                加入
              </button>
            </form>
            {joinMsg && <p className={`mt-2 text-sm ${joinMsg.ok ? "text-ok" : "text-bad"}`}>{joinMsg.text}</p>}
            {classes === null ? (
              <p className="mt-3 text-sm text-muted">載入中…</p>
            ) : classes.length === 0 ? (
              <p className="mt-3 text-sm text-muted">還沒有加入任何班級。</p>
            ) : (
              <ul className="mt-3 divide-y divide-line">
                {classes.map((c) => (
                  <li key={c.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{c.name}</div>
                      <div className="text-xs text-muted">老師：{c.teacherName}</div>
                    </div>
                    <button
                      type="button"
                      className="min-h-10 shrink-0 text-sm text-muted hover:text-bad"
                      onClick={async () => {
                        if (!window.confirm(`確定要退出「${c.name}」嗎？退出後老師就看不到你的紀錄。`)) return;
                        await leaveClass(c.id);
                        refresh();
                      }}
                    >
                      退出
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-muted">加入後，老師可以看到你的練習時間、題數和正確率，但不能修改你的紀錄。</p>
          </Card>

          <Card className="p-5">
            <div className="eyebrow">Espace enseignant</div>
            <h2 className="display text-lg font-bold">老師專區</h2>
            <p className="mt-1 text-sm text-muted">建立班級、取得加入代碼，追蹤學生的學習進度。</p>
            <Link href="/class/" className={`${btnPrimary} mt-3`}>
              管理我的班級
            </Link>
          </Card>

          <button
            type="button"
            className={`${btnQuiet} w-full`}
            onClick={async () => {
              if (!window.confirm("確定要登出嗎？登出後，這台裝置上的學習紀錄會清除（雲端上的紀錄還在，重新登入就會回來）。")) return;
              await signOutAndClear(signOut);
            }}
          >
            登出
          </button>
        </div>
      </div>
    </main>
  );
}
