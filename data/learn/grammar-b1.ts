import type { GrammarNote } from "@/lib/learnTypes";

export const NOTES_B1: GrammarNote[] = [
  {
    id: "futur-simple",
    summary: "簡單未來式用來說未來的事、預測和承諾。規則動詞以原形為詞幹，加上 avoir 現在式的詞尾。",
    rules: [
      {
        t: "詞尾",
        table: {
          head: ["人稱", "詞尾", "parler", "finir", "prendre"],
          rows: [
            ["je", "-ai", "parler**ai**", "finir**ai**", "prendr**ai**"],
            ["tu", "-as", "parler**as**", "finir**as**", "prendr**as**"],
            ["il / elle", "-a", "parler**a**", "finir**a**", "prendr**a**"],
            ["nous", "-ons", "parler**ons**", "finir**ons**", "prendr**ons**"],
            ["vous", "-ez", "parler**ez**", "finir**ez**", "prendr**ez**"],
            ["ils / elles", "-ont", "parler**ont**", "finir**ont**", "prendr**ont**"],
          ],
          fr: [0, 1, 2, 3, 4],
        },
        d: "-re 動詞去掉最後的 -e：prendre → prendr-。",
      },
      {
        t: "不規則詞幹",
        table: {
          head: ["原形", "詞幹", "原形", "詞幹"],
          rows: [
            ["être", "ser-", "avoir", "aur-"],
            ["aller", "ir-", "faire", "fer-"],
            ["venir", "viendr-", "voir", "verr-"],
            ["pouvoir", "pourr-", "vouloir", "voudr-"],
            ["devoir", "devr-", "savoir", "saur-"],
            ["falloir", "faudr-", "envoyer", "enverr-"],
          ],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "quand 後面也用未來式",
        d: "中文說「等我到的時候」，法文 quand、lorsque、dès que 後面講未來，要用未來式。",
        ex: [["**Quand** je **serai** grand, je **serai** pilote.", "我長大以後要當飛行員。"]],
      },
    ],
    pitfalls: [
      { wrong: "Quand je suis à Paris, je t'appellerai.", right: "Quand je serai à Paris, je t'appellerai.", why: "quand 引導未來的事，也要用未來式。" },
      { wrong: "Si il pleuvra, je resterai.", right: "S'il pleut, je resterai.", why: "si 後面不能用未來式，用現在式。" },
    ],
  },
  {
    id: "conditionnel",
    summary: "條件式現在式＝未來式的詞幹 + 未完成過去式的詞尾。用來表示禮貌、願望、建議和假設的結果。",
    rules: [
      {
        t: "形式",
        table: {
          head: ["人稱", "詞尾", "aimer", "pouvoir"],
          rows: [
            ["je", "-ais", "aimer**ais**", "pourr**ais**"],
            ["tu", "-ais", "aimer**ais**", "pourr**ais**"],
            ["il / elle", "-ait", "aimer**ait**", "pourr**ait**"],
            ["nous", "-ions", "aimer**ions**", "pourr**ions**"],
            ["vous", "-iez", "aimer**iez**", "pourr**iez**"],
            ["ils / elles", "-aient", "aimer**aient**", "pourr**aient**"],
          ],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "四種用法",
        d: "1. 禮貌：Je voudrais…、Pourriez-vous… ?\n2. 願望：J'aimerais voyager.\n3. 建議：Tu devrais dormir.\n4. 假設的結果：Si j'avais le temps, je viendrais.",
        ex: [
          ["Je **voudrais** un café, s'il vous plaît.", "我想要一杯咖啡，麻煩了。"],
          ["Tu **devrais** voir un médecin.", "你應該去看醫生。"],
        ],
      },
      {
        t: "和未來式的發音差別",
        d: "je parlerai（未來式，念 -ré）和 je parlerais（條件式，念 -rè）只差一個字母，聽和寫都要小心。",
      },
    ],
    pitfalls: [{ wrong: "Je voudrai un café.", right: "Je voudrais un café.", why: "點餐的禮貌說法是條件式 voudrais。" }],
  },
  {
    id: "plus-que-parfait",
    summary: "愈過去式＝avoir 或 être 的未完成過去式 + 過去分詞，表示「過去的某件事之前，已經發生的事」。",
    rules: [
      {
        t: "形式",
        ex: [
          ["J'**avais fini**.", "我（那時）已經做完了。"],
          ["Elle **était partie**.", "她（那時）已經走了。"],
        ],
      },
      {
        t: "時間軸",
        d: "愈過去式 → 複合過去式／未完成過去式 → 現在。",
        ex: [["Quand je suis arrivé, le film **avait** déjà **commencé**.", "我到的時候，電影已經開始了。"]],
      },
      {
        t: "其他用法",
        d: "1. 表達遺憾：Si j'avais su !（早知道就好了！）\n2. si 條件句的第三類（和過去事實相反）。\n3. 間接引語中，複合過去式變成愈過去式。",
      },
    ],
    pitfalls: [{ wrong: "Quand je suis arrivé, il est déjà parti.", right: "Quand je suis arrivé, il était déjà parti.", why: "比「我到」更早發生的事，用愈過去式。" }],
  },
  {
    id: "subjonctif",
    summary: "虛擬式用在表達意願、情感、必要、懷疑的句子裡，通常出現在 que 後面的子句。",
    rules: [
      {
        t: "規則變化",
        d: "用 ils 的現在式去掉 -ent，加上詞尾 -e、-es、-e、-ions、-iez、-ent。",
        table: {
          head: ["人稱", "parler（ils parlent）", "finir（ils finissent）", "partir（ils partent）"],
          rows: [
            ["que je", "parl**e**", "finiss**e**", "part**e**"],
            ["que tu", "parl**es**", "finiss**es**", "part**es**"],
            ["qu'il", "parl**e**", "finiss**e**", "part**e**"],
            ["que nous", "parl**ions**", "finiss**ions**", "part**ions**"],
            ["que vous", "parl**iez**", "finiss**iez**", "part**iez**"],
            ["qu'ils", "parl**ent**", "finiss**ent**", "part**ent**"],
          ],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "常見不規則",
        table: {
          head: ["原形", "que je", "que nous"],
          rows: [
            ["être", "sois", "soyons"],
            ["avoir", "aie", "ayons"],
            ["aller", "aille", "allions"],
            ["faire", "fasse", "fassions"],
            ["pouvoir", "puisse", "puissions"],
            ["savoir", "sache", "sachions"],
            ["vouloir", "veuille", "voulions"],
          ],
          fr: [0, 1, 2],
        },
      },
      {
        t: "什麼時候用",
        d: "意願：vouloir que、souhaiter que、aimer que\n情感：être content que、avoir peur que、regretter que\n必要：il faut que、il est important que\n懷疑：douter que、ne pas penser que\n連接詞：pour que、bien que、avant que、sans que",
        ex: [
          ["**Il faut que** tu **viennes**.", "你一定要來。"],
          ["Je suis content **que** tu **sois** là.", "很高興你在這裡。"],
        ],
      },
      {
        t: "主詞相同時用原形動詞",
        ex: [["Je veux **partir**.（不是 Je veux que je parte.）", "我想走。"]],
      },
    ],
    pitfalls: [
      { wrong: "Il faut que tu fais tes devoirs.", right: "Il faut que tu fasses tes devoirs.", why: "il faut que 後面一定用虛擬式。" },
      { wrong: "J'espère que tu sois bien.", right: "J'espère que tu vas bien.", why: "espérer que 後面用直陳式，不用虛擬式。" },
    ],
  },
  {
    id: "passif",
    summary: "被動語態＝être + 過去分詞（配合主詞），執行動作的人用 par 帶出。",
    rules: [
      {
        t: "主動變被動",
        ex: [
          ["Le chat mange la souris. → La souris **est mangée par** le chat.", "老鼠被貓吃了。"],
        ],
      },
      {
        t: "時態由 être 決定",
        table: {
          head: ["時態", "例子"],
          rows: [
            ["現在式", "La maison **est construite**."],
            ["複合過去式", "La maison **a été construite**."],
            ["未完成過去式", "La maison **était construite**."],
            ["未來式", "La maison **sera construite**."],
          ],
          fr: [1],
        },
      },
      {
        t: "par 還是 de",
        d: "表示狀態或情感的動詞常用 de：être aimé de tous、être couvert de neige、être entouré d'amis。",
      },
      {
        t: "口語常用 on 代替被動",
        ex: [["**On** a volé mon vélo.", "我的腳踏車被偷了。"]],
      },
    ],
    pitfalls: [{ wrong: "Les lettres sont écrit par Marie.", right: "Les lettres sont écrites par Marie.", why: "被動語態的過去分詞要配合主詞。" }],
  },
  {
    id: "place-pronoms",
    summary: "受詞代名詞的位置看動詞的形式：一般放在變化的動詞前，有原形動詞時放在原形前，肯定命令式放在後面。",
    rules: [
      {
        t: "四種位置",
        table: {
          head: ["情況", "位置", "例子"],
          rows: [
            ["簡單時態", "動詞前", "Je **le** vois."],
            ["複合時態", "助動詞前", "Je **l'**ai vu."],
            ["動詞 + 原形", "原形動詞前", "Je vais **le** voir."],
            ["肯定命令", "動詞後，加連字號", "Regarde-**le** !"],
          ],
          fr: [2],
        },
      },
      {
        t: "否定句",
        d: "ne 放在代名詞前面，pas 放在變化的動詞後面。",
        ex: [
          ["Je **ne le** vois **pas**.", "我沒看到他。"],
          ["Je **ne l'**ai **pas** vu.", "我沒看到他。"],
        ],
      },
      {
        t: "複合時態的配合",
        d: "直接受詞代名詞放在 avoir 前面時，過去分詞要配合它。",
        ex: [["Ces photos ? Je **les** ai pris**es**.", "這些照片嗎？是我拍的。"]],
      },
    ],
    pitfalls: [
      { wrong: "Je le vais voir.", right: "Je vais le voir.", why: "代名詞放在它所屬的原形動詞前面。" },
      { wrong: "Je n'ai le pas vu.", right: "Je ne l'ai pas vu.", why: "ne + 代名詞 + 助動詞 + pas。" },
    ],
  },
  {
    id: "relatifs",
    summary: "關係代名詞用來連接兩個句子，替代前面提過的名詞。選哪一個要看它在子句裡的角色。",
    rules: [
      {
        t: "四個簡單關係代名詞",
        table: {
          head: ["代名詞", "角色", "例子"],
          rows: [
            ["qui", "主詞", "L'homme **qui** parle est mon père."],
            ["que", "直接受詞", "Le livre **que** je lis est bon."],
            ["où", "地點、時間", "La ville **où** j'habite. / Le jour **où** il est né."],
            ["dont", "代替 de + 名詞", "Le film **dont** je parle."],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "怎麼選",
        d: "看子句缺什麼：缺主詞用 qui；缺受詞用 que；缺地點或時間用 où；動詞要接 de（parler de、avoir besoin de、être fier de）用 dont。",
        ex: [["C'est l'outil **dont** j'ai besoin.", "這是我需要的工具。（avoir besoin de）"]],
      },
      {
        t: "ce qui、ce que、ce dont",
        d: "沒有先行詞時，用 ce 代替「…的東西」。",
        ex: [["Dis-moi **ce que** tu veux.", "告訴我你想要什麼。"]],
      },
    ],
    pitfalls: [
      { wrong: "Le livre qui je lis", right: "Le livre que je lis", why: "je 已經是主詞，缺的是受詞，用 que。" },
      { wrong: "Le film que je parle", right: "Le film dont je parle", why: "parler de qqch，所以用 dont。" },
    ],
  },
  {
    id: "pronoms-demonstratifs",
    summary: "指示代名詞代替前面提過的名詞，意思是「這個、那個、…的那個」。",
    rules: [
      {
        t: "形式",
        table: {
          head: ["陽性單數", "陰性單數", "陽性複數", "陰性複數"],
          rows: [["celui", "celle", "ceux", "celles"]],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "後面一定要接東西",
        d: "-ci／-là、de + 名詞、或關係子句（qui、que、dont）。",
        ex: [
          ["Quel pull ? **Celui-ci** ou **celui-là** ?", "哪件毛衣？這件還是那件？"],
          ["Ma voiture et **celle de** mon frère.", "我的車和我哥哥的（車）。"],
          ["**Ceux qui** veulent venir sont les bienvenus.", "想來的人都歡迎。"],
        ],
      },
      {
        t: "中性的 ce、ceci、cela、ça",
        d: "代替一件事或一個想法，不代替特定的名詞。ça 是口語，cela 是書面語。",
      },
    ],
    pitfalls: [{ wrong: "Ma voiture et celle mon frère.", right: "Ma voiture et celle de mon frère.", why: "celui、celle 後面不能直接接名詞。" }],
  },
  {
    id: "pronoms-possessifs",
    summary: "所有格代名詞＝「我的那個、你的那個」，和被代替的名詞配合，前面一定有定冠詞。",
    rules: [
      {
        t: "形式",
        table: {
          head: ["擁有者", "陽單", "陰單", "陽複", "陰複"],
          rows: [
            ["je", "le mien", "la mienne", "les miens", "les miennes"],
            ["tu", "le tien", "la tienne", "les tiens", "les tiennes"],
            ["il / elle", "le sien", "la sienne", "les siens", "les siennes"],
            ["nous", "le nôtre", "la nôtre", "les nôtres", "les nôtres"],
            ["vous", "le vôtre", "la vôtre", "les vôtres", "les vôtres"],
            ["ils / elles", "le leur", "la leur", "les leurs", "les leurs"],
          ],
          fr: [0, 1, 2, 3, 4],
        },
      },
      {
        t: "例子",
        ex: [
          ["Ce n'est pas ton stylo, c'est **le mien**.", "這不是你的筆，是我的。"],
          ["Ta maison est grande ; **la nôtre** est petite.", "你家很大，我們家很小。"],
        ],
      },
      {
        t: "和 à、de 合寫",
        ex: [["Je pense à mes parents et toi **aux tiens**.", "我想我的父母，你想你的。"]],
      },
    ],
    pitfalls: [
      { wrong: "C'est mien.", right: "C'est le mien. / C'est à moi.", why: "所有格代名詞要有定冠詞；也可以說 c'est à moi。" },
      { wrong: "la notre", right: "la nôtre", why: "代名詞的 nôtre、vôtre 有長音符號；形容詞 notre、votre 沒有。" },
    ],
  },
  {
    id: "pronoms-interrogatifs",
    summary: "疑問代名詞問「誰」和「什麼」，還有 lequel（哪一個）。",
    rules: [
      {
        t: "問人和問事",
        table: {
          head: ["", "問人（誰）", "問事（什麼）"],
          rows: [
            ["主詞", "Qui / Qui est-ce qui", "Qu'est-ce qui"],
            ["受詞", "Qui / Qui est-ce que", "Que / Qu'est-ce que"],
            ["介系詞後", "à qui, avec qui", "à quoi, de quoi"],
          ],
          fr: [1, 2],
        },
      },
      {
        t: "例子",
        ex: [
          ["**Qu'est-ce qui** se passe ?", "發生什麼事？（主詞）"],
          ["**Qu'est-ce que** tu fais ?", "你在做什麼？（受詞）"],
          ["**À quoi** tu penses ?", "你在想什麼？"],
        ],
      },
      {
        t: "lequel：在幾個選項中問哪一個",
        table: {
          head: ["陽單", "陰單", "陽複", "陰複"],
          rows: [["lequel", "laquelle", "lesquels", "lesquelles"]],
          fr: [0, 1, 2, 3],
        },
        ex: [["Il y a deux robes. **Laquelle** préfères-tu ?", "有兩件洋裝，你比較喜歡哪一件？"]],
      },
    ],
    pitfalls: [{ wrong: "Qu'est-ce que se passe ?", right: "Qu'est-ce qui se passe ?", why: "se passe 缺主詞，要用 qu'est-ce qui。" }],
  },
  {
    id: "indefinis",
    summary: "不定詞表示不確定的數量或人事物：每一個、某些、全部、什麼都不…",
    rules: [
      {
        t: "常見不定形容詞與代名詞",
        table: {
          head: ["形容詞（+ 名詞）", "代名詞", "意思"],
          rows: [
            ["chaque jour", "chacun / chacune", "每一個"],
            ["quelques amis", "quelques-uns / quelques-unes", "幾個"],
            ["plusieurs fois", "plusieurs", "好幾個"],
            ["tout le monde, tous les jours", "tout / tous / toutes", "全部"],
            ["aucun problème", "aucun / aucune", "沒有任何"],
            ["certains élèves", "certains / certaines", "某些"],
          ],
          fr: [0, 1],
        },
      },
      {
        t: "quelqu'un、quelque chose、personne、rien",
        ex: [
          ["**Quelqu'un** a appelé ?", "有人打電話來嗎？"],
          ["Je n'ai vu **personne**.", "我誰都沒看到。"],
          ["Tu veux **quelque chose** ? – Non, **rien**.", "你要什麼嗎？不，什麼都不要。"],
        ],
      },
      {
        t: "tout 的變化",
        table: {
          head: ["陽單", "陰單", "陽複", "陰複"],
          rows: [["tout le temps", "toute la journée", "tous les jours", "toutes les semaines"]],
          fr: [0, 1, 2, 3],
        },
      },
    ],
    pitfalls: [
      { wrong: "chaques jours", right: "chaque jour", why: "chaque 只有單數。" },
      { wrong: "Je veux manger quelque chose bon.", right: "Je veux manger quelque chose de bon.", why: "quelque chose、rien 後面接形容詞時要加 de。" },
    ],
  },
  {
    id: "si-hypothese",
    summary: "si 條件句有三種，時態搭配是固定的。si 後面永遠不用未來式和條件式。",
    rules: [
      {
        t: "三種條件句",
        table: {
          head: ["類型", "si 子句", "主句", "例子"],
          rows: [
            ["可能發生", "現在式", "未來式／現在式／命令式", "S'il pleut, je resterai."],
            ["與現在事實相反", "未完成過去式", "條件式現在式", "Si j'étais riche, je voyagerais."],
            ["與過去事實相反", "愈過去式", "條件式過去式", "Si j'avais su, je serais venu."],
          ],
          fr: [3],
        },
      },
      {
        t: "si 遇到 il、ils 要縮寫",
        d: "si + il → s'il；si + ils → s'ils；但 si elle 不縮寫。",
      },
      {
        t: "混合用法",
        d: "過去的條件影響現在：Si j'avais étudié, j'aurais mon diplôme maintenant.（如果當初有讀書，現在就有文憑了。）",
      },
    ],
    pitfalls: [
      { wrong: "Si j'aurais le temps, je viendrais.", right: "Si j'avais le temps, je viendrais.", why: "si 後面不能用條件式。" },
      { wrong: "Si il fait beau…", right: "S'il fait beau…", why: "si 和 il 要縮寫。" },
    ],
    tip: "口訣：si 不跟 -rais 一起出現（Les « si » n'aiment pas les « -rais »）。",
  },
  {
    id: "cause-consequence",
    summary: "表達原因和結果有很多說法，差別在語氣、位置和後面接名詞還是句子。",
    rules: [
      {
        t: "原因",
        table: {
          head: ["說法", "後面接", "說明"],
          rows: [
            ["parce que", "句子", "回答 pourquoi，最常用"],
            ["car", "句子", "書面語，不能放句首"],
            ["comme", "句子", "放句首，先說原因"],
            ["puisque", "句子", "對方也知道的原因"],
            ["grâce à", "名詞", "正面的原因"],
            ["à cause de", "名詞", "負面的原因"],
          ],
          fr: [0],
        },
        ex: [
          ["**Comme** il pleuvait, nous sommes restés.", "因為下雨，我們就待著了。"],
          ["J'ai réussi **grâce à** toi.", "多虧有你我才成功。"],
        ],
      },
      {
        t: "結果",
        table: {
          head: ["說法", "意思"],
          rows: [
            ["donc", "所以"],
            ["alors", "所以（口語）"],
            ["c'est pourquoi", "這就是為什麼"],
            ["par conséquent", "因此（正式）"],
            ["si bien que", "以至於"],
            ["tellement…que", "如此…以至於"],
          ],
          fr: [0],
        },
        ex: [["Il était **tellement** fatigué **qu'**il s'est endormi.", "他累到睡著了。"]],
      },
    ],
    pitfalls: [
      { wrong: "Car il pleut, je reste.", right: "Comme il pleut, je reste.", why: "car 不能放句首，句首用 comme。" },
      { wrong: "à cause de toi, j'ai réussi", right: "grâce à toi, j'ai réussi", why: "好的結果用 grâce à。" },
    ],
  },
];
