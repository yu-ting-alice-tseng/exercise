import type { GrammarNote } from "@/lib/learnTypes";

export const NOTES_A1: GrammarNote[] = [
  {
    id: "articles",
    summary: "法文名詞前面幾乎都要有冠詞。定冠詞指「那個、特定的或泛指一整類」，不定冠詞指「一個、某些」。",
    rules: [
      {
        t: "形式",
        table: {
          head: ["", "陽性單數", "陰性單數", "複數"],
          rows: [
            ["定冠詞", "le / l'", "la / l'", "les"],
            ["不定冠詞", "un", "une", "des"],
          ],
          fr: [1, 2, 3],
        },
      },
      {
        t: "母音或啞音 h 前面要省略",
        d: "le 和 la 遇到母音或啞音 h 開頭的字，變成 l'。",
        ex: [
          ["**l'**ami, **l'**école, **l'**hôtel", "朋友、學校、旅館"],
        ],
      },
      {
        t: "什麼時候用定冠詞",
        d: "1. 說話雙方都知道是哪一個。\n2. 泛指一整類東西，特別是在 aimer、adorer、préférer、détester 後面。",
        ex: [
          ["**Le** livre est sur la table.", "（那本）書在桌上。"],
          ["J'aime **le** chocolat.", "我喜歡巧克力。（泛指）"],
        ],
      },
      {
        t: "什麼時候用不定冠詞",
        d: "第一次提到、不特定的人事物，或者數「一個」的時候。",
        ex: [
          ["J'ai **un** chat et **des** poissons.", "我有一隻貓和幾條魚。"],
          ["C'est **une** bonne idée.", "這是個好主意。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "J'aime des pommes.", right: "J'aime les pommes.", why: "喜好動詞後面泛指一整類，用定冠詞。" },
      { wrong: "Je n'ai pas un chat.", right: "Je n'ai pas de chat.", why: "否定句中 un、une、des 要變成 de。" },
    ],
    tip: "看到 aimer、adorer、préférer、détester，後面幾乎都用 le、la、les。",
  },
  {
    id: "partitifs",
    summary: "部分冠詞用在「數不出來」的東西，意思是「一些」，例如食物、飲料、抽象概念。",
    rules: [
      {
        t: "形式",
        table: {
          head: ["陽性", "陰性", "母音前", "複數"],
          rows: [["du pain", "de la confiture", "de l'eau", "des pâtes"]],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "常和這些動詞一起用",
        d: "manger、boire、prendre、acheter、vouloir、il y a，後面接不可數的東西。",
        ex: [
          ["Je bois **du** café le matin.", "我早上喝咖啡。"],
          ["Il faut **de la** patience.", "需要耐心。"],
          ["Tu veux **de l'**eau ?", "你要喝水嗎？"],
        ],
      },
      {
        t: "否定句和數量詞後面都變成 de",
        d: "pas de、beaucoup de、un peu de、un kilo de…後面不再加冠詞。",
        ex: [
          ["Je ne mange pas **de** viande.", "我不吃肉。"],
          ["Il y a beaucoup **de** sucre.", "糖很多。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "Je mange le pain tous les matins.", right: "Je mange du pain tous les matins.", why: "吃「一些」麵包，不是吃「那個」麵包。" },
      { wrong: "Je ne bois pas du lait.", right: "Je ne bois pas de lait.", why: "否定時 du 變 de。" },
    ],
    tip: "問自己：「能不能說一個、兩個？」不能的話，通常用部分冠詞。",
  },
  {
    id: "articles-contractes",
    summary: "介系詞 à 和 de 碰到定冠詞 le、les 時要合在一起寫。",
    rules: [
      {
        t: "合寫規則",
        table: {
          head: ["", "+ le", "+ la", "+ l'", "+ les"],
          rows: [
            ["à", "**au**", "à la", "à l'", "**aux**"],
            ["de", "**du**", "de la", "de l'", "**des**"],
          ],
          fr: [1, 2, 3, 4],
        },
      },
      {
        t: "à：去哪裡、在哪裡",
        ex: [
          ["Je vais **au** cinéma.", "我去電影院。"],
          ["Elle parle **aux** enfants.", "她跟孩子們說話。"],
          ["On se voit **à la** gare.", "我們在車站見。"],
        ],
      },
      {
        t: "de：從哪裡來、屬於誰",
        ex: [
          ["Il sort **du** bureau.", "他從辦公室出來。"],
          ["C'est la voiture **des** voisins.", "這是鄰居的車。"],
        ],
      },
      {
        t: "常見固定用法",
        d: "jouer au + 運動（jouer au foot），jouer du + 樂器（jouer du piano），parler de、avoir besoin de、à côté de、près de。",
        ex: [["Il joue **du** violon et **au** tennis.", "他拉小提琴，也打網球。"]],
      },
    ],
    pitfalls: [
      { wrong: "Je vais à le marché.", right: "Je vais au marché.", why: "à + le 一定要合寫成 au。" },
      { wrong: "le livre de le professeur", right: "le livre du professeur", why: "de + le 合寫成 du。" },
    ],
  },
  {
    id: "genre-nombre",
    summary: "每個法文名詞都有陰陽性，冠詞和形容詞要跟著配合。複數通常加 -s，但有幾種特殊情況。",
    rules: [
      {
        t: "陰性的常見變化",
        table: {
          head: ["規則", "陽性", "陰性"],
          rows: [
            ["加 -e", "un ami", "une ami**e**"],
            ["-er → -ère", "un boulanger", "une boulang**ère**"],
            ["-eur → -euse", "un vendeur", "une vend**euse**"],
            ["-teur → -trice", "un acteur", "une act**rice**"],
            ["-ien → -ienne", "un musicien", "une musici**enne**"],
          ],
          fr: [1, 2],
        },
      },
      {
        t: "從詞尾猜陰陽性",
        d: "陰性常見詞尾：-tion、-sion、-té、-ette、-ure、-ence（la nation、la liberté）。\n陽性常見詞尾：-ment、-age、-isme、-eau（le moment、le fromage、le gâteau）。\n例外：la page、la plage、l'eau（陰性）。",
      },
      {
        t: "複數",
        table: {
          head: ["規則", "單數", "複數"],
          rows: [
            ["一般加 -s", "un livre", "des livre**s**"],
            ["-s、-x、-z 不變", "un bras, un prix", "des bras, des prix"],
            ["-eau、-eu → 加 -x", "un gâteau, un jeu", "des gâteau**x**, des jeu**x**"],
            ["-al → -aux", "un journal", "des journ**aux**"],
            ["不規則", "un œil, monsieur", "des yeux, messieurs"],
          ],
          fr: [1, 2],
        },
      },
    ],
    pitfalls: [
      { wrong: "des chevals", right: "des chevaux", why: "-al 結尾的名詞複數大多變成 -aux。" },
      { wrong: "le plage", right: "la plage", why: "-age 結尾通常是陽性，但 la plage、la page、l'image 是例外。" },
    ],
    tip: "背單字時連冠詞一起背：不要只背 livre，要背 un livre。",
  },
  {
    id: "adjectifs",
    summary: "形容詞要跟名詞的陰陽性和單複數配合，大部分放在名詞後面。",
    rules: [
      {
        t: "陰性與複數",
        table: {
          head: ["規則", "陽性", "陰性"],
          rows: [
            ["加 -e", "grand", "grand**e**"],
            ["-e 結尾不變", "rouge", "rouge"],
            ["-eux → -euse", "heureux", "heur**euse**"],
            ["-if → -ive", "sportif", "sport**ive**"],
            ["子音重複", "bon, gentil", "bo**nne**, genti**lle**"],
            ["-er → -ère", "cher", "ch**ère**"],
          ],
          fr: [1, 2],
        },
      },
      {
        t: "位置：大部分放在名詞後",
        d: "顏色、國籍、形狀、較長的形容詞都放後面。",
        ex: [["une voiture **rouge**, un film **français**", "一輛紅色的車、一部法國電影"]],
      },
      {
        t: "BAGS 形容詞放在名詞前",
        d: "Beauté（beau、joli）、Âge（jeune、vieux、nouveau）、Goodness（bon、mauvais）、Size（grand、petit、gros）。",
        ex: [["un **petit** appartement, une **jolie** robe", "一間小公寓、一件漂亮的洋裝"]],
      },
      {
        t: "beau、nouveau、vieux 的特殊形式",
        d: "陽性名詞以母音開頭時，用 bel、nouvel、vieil。",
        table: {
          head: ["陽性", "母音前陽性", "陰性"],
          rows: [
            ["beau", "**bel** homme", "belle"],
            ["nouveau", "**nouvel** ami", "nouvelle"],
            ["vieux", "**vieil** arbre", "vieille"],
          ],
          fr: [0, 1, 2],
        },
      },
    ],
    pitfalls: [
      { wrong: "une robe noir", right: "une robe noire", why: "robe 是陰性，形容詞要加 -e。" },
      { wrong: "un beau homme", right: "un bel homme", why: "母音或啞音 h 前面，beau 變成 bel。" },
    ],
  },
  {
    id: "possessifs",
    summary: "所有格形容詞的形式由「被擁有的東西」的陰陽性和數量決定，而不是擁有者的性別。",
    rules: [
      {
        t: "形式",
        table: {
          head: ["擁有者", "陽性單數", "陰性單數", "複數"],
          rows: [
            ["je", "mon", "ma", "mes"],
            ["tu", "ton", "ta", "tes"],
            ["il / elle", "son", "sa", "ses"],
            ["nous", "notre", "notre", "nos"],
            ["vous", "votre", "votre", "vos"],
            ["ils / elles", "leur", "leur", "leurs"],
          ],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "和東西配合，不和人配合",
        d: "son père 可以是「他的爸爸」也可以是「她的爸爸」。",
        ex: [
          ["Marie aime **son** frère.", "瑪麗愛她的哥哥。"],
          ["Paul aime **sa** sœur.", "保羅愛他的姊姊。"],
        ],
      },
      {
        t: "母音前的陰性名詞用 mon、ton、son",
        d: "為了好念，陰性名詞以母音開頭時不用 ma、ta、sa。",
        ex: [["**mon** amie, **ton** école, **son** histoire", "我的（女）朋友、你的學校、他的故事"]],
      },
    ],
    pitfalls: [
      { wrong: "ma amie", right: "mon amie", why: "母音前改用 mon。" },
      { wrong: "Elle aime sa mari.", right: "Elle aime son mari.", why: "mari 是陽性，跟擁有者是女性無關。" },
    ],
  },
  {
    id: "demonstratifs",
    summary: "指示形容詞表示「這個、那個」，放在名詞前面。",
    rules: [
      {
        t: "形式",
        table: {
          head: ["陽性", "母音前陽性", "陰性", "複數"],
          rows: [["ce livre", "**cet** homme", "cette ville", "ces enfants"]],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "區分「這」和「那」",
        d: "在名詞後面加 -ci（這）或 -là（那）。",
        ex: [
          ["Je préfère ce pull-**ci** à ce pull-**là**.", "比起那件毛衣，我比較喜歡這件。"],
        ],
      },
      {
        t: "時間用法",
        ex: [
          ["**ce** matin, **cet** après-midi, **cette** semaine", "今天早上、今天下午、這個星期"],
        ],
      },
    ],
    pitfalls: [{ wrong: "ce homme", right: "cet homme", why: "陽性名詞以母音或啞音 h 開頭，用 cet。" }],
  },
  {
    id: "pronoms-toniques",
    summary: "重讀代名詞用在介系詞後面、強調、或是沒有動詞的簡短回答。",
    rules: [
      {
        t: "形式",
        table: {
          head: ["主詞", "je", "tu", "il", "elle", "nous", "vous", "ils", "elles"],
          rows: [["重讀", "moi", "toi", "lui", "elle", "nous", "vous", "eux", "elles"]],
          fr: [1, 2, 3, 4, 5, 6, 7, 8],
        },
      },
      {
        t: "用法",
        d: "1. 強調：Moi, je…\n2. 介系詞後：avec toi、chez lui、pour eux。\n3. c'est 後面：C'est moi.\n4. 簡短回答：Et toi ? Moi aussi. Moi non plus.",
        ex: [
          ["**Moi**, j'aime le thé.", "我呢，我喜歡茶。"],
          ["Tu viens avec **nous** ?", "你跟我們一起來嗎？"],
          ["J'adore ce film. – **Moi** aussi !", "我超愛這部電影。我也是！"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "Je vais chez il.", right: "Je vais chez lui.", why: "介系詞後面要用重讀代名詞。" },
      { wrong: "C'est je.", right: "C'est moi.", why: "c'est 後面接重讀代名詞。" },
    ],
  },
  {
    id: "prepositions-lieux",
    summary: "城市用 à，國家要看陰陽性與單複數。",
    rules: [
      {
        t: "去、在某地",
        table: {
          head: ["地點", "介系詞", "例子"],
          rows: [
            ["城市", "à", "à Paris, à Taipei"],
            ["陰性國家（多半 -e 結尾）", "en", "en France, en Chine"],
            ["母音開頭的國家", "en", "en Iran, en Israël"],
            ["陽性國家", "au", "au Japon, au Canada"],
            ["複數國家", "aux", "aux États-Unis, aux Pays-Bas"],
          ],
          fr: [1, 2],
        },
      },
      {
        t: "從某地來",
        d: "城市與陰性國家用 de / d'，陽性用 du，複數用 des。",
        ex: [
          ["Je viens **de** Lyon et elle vient **du** Japon.", "我來自里昂，她來自日本。"],
          ["Il rentre **des** États-Unis.", "他從美國回來。"],
        ],
      },
      {
        t: "常見例外",
        d: "le Mexique、le Cambodge、le Mozambique 雖然是 -e 結尾，但是陽性：au Mexique。",
      },
    ],
    pitfalls: [
      { wrong: "Je vais en Japon.", right: "Je vais au Japon.", why: "le Japon 是陽性國家，用 au。" },
      { wrong: "J'habite en Paris.", right: "J'habite à Paris.", why: "城市一律用 à。" },
    ],
    tip: "台灣：à Taïwan（像島名一樣用 à）。",
  },
  {
    id: "quantites",
    summary: "表示數量的詞後面接 de（不加冠詞），數字直接放在名詞前面。",
    rules: [
      {
        t: "副詞 + de",
        table: {
          head: ["說法", "意思", "例子"],
          rows: [
            ["beaucoup de", "很多", "beaucoup **de** travail"],
            ["un peu de", "一點", "un peu **de** sel"],
            ["assez de", "足夠", "assez **d'**argent"],
            ["trop de", "太多", "trop **de** bruit"],
            ["peu de", "很少（幾乎沒有）", "peu **de** temps"],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "容器、重量 + de",
        ex: [
          ["un kilo **de** tomates, une bouteille **d'**eau", "一公斤番茄、一瓶水"],
          ["un morceau **de** fromage, une tranche **de** jambon", "一塊乳酪、一片火腿"],
        ],
      },
      {
        t: "用 en 代替數量",
        d: "已經提過的東西，用 en 代替，數量詞留在後面。",
        ex: [["Tu as des frères ? – Oui, j'**en** ai deux.", "你有兄弟嗎？有，我有兩個。"]],
      },
    ],
    pitfalls: [
      { wrong: "beaucoup des amis", right: "beaucoup d'amis", why: "數量詞後面直接接 de，不加冠詞。" },
    ],
  },
  {
    id: "etre-avoir",
    summary: "être（是）和 avoir（有）是最重要的兩個動詞，也是複合時態的助動詞。",
    rules: [
      {
        t: "現在式變化",
        table: {
          head: ["", "être", "avoir"],
          rows: [
            ["je / j'", "suis", "ai"],
            ["tu", "es", "as"],
            ["il / elle / on", "est", "a"],
            ["nous", "sommes", "avons"],
            ["vous", "êtes", "avez"],
            ["ils / elles", "sont", "ont"],
          ],
          fr: [0, 1, 2],
        },
      },
      {
        t: "中文說「是」，法文有時用 avoir",
        d: "年齡、身體感覺用 avoir：avoir 20 ans、avoir faim、avoir soif、avoir froid、avoir chaud、avoir peur、avoir raison。",
        ex: [
          ["J'**ai** vingt ans.", "我二十歲。"],
          ["Tu **as** faim ?", "你餓了嗎？"],
        ],
      },
      {
        t: "職業前面不加冠詞",
        ex: [["Elle **est** médecin.", "她是醫生。"]],
      },
    ],
    pitfalls: [
      { wrong: "Je suis 20 ans.", right: "J'ai 20 ans.", why: "年齡用 avoir。" },
      { wrong: "Il est un professeur.", right: "Il est professeur.", why: "être + 職業不加冠詞；但可以說 C'est un professeur。" },
    ],
  },
  {
    id: "present-er",
    summary: "-er 動詞是最大的一群規則動詞，去掉 -er 加上固定詞尾。",
    rules: [
      {
        t: "詞尾",
        table: {
          head: ["人稱", "詞尾", "parler", "aimer"],
          rows: [
            ["je / j'", "-e", "parl**e**", "aim**e**"],
            ["tu", "-es", "parl**es**", "aim**es**"],
            ["il / elle / on", "-e", "parl**e**", "aim**e**"],
            ["nous", "-ons", "parl**ons**", "aim**ons**"],
            ["vous", "-ez", "parl**ez**", "aim**ez**"],
            ["ils / elles", "-ent", "parl**ent**", "aim**ent**"],
          ],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "發音小提醒",
        d: "-e、-es、-ent 都不發音，所以 je parle、tu parles、ils parlent 聽起來一樣。",
      },
      {
        t: "拼字變化",
        d: "-ger 動詞在 nous 時保留 e：nous mangeons。\n-cer 動詞在 nous 時加 ç：nous commençons。\nacheter、préférer、appeler 在 je、tu、il、ils 時會改變重音或重複子音：j'achète、je préfère、j'appelle。",
        ex: [["Nous **mangeons** à midi.", "我們中午吃飯。"]],
      },
    ],
    pitfalls: [
      { wrong: "nous mangons", right: "nous mangeons", why: "保留 e，g 才會念成「ㄓ」的音。" },
      { wrong: "Je aime la musique.", right: "J'aime la musique.", why: "je 遇到母音或啞音 h 要縮寫成 j'。" },
    ],
  },
  {
    id: "futur-proche",
    summary: "近未來式＝aller 現在式 + 原形動詞，表示馬上要發生或已經計畫好的事。",
    rules: [
      {
        t: "aller 現在式",
        table: {
          head: ["je", "tu", "il / elle", "nous", "vous", "ils / elles"],
          rows: [["vais", "vas", "va", "allons", "allez", "vont"]],
          fr: [0, 1, 2, 3, 4, 5],
        },
      },
      {
        t: "句型",
        ex: [
          ["Je **vais partir** demain.", "我明天要出發。"],
          ["Il **va pleuvoir**.", "快要下雨了。"],
        ],
      },
      {
        t: "否定：ne…pas 夾住 aller",
        ex: [["Nous **n'allons pas** sortir ce soir.", "我們今晚不出門。"]],
      },
    ],
    pitfalls: [
      { wrong: "Je ne vais sortir pas.", right: "Je ne vais pas sortir.", why: "ne…pas 夾住變化的動詞 aller。" },
    ],
  },
  {
    id: "negation",
    summary: "否定句用 ne…pas 夾住變化的動詞。口語常省略 ne，但寫作要保留。",
    rules: [
      {
        t: "基本句型",
        ex: [
          ["Je **ne** parle **pas** chinois.", "我不會說中文。"],
          ["Elle **n'**aime **pas** le café.", "她不喜歡咖啡。"],
        ],
      },
      {
        t: "其他否定詞",
        table: {
          head: ["說法", "意思", "例子"],
          rows: [
            ["ne…jamais", "從不", "Il ne mange jamais de viande."],
            ["ne…plus", "不再", "Je ne fume plus."],
            ["ne…rien", "什麼都不", "Je ne vois rien."],
            ["ne…personne", "沒有人", "Je ne connais personne."],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "un、une、des、du、de la 變成 de",
        d: "但 être 後面不變：Ce n'est pas un problème。",
        ex: [["Je n'ai pas **de** voiture.", "我沒有車。"]],
      },
    ],
    pitfalls: [
      { wrong: "Je n'ai pas une voiture.", right: "Je n'ai pas de voiture.", why: "否定句中不定冠詞變成 de。" },
      { wrong: "Je pas parle.", right: "Je ne parle pas.", why: "pas 放在動詞後面。" },
    ],
  },
  {
    id: "questions",
    summary: "法文問句有三種說法：語調、est-ce que、倒裝。越後面越正式。",
    rules: [
      {
        t: "三種是非問句",
        table: {
          head: ["說法", "例子", "語體"],
          rows: [
            ["提高語調", "Tu viens ?", "口語"],
            ["Est-ce que", "Est-ce que tu viens ?", "通用"],
            ["倒裝", "Viens-tu ?", "正式"],
          ],
          fr: [1],
        },
      },
      {
        t: "疑問詞",
        table: {
          head: ["疑問詞", "意思", "例子"],
          rows: [
            ["où", "哪裡", "Où habites-tu ?"],
            ["quand", "什麼時候", "Quand est-ce que tu pars ?"],
            ["comment", "怎麼樣", "Comment tu t'appelles ?"],
            ["pourquoi", "為什麼", "Pourquoi tu ris ?"],
            ["combien", "多少", "Combien ça coûte ?"],
            ["qui", "誰", "Qui est-ce ?"],
            ["que / quoi", "什麼", "Qu'est-ce que tu fais ? / Tu fais quoi ?"],
            ["quel(le)(s)", "哪個", "Quelle heure est-il ?"],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "倒裝時加 -t-",
        d: "動詞以母音結尾，後面是 il、elle、on 時加 -t-。",
        ex: [["Parle-**t**-il français ?", "他說法文嗎？"]],
      },
    ],
    pitfalls: [
      { wrong: "Parle-il français ?", right: "Parle-t-il français ?", why: "兩個母音之間加 -t-。" },
      { wrong: "Quel est-ce que tu veux ?", right: "Qu'est-ce que tu veux ?", why: "「什麼」用 qu'est-ce que；quel 要接名詞或 être。" },
    ],
  },
  {
    id: "connecteurs-a1",
    summary: "用簡單的連接詞把短句連起來，句子就會更自然。",
    rules: [
      {
        t: "五個基本連接詞",
        table: {
          head: ["連接詞", "意思", "例子"],
          rows: [
            ["et", "和、而且", "J'aime le thé et le café."],
            ["mais", "但是", "C'est bon, mais c'est cher."],
            ["ou", "或者", "Tu veux du thé ou du café ?"],
            ["parce que", "因為", "Je reste parce que je suis malade."],
            ["alors / donc", "所以", "Il pleut, alors je prends un parapluie."],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "parce que 和 pourquoi 一問一答",
        ex: [["Pourquoi tu apprends le français ? – **Parce que** j'aime la France.", "你為什麼學法文？因為我喜歡法國。"]],
      },
    ],
    pitfalls: [
      { wrong: "parce que il pleut", right: "parce qu'il pleut", why: "que 遇到母音要縮寫成 qu'。" },
    ],
  },
];
