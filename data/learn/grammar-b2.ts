import type { GrammarNote } from "@/lib/learnTypes";

export const NOTES_B2: GrammarNote[] = [
  {
    id: "conditionnel-passe",
    summary: "條件式過去式＝avoir 或 être 的條件式 + 過去分詞，用來說「本來會、早該」以及和過去事實相反的結果。",
    rules: [
      {
        t: "形式",
        ex: [
          ["J'**aurais aimé** venir.", "我本來很想來的。"],
          ["Elle **serait partie**.", "她本來會走的。"],
        ],
      },
      {
        t: "四種用法",
        d: "1. 和過去事實相反：Si j'avais su, je **serais venu**.\n2. 後悔：J'**aurais dû** l'écouter.（我早該聽他的。）\n3. 責備：Tu **aurais pu** me prévenir !（你本來可以先告訴我！）\n4. 新聞中未經證實的消息：L'incendie **aurait fait** trois victimes.（據報導火災造成三人罹難。）",
      },
      {
        t: "常用三組",
        table: {
          head: ["說法", "意思"],
          rows: [
            ["j'aurais dû + 原形", "我早該…"],
            ["j'aurais pu + 原形", "我本來可以…"],
            ["j'aurais voulu / aimé + 原形", "我本來很想…"],
          ],
          fr: [0],
        },
      },
    ],
    pitfalls: [{ wrong: "Si j'aurais su, je serais venu.", right: "Si j'avais su, je serais venu.", why: "si 子句用愈過去式，條件式只放在主句。" }],
  },
  {
    id: "subjonctif-indicatif",
    summary: "確定、事實用直陳式；意願、情感、懷疑、可能用虛擬式。同一個動詞肯定和否定時可能不一樣。",
    rules: [
      {
        t: "對照表",
        table: {
          head: ["直陳式（確定）", "虛擬式（不確定、主觀）"],
          rows: [
            ["je pense que, je crois que", "je ne pense pas que, je ne crois pas que"],
            ["je suis sûr que, il est certain que", "je ne suis pas sûr que, je doute que"],
            ["il est probable que", "il est possible que, il se peut que"],
            ["il me semble que", "il semble que"],
            ["espérer que", "souhaiter que, vouloir que"],
            ["après que", "avant que"],
          ],
          fr: [0, 1],
        },
      },
      {
        t: "例子",
        ex: [
          ["Je **pense** qu'il **a** raison.", "我認為他是對的。"],
          ["Je **ne pense pas** qu'il **ait** raison.", "我不認為他是對的。"],
          ["Il est **probable** qu'il **viendra**.", "他很可能會來。"],
          ["Il est **possible** qu'il **vienne**.", "他有可能會來。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "J'espère qu'il vienne.", right: "J'espère qu'il viendra.", why: "espérer que 接直陳式。" },
      { wrong: "Après qu'il soit parti…", right: "Après qu'il est parti…", why: "après que 在規範上接直陳式（口語常聽到虛擬式，但考試要用直陳式）。" },
    ],
  },
  {
    id: "gerondif",
    summary: "副動詞＝en + 現在分詞，主詞和主句相同，表示同時、方式或條件。現在分詞單獨用時多半是書面語。",
    rules: [
      {
        t: "現在分詞的形成",
        d: "nous 現在式去掉 -ons，加 -ant。例外：être → étant、avoir → ayant、savoir → sachant。",
        table: {
          head: ["原形", "nous", "現在分詞"],
          rows: [
            ["parler", "parlons", "parl**ant**"],
            ["finir", "finissons", "finiss**ant**"],
            ["faire", "faisons", "fais**ant**"],
            ["manger", "mangeons", "mange**ant**"],
          ],
          fr: [0, 1, 2],
        },
      },
      {
        t: "副動詞的三種意思",
        ex: [
          ["Il chante **en** se **douchant**.", "他邊洗澡邊唱歌。（同時）"],
          ["On apprend **en pratiquant**.", "從練習中學習。（方式）"],
          ["**En partant** maintenant, tu arriveras à l'heure.", "現在出發的話你會準時到。（條件）"],
        ],
      },
      {
        t: "現在分詞（沒有 en）",
        d: "書面語中代替 qui 子句或原因子句。",
        ex: [
          ["Les étudiants **ayant** un passeport peuvent partir.", "有護照的學生可以出發。"],
          ["**Étant** malade, il est resté chez lui.", "因為生病，他留在家裡。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "En sortant, la pluie a commencé.", right: "En sortant, j'ai vu qu'il pleuvait.", why: "副動詞的主詞必須和主句相同；下雨不會「出門」。" },
    ],
  },
  {
    id: "relatifs-composes",
    summary: "介系詞後面指物時用 lequel 系列，它和先行詞的陰陽性、單複數配合，也會和 à、de 合寫。",
    rules: [
      {
        t: "形式",
        table: {
          head: ["", "陽單", "陰單", "陽複", "陰複"],
          rows: [
            ["一般", "lequel", "laquelle", "lesquels", "lesquelles"],
            ["à +", "auquel", "à laquelle", "auxquels", "auxquelles"],
            ["de +", "duquel", "de laquelle", "desquels", "desquelles"],
          ],
          fr: [1, 2, 3, 4],
        },
      },
      {
        t: "例子",
        ex: [
          ["La table **sur laquelle** j'écris.", "我寫字用的那張桌子。"],
          ["Le projet **auquel** je participe.", "我參與的那個計畫。（participer à）"],
          ["Le parc **près duquel** j'habite.", "我住的地方附近的公園。"],
        ],
      },
      {
        t: "指人時可以用 qui",
        ex: [["L'amie **avec qui**（avec laquelle）je voyage.", "和我一起旅行的朋友。"]],
      },
      {
        t: "dont 和 duquel",
        d: "動詞直接接 de 用 dont（le livre dont je parle）；介系詞片語（près de、à côté de、au milieu de）裡的 de 要用 duquel。",
      },
    ],
    pitfalls: [
      { wrong: "Le projet à lequel je pense", right: "Le projet auquel je pense", why: "à + lequel 一定合寫成 auquel。" },
      { wrong: "Le parc près dont j'habite", right: "Le parc près duquel j'habite", why: "介系詞片語後面不能用 dont。" },
    ],
  },
  {
    id: "pronoms-doubles",
    summary: "兩個受詞代名詞同時出現時，順序是固定的。",
    rules: [
      {
        t: "一般順序（動詞前）",
        table: {
          head: ["1", "2", "3", "4", "5"],
          rows: [["me, te, se, nous, vous", "le, la, les", "lui, leur", "y", "en"]],
          fr: [0, 1, 2, 3, 4],
        },
        ex: [
          ["Il **me le** donne.", "他把它給我。"],
          ["Je **le lui** donne.", "我把它給他。"],
          ["Je **t'en** parle.", "我跟你談這件事。"],
        ],
      },
      {
        t: "肯定命令式的順序",
        d: "動詞 - 直接受詞 - 間接受詞 - y - en，me 和 te 變成 moi、toi（但在 en 前面是 m'、t'）。",
        ex: [
          ["Donne-**le-moi** !", "把它給我！"],
          ["Donne-**m'en** !", "給我一些！"],
        ],
      },
      {
        t: "lui 和 leur 不會和 me、te、se 一起出現",
        d: "要表達「把我介紹給他」用 Il me présente à lui。",
      },
    ],
    pitfalls: [
      { wrong: "Je lui le donne.", right: "Je le lui donne.", why: "le、la、les 放在 lui、leur 前面。" },
      { wrong: "Donne-moi-le !", right: "Donne-le-moi !", why: "肯定命令式先放直接受詞。" },
    ],
  },
  {
    id: "prepositions-verbes",
    summary: "同一個動詞接不同介系詞，意思可能完全不同；有些動詞和中文的習慣也不一樣。",
    rules: [
      {
        t: "意思會變的動詞",
        table: {
          head: ["說法", "意思"],
          rows: [
            ["penser à qqn / qqch", "想到、惦記"],
            ["penser de qqch", "對…有什麼看法"],
            ["parler à qqn / parler de qqch", "跟某人說話／談某事"],
            ["jouer à / jouer de", "玩（運動、遊戲）／演奏（樂器）"],
            ["manquer à qqn", "讓某人想念（Tu me manques＝我想你）"],
            ["tenir à qqch", "很重視、堅持"],
          ],
          fr: [0],
        },
      },
      {
        t: "和中文不同的搭配",
        table: {
          head: ["法文", "中文"],
          rows: [
            ["obéir à qqn", "服從某人"],
            ["ressembler à qqn", "像某人"],
            ["se souvenir de qqch", "記得某事"],
            ["se méfier de qqn", "提防某人"],
            ["compter sur qqn", "依靠某人"],
            ["s'intéresser à qqch", "對…有興趣"],
          ],
          fr: [0],
        },
      },
      {
        t: "Tu me manques 的方向",
        ex: [["Tu **me** manques.", "我想你。（你讓我覺得缺少了什麼）"]],
      },
    ],
    pitfalls: [
      { wrong: "Je manque toi.", right: "Tu me manques.", why: "manquer à qqn：被想念的人是主詞。" },
      { wrong: "Je me souviens ce jour.", right: "Je me souviens de ce jour.", why: "se souvenir de。" },
    ],
  },
  {
    id: "discours-indirect",
    summary: "間接引語轉述別人說的話。引述動詞是過去式時，時態、人稱、時間詞都要跟著改。",
    rules: [
      {
        t: "時態轉換（引述動詞是過去式）",
        table: {
          head: ["直接引語", "間接引語"],
          rows: [
            ["現在式", "未完成過去式"],
            ["複合過去式", "愈過去式"],
            ["簡單未來式", "條件式現在式"],
            ["近未來式（va faire）", "allait faire"],
            ["命令式", "de + 原形動詞"],
          ],
        },
      },
      {
        t: "時間詞轉換",
        table: {
          head: ["直接引語", "間接引語"],
          rows: [
            ["aujourd'hui", "ce jour-là"],
            ["hier", "la veille"],
            ["demain", "le lendemain"],
            ["la semaine prochaine", "la semaine suivante"],
            ["maintenant", "à ce moment-là"],
          ],
          fr: [0, 1],
        },
      },
      {
        t: "問句的連接詞",
        table: {
          head: ["直接問句", "間接問句"],
          rows: [
            ["是非問句", "si"],
            ["Qu'est-ce que…", "ce que"],
            ["Qu'est-ce qui…", "ce qui"],
            ["où、quand、comment…", "保留疑問詞"],
          ],
          fr: [1],
        },
        ex: [["Il m'a demandé **si** je **venais**.", "他問我要不要來。"]],
      },
    ],
    pitfalls: [
      { wrong: "Il m'a demandé qu'est-ce que je voulais.", right: "Il m'a demandé ce que je voulais.", why: "間接問句裡 qu'est-ce que 要變成 ce que。" },
      { wrong: "Elle m'a demandé est-ce que je venais.", right: "Elle m'a demandé si je venais.", why: "是非問句用 si，不保留 est-ce que。" },
    ],
  },
  {
    id: "connecteurs",
    summary: "邏輯連接詞讓文章有條理。依功能分類記，寫作時才能換著用。",
    rules: [
      {
        t: "依功能分類",
        table: {
          head: ["功能", "連接詞"],
          rows: [
            ["補充", "de plus, en outre, par ailleurs, également"],
            ["原因", "car, parce que, puisque, en effet, grâce à, à cause de"],
            ["結果", "donc, ainsi, par conséquent, c'est pourquoi, d'où"],
            ["轉折", "mais, cependant, pourtant, toutefois, néanmoins"],
            ["對比", "alors que, tandis que, en revanche, au contraire"],
            ["舉例", "par exemple, notamment, comme, tel que"],
            ["換句話說", "c'est-à-dire, autrement dit, en d'autres termes"],
          ],
          fr: [1],
        },
      },
      {
        t: "en effet 不是「事實上」",
        d: "en effet 用來證實或解釋前一句，接近「確實、因為」；「事實上（和預期相反）」要用 en fait。",
        ex: [["Il est fatigué. **En effet**, il a travaillé toute la nuit.", "他很累，因為他工作了一整夜。"]],
      },
    ],
    pitfalls: [{ wrong: "Je pensais qu'il viendrait. En effet, il est resté chez lui.", right: "Je pensais qu'il viendrait. En fait, il est resté chez lui.", why: "和預期相反用 en fait。" }],
  },
  {
    id: "opposition-concession",
    summary: "對立是兩件事互相比較；讓步是「雖然…但還是…」。重點是後面接名詞、直陳式還是虛擬式。",
    rules: [
      {
        t: "依後面接的東西分類",
        table: {
          head: ["接什麼", "說法"],
          rows: [
            ["名詞", "malgré, en dépit de"],
            ["直陳式", "même si, alors que, tandis que"],
            ["虛擬式", "bien que, quoique"],
            ["原形動詞", "avoir beau（儘管…也沒用）"],
            ["獨立使用", "pourtant, cependant, toutefois, néanmoins, quand même"],
          ],
          fr: [1],
        },
      },
      {
        t: "例子",
        ex: [
          ["**Malgré** la pluie, ils sont sortis.", "儘管下雨，他們還是出門了。"],
          ["**Bien qu'**il **soit** riche, il n'est pas heureux.", "雖然他很有錢，卻不快樂。"],
          ["J'**ai beau** essayer, je n'y arrive pas.", "我再怎麼試也做不到。"],
          ["Il fait froid ; il sort **quand même**.", "天氣很冷，他還是出門了。"],
        ],
      },
    ],
    pitfalls: [
      { wrong: "Malgré qu'il pleuve…", right: "Bien qu'il pleuve…", why: "malgré 後面接名詞；接句子用 bien que（malgré que 在考試中避免使用）。" },
      { wrong: "Même s'il soit malade…", right: "Même s'il est malade…", why: "même si 接直陳式。" },
    ],
  },
  {
    id: "expression-but",
    summary: "表達目的：主詞相同時用 pour + 原形，主詞不同時用 pour que + 虛擬式。",
    rules: [
      {
        t: "對照表",
        table: {
          head: ["主詞相同（+ 原形）", "主詞不同（+ 虛擬式）", "意思"],
          rows: [
            ["pour", "pour que", "為了"],
            ["afin de", "afin que", "為了（正式）"],
            ["de peur de / de crainte de", "de peur que / de crainte que (ne)", "怕…"],
            ["de façon à / de manière à", "de façon que / de manière que", "以便"],
          ],
          fr: [0, 1],
        },
      },
      {
        t: "例子",
        ex: [
          ["Je travaille **pour** payer mes études.", "我工作是為了付學費。"],
          ["Je parle lentement **pour que** tu **comprennes**.", "我講慢一點，好讓你聽懂。"],
          ["Il se cache **de peur qu'**on ne le **voie**.", "他躲起來，怕被人看到。"],
        ],
      },
    ],
    pitfalls: [{ wrong: "Je travaille pour que je paie mes études.", right: "Je travaille pour payer mes études.", why: "主詞相同時用原形動詞。" }],
  },
  {
    id: "articulateurs",
    summary: "寫作文或報告時，用固定的連接詞標出段落：開頭、展開、結論。",
    rules: [
      {
        t: "文章結構",
        table: {
          head: ["位置", "說法"],
          rows: [
            ["引言", "tout d'abord, pour commencer, en premier lieu"],
            ["第二點", "ensuite, de plus, en second lieu, par ailleurs"],
            ["對比", "d'une part… d'autre part, d'un côté… de l'autre"],
            ["讓步", "certes… mais, il est vrai que… cependant"],
            ["最後一點", "enfin, pour finir, en dernier lieu"],
            ["結論", "en conclusion, pour conclure, en somme, bref（口語）"],
          ],
          fr: [1],
        },
      },
      {
        t: "certes… mais：先讓步再反駁",
        ex: [["**Certes**, le projet coûte cher, **mais** il créera des emplois.", "的確，這個計畫很貴，但會創造工作機會。"]],
      },
    ],
    pitfalls: [{ wrong: "Finalement, je voudrais commencer par…", right: "Tout d'abord, je voudrais commencer par…", why: "finalement 是「最後」，不能用在開頭。" }],
    tip: "DELF B2 作文評分會看連接詞是否多樣，同一個連接詞不要重複超過兩次。",
  },
];
