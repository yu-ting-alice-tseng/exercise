import type { WritingBasics } from "@/lib/writingTypes";

/** 寫作通用技巧：不分文類都用得到 */
export const BASICS: WritingBasics = {
  intro:
    "不管寫訊息、書信還是論說文，法文寫作有幾個共同的要求：先想清楚寫給誰、要達成什麼目的，再決定語域、結構和用字。這一頁整理所有文類都用得到的技巧。",
  sections: [
    {
      t: "動筆前：先回答三個問題",
      d: "1. 寫給誰？朋友、不認識的人、機關、老師？這決定用 tu 還是 vous、口語還是正式。\n2. 為什麼寫？邀請、詢問、抱怨、說服、敘述？這決定文章的結構。\n3. 題目要求什麼？考試題目通常有好幾個要點（例如「說明問題、提出要求」），每一點都要寫到，漏一點就會扣分。",
    },
    {
      t: "先列大綱，再寫",
      d: "花幾分鐘把要寫的內容分成段落，每段只講一個重點。法文的段落通常是：一句主題句 → 說明或例子 → 一句過渡或小結。寫完一段就換行，讓讀的人一眼看出結構。",
    },
    {
      t: "法文標點：符號前後的空格",
      d: "法國的排版規範：兩個部分組成的「高」標點（; : ! ?）前面要空一格，書名號式的引號 « » 裡面也要空格。逗號和句號前面不空格。加拿大和瑞士的規則略有不同。",
      table: {
        head: ["寫法", "正確", "錯誤"],
        rows: [
          ["問號、驚嘆號", "Tu viens ?  Super !", "Tu viens?  Super!"],
          ["冒號、分號", "Objet : demande", "Objet: demande"],
          ["引號", "« Bonjour »", "\"Bonjour\""],
          ["逗號、句號", "Oui, merci.", "Oui , merci ."],
        ],
        fr: [1, 2],
      },
    },
    {
      t: "避免重複：用代名詞和同義詞",
      d: "法文很忌諱在相鄰的句子重複同一個字。可以用代名詞（le、la、lui、y、en）、指示代名詞（celui-ci、ce dernier）或同義詞替換。",
      ex: [
        ["J’ai lu ce livre. **Ce roman** m’a beaucoup plu.", "我讀了這本書。這部小說讓我很喜歡。（livre → roman）"],
        ["Marie a rencontré Julie ; **cette dernière** était pressée.", "瑪麗遇到茱莉；後者很趕時間。（ce dernier／cette dernière＝後者）"],
        ["Le problème des transports ? J’**en** parle souvent.", "交通問題？我常談到。（用 en 代替 de + 名詞）"],
      ],
    },
    {
      t: "句子要有長有短",
      d: "全部都是短句會像小學生作文；全部都是長句又讀不懂。用連接詞、關係代名詞（qui、que、dont、où）把短句合併，再穿插一兩句短句強調重點。",
      ex: [
        ["J’ai visité Lyon. Lyon est une belle ville. J’ai aimé la cuisine.", "（太零碎）我去了里昂。里昂是個美麗的城市。我喜歡那裡的菜。"],
        ["J’ai visité Lyon, une ville **dont** j’ai surtout aimé la cuisine.", "（較好）我去了里昂，那個城市我最喜歡的是它的美食。"],
      ],
    },
    {
      t: "語域要一致",
      d: "寫給朋友可以用口語（Salut, ça va ?、super、on），正式信件就要全部用標準語或雅語（Madame, Monsieur、nous、je vous prie de…）。同一篇文章不要混用 tu 和 vous，也不要在正式信裡突然出現 super、boulot。",
    },
    {
      t: "用連接詞標出邏輯",
      d: "讀者應該能從連接詞看出文章的走向：d’abord、ensuite、enfin（順序）；de plus、en outre（補充）；cependant、en revanche（轉折）；donc、par conséquent（結果）；en conclusion（結論）。完整清單請看句型總整理的「連接詞總整理」。",
    },
    {
      t: "考試字數怎麼算",
      d: "官方規定的是「最少」字數（B1 至少 160 字、B2 至少 250 字），DALF C1 的綜合摘要則規定上下限。寫得太短會直接扣分，所以平常練習就要養成數字數的習慣。本站的寫作練習會用空格分隔來即時計算字數，只能當作參考。",
    },
  ],
  pitfalls: [
    { wrong: "Je suis d’accord avec cette idée, parce que c’est bien.", right: "Je suis d’accord avec cette idée, car elle permet de réduire la pollution.", why: "理由要具體，不要只說 c’est bien、c’est intéressant。" },
    { wrong: "Dans le monde d’aujourd’hui, de nos jours, actuellement…", right: "Aujourd’hui, …", why: "開頭不要堆疊同義的時間詞，一個就夠了。" },
    { wrong: "Je pense que… Je pense que… Je pense que…", right: "Je pense que… Il me semble que… Selon moi, …", why: "表達意見的句型要換著用。" },
    { wrong: "Les gens ils aiment voyager.", right: "Les gens aiment voyager.", why: "口語會重複主詞（les gens, ils…），寫作時要刪掉。" },
    { wrong: "Il y a beaucoup de gens qui pensent que c’est important de faire du sport.", right: "Beaucoup de gens pensent qu’il est important de faire du sport.", why: "寫作中 il est + 形容詞 + de 比 c’est 正式；也少用 il y a… qui 的口語句型。" },
  ],
  checklist: [
    "題目要求的每一個要點都寫到了",
    "稱呼與結尾符合對象（tu／vous，口語／正式）",
    "每段只講一個重點，段落之間有連接詞",
    "動詞時態一致，過去分詞的配合檢查過",
    "形容詞和名詞的陰陽性、單複數一致",
    "沒有在相鄰句子重複同一個字",
    "標點符號前的空格正確（; : ! ?）",
    "字數達到要求",
  ],
};
