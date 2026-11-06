# 設定 Supabase（登入與雲端資料庫）

網站放在 GitHub Pages，登入和資料庫用 Supabase。Supabase 免費方案就夠一般班級使用。
沒有設定 Supabase 時，網站照常運作，只是學習紀錄只存在各自的瀏覽器裡。

整個設定大約 15 分鐘。

## 1. 建立 Supabase 專案

1. 到 [supabase.com](https://supabase.com) 註冊並登入
2. 按 **New project**
   - Name：例如 `french-exercise`
   - Database Password：按 Generate 產生一組，**另外存好**（之後很少用到）
   - Region：選 **Northeast Asia (Tokyo)** 或 **Southeast Asia (Singapore)**，離台灣比較近
3. 等專案建立完成（約 1～2 分鐘）

## 2. 建立資料表與權限規則

1. 左側選單點 **SQL Editor**
2. 打開這個 repo 的 `supabase/migrations/0001_init.sql`，**整份複製**貼上
3. 按 **Run**，看到 `Success. No rows returned` 就完成了

這份檔案會建立個人資料、學習紀錄、班級三組資料表，並開啟列層級權限（RLS）：

- 學生只能讀寫自己的紀錄
- 老師只能「讀取」加入自己班級的學生紀錄，不能修改或刪除
- 學生不能自己寫入班級名單，只能用老師給的代碼加入

## 3. 設定登入連結要回到哪裡

1. 左側選單點 **Authentication** → **URL Configuration**
2. **Site URL** 填：
   ```
   https://yu-ting-alice-tseng.github.io/exercise/account/
   ```
3. **Redirect URLs** 按 Add URL，加入：
   ```
   https://yu-ting-alice-tseng.github.io/exercise/**
   ```
4. 按 Save

## 4. 寄信設定（班級使用前一定要做）

Supabase 內建的寄信服務**每小時只能寄很少封信**（只適合自己測試）。全班同時登入會寄不出去。

正式給學生用之前，請在 **Authentication** → **Emails** → **SMTP Settings** 設定自己的寄信服務，例如
[Resend](https://resend.com) 或 [Brevo](https://www.brevo.com)（都有免費方案）。設定完成後，
到 **Authentication** → **Rate Limits** 把每小時寄信上限調高。

也建議把登入信改成中文：**Authentication** → **Emails** → **Templates** → **Magic Link**，例如：

```html
<h2>登入法文練習題</h2>
<p>點下面的連結就能登入（連結 1 小時內有效）：</p>
<p><a href="{{ .ConfirmationURL }}">登入</a></p>
<p>如果不是你本人申請，請忽略這封信。</p>
```

## 5. 把 Supabase 的網址和金鑰告訴網站

1. 左側選單點 **Project Settings** → **API Keys**（或 **Data API**）
2. 找到這兩個值：
   - **Project URL**：像 `https://abcdefgh.supabase.co`
   - **Publishable key**：`sb_publishable_` 開頭（舊版專案叫 **anon public** key）

這兩個值本來就會出現在網站的程式碼裡，不是秘密；資料安全靠第 2 步的權限規則保護。

> ⚠️ **不要**使用 `sb_secret_` 開頭的 Secret key 或 `service_role` key。它們可以略過所有權限規則，絕對不能放進網站。

3. 到 GitHub 的 repo 頁面：**Settings** → **Secrets and variables** → **Actions** → **Variables** 分頁 → **New repository variable**，新增兩個：

   | Name | Value |
   |---|---|
   | `SUPABASE_URL` | Project URL |
   | `SUPABASE_PUBLISHABLE_KEY` | Publishable key |

4. 到 **Actions** → **部署到 GitHub Pages** → **Run workflow**，重新部署一次

部署完成後，網站頁首會出現「登入」。

## 注意事項

- **免費方案會自動暫停**：連續 7 天沒有人使用，Supabase 會暫停專案，到 Supabase 後台按一下 Restore 就會恢復，資料不會不見。學期中有學生持續練習就不會暫停。
- **登出會清除這台裝置上的紀錄**：紀錄已經存在雲端，重新登入就會回來。這是為了避免共用電腦時，下一個人看到上一個人的紀錄。
- **老師看得到什麼**：加入班級的學生最近 30 天的練習時間、天數、題數、正確率、待複習題數、較弱的文法點。老師看不到學生的 Email。
