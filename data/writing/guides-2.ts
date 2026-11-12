import type { WritingGuide } from "@/lib/writingTypes";

export const GUIDES_2: WritingGuide[] = [
  {
    id: "essai-argumente",
    zh: "論說文",
    fr: "Le texte argumenté",
    levels: "B1–C1",
    group: "argument",
    blurb: "針對一個問題表明立場，用論點和例子說服讀者。DELF B2、DALF C1 的核心題型。",
    intro: "論說文要回答一個有爭議的問題（例如「應該禁止……嗎？」）。好的論說文有明確的立場、兩到三個有例子支持的論點，並且承認反方的意見再加以回應。",
    when: ["DELF B1：在論壇或信件中表達並說明自己的看法", "DELF B2：寫一篇論點清楚的文章、信件或發言稿（至少 250 字）", "DALF C1：根據資料寫一篇論說文（至少 250 字）"],
    structure: [
      { fr: "L’introduction", zh: "引言", d: "1. 引出主題（現象或事實）。\n2. 提出問題。\n3. 說明立場或預告文章結構。", ex: [["Faut-il interdire les téléphones portables à l’école ? La question divise parents et enseignants.", "學校應該禁止手機嗎？這個問題讓家長和老師意見分歧。"]] },
      { fr: "Premier argument", zh: "論點一", d: "主題句 → 解釋 → 具體例子。", ex: [["Tout d’abord, … En effet, … Par exemple, …", "首先……因為……例如……"]] },
      { fr: "Deuxième argument", zh: "論點二", d: "同樣的結構，用不同的連接詞開頭。", ex: [["De plus, … / Par ailleurs, …", "此外……"]] },
      { fr: "La concession et la réfutation", zh: "讓步與反駁", d: "承認反方有道理的地方，再說明為什麼你的立場仍然成立。", ex: [["Certes, … Cependant, …", "的確……然而……"]] },
      { fr: "La conclusion", zh: "結論", d: "總結論點、重申立場，可以加一句展望或建議。", ex: [["En définitive, … / Pour conclure, …", "總而言之……"]] },
    ],
    phrases: [
      {
        t: "表明立場",
        rows: [
          ["Je suis convaincu(e) que…", "我深信……"],
          ["Il me semble essentiel de…", "我認為……是很重要的。"],
          ["Je suis favorable / opposé(e) à…", "我贊成／反對……"],
        ],
      },
      {
        t: "論證與舉例",
        rows: [
          ["En effet, …", "確實，因為……"],
          ["Prenons l’exemple de…", "以……為例。"],
          ["Selon une enquête récente, … (要有可靠來源才用)", "根據最近一項調查……"],
          ["Cela s’explique par le fait que…", "這是因為……"],
        ],
      },
      {
        t: "讓步與反駁",
        rows: [
          ["Certes, … mais…", "的確……但是……"],
          ["On pourrait objecter que… Pourtant, …", "也許有人會反駁說……然而……"],
          ["Il est vrai que… ; il n’en reste pas moins que…", "……是事實；但無論如何……"],
        ],
      },
    ],
    model: {
      title: "Faut-il interdire les téléphones portables à l’école ?",
      level: "B2",
      prompt: "你所在城市的報紙正在討論「中小學是否應該全面禁止學生使用手機」。寫一篇投稿表達你的看法。（至少 250 字）",
      parts: [
        { label: "引言：主題、問題、立場", fr: "Aujourd’hui, presque tous les adolescents possèdent un smartphone, et beaucoup l’emportent en classe. Faut-il pour autant l’interdire complètement à l’école ? À mon avis, une interdiction totale n’est pas la meilleure solution ; il vaut mieux apprendre aux élèves à l’utiliser de manière responsable.", zh: "如今幾乎每個青少年都有智慧型手機，很多人也把它帶進教室。但是，學校就因此應該全面禁止嗎？我認為全面禁止不是最好的辦法，更好的做法是教學生負責任地使用它。" },
        { label: "論點一：學習工具", fr: "Tout d’abord, le téléphone peut être un véritable outil d’apprentissage. En effet, il permet de chercher une information, de consulter un dictionnaire ou de réviser grâce à des applications. Par exemple, en cours de langue, les élèves peuvent écouter un enregistrement ou vérifier la prononciation d’un mot en quelques secondes. De nombreux enseignants utilisent d’ailleurs déjà des quiz en ligne pour rendre leurs cours plus vivants.", zh: "首先，手機可以是真正的學習工具。它可以用來查資料、查字典，或是透過應用程式複習。例如在語言課上，學生幾秒鐘就能聽錄音或確認單字發音。其實很多老師已經在用線上測驗讓課程更生動。" },
        { label: "論點二：學會自律", fr: "De plus, l’école a pour mission de préparer les jeunes à la vie d’adulte. Or, dans leur vie professionnelle, ils devront utiliser des outils numériques sans se laisser distraire. Interdire le téléphone ne leur apprend rien ; fixer des règles claires, en revanche, les aide à développer leur autonomie.", zh: "此外，學校的任務是讓年輕人準備好面對成人生活。而他們將來工作時，必須使用數位工具又不被分心。禁止手機什麼也教不了他們；相反地，訂定清楚的規則才能幫助他們培養自主能力。" },
        { label: "讓步與反駁", fr: "Certes, les téléphones peuvent nuire à la concentration et favoriser le harcèlement sur les réseaux sociaux. Il est donc nécessaire de les éteindre pendant les cours, sauf si le professeur en autorise l’usage. Cependant, ces risques existent aussi en dehors de l’école : c’est justement pour cela que l’éducation au numérique est indispensable. Il serait donc plus utile d’organiser des ateliers sur les dangers des écrans que de confisquer les téléphones.", zh: "當然，手機可能影響專注力，也可能助長社群網路上的霸凌。所以上課時有必要關機，除非老師允許使用。然而，這些風險在校外一樣存在：正因如此，數位素養教育才不可或缺。所以，與其沒收手機，舉辦關於螢幕風險的工作坊會更有用。" },
        { label: "結論", fr: "En définitive, plutôt que d’interdire totalement les téléphones, l’école devrait encadrer leur usage et former les élèves à s’en servir intelligemment. C’est, selon moi, la meilleure façon de les préparer au monde de demain.", zh: "總而言之，與其全面禁止手機，學校更應該規範使用方式，並教導學生聰明地使用它。我認為，這才是讓他們準備好迎接未來世界的最好方法。" },
      ],
    },
    tips: [
      { t: "先寫大綱：立場＋兩三個論點＋一個讓步", d: "動筆前把每段的主題句寫下來。每個論點都要有「解釋」和「例子」，只有主張沒有例子的論點沒有說服力。" },
      { t: "例子要具體", d: "與其說「很多學生覺得……」，不如說「在語言課上，學生可以……」。不要編造統計數字；考試時用自身經驗或常識性的例子比較安全。" },
      { t: "連接詞是評分重點", d: "DELF B2 的評分包括論述的連貫性，tout d’abord、de plus、or、certes… cependant、en définitive 要用得自然、多樣。" },
    ],
    pitfalls: [
      { wrong: "Je pense que oui parce que c’est mieux.", right: "Je suis convaincu que…, car…", why: "立場要明確，理由要具體說明。" },
      { wrong: "Selon les statistiques, 87 % des élèves…（自己編的數字）", right: "Par exemple, dans mon lycée, …", why: "不要捏造數據，用親身經驗或常識性的例子。" },
      { wrong: "（引言直接寫「我反對」，沒有引出主題）", right: "Aujourd’hui, presque tous les adolescents… Faut-il… ? À mon avis, …", why: "引言要先帶出背景和問題，再表明立場。" },
    ],
    checklist: ["引言有背景、問題、立場", "至少兩個論點，各有解釋和例子", "有讓步與反駁（certes… cependant）", "連接詞多樣、段落分明", "結論重申立場", "沒有捏造的統計數字", "B2 至少 250 字"],
    prompts: [
      { level: "B1", fr: "Sur un forum, on discute de la question : « Faut-il faire ses études à l’étranger ? » Vous donnez votre opinion en vous appuyant sur des exemples.", zh: "論壇上在討論「應該出國讀書嗎？」發表你的看法，並舉例說明。", min: 160 },
      { level: "B2", fr: "Votre ville envisage de rendre les transports en commun gratuits. Vous écrivez au maire pour donner votre avis, arguments à l’appui.", zh: "你的城市考慮讓大眾運輸免費。寫信給市長表達你的看法，並提出論點。", min: 250 },
    ],
  },
  {
    id: "lettre-motivation",
    zh: "求職信與申請動機信",
    fr: "La lettre de motivation",
    levels: "B1–C1",
    group: "argument",
    blurb: "申請工作、實習、學校時，說明「你為什麼適合」以及「你為什麼想來」。",
    intro: "動機信不是把履歷再寫一次，而是把你的經歷和對方的需求連起來。法國常見的寫法是「您（公司或學校）、我（我的能力與經驗）、我們（合作的可能）」三段式。",
    when: ["申請工作或實習", "申請法國大學、交換計畫、獎學金", "DELF Pro、商務法語考試的寫作題"],
    structure: [
      { fr: "L’accroche", zh: "開頭：申請什麼、在哪裡看到", d: "說明應徵的職位或課程，以及消息來源。", ex: [["Suite à votre annonce publiée sur…, je me permets de vous proposer ma candidature au poste de…", "看到貴公司在……刊登的徵才公告，謹此應徵……一職。"]] },
      { fr: "Vous", zh: "您：我對貴公司或學校的了解", d: "說明為什麼選擇這個單位：理念、產品、課程特色。證明你做過功課。" },
      { fr: "Moi", zh: "我：我的能力與經驗", d: "挑兩三項和職缺最相關的經歷，用具體成果說明。" },
      { fr: "Nous", zh: "我們：我能帶來什麼", d: "把你的能力和對方的需求連起來，表達合作的意願。" },
      { fr: "La conclusion", zh: "結尾：請求面試", d: "表示希望有機會面談，並用正式敬語結尾。", ex: [["Je serais ravi(e) de vous rencontrer afin de vous exposer plus en détail mes motivations.", "若有機會與您見面，詳細說明我的動機，將非常榮幸。"]] },
    ],
    phrases: [
      {
        t: "說明動機",
        rows: [
          ["Votre entreprise m’attire particulièrement pour…", "貴公司特別吸引我的地方是……"],
          ["Je souhaite mettre mes compétences au service de…", "我希望能以我的能力為……服務。"],
          ["Ce poste correspond parfaitement à mon projet professionnel.", "這個職位完全符合我的職涯規劃。"],
        ],
      },
      {
        t: "介紹能力與經驗",
        rows: [
          ["Au cours de mon stage chez…, j’ai été chargé(e) de…", "在……實習期間，我負責……"],
          ["Cette expérience m’a permis de développer…", "這段經驗讓我培養了……"],
          ["Je parle couramment chinois et anglais.", "我能流利說中文和英文。"],
        ],
      },
      {
        t: "結尾",
        rows: [
          ["Je me tiens à votre disposition pour un entretien.", "隨時可以配合面試。"],
          ["Dans l’attente de votre réponse, je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.", "期待您的回覆，謹此致意。"],
        ],
      },
    ],
    model: {
      title: "Candidature à un stage en marketing",
      level: "B2",
      prompt: "你看到一家法國旅行社徵求「亞洲市場行銷實習生」。寫一封動機信應徵。（至少 250 字）",
      parts: [
        { label: "主旨與稱呼", fr: "Objet : Candidature au stage « Assistant(e) marketing – marché asiatique »\n\nMadame, Monsieur,", zh: "主旨：應徵「亞洲市場行銷助理」實習\n\n敬啟者：" },
        { label: "開頭：應徵什麼", fr: "Actuellement en master de marketing à l’Université nationale de Taïwan, je me permets de vous proposer ma candidature au stage d’assistante marketing que vous proposez sur votre site, pour une durée de six mois à partir de février.", zh: "我目前就讀台灣大學行銷碩士班，看到貴公司網站上徵求行銷助理實習生，為期六個月，二月開始，謹此應徵。" },
        { label: "您：為什麼選這家公司", fr: "Votre agence m’attire particulièrement pour ses circuits consacrés au tourisme responsable, une démarche qui me tient à cœur. J’ai également remarqué que vous souhaitiez développer votre clientèle en Asie, en particulier à Taïwan, où les voyages en Europe connaissent un succès croissant.", zh: "貴公司特別吸引我的，是以負責任旅遊為主題的行程，這也是我非常重視的理念。我也注意到貴公司希望拓展亞洲客群，特別是台灣市場，而歐洲旅遊在台灣越來越受歡迎。" },
        { label: "我：能力與經驗", fr: "L’année dernière, j’ai effectué un stage de trois mois dans une agence de voyage à Taipei, où j’étais chargée de gérer les réseaux sociaux. J’ai notamment créé une série de vidéos courtes sur la Provence, qui a permis d’augmenter nettement le nombre d’abonnés. Cette expérience m’a appris à adapter un message à un public précis. Par ailleurs, je parle couramment chinois et anglais, et j’ai obtenu le DELF B2 en juin. Enfin, un semestre d’échange à Lyon m’a appris à travailler efficacement au sein d’une équipe internationale.", zh: "去年，我在台北一家旅行社實習三個月，負責經營社群媒體。我特別製作了一系列介紹普羅旺斯的短影片，讓追蹤人數明顯成長。這段經驗讓我學會針對特定受眾調整訊息。此外，我能流利使用中文和英文，並在六月通過了 DELF B2。最後，在里昂交換一學期的經驗，讓我學會在國際團隊中有效合作。" },
        { label: "我們：能帶來什麼", fr: "Je suis convaincue que ma connaissance du public taïwanais et mon expérience des réseaux sociaux pourraient contribuer au développement de vos offres en Asie. Travailler au sein de votre équipe serait pour moi une occasion unique de mettre mes compétences au service d’un projet qui a du sens.", zh: "我相信，我對台灣客群的了解以及經營社群媒體的經驗，能為貴公司拓展亞洲市場做出貢獻。能加入貴團隊，對我來說是將所學投入一個有意義的計畫的難得機會。" },
        { label: "結尾與敬語", fr: "Je serais ravie de vous rencontrer, en personne ou en visioconférence, afin de vous exposer plus en détail mes motivations. Dans l’attente de votre réponse, je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.\n\nChen Mei-ling", zh: "若有機會與您見面或視訊，詳細說明我的動機，將非常榮幸。期待您的回覆，謹此致意。\n\n陳美玲" },
      ],
    },
    tips: [
      { t: "針對每一家公司重寫「您」那一段", d: "招聘者一眼就看得出通用的動機信。提到對方的產品、理念或最近的消息，證明你真的了解他們。" },
      { t: "用成果代替形容詞", d: "與其寫「我很有創意」，不如寫「我製作的短影片讓追蹤人數明顯成長」。" },
      { t: "長度控制在一頁", d: "法國的動機信通常不超過一頁，三到四段就夠了。" },
    ],
    pitfalls: [
      { wrong: "Je suis très motivé et dynamique.", right: "J’ai créé une série de vidéos qui a permis d’augmenter le nombre d’abonnés.", why: "空泛的形容詞沒有說服力，用具體的經驗和成果說明。" },
      { wrong: "Je veux ce stage parce que j’ai besoin d’expérience.", right: "Ce stage me permettrait de mettre mes compétences au service de…", why: "強調你能為對方帶來什麼，而不只是你需要什麼。" },
      { wrong: "Actuellement en master, mon CV montre que…", right: "Actuellement en master, je me permets de…", why: "句首的同位語（Actuellement en master）必須和主詞一致，主詞是「我」。" },
    ],
    checklist: ["主旨寫出應徵的職位", "第一段說明應徵什麼、在哪裡看到", "提到對方公司或學校的具體特色", "經驗有具體成果", "說明你能為對方帶來什麼", "請求面試，正式敬語結尾", "不超過一頁"],
    prompts: [
      { level: "B1", fr: "Une école de langue en France cherche un(e) assistant(e) pour accueillir les étudiants asiatiques pendant l’été. Vous écrivez une lettre de motivation.", zh: "法國一所語言學校徵求暑期助理，負責接待亞洲學生。寫一封動機信應徵。", min: 160 },
      { level: "C1", fr: "Vous souhaitez intégrer un master dans une université française. Rédigez la lettre de motivation qui accompagnera votre dossier de candidature.", zh: "你想申請法國大學的碩士班。寫一封附在申請資料裡的動機信。", min: 250 },
    ],
  },
  {
    id: "resume",
    zh: "摘要",
    fr: "Le résumé de texte",
    levels: "B2–C1",
    group: "academique",
    blurb: "把一篇文章濃縮成原長度的四分之一左右，忠實保留作者的觀點與結構。",
    intro: "摘要是用自己的話重寫原文的重點，保留原文的順序和邏輯，不加入自己的意見，也不抄原句。法國學校常要求把文章縮成原長度的四分之一左右（題目會規定字數）。",
    when: ["大學課堂與學術報告", "整理閱讀資料", "DALF C1 綜合摘要的基本功（綜合摘要的寫法請看下一篇）"],
    structure: [
      { fr: "Lecture et repérage", zh: "閱讀與標記", d: "讀兩遍：第一遍抓主題，第二遍標出每段的主要觀點和連接詞（cependant、donc……），找出文章的邏輯。" },
      { fr: "Plan du texte", zh: "列出原文結構", d: "每段用一句話寫出主旨，刪掉例子、數據和重複的說明。" },
      { fr: "Reformulation", zh: "用自己的話改寫", d: "換掉原文的用詞，但保留作者的觀點。摘要裡的「我」就是原作者，不要寫「作者認為」。" },
      { fr: "Vérification", zh: "檢查", d: "字數是否符合要求、是否漏掉重要觀點、有沒有加入自己的意見。" },
    ],
    phrases: [
      {
        t: "改寫的技巧",
        rows: [
          ["名詞化：Les prix augmentent. → L’augmentation des prix…", "用名詞化濃縮句子"],
          ["同義詞：important → essentiel, majeur", "換用同義詞"],
          ["合併：A… De plus, B… → Non seulement A, mais aussi B.", "把兩個觀點合併成一句"],
        ],
      },
      {
        t: "保留邏輯的連接詞",
        rows: [
          ["Si…, … pourtant…", "雖然……但是……"],
          ["Dès lors, …", "因此……"],
          ["Il convient donc de…", "因此應該……"],
        ],
      },
    ],
    model: {
      title: "Résumé : « Le retour du vélo en ville »",
      level: "B2",
      prompt: "把下面這段約 150 字的文章，濃縮成 40 到 50 字的摘要。",
      context: [
        {
          label: "原文（本站原創）",
          fr: "Depuis une dizaine d’années, le vélo fait un retour remarquable dans les grandes villes européennes. Pistes cyclables, vélos en libre-service, aides à l’achat de vélos électriques : les municipalités multiplient les initiatives pour encourager ce mode de déplacement. Les raisons de cet engouement sont nombreuses. Le vélo ne pollue pas, il coûte peu et il permet de faire de l’exercice au quotidien. En ville, il est même souvent plus rapide que la voiture aux heures de pointe. Pourtant, tout n’est pas encore parfait. Beaucoup de cyclistes se plaignent du manque de sécurité, car les pistes sont parfois interrompues ou partagées avec les voitures. D’autres regrettent qu’il soit difficile de garer son vélo sans craindre le vol. Si les villes veulent que le vélo devienne un véritable moyen de transport pour tous, et pas seulement pour les plus courageux, elles devront donc continuer à investir, en particulier dans des aménagements sûrs et continus.",
          zh: "這十年來，自行車在歐洲大城市強勢回歸。自行車道、公共自行車、電動自行車購買補助：各城市紛紛推出措施，鼓勵這種交通方式。這股熱潮的原因很多：自行車不汙染、花費少，還能每天運動。在城市裡，尖峰時段騎車甚至常常比開車快。不過，一切還不完美。很多騎士抱怨不夠安全，因為自行車道有時會中斷，或要和汽車共用。也有人遺憾停車時總擔心車子被偷。如果城市希望自行車成為所有人的交通工具，而不只是最勇敢的人才敢騎，就必須持續投資，特別是建設安全、連貫的設施。",
        },
      ],
      parts: [
        {
          label: "摘要（45 字）",
          fr: "Écologique, économique et bon pour la santé, le vélo connaît un net regain en ville grâce aux politiques municipales. Cependant, l’insécurité des pistes et le risque de vol freinent encore son développement : les villes doivent donc poursuivre leurs investissements pour le rendre accessible à tous.",
          zh: "自行車環保、省錢又健康，在市政政策推動下於城市裡明顯回溫。然而，車道不安全和失竊風險仍阻礙它的發展，因此城市必須繼續投資，讓所有人都能騎。",
        },
      ],
      note: "原文的四個部分（現象 → 原因 → 問題 → 結論）都保留了，順序不變；例子（自行車道、公共自行車）和細節（尖峰時段）被刪掉或濃縮成一個詞。",
    },
    tips: [
      { t: "保留結構，刪掉例子", d: "摘要要看得出原文的邏輯（現象、原因、問題、結論），但具體的例子、數字、引用通常可以刪去。" },
      { t: "多用名詞化和同位語", d: "« Le vélo ne pollue pas, il coûte peu… » 可以濃縮成 « Écologique, économique… »。" },
      { t: "不要加入自己的意見", d: "摘要只呈現原作者的想法，不寫 je pense、à mon avis。" },
    ],
    pitfalls: [
      { wrong: "L’auteur dit que le vélo revient. Ensuite, il dit que…", right: "Le vélo connaît un net regain en ville…", why: "摘要直接以原作者的角度陳述，不要一直寫「作者說」。" },
      { wrong: "（照抄原文的句子）", right: "（用同義詞和名詞化改寫）", why: "摘要要用自己的話，照抄會被扣分。" },
      { wrong: "À mon avis, les villes ont raison.", right: "（刪掉）", why: "摘要不加入個人意見。" },
    ],
    checklist: ["原文每個重要觀點都保留", "順序與邏輯和原文一致", "刪掉例子與細節", "用自己的話，沒有照抄", "沒有加入個人意見", "字數符合要求"],
    prompts: [
      { level: "B2", fr: "Choisissez un article en français (environ 300 mots) dans la rubrique « Lectures » de ce site et résumez-le en 70 à 80 mots.", zh: "從本站「閱讀」區選一篇法文文章（約 300 字），寫成 70 到 80 字的摘要。", min: 70, max: 80 },
    ],
  },
  {
    id: "synthese",
    zh: "綜合摘要",
    fr: "La synthèse de documents",
    levels: "C1",
    group: "academique",
    blurb: "把兩份以上的資料整合成一篇客觀的短文。DALF C1 寫作第一題，有字數上下限。",
    intro: "綜合摘要不是分別摘要每份資料，而是找出資料的共同主題，依「主題」重新組織內容，客觀地呈現各方觀點。DALF C1 規定綜合摘要 220 至 240 字，不能加入個人意見，也不能引用資料以外的內容。",
    when: ["DALF C1 寫作第一題：綜合摘要（220–240 字），接著再寫一篇至少 250 字的論說文", "大學報告、工作簡報"],
    structure: [
      { fr: "Le titre", zh: "標題", d: "可以加上一個總結主題的標題。" },
      { fr: "L’introduction", zh: "引言", d: "點出共同主題，簡短介紹資料來源（類型、作者或媒體），提出資料共同回應的問題。" },
      { fr: "Le développement en deux ou trois parties", zh: "主體：依主題分段", d: "每一段處理一個面向（例如「好處」「風險」），在同一段裡比較不同資料的觀點：相同、互補還是對立。" },
      { fr: "La conclusion", zh: "結論", d: "一兩句話總結資料的整體看法。不加入個人意見。" },
    ],
    phrases: [
      {
        t: "介紹資料",
        rows: [
          ["Les deux documents abordent la question de…", "兩份資料都探討了……的問題。"],
          ["Dans un article paru dans…, X souligne que…", "在刊登於……的文章中，X 強調……"],
          ["L’infographie présente…", "這張資訊圖表呈現了……"],
        ],
      },
      {
        t: "比較觀點",
        rows: [
          ["Les deux auteurs s’accordent à dire que…", "兩位作者都同意……"],
          ["X va dans le même sens que Y.", "X 和 Y 的看法一致。"],
          ["À l’inverse, Y estime que…", "相反地，Y 認為……"],
          ["X nuance ce constat en rappelant que…", "X 提醒……，對這個結論做了修正。"],
        ],
      },
    ],
    model: {
      title: "Le travail à quatre jours : une idée d’avenir ?",
      level: "C1",
      prompt: "閱讀以下兩份資料（本站原創，內容為虛構的觀點陳述），寫一篇 220 至 240 字的綜合摘要。",
      context: [
        {
          label: "資料一：某企業主管的專欄（節要）",
          fr: "Dans une tribune, la directrice d’une PME explique que son entreprise est passée à la semaine de quatre jours. Selon elle, les salariés, plus reposés, sont plus concentrés et moins souvent absents. L’entreprise attire aussi plus facilement de jeunes candidats. Elle reconnaît toutefois qu’il a fallu réorganiser le travail et supprimer des réunions jugées inutiles.",
          zh: "一位中小企業主管在專欄中說明公司改為週休三日。她認為員工休息得更充足，更專心，請假也比較少；公司也更容易吸引年輕求職者。不過她也承認，必須重新安排工作、取消一些沒必要的會議。",
        },
        {
          label: "資料二：某經濟學者的訪談（節要）",
          fr: "Interrogé par un magazine, un économiste se montre plus prudent. Si la semaine de quatre jours peut améliorer le bien-être, elle ne convient pas à tous les métiers : dans les hôpitaux ou les commerces, il faut assurer une présence continue. Il craint aussi que des journées plus longues ne fatiguent davantage les salariés et rappelle que les résultats dépendent largement de l’organisation de chaque entreprise. Il cite d’ailleurs le cas de sociétés qui, faute d’avoir pu alléger la charge de travail, sont revenues à la semaine de cinq jours.",
          zh: "一位經濟學者接受雜誌訪問時態度較保留。他認為週休三日雖然能提升福祉，卻不適合所有行業：醫院和商店必須持續有人在。他也擔心每天工時拉長會讓員工更累，並提醒成效很大程度取決於每家公司的組織方式。他還舉出一些公司因為無法減輕工作量，最後又改回週休二日的例子。",
        },
      ],
      parts: [
        { label: "標題", fr: "La semaine de quatre jours : promesses et limites", zh: "週休三日：前景與限制" },
        { label: "引言：共同主題與問題", fr: "Alors que de plus en plus d’entreprises expérimentent la semaine de quatre jours, deux documents s’interrogent sur ses effets réels : la tribune de la directrice d’une PME qui l’a adoptée, et l’entretien d’un économiste publié dans un magazine. Cette nouvelle organisation du temps de travail constitue-t-elle un progrès pour tous ?", zh: "隨著越來越多企業試行週休三日，兩份資料探討了它的實際影響：一份是已實施此制度的中小企業主管所寫的專欄，另一份是雜誌刊登的經濟學者訪談。這種新的工時安排，對所有人來說都是進步嗎？" },
        { label: "第一部分：好處（兩份資料的共識）", fr: "Les deux auteurs reconnaissent d’abord que ce rythme peut améliorer le bien-être des salariés. Pour la directrice, des employés plus reposés sont plus concentrés et s’absentent moins, ce qui renforce par ailleurs l’attractivité de l’entreprise auprès des jeunes. L’économiste admet lui aussi ce bénéfice, sans toutefois le généraliser à l’ensemble des métiers.", zh: "兩位作者首先都承認，這種工作節奏能提升員工的福祉。主管認為，休息更充足的員工更專心、請假更少，也讓公司更能吸引年輕人。經濟學者同樣承認這項好處，但沒有將它推及所有行業。" },
        { label: "第二部分：限制（觀點的差異）", fr: "En effet, les limites du dispositif apparaissent clairement. L’économiste souligne qu’il ne convient pas aux secteurs qui exigent une présence continue, comme la santé ou le commerce, et redoute que des journées plus longues n’accroissent la fatigue. La directrice va dans le même sens lorsqu’elle évoque la réorganisation qu’il a fallu mener : la réussite de la réforme suppose de repenser le travail, et non simplement de le comprimer. L’économiste cite d’ailleurs des entreprises qui, faute d’avoir pu alléger la charge de travail, sont revenues à la semaine de cinq jours.", zh: "事實上，這項制度的限制也很明顯。經濟學者強調它不適合需要持續有人的行業，例如醫療或商業，並擔心每天工時拉長會增加疲勞。主管提到公司必須重新安排工作時，看法也與此相同：改革要成功，必須重新思考工作方式，而不只是把工時壓縮。經濟學者也舉出一些公司因為無法減輕工作量，最後又改回週休二日的例子。" },
        { label: "結論", fr: "Ainsi, si la semaine de quatre jours apparaît, pour l’un comme pour l’autre, comme une piste prometteuse, son succès dépend étroitement du secteur d’activité et de l’organisation propre à chaque entreprise.", zh: "因此，週休三日在兩人看來雖然前景可期，成功與否卻與行業性質和每家公司的組織方式密切相關。" },
      ],
      note: "注意綜合摘要的寫法：不是「資料一說……資料二說……」，而是依主題（好處、限制）分段，在每段裡比較兩份資料。全文沒有個人意見。",
    },
    tips: [
      { t: "依主題分段，不要依資料分段", d: "先列出所有資料的觀點，再找出兩三個主題，把各份資料的說法放進對應的主題裡比較。" },
      { t: "保持客觀", d: "不寫 je、à mon avis、il faut，也不加入資料以外的例子。立場留到第二題的論說文再表達。" },
      { t: "嚴守字數", d: "DALF C1 規定 220 至 240 字。寫完一定要數，太長或太短都會扣分。" },
    ],
    pitfalls: [
      { wrong: "Le document 1 dit que… Le document 2 dit que…", right: "Les deux auteurs reconnaissent que… À l’inverse, l’économiste…", why: "要依主題整合，而不是逐份摘要。" },
      { wrong: "Personnellement, je pense que c’est une bonne idée.", right: "（刪掉）", why: "綜合摘要不能有個人意見。" },
      { wrong: "Selon l’OCDE, … （資料裡沒有的資訊）", right: "（只用資料提供的內容）", why: "不能加入資料以外的資訊。" },
    ],
    checklist: ["有標題（可選）", "引言點出共同主題、介紹資料、提出問題", "依主題分段，不是依資料分段", "每段比較不同資料的觀點", "沒有個人意見", "沒有資料以外的資訊", "220 至 240 字"],
    prompts: [
      { level: "C1", fr: "Choisissez deux textes de la rubrique « Lectures » qui abordent un thème proche (par exemple le travail ou la langue française) et rédigez-en une synthèse de 220 à 240 mots.", zh: "從「閱讀」區挑兩篇主題相近的文章（例如工作或法語），寫一篇 220 至 240 字的綜合摘要。", min: 220, max: 240 },
    ],
  },
  {
    id: "dissertation",
    zh: "論文式寫作",
    fr: "La dissertation",
    levels: "C1–C2",
    group: "academique",
    blurb: "法國學校與 DALF C2 的長篇論述：引言、兩到三部分的主體、結論，結構非常講究。",
    intro: "Dissertation 是法國中學到大學最重要的寫作訓練：針對一個問題，循序漸進地推理，最後得出結論。它的引言和結論都有固定的組成，主體通常分成兩到三部分，每部分再分成幾個小點。DALF C2 的寫作題要求根據一份資料寫出至少 700 字、結構完整的文章。",
    when: ["法國高中與大學的文學、哲學、歷史課", "DALF C2 寫作：閱讀約 2,000 字的資料後，在 3 小時 30 分鐘內寫出至少 700 字的文章", "學術報告"],
    structure: [
      { fr: "L’introduction", zh: "引言", d: "1. 引子（accroche）：一個事實、引言或例子，引出主題。\n2. 分析題目：說明關鍵詞的意思。\n3. 問題意識（problématique）：把題目轉化成一個值得討論的問題。\n4. 預告大綱（annonce du plan）：說明文章分成哪幾部分。" },
      { fr: "Le développement", zh: "主體", d: "兩到三個部分，每部分有自己的論點，再分成兩三個小點，每個小點都有例子。部分之間用過渡句銜接。\n常見的大綱：\n辯證式（thèse／antithèse／synthèse）：正、反、合。\n分析式：現象、原因、結果或對策。\n主題式：依不同面向分析。" },
      { fr: "Les transitions", zh: "過渡句", d: "每個部分結束時，用一兩句話總結並帶出下一部分。", ex: [["Si… , il n’en demeure pas moins que… C’est ce que nous verrons dans une seconde partie.", "雖然……但……這就是我們在第二部分要探討的。"]] },
      { fr: "La conclusion", zh: "結論", d: "1. 總結（bilan）：回答引言的問題，整理推理的過程。\n2. 延伸（ouverture）：提出一個相關的新問題或更廣的視野。" },
    ],
    phrases: [
      {
        t: "引言",
        rows: [
          ["« … », écrivait X. Cette affirmation invite à s’interroger sur…", "X 曾寫道「……」。這句話促使我們思考……"],
          ["Il convient dès lors de se demander si…", "因此應該思考的是……"],
          ["Nous verrons dans un premier temps… puis… avant de…", "我們首先會探討……接著……最後……"],
        ],
      },
      {
        t: "結論",
        rows: [
          ["Au terme de cette réflexion, il apparaît que…", "經過以上思考，可以看出……"],
          ["Ainsi, … ; reste à savoir si…", "因此……；剩下的問題是……"],
          ["Cette question en soulève une autre : …", "這個問題又引出另一個問題：……"],
        ],
      },
    ],
    model: {
      title: "« La lecture est-elle encore utile à l’ère des écrans ? »",
      level: "C1",
      prompt: "題目：在螢幕時代，閱讀還有用嗎？以下示範引言、大綱和結論（完整文章的主體需要依大綱展開，DALF C2 全文至少 700 字）。",
      parts: [
        { label: "引言：引子", fr: "Dans les transports en commun, il est devenu rare de voir un voyageur plongé dans un livre : la plupart des regards sont tournés vers un écran.", zh: "在大眾運輸上，已經很少看到埋頭讀書的乘客：大多數人的目光都落在螢幕上。" },
        { label: "引言：分析題目", fr: "Ce constat conduit certains à affirmer que la lecture, entendue comme la fréquentation des livres, appartiendrait au passé.", zh: "這個現象讓一些人斷言，閱讀（這裡指讀書）已經屬於過去。" },
        { label: "引言：問題意識", fr: "Pourtant, lire ne se réduit pas à tourner des pages de papier. Il convient donc de se demander si les écrans rendent la lecture inutile, ou s’ils en transforment seulement les formes et les usages.", zh: "然而，閱讀並不只是翻紙本書頁。因此應該思考的是：螢幕究竟讓閱讀變得無用，還是只改變了閱讀的形式與用途？" },
        { label: "引言：預告大綱", fr: "Nous verrons d’abord que les écrans concurrencent bel et bien la lecture traditionnelle, puis que celle-ci conserve des vertus irremplaçables, avant de montrer que l’enjeu est moins de choisir entre livre et écran que d’apprendre à lire autrement.", zh: "我們首先會看到螢幕確實在和傳統閱讀競爭，接著說明閱讀仍保有無可取代的價值，最後指出：重點不在於選擇書還是螢幕，而是學會用不同的方式閱讀。" },
        { label: "大綱（主體要依此展開）", fr: "I. Les écrans concurrencent la lecture traditionnelle\n  1. Une attention de plus en plus sollicitée\n  2. Une information rapide qui semble suffire\nII. La lecture conserve des vertus irremplaçables\n  1. Une concentration et une réflexion approfondies\n  2. L’imagination et l’empathie\nIII. Lire autrement plutôt que lire moins\n  1. Les écrans, nouveaux supports de lecture\n  2. Le rôle de l’école dans l’apprentissage d’une lecture attentive", zh: "一、螢幕與傳統閱讀競爭\n  1. 注意力越來越分散\n  2. 快速的資訊似乎就夠了\n二、閱讀保有無可取代的價值\n  1. 專注與深入的思考\n  2. 想像力與同理心\n三、換一種方式讀，而不是讀得更少\n  1. 螢幕是新的閱讀載體\n  2. 學校在培養專注閱讀上的角色" },
        { label: "結論：總結", fr: "Au terme de cette réflexion, il apparaît que les écrans ne rendent pas la lecture inutile : ils en modifient les supports et les rythmes, mais rendent plus nécessaire encore la capacité à lire avec attention.", zh: "經過以上思考，可以看出螢幕並沒有讓閱讀變得無用：它改變了閱讀的載體和節奏，卻使專注閱讀的能力變得更加必要。" },
        { label: "結論：延伸", fr: "Reste à savoir si l’intelligence artificielle, capable de résumer n’importe quel texte en quelques secondes, ne posera pas demain une question plus radicale encore : celle du désir même de lire.", zh: "剩下的問題是：能在幾秒鐘內摘要任何文章的人工智慧，未來是否會提出一個更根本的問題，也就是我們是否還想讀。" },
      ],
      note: "這裡只示範引言、大綱和結論。完整的 dissertation 要把每個小點寫成一段（主題句、說明、例子），部分之間加上過渡句。",
    },
    tips: [
      { t: "問題意識是整篇文章的核心", d: "不要只把題目換個說法，要找出題目裡的矛盾或張力（例如「螢幕讓閱讀無用」vs「閱讀只是換了形式」），整篇文章都是在回答這個問題。" },
      { t: "大綱要有推進感", d: "第三部分不是把前兩部分加起來，而是提出更高一層的看法。辯證式大綱的「合」要超越「正」與「反」。" },
      { t: "例子要多元", d: "文學作品、歷史事件、社會現象、個人觀察都可以，但每個例子都要說明它如何支持你的論點。" },
    ],
    pitfalls: [
      { wrong: "Dans cette dissertation, je vais parler de la lecture.", right: "Il convient donc de se demander si… Nous verrons d’abord…", why: "引言要提出問題並預告大綱，不要只說「我要談……」。" },
      { wrong: "（結論加入全新的論點）", right: "（結論只總結並延伸）", why: "結論不應出現主體沒有談過的論點；延伸（ouverture）是提出新問題，不是新論證。" },
      { wrong: "I. Les avantages  II. Les inconvénients（沒有推進）", right: "I. … II. … III. Dépasser l’opposition…", why: "單純列優缺點太平淡，要讓論述一步一步深入。" },
    ],
    checklist: ["引言有引子、題目分析、問題意識、大綱預告", "主體兩到三部分，各有小點與例子", "部分之間有過渡句", "大綱有推進，不只是列優缺點", "結論回答問題並延伸", "語域正式（nous、il convient de……）", "DALF C2 至少 700 字"],
    prompts: [
      { level: "C1", fr: "« Voyager, est-ce seulement changer de lieu ? » Rédigez l’introduction et le plan détaillé d’une dissertation sur ce sujet.", zh: "「旅行只是換個地方嗎？」針對這個題目，寫出引言和詳細大綱。", min: 150 },
      { level: "C2", fr: "« Le progrès technique rend-il les hommes plus libres ? » Rédigez une dissertation complète.", zh: "「科技進步讓人更自由嗎？」寫一篇完整的論文式文章。", min: 700 },
    ],
  },
];
