import type { Reading } from "@/lib/readingTypes";

/**
 * 本站原創文章。人物與情節是虛構的；文中提到的事實都附上查證來源（facts），
 * 數字會變動的資訊（使用人數、國家數）刻意不寫。
 */
export const ORIGINALS: Reading[] = [
  {
    id: "je-m-appelle-lea",
    level: "A1",
    kind: "original",
    title: "Je m’appelle Léa",
    zh: "我叫蕾雅",
    theme: "presentation",
    intro: "一位法國女生的自我介紹：家人、工作和興趣。用的都是 A1 最常見的句型。",
    paragraphs: [
      [
        ["Bonjour ! Je m’[[appelle]] Léa.", "你好！我叫蕾雅。"],
        ["J’ai vingt-quatre ans et je suis française.", "我二十四歲，是法國人。"],
        ["J’[[habite]] à Lyon, dans un petit appartement près de la gare.", "我住在里昂，車站附近的一間小公寓。"],
      ],
      [
        ["Je suis [[infirmière]] dans un hôpital.", "我在一家醫院當護理師。"],
        ["Mon travail est difficile, mais j’aime beaucoup aider les gens.", "我的工作很辛苦，但我很喜歡幫助別人。"],
      ],
      [
        ["J’ai un frère et une sœur.", "我有一個哥哥和一個妹妹。"],
        ["Mon frère s’appelle Hugo ; il est étudiant à Paris.", "我哥哥叫雨果，他在巴黎讀大學。"],
        ["Ma sœur, Chloé, a quinze ans.", "我妹妹克蘿伊十五歲。"],
        ["Elle est très [[bavarde]] !", "她很愛講話！"],
      ],
      [
        ["Le week-end, je fais du vélo au bord du Rhône et je [[joue de la guitare]].", "週末我在隆河邊騎腳踏車，也彈吉他。"],
        ["J’adore aussi la cuisine asiatique.", "我也超愛亞洲料理。"],
        ["Cette année, j’apprends le chinois parce que je voudrais [[visiter]] Taïwan.", "今年我在學中文，因為我想去台灣玩。"],
      ],
    ],
    glossary: {
      appelle: { lemma: "s'appeler", pos: "反身動詞（現在式）", zh: "名叫" },
      habite: { lemma: "habiter", pos: "動詞（現在式）", zh: "居住" },
      infirmière: { lemma: "l'infirmier / l'infirmière", pos: "名詞", zh: "護理師", note: "être + 職業不加冠詞：je suis infirmière。" },
      bavarde: { lemma: "bavard(e)", pos: "形容詞", zh: "愛說話的" },
      "joue de la guitare": { lemma: "jouer de + 樂器", pos: "動詞片語", zh: "彈奏（樂器）", note: "運動用 jouer à：jouer au foot。" },
      visiter: { lemma: "visiter", pos: "動詞", zh: "參觀、遊覽（地方）", note: "拜訪人要用 rendre visite à。" },
    },
    quiz: [
      { q: "蕾雅住在哪裡？", options: ["里昂", "巴黎", "台北", "馬賽"], why: "J’habite à Lyon。" },
      { q: "蕾雅的工作是什麼？", options: ["護理師", "學生", "老師", "廚師"], why: "Je suis infirmière dans un hôpital。" },
      { q: "誰在巴黎讀大學？", options: ["她的哥哥雨果", "她的妹妹克蘿伊", "蕾雅自己", "她的爸爸"], why: "Mon frère s’appelle Hugo ; il est étudiant à Paris。" },
      { q: "蕾雅為什麼學中文？", options: ["因為她想去台灣玩", "因為工作需要", "因為她的妹妹在學", "因為她住在台灣"], why: "parce que je voudrais visiter Taïwan。" },
    ],
  },
  {
    id: "au-marche",
    level: "A1",
    kind: "original",
    title: "Au marché",
    zh: "在市場",
    theme: "achats",
    intro: "星期六早上，湯瑪去市場買菜。練習數量、價錢和購物的說法。",
    paragraphs: [
      [
        ["Samedi matin, Thomas va au marché avec son panier.", "星期六早上，湯瑪提著籃子去市場。"],
        ["Il y a beaucoup de monde et les fruits sont très beaux.", "人很多，水果都很漂亮。"],
      ],
      [
        ["– Bonjour madame ! Je voudrais un [[kilo]] de tomates, s’il vous plaît.", "「老闆娘早！我要一公斤番茄，麻煩了。」"],
        ["– Voilà. Et avec ça ?", "「來，還要什麼嗎？」"],
        ["– Des fraises. Elles sont à combien ?", "「草莓。怎麼賣？」"],
        ["– Quatre euros la [[barquette]].", "「一盒四歐元。」"],
        ["– Alors, deux barquettes, s’il vous plaît. Ça fait combien ?", "「那我要兩盒。總共多少錢？」"],
        ["– Ça fait dix euros cinquante.", "「十歐元五十分。」"],
      ],
      [
        ["Thomas paie et la vendeuse lui [[rend la monnaie]].", "湯瑪付了錢，老闆娘找零給他。"],
        ["Ensuite, il achète du pain à la [[boulangerie]] et un morceau de fromage.", "接著他到麵包店買麵包，又買了一塊乳酪。"],
        ["Ce midi, il invite ses amis à déjeuner !", "今天中午他要請朋友吃午餐！"],
      ],
    ],
    glossary: {
      kilo: { lemma: "le kilo", pos: "陽性名詞", zh: "公斤", note: "數量詞 + de + 名詞：un kilo de tomates。" },
      barquette: { lemma: "la barquette", pos: "陰性名詞", zh: "（水果的）小盒子" },
      "rend la monnaie": { lemma: "rendre la monnaie", pos: "動詞片語", zh: "找零錢" },
      boulangerie: { lemma: "la boulangerie", pos: "陰性名詞", zh: "麵包店" },
    },
    quiz: [
      { q: "湯瑪買了多少番茄？", options: ["一公斤", "兩公斤", "半公斤", "一盒"], why: "Je voudrais un kilo de tomates。" },
      { q: "一盒草莓多少錢？", options: ["四歐元", "兩歐元", "十歐元五十分", "五歐元"], why: "Quatre euros la barquette。" },
      { q: "「Et avec ça ?」是什麼意思？", options: ["還要什麼嗎？", "要付現嗎？", "要袋子嗎？", "這個怎麼樣？"], why: "店家問客人還要不要買別的東西。" },
      { q: "湯瑪中午要做什麼？", options: ["請朋友吃午餐", "去餐廳", "再去市場", "去上班"], why: "Ce midi, il invite ses amis à déjeuner。" },
    ],
  },
  {
    id: "la-chandeleur",
    level: "A2",
    kind: "original",
    title: "La Chandeleur, le jour des crêpes",
    zh: "聖燭節：可麗餅的日子",
    theme: "culture",
    intro: "每年 2 月 2 日，法國人會在家做可麗餅。這個節日從哪裡來？翻可麗餅又有什麼傳統？",
    facts: [
      { claim: "聖燭節在 2 月 2 日，是聖誕節後的第四十天；在法國、比利時和瑞士法語區傳統上會吃可麗餅。", url: "https://fr.wikipedia.org/wiki/Chandeleur" },
      { claim: "傳統習俗：右手翻可麗餅、左手握著一枚金幣，據說能帶來好運與財富。", url: "https://fr.wikipedia.org/wiki/Chandeleur" },
    ],
    paragraphs: [
      [
        ["En France, le 2 février, beaucoup de familles mangent des crêpes.", "在法國，每年 2 月 2 日，很多家庭會吃可麗餅。"],
        ["C’est la Chandeleur, une fête qui a lieu quarante jours après Noël.", "這一天是聖燭節，在聖誕節後的第四十天。"],
        ["À l’origine, c’est une fête religieuse, mais aujourd’hui, pour la plupart des gens, c’est surtout « le jour des crêpes ».", "這原本是宗教節日，但今天對大多數人來說，它主要是「可麗餅日」。"],
      ],
      [
        ["Pour faire la [[pâte]], il faut de la farine, des œufs, du lait et un peu de sucre.", "做麵糊需要麵粉、蛋、牛奶和一點糖。"],
        ["On [[verse]] un peu de pâte dans une [[poêle]] chaude, puis on fait cuire la crêpe des deux côtés.", "把一點麵糊倒進熱鍋裡，兩面都煎熟。"],
        ["On peut la manger avec du sucre, de la confiture ou du chocolat.", "可以加糖、果醬或巧克力吃。"],
      ],
      [
        ["Il existe une vieille tradition amusante.", "有一個古老又有趣的傳統。"],
        ["Autrefois, on [[faisait sauter]] la première crêpe avec la main droite, en tenant une pièce d’or dans la main gauche.", "從前，人們用右手把第一張可麗餅拋起來翻面，左手同時握著一枚金幣。"],
        ["Si la crêpe retombait bien dans la poêle, on aurait de la chance et de l’argent toute l’année !", "如果可麗餅好好地落回鍋裡，一整年都會有好運和錢財！"],
        ["Aujourd’hui encore, beaucoup d’enfants essaient de faire sauter leur crêpe… et elle finit parfois par terre.", "直到今天，很多孩子還是會試著拋可麗餅……結果有時掉到地上。"],
      ],
    ],
    glossary: {
      pâte: { lemma: "la pâte", pos: "陰性名詞", zh: "麵糊、麵團", note: "別和 les pâtes（義大利麵）搞混。" },
      verse: { lemma: "verser", pos: "動詞（現在式）", zh: "倒、灌" },
      poêle: { lemma: "la poêle", pos: "陰性名詞", zh: "平底鍋", note: "le poêle（陽性）是「火爐」。" },
      "faisait sauter": { lemma: "faire sauter", pos: "動詞片語（未完成過去式）", zh: "拋起來翻面；（烹飪）快炒" },
    },
    quiz: [
      { q: "聖燭節是哪一天？", options: ["2 月 2 日", "12 月 25 日", "1 月 1 日", "7 月 14 日"], why: "le 2 février。" },
      { q: "聖燭節和聖誕節相隔多久？", options: ["四十天", "一個星期", "一百天", "兩個月"], why: "quarante jours après Noël。" },
      { q: "傳統上，翻第一張可麗餅時左手要拿什麼？", options: ["一枚金幣", "一個蛋", "一支湯匙", "一根蠟燭"], why: "en tenant une pièce d’or dans la main gauche。" },
      { q: "文中 « elle finit parfois par terre » 指的是什麼？", options: ["可麗餅有時掉到地上", "節日有時取消", "孩子有時跌倒", "麵糊有時不夠"], why: "孩子拋可麗餅時，有時沒接住，掉到地上。" },
    ],
  },
  {
    id: "week-end-taipei",
    level: "A2",
    kind: "original",
    title: "Un week-end à Taipei",
    zh: "台北週末",
    theme: "voyage",
    intro: "法國學生馬克第一次來台灣，寫信告訴朋友他在台北的週末，重點是夜市。練習複合過去式。",
    facts: [
      { claim: "士林夜市位於台北市士林區，是台灣最大、最有名的夜市之一，靠近捷運淡水信義線（紅線）劍潭站。", url: "https://fr.wikipedia.org/wiki/March%C3%A9_de_nuit_de_Shilin" },
      { claim: "士林夜市的攤位大約下午四點開始營業，晚上八點到十一點人最多。", url: "https://fr.wikipedia.org/wiki/March%C3%A9_de_nuit_de_Shilin" },
    ],
    paragraphs: [
      [
        ["Chère Camille,", "親愛的卡蜜兒："],
        ["Je suis à Taipei depuis une semaine et j’adore cette ville !", "我來台北一個星期了，我超愛這個城市！"],
      ],
      [
        ["Samedi, j’ai [[pris]] le métro jusqu’à la station Jiantan, sur la ligne rouge.", "星期六，我搭捷運紅線到劍潭站。"],
        ["Juste à côté, il y a le marché de nuit de Shilin, un des plus grands et des plus connus de Taïwan.", "旁邊就是士林夜市，台灣最大、最有名的夜市之一。"],
        ["Les stands [[ouvrent]] vers seize heures, mais il y a le plus de monde le soir, entre vingt heures et vingt-trois heures.", "攤位大約下午四點開，但晚上八點到十一點人最多。"],
      ],
      [
        ["J’y suis allé avec mon ami taïwanais, Wei.", "我和台灣朋友阿偉一起去。"],
        ["Nous avons [[goûté]] beaucoup de spécialités : des [[brochettes]], des raviolis et un grand thé aux perles.", "我們吃了很多特色小吃：烤串、水餃，還有一大杯珍珠奶茶。"],
        ["Wei m’a aussi fait goûter du tofu puant.", "阿偉還讓我嚐了臭豆腐。"],
        ["L’odeur est très forte, mais le goût est délicieux, je te promets !", "味道很重，但吃起來很好吃，我保證！"],
      ],
      [
        ["Dimanche, je me suis reposé, parce que nous sommes rentrés très tard.", "星期天我休息了一天，因為我們很晚才回家。"],
        ["Et toi, comment ça va à Bordeaux ?", "妳呢，在波爾多過得好嗎？"],
        ["[[Bises|bises]],", "親親，"],
        ["Marc", "馬克"],
      ],
    ],
    glossary: {
      pris: { lemma: "prendre", pos: "過去分詞", zh: "搭乘（交通工具）；拿" },
      ouvrent: { lemma: "ouvrir", pos: "動詞（現在式）", zh: "開門、營業" },
      goûté: { lemma: "goûter", pos: "過去分詞", zh: "品嚐", note: "faire goûter qqch à qqn＝讓某人嚐某物。" },
      brochettes: { lemma: "la brochette", pos: "陰性名詞", zh: "烤肉串" },
      bises: { lemma: "la bise", pos: "陰性名詞", zh: "親吻（臉頰）", note: "Bises 是寫給朋友的信件結尾。" },
    },
    quiz: [
      { q: "馬克搭捷運到哪一站？", options: ["劍潭站", "台北車站", "淡水站", "士林站"], why: "j’ai pris le métro jusqu’à la station Jiantan。" },
      { q: "夜市什麼時候人最多？", options: ["晚上八點到十一點", "下午四點", "中午", "早上"], why: "il y a le plus de monde le soir, entre vingt heures et vingt-trois heures。" },
      { q: "馬克覺得臭豆腐怎麼樣？", options: ["味道很重，但很好吃", "很難吃", "沒有味道", "他沒有吃"], why: "L’odeur est très forte, mais le goût est délicieux。" },
      { q: "馬克星期天為什麼休息？", options: ["因為前一晚很晚才回家", "因為他生病了", "因為下雨", "因為夜市沒開"], why: "parce que nous sommes rentrés très tard。" },
    ],
  },
  {
    id: "baguette-unesco",
    level: "B1",
    kind: "original",
    title: "La baguette, patrimoine de l’humanité",
    zh: "長棍麵包：人類的文化遺產",
    theme: "nourriture",
    intro: "2022 年，長棍麵包的手藝與文化被列入聯合國教科文組織的非物質文化遺產。為什麼一根麵包這麼重要？",
    facts: [
      { claim: "「長棍麵包的手工技藝與文化」於 2022 年 11 月底列入聯合國教科文組織人類非物質文化遺產代表作名錄；2018 年先列入法國的非物質文化遺產清單。", url: "https://fr.wikipedia.org/wiki/Baguette_(pain)" },
      { claim: "依 1993 年 9 月 13 日的第 93-1074 號法令，「法國傳統麵包」只能用麵粉、水、鹽和酵母或天然酵種製作，只允許極少量的特定添加物。", url: "https://fr.wikipedia.org/wiki/Baguette_(pain)" },
      { claim: "長棍麵包在 1950 年代末形成今天的樣子：約 250 克、長約 60 公分。", url: "https://fr.wikipedia.org/wiki/Baguette_(pain)" },
    ],
    paragraphs: [
      [
        ["Fin 2022, l’UNESCO a inscrit « les savoir-faire artisanaux et la culture de la baguette de pain » sur la liste du [[patrimoine culturel immatériel]] de l’humanité.", "2022 年底，聯合國教科文組織把「長棍麵包的手工技藝與文化」列入人類非物質文化遺產名錄。"],
        ["Ce n’est donc pas le pain lui-même qui est protégé, mais le [[savoir-faire]] des boulangers et les habitudes qui entourent la baguette.", "所以受保護的不是麵包本身，而是麵包師傅的手藝，以及圍繞著長棍麵包的生活習慣。"],
      ],
      [
        ["La baguette telle qu’on la connaît aujourd’hui date de la fin des années 1950 : un pain d’environ 250 grammes et d’une soixantaine de centimètres.", "我們今天熟悉的長棍麵包是 1950 年代末才定型的：大約 250 克、六十公分左右長。"],
        ["Il existe aussi la « baguette de tradition française ».", "另外還有「法國傳統長棍麵包」。"],
        ["Depuis un [[décret]] de 1993, elle doit être fabriquée essentiellement avec de la farine, de l’eau, du sel et de la [[levure]] ou du [[levain]], sans [[additifs]] (seules quelques exceptions, en très petite quantité, sont autorisées).", "根據 1993 年的一項法令，它基本上只能用麵粉、水、鹽和酵母或天然酵種製作，不能加添加物（只允許極少量的幾種例外）。"],
      ],
      [
        ["Pour beaucoup de Français, acheter sa baguette chaque jour est un petit [[rituel]].", "對很多法國人來說，每天買一根長棍麵包是個小小的儀式。"],
        ["On la choisit « bien cuite » ou « pas trop cuite », et on en mange souvent le bout sur le chemin du retour.", "有人要「烤得焦一點」，有人要「不要太熟」，而且常常在回家的路上就先吃掉麵包的尖端。"],
        ["Cette inscription rappelle que derrière un objet simple se cache tout un art de vivre.", "這次列入名錄提醒我們：簡單的東西背後，藏著一整套生活藝術。"],
      ],
    ],
    glossary: {
      "patrimoine culturel immatériel": { lemma: "le patrimoine culturel immatériel", pos: "名詞片語", zh: "非物質文化遺產" },
      "savoir-faire": { lemma: "le savoir-faire", pos: "陽性名詞（不變化）", zh: "技藝、專業知識" },
      décret: { lemma: "le décret", pos: "陽性名詞", zh: "法令" },
      levure: { lemma: "la levure", pos: "陰性名詞", zh: "酵母" },
      levain: { lemma: "le levain", pos: "陽性名詞", zh: "天然酵種、老麵" },
      additifs: { lemma: "l'additif (m.)", pos: "陽性名詞", zh: "添加物" },
      rituel: { lemma: "le rituel", pos: "陽性名詞", zh: "儀式、習慣" },
    },
    quiz: [
      { q: "聯合國教科文組織保護的是什麼？", options: ["長棍麵包的手藝與相關文化", "麵包本身的配方專利", "某一家麵包店", "法國所有的麵包"], why: "Ce n’est donc pas le pain lui-même qui est protégé, mais le savoir-faire des boulangers…" },
      { q: "長棍麵包的現代樣子大約是什麼時候定型的？", options: ["1950 年代末", "1993 年", "2022 年", "十八世紀"], why: "date de la fin des années 1950。" },
      { q: "依照 1993 年的法令，「傳統長棍麵包」基本上可以用哪些材料？", options: ["麵粉、水、鹽、酵母或天然酵種", "麵粉、牛奶、奶油、糖", "麵粉、蛋、水、鹽", "任何材料都可以"], why: "essentiellement avec de la farine, de l’eau, du sel et de la levure ou du levain。" },
      { q: "文中「art de vivre」最接近哪個意思？", options: ["生活藝術、生活方式", "藝術品", "烹飪課", "美術館"], why: "un art de vivre＝一種生活的藝術、生活方式。" },
    ],
  },
  {
    id: "tour-de-france",
    level: "B1",
    kind: "original",
    title: "Le Tour de France",
    zh: "環法自行車賽",
    theme: "loisirs",
    intro: "全世界最有名的自行車賽事。黃衫、圓點衫、綠衫代表什麼？終點為什麼常在香榭麗舍大道？",
    facts: [
      { claim: "第一屆環法賽在 1903 年舉行，由《L’Auto》報主辦，目的是提高報紙銷量；此後每年舉辦，兩次世界大戰期間除外。", url: "https://fr.wikipedia.org/wiki/Tour_de_France" },
      { claim: "現代的環法賽有 21 個賽段和 2 個休息日，共約 23 天、將近 3,500 公里，通常在七月舉行。", url: "https://fr.wikipedia.org/wiki/Tour_de_France" },
      { claim: "黃衫至遲在 1919 年出現（1919 年 7 月 19 日首次頒發）。", url: "https://fr.wikipedia.org/wiki/Maillot_jaune" },
      { claim: "1975 年首次在香榭麗舍大道結束，同年引入圓點衫（最佳爬坡手）與白衫（最佳年輕車手）；綠衫是積分領先者。", url: "https://fr.wikipedia.org/wiki/Tour_de_France" },
      { claim: "2024 年因巴黎奧運，終點首次移到法蘭西島以外的尼斯。", url: "https://fr.wikipedia.org/wiki/Tour_de_France" },
    ],
    paragraphs: [
      [
        ["Le Tour de France est la course cycliste la plus célèbre du monde.", "環法自行車賽是全世界最有名的自行車賽。"],
        ["La première [[édition]] a eu lieu en 1903 : elle a été organisée par le journal L’Auto pour augmenter ses ventes.", "第一屆在 1903 年舉行，是《L’Auto》報為了提高銷量而舉辦的。"],
        ["Depuis, la course revient chaque année, sauf pendant les deux guerres mondiales.", "從那以後每年舉辦，只有兩次世界大戰期間中斷。"],
      ],
      [
        ["Aujourd’hui, le Tour se déroule en général en juillet.", "現在的環法賽通常在七月舉行。"],
        ["Les [[coureurs]] parcourent près de 3 500 kilomètres en vingt et une [[étapes]], avec deux jours de repos.", "車手們要騎二十一個賽段、將近 3,500 公里，中間有兩天休息日。"],
        ["Ils traversent la France, et même parfois des pays voisins, en passant par les Alpes et les Pyrénées.", "他們穿越法國，有時還經過鄰國，也會翻越阿爾卑斯山和庇里牛斯山。"],
      ],
      [
        ["Chaque jour, le premier du [[classement général]] porte le célèbre [[maillot jaune]], qui existe depuis 1919.", "每天，總排名第一的車手穿上著名的黃衫，黃衫從 1919 年就有了。"],
        ["Il y a aussi d’autres maillots : le maillot vert pour le classement par points, le maillot à pois rouges pour le meilleur [[grimpeur]], et le maillot blanc pour le meilleur jeune.", "還有其他顏色的車衫：綠衫給積分榜第一，紅圓點衫給最佳爬坡手，白衫給最佳年輕車手。"],
      ],
      [
        ["Depuis 1975, l’arrivée a lieu traditionnellement sur les Champs-Élysées, à Paris.", "從 1975 年起，終點傳統上設在巴黎的香榭麗舍大道。"],
        ["Mais en 2024, à cause des Jeux olympiques de Paris, la course s’est terminée à Nice, pour la première fois loin de la région parisienne.", "但 2024 年因為巴黎奧運，比賽在尼斯結束，這是第一次在巴黎地區以外的地方結束。"],
        ["Chaque été, de nombreux spectateurs attendent les coureurs au bord des routes.", "每年夏天，都有許多觀眾在路邊等著車手經過。"],
      ],
    ],
    glossary: {
      édition: { lemma: "l'édition (f.)", pos: "陰性名詞", zh: "（活動的）屆；版本" },
      coureurs: { lemma: "le coureur", pos: "陽性名詞", zh: "選手、車手" },
      étapes: { lemma: "l'étape (f.)", pos: "陰性名詞", zh: "賽段；階段" },
      "classement général": { lemma: "le classement général", pos: "名詞片語", zh: "總排名" },
      "maillot jaune": { lemma: "le maillot jaune", pos: "名詞片語", zh: "黃衫（總排名領先者）" },
      grimpeur: { lemma: "le grimpeur", pos: "陽性名詞", zh: "爬坡手" },
    },
    quiz: [
      { q: "第一屆環法賽是誰舉辦的？為什麼？", options: ["一家報社，為了提高銷量", "法國政府，為了推廣觀光", "奧運委員會，為了選拔選手", "自行車公司，為了賣車"], why: "organisée par le journal L’Auto pour augmenter ses ventes。" },
      { q: "現代的環法賽有幾個賽段？", options: ["二十一個", "三個", "十個", "三十五個"], why: "vingt et une étapes。" },
      { q: "最佳爬坡手穿什麼車衫？", options: ["紅圓點衫", "黃衫", "綠衫", "白衫"], why: "le maillot à pois rouges pour le meilleur grimpeur。" },
      { q: "2024 年的終點為什麼不在巴黎？", options: ["因為巴黎舉辦奧運", "因為下雨", "因為香榭麗舍大道在施工", "因為車手要求"], why: "à cause des Jeux olympiques de Paris。" },
    ],
  },
  {
    id: "teletravail",
    level: "B2",
    kind: "original",
    title: "Le télétravail : liberté ou isolement ?",
    zh: "遠端工作：自由還是孤立？",
    theme: "ecole-travail",
    intro: "一篇論說短文，列出遠端工作的優點與缺點，最後提出看法。注意文中的連接詞怎麼組織論點。",
    paragraphs: [
      [
        ["Depuis quelques années, le [[télétravail]] fait partie du quotidien de nombreux salariés.", "這幾年，遠端工作已經成為許多上班族的日常。"],
        ["Faut-il y voir un progrès ou, au contraire, une menace pour la vie sociale ?", "這應該被視為一種進步，還是對社交生活的威脅？"],
      ],
      [
        ["D’une part, travailler chez soi présente des avantages évidents.", "一方面，在家工作有明顯的好處。"],
        ["On économise le temps et l’argent des [[trajets]], et l’on peut mieux organiser sa journée.", "可以省下通勤的時間和金錢，也能更好地安排一天的生活。"],
        ["De plus, beaucoup de salariés disent être plus [[concentrés]] loin du bruit des bureaux ouverts.", "此外，很多上班族表示，遠離開放式辦公室的噪音，他們更能專心。"],
      ],
      [
        ["D’autre part, le télétravail n’a pas que des qualités.", "另一方面，遠端工作並不全是優點。"],
        ["Certes, il offre plus de liberté, mais il peut aussi [[isoler]] les employés, qui perdent le contact quotidien avec leurs collègues.", "的確，它帶來更多自由，但也可能讓員工變得孤立，失去和同事每天的接觸。"],
        ["Par ailleurs, la frontière entre vie privée et vie professionnelle devient [[floue]] : quand le bureau est dans le salon, il est difficile de [[décrocher]].", "此外，私生活和工作的界線變得模糊：當辦公室就在客廳時，就很難真正下班。"],
      ],
      [
        ["En définitive, la meilleure solution semble être un équilibre.", "總之，最好的辦法似乎是取得平衡。"],
        ["Deux ou trois jours à la maison permettent de profiter de la liberté du télétravail, tandis que les jours au bureau préservent les liens d’équipe.", "在家工作兩三天，可以享受遠端工作的自由；而進辦公室的日子則能維繫團隊的連結。"],
        ["Encore faut-il que les entreprises fassent confiance à leurs salariés.", "不過前提是，公司得信任自己的員工。"],
      ],
    ],
    glossary: {
      télétravail: { lemma: "le télétravail", pos: "陽性名詞", zh: "遠端工作" },
      trajets: { lemma: "le trajet", pos: "陽性名詞", zh: "路程、通勤" },
      concentrés: { lemma: "concentré(e)", pos: "形容詞", zh: "專心的" },
      isoler: { lemma: "isoler", pos: "動詞", zh: "使孤立" },
      floue: { lemma: "flou(e)", pos: "形容詞", zh: "模糊的" },
      décrocher: { lemma: "décrocher", pos: "動詞", zh: "（口語）放下工作、抽離；接電話", note: "這裡指下班後不再想工作的事。" },
    },
    quiz: [
      { q: "作者提到遠端工作的哪一個優點？", options: ["省下通勤的時間和金錢", "薪水比較高", "可以認識更多同事", "工作量變少"], why: "On économise le temps et l’argent des trajets。" },
      { q: "作者提到的缺點是什麼？", options: ["可能讓人孤立，而且很難區分工作和私生活", "電腦太貴", "老闆會加班", "沒有休假"], why: "il peut aussi isoler les employés… la frontière… devient floue。" },
      { q: "作者的結論是什麼？", options: ["在家和辦公室之間取得平衡", "應該完全禁止遠端工作", "所有人都應該在家工作", "遠端工作沒有任何缺點"], why: "la meilleure solution semble être un équilibre。" },
      { q: "最後一句 « Encore faut-il que… » 的意思最接近：", options: ["但前提是……", "從此以後……", "相反地……", "總而言之……"], why: "encore faut-il que + 虛擬式＝但還必須……（提出條件）。" },
    ],
  },
  {
    id: "francais-langue-mondiale",
    level: "B2",
    kind: "original",
    title: "Le français, une langue mondiale",
    zh: "法語：一種世界語言",
    theme: "culture",
    intro: "法語不只在法國使用。這篇文章介紹法語在世界上的地位、法蘭西學術院，以及非洲對法語未來的重要性。",
    facts: [
      { claim: "法語是聯合國六種官方語言之一，也是兩種工作語言之一。", url: "https://fr.wikipedia.org/wiki/Langue_fran%C3%A7aise" },
      { claim: "法語是在英語之後學習人數最多的外語；也是非洲大陸使用最廣的語言之一。", url: "https://fr.wikipedia.org/wiki/Langue_fran%C3%A7aise" },
      { claim: "依法語國家國際組織（OIF）的推估，2050 年法語人口可能接近 7 億，其中約 85% 在非洲。", url: "https://fr.wikipedia.org/wiki/Langue_fran%C3%A7aise" },
      { claim: "法蘭西學術院 1634 年成立，1635 年由黎胥留樞機主教正式設立，共有 40 名院士，別稱「不朽者」；負責編纂《法蘭西學術院詞典》並審定外來專業術語的法語對應詞。", url: "https://fr.wikipedia.org/wiki/Acad%C3%A9mie_fran%C3%A7aise" },
    ],
    paragraphs: [
      [
        ["Quand on pense au français, on pense d’abord à la France.", "一提到法語，我們首先想到法國。"],
        ["Pourtant, cette langue est parlée sur les cinq continents : en Belgique, en Suisse, au Québec, dans de nombreux pays d’Afrique et jusque dans le Pacifique.", "然而，五大洲都有人說法語：比利時、瑞士、魁北克、許多非洲國家，一直到太平洋地區。"],
      ],
      [
        ["Le français est l’une des six langues officielles de l’Organisation des Nations unies, et l’une de ses deux langues de travail.", "法語是聯合國六種官方語言之一，也是它的兩種工作語言之一。"],
        ["C’est également la langue étrangère la plus apprise dans le monde après l’anglais.", "它也是全世界僅次於英語、學習人數最多的外語。"],
      ],
      [
        ["En France, une institution [[veille]] sur la langue depuis le XVIIe siècle : l’Académie française.", "在法國，有一個機構從十七世紀就開始守護這個語言：法蘭西學術院。"],
        ["Fondée officiellement en 1635 par le cardinal de Richelieu, elle compte quarante membres, que l’on surnomme les « [[Immortels]] ».", "它在 1635 年由黎胥留樞機主教正式設立，共有四十位院士，人稱「不朽者」。"],
        ["Elle tient à jour un dictionnaire de référence et approuve des équivalents français pour certains termes techniques étrangers.", "學術院負責更新一部權威詞典，也審定一些外來專業術語的法語對應說法。"],
      ],
      [
        ["L’avenir du français, cependant, se joue sans doute en Afrique.", "然而，法語的未來很可能取決於非洲。"],
        ["Selon les [[projections]] de l’Organisation internationale de la Francophonie, la grande majorité des francophones vivront sur ce continent d’ici 2050, en raison de sa forte croissance démographique.", "根據法語國家國際組織的推估，到 2050 年，絕大多數說法語的人將住在非洲，原因是非洲人口成長快速。"],
        ["Loin d’être une langue figée, le français continue donc d’évoluer au contact de cultures très diverses.", "因此，法語絕不是一個僵化的語言，它在接觸各種不同文化的過程中持續演變。"],
      ],
    ],
    glossary: {
      veille: { lemma: "veiller sur", pos: "動詞（現在式）", zh: "照看、守護" },
      Immortels: { lemma: "les Immortels", pos: "陽性名詞（複數）", zh: "不朽者（法蘭西學術院院士的別稱）" },
      projections: { lemma: "la projection", pos: "陰性名詞", zh: "推估、預測；投影" },
    },
    quiz: [
      { q: "根據文章，法語在聯合國的地位是什麼？", options: ["六種官方語言之一、兩種工作語言之一", "唯一的官方語言", "不是官方語言", "只在歐洲辦事處使用"], why: "l’une des six langues officielles… et l’une de ses deux langues de travail。" },
      { q: "法蘭西學術院有幾位院士？", options: ["四十位", "一百位", "十二位", "六位"], why: "elle compte quarante membres。" },
      { q: "為什麼作者說法語的未來取決於非洲？", options: ["因為非洲人口成長快，未來多數法語人口會在非洲", "因為學術院搬到了非洲", "因為非洲的法語最標準", "因為法國人口在減少"], why: "la grande majorité des francophones vivront sur ce continent d’ici 2050, en raison de sa forte croissance démographique。" },
      { q: "« Loin d’être une langue figée » 的意思是：", options: ["絕不是一個僵化的語言", "離我們很遠的語言", "很難學的語言", "古老的語言"], why: "loin de + 原形動詞＝絕非……；figé＝凝固的、僵化的。" },
    ],
  },
];
