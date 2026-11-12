import type { WritingGuide } from "@/lib/writingTypes";

export const GUIDES_1: WritingGuide[] = [
  {
    id: "message-informel",
    zh: "給朋友的訊息與電子郵件",
    fr: "Le message amical",
    levels: "A1–A2",
    group: "quotidien",
    blurb: "邀請、回覆邀請、分享近況。DELF A1、A2 的寫作題最常考。",
    intro: "給朋友或家人的短訊、明信片、電子郵件。語氣輕鬆，用 tu，句子簡單，但「稱呼、正文、結尾、署名」四個部分一個都不能少。",
    when: ["DELF A1：寫一則至少 40 字的訊息（例如邀請、介紹自己）", "DELF A2：寫兩篇各至少 60 字的短文，常見的是邀請、接受或拒絕邀請、描述活動", "日常：明信片、生日祝福、約朋友出門"],
    structure: [
      { fr: "La salutation", zh: "稱呼", d: "用名字打招呼，後面加逗號。", ex: [["Salut Léa,", "嗨，蕾雅，"], ["Cher Paul, / Chère Anna,", "親愛的保羅／安娜，（注意陰陽性）"]] },
      { fr: "L’ouverture", zh: "開場", d: "一句問候或說明為什麼寫信。", ex: [["Comment ça va ?", "你好嗎？"], ["Merci pour ton message !", "謝謝你的訊息！"]] },
      { fr: "Le corps du message", zh: "正文", d: "回答題目的每一個要點：什麼事、什麼時候、在哪裡、為什麼。一個要點一句或兩句。" },
      { fr: "La clôture", zh: "結尾", d: "期待回覆或約定下次見面。", ex: [["Réponds-moi vite !", "快回我！"], ["À bientôt !", "回頭見！"]] },
      { fr: "La signature", zh: "署名", d: "親暱的結尾語，再加上自己的名字。", ex: [["Bises, / Grosses bises,", "親親（給熟朋友）"], ["Amitiés, / À plus,", "祝好／回頭聊（口語）"]] },
    ],
    phrases: [
      {
        t: "邀請",
        rows: [
          ["Tu es libre samedi soir ?", "你星期六晚上有空嗎？"],
          ["Ça te dit de venir à ma fête ?", "要不要來我的派對？"],
          ["Je t’invite à dîner chez moi.", "我請你來我家吃晚餐。"],
          ["On se retrouve à 19 h devant le cinéma ?", "我們晚上七點在電影院前面碰面好嗎？"],
        ],
      },
      {
        t: "接受與拒絕",
        rows: [
          ["Avec plaisir ! / Super, j’adore l’idée !", "很樂意！／太好了，我很喜歡這個主意！"],
          ["Désolé(e), je ne peux pas, parce que…", "抱歉，我不行，因為……"],
          ["C’est dommage, une autre fois peut-être ?", "真可惜，下次吧？"],
        ],
      },
      {
        t: "分享近況",
        rows: [
          ["Je suis à Nice depuis trois jours.", "我來尼斯三天了。"],
          ["Il fait beau et je me repose beaucoup.", "天氣很好，我休息得很充足。"],
          ["Hier, j’ai visité un musée génial.", "昨天我參觀了一間很棒的博物館。"],
        ],
      },
    ],
    model: {
      title: "Une invitation à un pique-nique",
      level: "A2",
      prompt: "你打算星期天和朋友去公園野餐。寫信給你的朋友湯瑪，邀請他一起來，說明時間、地點，以及他要帶什麼。（至少 60 字）",
      parts: [
        { label: "稱呼", fr: "Salut Thomas,", zh: "嗨，湯瑪，" },
        { label: "開場", fr: "Comment vas-tu ? J’espère que ta semaine se passe bien.", zh: "你好嗎？希望你這個星期過得順利。" },
        { label: "正文：邀請、時間地點", fr: "Dimanche, je fais un pique-nique au parc de la Tête d’Or avec Julie et Karim. Tu veux venir avec nous ? On se retrouve à midi devant l’entrée principale.", zh: "星期天我要和茱莉、卡里姆在金頭公園野餐。你要不要一起來？我們中午在正門口碰面。" },
        { label: "正文：要帶的東西", fr: "J’apporte des sandwichs et des boissons. Est-ce que tu peux apporter un dessert, par exemple un gâteau ou des fruits ? N’oublie pas ta guitare !", zh: "我會帶三明治和飲料。你可以帶個甜點嗎？例如蛋糕或水果。別忘了帶你的吉他！" },
        { label: "結尾", fr: "S’il pleut, on ira au cinéma. Réponds-moi vite !", zh: "如果下雨，我們就去看電影。快回我喔！" },
        { label: "署名", fr: "Bises,\nSarah", zh: "親親，\n莎拉" },
      ],
    },
    tips: [
      { t: "題目的要點逐一勾掉", d: "這類題目通常會列出要寫的內容（邀請、時間、地點、要帶的東西）。寫之前先把要點列出來，寫完一個勾一個。" },
      { t: "多用簡單的連接詞", d: "et、mais、parce que、alors 就能讓句子自然連起來，A2 也可以用 d’abord、ensuite。" },
      { t: "用近未來式和未來式說計畫", d: "邀請時常用 on va faire…、je fais…（現在式表示已安排好的未來），條件則用 s’il pleut, on ira…。" },
    ],
    pitfalls: [
      { wrong: "Cher Léa,", right: "Chère Léa,", why: "收件人是女生，cher 要變成 chère。" },
      { wrong: "Bonjour Monsieur Thomas, je vous invite…", right: "Salut Thomas, je t’invite…", why: "寫給朋友用 tu，稱呼也不用 Monsieur。" },
      { wrong: "Bises, Sarah（沒有分行，也沒有正文的結尾句）", right: "Réponds-moi vite !\nBises,\nSarah", why: "結尾句和署名要分開，最後署名另起一行。" },
    ],
    checklist: ["用名字稱呼，cher／chère 配合對方性別", "全篇用 tu", "回答了題目的每一個要點", "有結尾句（À bientôt !、Réponds-moi vite !）", "署名前有 Bises、Amitiés 等結尾語", "至少 60 字（A2）"],
    prompts: [
      { level: "A1", fr: "Vous êtes en vacances. Vous écrivez une carte postale à un ami : vous parlez du temps, de l’hôtel et de vos activités.", zh: "你在度假。寫一張明信片給朋友，談天氣、旅館和你做的活動。", min: 40 },
      { level: "A2", fr: "Votre ami français vous invite à son anniversaire samedi, mais vous ne pouvez pas venir. Vous lui répondez : vous le remerciez, vous expliquez pourquoi vous ne pouvez pas venir et vous proposez une autre sortie.", zh: "法國朋友邀請你星期六參加他的生日派對，但你不能去。回信給他：道謝、說明不能去的原因，並提議改天一起出去。", min: 60 },
    ],
  },
  {
    id: "courriel-formel",
    zh: "正式電子郵件與書信",
    fr: "Le courriel et la lettre formels",
    levels: "A2–B2",
    group: "quotidien",
    blurb: "向學校、公司、機關詢問或申請。固定格式一定要背熟。",
    intro: "寫給不認識的人、公司或機關的信。全篇用 vous，句子完整、語氣客氣，開頭和結尾都有固定的套語。電子郵件可以比紙本信簡短，但格式一樣要正確。",
    when: ["詢問資訊：課程、住宿、活動", "申請或預約：報名課程、預約參觀", "DELF A2–B2 的書信題", "工作上的往來信件"],
    structure: [
      { fr: "L’objet", zh: "主旨（電子郵件）", d: "一行說清楚寫信目的。", ex: [["Objet : Demande d’informations sur les cours d’été", "主旨：詢問暑期課程資訊"]] },
      { fr: "La formule d’appel", zh: "稱呼", d: "不知道對方姓名用 Madame, Monsieur,；知道姓名用 Madame Dupont, 或 Monsieur Martin,。不要寫 Cher Monsieur Martin（除非已經認識）。", ex: [["Madame, Monsieur,", "敬啟者："]] },
      { fr: "L’introduction", zh: "開頭：自我介紹與寫信目的", d: "說明自己是誰、為什麼寫信。", ex: [["Je me permets de vous écrire afin de…", "冒昧寫信給您，是為了……"], ["Je suis étudiante en deuxième année et je souhaiterais…", "我是大學二年級學生，想要……"]] },
      { fr: "Le développement", zh: "正文：具體的問題或要求", d: "把問題一條一條寫清楚，可以分段或用連接詞（d’abord、ensuite、enfin）。" },
      { fr: "La conclusion", zh: "結尾：期待回覆", d: "感謝對方，表示期待回覆。", ex: [["Je vous remercie par avance de votre réponse.", "先謝謝您的回覆。"], ["Dans l’attente de votre réponse, …", "期待您的回覆，……"]] },
      { fr: "La formule de politesse", zh: "結尾敬語與署名", d: "紙本信用完整的敬語；電子郵件可以只寫 Cordialement。", ex: [["Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.", "（正式書信）謹此致意。"], ["Cordialement, / Bien cordialement,", "（電子郵件）敬祝順心。"]] },
    ],
    phrases: [
      {
        t: "說明目的",
        rows: [
          ["Je vous écris au sujet de…", "我寫信是關於……"],
          ["Je souhaiterais obtenir des informations sur…", "我想取得關於……的資訊。"],
          ["Suite à votre annonce parue sur votre site, …", "看到您網站上的公告，……"],
        ],
      },
      {
        t: "客氣地提問與要求",
        rows: [
          ["Pourriez-vous m’indiquer… ?", "能否請您告訴我……？"],
          ["Je voudrais savoir si…", "我想知道是否……"],
          ["Serait-il possible de… ?", "請問有可能……嗎？"],
          ["Je vous serais reconnaissant(e) de bien vouloir…", "如蒙您……，將不勝感激。"],
        ],
      },
      {
        t: "結尾",
        rows: [
          ["Je reste à votre disposition pour tout renseignement complémentaire.", "如需任何補充資料，歡迎與我聯絡。"],
          ["Veuillez agréer, Madame, Monsieur, mes salutations distinguées.", "（正式書信）謹此致意。"],
          ["Cordialement,", "（電子郵件）敬祝順心。"],
        ],
      },
    ],
    model: {
      title: "Demande d’informations sur un cours",
      level: "B1",
      prompt: "你想參加一所法國語言學校的暑期課程。寫電子郵件詢問上課日期、價格、住宿，以及是否需要分班測驗。（至少 160 字）",
      parts: [
        { label: "主旨", fr: "Objet : Demande d’informations sur les cours d’été", zh: "主旨：詢問暑期課程資訊" },
        { label: "稱呼", fr: "Madame, Monsieur,", zh: "敬啟者：" },
        { label: "開頭：自我介紹與目的", fr: "Je suis une étudiante taïwanaise de vingt-deux ans et j’apprends le français depuis deux ans. J’ai découvert votre école sur Internet et je souhaiterais suivre un cours intensif de français cet été afin de préparer le DELF B2. Mon niveau actuel correspond environ au niveau B1.", zh: "我是一名二十二歲的台灣學生，學法文兩年了。我在網路上看到貴校，想在今年夏天參加法文密集課程，以準備 DELF B2 考試。我目前的程度大約是 B1。" },
        { label: "正文：具體問題", fr: "Pourriez-vous m’indiquer les dates exactes des sessions de juillet et d’août, ainsi que le prix d’un cours de quatre semaines ? Je voudrais également savoir si votre école propose un hébergement dans une famille d’accueil ou dans une résidence étudiante, et quel en est le coût.", zh: "能否請您告訴我七月和八月各梯次的確切日期，以及四週課程的費用？我也想知道貴校是否提供寄宿家庭或學生宿舍，費用是多少。" },
        { label: "正文：補充問題", fr: "Enfin, faut-il passer un test de niveau avant le début des cours ? Si c’est le cas, est-il possible de le faire en ligne depuis Taïwan ?", zh: "最後，開課前需要參加分班測驗嗎？如果需要，能不能在台灣線上考？" },
        { label: "正文：其他問題", fr: "Par ailleurs, j’aimerais savoir combien d’heures de cours sont prévues par semaine et si des activités culturelles, comme des visites ou des excursions, sont organisées le week-end.", zh: "此外，我想知道每週安排幾小時的課程，以及週末是否有參觀、遠足等文化活動。" },
        { label: "結尾", fr: "Je vous remercie par avance de votre réponse et reste à votre disposition pour tout renseignement complémentaire.", zh: "先謝謝您的回覆，如需任何補充資料，歡迎與我聯絡。" },
        { label: "敬語與署名", fr: "Cordialement,\nLin Yu-ting", zh: "敬祝順心，\n林雨婷" },
      ],
    },
    tips: [
      { t: "用條件式讓語氣更客氣", d: "je voudrais、je souhaiterais、pourriez-vous 比 je veux、pouvez-vous 有禮貌得多。" },
      { t: "一個段落一件事", d: "自我介紹、問題、結尾分開寫。問題很多時，可以用 d’abord、ensuite、enfin 排順序。" },
      { t: "紙本信的格式", d: "左上角寫寄件人姓名地址，右邊寫收件人；右上方寫地點和日期（À Taipei, le 12 novembre 2026）；再來是主旨、稱呼、正文、敬語、簽名。" },
    ],
    pitfalls: [
      { wrong: "Cher Monsieur,", right: "Monsieur, / Madame, Monsieur,", why: "給不認識的人寫正式信，不用 cher。" },
      { wrong: "Je veux savoir le prix.", right: "Pourriez-vous m’indiquer le prix ?", why: "直接說 je veux 太生硬，改用條件式或疑問句。" },
      { wrong: "Bisous, / Merci beaucoup !!!", right: "Cordialement,", why: "正式信件不用親暱的結尾，也不用連續的驚嘆號。" },
      { wrong: "Je vous prie d’agréer mes salutations distinguées. Cordialement.", right: "只選一種：紙本信用完整敬語，電子郵件用 Cordialement。", why: "兩種結尾不要同時用。" },
    ],
    checklist: ["有主旨（電子郵件）", "稱呼是 Madame, Monsieur, 或 Madame／Monsieur + 姓氏", "全篇用 vous", "第一段說明自己是誰、為什麼寫信", "問題用條件式或客氣的疑問句", "結尾有感謝和期待回覆", "敬語與署名正確", "沒有口語詞（super、ok、boulot）"],
    prompts: [
      { level: "A2", fr: "Vous voulez vous inscrire dans un club de sport. Vous écrivez un courriel au club pour demander les horaires, les prix et le matériel nécessaire.", zh: "你想加入一家運動俱樂部。寫電子郵件詢問上課時間、價格，以及需要準備什麼裝備。", min: 60 },
      { level: "B1", fr: "Vous avez vu une annonce pour un logement à louer près de votre université. Vous écrivez au propriétaire pour vous présenter et demander des précisions (loyer, charges, date de disponibilité, visite).", zh: "你看到大學附近有房子出租。寫信給房東，介紹自己並詢問細節（房租、雜費、可入住日期、看房）。", min: 160 },
    ],
  },
  {
    id: "lettre-reclamation",
    zh: "投訴信",
    fr: "La lettre de réclamation",
    levels: "B1–B2",
    group: "quotidien",
    blurb: "商品有問題、服務不好時，有禮貌但堅定地要求解決。DELF B1、B2 常考。",
    intro: "投訴信的目標是「解決問題」，不是發洩情緒。要清楚說明發生了什麼、造成什麼影響、要求對方怎麼處理，並附上日期、訂單編號等具體資訊。",
    when: ["網購商品有瑕疵或沒收到", "旅館、餐廳、交通服務出問題", "DELF B1、B2 寫作題（給負責人或公司寫信抗議、要求賠償）"],
    structure: [
      { fr: "En-tête et objet", zh: "主旨", d: "直接寫出問題與相關編號。", ex: [["Objet : Réclamation concernant la commande n° 45821", "主旨：關於第 45821 號訂單的投訴"]] },
      { fr: "Rappel des faits", zh: "說明事實", d: "日期、地點、商品或服務、發生了什麼。用複合過去式和未完成過去式。" },
      { fr: "Les conséquences", zh: "造成的影響", d: "這個問題帶來什麼不便或損失。" },
      { fr: "La demande", zh: "具體要求", d: "退款、換貨、賠償、道歉……要求要明確、合理。" },
      { fr: "La conclusion", zh: "結尾", d: "期待盡快回覆，必要時說明下一步（但保持禮貌）。" },
    ],
    phrases: [
      {
        t: "說明問題",
        rows: [
          ["Le 3 mars, j’ai commandé sur votre site…", "3 月 3 日，我在貴公司網站訂購了……"],
          ["À ma grande surprise, j’ai constaté que…", "令我非常意外的是，我發現……"],
          ["Le produit est arrivé endommagé.", "商品送達時已經損壞。"],
          ["Malgré mes nombreux appels, personne ne m’a répondu.", "儘管我打了很多次電話，都沒有人回覆。"],
        ],
      },
      {
        t: "表達不滿（保持禮貌）",
        rows: [
          ["Je suis profondément déçu(e) par…", "我對……深感失望。"],
          ["Je trouve inadmissible que + 虛擬式", "我認為……是無法接受的。"],
          ["Cette situation m’a causé de nombreux désagréments.", "這個情況給我帶來很多不便。"],
        ],
      },
      {
        t: "提出要求",
        rows: [
          ["Je vous demande donc de bien vouloir me rembourser.", "因此請您退款給我。"],
          ["Je souhaiterais obtenir un échange ou un avoir.", "我希望換貨或取得購物抵用金。"],
          ["Je compte sur vous pour régler ce problème dans les plus brefs délais.", "希望您盡快解決這個問題。"],
        ],
      },
    ],
    model: {
      title: "Réclamation après un séjour à l’hôtel",
      level: "B2",
      prompt: "你上個月在一家旅館住了三晚，房間和網站上的介紹差很多。寫信給旅館經理，說明問題並要求補償。（至少 250 字）",
      parts: [
        { label: "主旨", fr: "Objet : Réclamation concernant mon séjour du 12 au 15 octobre (réservation n° 7734)", zh: "主旨：關於 10 月 12 日至 15 日住宿的投訴（訂房編號 7734）" },
        { label: "稱呼", fr: "Madame, Monsieur,", zh: "敬啟者：" },
        { label: "說明事實", fr: "J’ai séjourné dans votre hôtel du 12 au 15 octobre dernier avec mon mari. Nous avions réservé sur votre site une chambre double « avec vue sur la mer et climatisation », pour un montant total de 540 euros. Or, la chambre qui nous a été attribuée donnait sur le parking, et la climatisation ne fonctionnait pas.", zh: "今年 10 月 12 日至 15 日，我和先生住在貴旅館。我們在貴旅館網站上預訂了「海景、附空調」的雙人房，總金額 540 歐元。然而，分配給我們的房間面對停車場，空調也不能用。" },
        { label: "說明事實：處理過程", fr: "Dès notre arrivée, nous avons signalé ces problèmes à la réception. L’employé nous a promis de nous changer de chambre le lendemain, mais rien n’a été fait. Nous avons de nouveau demandé de l’aide le deuxième jour, sans plus de résultat.", zh: "我們一到就向櫃台反映這些問題。職員答應隔天幫我們換房，但什麼都沒做。第二天我們再次請求協助，結果還是一樣。" },
        { label: "造成的影響", fr: "Il faisait plus de trente degrés et nous avons très mal dormi pendant tout le séjour. De plus, nous avions choisi votre établissement précisément pour la vue, comme le montraient les photos de votre site. Ces vacances, que nous attendions depuis longtemps, ont donc été gâchées. Je trouve inadmissible qu’un hôtel de votre catégorie ne respecte pas ce qu’il annonce sur son site.", zh: "當時氣溫超過三十度，整趟住宿我們都睡得很差。而且，我們正是因為景觀才選擇貴旅館，網站上的照片也是這樣呈現的。期待已久的假期就這樣被毀了。我認為，以貴旅館的等級，不遵守網站上的說明是無法接受的。" },
        { label: "具體要求", fr: "Je vous demande par conséquent de bien vouloir me rembourser la différence entre le prix d’une chambre avec vue sur la mer et celui de la chambre que nous avons réellement occupée, soit au moins 150 euros. Je vous joins une copie de la réservation et des photos de la chambre. Sans réponse satisfaisante de votre part, je me verrai dans l’obligation de publier un avis détaillé sur les sites de réservation.", zh: "因此，我請您退還海景房與我們實際入住房間之間的價差，至少 150 歐元。隨信附上訂房紀錄影本與房間照片。若未獲得滿意的答覆，我將不得不在訂房網站上發表詳細評論。" },
        { label: "結尾", fr: "Dans l’attente d’une réponse rapide de votre part, je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.", zh: "期待您盡快回覆。謹此致意。" },
        { label: "署名", fr: "Claire Morel", zh: "克萊兒・莫雷爾" },
      ],
    },
    tips: [
      { t: "事實先於情緒", d: "先把時間、地點、編號、發生經過講清楚，再表達不滿。有具體資料的投訴比較容易被處理。" },
      { t: "用連接詞串起因果", d: "or（然而）、malgré（儘管）、par conséquent（因此）、c’est pourquoi（所以）讓投訴有說服力。" },
      { t: "要求要合理且明確", d: "寫清楚要退多少錢、換什麼，而不是只說「請處理」。" },
    ],
    pitfalls: [
      { wrong: "Votre hôtel est nul et vous êtes des menteurs !", right: "Je trouve inadmissible que votre hôtel ne respecte pas ce qu’il annonce.", why: "保持禮貌，批評事實而不是人身攻擊。" },
      { wrong: "Je trouve inadmissible que vous n’êtes pas venus.", right: "Je trouve inadmissible que vous ne soyez pas venus.", why: "trouver inadmissible que 表達情緒與評價，後面接虛擬式。" },
      { wrong: "Je veux mon argent.", right: "Je vous demande de bien vouloir me rembourser.", why: "要求也要用正式、客氣的句型。" },
    ],
    checklist: ["主旨寫出問題與編號", "交代日期、地點、經過", "說明造成的影響", "要求明確（退款、換貨、金額）", "語氣堅定但有禮貌", "正式稱呼與敬語", "B1 至少 160 字、B2 至少 250 字"],
    prompts: [
      { level: "B1", fr: "Vous avez acheté un téléphone sur Internet. Il est arrivé en retard et l’écran est cassé. Vous écrivez au service client pour expliquer le problème et demander une solution.", zh: "你在網路上買了一支手機，晚到了，而且螢幕破了。寫信給客服說明問題並要求解決。", min: 160 },
      { level: "B2", fr: "Le train que vous avez pris pour un rendez-vous important a eu trois heures de retard, sans aucune information pour les voyageurs. Vous écrivez à la compagnie ferroviaire pour exprimer votre mécontentement et demander un dédommagement.", zh: "你搭火車去赴一個重要的約，火車誤點三小時，完全沒有通知乘客。寫信給鐵路公司表達不滿並要求賠償。", min: 250 },
    ],
  },
  {
    id: "recit",
    zh: "敘事與描寫",
    fr: "Le récit et la description",
    levels: "A2–B1",
    group: "recit",
    blurb: "說一段經歷、描寫人物與地方。重點在過去時態的搭配。",
    intro: "敘事文講「發生了什麼事」，描寫文讓讀者「看見」人物和場景。法文敘事最重要的是分清楚複合過去式（事件）和未完成過去式（背景、描寫），再用時間連接詞把事件串起來。",
    when: ["DELF A2：描述一次活動、旅行或經驗", "DELF B1：在部落格、論壇分享經歷並發表感想", "日記、遊記、自我介紹"],
    structure: [
      { fr: "La situation initiale", zh: "開頭：背景", d: "什麼時候、在哪裡、和誰。用未完成過去式描寫天氣、氣氛、心情。", ex: [["C’était un samedi de juillet ; il faisait très chaud.", "那是七月的一個星期六，天氣很熱。"]] },
      { fr: "L’élément déclencheur", zh: "事件開始", d: "發生了一件事打破平靜。常用 soudain、tout à coup。", ex: [["Soudain, le téléphone a sonné.", "突然，電話響了。"]] },
      { fr: "Les péripéties", zh: "經過", d: "依時間順序說明事件，用複合過去式；穿插描寫用未完成過去式。" },
      { fr: "La fin", zh: "結局", d: "事情怎麼結束。", ex: [["Finalement, tout s’est bien terminé.", "最後一切都圓滿結束。"]] },
      { fr: "Le bilan / les sentiments", zh: "感想", d: "這次經驗讓你學到什麼、有什麼感受。B1 一定要有個人感想。", ex: [["Je garderai toujours un beau souvenir de ce voyage.", "我會永遠記得這趟旅行。"]] },
    ],
    phrases: [
      {
        t: "時間順序",
        rows: [
          ["Ce jour-là, / Ce matin-là, …", "那天，／那天早上，……"],
          ["Au début, … Ensuite, … Puis, … Enfin, …", "一開始……接著……然後……最後……"],
          ["Tout à coup, / Soudain, …", "突然，……"],
          ["Quelques minutes plus tard, …", "幾分鐘後，……"],
          ["Au bout d’une heure, …", "過了一個小時，……"],
        ],
      },
      {
        t: "描寫人物",
        rows: [
          ["Il avait une trentaine d’années.", "他大約三十歲。"],
          ["Elle portait un manteau rouge et un grand chapeau.", "她穿著紅色大衣，戴著一頂大帽子。"],
          ["Il avait l’air fatigué mais souriant.", "他看起來很累，但面帶微笑。"],
        ],
      },
      {
        t: "描寫地方與感受",
        rows: [
          ["Au loin, on voyait la mer.", "遠處可以看到海。"],
          ["Ça sentait le pain chaud.", "空氣中有剛出爐麵包的香味。"],
          ["J’étais à la fois inquiet et impatient.", "我既擔心又迫不及待。"],
          ["Je n’oublierai jamais ce moment.", "我永遠不會忘記那一刻。"],
        ],
      },
    ],
    model: {
      title: "Un voyage inoubliable",
      level: "B1",
      prompt: "在旅遊論壇上分享一次難忘的旅行經驗：發生了什麼事？你有什麼感受？（至少 160 字）",
      parts: [
        { label: "開頭：背景", fr: "L’été dernier, je suis partie seule en Bretagne pour la première fois. C’était la fin du mois d’août, il faisait doux et les plages étaient presque vides. Je logeais dans une petite maison d’hôtes, au bord de la mer.", zh: "去年夏天，我第一次一個人去布列塔尼旅行。那是八月底，天氣溫和，海灘上幾乎沒有人。我住在海邊一間小民宿。" },
        { label: "事件開始", fr: "Un matin, j’ai décidé de faire une randonnée sur le sentier côtier. Tout se passait bien quand, soudain, un épais brouillard est arrivé. Au bout de quelques minutes, je ne voyais plus rien et je ne savais plus où j’étais.", zh: "一天早上，我決定沿著海岸步道健行。一切都很順利，直到突然起了濃霧。幾分鐘後，我什麼都看不到，也不知道自己在哪裡了。" },
        { label: "經過", fr: "J’avais un peu peur, alors je me suis assise sur un rocher pour attendre. Une demi-heure plus tard, un vieux pêcheur qui rentrait chez lui m’a trouvée. Il m’a raccompagnée jusqu’au village en me racontant des légendes bretonnes.", zh: "我有點害怕，所以坐在一塊石頭上等。半小時後，一位正要回家的老漁夫發現了我。他一路送我回村子，還跟我說布列塔尼的傳說。" },
        { label: "結局", fr: "Le soir, pour le remercier, je l’ai invité à manger des crêpes avec sa femme.", zh: "那天晚上，為了謝謝他，我請他和他太太吃可麗餅。" },
        { label: "感想", fr: "Ce jour-là, j’ai compris qu’en voyage, les imprévus font souvent les plus beaux souvenirs. Depuis, je n’ai plus peur de voyager seule, mais je regarde toujours la météo avant de partir en randonnée !", zh: "那天我明白了：旅行中的意外，常常會變成最美的回憶。從那以後，我不再害怕一個人旅行，不過去健行前一定會先看天氣預報！" },
      ],
    },
    tips: [
      { t: "背景用未完成過去式，事件用複合過去式", d: "il faisait doux、je logeais（背景）→ un matin, j’ai décidé…、un brouillard est arrivé（事件）。詳細說明請看「時態總覽」。" },
      { t: "加入五感描寫", d: "不只寫看到什麼，也寫聽到、聞到、感覺到什麼，文章會生動很多。" },
      { t: "結尾一定要有感想", d: "B1 的評分標準包含「表達感受與看法」，敘事完要說說這件事對你的意義。" },
    ],
    pitfalls: [
      { wrong: "Il a fait beau et j’ai été content.", right: "Il faisait beau et j’étais content.", why: "天氣和心情是背景描寫，用未完成過去式。" },
      { wrong: "Je suis partie seul.", right: "Je suis partie seule.", why: "寫的人是女生時，形容詞也要配合：seule。" },
      { wrong: "Un pêcheur m’a trouvé.（寫的人是女生）", right: "Un pêcheur m’a trouvée.", why: "直接受詞 me 在 avoir 前面，過去分詞要配合。" },
    ],
    checklist: ["有清楚的時間、地點背景", "事件依時間順序，連接詞清楚", "複合過去式與未完成過去式用對", "過去分詞的配合（être、直接受詞在前）", "有描寫（人、地方、感受）", "結尾有個人感想", "B1 至少 160 字"],
    prompts: [
      { level: "A2", fr: "Vous avez passé un week-end chez des amis. Vous racontez ce que vous avez fait sur votre blog.", zh: "你週末去朋友家玩。在部落格上寫你們做了什麼。", min: 60 },
      { level: "B1", fr: "Racontez une rencontre qui a changé votre vie (un professeur, un ami, une personne inconnue…). Décrivez cette personne et expliquez ce qu’elle vous a apporté.", zh: "寫一次改變你人生的相遇（老師、朋友、陌生人……）。描寫這個人，並說明他帶給你什麼。", min: 160 },
    ],
  },
  {
    id: "article",
    zh: "文章與部落格",
    fr: "L’article et le billet de blog",
    levels: "B1–B2",
    group: "argument",
    blurb: "替校刊、網站或部落格寫文章：吸引人的標題、清楚的段落、明確的觀點。",
    intro: "文章是寫給一群讀者看的，所以要有吸引人的標題和開頭，正文分段介紹事實或經驗，最後帶出自己的看法。部落格文章語氣可以比較個人化，報刊文章則比較客觀。",
    when: ["DELF B1：在網站或部落格上分享經驗並發表意見", "DELF B2：為報刊或網站寫一篇有論點的文章", "校刊、社團刊物、個人部落格"],
    structure: [
      { fr: "Le titre", zh: "標題", d: "短、具體、能引起好奇。可以用問句或數字。", ex: [["Vivre sans voiture en ville : mission impossible ?", "在城市裡不開車生活：不可能的任務？"]] },
      { fr: "Le chapeau", zh: "導言", d: "一兩句話說出主題，吸引讀者往下讀。" },
      { fr: "Le développement", zh: "正文", d: "兩到三段，每段一個重點：事實、例子、經驗。可以加小標題。" },
      { fr: "La conclusion", zh: "結論", d: "總結觀點，常以問題或呼籲收尾，邀請讀者留言或行動。", ex: [["Et vous, qu’en pensez-vous ?", "那你呢，你怎麼看？"]] },
    ],
    phrases: [
      {
        t: "吸引讀者的開頭",
        rows: [
          ["Qui n’a jamais rêvé de… ?", "誰沒有夢想過……？"],
          ["Saviez-vous que… ?", "你知道……嗎？"],
          ["Il y a un an, j’ai pris une décision qui a changé mon quotidien.", "一年前，我做了一個改變日常生活的決定。"],
        ],
      },
      {
        t: "舉例與說明",
        rows: [
          ["Prenons l’exemple de…", "以……為例。"],
          ["C’est le cas notamment de…", "……尤其是如此。"],
          ["Concrètement, cela signifie que…", "具體來說，這代表……"],
        ],
      },
      {
        t: "結尾與呼籲",
        rows: [
          ["Pour conclure, je dirais que…", "總結來說，我認為……"],
          ["N’hésitez pas à partager votre expérience en commentaire !", "歡迎在留言分享你的經驗！"],
          ["Alors, prêts à essayer ?", "那麼，準備好試試看了嗎？"],
        ],
      },
    ],
    model: {
      title: "Vivre sans voiture en ville : mission impossible ?",
      level: "B1",
      prompt: "替你學校的網站寫一篇文章，分享你在城市裡不開車生活的經驗，並說明你的看法。（至少 160 字）",
      parts: [
        { label: "標題", fr: "Vivre sans voiture en ville : mission impossible ?", zh: "在城市裡不開車生活：不可能的任務？" },
        { label: "導言", fr: "Il y a un an, j’ai vendu ma voiture. Mes amis pensaient que je ne tiendrais pas un mois. Aujourd’hui, je ne regrette absolument pas ma décision. Voici pourquoi.", zh: "一年前，我把車賣了。朋友們都覺得我撐不過一個月。如今，我一點也不後悔這個決定。以下是原因。" },
        { label: "正文：好處", fr: "D’abord, je fais des économies : plus d’essence, plus d’assurance, plus de parking à payer. Ensuite, je me déplace surtout à vélo, ce qui me permet de faire du sport sans y penser. Je suis en meilleure forme qu’avant et j’arrive au travail plus détendu. Mon trajet quotidien, qui dure vingt minutes, est même devenu mon moment préféré de la journée.", zh: "首先，我省了錢：不用再付油錢、保險和停車費。其次，我主要騎腳踏車通勤，不知不覺就運動了。我的體態比以前好，到公司時心情也更放鬆。每天二十分鐘的通勤，甚至成了我一天中最喜歡的時光。" },
        { label: "正文：困難", fr: "Bien sûr, tout n’est pas toujours facile. Quand il pleut ou quand je dois transporter des choses lourdes, c’est plus compliqué. Dans ces cas-là, je prends le tramway ou je loue une voiture pour quelques heures.", zh: "當然，並不是每件事都很容易。下雨或要搬重物的時候比較麻煩。這時我會搭電車，或是租車幾個小時。" },
        { label: "結論與呼籲", fr: "Finalement, vivre sans voiture en ville est tout à fait possible, à condition d’être un peu organisé. Je ne dis pas que c’est la solution pour tout le monde, mais je vous conseille d’essayer, ne serait-ce qu’une semaine. Et vous, pourriez-vous vous passer de votre voiture ?", zh: "總之，只要稍微有點規劃，在城市裡不開車生活完全可行。我不是說這適合每個人，但我建議你試試看，哪怕只有一個星期。那你呢，你能不開車嗎？" },
      ],
    },
    tips: [
      { t: "標題和第一句決定讀者會不會讀下去", d: "用問句、意外的事實或個人經驗開頭，比「現在很多人……」有吸引力。" },
      { t: "優點和缺點都要寫", d: "只寫一面會顯得片面。先講好處再承認困難，最後提出平衡的結論，文章會更有說服力。" },
      { t: "部落格可以用 je 和 vous", d: "直接對讀者說話（Et vous ?）能拉近距離，但報刊文章要比較客觀，少用第一人稱。" },
    ],
    pitfalls: [
      { wrong: "（沒有標題，直接開始寫）", right: "Vivre sans voiture en ville : mission impossible ?", why: "題目要求寫文章時，一定要有標題。" },
      { wrong: "Je pensais que je ne tiendrai pas un mois.", right: "Mes amis pensaient que je ne tiendrais pas un mois.", why: "過去的推測（過去中的未來）用條件式現在式。" },
      { wrong: "Il y a beaucoup d’avantages. Il y a aussi des inconvénients.", right: "D’abord, … Ensuite, … Bien sûr, tout n’est pas toujours facile…", why: "用具體的例子和連接詞，不要只列出「有優點、有缺點」。" },
    ],
    checklist: ["有吸引人的標題", "導言說出主題", "正文分段，每段一個重點", "有具體的例子或經驗", "優缺點都有提到", "結論有個人看法或對讀者的提問", "B1 至少 160 字、B2 至少 250 字"],
    prompts: [
      { level: "B1", fr: "Le site de votre école cherche des témoignages sur le thème « Apprendre une langue étrangère ». Vous écrivez un article pour raconter votre expérience et donner des conseils.", zh: "學校網站徵求以「學外語」為主題的分享。寫一篇文章，談你的經驗並給讀者建議。", min: 160 },
      { level: "B2", fr: "Un magazine en ligne publie un dossier sur le tourisme de masse. Vous écrivez un article dans lequel vous présentez les problèmes qu’il pose et proposez des solutions.", zh: "一本網路雜誌在做「過度觀光」專題。寫一篇文章，說明它造成的問題並提出解決辦法。", min: 250 },
    ],
  },
];
