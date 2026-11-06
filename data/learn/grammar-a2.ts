import type { GrammarNote } from "@/lib/learnTypes";

export const NOTES_A2: GrammarNote[] = [
  {
    id: "passe-compose",
    summary: "複合過去式＝助動詞 avoir 或 être 的現在式 + 過去分詞，用來說過去已經完成的事。",
    rules: [
      {
        t: "過去分詞",
        table: {
          head: ["動詞類型", "原形", "過去分詞"],
          rows: [
            ["-er", "parler", "parl**é**"],
            ["-ir（多數）", "finir", "fin**i**"],
            ["-re（多數）", "attendre", "attend**u**"],
            ["不規則", "faire, prendre, voir, avoir, être", "fait, pris, vu, eu, été"],
          ],
          fr: [1, 2],
        },
      },
      {
        t: "大部分動詞用 avoir",
        ex: [
          ["J'**ai mangé** une crêpe.", "我吃了一份可麗餅。"],
          ["Nous **avons vu** ce film.", "我們看過這部電影。"],
        ],
      },
      {
        t: "這些動詞用 être，而且過去分詞要配合主詞",
        d: "表示移動或狀態改變的 14 個動詞：aller、venir、arriver、partir、entrer、sortir、monter、descendre、naître、mourir、rester、tomber、retourner、passer（經過），以及它們的衍生字（revenir、devenir、rentrer）。所有反身動詞也用 être。",
        ex: [
          ["Elle **est allée** à Paris.", "她去了巴黎。"],
          ["Ils **sont arrivés** hier.", "他們昨天到了。"],
        ],
      },
      {
        t: "否定：ne…pas 夾住助動詞",
        ex: [["Je **n'ai pas** compris.", "我沒聽懂。"]],
      },
    ],
    pitfalls: [
      { wrong: "J'ai allé au cinéma.", right: "Je suis allé au cinéma.", why: "aller 用 être 當助動詞。" },
      { wrong: "Elle est parti.", right: "Elle est partie.", why: "用 être 時，過去分詞要配合主詞的陰陽性和單複數。" },
    ],
    tip: "用 être 的動詞可以想像成「一棟房子」：進來、出去、上樓、下樓、出生、死亡、留下、跌倒…",
  },
  {
    id: "imparfait",
    summary: "未完成過去式用來描述過去的背景、狀態和習慣，像是電影裡的「布景」。",
    rules: [
      {
        t: "變化方式",
        d: "用現在式 nous 的形式去掉 -ons，加上詞尾。唯一例外：être → ét-。",
        table: {
          head: ["人稱", "詞尾", "parler（nous parlons）", "être"],
          rows: [
            ["je", "-ais", "parl**ais**", "ét**ais**"],
            ["tu", "-ais", "parl**ais**", "ét**ais**"],
            ["il / elle", "-ait", "parl**ait**", "ét**ait**"],
            ["nous", "-ions", "parl**ions**", "ét**ions**"],
            ["vous", "-iez", "parl**iez**", "ét**iez**"],
            ["ils / elles", "-aient", "parl**aient**", "ét**aient**"],
          ],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "三種用法",
        d: "1. 描述：天氣、外表、心情。\n2. 過去的習慣：以前常常…\n3. 正在進行的背景動作，被另一個動作打斷。",
        ex: [
          ["Il **faisait** beau et j'**étais** content.", "天氣很好，我很開心。"],
          ["Quand j'**étais** petit, je **jouais** au foot.", "我小時候常踢足球。"],
          ["Je **dormais** quand le téléphone a sonné.", "電話響的時候我正在睡覺。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "Hier, il a fait beau et j'ai été content toute la journée.", right: "Hier, il faisait beau et j'étais content toute la journée.", why: "描述天氣與心情等背景，通常用未完成過去式。" },
    ],
    tip: "未完成過去式是「布景」，複合過去式是「事件」。",
  },
  {
    id: "pronominaux",
    summary: "反身動詞多了一個代名詞（me、te、se…），表示動作回到自己身上或互相。",
    rules: [
      {
        t: "現在式",
        table: {
          head: ["人稱", "se lever"],
          rows: [
            ["je", "**me** lève"],
            ["tu", "**te** lèves"],
            ["il / elle", "**se** lève"],
            ["nous", "**nous** levons"],
            ["vous", "**vous** levez"],
            ["ils / elles", "**se** lèvent"],
          ],
          fr: [0, 1],
        },
      },
      {
        t: "常見反身動詞",
        d: "se réveiller（醒）、se lever（起床）、se laver（洗澡）、s'habiller（穿衣）、se coucher（睡覺）、s'appeler（叫做）、se promener（散步）、se dépêcher（趕快）。",
      },
      {
        t: "複合過去式用 être",
        ex: [["Elle **s'est levée** à sept heures.", "她七點起床。"]],
      },
      {
        t: "否定與命令",
        ex: [
          ["Je **ne me** couche **pas** tard.", "我不晚睡。"],
          ["Dépêche-**toi** ! / Ne **te** dépêche pas.", "快一點！／別急。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "Je lève à 7 heures.", right: "Je me lève à 7 heures.", why: "「起床」是反身動詞 se lever。" },
      { wrong: "Il s'a couché.", right: "Il s'est couché.", why: "反身動詞的複合過去式用 être。" },
    ],
  },
  {
    id: "imperatif",
    summary: "命令式用來下指令、建議或邀請，只有 tu、nous、vous 三種形式，而且不寫主詞。",
    rules: [
      {
        t: "形式",
        table: {
          head: ["", "parler", "finir", "aller"],
          rows: [
            ["tu", "parle", "finis", "va"],
            ["nous", "parlons", "finissons", "allons"],
            ["vous", "parlez", "finissez", "allez"],
          ],
          fr: [1, 2, 3],
        },
      },
      {
        t: "-er 動詞的 tu 形式去掉 -s",
        d: "tu parles → Parle !（後面接 y 或 en 時保留 -s：Vas-y !）",
      },
      {
        t: "不規則",
        table: {
          head: ["", "être", "avoir", "savoir"],
          rows: [
            ["tu", "sois", "aie", "sache"],
            ["nous", "soyons", "ayons", "sachons"],
            ["vous", "soyez", "ayez", "sachez"],
          ],
          fr: [1, 2, 3],
        },
      },
      {
        t: "代名詞的位置",
        d: "肯定：放在動詞後面加連字號，me 變 moi。否定：放在動詞前面。",
        ex: [
          ["Regarde-**moi** !", "看著我！"],
          ["Ne **me** regarde pas !", "別看我！"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "Manges !", right: "Mange !", why: "-er 動詞的 tu 命令式不加 -s。" },
      { wrong: "Sois pas en retard !", right: "Ne sois pas en retard !", why: "寫作時否定命令要保留 ne。" },
    ],
  },
  {
    id: "passe-recent",
    summary: "近過去式＝venir de + 原形動詞，表示「剛剛做完」。",
    rules: [
      {
        t: "venir 現在式",
        table: {
          head: ["je", "tu", "il / elle", "nous", "vous", "ils / elles"],
          rows: [["viens", "viens", "vient", "venons", "venez", "viennent"]],
          fr: [0, 1, 2, 3, 4, 5],
        },
      },
      {
        t: "句型",
        ex: [
          ["Je **viens de** manger.", "我剛吃過。"],
          ["Le train **vient d'**arriver.", "火車剛到。"],
        ],
      },
      {
        t: "和近未來式對照",
        table: {
          head: ["時間", "句型", "例子"],
          rows: [
            ["剛剛", "venir de + 原形", "Il vient de partir."],
            ["正在", "être en train de + 原形", "Il est en train de partir."],
            ["快要", "aller + 原形", "Il va partir."],
          ],
          fr: [1, 2],
        },
      },
    ],
    pitfalls: [{ wrong: "Je viens manger.", right: "Je viens de manger.", why: "少了 de 意思會變成「我來吃飯」。" }],
  },
  {
    id: "cod-coi",
    summary: "受詞代名詞放在動詞前面，用來避免重複。直接受詞（COD）不用介系詞，間接受詞（COI）是 à + 人。",
    rules: [
      {
        t: "形式",
        table: {
          head: ["", "me", "te", "他／她", "nous", "vous", "他們"],
          rows: [
            ["直接受詞 COD", "me", "te", "le / la", "nous", "vous", "les"],
            ["間接受詞 COI", "me", "te", "lui", "nous", "vous", "leur"],
          ],
          fr: [1, 2, 3, 4, 5, 6],
        },
      },
      {
        t: "怎麼判斷",
        d: "動詞後面直接接受詞 → COD（voir qqn、aimer qqch）。\n動詞後面是 à + 人 → COI（parler à qqn、téléphoner à qqn、donner qqch à qqn）。",
        ex: [
          ["Tu vois Marie ? – Oui, je **la** vois.", "你看到瑪麗了嗎？看到了。"],
          ["Tu parles à Marie ? – Oui, je **lui** parle.", "你跟瑪麗說話嗎？對，我跟她說話。"],
        ],
      },
      {
        t: "位置",
        d: "放在變化的動詞前；有原形動詞時放在原形動詞前；複合過去式放在助動詞前。",
        ex: [
          ["Je vais **le** faire.", "我會去做。"],
          ["Je **l'**ai acheté hier.", "我昨天買了。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "Je le téléphone.", right: "Je lui téléphone.", why: "téléphoner à qqn，所以用間接受詞 lui。" },
      { wrong: "Je vois la.", right: "Je la vois.", why: "受詞代名詞放在動詞前面。" },
    ],
  },
  {
    id: "y-en",
    summary: "y 代替「à + 東西」或地點；en 代替「de + 東西」或有數量的名詞。",
    rules: [
      {
        t: "y：那裡、對那件事",
        ex: [
          ["Tu vas à Paris ? – Oui, j'**y** vais.", "你要去巴黎嗎？對，我要去。"],
          ["Tu penses à ton examen ? – Oui, j'**y** pense.", "你在想考試的事嗎？對。"],
        ],
      },
      {
        t: "en：一些、關於那件事",
        d: "代替部分冠詞或不定冠詞的名詞、有數量的名詞、以及 de + 東西。",
        ex: [
          ["Tu veux du pain ? – Oui, j'**en** veux.", "你要麵包嗎？要。"],
          ["Tu as combien d'enfants ? – J'**en** ai trois.", "你有幾個小孩？三個。"],
          ["Il parle de son voyage ? – Oui, il **en** parle.", "他在談他的旅行嗎？對。"],
        ],
      },
      {
        t: "指人的時候不用 y 和 en",
        d: "penser à qqn → penser à lui；parler de qqn → parler de lui。",
        ex: [["Je pense à ma mère. → Je pense à **elle**.", "我在想我媽媽。"]],
      },
    ],
    pitfalls: [
      { wrong: "Tu as un vélo ? – Oui, j'ai un.", right: "Oui, j'en ai un.", why: "回答數量時要保留 en。" },
      { wrong: "Je y vais.", right: "J'y vais.", why: "je 遇到 y 要縮寫。" },
    ],
  },
  {
    id: "adverbes",
    summary: "很多副詞是從形容詞的陰性加 -ment 變來的，相當於中文的「…地」。",
    rules: [
      {
        t: "變化規則",
        table: {
          head: ["規則", "形容詞", "副詞"],
          rows: [
            ["陰性 + -ment", "lent → lente", "lente**ment**"],
            ["母音結尾直接加", "vrai, poli", "vrai**ment**, poli**ment**"],
            ["-ant → -amment", "courant", "cour**amment**"],
            ["-ent → -emment", "évident", "évid**emment**"],
            ["不規則", "bon, mauvais, gentil", "bien, mal, gentiment"],
          ],
          fr: [1, 2],
        },
      },
      {
        t: "位置",
        d: "通常放在變化的動詞後面；複合時態中，短副詞放在助動詞和過去分詞中間。",
        ex: [
          ["Il parle **lentement**.", "他說得很慢。"],
          ["J'ai **bien** dormi.", "我睡得很好。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "Il parle bon français.", right: "Il parle bien français.", why: "修飾動詞要用副詞 bien。" },
      { wrong: "évidentment", right: "évidemment", why: "-ent 結尾的形容詞變成 -emment。" },
    ],
  },
  {
    id: "prepositions-temps",
    summary: "depuis、il y a、pendant、dans、en 都和時間有關，但意思差很多。",
    rules: [
      {
        t: "對照表",
        table: {
          head: ["介系詞", "意思", "時態", "例子"],
          rows: [
            ["depuis", "從…以來（持續到現在）", "現在式", "J'habite ici depuis 2020."],
            ["il y a", "…以前", "過去式", "Je suis arrivé il y a deux jours."],
            ["pendant", "在…期間", "各種時態", "J'ai dormi pendant huit heures."],
            ["dans", "…之後（未來）", "未來", "Je pars dans dix minutes."],
            ["en", "花了多少時間完成；年份月份", "各種時態", "J'ai fini en une heure."],
          ],
          fr: [0, 3],
        },
      },
      {
        t: "depuis 用現在式",
        d: "中文說「我學法文兩年了」，法文用現在式，因為現在還在學。",
        ex: [["J'apprends le français **depuis** deux ans.", "我學法文兩年了。"]],
      },
    ],
    pitfalls: [
      { wrong: "J'ai appris le français depuis deux ans.", right: "J'apprends le français depuis deux ans.", why: "還在持續的事情，搭配 depuis 用現在式。" },
      { wrong: "Je pars en dix minutes.", right: "Je pars dans dix minutes.", why: "「十分鐘後」用 dans；en 是「花十分鐘」。" },
    ],
  },
  {
    id: "verbes-prepositions",
    summary: "動詞後面接另一個原形動詞時，有的直接接，有的要加 à 或 de，只能一個一個記。",
    rules: [
      {
        t: "直接接原形",
        d: "aimer、adorer、préférer、vouloir、pouvoir、devoir、savoir、aller、espérer、détester。",
        ex: [["Je **veux partir**.", "我想走了。"]],
      },
      {
        t: "動詞 + à + 原形",
        d: "commencer à、continuer à、apprendre à、réussir à、hésiter à、aider qqn à、penser à、s'habituer à。",
        ex: [["J'**apprends à** nager.", "我在學游泳。"]],
      },
      {
        t: "動詞 + de + 原形",
        d: "décider de、essayer de、oublier de、finir de、arrêter de、refuser de、accepter de、avoir besoin de、avoir envie de、demander à qqn de、dire à qqn de。",
        ex: [
          ["J'**ai oublié de** fermer la porte.", "我忘了關門。"],
          ["Il **a arrêté de** fumer.", "他戒菸了。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "J'aime de lire.", right: "J'aime lire.", why: "aimer 直接接原形動詞。" },
      { wrong: "Il a décidé à partir.", right: "Il a décidé de partir.", why: "décider de + 原形。" },
    ],
  },
  {
    id: "comparatif",
    summary: "比較級用 plus、moins、aussi…que；最高級用 le plus、le moins。",
    rules: [
      {
        t: "比較級",
        table: {
          head: ["意思", "形容詞／副詞", "名詞"],
          rows: [
            ["比較…", "plus grand que", "plus de livres que"],
            ["比較不…", "moins grand que", "moins de livres que"],
            ["一樣…", "aussi grand que", "autant de livres que"],
          ],
          fr: [1, 2],
        },
      },
      {
        t: "最高級",
        d: "le / la / les + plus / moins + 形容詞 + de。",
        ex: [
          ["C'est **la plus belle** ville **du** monde.", "這是世界上最美的城市。"],
          ["C'est l'élève **le plus** sérieux **de** la classe.", "他是班上最認真的學生。"],
        ],
      },
      {
        t: "不規則",
        table: {
          head: ["原形", "比較級", "最高級"],
          rows: [
            ["bon（好的）", "meilleur", "le meilleur"],
            ["bien（好地）", "mieux", "le mieux"],
            ["mauvais", "pire / plus mauvais", "le pire"],
          ],
          fr: [0, 1, 2],
        },
      },
    ],
    pitfalls: [
      { wrong: "C'est plus bon.", right: "C'est meilleur.", why: "bon 的比較級是 meilleur。" },
      { wrong: "Il chante plus bien que moi.", right: "Il chante mieux que moi.", why: "bien 的比較級是 mieux。" },
    ],
  },
  {
    id: "connecteurs-chrono",
    summary: "說故事或說明步驟時，用順序連接詞讓聽的人跟得上。",
    rules: [
      {
        t: "依序排列",
        table: {
          head: ["說法", "意思"],
          rows: [
            ["d'abord / tout d'abord", "首先"],
            ["ensuite / puis", "接著、然後"],
            ["après / après ça", "之後"],
            ["enfin / finalement", "最後"],
          ],
          fr: [0],
        },
      },
      {
        t: "說故事",
        ex: [
          ["**D'abord**, je me lève. **Ensuite**, je prends une douche. **Enfin**, je pars au travail.", "我先起床，接著洗澡，最後去上班。"],
        ],
      },
      {
        t: "時間點",
        d: "avant de + 原形（在…之前）、après + 過去不定式（在…之後）、pendant que（當…的時候）、soudain（突然）。",
        ex: [["Je me lave les mains **avant de** manger.", "我吃飯前洗手。"]],
      },
    ],
    pitfalls: [
      { wrong: "Après manger, je fais la vaisselle.", right: "Après avoir mangé, je fais la vaisselle.", why: "après 後面接過去不定式（avoir + 過去分詞）。" },
    ],
  },
];
