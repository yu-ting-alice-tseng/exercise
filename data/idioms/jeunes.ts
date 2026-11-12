import type { Idiom } from "@/lib/idiomTypes";

/**
 * 年輕人口語（2020 年代法國青少年與二十多歲族群常用）。
 * 流行語變化很快，也有地區差異；這些只適合朋友之間，對長輩、老師或正式場合都不要用。
 * lit 放對應的標準法文或來源，例句為本站原創。
 */
export const JEUNES: Idiom[] = [
  // 反應與感嘆
  { fr: "c’est chaud", lit: "＝ c’est difficile, c’est risqué（字面：這很熱）", zh: "這很難搞、很危險；也可以表示「太猛了」。", eq: "這很麻煩、好險", ex: ["Finir le dossier ce soir ? C’est chaud, mais on va essayer.", "今晚完成報告？很難，但我們試試看。"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "c’est le feu", lit: "＝ c’est génial（字面：這是火）", zh: "超讚、超厲害。", eq: "超猛、太讚了", ex: ["Son nouveau morceau, c’est le feu !", "他的新歌超讚！"], reg: "familier", level: "B1", th: "reactions", note: "也常加上火的表情符號。" },
  { fr: "c’est stylé", lit: "＝ c’est beau, c’est cool", zh: "很酷、很有型。", eq: "很潮、很帥", ex: ["Elles sont trop stylées, tes baskets !", "你的球鞋超有型！"], reg: "familier", level: "A2", th: "reactions" },
  { fr: "c’est mort", lit: "＝ c’est impossible, c’est fini（字面：死了）", zh: "沒戲了、不可能、門都沒有。", eq: "沒望了、免談", ex: ["Sortir ce soir avec tout ce boulot ? C’est mort.", "有這麼多工作還要今晚出去？不可能。"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "je suis mort (de rire)", lit: "＝ je ris beaucoup", zh: "笑死我了。", eq: "笑死", ex: ["T’as vu sa tête ? Je suis mort !", "你有看到他的表情嗎？笑死我了！"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "ça passe", lit: "＝ c’est acceptable", zh: "還可以、過得去；（時間上）來得及。", eq: "還行", ex: ["Le resto était cher ? Non, ça passe.", "那家餐廳貴嗎？不會，還可以。"], reg: "familier", level: "A2", th: "reactions" },
  { fr: "j’avoue", lit: "＝ c’est vrai, je suis d’accord（字面：我承認）", zh: "真的、我同意、說得也是。", eq: "對啊、真的", ex: ["Ce prof est trop sympa. – J’avoue !", "這個老師人超好。－真的！"], reg: "familier", level: "A2", th: "reactions" },
  { fr: "c’est validé / je valide", lit: "＝ j’approuve", zh: "讚、我認可、沒問題。", eq: "通過、我給讚", ex: ["Pizza et film ce soir ? Je valide !", "今晚披薩加電影？我贊成！"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "c’est carré", lit: "＝ c’est réglé, c’est parfait（字面：方方正正）", zh: "搞定了、很到位。", eq: "搞定、穩了", ex: ["J’ai réservé les billets et l’hôtel, c’est carré.", "我訂好票和飯店了，搞定。"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "t’abuses", lit: "＝ tu exagères", zh: "你太過分了、你太誇張了。", eq: "你很扯耶", ex: ["Encore en retard d’une heure ? T’abuses !", "又遲到一小時？你太誇張了！"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "être deg", lit: "＝ être dégoûté（簡稱）", zh: "很嘔、很失望。", eq: "超嘔", ex: ["Le concert est annulé, je suis trop deg.", "演唱會取消了，我超嘔的。"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "bader", lit: "＝ être triste, déprimer（來自英文 bad）", zh: "心情很低落、很喪。", eq: "很喪、心情很差", ex: ["Arrête de bader, on sort ce soir !", "別再喪了，今晚出去玩！"], reg: "familier", level: "B2", th: "reactions" },
  { fr: "être en PLS", lit: "PLS＝position latérale de sécurité（急救的復甦姿勢）", zh: "崩潰、慘兮兮、被打擊到。", eq: "崩潰、躺平", ex: ["Après l’examen de maths, toute la classe était en PLS.", "數學考完，全班都崩潰了。"], reg: "familier", level: "B2", th: "reactions", note: "原本是急救時讓昏迷者側躺的姿勢，年輕人拿來誇張地形容自己被擊垮。" },
  { fr: "il a craqué", lit: "＝ il a perdu le contrôle（字面：他裂開了）", zh: "他失控了、他崩潰了；也可以指「忍不住買了／做了」。", eq: "他暴走了、他破功了", ex: ["J’avais dit pas de chocolat cette semaine… j’ai craqué.", "我說這週不吃巧克力的……結果破功了。"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "c’est gênant / c’est malaisant", lit: "＝ c’est embarrassant", zh: "好尷尬。", eq: "尷尬、好尬", ex: ["Il a chanté devant tout le monde et personne n’a applaudi. C’était malaisant.", "他在大家面前唱歌，結果沒人鼓掌。超尬的。"], reg: "familier", level: "B1", th: "reactions", note: "malaisant 是近年才流行的新字，來自 malaise（不舒服、尷尬）。" },
  { fr: "osef", lit: "＝ on s’en fout（縮寫）", zh: "誰在乎、無所謂。", eq: "關我什麼事", ex: ["Il a changé de coupe de cheveux ? Osef.", "他換髮型了？誰在乎。"], reg: "familier", level: "B2", th: "reactions", note: "s’en foutre 是粗俗的說法，osef 聽起來很不客氣，只能跟熟朋友開玩笑時用。" },

  // 說話時的口頭禪
  { fr: "en vrai", lit: "＝ en réalité, sincèrement", zh: "說真的、其實。", eq: "說真的", ex: ["En vrai, je préfère rester à la maison ce soir.", "說真的，我今晚比較想待在家。"], reg: "familier", level: "B1", th: "parler" },
  { fr: "du coup", lit: "＝ donc, alors", zh: "所以、結果。", eq: "所以咧", ex: ["Il pleuvait, du coup on est restés au café.", "那時候在下雨，所以我們就待在咖啡館。"], reg: "familier", level: "A2", th: "parler", note: "很多人每句話都用，連大人也常用，但正式寫作要改用 donc。" },
  { fr: "genre", lit: "＝ comme, par exemple, environ", zh: "像是、大概、好像（口頭禪）。", eq: "就是那種、像是", ex: ["Il est arrivé genre à minuit, et il a fait genre qu’il dormait.", "他大概半夜才到，還裝作在睡覺。"], reg: "familier", level: "B1", th: "parler", note: "faire genre＝假裝。" },
  { fr: "en mode", lit: "＝ dans un état de…, comme…", zh: "處於……狀態、一副……的樣子。", eq: "……模式", ex: ["Ce week-end, je suis en mode canapé et séries.", "這個週末我是沙發追劇模式。"], reg: "familier", level: "B1", th: "parler" },
  { fr: "de base", lit: "＝ au départ, normalement", zh: "本來、原本。", eq: "本來", ex: ["De base, je voulais juste un café, et j’ai pris trois gâteaux.", "我本來只想喝杯咖啡，結果買了三塊蛋糕。"], reg: "familier", level: "B1", th: "parler" },
  { fr: "de ouf", lit: "＝ énorme, très（ouf 是 fou 的倒序詞）", zh: "超級、誇張地。", eq: "超、爆", ex: ["Il y avait un monde de ouf au concert !", "演唱會的人多到爆！"], reg: "familier", level: "B1", th: "parler", note: "ouf 開頭像母音，但 de ouf 習慣上不省音，不會說 d’ouf。" },
  { fr: "tranquille / tranquillou", lit: "＝ calmement, sans problème", zh: "輕鬆、沒事、放心。", eq: "穩穩的、沒問題", ex: ["T’as eu ton exam ? – Tranquille, c’était facile.", "你考試過了嗎？－輕鬆，很簡單。"], reg: "familier", level: "A2", th: "parler" },
  { fr: "bref", lit: "＝ en résumé, enfin", zh: "總之、反正。", eq: "總之", ex: ["Bref, on a raté le train et on est rentrés à pied.", "總之，我們錯過了火車，就走路回家了。"], reg: "courant", level: "A2", th: "parler" },
  { fr: "askip", lit: "＝ à ce qu’il paraît（縮讀）", zh: "聽說、好像。", eq: "聽說", ex: ["Askip, ils sortent ensemble depuis un mois.", "聽說他們已經在一起一個月了。"], reg: "familier", level: "B2", th: "parler" },
  { fr: "sah / en sah", lit: "來自阿拉伯語，＝ vraiment, c’est vrai", zh: "真的、說真的。", eq: "真的假的、認真", ex: ["Sah, t’as eu dix-neuf en maths ?", "真的嗎，你數學考十九分？"], reg: "familier", level: "B2", th: "parler", note: "法國中學成績滿分是二十分，十九分非常高。" },
  { fr: "wallah", lit: "來自阿拉伯語，＝ je te jure", zh: "我發誓、真的啦。", eq: "我發誓", ex: ["Wallah, je ne l’ai pas pris, ton chargeur !", "我發誓，我沒拿你的充電器！"], reg: "familier", level: "B2", th: "parler", note: "原本是以神之名發誓的宗教用語，現在很多年輕人當成「真的啦」使用；有些人覺得不該隨便說。" },

  // 人與關係
  { fr: "le daron / la daronne / les darons", lit: "＝ le père / la mère / les parents", zh: "老爸／老媽／爸媽。", eq: "我爸、我媽", ex: ["Je peux pas sortir, ma daronne veut que je révise.", "我不能出去，我媽要我讀書。"], reg: "familier", level: "B1", th: "relations" },
  { fr: "frérot / le frère / ma sœur", lit: "＝ mon ami（字面：兄弟、姊妹）", zh: "兄弟、姊妹（叫好朋友）。", eq: "兄弟、老哥、姊妹", ex: ["Merci frérot, je te revaudrai ça !", "謝了兄弟，改天還你！"], reg: "familier", level: "A2", th: "relations" },
  { fr: "la go", lit: "來自非洲法語，＝ la fille, la copine", zh: "女生；女朋友。", ex: ["C’est qui, la go avec le manteau rouge ?", "穿紅外套的那個女生是誰？"], reg: "familier", level: "B2", th: "relations", note: "從象牙海岸法語流行到法國，ma go＝我女朋友。" },
  { fr: "un crush", lit: "來自英文，＝ une personne qu’on aime en secret", zh: "暗戀的對象。", eq: "暗戀對象", ex: ["Mon crush m’a envoyé un message, je suis aux anges !", "我暗戀的人傳訊息給我，我快樂翻了！"], reg: "familier", level: "B1", th: "relations" },
  { fr: "pécho", lit: "choper 的倒序詞，＝ séduire, attraper", zh: "把到（約會成功）；拿到、抓到。", eq: "把到", ex: ["Il a essayé de la pécho pendant toute la soirée.", "他整晚都想把她。"], reg: "familier", level: "B2", th: "relations" },
  { fr: "ghoster qqn", lit: "來自英文 ghost", zh: "突然不回訊息、人間蒸發。", eq: "搞失聯、已讀不回", ex: ["On est sortis deux fois et après, il m’a ghostée.", "我們出去了兩次，然後他就人間蒸發了。"], reg: "familier", level: "B1", th: "relations" },
  { fr: "un(e) bg", lit: "＝ beau gosse / belle gosse", zh: "帥哥、正妹；也可以稱讚人「你人真好」。", eq: "帥哥、正妹", ex: ["Tu m’as gardé une part de gâteau ? T’es un bg !", "你有幫我留一塊蛋糕？你人太好了！"], reg: "familier", level: "B1", th: "relations" },
  { fr: "un boloss", lit: "＝ un nul, un naïf", zh: "遜咖、俗仔。", eq: "遜咖、魯蛇", ex: ["Il s’est fait avoir encore une fois, quel boloss !", "他又被騙了一次，真是遜咖！"], reg: "familier", level: "B2", th: "relations", note: "是罵人的話，開玩笑時才用。" },
  { fr: "un boomer", lit: "來自英文，＝ une personne âgée et dépassée", zh: "老古板、跟不上時代的人。", eq: "老人家、老古板", ex: ["Tu ne connais pas cette appli ? T’es un vrai boomer !", "你不知道這個 App？你真是老古板！"], reg: "familier", level: "B1", th: "relations", note: "原本指嬰兒潮世代，現在年輕人用來笑任何「很老派」的人，年紀不一定大。" },

  // 來自阿拉伯語與非洲法語
  { fr: "wesh", lit: "來自阿拉伯語，＝ salut, eh", zh: "嘿、喂（打招呼或叫人）。", eq: "嘿、欸", ex: ["Wesh, ça va ou quoi ?", "嘿，最近好嗎？"], reg: "familier", level: "B1", th: "origines" },
  { fr: "zarma", lit: "來自阿拉伯語，＝ soi-disant, genre", zh: "好像、假裝（帶嘲諷語氣）。", eq: "說得好像……", ex: ["Il est arrivé avec ses lunettes de soleil, zarma il est une star.", "他戴著墨鏡出現，好像自己是明星一樣。"], reg: "familier", level: "B2", th: "origines" },
  { fr: "miskine", lit: "來自阿拉伯語，＝ le pauvre, la pauvre", zh: "好可憐。", eq: "好可憐", ex: ["Il a perdu son téléphone le jour de son anniversaire, miskine.", "他在生日那天弄丟了手機，好可憐。"], reg: "familier", level: "B2", th: "origines" },
  { fr: "c’est la hess", lit: "來自阿拉伯語，＝ c’est la galère, on n’a pas d’argent", zh: "好窮、好慘。", eq: "窮到脫褲、好慘", ex: ["Fin du mois, plus un centime… c’est la hess.", "月底了，一毛錢都沒了……好慘。"], reg: "familier", level: "B2", th: "origines" },
  { fr: "le bled", lit: "來自阿拉伯語，＝ le pays d’origine ; un village perdu", zh: "老家（父母的家鄉）；鳥不生蛋的鄉下。", eq: "老家；鄉下地方", ex: ["Cet été, je vais au bled voir mes grands-parents.", "今年夏天我要回老家看爺爺奶奶。"], reg: "familier", level: "B1", th: "origines" },
  { fr: "chouf", lit: "來自阿拉伯語，＝ regarde", zh: "你看、看一下。", eq: "你看", ex: ["Chouf, il y a ton prof là-bas !", "你看，你的老師在那裡！"], reg: "familier", level: "B2", th: "origines" },
  { fr: "s’enjailler", lit: "來自象牙海岸法語，＝ s’amuser, faire la fête", zh: "玩得很開心、嗨起來。", eq: "嗨翻、玩瘋", ex: ["Samedi, on s’est enjaillés jusqu’à trois heures du matin !", "星期六我們玩到凌晨三點！"], reg: "familier", level: "B2", th: "origines", note: "來自英文 enjoy，經過象牙海岸法語再流行到法國。" },

  // 英文借字
  { fr: "c’est cringe", lit: "來自英文 cringe", zh: "很尷尬、讓人起雞皮疙瘩。", eq: "好尬", ex: ["Sa vidéo de danse est trop cringe.", "他那支跳舞影片超尬的。"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "le mood", lit: "來自英文，＝ l’humeur, l’ambiance", zh: "心情、氛圍。", eq: "心情、感覺", ex: ["Pluie, plaid et chocolat chaud : c’est le mood du jour.", "下雨、毯子加熱可可：今天的心情就是這樣。"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "flexer / faire un flex", lit: "來自英文 flex", zh: "炫耀。", eq: "炫富、秀", ex: ["Il poste sa nouvelle montre sur Insta juste pour flexer.", "他把新手錶貼到 IG 上只是為了炫耀。"], reg: "familier", level: "B2", th: "anglais" },
  { fr: "chiller", lit: "來自英文 chill，＝ se détendre", zh: "放鬆、耍廢。", eq: "放空、耍廢", ex: ["Ce soir, on chille à la maison, rien de prévu.", "今晚我們在家放鬆，沒什麼計畫。"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "spoiler", lit: "來自英文，＝ révéler la fin", zh: "爆雷。", eq: "爆雷", ex: ["Ne me spoile pas la fin de la série !", "別爆這部影集的結局給我！"], reg: "familier", level: "A2", th: "anglais", note: "官方建議的法文說法是 divulgâcher，但很少人用。" },
  { fr: "un banger", lit: "來自英文", zh: "超好聽、超嗨的歌。", eq: "神曲", ex: ["Cette chanson, c’est un banger, je l’écoute en boucle.", "這首歌是神曲，我一直重複聽。"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "random", lit: "來自英文，＝ au hasard ; bizarre, quelconque", zh: "隨便的、莫名其妙的、普通的。", eq: "很隨機、莫名其妙", ex: ["Un mec random m’a demandé mon numéro dans le bus.", "公車上一個不認識的男生跟我要電話。"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "checker", lit: "來自英文 check，＝ vérifier", zh: "確認、查看。", ex: ["Attends, je checke mes messages.", "等一下，我看一下訊息。"], reg: "familier", level: "A2", th: "anglais" },
  { fr: "liker / un like", lit: "來自英文", zh: "按讚；讚。", eq: "按讚", ex: ["Elle a liké toutes mes photos !", "她把我所有照片都按讚了！"], reg: "familier", level: "A2", th: "anglais" },
  { fr: "c’est un fail", lit: "來自英文", zh: "失敗、搞砸了。", eq: "翻車", ex: ["J’ai voulu faire un gâteau, c’est un fail total.", "我想做蛋糕，結果徹底翻車。"], reg: "familier", level: "B1", th: "anglais" },

  // 簡訊與網路縮寫
  { fr: "mdr / ptdr", lit: "＝ mort de rire / pété de rire", zh: "哈哈、笑死（相當於英文的 lol）。", eq: "哈哈、XD", ex: ["T’as vu la vidéo du chat ? Mdr !", "你看了那隻貓的影片嗎？笑死！"], reg: "familier", level: "A2", th: "sms" },
  { fr: "tkt", lit: "＝ t’inquiète (pas)", zh: "別擔心、沒事。", ex: ["Dsl pour le retard ! – Tkt", "抱歉遲到了！－沒事"], reg: "familier", level: "A2", th: "sms" },
  { fr: "jsp", lit: "＝ je (ne) sais pas", zh: "不知道。", ex: ["On mange où ? – Jsp, t’as une idée ?", "要去哪吃？－不知道，你有想法嗎？"], reg: "familier", level: "A2", th: "sms" },
  { fr: "dsl", lit: "＝ désolé(e)", zh: "抱歉。", ex: ["Dsl, j’ai pas vu ton message.", "抱歉，我沒看到你的訊息。"], reg: "familier", level: "A2", th: "sms" },
  { fr: "slt / cc / bjr", lit: "＝ salut / coucou / bonjour", zh: "嗨、哈囉、你好。", ex: ["Cc ! Tu fais quoi ce soir ?", "嗨！你今晚要幹嘛？"], reg: "familier", level: "A2", th: "sms" },
  { fr: "stp / svp", lit: "＝ s’il te plaît / s’il vous plaît", zh: "拜託、請。", ex: ["Tu peux acheter du pain stp ?", "你可以買個麵包嗎，拜託？"], reg: "familier", level: "A2", th: "sms" },
  { fr: "jpp", lit: "＝ j’en peux plus", zh: "受不了了；笑到不行。", eq: "崩潰、笑到不行", ex: ["Encore trois heures de cours, jpp.", "還有三小時的課，我受不了了。"], reg: "familier", level: "B1", th: "sms" },
  { fr: "oklm", lit: "＝ au calme", zh: "放鬆地、悠哉地。", eq: "悠哉", ex: ["Dimanche oklm, plage et glace.", "悠哉的星期天，海灘加冰淇淋。"], reg: "familier", level: "B2", th: "sms", note: "因為饒舌歌手 Booba 的歌而流行。" },
  { fr: "pk / pq", lit: "＝ pourquoi", zh: "為什麼。", ex: ["Pk tu réponds pas ?", "你為什麼不回？"], reg: "familier", level: "A2", th: "sms" },
  { fr: "mtn / bcp / tjrs", lit: "＝ maintenant / beaucoup / toujours", zh: "現在／很多／總是。", ex: ["Je suis dispo mtn, merci bcp !", "我現在有空，非常謝謝！"], reg: "familier", level: "A2", th: "sms" },
  { fr: "jtm", lit: "＝ je t’aime", zh: "我愛你。", ex: ["Bonne nuit, jtm ❤", "晚安，愛你"], reg: "familier", level: "A2", th: "sms" },
  { fr: "rdv / qd / qqn", lit: "＝ rendez-vous / quand / quelqu’un", zh: "約、碰面／什麼時候／某人。", ex: ["Rdv à 18 h devant la gare, qd tu veux.", "六點在車站前碰面，你看什麼時候都可以。"], reg: "familier", level: "A2", th: "sms" },
];
