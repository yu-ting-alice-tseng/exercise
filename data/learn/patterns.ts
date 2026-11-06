import type { PatternPage } from "@/lib/learnTypes";

/** 跨等級的句型總整理 */
export const PATTERNS: PatternPage[] = [
  {
    id: "temps",
    zh: "時態總覽",
    fr: "Les temps et les modes",
    blurb: "15 種時態和語式一次比較：怎麼變、什麼時候用。",
    intro: "法文動詞依「語式」分成直陳式、條件式、虛擬式、命令式。每種語式裡又有簡單時態（一個字）和複合時態（助動詞 + 過去分詞）。下面用 parler（說）和 partir（離開）當例子。",
    sections: [
      {
        t: "直陳式：陳述事實",
        table: {
          head: ["時態", "等級", "形式", "例子", "用途"],
          rows: [
            ["現在式 présent", "A1", "詞幹 + 詞尾", "je parle", "現在、習慣、普遍事實"],
            ["近未來式 futur proche", "A1", "aller + 原形", "je vais parler", "馬上要做、已計畫"],
            ["近過去式 passé récent", "A2", "venir de + 原形", "je viens de parler", "剛剛做完"],
            ["複合過去式 passé composé", "A2", "avoir / être + 過去分詞", "j'ai parlé, je suis parti", "過去完成的事件"],
            ["未完成過去式 imparfait", "A2", "nous 詞幹 + -ais…", "je parlais", "過去的背景、習慣"],
            ["愈過去式 plus-que-parfait", "B1", "avais / étais + 過去分詞", "j'avais parlé", "過去的過去"],
            ["簡單未來式 futur simple", "B1", "原形 + -ai…", "je parlerai", "未來、預測、承諾"],
            ["先未來式 futur antérieur", "C1", "aurai / serai + 過去分詞", "j'aurai parlé", "未來某時之前已完成"],
            ["簡單過去式 passé simple", "C2", "-ai, -is, -us…", "il parla", "文學、歷史敘述"],
          ],
          fr: [2, 3],
        },
      },
      {
        t: "條件式：假設、禮貌、未經證實",
        table: {
          head: ["時態", "等級", "形式", "例子", "用途"],
          rows: [
            ["條件式現在式", "B1", "未來詞幹 + -ais…", "je parlerais", "禮貌、願望、建議、假設結果"],
            ["條件式過去式", "B2", "aurais / serais + 過去分詞", "j'aurais parlé", "後悔、和過去事實相反"],
          ],
          fr: [2, 3],
        },
      },
      {
        t: "虛擬式：意願、情感、懷疑",
        table: {
          head: ["時態", "等級", "形式", "例子", "用途"],
          rows: [
            ["虛擬式現在式", "B1", "ils 詞幹 + -e…", "que je parle", "il faut que、vouloir que…"],
            ["虛擬式過去式", "B2", "aie / sois + 過去分詞", "que j'aie parlé", "已完成的事 + 情感、懷疑"],
            ["虛擬式未完成過去式", "C2", "-asse, -isse…", "qu'il parlât", "文學語體"],
          ],
          fr: [2, 3],
        },
      },
      {
        t: "命令式",
        table: {
          head: ["時態", "等級", "例子", "用途"],
          rows: [["命令式現在式", "A2", "Parle ! Parlons ! Parlez !", "命令、建議、邀請"]],
          fr: [2],
        },
      },
      {
        t: "過去的故事：事件還是背景？",
        d: "說過去的故事時，最重要的是分清楚複合過去式（事件、一次性的動作、推動劇情）和未完成過去式（背景、描述、習慣、持續狀態）。",
        table: {
          head: ["未完成過去式（布景）", "複合過去式（事件）"],
          rows: [
            ["Il faisait beau.", "Soudain, il a commencé à pleuvoir."],
            ["J'étais fatigué.", "Je suis rentré."],
            ["Je lisais un livre…", "…quand le téléphone a sonné."],
            ["Tous les étés, nous allions à la mer.", "Un été, nous sommes allés en Grèce."],
          ],
          fr: [0, 1],
        },
      },
      {
        t: "未來：三種說法",
        ex: [
          ["Je **vais partir** dans cinq minutes.", "我五分鐘後就要走了。（近未來式，很快、確定）"],
          ["Je **partirai** un jour en Afrique.", "總有一天我會去非洲。（簡單未來式，較遠、預測）"],
          ["Je **pars** demain.", "我明天走。（現在式表示已經排定的未來）"],
        ],
      },
      {
        t: "時間軸",
        d: "愈過去式 → 複合過去式／未完成過去式 → 近過去式 → 現在式 → 近未來式 → 先未來式 → 簡單未來式",
      },
    ],
    related: ["present-er", "passe-compose", "imparfait", "plus-que-parfait", "futur-simple", "futur-anterieur", "conditionnel", "conditionnel-passe", "subjonctif", "passe-simple"],
  },
  {
    id: "interrogation",
    zh: "疑問句",
    fr: "L'interrogation",
    blurb: "三種問法、所有疑問詞，以及口語和正式的差別。",
    intro: "法文問句依語體分成三種：口語只提高語調、通用的 est-ce que、正式的倒裝。問「什麼、誰、哪一個」時，還要看問的是人還是東西、是主詞還是受詞。",
    sections: [
      {
        t: "是非問句的三種語體",
        table: {
          head: ["語體", "句型", "例子"],
          rows: [
            ["口語", "直述句 + 提高語調", "Vous parlez anglais ?"],
            ["通用", "Est-ce que + 直述句", "Est-ce que vous parlez anglais ?"],
            ["正式", "動詞-主詞", "Parlez-vous anglais ?"],
          ],
          fr: [2],
        },
      },
      {
        t: "疑問詞放在哪裡",
        table: {
          head: ["語體", "例子（你住哪裡？）"],
          rows: [
            ["口語：疑問詞在句尾", "Tu habites où ?"],
            ["口語：疑問詞在句首", "Où tu habites ?"],
            ["通用", "Où est-ce que tu habites ?"],
            ["正式", "Où habites-tu ?"],
          ],
          fr: [1],
        },
      },
      {
        t: "疑問副詞",
        table: {
          head: ["疑問詞", "意思", "例子"],
          rows: [
            ["où / d'où", "哪裡／從哪裡", "D'où venez-vous ?"],
            ["quand", "什麼時候", "Quand part le train ?"],
            ["comment", "怎麼、如何", "Comment allez-vous ?"],
            ["pourquoi", "為什麼", "Pourquoi est-ce que tu pleures ?"],
            ["combien (de)", "多少", "Combien de frères as-tu ?"],
            ["depuis quand / depuis combien de temps", "從什麼時候／多久了", "Depuis quand tu habites ici ?"],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "quel：哪個（形容詞，要配合）",
        table: {
          head: ["陽單", "陰單", "陽複", "陰複"],
          rows: [["Quel âge as-tu ?", "Quelle heure est-il ?", "Quels sports aimes-tu ?", "Quelles langues parles-tu ?"]],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "誰、什麼",
        table: {
          head: ["", "人", "東西"],
          rows: [
            ["主詞", "Qui parle ? / Qui est-ce qui parle ?", "Qu'est-ce qui se passe ?"],
            ["受詞", "Qui vois-tu ? / Qui est-ce que tu vois ?", "Que fais-tu ? / Qu'est-ce que tu fais ? / Tu fais quoi ?"],
            ["介系詞後", "Avec qui tu sors ?", "De quoi tu parles ?"],
          ],
          fr: [1, 2],
        },
      },
      {
        t: "名詞主詞的倒裝",
        d: "主詞是名詞時，名詞放前面，再加一個代名詞倒裝。",
        ex: [
          ["**Marie est-elle** là ?", "瑪麗在嗎？"],
          ["Pourquoi **ton frère est-il** parti ?", "你哥哥為什麼走了？"],
        ],
      },
      {
        t: "否定問句與回答 si",
        d: "回答否定問句時，「不，是…」要用 si，不用 oui。",
        ex: [["Tu ne viens pas ? – **Si**, je viens !", "你不來嗎？要啊，我要來！"]],
      },
      {
        t: "禮貌的間接問法",
        ex: [
          ["Pourriez-vous me dire **où se trouve** la gare ?", "可以告訴我車站在哪裡嗎？"],
          ["Je voudrais savoir **si** le musée est ouvert.", "我想知道博物館有沒有開。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "Est-ce que tu habites où ?", right: "Où est-ce que tu habites ?", why: "用 est-ce que 時，疑問詞放最前面。" },
      { wrong: "Tu ne viens pas ? – Oui, je viens.", right: "Tu ne viens pas ? – Si, je viens.", why: "推翻否定問句用 si。" },
      { wrong: "Quoi tu fais ?", right: "Qu'est-ce que tu fais ? / Tu fais quoi ?", why: "quoi 只能放句尾或介系詞後。" },
    ],
    related: ["questions", "pronoms-interrogatifs", "discours-indirect"],
  },
  {
    id: "exclamation",
    zh: "感嘆句",
    fr: "L'exclamation",
    blurb: "Quel beau temps ! Que c'est beau ! 表達驚訝、讚美、不滿。",
    intro: "感嘆句用來表達強烈的情緒：讚美、驚訝、生氣、遺憾。最常用的是 quel + 名詞、que / comme + 句子，以及 ce que、qu'est-ce que 這兩個口語說法。",
    sections: [
      {
        t: "Quel + 名詞！",
        d: "quel 要配合名詞的陰陽性和單複數，名詞前不加冠詞。",
        table: {
          head: ["陽單", "陰單", "陽複", "陰複"],
          rows: [["Quel beau temps !", "Quelle surprise !", "Quels beaux enfants !", "Quelles belles fleurs !"]],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "Que / Comme + 句子！",
        d: "que 和 comme 後面接完整的句子，意思是「多麼…啊！」。",
        ex: [
          ["**Que** c'est beau !", "好美啊！"],
          ["**Comme** il fait chaud !", "好熱啊！"],
          ["**Comme** tu as grandi !", "你長好高了！"],
        ],
      },
      {
        t: "口語：Ce que / Qu'est-ce que + 句子！",
        ex: [
          ["**Qu'est-ce qu'**il est gentil !", "他人真好！"],
          ["**Ce qu'**on s'est amusés !", "我們玩得真開心！"],
        ],
      },
      {
        t: "Tellement / Si / Trop（口語）",
        ex: [
          ["Il est **tellement** drôle !", "他好好笑！"],
          ["C'est **trop** bien !", "太棒了！（年輕人口語）"],
        ],
      },
      {
        t: "名詞或形容詞單獨使用",
        table: {
          head: ["說法", "意思"],
          rows: [
            ["Génial ! Super ! Formidable !", "太棒了！"],
            ["Dommage !", "可惜！"],
            ["Bravo ! Félicitations !", "好棒！恭喜！"],
            ["Zut ! Mince !", "糟了！可惡！"],
            ["Tant pis !", "算了！"],
            ["Tant mieux !", "那太好了！"],
            ["Quelle horreur !", "太可怕了！"],
            ["Pas possible !", "不會吧！"],
          ],
          fr: [0],
        },
      },
      {
        t: "感嘆詞",
        table: {
          head: ["感嘆詞", "情緒", "例子"],
          rows: [
            ["Oh là là !", "驚訝、擔心", "Oh là là, je suis en retard !"],
            ["Aïe !", "痛", "Aïe, je me suis coupé !"],
            ["Bof.", "無所謂、不怎麼樣", "Le film ? Bof."],
            ["Ouf !", "鬆一口氣", "Ouf, on a eu le train !"],
            ["Beurk !", "噁心", "Beurk, c'est dégoûtant !"],
            ["Chut !", "安靜", "Chut, le bébé dort !"],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "用 si + 未完成過去式表達願望或遺憾",
        ex: [
          ["**Si** seulement j'**avais** plus de temps !", "要是我有更多時間就好了！"],
          ["**Si** j'**avais su** !", "早知道就好了！"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "Quel une belle journée !", right: "Quelle belle journée !", why: "quel 感嘆句不加冠詞，並配合陰性 journée。" },
      { wrong: "Comme c'est un beau jardin !", right: "Quel beau jardin ! / Comme ce jardin est beau !", why: "comme 不直接修飾「un + 名詞」，名詞的感嘆用 quel。" },
    ],
    related: ["questions", "si-hypothese"],
  },
  {
    id: "negation",
    zh: "否定句總整理",
    fr: "La négation",
    blurb: "ne…pas、ne…jamais、ne…que、ni…ni 和贅詞 ne 一次看懂。",
    intro: "法文否定通常有兩個部分：ne 放在變化的動詞前，第二個字（pas、jamais、rien…）放在動詞後。口語常省略 ne，但寫作和考試一定要寫。",
    sections: [
      {
        t: "所有否定詞",
        table: {
          head: ["否定詞", "意思", "等級", "例子"],
          rows: [
            ["ne…pas", "不", "A1", "Je ne fume pas."],
            ["ne…jamais", "從不", "A1", "Il ne ment jamais."],
            ["ne…plus", "不再", "A1", "Elle n'habite plus ici."],
            ["ne…rien", "什麼都不", "A1", "Je ne comprends rien."],
            ["ne…personne", "沒有人", "A1", "Je ne connais personne."],
            ["ne…pas encore", "還沒", "A2", "Il n'est pas encore arrivé."],
            ["ne…aucun(e)", "沒有任何", "B1", "Je n'ai aucune idée."],
            ["ne…nulle part", "哪裡都不", "B1", "Je ne le trouve nulle part."],
            ["ne…que", "只（限定）", "B1", "Il ne boit que de l'eau."],
            ["ne…ni…ni", "既不…也不", "B1", "Je n'aime ni le thé ni le café."],
            ["ne…guère", "幾乎不", "C1", "Il ne parle guère."],
          ],
          fr: [0, 3],
        },
      },
      {
        t: "位置總整理",
        table: {
          head: ["情況", "例子"],
          rows: [
            ["簡單時態", "Je **ne** mange **pas**."],
            ["複合時態", "Je **n'**ai **pas** mangé."],
            ["有受詞代名詞", "Je **ne le** mange **pas**."],
            ["原形動詞", "Je préfère **ne pas** manger."],
            ["命令式", "**Ne** mange **pas** ça !"],
            ["反身動詞", "Je **ne me** lève **pas**."],
            ["personne 在複合時態", "Je **n'**ai vu **personne**.（在過去分詞後）"],
          ],
          fr: [1],
        },
      },
      {
        t: "否定詞當主詞",
        ex: [
          ["**Personne ne** sait.", "沒有人知道。"],
          ["**Rien n'**est impossible.", "沒有什麼是不可能的。"],
          ["**Aucun** élève **n'**a répondu.", "沒有任何學生回答。"],
        ],
      },
      {
        t: "冠詞變化",
        d: "否定句中 un、une、des、du、de la、de l' 變成 de。但 être 後面和 ne…que 不變。",
        ex: [
          ["J'ai **un** chien. → Je n'ai pas **de** chien.", "我沒有狗。"],
          ["C'est **un** chien. → Ce n'est pas **un** chien.", "那不是狗。"],
          ["Je ne mange que **des** légumes.", "我只吃蔬菜。"],
        ],
      },
      {
        t: "組合否定",
        ex: [
          ["Je **ne** dis **plus jamais rien**.", "我再也不說任何話了。"],
          ["Il **n'**y a **plus personne**.", "已經沒人了。"],
        ],
      },
      {
        t: "簡短回答",
        table: {
          head: ["說法", "意思"],
          rows: [
            ["Moi non plus.", "我也不。"],
            ["Pas du tout.", "完全不。"],
            ["Pas encore.", "還沒。"],
            ["Jamais !", "絕不！"],
            ["Rien.", "沒什麼。"],
            ["Personne.", "沒人。"],
            ["Pas moi.", "不是我。"],
          ],
          fr: [0],
        },
      },
      {
        t: "贅詞 ne（沒有否定意思）",
        d: "正式語體中出現在 avant que、à moins que、de peur que、craindre que，以及比較級 plus / moins… que 後面。",
        ex: [["Je crains qu'il **ne** soit malade.", "我擔心他生病了。（不是「沒生病」）"]],
      },
    ],
    pitfalls: [
      { wrong: "Je ne veux pas rien.", right: "Je ne veux rien.", why: "rien 已經是否定，不再加 pas。" },
      { wrong: "Moi aussi pas.", right: "Moi non plus.", why: "附和否定句用 moi non plus。" },
    ],
    related: ["negation", "negation-avancee", "partitifs"],
  },
  {
    id: "connecteurs",
    zh: "連接詞總整理",
    fr: "Les connecteurs logiques",
    blurb: "原因、結果、對比、讓步、目的、時間、條件，依功能和語式整理。",
    intro: "連接詞依功能分類來記最有效。每一類都分成「接名詞」「接直陳式」「接虛擬式」「接原形動詞」，寫作時才不會用錯語式。",
    sections: [
      {
        t: "加入、列舉",
        table: {
          head: ["等級", "說法", "例子"],
          rows: [
            ["A1", "et, aussi", "Il parle anglais et espagnol."],
            ["A2", "d'abord, ensuite, puis, enfin", "D'abord je lis, ensuite j'écris."],
            ["B1", "de plus, en plus, également", "De plus, c'est moins cher."],
            ["B2", "en outre, par ailleurs, d'une part… d'autre part", "En outre, le site est accessible."],
            ["C1–C2", "qui plus est, de surcroît, non seulement… mais encore", "Qui plus est, il ment."],
          ],
          fr: [1, 2],
        },
      },
      {
        t: "原因",
        table: {
          head: ["接什麼", "說法"],
          rows: [
            ["直陳式", "parce que, car, comme（句首）, puisque, étant donné que, vu que, d'autant que"],
            ["名詞", "à cause de（負面）, grâce à（正面）, en raison de, à la suite de, faute de, vu"],
            ["獨立", "en effet"],
          ],
          fr: [1],
        },
      },
      {
        t: "結果",
        table: {
          head: ["接什麼", "說法"],
          rows: [
            ["獨立", "donc, alors, ainsi, c'est pourquoi, par conséquent, en conséquence, d'où"],
            ["直陳式", "si bien que, de sorte que, tellement / si… que, tant de… que"],
          ],
          fr: [1],
        },
        ex: [["Il a **tellement** plu **que** la route est inondée.", "雨下得太大，路都淹了。"]],
      },
      {
        t: "對比、讓步",
        table: {
          head: ["接什麼", "說法"],
          rows: [
            ["獨立", "mais, pourtant, cependant, toutefois, néanmoins, en revanche, par contre, quand même"],
            ["直陳式", "alors que, tandis que, même si"],
            ["虛擬式", "bien que, quoique"],
            ["名詞", "malgré, en dépit de, au lieu de, contrairement à"],
            ["原形動詞", "avoir beau, au lieu de"],
          ],
          fr: [1],
        },
      },
      {
        t: "目的",
        table: {
          head: ["接什麼", "說法"],
          rows: [
            ["原形動詞", "pour, afin de, de peur de, en vue de"],
            ["虛擬式", "pour que, afin que, de peur que, de sorte que（目的）"],
          ],
          fr: [1],
        },
      },
      {
        t: "時間",
        table: {
          head: ["接什麼", "說法"],
          rows: [
            ["直陳式", "quand, lorsque, pendant que, dès que, depuis que, après que, chaque fois que"],
            ["虛擬式", "avant que, jusqu'à ce que, en attendant que"],
            ["原形動詞", "avant de, après + 過去不定式"],
          ],
          fr: [1],
        },
      },
      {
        t: "條件、假設",
        table: {
          head: ["接什麼", "說法"],
          rows: [
            ["直陳式", "si, même si"],
            ["條件式", "au cas où, quand bien même"],
            ["虛擬式", "à condition que, pourvu que, à moins que, à supposer que"],
            ["名詞", "en cas de, sans, avec"],
          ],
          fr: [1],
        },
      },
      {
        t: "舉例、換句話說、結論",
        table: {
          head: ["功能", "說法"],
          rows: [
            ["舉例", "par exemple, notamment, comme, tel(le) que, ainsi"],
            ["換句話說", "c'est-à-dire, autrement dit, en d'autres termes"],
            ["結論", "bref, en résumé, en conclusion, pour conclure, en somme, finalement"],
          ],
          fr: [1],
        },
      },
    ],
    pitfalls: [
      { wrong: "Car il est malade, il reste au lit.", right: "Comme il est malade, il reste au lit.", why: "car 不能放句首。" },
      { wrong: "Bien qu'il est riche…", right: "Bien qu'il soit riche…", why: "bien que 接虛擬式。" },
      { wrong: "Malgré il pleut…", right: "Malgré la pluie… / Bien qu'il pleuve…", why: "malgré 只接名詞。" },
    ],
    related: ["connecteurs-a1", "connecteurs-chrono", "cause-consequence", "connecteurs", "opposition-concession", "expression-but", "articulateurs", "argumentation", "connecteurs-soutenus"],
  },
  {
    id: "comparaison",
    zh: "比較與程度",
    fr: "La comparaison",
    blurb: "比較級、最高級、同等比較，以及「越來越…」「越…越…」。",
    intro: "比較句要先看比較的是形容詞、副詞、名詞還是動詞，再選 plus、moins、aussi、autant。",
    sections: [
      {
        t: "比較級四種搭配",
        table: {
          head: ["比較對象", "更", "一樣", "較不"],
          rows: [
            ["形容詞", "plus grand que", "aussi grand que", "moins grand que"],
            ["副詞", "plus vite que", "aussi vite que", "moins vite que"],
            ["名詞", "plus de livres que", "autant de livres que", "moins de livres que"],
            ["動詞", "travailler plus que", "travailler autant que", "travailler moins que"],
          ],
          fr: [1, 2, 3],
        },
      },
      {
        t: "最高級",
        ex: [
          ["C'est **le plus** grand musée **du** monde.", "這是世界上最大的博物館。"],
          ["C'est elle qui court **le plus vite**.", "她跑得最快。（副詞最高級用 le）"],
          ["C'est lui qui a **le plus d'**amis.", "他朋友最多。"],
        ],
      },
      {
        t: "不規則",
        table: {
          head: ["", "比較級", "最高級"],
          rows: [
            ["bon（好的）", "meilleur(e)(s)", "le / la / les meilleur(e)(s)"],
            ["bien（好地）", "mieux", "le mieux"],
            ["mauvais", "pire / plus mauvais", "le pire"],
            ["beaucoup", "plus", "le plus"],
            ["peu", "moins", "le moins"],
          ],
          fr: [0, 1, 2],
        },
      },
      {
        t: "程度變化",
        table: {
          head: ["說法", "意思", "例子"],
          rows: [
            ["de plus en plus", "越來越", "Il fait de plus en plus chaud."],
            ["de moins en moins", "越來越不", "Je sors de moins en moins."],
            ["plus… plus…", "越…越…", "Plus je travaille, plus je suis fatigué."],
            ["moins… plus…", "越不…越…", "Moins on dort, plus on est stressé."],
            ["d'autant plus que", "更加…因為", "Je suis d'autant plus content que c'est gratuit."],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "相同與不同",
        table: {
          head: ["說法", "意思"],
          rows: [
            ["le même / la même / les mêmes que", "和…一樣的"],
            ["comme", "像…一樣"],
            ["différent de", "和…不同"],
            ["pareil que / à（口語）", "和…一樣"],
            ["ressembler à", "像…"],
          ],
          fr: [0],
        },
        ex: [["J'ai **la même** robe **que** toi.", "我有跟你一樣的洋裝。"]],
      },
    ],
    pitfalls: [
      { wrong: "plus bon", right: "meilleur", why: "bon 的比較級是不規則的 meilleur。" },
      { wrong: "Il a aussi de livres que moi.", right: "Il a autant de livres que moi.", why: "名詞的同等比較用 autant de。" },
      { wrong: "Plus je travaille, je suis fatigué.", right: "Plus je travaille, plus je suis fatigué.", why: "「越…越…」兩邊都要有 plus。" },
    ],
    related: ["comparatif", "adverbes"],
  },
  {
    id: "hypothese",
    zh: "假設與條件",
    fr: "L'hypothèse",
    blurb: "si 的三種條件句，以及 au cas où、à condition que 等其他說法。",
    intro: "假設句的關鍵是時態搭配。si 後面永遠不接未來式和條件式；其他連接詞則各有固定的語式。",
    sections: [
      {
        t: "si 條件句",
        table: {
          head: ["情況", "si + …", "主句", "例子"],
          rows: [
            ["真實、可能", "現在式", "未來式", "Si tu viens, on ira au cinéma."],
            ["普遍事實", "現在式", "現在式", "Si on chauffe l'eau, elle bout."],
            ["給建議", "現在式", "命令式", "Si tu es fatigué, repose-toi."],
            ["想像（現在）", "未完成過去式", "條件式現在式", "Si j'avais des ailes, je volerais."],
            ["遺憾（過去）", "愈過去式", "條件式過去式", "Si tu m'avais appelé, je serais venu."],
            ["過去影響現在", "愈過去式", "條件式現在式", "Si j'avais dormi, je serais en forme."],
          ],
          fr: [3],
        },
      },
      {
        t: "其他表達假設的方式",
        table: {
          head: ["說法", "語式", "例子"],
          rows: [
            ["au cas où", "條件式", "Au cas où il pleuvrait, prends un parapluie."],
            ["à condition que", "虛擬式", "Je viens à condition que tu viennes aussi."],
            ["pourvu que", "虛擬式", "Pourvu qu'il fasse beau !"],
            ["à moins que", "虛擬式", "On part à moins qu'il ne pleuve."],
            ["en cas de", "名詞", "En cas d'urgence, appelez le 15."],
            ["sans", "名詞", "Sans toi, je serais perdu."],
            ["même si", "直陳式", "Même s'il pleut, je sortirai."],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "條件式的其他假設用法",
        ex: [
          ["On **serait** des pirates et tu **serais** le capitaine.", "假裝我們是海盜，你是船長。（小孩玩遊戲）"],
          ["Je **prendrais** bien un café.", "我還滿想喝杯咖啡的。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "Si j'aurais su…", right: "Si j'avais su…", why: "si 後面不接條件式。" },
      { wrong: "Si tu viendras, on ira au cinéma.", right: "Si tu viens, on ira au cinéma.", why: "si 後面不接未來式。" },
    ],
    related: ["si-hypothese", "conditionnel", "conditionnel-passe", "hypothese-avancee"],
  },
  {
    id: "pronoms",
    zh: "代名詞總表",
    fr: "Les pronoms personnels",
    blurb: "主詞、受詞、重讀、反身、y、en 一張表全收，加上排列順序。",
    intro: "法文的人稱代名詞依它在句子裡的角色變化。先判斷動詞後面直接接受詞（COD）還是接 à + 人（COI），就能選對代名詞。",
    sections: [
      {
        t: "人稱代名詞總表",
        table: {
          head: ["主詞", "直接受詞 COD", "間接受詞 COI", "反身", "重讀"],
          rows: [
            ["je", "me", "me", "me", "moi"],
            ["tu", "te", "te", "te", "toi"],
            ["il", "le", "lui", "se", "lui"],
            ["elle", "la", "lui", "se", "elle"],
            ["on", "（無）", "（無）", "se", "soi"],
            ["nous", "nous", "nous", "nous", "nous"],
            ["vous", "vous", "vous", "vous", "vous"],
            ["ils", "les", "leur", "se", "eux"],
            ["elles", "les", "leur", "se", "elles"],
          ],
          fr: [0, 1, 2, 3, 4],
        },
      },
      {
        t: "y 和 en",
        table: {
          head: ["代名詞", "代替", "例子"],
          rows: [
            ["y", "à + 東西、地點", "Je pense à mon examen. → J'y pense."],
            ["en", "de + 東西、部分冠詞、數量", "J'ai trois chats. → J'en ai trois."],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "兩個代名詞的順序",
        table: {
          head: ["1", "2", "3", "4", "5", "動詞"],
          rows: [["me, te, se, nous, vous", "le, la, les", "lui, leur", "y", "en", "…"]],
          fr: [0, 1, 2, 3, 4],
        },
        ex: [
          ["Il **me l'**a dit.", "他告訴我了。"],
          ["Je **la lui** ai donnée.", "我把它給他了。"],
          ["Il **y en** a beaucoup.", "那裡有很多。"],
        ],
      },
      {
        t: "肯定命令式的順序",
        d: "動詞-COD-COI-y-en，me 和 te 變成 moi、toi。",
        ex: [
          ["Donne-**le-moi**.", "把它給我。"],
          ["Parle-**lui-en**.", "跟他談這件事。"],
        ],
      },
      {
        t: "其他代名詞速查",
        table: {
          head: ["種類", "形式", "例子"],
          rows: [
            ["指示", "celui, celle, ceux, celles", "Je prends celui-ci."],
            ["所有格", "le mien, la tienne, les nôtres…", "C'est le mien."],
            ["關係", "qui, que, où, dont, lequel", "Le livre dont je parle."],
            ["疑問", "qui, que, quoi, lequel", "Laquelle préfères-tu ?"],
            ["不定", "quelqu'un, quelque chose, chacun, personne, rien", "Chacun fait ce qu'il veut."],
          ],
          fr: [1, 2],
        },
      },
    ],
    pitfalls: [
      { wrong: "Je lui aime.", right: "Je l'aime.", why: "aimer qqn 是直接受詞。" },
      { wrong: "Je pense à lui.（指一件事）", right: "J'y pense.", why: "東西用 y，人才用 à lui。" },
    ],
    related: ["pronoms-toniques", "cod-coi", "y-en", "place-pronoms", "pronoms-doubles", "relatifs", "pronoms-demonstratifs", "pronoms-possessifs"],
  },
  {
    id: "temps-date",
    zh: "時間、日期與數字",
    fr: "L'heure, la date et les nombres",
    blurb: "幾點、星期、月份、日期、頻率，以及 70 到 99 的數法。",
    intro: "時間和日期是日常最常用的句型。注意法文日期是「日-月-年」，月份和星期都小寫。",
    sections: [
      {
        t: "幾點了？",
        table: {
          head: ["時間", "說法", "非正式"],
          rows: [
            ["8:00", "Il est huit heures.", ""],
            ["8:15", "Il est huit heures quinze.", "huit heures et quart"],
            ["8:30", "Il est huit heures trente.", "huit heures et demie"],
            ["8:45", "Il est huit heures quarante-cinq.", "neuf heures moins le quart"],
            ["12:00", "Il est douze heures.", "Il est midi."],
            ["0:00", "Il est zéro heure.", "Il est minuit."],
          ],
          fr: [1, 2],
        },
      },
      {
        t: "日期",
        d: "le + 數字 + 月份 + 年份。每個月的一號用 le premier。",
        ex: [
          ["Nous sommes **le 14 juillet** 2026.", "今天是 2026 年 7 月 14 日。"],
          ["Mon anniversaire, c'est **le premier** mai.", "我生日是五月一號。"],
        ],
      },
      {
        t: "星期與月份（都小寫）",
        table: {
          head: ["星期", "月份"],
          rows: [
            ["lundi, mardi, mercredi", "janvier, février, mars, avril"],
            ["jeudi, vendredi", "mai, juin, juillet, août"],
            ["samedi, dimanche", "septembre, octobre, novembre, décembre"],
          ],
          fr: [0, 1],
        },
      },
      {
        t: "le lundi 還是 lundi？",
        ex: [
          ["**Lundi**, je vais chez le dentiste.", "這個星期一我要去看牙醫。（一次）"],
          ["**Le lundi**, je fais du sport.", "每個星期一我都運動。（習慣）"],
        ],
      },
      {
        t: "季節",
        d: "en été、en automne、en hiver，但 au printemps。",
      },
      {
        t: "頻率",
        table: {
          head: ["說法", "意思"],
          rows: [
            ["toujours", "總是"],
            ["souvent", "常常"],
            ["parfois / quelquefois", "有時"],
            ["rarement", "很少"],
            ["ne… jamais", "從不"],
            ["tous les jours / chaque jour", "每天"],
            ["une fois par semaine", "一週一次"],
            ["tous les deux jours", "每兩天"],
          ],
          fr: [0],
        },
      },
      {
        t: "70 到 99",
        table: {
          head: ["數字", "說法", "邏輯"],
          rows: [
            ["70", "soixante-dix", "60 + 10"],
            ["71", "soixante et onze", "60 + 11"],
            ["80", "quatre-vingts", "4 × 20"],
            ["81", "quatre-vingt-un", "4 × 20 + 1（沒有 et，也沒有 s）"],
            ["90", "quatre-vingt-dix", "4 × 20 + 10"],
            ["99", "quatre-vingt-dix-neuf", "4 × 20 + 19"],
          ],
          fr: [1],
        },
        d: "比利時和瑞士法語用 septante（70）、nonante（90），瑞士有些地區用 huitante（80）。",
      },
    ],
    pitfalls: [
      { wrong: "Le 14 Juillet（一般日期）", right: "le 14 juillet", why: "月份小寫；只有國慶日當節日名稱時寫 le 14 Juillet。" },
      { wrong: "en printemps", right: "au printemps", why: "printemps 以子音開頭，用 au。" },
    ],
    related: ["prepositions-temps", "quantites"],
  },
  {
    id: "phrases-utiles",
    zh: "實用句型",
    fr: "Les phrases utiles",
    blurb: "打招呼、請求、表達意見、同意反對、道歉、邀請的常用句。",
    intro: "這些句型在生活、口說考試和寫信時都很常用。每一類都依禮貌程度由輕鬆排到正式。",
    sections: [
      {
        t: "打招呼與道別",
        ex: [
          ["Salut ! Ça va ? – Ça va bien, et toi ?", "嗨！還好嗎？很好，你呢？"],
          ["Bonjour, comment allez-vous ?", "您好，最近好嗎？"],
          ["À bientôt ! / À demain ! / Bonne journée !", "回頭見！明天見！祝你今天愉快！"],
        ],
      },
      {
        t: "請求與詢問",
        table: {
          head: ["說法", "禮貌程度"],
          rows: [
            ["Tu peux m'aider ?", "朋友之間"],
            ["Pouvez-vous m'aider ?", "一般禮貌"],
            ["Pourriez-vous m'aider, s'il vous plaît ?", "很禮貌"],
            ["Je vous serais reconnaissant(e) de bien vouloir…", "正式書信"],
          ],
          fr: [0],
        },
      },
      {
        t: "表達意見",
        table: {
          head: ["說法", "意思"],
          rows: [
            ["Je pense que… / Je crois que…", "我認為…"],
            ["À mon avis, … / Selon moi, …", "依我看…"],
            ["Je trouve que…", "我覺得…"],
            ["Il me semble que…", "我覺得好像…（委婉）"],
            ["Je suis persuadé(e) que…", "我深信…"],
          ],
          fr: [0],
        },
      },
      {
        t: "同意與反對",
        table: {
          head: ["同意", "反對"],
          rows: [
            ["Je suis d'accord.", "Je ne suis pas d'accord."],
            ["Tout à fait ! / Exactement !", "Pas du tout !"],
            ["Vous avez raison.", "Vous avez tort."],
            ["C'est vrai.", "Je ne pense pas."],
            ["Je partage votre avis.", "Je ne partage pas votre point de vue."],
          ],
          fr: [0, 1],
        },
      },
      {
        t: "道歉與回應",
        ex: [
          ["Pardon ! / Excusez-moi. / Je suis désolé(e).", "抱歉！／不好意思。／我很抱歉。"],
          ["Ce n'est pas grave. / Ne t'inquiète pas.", "沒關係。／別擔心。"],
          ["Merci beaucoup ! – De rien. / Je vous en prie.", "非常感謝！不客氣。"],
        ],
      },
      {
        t: "邀請、接受、拒絕",
        ex: [
          ["Ça te dit d'aller au cinéma ce soir ?", "今晚去看電影好嗎？"],
          ["Avec plaisir ! / Bonne idée !", "很樂意！好主意！"],
          ["C'est gentil, mais je ne suis pas libre.", "你人真好，但我沒空。"],
        ],
      },
      {
        t: "表達感受",
        table: {
          head: ["說法", "意思"],
          rows: [
            ["J'ai envie de + 原形", "我想要…"],
            ["J'ai hâte de + 原形", "我等不及要…"],
            ["Ça me plaît.", "我喜歡。"],
            ["Ça m'est égal.", "我無所謂。"],
            ["J'en ai marre.（口語）", "我受夠了。"],
            ["Ça m'inquiète.", "這讓我擔心。"],
          ],
          fr: [0],
        },
      },
      {
        t: "聽不懂的時候",
        ex: [
          ["Pardon, je n'ai pas compris.", "抱歉，我沒聽懂。"],
          ["Vous pouvez répéter, s'il vous plaît ?", "可以請您再說一次嗎？"],
          ["Comment dit-on « 珍珠奶茶 » en français ?", "「珍珠奶茶」法文怎麼說？"],
          ["Qu'est-ce que ça veut dire ?", "這是什麼意思？"],
        ],
      },
    ],
    related: ["conditionnel", "imperatif", "questions"],
  },
];
