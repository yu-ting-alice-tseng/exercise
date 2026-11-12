import type { Idiom } from "@/lib/idiomTypes";

/** 法文口語與俚語（第二批）。例句為本站原創。 */
export const FAMILIER_2: Idiom[] = [
  // 常用口語詞
  { fr: "un gamin / une gamine", lit: "＝ un enfant", zh: "小孩、小鬼。", ex: ["Les gamins jouent au foot dans la cour.", "小鬼們在院子裡踢足球。"], reg: "familier", level: "A2", th: "mots" },
  { fr: "un gosse", lit: "＝ un enfant", zh: "小孩。", ex: ["Ils ont trois gosses et un chien.", "他們有三個小孩和一隻狗。"], reg: "familier", level: "B1", th: "mots", note: "在加拿大魁北克，gosse 是粗俗的字，到那裡要避免。" },
  { fr: "le pinard", lit: "＝ le vin", zh: "葡萄酒（尤其是便宜的）。", ex: ["On apporte une bouteille de pinard pour le dîner ?", "晚餐我們帶一瓶酒去？"], reg: "familier", level: "B2", th: "mots" },
  { fr: "une clope", lit: "＝ une cigarette", zh: "一根菸。", ex: ["Il sort fumer une clope toutes les heures.", "他每小時都出去抽根菸。"], reg: "familier", level: "B1", th: "mots" },
  { fr: "les fringues", lit: "＝ les vêtements", zh: "衣服。", ex: ["Elle a acheté plein de fringues pendant les soldes.", "她在打折季買了一大堆衣服。"], reg: "familier", level: "B1", th: "mots" },
  { fr: "les godasses / les pompes", lit: "＝ les chaussures", zh: "鞋子。", ex: ["Enlève tes godasses, j’ai lavé le sol !", "把鞋子脫掉，我剛拖完地！"], reg: "familier", level: "B2", th: "mots" },
  { fr: "le pieu / le plumard", lit: "＝ le lit", zh: "床。", ex: ["Je suis crevé, je vais au pieu.", "我累死了，要去睡了。"], reg: "familier", level: "B2", th: "mots" },
  { fr: "roupiller / pioncer", lit: "＝ dormir", zh: "睡覺。", ex: ["Chut, le bébé roupille !", "噓，寶寶在睡覺！"], reg: "familier", level: "B2", th: "mots" },
  { fr: "se balader", lit: "＝ se promener", zh: "散步、閒逛。", ex: ["On s’est baladés au bord du canal tout l’après-midi.", "我們整個下午都在運河邊散步。"], reg: "familier", level: "A2", th: "mots" },
  { fr: "piger", lit: "＝ comprendre", zh: "懂、搞懂。", ex: ["Tu piges ce qu’il raconte, toi ?", "你聽得懂他在說什麼嗎？"], reg: "familier", level: "B1", th: "mots" },
  { fr: "filer", lit: "＝ partir vite ; donner", zh: "趕快走；給。", ex: ["Je file, mon train part dans dix minutes ! Tu me files ton numéro ?", "我先走了，火車十分鐘後開！可以給我你的電話嗎？"], reg: "familier", level: "B1", th: "mots" },
  { fr: "bouquiner / un bouquin", lit: "＝ lire / un livre", zh: "看書；書。", ex: ["Le dimanche, j’aime bouquiner au lit.", "星期天我喜歡在床上看書。"], reg: "familier", level: "B1", th: "mots" },
  { fr: "un toubib", lit: "＝ un médecin", zh: "醫生。", ex: ["Tu tousses depuis une semaine, va voir un toubib.", "你已經咳了一星期，去看醫生吧。"], reg: "familier", level: "B2", th: "mots", note: "來自阿拉伯語的「醫生」。" },
  { fr: "un bahut", lit: "＝ un lycée, un collège", zh: "學校（中學）。", ex: ["On se retrouve devant le bahut à huit heures.", "我們八點在學校門口碰面。"], reg: "familier", level: "B2", th: "mots" },
  { fr: "se casser la figure", lit: "＝ tomber", zh: "摔一跤；失敗。", ex: ["Il a glissé sur la glace et il s’est cassé la figure.", "他在冰上滑倒，摔了一大跤。"], reg: "familier", level: "B1", th: "mots" },
  { fr: "rigoler", lit: "＝ rire, plaisanter", zh: "笑、開玩笑。", ex: ["Tu rigoles ? C’est pas possible !", "你在開玩笑嗎？不可能吧！"], reg: "familier", level: "A2", th: "mots" },
  { fr: "c’est pas terrible", lit: "＝ ce n’est pas très bon", zh: "不怎麼樣、不太好。", eq: "普普通通", ex: ["Le film ? C’était pas terrible.", "那部電影？不怎麼樣。"], reg: "familier", level: "A2", th: "mots", note: "terrible 在口語裡常是「很棒」，所以 pas terrible＝不太好。" },
  { fr: "nul / c’est nul", lit: "＝ mauvais", zh: "很爛、很遜。", eq: "爛透了", ex: ["Je suis nul en maths.", "我數學很爛。"], reg: "familier", level: "A2", th: "mots" },
  { fr: "sympa", lit: "＝ sympathique", zh: "人很好、很不錯。", ex: ["Tes amis sont super sympas !", "你的朋友人都超好！"], reg: "familier", level: "A1", th: "mots" },
  { fr: "un bouchon", lit: "＝ un embouteillage（字面：瓶塞）", zh: "塞車。", eq: "塞車", ex: ["Il y a des bouchons sur l’autoroute, on va être en retard.", "高速公路在塞車，我們會遲到。"], reg: "courant", level: "B1", th: "mots" },

  // 回應與感嘆
  { fr: "oh là là", lit: "（感嘆詞）", zh: "天啊、哎呀（驚訝、擔心、不耐煩）。", eq: "天哪", ex: ["Oh là là, j’ai oublié mes clés !", "天啊，我忘了帶鑰匙！"], reg: "courant", level: "A1", th: "reponses", note: "法國人真的常說，但不太會說成外國人想像的 ooh la la 那種曖昧語氣。" },
  { fr: "bah / ben", lit: "（口頭語）＝ eh bien", zh: "嗯、就……（猶豫、理所當然）。", eq: "呃、就", ex: ["Pourquoi t’es pas venu ? – Ben, j’étais malade.", "你為什麼沒來？－就……我生病了。"], reg: "familier", level: "A2", th: "reponses" },
  { fr: "ouais", lit: "＝ oui", zh: "對啊、嗯。", ex: ["Tu viens ? – Ouais, j’arrive.", "你要來嗎？－嗯，我來了。"], reg: "familier", level: "A1", th: "reponses" },
  { fr: "c’est pas vrai !", lit: "＝ incroyable", zh: "不會吧！真的假的！", eq: "真的假的", ex: ["J’ai gagné au loto ! – C’est pas vrai !", "我中樂透了！－不會吧！"], reg: "familier", level: "A2", th: "reponses" },
  { fr: "n’importe quoi !", lit: "＝ c’est absurde", zh: "胡說八道！亂講！", eq: "亂講", ex: ["Les chats détestent la musique ? N’importe quoi !", "貓討厭音樂？亂講！"], reg: "familier", level: "A2", th: "reponses" },
  { fr: "ça marche", lit: "＝ d’accord", zh: "好、沒問題。", eq: "OK", ex: ["On se retrouve à midi ? – Ça marche !", "中午碰面？－好！"], reg: "familier", level: "A2", th: "reponses" },
  { fr: "c’est clair", lit: "＝ c’est évident, je suis d’accord", zh: "那還用說、完全同意。", eq: "那當然", ex: ["Ce gâteau est incroyable. – C’est clair !", "這蛋糕太好吃了。－那還用說！"], reg: "familier", level: "B1", th: "reponses" },
  { fr: "y a pas de souci / pas de souci", lit: "＝ il n’y a pas de problème", zh: "沒問題、不客氣。", eq: "沒問題", ex: ["Merci de m’avoir aidé ! – Pas de souci.", "謝謝你幫我！－不客氣。"], reg: "familier", level: "A2", th: "reponses", note: "很常用，但有些人覺得在正式場合應該說 il n’y a pas de problème 或 je vous en prie。" },
  { fr: "je m’en fiche", lit: "＝ ça m’est égal", zh: "我不在乎。", eq: "無所謂", ex: ["Rouge ou bleu, je m’en fiche, choisis !", "紅的藍的我都無所謂，你選！"], reg: "familier", level: "B1", th: "reponses" },
  { fr: "ça craint", lit: "＝ c’est nul, c’est dangereux", zh: "很糟、很遜；很危險。", eq: "很瞎、很危險", ex: ["Plus de batterie et on est perdus, ça craint !", "沒電又迷路了，糟透了！"], reg: "familier", level: "B1", th: "reponses" },
  { fr: "chapeau !", lit: "（字面：帽子）＝ bravo", zh: "佩服！厲害！", eq: "佩服佩服", ex: ["Tu as couru un marathon ? Chapeau !", "你跑完一場馬拉松？佩服！"], reg: "familier", level: "B1", th: "reponses", note: "源自脫帽致敬。" },

  // 倒序詞（verlan）
  { fr: "un keuf", lit: "verlan de « flic »", zh: "警察。", ex: ["Attention, il y a des keufs au coin de la rue.", "小心，街角有警察。"], reg: "familier", level: "B2", th: "verlan" },
  { fr: "une teuf", lit: "verlan de « fête »", zh: "派對。", ex: ["Il y a une teuf chez Léo samedi, tu viens ?", "星期六在雷歐家有派對，你要來嗎？"], reg: "familier", level: "B2", th: "verlan" },
  { fr: "zarbi", lit: "verlan de « bizarre »", zh: "怪怪的。", ex: ["Ce film est un peu zarbi, mais j’ai aimé.", "這部電影有點怪，但我喜歡。"], reg: "familier", level: "B2", th: "verlan" },
  { fr: "un keum", lit: "verlan de « mec »", zh: "男生、傢伙；男朋友。", ex: ["C’est son nouveau keum.", "那是她的新男友。"], reg: "familier", level: "B2", th: "verlan" },
  { fr: "le reuf / la reus", lit: "verlan de « frère » / « sœur »", zh: "兄弟／姊妹（也叫好朋友）。", ex: ["Mon reuf m’a prêté sa console.", "我哥借了我他的遊戲機。"], reg: "familier", level: "C1", th: "verlan" },
  { fr: "la reum / le reup", lit: "verlan de « mère » / « père »", zh: "老媽／老爸。", ex: ["Ma reum veut que je rentre avant minuit.", "我媽要我十二點前回家。"], reg: "familier", level: "C1", th: "verlan" },
  { fr: "cimer", lit: "verlan de « merci »", zh: "謝啦。", ex: ["Cimer pour le coup de main !", "謝啦幫忙！"], reg: "familier", level: "B2", th: "verlan" },
  { fr: "téma", lit: "verlan de « mater »（＝ regarder）", zh: "你看、看一下。", ex: ["Téma la voiture, elle est trop belle !", "你看那台車，超帥的！"], reg: "familier", level: "B2", th: "verlan" },
  { fr: "c’est auch", lit: "verlan de « chaud »", zh: "很難搞、很危險（＝ c’est chaud）。", ex: ["Rentrer à pied à trois heures du mat, c’est auch.", "凌晨三點走路回家，很危險。"], reg: "familier", level: "C1", th: "verlan" },
  { fr: "un ripou", lit: "verlan de « pourri »", zh: "貪污的人（多指警察）。", ex: ["Dans ce film, le flic est un ripou.", "在這部電影裡，那個警察是貪污的。"], reg: "familier", level: "C1", th: "verlan", note: "1984 年的電影 Les Ripoux 讓這個字流行起來。" },
  { fr: "le tromé", lit: "verlan de « métro »", zh: "地鐵。", ex: ["On prend le tromé ou on marche ?", "我們搭地鐵還是走路？"], reg: "familier", level: "C1", th: "verlan" },

  // 簡稱與省略
  { fr: "le petit-déj, le dej", lit: "＝ le petit-déjeuner, le déjeuner", zh: "早餐、午餐（簡稱）。", ex: ["On se voit pour le dej demain ?", "明天一起吃午餐？"], reg: "familier", level: "A2", th: "abreviations" },
  { fr: "l’apéro", lit: "＝ l’apéritif", zh: "餐前小酌（含小點心）。", ex: ["Venez à la maison pour l’apéro vers dix-neuf heures !", "七點左右來我家喝餐前酒！"], reg: "familier", level: "A2", th: "abreviations", note: "朋友間的 apéro 很重要，常常一聊就聊成整晚。" },
  { fr: "le dico, le frigo, la télé", lit: "＝ le dictionnaire, le réfrigérateur, la télévision", zh: "字典、冰箱、電視（簡稱）。", ex: ["Il reste du fromage dans le frigo.", "冰箱裡還有起司。"], reg: "courant", level: "A1", th: "abreviations" },
  { fr: "le bac, la fac, la prépa", lit: "＝ le baccalauréat, la faculté, la classe préparatoire", zh: "高中會考、大學、（考大學校的）預備班。", ex: ["Après le bac, elle veut aller en prépa.", "高中會考後，她想去讀預備班。"], reg: "courant", level: "B1", th: "abreviations" },
  { fr: "sympa, extra, impec", lit: "＝ sympathique, extraordinaire, impeccable", zh: "人很好、超棒、完美（簡稱）。", ex: ["Le dîner était extra, merci !", "晚餐超棒的，謝謝！"], reg: "familier", level: "A2", th: "abreviations" },
  { fr: "y a / t’as / t’es", lit: "＝ il y a / tu as / tu es", zh: "有／你有／你是（口語的省略）。", ex: ["T’as faim ? Y a des pâtes dans le placard.", "你餓了嗎？櫃子裡有義大利麵。"], reg: "familier", level: "A2", th: "abreviations", note: "口語會省掉 il、把 tu 縮成 t’，聽力很常出現，寫作要寫完整。" },
  { fr: "chuis / j’suis", lit: "＝ je suis", zh: "我是（口語快讀）。", ex: ["Chuis crevé, j’vais me coucher.", "我累死了，我要去睡了。"], reg: "familier", level: "B1", th: "abreviations" },
];
