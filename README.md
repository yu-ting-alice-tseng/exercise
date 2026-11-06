# 法文練習題產生器

依等級（A1～C2）、文法點或主題，從題庫抽題：

- **線上練習**：直接作答，一鍵檢查答案，看解析，重做答錯的題目
- **A／B 考卷**：同範圍、不同題目的兩份考卷，可列印或存成 PDF
- 每份卷子都有固定網址，可以直接把線上作答連結傳給學生

純靜態網站，放在 GitHub Pages，不需要伺服器或 API 費用。

## 本機開發

```bash
npm install
npm run dev
```

打開 http://localhost:3000

## 新增題目

1. 題庫在 `data/questions/<等級>/<文法點>.json`，一個文法點一個檔案
2. 新檔案要在 `lib/bank.ts` 加一行 import
3. 執行 `npm run validate` 檢查格式（id 重複、文法點或主題代號打錯、答案索引錯誤等）

文法點和主題清單在 `lib/taxonomy.ts`。

### 題目格式

```jsonc
{
  "id": "a2-pc-005",            // 唯一編號
  "level": "A2",                // A1、A2、B1、B2、C1、C2
  "grammar": "passe-compose",   // 文法點代號
  "themes": ["voyage"],         // 主題代號，可多個
  "type": "fill",               // choice（選擇）、fill（填充）、short（簡答）
  "difficulty": 2,              // 1 基礎、2 標準、3 進階
  "instruction": "請填入括號內動詞的複合過去式",
  "stem": "L'été dernier, nous ___ (aller) en Bretagne.",  // ___ 是空格
  "answers": ["sommes allés", "sommes allées"],             // 所有可接受的答案
  "explanation": "aller 用 être 當助動詞……"
}
```

- 選擇題用 `options`（選項陣列）和 `answer`（正確選項的索引，從 0 開始），選項順序會自動打亂
- 填充題自動批改：不分大小寫、忽略句尾標點；只差重音符號時顯示「差一點」
- 簡答題也會自動批改：`answers` 要列出**所有可接受的寫法**，系統挑最接近的一個逐字比對，標出寫錯和漏掉的字；學生如果覺得自己的寫法也對，可以按「算我答對」
- 開放式作答的簡答題（沒有固定答案）加上 `"open": true`，就會改成顯示參考答案、讓學生自己勾選對錯

## 部署

push 到 `main` 分支後，GitHub Actions 會自動檢查題庫、建置並部署到
`https://<帳號>.github.io/<repo 名稱>/`。

第一次使用前，到 repo 的 **Settings → Pages → Source** 選擇 **GitHub Actions**。

## 登入與雲端資料庫（選用）

設定 Supabase 後，網站會出現登入功能：學習紀錄同步到雲端，老師可以建立班級、追蹤學生進度。
設定步驟見 [docs/supabase-setup.md](docs/supabase-setup.md)。沒有設定時，紀錄只存在各自的瀏覽器裡。

- 資料表與權限規則：`supabase/migrations/0001_init.sql`
- 登入狀態：`lib/auth.ts`；同步：`lib/sync.ts`；班級：`lib/classes.ts`

## 模擬考

`/exam/` 提供依照 DELF、DALF、TCF、TEF、商務法語題型**原創**的模擬卷，以及依等級出題的期末綜合卷。
題目全部原創，不轉載官方真題。

- 考卷檔案：`data/exams/<id>.json`，新增後要在 `lib/exams.ts` 加一行 import（`npm run validate` 會檢查）
- 段落種類：`listening`（用瀏覽器語音朗讀）、`reading`、`structure`、`writing`（自我檢核＋範文）、`bank`（從題庫隨機抽題）
- 格式定義：`lib/examTypes.ts`
