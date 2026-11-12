"use client";

import { useLang } from "@/lib/i18n";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "./LoginForm";
import { btnPrimary, btnQuiet, Card, container, PageTitle } from "./ui";
import { useAuth } from "@/lib/auth";
import {
  classDetail,
  createClass,
  deleteClass,
  myClasses,
  regenerateCode,
  removeMember,
  renameClass,
  type ClassRow,
  type Member,
} from "@/lib/classes";
import { summarize, weakestGrammar } from "@/lib/classStats";
import { BASE_PATH } from "@/lib/config";
import { DAY, startOfDay } from "@/lib/progress";
import { topicName } from "@/lib/taxonomy";
import { useNow } from "@/lib/useNow";

const minutes = (sec: number) => (sec === 0 ? "0" : sec < 60 ? "<1" : String(Math.round(sec / 60)));
const md = (ts: number, lang: "zh" | "fr" = "zh") =>
  new Date(ts).toLocaleDateString(lang === "fr" ? "fr-FR" : "zh-TW", lang === "fr" ? { day: "numeric", month: "short" } : { month: "numeric", day: "numeric" });

export default function ClassClient() {
  const auth = useAuth();
  const params = useSearchParams();
  const id = params.get("id");
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);

  if (auth.status === "disabled") {
    return (
      <main className={`${container} pt-5 sm:pt-8`}>
        <PageTitle fr="Mes classes" zh="我的班級" />
        <Card className="p-6 text-muted">{t("雲端功能還沒有設定，暫時無法建立班級。", "Le service en ligne n’est pas encore configuré : impossible de créer une classe pour l’instant.")}</Card>
      </main>
    );
  }
  if (auth.status === "loading") return <main className={`${container} py-10 text-muted`}>{t("載入中…", "Chargement…")}</main>;
  if (auth.status === "signedOut") {
    return (
      <main className={`${container} pt-5 sm:pt-8`}>
        <PageTitle fr="Espace enseignant" zh="老師專區" sub={t("請先登入，才能建立和管理班級。", "Connectez-vous pour créer et gérer vos classes.")} />
        <Card className="max-w-lg p-5">
          <LoginForm next="/class/" />
        </Card>
      </main>
    );
  }
  return id ? <ClassDetail key={id} id={id} /> : <ClassList />;
}

function errMsg(code: string, t: (zh: string, fr: string) => string) {
  if (code === "load") return t("讀取班級失敗，請重新整理。", "Impossible de charger les classes. Actualisez la page.");
  if (code === "create") return t("建立失敗，請稍後再試。", "Échec de la création. Réessayez plus tard.");
  return t("找不到這個班級，或你不是這個班級的老師。", "Classe introuvable, ou vous n’en êtes pas l’enseignant.");
}

