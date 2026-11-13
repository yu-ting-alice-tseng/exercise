/**
 * 俗語諺語的間隔複習（存在這台瀏覽器的 localStorage）。
 *
 * 依據艾賓浩斯的遺忘曲線：記憶會隨時間衰減，每次在快要忘記時成功回想，
 * 記憶就更穩固，下一次可以隔更久再複習。這裡用常見的做法來估算：
 * - 每則有一個「間隔」ivl（天）。剛好到間隔那天，預估記憶保留率是 90%。
 * - 保留率 R = 0.9 ^ (經過天數 ÷ ivl)，經過越久越低。
 * - 答對：間隔乘上「難易係數」ease（約 2.5 倍），越熟拉得越長；
 *   選擇題只要認得出來，比填空題容易，所以間隔拉長得少一點。
 * - 答錯：間隔回到 1 天，難易係數下降，之後會更常出現。
 */

const KEY = "french-quiz:idioms";
export const DAY = 86_400_000;

export interface IdiomCard {
  /** 標為已學的時間 */
  learned: number;
  /** 上次複習（或標為已學）的時間 */
  last: number;
  /** 目前的間隔（天） */
  ivl: number;
  ease: number;
  /** 連續答對次數 */
  reps: number;
  /** 答錯（遺忘）次數 */
  lapses: number;
}

export type IdiomStore = Record<string, IdiomCard>;

const listeners = new Set<() => void>();

export function srsSnapshot(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function subscribeSrs(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function parseSrs(raw: string | null): IdiomStore {
  try {
    const v = raw ? (JSON.parse(raw) as IdiomStore) : {};
    return v && typeof v === "object" ? v : {};
  } catch {
    return {};
  }
}

function save(s: IdiomStore) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // 無痕模式或儲存空間被封鎖時無法保存
  }
  listeners.forEach((l) => l());
}

const load = () => parseSrs(srsSnapshot());

export function getCard(id: string): IdiomCard | undefined {
  return load()[id];
}

/** 還原某一則的狀態（例如學生按「算我答對」時，先回到作答前） */
export function setCard(id: string, c: IdiomCard | undefined) {
  const s = load();
  if (c) s[id] = c;
  else delete s[id];
  save(s);
}

/** 標為已學：第一次複習排在一天後 */
export function markLearned(ids: string[], now = Date.now()) {
  const s = load();
  for (const id of ids) if (!s[id]) s[id] = { learned: now, last: now, ivl: 1, ease: 2.5, reps: 0, lapses: 0 };
  save(s);
}

export function unmarkLearned(id: string) {
  const s = load();
  delete s[id];
  save(s);
}

export function dueAt(c: IdiomCard): number {
  return c.last + c.ivl * DAY;
}

export function isDue(c: IdiomCard, now: number): boolean {
  return now >= dueAt(c);
}

/** 預估目前的記憶保留率（0 到 1） */
export function retention(c: IdiomCard, now: number): number {
  const days = Math.max(0, now - c.last) / DAY;
  return Math.pow(0.9, days / c.ivl);
}

/**
 * 記錄一次複習結果。
 * strength：1＝填空完全正確；0.8＝選擇題答對；0.6＝填空用了提示、重音有誤或自己判定答對。
 */
export function reviewIdiom(id: string, ok: boolean, strength: number, now = Date.now()) {
  const s = load();
  const c = s[id] ?? { learned: now, last: now, ivl: 1, ease: 2.5, reps: 0, lapses: 0 };
  if (ok) {
    const base = c.reps === 0 ? 3 : c.ivl * c.ease;
    // 提早複習時（還沒到期就答對），只按實際經過的時間給分，避免間隔暴增
    const elapsed = Math.max(0, now - c.last) / DAY;
    const earned = elapsed < c.ivl ? c.ivl + (base - c.ivl) * (elapsed / c.ivl) : base;
    c.ivl = Math.min(365, Math.max(1, earned * strength));
    c.ease = Math.min(3, c.ease + (strength >= 1 ? 0.05 : strength < 0.7 ? -0.1 : 0));
    c.reps += 1;
  } else {
    c.ivl = 1;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.reps = 0;
    c.lapses += 1;
  }
  c.last = now;
  s[id] = c;
  save(s);
  return c;
}

/** 依記憶狀態分級，給畫面顯示用 */
export function strengthLabel(c: IdiomCard): { zh: string; fr: string } {
  if (c.ivl >= 30) return { zh: "已熟記", fr: "Acquis" };
  if (c.ivl >= 7) return { zh: "記得不錯", fr: "Bien retenu" };
  return { zh: "剛學會", fr: "Récent" };
}
