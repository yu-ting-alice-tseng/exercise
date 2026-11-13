import type { Idiom } from "@/lib/idiomTypes";

/** 年輕人口語（第二批）。流行語變化快、有地區差異，只適合朋友之間。例句為本站原創。 */
export const JEUNES_2: Idiom[] = [
  // 反應與感嘆
  { fr: "c’est abusé", lit: "＝ c’est exagéré, c’est incroyable", zh: "太誇張了（可以是太扯，也可以是太猛）。", eq: "太扯了", ex: ["Huit euros le café ? C’est abusé !", "咖啡八歐元？太扯了！"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "je suis choqué(e)", lit: "＝ je suis très surpris(e)", zh: "（誇張地）我驚呆了。", eq: "我傻眼", ex: ["Il a eu dix-huit à l’exam sans réviser ? Je suis choquée.", "他沒讀書考試拿十八分？我傻眼。"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "c’est une dinguerie", lit: "＝ c’est incroyable（來自 dingue＝瘋狂的）", zh: "太瘋狂了、太誇張了（多半是稱讚）。", eq: "太狂了", ex: ["Ce but à la dernière seconde, c’est une dinguerie !", "最後一秒那顆進球，太狂了！"], reg: "familier", level: "B2", th: "reactions" },
  { fr: "c’est sale", lit: "＝ c’est impressionnant（字面：很髒）", zh: "超猛、超厲害。", eq: "超猛", ex: ["Son solo de guitare, c’est sale !", "他的吉他獨奏超猛！"], reg: "familier", level: "B2", th: "reactions", note: "跟字面意思相反，是稱讚。" },
  { fr: "je suis refait(e)", lit: "＝ je suis très content(e)", zh: "我超開心、爽翻了。", eq: "爽翻", ex: ["J’ai eu les billets pour le concert, je suis refait !", "我搶到演唱會的票了，爽翻！"], reg: "familier", level: "B2", th: "reactions" },
  { fr: "je suis dead", lit: "來自英文 dead，＝ je ris beaucoup ; je suis épuisé(e)", zh: "笑死；累死。", eq: "笑死、累死", ex: ["Cette vidéo, je suis dead !", "這支影片，笑死我了！"], reg: "familier", level: "B1", th: "reactions" },
  { fr: "c’est léger", lit: "＝ c’est insuffisant（字面：很輕）", zh: "有點弱、不太夠。", eq: "有點弱", ex: ["Ton excuse, c’est un peu léger.", "你的藉口有點弱。"], reg: "familier", level: "B2", th: "reactions" },
  { fr: "c’est une masterclass", lit: "來自英文，＝ c’est une performance parfaite", zh: "完美示範、神操作。", eq: "神操作", ex: ["Sa présentation, c’était une masterclass.", "他的簡報簡直是完美示範。"], reg: "familier", level: "B2", th: "reactions" },
  { fr: "la gênance", lit: "＝ la gêne（新造字）", zh: "尷尬感。", eq: "尬", ex: ["Il a appelé la prof « maman »… la gênance !", "他叫老師「媽媽」……超尬！"], reg: "familier", level: "B2", th: "reactions" },
  { fr: "on est ensemble", lit: "＝ je te soutiens（字面：我們在一起）", zh: "我挺你；我們同一陣線（也常用來道別）。", eq: "挺你", ex: ["Bon courage pour ton exam demain, on est ensemble !", "明天考試加油，我挺你！"], reg: "familier", level: "B2", th: "reactions" },

  // 口頭禪
  { fr: "ça dit quoi ?", lit: "＝ comment ça va ? quoi de neuf ?", zh: "最近怎樣？", eq: "最近如何", ex: ["Wesh, ça dit quoi ?", "嘿，最近怎樣？"], reg: "familier", level: "B2", th: "parler" },
  { fr: "bien ou bien ?", lit: "＝ ça va ?", zh: "還好吧？（只能回答好的問候）", eq: "還好吧", ex: ["Salut frérot, bien ou bien ?", "嗨兄弟，還好吧？"], reg: "familier", level: "B2", th: "parler", note: "問題本身就沒有「不好」的選項，是故意的玩笑。" },
  { fr: "capter / tu captes ?", lit: "＝ comprendre / tu comprends ?", zh: "懂；你懂嗎？", eq: "你懂嗎", ex: ["J’ai rien capté au cours de physique.", "物理課我完全聽不懂。"], reg: "familier", level: "B1", th: "parler", note: "on se capte＝我們再聯絡、再碰面。" },
  { fr: "vas-y", lit: "＝ allez, d’accord, arrête（依語氣而定）", zh: "快點、好啊；（不耐煩時）夠了喔。", eq: "去啊、好啦", ex: ["Vas-y, raconte ! / Oh vas-y, laisse-moi tranquille.", "快說啦！／噢夠了，別煩我。"], reg: "familier", level: "B1", th: "parler" },
  { fr: "mon gars", lit: "＝ mon ami（字面：我的小夥子）", zh: "兄弟、老兄。", eq: "老兄", ex: ["T’inquiète mon gars, on va trouver une solution.", "別擔心老兄，我們會找到辦法的。"], reg: "familier", level: "B1", th: "parler" },

  // 人與關係
  { fr: "la team / la bande", lit: "＝ le groupe d’amis", zh: "朋友圈、一群朋友。", eq: "朋友們", ex: ["Ce soir, soirée pizza avec toute la team !", "今晚和整群朋友吃披薩！"], reg: "familier", level: "B1", th: "relations" },
  { fr: "un date", lit: "來自英文，＝ un rendez-vous amoureux", zh: "約會。", eq: "約會", ex: ["Elle a un date samedi avec un garçon de l’appli.", "她星期六要跟交友軟體上的一個男生約會。"], reg: "familier", level: "B1", th: "relations" },
  { fr: "la friendzone", lit: "來自英文", zh: "被當成「只是朋友」。", eq: "好人卡", ex: ["Il est amoureux d’elle, mais il est dans la friendzone.", "他喜歡她，但被她當成朋友。"], reg: "familier", level: "B1", th: "relations" },
  { fr: "être maqué(e)", lit: "＝ être en couple", zh: "有對象了、名草有主。", eq: "死會了", ex: ["Laisse tomber, il est maqué depuis deux ans.", "算了吧，他兩年前就死會了。"], reg: "familier", level: "C1", th: "relations" },
  { fr: "un charo", lit: "＝ un dragueur lourd（來自 charognard）", zh: "很煩的搭訕男、花心男。", eq: "搭訕魔人", ex: ["Il drague toutes les filles de la soirée, quel charo !", "他把派對上每個女生都搭訕了一遍，真是搭訕魔人！"], reg: "familier", level: "C1", th: "relations", note: "是貶低人的字，開玩笑時才用。" },
  { fr: "un(e) ex", lit: "＝ un ancien copain / une ancienne copine", zh: "前任。", eq: "前任", ex: ["J’ai croisé mon ex au supermarché, c’était gênant.", "我在超市遇到前任，好尷尬。"], reg: "familier", level: "A2", th: "relations" },
  { fr: "un hater / les haters", lit: "來自英文", zh: "黑粉、酸民。", eq: "酸民", ex: ["Ne lis pas les commentaires, ce sont des haters.", "別看留言，那些都是酸民。"], reg: "familier", level: "B1", th: "relations" },

  // 來自阿拉伯語與非洲法語
  { fr: "kho / khey", lit: "來自阿拉伯語，＝ frère, ami", zh: "兄弟、朋友。", eq: "兄弟", ex: ["Merci kho, t’es le meilleur !", "謝了兄弟，你最棒了！"], reg: "familier", level: "C1", th: "origines" },
  { fr: "le flouze", lit: "來自阿拉伯語，＝ l’argent", zh: "錢。", ex: ["J’ai plus de flouze, tu m’invites ?", "我沒錢了，你請我？"], reg: "familier", level: "C1", th: "origines" },
  { fr: "le kif", lit: "來自阿拉伯語，＝ le plaisir", zh: "樂趣、享受。", eq: "爽", ex: ["Une glace au soleil, c’est le kif !", "在陽光下吃冰淇淋，超享受！"], reg: "familier", level: "B2", th: "origines", note: "動詞 kiffer（超喜歡）也是從這個字來的。" },

  // 英文借字
  { fr: "c’est fake", lit: "來自英文", zh: "這是假的。", eq: "假的", ex: ["Cette photo du requin dans la rue, c’est fake.", "那張鯊魚在街上的照片是假的。"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "googler", lit: "來自英文", zh: "上網查（用 Google 搜尋）。", eq: "估狗一下", ex: ["Je sais pas, google-le !", "我不知道，你估狗一下！"], reg: "familier", level: "A2", th: "anglais" },
  { fr: "binge-watcher", lit: "來自英文，＝ regarder une série d’une traite", zh: "一口氣追完整部劇。", eq: "追劇、一口氣看完", ex: ["J’ai binge-watché toute la saison ce week-end.", "這週末我一口氣追完整季。"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "un feat", lit: "來自英文 featuring", zh: "（歌曲）合作、客串。", eq: "合作曲", ex: ["Son nouveau feat avec une chanteuse belge cartonne.", "他跟一位比利時女歌手的新合作曲大紅。"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "c’est old school", lit: "來自英文", zh: "很復古、很老派。", eq: "很復古", ex: ["Un appareil photo argentique ? C’est trop old school !", "底片相機？超復古的！"], reg: "familier", level: "B1", th: "anglais" },
  { fr: "c’est good", lit: "來自英文，＝ c’est bon, c’est réglé", zh: "好了、沒問題。", eq: "OK 了", ex: ["J’ai payé l’addition, c’est good.", "我結好帳了，OK 了。"], reg: "familier", level: "A2", th: "anglais" },
  { fr: "un spoil", lit: "來自英文", zh: "劇透、爆雷的內容。", eq: "雷", ex: ["Attention, cet article contient des spoils !", "注意，這篇文章有雷！"], reg: "familier", level: "B1", th: "anglais" },

  // 簡訊與網路縮寫
  { fr: "ajd / auj", lit: "＝ aujourd’hui", zh: "今天。", ex: ["T’es libre ajd ?", "你今天有空嗎？"], reg: "familier", level: "A2", th: "sms" },
  { fr: "dac / dacc", lit: "＝ d’accord", zh: "好、OK。", ex: ["On se voit à 15 h ? – Dac !", "三點見？－好！"], reg: "familier", level: "A2", th: "sms" },
  { fr: "cv ?", lit: "＝ ça va ?", zh: "還好嗎？", ex: ["Cc, cv ?", "嗨，還好嗎？"], reg: "familier", level: "A2", th: "sms" },
  { fr: "tfq ?", lit: "＝ tu fais quoi ?", zh: "你在幹嘛？", ex: ["Tfq ce soir ?", "你今晚要幹嘛？"], reg: "familier", level: "A2", th: "sms" },
  { fr: "pcq / pck", lit: "＝ parce que", zh: "因為。", ex: ["Je viens pas, pcq je suis malade.", "我不來了，因為我生病了。"], reg: "familier", level: "A2", th: "sms" },
  { fr: "nn / ui", lit: "＝ non / oui", zh: "不／是。", ex: ["T’as mangé ? – Nn, pas encore.", "你吃了嗎？－還沒。"], reg: "familier", level: "A2", th: "sms" },
  { fr: "frr", lit: "＝ frère", zh: "兄弟。", ex: ["Merci frr", "謝了兄弟"], reg: "familier", level: "B1", th: "sms" },
  { fr: "bsx / biz", lit: "＝ bisous", zh: "親親（訊息結尾的道別）。", eq: "掰掰、親一個", ex: ["À demain, bsx !", "明天見，親一個！"], reg: "familier", level: "A2", th: "sms", note: "法國朋友、家人之間訊息結尾常加 bisous，不一定是情侶。" },
  { fr: "msg / tel", lit: "＝ message / téléphone", zh: "訊息／電話。", ex: ["Envoie-moi un msg quand t’arrives.", "你到的時候傳訊息給我。"], reg: "familier", level: "A2", th: "sms" },
];
