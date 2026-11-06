"use client";

import { useSyncExternalStore } from "react";
import type { User } from "@supabase/supabase-js";
import { BASE_PATH } from "./config";
import { cloudEnabled, supabase } from "./supabase";

export interface Profile {
  id: string;
  display_name: string;
}

export interface AuthState {
  status: "disabled" | "loading" | "signedOut" | "signedIn";
  user: User | null;
  profile: Profile | null;
}

let state: AuthState = { status: cloudEnabled ? "loading" : "disabled", user: null, profile: null };
const listeners = new Set<() => void>();
let started = false;

function set(next: Partial<AuthState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

async function loadProfile(user: User) {
  const sb = supabase();
  if (!sb) return;
  const { data } = await sb.from("profiles").select("id, display_name").eq("id", user.id).maybeSingle();
  if (state.user?.id === user.id) set({ profile: data ?? { id: user.id, display_name: "" } });
}

function start() {
  if (started) return;
  started = true;
  const sb = supabase();
  if (!sb) return;
  sb.auth.onAuthStateChange((_event, session) => {
    const user = session?.user ?? null;
    const changed = user?.id !== state.user?.id;
    set({ status: user ? "signedIn" : "signedOut", user, profile: changed ? null : state.profile });
    if (user && changed) {
      // 不要在 onAuthStateChange 裡直接 await Supabase 的呼叫，避免卡住
      setTimeout(() => loadProfile(user), 0);
    }
  });
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  start();
  return () => listeners.delete(cb);
}

const serverState: AuthState = { status: "loading", user: null, profile: null };

export function useAuth(): AuthState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => (cloudEnabled ? serverState : state),
  );
}

export function getAuth(): AuthState {
  start();
  return state;
}

/** 寄出登入連結 */
export async function sendLoginLink(email: string, next = "/account/") {
  const sb = supabase();
  if (!sb) throw new Error("cloud disabled");
  const { error } = await sb.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${window.location.origin}${BASE_PATH}${next}`, shouldCreateUser: true },
  });
  if (error) throw error;
}

export async function signOut() {
  await supabase()?.auth.signOut();
}

export async function updateDisplayName(name: string) {
  const sb = supabase();
  const user = state.user;
  if (!sb || !user) return;
  const display_name = name.trim().slice(0, 40);
  const { error } = await sb.from("profiles").update({ display_name }).eq("id", user.id);
  if (error) throw error;
  set({ profile: { id: user.id, display_name } });
}
