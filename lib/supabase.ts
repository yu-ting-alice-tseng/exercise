"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// 建置時由 GitHub Actions 帶入（publishable key 本來就會出現在前端，不是秘密；
// 資料安全由資料庫的列層級權限 RLS 保護）。
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

/** 沒有設定 Supabase 時，網站維持「只存在本機」的模式 */
export const cloudEnabled = Boolean(URL && KEY);

let client: SupabaseClient | null = null;

export function supabase(): SupabaseClient | null {
  if (!cloudEnabled || typeof window === "undefined") return null;
  if (!client) {
    client = createClient(URL, KEY, {
      auth: {
        // 用 implicit：登入連結在任何瀏覽器打開都能登入（例如從手機的郵件 App 開啟）
        flowType: "implicit",
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "french-quiz:auth",
      },
    });
  }
  return client;
}
