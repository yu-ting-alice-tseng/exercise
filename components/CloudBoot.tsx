"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { fullSync, startAutoSync } from "@/lib/sync";

/** 掛在每一頁：登入後自動同步學習紀錄 */
export default function CloudBoot() {
  const { status, user } = useAuth();
  const uid = user?.id;
  useEffect(() => {
    startAutoSync();
  }, []);
  useEffect(() => {
    if (status === "signedIn" && uid) fullSync();
  }, [status, uid]);
  return null;
}
