-- 法文練習題：登入、學習紀錄同步、班級
-- 在 Supabase 專案的 SQL Editor 貼上整份檔案，按 Run 執行一次即可。
-- 安全原則：每張表都開啟列層級權限（RLS）。
--   學生：只能讀寫自己的資料。
--   老師：只能「讀取」加入自己班級的學生資料，不能修改。

-- ===== 個人資料 =====
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 40),
  created_at timestamptz not null default now()
);

-- 新使用者註冊時，自動建立個人資料
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ===== 學習紀錄 =====
-- 每一題的作答統計與間隔複習狀態（對應前端 lib/progress.ts 的 QStat）
create table public.question_stats (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  question_id text not null check (char_length(question_id) <= 40),
  n integer not null default 0 check (n >= 0),
  ok integer not null default 0 check (ok >= 0),
  miss integer not null default 0 check (miss >= 0),
  box smallint not null default 0 check (box between 0 and 6),
  due bigint not null default 0,
  last bigint not null default 0,
  r text not null default 'c' check (r in ('c', 'a', 'w')),
  primary key (user_id, question_id)
);

-- 每一次「檢查答案」（對應前端的 SessionRec）
create table public.sessions (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id text not null check (char_length(id) <= 40),
  at timestamptz not null,
  sec integer not null default 0 check (sec between 0 and 86400),
  kind text not null check (kind in ('practice', 'review', 'exam')),
  level text check (level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  title text not null default '' check (char_length(title) <= 200),
  res jsonb not null default '{}'::jsonb,
  g jsonb not null default '{}'::jsonb,
  primary key (user_id, id)
);

create index sessions_user_at on public.sessions (user_id, at desc);

-- ===== 班級 =====
-- 6 碼加入代碼，排除容易混淆的 0、O、1、I、L
create function public.gen_join_code()
returns text
language sql
volatile
set search_path = ''
as $$
  select string_agg(substr('ABCDEFGHJKMNPQRSTUVWXYZ23456789', (floor(random() * 31) + 1)::int, 1), '')
  from generate_series(1, 6);
$$;

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 60),
  join_code text not null unique default public.gen_join_code(),
  created_at timestamptz not null default now()
);

create table public.class_members (
  class_id uuid not null references public.classes (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (class_id, user_id)
);

create index class_members_user on public.class_members (user_id);

-- ===== 權限判斷函式 =====
-- 用 security definer 避免 RLS 規則互相查詢時無限遞迴
create function public.is_class_teacher(cid uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.classes c where c.id = cid and c.teacher_id = auth.uid());
$$;

create function public.is_class_member(cid uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.class_members m where m.class_id = cid and m.user_id = auth.uid());
$$;

-- 這位學生是否加入了「我」開的班級
create function public.is_my_student(student uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.class_members m
    join public.classes c on c.id = m.class_id
    where m.user_id = student and c.teacher_id = auth.uid()
  );
$$;

-- 這位使用者是否是「我」加入的班級的老師
create function public.is_my_teacher(teacher uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.class_members m
    join public.classes c on c.id = m.class_id
    where c.teacher_id = teacher and m.user_id = auth.uid()
  );
$$;

-- 用代碼加入班級（學生不能直接寫入 class_members）
create function public.join_class(code text)
returns table (class_id uuid, class_name text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  c public.classes;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;
  select * into c from public.classes where join_code = upper(trim(code));
  if not found then
    raise exception 'invalid join code';
  end if;
  insert into public.class_members (class_id, user_id) values (c.id, auth.uid()) on conflict do nothing;
  return query select c.id, c.name;
end;
$$;

-- 老師重新產生加入代碼（舊代碼失效）
create function public.regenerate_join_code(cid uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_code text;
begin
  if not public.is_class_teacher(cid) then
    raise exception 'not the teacher of this class';
  end if;
  loop
    new_code := public.gen_join_code();
    exit when not exists (select 1 from public.classes where join_code = new_code);
  end loop;
  update public.classes set join_code = new_code where id = cid;
  return new_code;
end;
$$;

revoke execute on function public.join_class(text) from public, anon;
revoke execute on function public.regenerate_join_code(uuid) from public, anon;
grant execute on function public.join_class(text) to authenticated;
grant execute on function public.regenerate_join_code(uuid) to authenticated;

-- ===== 列層級權限（RLS） =====
alter table public.profiles enable row level security;
alter table public.question_stats enable row level security;
alter table public.sessions enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;

-- 個人資料：自己可讀寫；老師可讀學生的名字；學生可讀老師的名字
create policy "profiles: read own, my students, my teachers" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_my_student(id) or public.is_my_teacher(id));
create policy "profiles: update own" on public.profiles
  for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- 學習紀錄：自己完整讀寫；老師只能讀取
create policy "question_stats: own" on public.question_stats
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "question_stats: teacher reads students" on public.question_stats
  for select to authenticated
  using (public.is_my_student(user_id));

create policy "sessions: own" on public.sessions
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "sessions: teacher reads students" on public.sessions
  for select to authenticated
  using (public.is_my_student(user_id));

-- 班級：老師管理自己的班級；學生可以看到自己加入的班級
create policy "classes: teacher or member reads" on public.classes
  for select to authenticated
  using (teacher_id = auth.uid() or public.is_class_member(id));
create policy "classes: teacher creates" on public.classes
  for insert to authenticated
  with check (teacher_id = auth.uid());
create policy "classes: teacher updates" on public.classes
  for update to authenticated
  using (teacher_id = auth.uid()) with check (teacher_id = auth.uid());
create policy "classes: teacher deletes" on public.classes
  for delete to authenticated
  using (teacher_id = auth.uid());

-- 班級成員：自己或該班老師可讀；自己可退出、老師可移除；加入只能透過 join_class()
create policy "class_members: self or teacher reads" on public.class_members
  for select to authenticated
  using (user_id = auth.uid() or public.is_class_teacher(class_id));
create policy "class_members: self leaves or teacher removes" on public.class_members
  for delete to authenticated
  using (user_id = auth.uid() or public.is_class_teacher(class_id));
