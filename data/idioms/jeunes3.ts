import type { Idiom } from "@/lib/idiomTypes";

/** 年輕人口語（第三批）。流行語變化快、有地區差異，只適合朋友之間。例句為本站原創。 */
export const JEUNES_3: Idiom[] = [
  // 反應與感嘆
  { fr: "trop chou", lit: "＝ très mignon（chou＝高麗菜，也是親暱稱呼）", zh: "超可愛。", eq: "好可愛", ex: ["T’as vu le bébé chat ? Il est trop chou !", "你看到那隻小貓了嗎？超可愛！"], reg: "familier", level: "A2", th: "reactions" },
  { fr: "c’est éclaté", lit: "＝ c’est nul（字面：爆開了）", zh: "很爛、很糟。", eq: "爛透了", ex: ["Le nouveau jeu est éclaté, il bugue tout le temps.", "新遊戲爛透了，一直出錯。"], reg: "familier", level: "B2", th: "reactions" },
  { fr: "c’est claqué (au sol)", lit: "＝ c’est nul（字面：摔在地上）", zh: "爛到不行。", eq: "爛到谷底", ex: ["Sa blague était claquée au sol.", "他的笑話爛到不行。"], reg: "familier", level: "B2", th: "reactions", note: "也可以說 je suis claqué＝我累死了。" },
  { fr: "j’ai pas les mots", lit: "＝ je ne sais pas quoi dire", zh: "我無言了（太扯或太驚訝）。", eq: "無言", ex: ["Il a oublié son propre anniversaire… j’ai pas les mots.", "他忘了自己的生日……我無言。"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "c’est tendu", lit: "＝ c’est difficile, c’est juste", zh: "很緊、很難搞。", eq: "很趕、很難", ex: ["Finir avant midi ? C’est tendu, mais on peut essayer.", "中午前做完？很趕，但可以試試。"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "ça part en vrille", lit: "＝ ça devient incontrôlable（字面：開始螺旋下墜）", zh: "失控了、越來越離譜。", eq: "失控、歪樓", ex: ["La soirée a commencé calmement, puis tout est parti en vrille.", "派對一開始很平靜，後來就整個失控了。"], reg: "familier", level: "B2", th: "reactions" },
  { fr: "t’es chaud ?", lit: "＝ tu as envie ? tu es partant ?", zh: "你要不要？你有興趣嗎？", eq: "要不要？", ex: ["Un foot ce soir, t’es chaud ?", "今晚踢足球，你要嗎？"], reg: "familier", level: "B1", th: "reactions", note: "回答 je suis chaud＝我超想、我要！" },
  { fr: "mytho !", lit: "＝ menteur（來自 mythomane）", zh: "騙人！你吹牛！", eq: "唬爛", ex: ["T’as serré la main de Mbappé ? Mytho !", "你跟姆巴佩握過手？唬爛！"], reg: "familier", level: "B1", th: "reactions", note: "un mytho＝很愛說謊的人。" },

  // 口頭禪
  { fr: "jure ! / j’te jure", lit: "＝ c’est vrai ? / je te le promets", zh: "真的嗎？／我發誓。", eq: "真假？／騙你幹嘛", ex: ["Il s’est fait virer ? Jure ! / J’te jure, c’est vrai.", "他被開除了？真假！／我發誓，是真的。"], reg: "familier", level: "B1", th: "parler" },
  { fr: "c’est mon délire", lit: "＝ c’est mon truc, j’aime ça", zh: "這是我的菜、我就愛這種。", eq: "我的愛", ex: ["Les vieux films en noir et blanc, c’est mon délire.", "老黑白電影是我的愛。"], reg: "familier", level: "B2", th: "parler", note: "délirer＝鬧著玩、開玩笑：on délirait entre potes。" },
  { fr: "tu m’étonnes !", lit: "＝ évidemment !（字面：你讓我驚訝）", zh: "那還用說！難怪！", eq: "廢話、難怪", ex: ["Il est fatigué ? Tu m’étonnes, il a dormi deux heures !", "他很累？那還用說，他只睡了兩小時！"], reg: "familier", level: "B2", th: "parler", note: "字面和意思相反，是反諷的說法。" },
  { fr: "trop pas", lit: "＝ pas du tout", zh: "完全不是、才怪。", eq: "才不咧", ex: ["T’es amoureux d’elle ? – Trop pas !", "你愛上她了？－才不咧！"], reg: "familier", level: "B1", th: "parler" },
  { fr: "c’était trop de la balle", lit: "＝ c’était génial", zh: "超棒的（2000 年代流行，現在有點過時）。", eq: "超讚", ex: ["Ta soirée, c’était trop de la balle !", "你的派對超讚的！"], reg: "familier", level: "B2", th: "parler", note: "現在年輕人說這個會被笑老派，比較常說 c’est le feu 或 c’est trop bien。" },

  // 人與關係
  { fr: "un(e) BFF", lit: "來自英文 best friend forever", zh: "最好的朋友、閨密。", eq: "閨密、死黨", ex: ["Je pars en vacances avec ma BFF.", "我要跟我的閨密去度假。"], reg: "familier", level: "A2", th: "relations" },
  { fr: "le / la boss", lit: "來自英文", zh: "老闆；很厲害的人。", eq: "大佬", ex: ["T’as réparé ça en deux minutes ? T’es le boss !", "你兩分鐘就修好了？你是大佬！"], reg: "familier", level: "B1", th: "relations" },
  { fr: "un rageux / une rageuse", lit: "＝ une personne jalouse, mauvais perdant", zh: "酸民、輸不起的人。", eq: "酸民", ex: ["Laisse parler les rageux, ta vidéo est super.", "別理那些酸民，你的影片很棒。"], reg: "familier", level: "B2", th: "relations" },
  { fr: "un noob", lit: "來自英文 newbie", zh: "新手、菜鳥（多用於遊戲）。", eq: "菜鳥", ex: ["Je suis un noob à ce jeu, aide-moi !", "我玩這個遊戲是菜鳥，幫幫我！"], reg: "familier", level: "B1", th: "relations" },

  // 來自阿拉伯語與非洲法語
  { fr: "la hchouma", lit: "來自阿拉伯語，＝ la honte", zh: "丟臉、可恥。", eq: "丟臉", ex: ["Arriver en retard au mariage de ta sœur ? La hchouma !", "你姊的婚禮你遲到？太丟臉了！"], reg: "familier", level: "C1", th: "origines" },
  { fr: "inchallah", lit: "來自阿拉伯語，＝ si Dieu le veut", zh: "但願如此、希望吧。", eq: "希望啦", ex: ["Tu auras ton permis la semaine prochaine ? – Inchallah !", "你下週會拿到駕照嗎？－希望啦！"], reg: "familier", level: "B2", th: "origines", note: "原本是宗教用語「若神允許」，現在很多人當成「希望啦」使用；有些人覺得不該隨便說。" },

  // 英文借字
  { fr: "un selfie", lit: "來自英文", zh: "自拍。", ex: ["On fait un selfie devant la tour Eiffel ?", "我們在艾菲爾鐵塔前自拍一張？"], reg: "courant", level: "A2", th: "anglais" },
  { fr: "c’est nice", lit: "來自英文", zh: "很不錯。", eq: "很讚", ex: ["Ton nouvel appart, c’est nice !", "你的新公寓很讚！"], reg: "familier", level: "A2", th: "anglais" },
  { fr: "être hype", lit: "來自英文", zh: "很潮、很流行。", eq: "很潮", ex: ["Ce quartier est devenu super hype.", "這一區變得超潮的。"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "ASAP", lit: "來自英文 as soon as possible", zh: "盡快。", eq: "越快越好", ex: ["Envoie-moi le fichier ASAP !", "盡快把檔案寄給我！"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "un loser", lit: "來自英文", zh: "魯蛇、失敗者。", eq: "魯蛇", ex: ["Il se sent un peu loser parce qu’il n’a pas de copine.", "他覺得自己是魯蛇，因為沒有女朋友。"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "un gamer / une gameuse", lit: "來自英文", zh: "電玩玩家。", ex: ["Mon petit frère est un vrai gamer, il joue tous les soirs.", "我弟是重度玩家，每天晚上都在玩。"], reg: "familier", level: "A2", th: "anglais" },
  { fr: "lagger", lit: "來自英文 lag", zh: "（網路、遊戲）卡、延遲。", eq: "卡卡的、lag", ex: ["Ça lagge trop, je ne peux pas jouer !", "卡爆了，我沒辦法玩！"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "rager", lit: "來自英文 rage", zh: "（尤其是打電動輸了）暴怒。", eq: "暴怒、氣噗噗", ex: ["Il a perdu trois parties d’affilée, il rage.", "他連輸三場，氣炸了。"], reg: "familier", level: "B2", th: "anglais" },
  { fr: "troller", lit: "來自英文 troll", zh: "（網路上）故意挑釁、亂留言。", eq: "釣魚、引戰", ex: ["Ne réponds pas, il essaie juste de troller.", "別回他，他只是想引戰。"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "le swag", lit: "來自英文", zh: "很有型的風格（2010 年代流行，現在有點過時）。", eq: "很有型", ex: ["Il a trop de swag avec sa casquette.", "他戴那頂帽子超有型。"], reg: "familier", level: "B1", th: "anglais", note: "現在多半是開玩笑地用。" },
  { fr: "un replay", lit: "來自英文", zh: "（節目）重播、線上回看。", ex: ["J’ai raté l’émission, je la regarderai en replay.", "我錯過了節目，之後看重播。"], reg: "courant", level: "A2", th: "anglais" },
  { fr: "un challenge", lit: "來自英文", zh: "挑戰。", ex: ["Parler français pendant tout le voyage, c’est un challenge !", "整趟旅行都說法文，是一大挑戰！"], reg: "courant", level: "A2", th: "anglais", note: "正式法文是 un défi。" },

  // 簡訊與網路縮寫
  { fr: "wsh", lit: "＝ wesh", zh: "嘿（簡訊寫法）。", ex: ["Wsh, t’es où ?", "嘿，你在哪？"], reg: "familier", level: "B1", th: "sms" },
  { fr: "lol", lit: "來自英文 laughing out loud", zh: "哈哈。", eq: "XD", ex: ["Il est tombé dans la piscine tout habillé lol", "他穿著衣服掉進泳池了哈哈"], reg: "familier", level: "A2", th: "sms", note: "法國人更常寫 mdr。" },
  { fr: "mrc / mrci", lit: "＝ merci", zh: "謝謝。", ex: ["Mrc pour hier soir !", "謝謝昨晚！"], reg: "familier", level: "A2", th: "sms" },
  { fr: "bne nuit / a2m1", lit: "＝ bonne nuit / à demain", zh: "晚安／明天見。", ex: ["Bne nuit, a2m1 !", "晚安，明天見！"], reg: "familier", level: "A2", th: "sms", note: "a2m1 是老式簡訊寫法：2 念 deux（de），1 念 un（-main 的音）。" },
  { fr: "koi / kwa", lit: "＝ quoi", zh: "什麼。", ex: ["Tu fais koi ?", "你在幹嘛？"], reg: "familier", level: "A2", th: "sms" },
  { fr: "tt / tlm", lit: "＝ tout / tout le monde", zh: "全部／大家。", ex: ["Bonne année à tlm !", "祝大家新年快樂！"], reg: "familier", level: "A2", th: "sms" },
];
