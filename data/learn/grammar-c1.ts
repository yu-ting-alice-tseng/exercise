import type { GrammarNote } from "@/lib/learnTypes";

export const NOTES_C1: GrammarNote[] = [
  {
    id: "futur-anterieur",
    summary: "先未來式＝avoir 或 être 的未來式 + 過去分詞，表示「在未來某個時間點之前已經完成」，也可以表示對過去的推測。",
    rules: [
      {
        t: "形式",
        ex: [
          ["J'**aurai fini** à midi.", "我中午前會做完。"],
          ["Ils **seront partis** avant ton arrivée.", "你到之前他們就已經走了。"],
        ],
      },
      {
        t: "時間子句：先完成的動作",
        d: "quand、lorsque、dès que、aussitôt que、une fois que、après que 後面，先完成的動作用先未來式，主句用簡單未來式。",
        ex: [["**Dès que** j'**aurai reçu** ta lettre, je te répondrai.", "我一收到你的信就會回覆你。"]],
      },
      {
        t: "推測過去",
        d: "相當於「大概是…了吧」。",
        ex: [["Il n'est pas là ; il **aura oublié**.", "他不在，大概是忘了。"]],
      },
    ],
    pitfalls: [{ wrong: "Quand tu as fini, tu m'appelleras.", right: "Quand tu auras fini, tu m'appelleras.", why: "未來先完成的動作要用先未來式。" }],
  },
  {
    id: "accord-participe",
    summary: "過去分詞的配合是法文寫作中最常被扣分的地方。關鍵是：用哪個助動詞、直接受詞在哪裡。",
    rules: [
      {
        t: "三條基本規則",
        table: {
          head: ["情況", "配合對象", "例子"],
          rows: [
            ["être 動詞", "主詞", "Elles sont arrivé**es**."],
            ["avoir 動詞，直接受詞在後", "不配合", "J'ai acheté des pommes."],
            ["avoir 動詞，直接受詞在前", "直接受詞", "Les pommes que j'ai acheté**es**."],
          ],
          fr: [2],
        },
      },
      {
        t: "直接受詞在前的三種情況",
        d: "1. 受詞代名詞 le、la、les、me、te、nous、vous：Je **les** ai vu**s**.\n2. 關係代名詞 que：La lettre **que** j'ai écrit**e**.\n3. 疑問句 quel：**Quelles** villes as-tu visité**es** ?",
      },
      {
        t: "反身動詞",
        d: "看 se 是直接還是間接受詞。se 是直接受詞 → 配合；se 是間接受詞（後面另有直接受詞，或動詞接 à）→ 不配合。",
        ex: [
          ["Elle s'est **lavée**.", "她洗了澡。（se 是直接受詞）"],
          ["Elle s'est **lavé** les mains.", "她洗了手。（直接受詞是 les mains）"],
          ["Ils se sont **parlé**.", "他們互相說了話。（parler à）"],
        ],
      },
      {
        t: "en 在前面不配合",
        ex: [["Des fraises ? J'en ai **mangé**.", "草莓嗎？我吃了一些。"]],
      },
    ],
    pitfalls: [
      { wrong: "Ils se sont téléphonés.", right: "Ils se sont téléphoné.", why: "téléphoner à qqn，se 是間接受詞，不配合。" },
      { wrong: "Les fleurs que j'ai acheté.", right: "Les fleurs que j'ai achetées.", why: "que 代替 les fleurs，直接受詞在前，要配合。" },
    ],
  },
  {
    id: "nominalisation",
    summary: "名詞化是把動詞或形容詞變成名詞，讓文章更精簡、更正式，新聞標題和摘要最常用。",
    rules: [
      {
        t: "常見詞尾",
        table: {
          head: ["詞尾", "動詞 → 名詞"],
          rows: [
            ["-tion / -sion", "créer → la création, décider → la décision"],
            ["-ment", "changer → le changement, développer → le développement"],
            ["-age", "laver → le lavage, passer → le passage"],
            ["-ure", "ouvrir → l'ouverture, fermer → la fermeture"],
            ["-ance / -ence", "naître → la naissance, préférer → la préférence"],
            ["沒有詞尾", "visiter → la visite, choisir → le choix"],
          ],
          fr: [1],
        },
      },
      {
        t: "形容詞 → 名詞",
        d: "beau → la beauté、long → la longueur、gentil → la gentillesse、fort → la force。",
      },
      {
        t: "句子改成標題",
        d: "動詞變名詞、副詞變形容詞、主詞變成 de + 名詞。",
        ex: [
          ["Les prix augmentent fortement. → **Forte hausse** des prix", "物價大幅上漲"],
          ["Le président est arrivé à Paris. → **Arrivée** du président à Paris", "總統抵達巴黎"],
        ],
      },
    ],
    pitfalls: [{ wrong: "Augmentation forte des prix", right: "Forte augmentation des prix", why: "標題中 forte、légère 等形容詞通常放在名詞前。" }],
  },
  {
    id: "prepositions-avancees",
    summary: "介系詞片語讓表達更精準，書面語和正式場合很常用。",
    rules: [
      {
        t: "依意思分類",
        table: {
          head: ["意思", "說法"],
          rows: [
            ["原因", "en raison de, à la suite de, faute de, vu"],
            ["讓步", "en dépit de, malgré"],
            ["方式、手段", "à force de, au moyen de, à l'aide de, grâce à"],
            ["關於", "au sujet de, à propos de, quant à, en ce qui concerne"],
            ["對於", "envers, à l'égard de, vis-à-vis de"],
            ["代替、除外", "au lieu de, à la place de, à part, sauf, hormis"],
            ["根據", "selon, d'après, en fonction de, conformément à"],
          ],
          fr: [1],
        },
      },
      {
        t: "例子",
        ex: [
          ["**En raison des** travaux, la rue est fermée.", "由於施工，這條街封閉。"],
          ["**À force de** travailler, il a réussi.", "靠著不斷努力，他成功了。"],
          ["**Faute de** temps, nous arrêtons ici.", "因為時間不夠，我們到此為止。"],
        ],
      },
      {
        t: "faute de 後面不加冠詞",
        d: "faute de temps、faute d'argent、faute de mieux（沒有更好的選擇）。",
      },
    ],
    pitfalls: [{ wrong: "Faute du temps…", right: "Faute de temps…", why: "faute de + 不加冠詞的名詞。" }],
  },
  {
    id: "conjonctions-subjonctif",
    summary: "有一群連接詞後面一定接虛擬式，主要表示目的、讓步、時間（之前）、條件和否定。",
    rules: [
      {
        t: "完整清單",
        table: {
          head: ["意思", "連接詞"],
          rows: [
            ["目的", "pour que, afin que, de peur que, de crainte que"],
            ["讓步", "bien que, quoique, encore que"],
            ["時間", "avant que, jusqu'à ce que, en attendant que"],
            ["條件", "à condition que, pourvu que, à moins que, pour peu que"],
            ["否定", "sans que, non que"],
          ],
          fr: [1],
        },
      },
      {
        t: "贅詞 ne",
        d: "avant que、à moins que、de peur que、de crainte que 後面，正式語體常加一個沒有否定意思的 ne。",
        ex: [["Partons **avant qu'il ne** pleuve.", "趁還沒下雨我們走吧。"]],
      },
      {
        t: "主詞相同時改用介系詞 + 原形",
        table: {
          head: ["接虛擬式", "主詞相同"],
          rows: [
            ["pour que", "pour"],
            ["avant que", "avant de"],
            ["sans que", "sans"],
            ["à condition que", "à condition de"],
            ["de peur que", "de peur de"],
          ],
          fr: [0, 1],
        },
      },
    ],
    pitfalls: [
      { wrong: "Je partirai avant que je mange.", right: "Je partirai avant de manger.", why: "主詞相同時用 avant de + 原形。" },
      { wrong: "Attends jusqu'à ce qu'il revient.", right: "Attends jusqu'à ce qu'il revienne.", why: "jusqu'à ce que 接虛擬式。" },
    ],
  },
  {
    id: "mise-en-relief",
    summary: "強調句把重點移到句首，像中文的「就是…」。",
    rules: [
      {
        t: "C'est… qui / C'est… que",
        d: "強調主詞用 qui，強調其他成分（受詞、時間、地點）用 que。複數可用 ce sont。",
        ex: [
          ["**C'est** Marie **qui** a gagné.", "是瑪麗贏了。"],
          ["**C'est** en France **que** je l'ai rencontré.", "我是在法國認識他的。"],
        ],
      },
      {
        t: "Ce qui / Ce que / Ce dont…, c'est…",
        table: {
          head: ["說法", "缺的成分", "例子"],
          rows: [
            ["ce qui", "主詞", "Ce qui m'énerve, c'est le bruit."],
            ["ce que", "直接受詞", "Ce que j'aime, c'est la mer."],
            ["ce dont", "de + 名詞", "Ce dont j'ai besoin, c'est de dormir."],
            ["ce à quoi", "à + 名詞", "Ce à quoi je pense, c'est à toi."],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "重讀代名詞的強調",
        ex: [["**Lui**, il ne dit jamais rien.", "他啊，從來什麼都不說。"]],
      },
    ],
    pitfalls: [
      { wrong: "C'est moi qui a raison.", right: "C'est moi qui ai raison.", why: "qui 後面的動詞和 moi 配合。" },
      { wrong: "Ce que j'ai besoin, c'est de repos.", right: "Ce dont j'ai besoin, c'est de repos.", why: "avoir besoin de，所以用 ce dont。" },
    ],
  },
  {
    id: "negation-avancee",
    summary: "進階否定包含 ne…que、ni…ni、aucun、nulle part，以及沒有否定意思的贅詞 ne。",
    rules: [
      {
        t: "進階否定詞",
        table: {
          head: ["說法", "意思", "例子"],
          rows: [
            ["ne…que", "只", "Je n'ai que dix euros."],
            ["ne…ni…ni", "既不…也不", "Il ne boit ni vin ni bière."],
            ["ne…aucun(e)", "沒有任何", "Je n'ai aucune idée."],
            ["ne…nulle part", "哪裡都沒有", "Je ne le trouve nulle part."],
            ["ne…guère", "幾乎不（書面）", "Il ne sort guère."],
            ["ne…point", "絕不（文學）", "Je ne l'ai point vu."],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "主詞位置的否定",
        ex: [
          ["**Personne n'**est venu.", "沒有人來。"],
          ["**Rien ne** marche.", "什麼都不順。"],
        ],
      },
      {
        t: "原形動詞的否定",
        d: "ne pas、ne plus、ne jamais、ne rien 放在原形動詞前；ne personne 例外：ne voir personne。",
        ex: [["Il m'a dit de **ne pas** m'inquiéter.", "他叫我別擔心。"]],
      },
      {
        t: "贅詞 ne（沒有否定意思）",
        d: "出現在 craindre que、avoir peur que、avant que、à moins que，以及比較句 plus… que 的後面。",
        ex: [["Il est plus tard que je **ne** pensais.", "比我想的還晚。"]],
      },
    ],
    pitfalls: [
      { wrong: "Personne n'est pas venu.", right: "Personne n'est venu.", why: "personne、rien、aucun 已經是否定，不能再加 pas。" },
      { wrong: "Je n'ai pas que dix euros.", right: "Je n'ai que dix euros.", why: "ne…que 是「只」，不用 pas。" },
    ],
  },
  {
    id: "hypothese-avancee",
    summary: "除了 si 以外，還有很多表達假設和條件的方式，各自搭配不同的語式。",
    rules: [
      {
        t: "依語式分類",
        table: {
          head: ["接什麼", "說法", "意思"],
          rows: [
            ["條件式", "au cas où, dans le cas où", "萬一"],
            ["條件式", "quand bien même", "即使（強調）"],
            ["虛擬式", "à condition que, pourvu que", "只要"],
            ["虛擬式", "à supposer que, en admettant que, supposons que", "假設"],
            ["虛擬式", "à moins que (ne)", "除非"],
            ["名詞", "en cas de, sans, avec", "萬一有…／如果沒有…"],
            ["原形動詞", "à condition de, à moins de", "只要／除非"],
          ],
          fr: [1],
        },
      },
      {
        t: "例子",
        ex: [
          ["**Au cas où** tu **aurais** faim, il y a du pain.", "萬一你餓了，有麵包。"],
          ["**À supposer qu'**il **accepte**, qui paiera ?", "假設他同意，誰來付錢？"],
          ["**Sans** ton aide, j'aurais échoué.", "沒有你的幫忙，我會失敗。"],
        ],
      },
    ],
    pitfalls: [{ wrong: "Au cas où il pleut, on annule.", right: "Au cas où il pleuvrait, on annule.", why: "au cas où 接條件式。" }],
  },
  {
    id: "argumentation",
    summary: "論證文需要表達觀點、舉例、讓步和下結論。用對連接詞，文章就有說服力。",
    rules: [
      {
        t: "表達觀點",
        table: {
          head: ["說法", "語氣"],
          rows: [
            ["À mon avis, Selon moi, D'après moi", "中性"],
            ["Je suis convaincu(e) que", "堅定"],
            ["Il me semble que", "委婉"],
            ["Force est de constater que", "正式：不得不承認"],
          ],
          fr: [0],
        },
      },
      {
        t: "論證步驟",
        table: {
          head: ["功能", "說法"],
          rows: [
            ["提出論點", "Tout d'abord, En premier lieu"],
            ["加強", "De plus, En outre, D'ailleurs, Qui plus est"],
            ["舉例", "Par exemple, Notamment, Prenons l'exemple de"],
            ["讓步", "Certes… mais, Il est vrai que… toutefois"],
            ["反駁", "Contrairement à ce qu'on pense, Or"],
            ["結論", "En définitive, En somme, Somme toute"],
          ],
          fr: [1],
        },
      },
      {
        t: "or：推論中的轉折",
        d: "or 用來帶出一個關鍵事實，讓推論往下走，接近「而、可是」。",
        ex: [["Il faut un diplôme ; **or**, il n'en a pas.", "需要文憑，而他沒有。"]],
      },
    ],
    pitfalls: [{ wrong: "Selon moi, je pense que…", right: "Selon moi, … / Je pense que…", why: "selon moi 和 je pense que 意思重複，選一個就好。" }],
  },
];
