"use client";

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
const md = (t: number) => new Date(t).toLocaleDateString("zh-TW", { month: "numeric", day: "numeric" });

export default function ClassClient() {
  const auth = useAuth();
  const params = useSearchParams();
  const id = params.get("id");

  if (auth.status === "disabled") {
    return (
      <main className={`${container} pt-5 sm:pt-8`}>
        <PageTitle fr="Mes classes" zh="我的班級" />
        <Card className="p-6 text-muted">雲端功能還沒有設定，暫時無法建立班級。</Card>
      </main>
    );
  }
  if (auth.status === "loading") return <main className={`${container} py-10 text-muted`}>載入中…</main>;
  if (auth.status === "signedOut") {
    return (
      <main className={`${container} pt-5 sm:pt-8`}>
        <PageTitle fr="Espace enseignant" zh="老師專區" sub="請先登入，才能建立和管理班級。" />
        <Card className="max-w-lg p-5">
          <LoginForm next="/class/" />
        </Card>
      </main>
    );
  }
  return id ? <ClassDetail key={id} id={id} /> : <ClassList />;
}

function ClassList() {
  const router = useRouter();
  const [list, setList] = useState<(ClassRow & { members: number })[] | null>(null);
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    myClasses()
      .then((l) => alive && setList(l))
      .catch(() => alive && setErr("讀取班級失敗，請重新整理。"));
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
      setErr("建立失敗，請稍後再試。");
    }
  }

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle
        back={{ href: "/account/", label: "我的帳號" }}
        fr="Espace enseignant"
        zh="我的班級"
        sub="建立班級後，把 6 碼代碼或邀請連結給學生，學生加入後你就能看到他們的學習進度。"
      />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div>
          {list === null ? (
            <p className="text-muted">{err ?? "載入中…"}</p>
          ) : list.length === 0 ? (
            <Card className="p-6 text-muted">還沒有建立班級。</Card>
          ) : (
            <ul className="space-y-3">
              {list.map((c) => (
                <li key={c.id}>
                  <Link href={`/class/?id=${c.id}`} className="block">
                    <Card className="flex items-center justify-between gap-3 p-4 transition hover:border-accent/60 sm:p-5">
                      <div className="min-w-0">
                        <div className="display truncate text-lg font-bold">{c.name}</div>
                        <div className="text-sm text-muted">
                          {c.members} 位學生・代碼 <span className="display tracking-widest">{c.join_code}</span>
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
          <h2 className="display text-lg font-bold">建立新班級</h2>
          <form onSubmit={create} className="mt-3 space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              required
              placeholder="例如：週三晚上 A2 班"
              aria-label="班級名稱"
              className="h-11 w-full rounded-lg border border-line bg-sunken px-3 text-base outline-none focus:border-accent focus:bg-surface"
            />
            <button type="submit" className={`${btnPrimary} w-full`}>
              建立
            </button>
          </form>
          {err && list !== null && <p className="mt-2 text-sm text-bad">{err}</p>}
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
  const [open, setOpen] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await classDetail(id, Date.now() - 30 * DAY));
    } catch {
      setErr("找不到這個班級，或你不是這個班級的老師。");
    }
  }, [id]);

  useEffect(() => {
    let alive = true;
    classDetail(id, Date.now() - 30 * DAY)
      .then((d) => alive && setData(d))
      .catch(() => alive && setErr("找不到這個班級，或你不是這個班級的老師。"));
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
        <PageTitle back={{ href: "/class/", label: "我的班級" }} fr="Classe" zh="班級" />
        <Card className="p-6 text-muted">{err}</Card>
      </main>
    );
  }
  if (!data) return <main className={`${container} py-10 text-muted`}>載入中…</main>;

  const { cls } = data;
  const link = typeof window !== "undefined" ? `${window.location.origin}${BASE_PATH}/join/?code=${cls.join_code}` : "";
  const active = rows.filter((r) => r.s.days > 0).length;
  const totalSec = rows.reduce((a, r) => a + r.s.sec, 0);

  return (
    <main className={`${container} pt-5 sm:pt-8`}>
      <PageTitle back={{ href: "/class/", label: "我的班級" }} fr="Classe" zh={cls.name} sub={`${data.members.length} 位學生`} />

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
                  最近 {r} 天
                </button>
              ))}
            </div>
            <button type="button" className={btnQuiet} onClick={load}>
              重新整理
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Mini label="有練習的學生" value={`${active}／${data.members.length}`} />
            <Mini label="全班練習時間" value={`${minutes(totalSec)} 分`} />
            <Mini label="平均每人" value={`${data.members.length ? minutes(totalSec / data.members.length) : 0} 分`} />
          </div>

          {rows.length === 0 ? (
            <Card className="p-6 text-muted">還沒有學生加入。把右邊的代碼或邀請連結給學生吧。</Card>
          ) : (
            <Card className="overflow-hidden">
              <div className="hidden grid-cols-[minmax(0,1.6fr)_repeat(5,minmax(0,1fr))] gap-2 border-b border-line bg-sunken/60 px-4 py-2 text-xs text-muted md:grid">
                <span>學生</span>
                <span className="text-right">練習天數</span>
                <span className="text-right">時間（分）</span>
                <span className="text-right">作答題數</span>
                <span className="text-right">正確率</span>
                <span className="text-right">待複習</span>
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
                          <span className="block truncate font-medium">{m.name || "（未設定名字）"}</span>
                          <span className={`text-xs ${idle ? "text-warn" : "text-muted"}`}>
                            {s.lastAt ? `最後練習 ${md(s.lastAt)}` : "還沒有練習"}
                          </span>
                        </span>
                        <Cell label="天數" value={`${s.days}`} />
                        <Cell label="分鐘" value={minutes(s.sec)} />
                        <Cell label="題數" value={`${s.answered}`} />
                        <Cell label="正確率" value={pct === null ? "–" : `${pct}%`} />
                        <span className="hidden text-right tabular-nums md:block">{s.due}</span>
                      </button>
                      {open === m.userId && (
                        <MemberDetail
                          member={m}
                          due={s.due}
                          mastered={s.mastered}
                          onRemove={async () => {
                            if (!window.confirm(`確定要把「${m.name || "這位學生"}」移出班級嗎？`)) return;
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
            <h2 className="display text-lg font-bold">全班最需要加強的文法點</h2>
            {classWeak.length === 0 ? (
              <p className="mt-2 text-sm text-muted">學生作答的資料還不夠，等大家多練習幾次後就會出現。</p>
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
                        {g.pct}%・{g.people} 人・{g.n} 次
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-sunken" role="img" aria-label={`正確率 ${g.pct}%`}>
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
            <h2 className="display text-lg font-bold">邀請學生</h2>
            <div className="display mt-3 rounded-lg bg-sunken py-3 text-center text-4xl font-bold tracking-[0.25em]">{cls.join_code}</div>
            <p className="mt-2 text-xs text-muted">學生登入後，在「我的帳號」輸入這組代碼；或直接打開邀請連結。</p>
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
                    window.prompt("請複製這個連結：", link);
                  }
                }}
              >
                {copied ? "已複製 ✓" : "複製邀請連結"}
              </button>
              <button
                type="button"
                className={btnQuiet}
                onClick={async () => {
                  if (!window.confirm("重新產生代碼後，舊的代碼和連結就不能再用來加入（已加入的學生不受影響）。確定嗎？")) return;
                  const code = await regenerateCode(cls.id);
                  setData((d) => (d ? { ...d, cls: { ...d.cls, join_code: code } } : d));
                }}
              >
                重新產生代碼
              </button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="eyebrow">Réglages</div>
            <h2 className="display text-lg font-bold">班級設定</h2>
            <div className="mt-3 flex flex-col gap-2">
              <button
                type="button"
                className={btnQuiet}
                onClick={async () => {
                  const name = window.prompt("新的班級名稱：", cls.name);
                  if (!name || !name.trim()) return;
                  await renameClass(cls.id, name);
                  setData((d) => (d ? { ...d, cls: { ...d.cls, name: name.trim().slice(0, 60) } } : d));
                }}
              >
                修改名稱
              </button>
              <button
                type="button"
                className={`${btnQuiet} text-bad`}
                onClick={async () => {
                  if (!window.confirm(`確定要刪除「${cls.name}」嗎？學生的學習紀錄不會被刪除，但你就看不到了。`)) return;
                  await deleteClass(cls.id);
                  router.replace("/class/");
                }}
              >
                刪除班級
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
  return (
    <div className="space-y-3 bg-sunken/40 px-4 py-3 text-sm">
      <p className="text-muted">
        待複習 {due} 題・已掌握 {mastered} 題・加入於 {md(new Date(member.joinedAt).getTime())}
      </p>
      <div>
        <div className="mb-1 font-bold">較弱的文法點</div>
        {weak.length === 0 ? (
          <p className="text-muted">資料還不夠。</p>
        ) : (
          <ul className="space-y-0.5">
            {weak.map((g) => (
              <li key={`${g.level}-${g.grammar}`}>
                {g.level} {topicName(g.level, "grammar", g.grammar)}：{g.pct}%（{g.n} 次）
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div className="mb-1 font-bold">最近的練習（30 天內）</div>
        {recent.length === 0 ? (
          <p className="text-muted">沒有紀錄。</p>
        ) : (
          <ul className="space-y-0.5">
            {recent.map((s) => {
              const r = Object.values(s.res);
              return (
                <li key={s.id} className="flex justify-between gap-2">
                  <span className="truncate">
                    {md(s.at)} {s.title}
                  </span>
                  <span className="shrink-0 tabular-nums">
                    {r.filter((x) => x === "c").length}／{r.length}・{minutes(s.sec)} 分
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <button type="button" onClick={onRemove} className="min-h-10 text-sm text-muted hover:text-bad">
        移出班級
      </button>
    </div>
  );
}