function ClassList() {
  const router = useRouter();
  const [list, setList] = useState<(ClassRow & { members: number })[] | null>(null);
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);

  useEffect(() => {
    let alive = true;
    myClasses()
      .then((l) => alive && setList(l))
      .catch(() => alive && setErr("load"));
    return () => {
      alive = false;
    };
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const c = await createClass(name);
      router.push(`/class/?id=${c.id}`);
    } catch {
      setErr("create");
    }
  }

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle
        back={{ href: "/account/", label: t("我的帳號", "Mon compte") }}
        fr="Espace enseignant"
        zh="我的班級"
        sub={t("建立班級後，把 6 碼代碼或邀請連結給學生，學生加入後你就能看到他們的學習進度。", "Créez une classe puis donnez le code à 6 caractères ou le lien d’invitation à vos élèves pour suivre leur progression.")}
      />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div>
          {list === null ? (
            <p className="text-muted">{err ? errMsg(err, t) : t("載入中…", "Chargement…")}</p>
          ) : list.length === 0 ? (
            <Card className="p-6 text-muted">{t("還沒有建立班級。", "Aucune classe pour l’instant.")}</Card>
          ) : (
            <ul className="space-y-3">
              {list.map((c) => (
                <li key={c.id}>
                  <Link href={`/class/?id=${c.id}`} className="block">
                    <Card className="flex items-center justify-between gap-3 p-4 transition hover:border-accent/60 sm:p-5">
                      <div className="min-w-0">
                        <div className="display truncate text-lg font-bold">{c.name}</div>
                        <div className="text-sm text-muted">
                          {t(`${c.members} 位學生・代碼 `, `${c.members} élève(s) · code `)}<span className="display tracking-widest">{c.join_code}</span>
                        </div>
                      </div>
                      <span className="text-muted">›</span>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Card className="p-5">
          <div className="eyebrow">Nouvelle classe</div>
          <h2 className="display text-lg font-bold">{t("建立新班級", "Nouvelle classe")}</h2>
          <form onSubmit={create} className="mt-3 space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              required
              placeholder={t("例如：週三晚上 A2 班", "Ex. : A2 du mercredi soir")}
              aria-label={t("班級名稱", "Nom de la classe")}
              className="h-11 w-full rounded-lg border border-line bg-sunken px-3 text-base outline-none focus:border-accent focus:bg-surface"
            />
            <button type="submit" className={`${btnPrimary} w-full`}>
              {t("建立", "Créer")}
            </button>
          </form>
          {err && list !== null && <p className="mt-2 text-sm text-bad">{errMsg(err, t)}</p>}
        </Card>
      </div>
    </main>
  );
}

function ClassDetail({ id }: { id: string }) {
  const router = useRouter();
  const now = useNow();
  const [range, setRange] = useState<7 | 30>(7);
  const [data, setData] = useState<{ cls: ClassRow; members: Member[] } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  const [open, setOpen] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await classDetail(id, Date.now() - 30 * DAY));
    } catch {
      setErr("notfound");
    }
  }, [id]);

  useEffect(() => {
    let alive = true;
    classDetail(id, Date.now() - 30 * DAY)
      .then((d) => alive && setData(d))
      .catch(() => alive && setErr("notfound"));
    return () => {
      alive = false;
    };
  }, [id]);

  const since = startOfDay(now) - (range - 1) * DAY;
  const rows = useMemo(() => {
    if (!data) return [];
    return data.members
      .map((m) => ({ m, s: summarize(m.sessions, m.stats, since, now) }))
      .sort((a, b) => (b.s.lastAt ?? 0) - (a.s.lastAt ?? 0));
  }, [data, since, now]);

  const classWeak = useMemo(() => (data ? weakestGrammar(data.members.map((m) => m.stats), 5) : []), [data]);

  if (err) {
    return (
      <main className={`${container} pt-5 sm:pt-8`}>
        <PageTitle back={{ href: "/class/", label: t("我的班級", "Mes classes") }} fr="Classe" zh="班級" />
        <Card className="p-6 text-muted">{errMsg(err, t)}</Card>
      </main>
    );
  }
  if (!data) return <main className={`${container} py-10 text-muted`}>{t("載入中…", "Chargement…")}</main>;

  const { cls } = data;
  const link = typeof window !== "undefined" ? `${window.location.origin}${BASE_PATH}/join/?code=${cls.join_code}` : "";
  const active = rows.filter((r) => r.s.days > 0).length;
  const totalSec = rows.reduce((a, r) => a + r.s.sec, 0);

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle back={{ href: "/class/", label: t("我的班級", "Mes classes") }} fr="Classe" zh={cls.name} frTitle={cls.name} sub={t(`${data.members.length} 位學生`, `${data.members.length} élève(s)`)} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="grid grid-cols-2 rounded-lg bg-sunken p-1 text-sm">
              {([7, 30] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  aria-pressed={range === r}
                  className={`min-h-10 rounded-md px-4 font-medium ${range === r ? "bg-surface shadow-sm" : "text-muted"}`}
                >
                  {t(`最近 ${r} 天`, `${r} derniers jours`)}
                </button>
              ))}
            </div>
            <button type="button" className={btnQuiet} onClick={load}>
              {t("重新整理", "Actualiser")}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Mini label={t("有練習的學生", "Élèves actifs")} value={`${active}／${data.members.length}`} />
            <Mini label={t("全班練習時間", "Temps total")} value={`${minutes(totalSec)} min`} />
            <Mini label={t("平均每人", "Moyenne par élève")} value={`${data.members.length ? minutes(totalSec / data.members.length) : 0} min`} />
          </div>

          {rows.length === 0 ? (
            <Card className="p-6 text-muted">{t("還沒有學生加入。把右邊的代碼或邀請連結給學生吧。", "Aucun élève pour l’instant. Partagez le code ou le lien d’invitation.")}</Card>
          ) : (
            <Card className="overflow-hidden">
              <div className="hidden grid-cols-[minmax(0,1.6fr)_repeat(5,minmax(0,1fr))] gap-2 border-b border-line bg-sunken/60 px-4 py-2 text-xs text-muted md:grid">
                <span>{t("學生", "Élève")}</span>
                <span className="text-right">{t("練習天數", "Jours")}</span>
                <span className="text-right">{t("時間（分）", "Temps (min)")}</span>
                <span className="text-right">{t("作答題數", "Questions")}</span>
                <span className="text-right">{t("正確率", "Réussite")}</span>
                <span className="text-right">{t("待複習", "À réviser")}</span>
              </div>
              <ul className="divide-y divide-line">
                {rows.map(({ m, s }) => {
                  const pct = s.answered ? Math.round((s.correct / s.answered) * 100) : null;
                  const idle = !s.lastAt || now - s.lastAt > 7 * DAY;
                  return (
                    <li key={m.userId}>
                      <button
                        type="button"
                        onClick={() => setOpen(open === m.userId ? null : m.userId)}
                        aria-expanded={open === m.userId}
                        className="grid w-full grid-cols-4 gap-2 px-4 py-3 text-left transition hover:bg-sunken/60 md:grid-cols-[minmax(0,1.6fr)_repeat(5,minmax(0,1fr))] md:items-center"
                      >
                        <span className="col-span-4 min-w-0 md:col-span-1">
                          <span className="block truncate font-medium">{m.name || t("（未設定名字）", "(sans nom)")}</span>
                          <span className={`text-xs ${idle ? "text-warn" : "text-muted"}`}>
                            {s.lastAt ? t(`最後練習 ${md(s.lastAt)}`, `Dernière activité : ${md(s.lastAt, "fr")}`) : t("還沒有練習", "Aucune activité")}
                          </span>
                        </span>
                        <Cell label={t("天數", "Jours")} value={`${s.days}`} />
                        <Cell label={t("分鐘", "Minutes")} value={minutes(s.sec)} />
                        <Cell label={t("題數", "Questions")} value={`${s.answered}`} />
                        <Cell label={t("正確率", "Réussite")} value={pct === null ? "–" : `${pct}%`} />
                        <span className="hidden text-right tabular-nums md:block">{s.due}</span>
                      </button>
                      {open === m.userId && (
                        <MemberDetail
                          member={m}
                          due={s.due}
                          mastered={s.mastered}
                          onRemove={async () => {
                            if (!window.confirm(t(`確定要把「${m.name || "這位學生"}」移出班級嗎？`, `Retirer « ${m.name || "cet élève"} » de la classe ?`))) return;
                            await removeMember(cls.id, m.userId);
                            setOpen(null);
                            load();
                          }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}

          <Card className="p-4 sm:p-5">
            <div className="eyebrow">Points faibles de la classe</div>
            <h2 className="display text-lg font-bold">{t("全班最需要加強的文法點", "Points faibles de la classe")}</h2>
            {classWeak.length === 0 ? (
              <p className="mt-2 text-sm text-muted">{t("學生作答的資料還不夠，等大家多練習幾次後就會出現。", "Pas encore assez de données : cette liste apparaîtra après quelques exercices.")}</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {classWeak.map((g) => (
                  <li key={`${g.level}-${g.grammar}`}>
                    <div className="flex items-baseline justify-between gap-2 text-sm">
                      <span className="truncate">
                        <span className="mr-1.5 rounded bg-accent-soft px-1.5 py-0.5 text-xs font-semibold text-accent">{g.level}</span>
                        {topicName(g.level, "grammar", g.grammar)}
                      </span>
                      <span className="shrink-0 text-muted tabular-nums">
                        {g.pct}%・{t(`${g.people} 人・${g.n} 次`, `${g.people} élève(s) · ${g.n} réponses`)}
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-sunken" role="img" aria-label={t(`正確率 ${g.pct}%`, `Réussite ${g.pct} %`)}>
                      <div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(g.pct, 2)}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="space-y-4 lg:sticky lg:top-6">
          <Card className="p-5">
            <div className="eyebrow">Inviter</div>
            <h2 className="display text-lg font-bold">{t("邀請學生", "Inviter des élèves")}</h2>
            <div className="display mt-3 rounded-lg bg-sunken py-3 text-center text-4xl font-bold tracking-[0.25em]">{cls.join_code}</div>
            <p className="mt-2 text-xs text-muted">{t("學生登入後，在「我的帳號」輸入這組代碼；或直接打開邀請連結。", "Les élèves saisissent ce code dans « Mon compte » après connexion, ou ouvrent directement le lien.")}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                className={btnPrimary}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(link);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch {
                    window.prompt(t("請複製這個連結：", "Copiez ce lien :"), link);
                  }
                }}
              >
                {copied ? t("已複製 ✓", "Copié ✓") : t("複製邀請連結", "Copier le lien d’invitation")}
              </button>
              <button
                type="button"
                className={btnQuiet}
                onClick={async () => {
                  if (!window.confirm(t("重新產生代碼後，舊的代碼和連結就不能再用來加入（已加入的學生不受影響）。確定嗎？", "L’ancien code et l’ancien lien ne fonctionneront plus (les élèves déjà inscrits restent). Continuer ?"))) return;
                  const code = await regenerateCode(cls.id);
                  setData((d) => (d ? { ...d, cls: { ...d.cls, join_code: code } } : d));
                }}
              >
                {t("重新產生代碼", "Nouveau code")}
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="eyebrow">Réglages</div>
            <h2 className="display text-lg font-bold">{t("班級設定", "Paramètres")}</h2>
            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                className={btnQuiet}
                onClick={async () => {
                  const name = window.prompt(t("新的班級名稱：", "Nouveau nom de la classe :"), cls.name);
                  if (!name || !name.trim()) return;
                  await renameClass(cls.id, name);
                  setData((d) => (d ? { ...d, cls: { ...d.cls, name: name.trim().slice(0, 60) } } : d));
                }}
              >
                {t("修改名稱", "Renommer")}
              </button>
              <button
                type="button"
                className={`${btnQuiet} text-bad`}
                onClick={async () => {
                  if (!window.confirm(t(`確定要刪除「${cls.name}」嗎？學生的學習紀錄不會被刪除，但你就看不到了。`, `Supprimer « ${cls.name} » ? L’historique des élèves est conservé, mais vous n’y aurez plus accès.`))) return;
                  await deleteClass(cls.id);
                  router.replace("/class/");
                }}
              >
                {t("刪除班級", "Supprimer la classe")}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-3 sm:p-4">
      <div className="text-xs text-muted">{label}</div>
      <div className="display mt-1 text-xl font-bold tabular-nums sm:text-2xl">{value}</div>
    </Card>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-left md:text-right">
      <span className="block text-[11px] text-muted md:hidden">{label}</span>
      <span className="tabular-nums">{value}</span>
    </span>
  );
}

function MemberDetail({ member, due, mastered, onRemove }: { member: Member; due: number; mastered: number; onRemove: () => void }) {
  const weak = weakestGrammar([member.stats], 3, 3);
  const recent = [...member.sessions].reverse().slice(0, 5);
  const lang = useLang();
  const t = (zh: string, fr: string) => (lang === "fr" ? fr : zh);
  return (
    <div className="space-y-3 bg-sunken/40 px-4 py-3 text-sm">
      <p className="text-muted">
        {t(`待複習 ${due} 題・已掌握 ${mastered} 題・加入於 ${md(new Date(member.joinedAt).getTime())}`, `À réviser : ${due} · maîtrisées : ${mastered} · inscrit(e) le ${md(new Date(member.joinedAt).getTime(), "fr")}`)}
      </p>
      <div>
        <div className="mb-1 font-bold">{t("較弱的文法點", "Points faibles")}</div>
        {weak.length === 0 ? (
          <p className="text-muted">{t("資料還不夠。", "Pas encore assez de données.")}</p>
        ) : (
          <ul className="space-y-0.5">
            {weak.map((g) => (
              <li key={`${g.level}-${g.grammar}`}>
                {g.level} {topicName(g.level, "grammar", g.grammar, lang)}：{g.pct}%（{t(`${g.n} 次`, `${g.n} rép.`)}）
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div className="mb-1 font-bold">{t("最近的練習（30 天內）", "Activité récente (30 jours)")}</div>
        {recent.length === 0 ? (
          <p className="text-muted">{t("沒有紀錄。", "Aucune activité.")}</p>
        ) : (
          <ul className="space-y-0.5">
            {recent.map((s) => {
              const r = Object.values(s.res);
              return (
                <li key={s.id} className="flex justify-between gap-2">
                  <span className="truncate">
                    {md(s.at, lang)} {s.title}
                  </span>
                  <span className="shrink-0 tabular-nums">
                    {r.filter((x) => x === "c").length}／{r.length}・{minutes(s.sec)} min
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <button type="button" onClick={onRemove} className="min-h-10 text-sm text-muted hover:text-bad">
        {t("移出班級", "Retirer de la classe")}
      </button>
    </div>
  );
}
