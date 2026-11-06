import type { GrammarNote } from "@/lib/learnTypes";

export const NOTES_C2: GrammarNote[] = [
  {
    id: "passe-simple",
    summary: "簡單過去式是文學和歷史敘述的時態，口語不用。C2 主要要求看得懂，常見動詞要能寫。",
    rules: [
      {
        t: "三種詞尾",
        table: {
          head: ["人稱", "-a 型（-er 動詞）", "-i 型（-ir、-re）", "-u 型（avoir、être…）"],
          rows: [
            ["je", "parl**ai**", "fin**is**", "e**us**"],
            ["tu", "parl**as**", "fin**is**", "e**us**"],
            ["il / elle", "parl**a**", "fin**it**", "e**ut**"],
            ["nous", "parl**âmes**", "fin**îmes**", "e**ûmes**"],
            ["vous", "parl**âtes**", "fin**îtes**", "e**ûtes**"],
            ["ils / elles", "parl**èrent**", "fin**irent**", "e**urent**"],
          ],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "常見不規則（第三人稱單數／複數）",
        table: {
          head: ["原形", "il", "ils", "原形", "il", "ils"],
          rows: [
            ["être", "fut", "furent", "avoir", "eut", "eurent"],
            ["faire", "fit", "firent", "dire", "dit", "dirent"],
            ["venir", "vint", "vinrent", "voir", "vit", "virent"],
            ["prendre", "prit", "prirent", "mettre", "mit", "mirent"],
            ["pouvoir", "put", "purent", "naître", "naquit", "naquirent"],
          ],
          fr: [0, 1, 2, 3, 4, 5],
        },
      },
      {
        t: "和未完成過去式搭配",
        d: "文學敘述中，簡單過去式負責「事件」，未完成過去式負責「背景」，就像口語中的複合過去式與未完成過去式。",
        ex: [["La nuit **tombait** quand il **entra**.", "夜幕降臨時，他走了進來。"]],
      },
    ],
    pitfalls: [{ wrong: "Il venit.", right: "Il vint.", why: "venir、tenir 的簡單過去式是 vint、tint。" }],
  },
  {
    id: "subjonctif-imparfait",
    summary: "虛擬式未完成過去式只出現在文學作品，主句是過去式時使用。現代法語一律改用虛擬式現在式。",
    rules: [
      {
        t: "形成方式",
        d: "用簡單過去式的 tu 形式，去掉 -s，加上 -sse、-sses、-t、-ssions、-ssiez、-ssent。第三人稱單數的最後一個母音要加長音符號。",
        table: {
          head: ["原形", "簡單過去式 tu", "qu'il", "qu'ils"],
          rows: [
            ["parler", "tu parlas", "parl**ât**", "parla**ssent**"],
            ["finir", "tu finis", "fin**ît**", "fini**ssent**"],
            ["être", "tu fus", "f**ût**", "fu**ssent**"],
            ["avoir", "tu eus", "e**ût**", "eu**ssent**"],
            ["venir", "tu vins", "v**înt**", "vi**nssent**"],
          ],
          fr: [0, 1, 2, 3],
        },
      },
      {
        t: "長音符號是關鍵",
        d: "qu'il fût（虛擬式）和 il fut（簡單過去式）只差一個長音符號。",
        ex: [["Il fallait qu'il **partît**.", "他必須離開。（現代：qu'il parte）"]],
      },
      {
        t: "虛擬式愈過去式",
        d: "avoir、être 的虛擬式未完成過去式 + 過去分詞：qu'il eût fini、qu'elle fût partie。文學中也可以代替條件式過去式：J'eusse aimé…（＝J'aurais aimé）。",
      },
    ],
    pitfalls: [{ wrong: "Bien qu'il fut malade…", right: "Bien qu'il fût malade…", why: "虛擬式的第三人稱單數有長音符號。" }],
  },
  {
    id: "expressions",
    summary: "慣用語讓法文更道地。很多和身體、動物、食物有關，字面意思和實際意思差很遠。",
    rules: [
      {
        t: "身體",
        table: {
          head: ["慣用語", "意思"],
          rows: [
            ["coûter les yeux de la tête", "貴得要命"],
            ["avoir le bras long", "有門路、有影響力"],
            ["casser les pieds à qqn", "讓人很煩"],
            ["mettre les pieds dans le plat", "說錯話、哪壺不開提哪壺"],
            ["avoir un poil dans la main", "很懶"],
          ],
          fr: [0],
        },
      },
      {
        t: "動物",
        table: {
          head: ["慣用語", "意思"],
          rows: [
            ["poser un lapin à qqn", "放某人鴿子"],
            ["avoir le cafard", "心情低落"],
            ["avoir une faim de loup", "餓得要命"],
            ["quand les poules auront des dents", "永遠不可能"],
            ["dormir comme un loir", "睡得很熟"],
          ],
          fr: [0],
        },
      },
      {
        t: "食物",
        table: {
          head: ["慣用語", "意思"],
          rows: [
            ["raconter des salades", "胡說八道"],
            ["être haut comme trois pommes", "很矮小（多指小孩）"],
            ["tomber dans les pommes", "昏倒"],
            ["c'est du gâteau", "很簡單"],
            ["ne pas être dans son assiette", "身體不舒服、不對勁"],
          ],
          fr: [0],
        },
      },
      {
        t: "例子",
        ex: [
          ["Ce sac **coûte les yeux de la tête**.", "這個包貴得要命。"],
          ["Il m'a **posé un lapin** hier soir.", "他昨晚放我鴿子。"],
        ],
      },
    ],
  },
  {
    id: "registres",
    summary: "法文有三種主要語域：通俗語、標準語、雅語。考試的書面表達一定要用標準語或雅語。",
    rules: [
      {
        t: "三種語域對照",
        table: {
          head: ["通俗語（familier）", "標準語（courant）", "雅語（soutenu）", "意思"],
          rows: [
            ["le boulot", "le travail", "l'emploi, la profession", "工作"],
            ["le fric, le pognon", "l'argent", "les fonds", "錢"],
            ["la bagnole", "la voiture", "le véhicule", "車"],
            ["bouffer", "manger", "se restaurer", "吃"],
            ["bosser", "travailler", "œuvrer", "工作（動詞）"],
            ["un mec", "un homme", "un individu", "男人"],
          ],
          fr: [0, 1, 2],
        },
      },
      {
        t: "文法上的差別",
        d: "通俗語：省略 ne（J'sais pas）、用 on 代替 nous、問句只靠語調（Tu viens ?）、ça 代替 cela。\n雅語：保留 ne、使用倒裝問句（Viendrez-vous ?）、使用簡單過去式和虛擬式未完成過去式。",
        ex: [
          ["J'sais pas. → Je ne sais pas. → Je l'ignore.", "我不知道。（通俗 → 標準 → 雅語）"],
        ],
      },
    ],
    pitfalls: [{ wrong: "（正式信件）Salut Monsieur,", right: "Monsieur,", why: "正式書信開頭只寫 Monsieur 或 Madame。" }],
  },
  {
    id: "collocations",
    summary: "搭配詞是「固定搭在一起的字」，中文直譯常常不對。背單字時連動詞一起背。",
    rules: [
      {
        t: "常見名詞搭配的動詞",
        table: {
          head: ["名詞", "搭配動詞", "中文"],
          rows: [
            ["une décision", "prendre", "做決定"],
            ["une question", "poser", "提問"],
            ["des mesures", "prendre", "採取措施"],
            ["une erreur / un crime", "commettre", "犯錯／犯罪"],
            ["un discours", "prononcer", "發表演說"],
            ["un rôle", "jouer", "扮演角色"],
            ["un succès", "remporter", "獲得成功"],
            ["attention", "faire", "注意"],
          ],
          fr: [0, 1],
        },
      },
      {
        t: "近義詞的細微差別",
        table: {
          head: ["詞", "用法"],
          rows: [
            ["an / année", "an 數年數（trois ans）；année 強調期間（toute l'année）"],
            ["jour / journée", "jour 指日子；journée 指一整天的時間（bonne journée）"],
            ["savoir / connaître", "savoir 知道事實或會做；connaître 認識人、地方"],
            ["amener / emmener", "amener 帶來；emmener 帶走"],
          ],
          fr: [0],
        },
      },
    ],
    pitfalls: [
      { wrong: "faire une décision", right: "prendre une décision", why: "「做決定」是 prendre une décision。" },
      { wrong: "demander une question", right: "poser une question", why: "「提問」是 poser une question。" },
    ],
  },
  {
    id: "inversion",
    summary: "某些副詞放在句首時，主詞和動詞要倒裝；引述別人的話時，引述動詞也要倒裝。",
    rules: [
      {
        t: "需要倒裝的副詞",
        table: {
          head: ["副詞", "例子", "意思"],
          rows: [
            ["peut-être", "Peut-être viendra-t-il.", "或許他會來。"],
            ["sans doute", "Sans doute a-t-il oublié.", "他大概忘了。"],
            ["à peine… que", "À peine était-il sorti qu'il se mit à pleuvoir.", "他才剛出門就下雨了。"],
            ["aussi（因此）", "Aussi avons-nous décidé de partir.", "因此我們決定離開。"],
            ["ainsi", "Ainsi s'acheva la guerre.", "戰爭就這樣結束了。"],
            ["encore（可是仍要）", "Encore faut-il le vouloir.", "但還得要有意願。"],
          ],
          fr: [0, 1],
        },
      },
      {
        t: "名詞主詞的複合倒裝",
        d: "主詞是名詞時，名詞留在前面，再用代名詞倒裝。",
        ex: [["Peut-être **Paul viendra-t-il**.", "或許保羅會來。"]],
      },
      {
        t: "引述倒裝",
        ex: [["« Je suis prêt », **dit-il**.", "「我準備好了。」他說。"]],
      },
      {
        t: "不倒裝的替代說法",
        d: "peut-être que 和 sans doute que 後面不倒裝：Peut-être qu'il viendra。",
      },
    ],
    pitfalls: [
      { wrong: "Peut-être il viendra.", right: "Peut-être viendra-t-il. / Peut-être qu'il viendra.", why: "peut-être 放句首要倒裝，或改用 peut-être que。" },
      { wrong: "Aussi nous avons décidé…", right: "Aussi avons-nous décidé…", why: "表示「因此」的 aussi 放句首要倒裝。" },
    ],
  },
  {
    id: "concession-litteraire",
    summary: "文學語體的讓步句型表達「無論多麼…、不管什麼…」，大多接虛擬式。",
    rules: [
      {
        t: "句型總表",
        table: {
          head: ["句型", "意思", "例子"],
          rows: [
            ["si / aussi + 形容詞 + que + 虛擬式", "無論多麼", "Si riche qu'il soit, il est seul."],
            ["quelque + 形容詞 + que + 虛擬式", "無論多麼（書面）", "Quelque habile qu'il soit…"],
            ["tout + 形容詞 + que + 直陳式", "雖然很…", "Tout riche qu'il est, il vit simplement."],
            ["quel(le)(s) que + être 虛擬式 + 名詞", "不管是什麼", "Quelle que soit ta décision…"],
            ["quoi que + 虛擬式", "不管做什麼", "Quoi que tu fasses…"],
            ["où que + 虛擬式", "不管在哪", "Où que tu ailles…"],
            ["qui que + 虛擬式", "不管是誰", "Qui que vous soyez…"],
          ],
          fr: [0, 2],
        },
      },
      {
        t: "quel que 要配合後面的主詞",
        ex: [
          ["**Quels que** soient ses défauts…", "不管他有什麼缺點…（défauts 陽性複數）"],
          ["**Quelle que** soit l'heure…", "不管幾點…（heure 陰性單數）"],
        ],
      },
      {
        t: "quoique 和 quoi que",
        d: "quoique（一個字）＝bien que，雖然；quoi que（兩個字）＝不管什麼。",
      },
    ],
    pitfalls: [
      { wrong: "Quelque soit ta décision…", right: "Quelle que soit ta décision…", why: "接 être 和名詞時要寫成分開的 quel que，並配合名詞。" },
      { wrong: "Quoique tu fasses, je t'aime.", right: "Quoi que tu fasses, je t'aime.", why: "「不管你做什麼」是 quoi que。" },
    ],
  },
  {
    id: "connecteurs-soutenus",
    summary: "正式語體的連接詞讓論述更精準、更有文采，DALF 寫作和學術文章常用。",
    rules: [
      {
        t: "依功能分類",
        table: {
          head: ["功能", "連接詞", "意思"],
          rows: [
            ["補充", "qui plus est, de surcroît, au demeurant", "更何況、此外"],
            ["強調", "non seulement… mais encore", "不但…而且"],
            ["讓步", "il n'en reste pas moins que, toujours est-il que", "儘管如此，事實仍是"],
            ["結果", "partant, dès lors, de sorte que", "因此、從此"],
            ["換句話說", "en d'autres termes, autrement dit", "換句話說"],
            ["遞進否定", "a fortiori, à plus forte raison", "更不用說"],
            ["假設", "pour autant que, dans la mesure où", "就…而言、只要"],
            ["時間", "désormais, dorénavant", "從今以後"],
          ],
          fr: [1],
        },
      },
      {
        t: "例子",
        ex: [
          ["Le projet est coûteux ; **il n'en reste pas moins qu'**il est nécessaire.", "這個計畫很貴，但它仍然是必要的。"],
          ["Il ne sait pas nager ; **a fortiori**, il ne traversera pas le lac.", "他不會游泳，更別說游過湖了。"],
        ],
      },
      {
        t: "ne serait-ce que",
        d: "＝哪怕只是、即使只是。",
        ex: [["Appelle-moi, **ne serait-ce que** pour me rassurer.", "打給我吧，哪怕只是讓我安心。"]],
      },
    ],
    pitfalls: [{ wrong: "Il n'en reste pas moins qu'il soit nécessaire.", right: "Il n'en reste pas moins qu'il est nécessaire.", why: "這個句型陳述事實，接直陳式。" }],
  },
];
