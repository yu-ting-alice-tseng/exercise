import type { Idiom } from "@/lib/idiomTypes";

/**
 * 法文口語與俚語：日常對話很常聽到，但寫作和正式場合不要用。
 * zh 寫實際意思，lit 放對應的標準法文。例句為本站原創。
 */
export const FAMILIER: Idiom[] = [
  // 常用口語詞
  { fr: "bosser", lit: "＝ travailler", zh: "工作、做事、念書。", ex: ["Je ne peux pas sortir ce soir, je dois bosser.", "我今晚不能出去，我得工作。"], reg: "familier", level: "A2", th: "mots" },
  { fr: "le boulot", lit: "＝ le travail", zh: "工作。", ex: ["Je finis le boulot à dix-huit heures.", "我六點下班。"], reg: "familier", level: "A2", th: "mots" },
  { fr: "bouffer / la bouffe", lit: "＝ manger / la nourriture", zh: "吃；食物。", ex: ["On bouffe où ce soir ? La bouffe de la cantine est nulle.", "今晚去哪吃？餐廳的東西很難吃。"], reg: "familier", level: "B1", th: "mots" },
  { fr: "le fric / le blé / la thune", lit: "＝ l’argent", zh: "錢。", eq: "錢、銀子", ex: ["Je n’ai plus de thune jusqu’à la fin du mois.", "我到月底前都沒錢了。"], reg: "familier", level: "B1", th: "mots" },
  { fr: "une bagnole", lit: "＝ une voiture", zh: "車子。", ex: ["Il a acheté une vieille bagnole pour aller au boulot.", "他買了一台老爺車去上班。"], reg: "familier", level: "B1", th: "mots" },
  { fr: "un mec / une nana", lit: "＝ un homme / une femme", zh: "男生、傢伙／女生。", ex: ["C’est qui, le mec avec le chapeau ?", "戴帽子的那傢伙是誰？"], reg: "familier", level: "A2", th: "mots", note: "mon mec 也可以指「我男朋友」。" },
  { fr: "un pote", lit: "＝ un ami", zh: "朋友、哥們。", ex: ["Je pars en vacances avec des potes.", "我跟一群朋友去度假。"], reg: "familier", level: "A2", th: "mots" },
  { fr: "un truc / un machin", lit: "＝ une chose", zh: "東西、那個什麼（想不起名字時用）。", ex: ["Passe-moi le truc, là, pour ouvrir les bouteilles.", "把那個開瓶子的東西給我。"], reg: "familier", level: "A2", th: "mots" },
  { fr: "crevé(e)", lit: "＝ très fatigué(e)", zh: "累死了。", eq: "累爆了", ex: ["J’ai couru dix kilomètres, je suis crevé.", "我跑了十公里，累死了。"], reg: "familier", level: "A2", th: "mots", note: "crevé 原本是「爆胎、刺破」的意思。" },
  { fr: "kiffer", lit: "＝ aimer beaucoup", zh: "超喜歡。", eq: "超愛", ex: ["Je kiffe trop cette chanson !", "我超愛這首歌！"], reg: "familier", level: "B1", th: "mots" },
  { fr: "galérer / c’est la galère", lit: "＝ avoir beaucoup de difficultés", zh: "吃盡苦頭；真是折騰。", eq: "好慘、超折騰", ex: ["J’ai galéré deux heures pour trouver une place de parking. Quelle galère !", "我找停車位找了兩個小時。真是折騰！"], reg: "familier", level: "B1", th: "mots", note: "la galère 原本指古代的划槳船，划船的苦役非常辛苦。" },
  { fr: "se planter", lit: "＝ se tromper, échouer", zh: "搞砸、失敗、弄錯。", ex: ["Je me suis planté à l’examen de maths.", "我數學考試考砸了。"], reg: "familier", level: "B1", th: "mots" },
  { fr: "avoir la flemme", lit: "＝ ne pas avoir envie de faire un effort", zh: "懶得做。", eq: "懶得動", ex: ["J’ai la flemme de faire la cuisine, on commande une pizza ?", "我懶得煮飯，叫個披薩好嗎？"], reg: "familier", level: "B1", th: "mots" },
  { fr: "c’est nickel", lit: "＝ c’est parfait, très propre", zh: "完美、非常乾淨。", eq: "完美、一塵不染", ex: ["Tu as nettoyé la cuisine ? C’est nickel !", "你把廚房打掃好了？超乾淨！"], reg: "familier", level: "B1", th: "mots" },
  { fr: "râler", lit: "＝ se plaindre", zh: "抱怨、發牢騷。", eq: "碎碎念、發牢騷", ex: ["Il râle tout le temps, contre la météo, contre les transports…", "他一天到晚抱怨天氣、抱怨交通……"], reg: "familier", level: "B1", th: "mots", note: "常有人開玩笑說，愛抱怨是法國人的國民運動。" },
  { fr: "se marrer", lit: "＝ rire, s’amuser", zh: "大笑、玩得很開心。", ex: ["On s’est bien marrés hier soir !", "我們昨晚笑得好開心！"], reg: "familier", level: "B1", th: "mots" },
  { fr: "un flic", lit: "＝ un policier", zh: "警察。", ex: ["Les flics ont arrêté la voiture au feu rouge.", "警察在紅燈前把車攔下來。"], reg: "familier", level: "B1", th: "mots" },
  { fr: "avoir la dalle", lit: "＝ avoir très faim", zh: "很餓。", eq: "餓扁了", ex: ["Je n’ai rien mangé depuis ce matin, j’ai la dalle !", "我從早上就什麼都沒吃，餓扁了！"], reg: "familier", level: "B1", th: "mots" },
  { fr: "avoir le seum", lit: "＝ être frustré, déçu", zh: "很嘔、很不甘心。", eq: "很嘔、超不爽", ex: ["On a perdu à la dernière minute, j’ai trop le seum.", "我們在最後一分鐘輸了，我超嘔的。"], reg: "familier", level: "B2", th: "mots", note: "年輕人用語，seum 來自阿拉伯語的「毒」。" },

  // 回應與感嘆
  { fr: "bof", lit: "＝ pas vraiment, moyen", zh: "還好吧、普普通通（不太有興趣）。", eq: "還好、普通", ex: ["Le film t’a plu ? Bof, pas trop.", "你喜歡那部電影嗎？還好吧，沒很喜歡。"], reg: "familier", level: "A2", th: "reponses" },
  { fr: "ça roule", lit: "＝ d’accord, ça va", zh: "沒問題、好喔；一切順利。", eq: "OK、沒問題", ex: ["On se voit à huit heures ? Ça roule !", "我們八點見？好喔！"], reg: "familier", level: "B1", th: "reponses" },
  { fr: "laisse tomber", lit: "＝ abandonne, oublie ça", zh: "算了吧、別管了。", eq: "算了", ex: ["Laisse tomber, ce n’est pas important.", "算了，這不重要。"], reg: "familier", level: "A2", th: "reponses" },
  { fr: "grave", lit: "＝ très, complètement", zh: "（當副詞）超級、非常；（回答）對啊、完全同意。", eq: "超、真的", ex: ["Ce gâteau est grave bon ! / Tu viens ce soir ? Grave !", "這蛋糕超好吃！／你今晚要來嗎？當然！"], reg: "familier", level: "B1", th: "reponses", note: "標準法文的 grave 是「嚴重的」，口語才有這個用法。" },
  { fr: "trop", lit: "＝ très", zh: "（口語中）很、超。", ex: ["Il est trop mignon, ton chat !", "你的貓超可愛的！"], reg: "familier", level: "A2", th: "reponses", note: "標準用法的 trop 是「太過」：c’est trop cher（太貴了）。" },
  { fr: "carrément", lit: "＝ complètement ; oui, bien sûr", zh: "完全；（回答）當然好啊。", eq: "當然、完全", ex: ["On se fait un ciné ? Carrément !", "去看個電影？當然好啊！"], reg: "familier", level: "B1", th: "reponses" },
  { fr: "c’est le pied", lit: "＝ c’est génial", zh: "太棒了、真爽。", eq: "超爽", ex: ["Pas de travail, du soleil, la plage… c’est le pied !", "不用上班、陽光、海灘……真是太爽了！"], reg: "familier", level: "B2", th: "reponses" },
  { fr: "je me casse", lit: "＝ je pars", zh: "我走了、我閃人了。", eq: "我閃了", ex: ["Il est tard, je me casse. À demain !", "很晚了，我閃了。明天見！"], reg: "familier", level: "B2", th: "reponses", note: "語氣隨便，有時聽起來沒禮貌；Casse-toi ! 是「滾開」，很不客氣。" },
  { fr: "ça me saoule", lit: "＝ ça m’ennuie, ça m’énerve", zh: "這讓我很煩。", eq: "煩死了", ex: ["Ces réunions qui durent trois heures, ça me saoule.", "那些開三個小時的會，煩死了。"], reg: "familier", level: "B2", th: "reponses", note: "也寫作 ça me soûle，soûl 原本是「喝醉的」。" },

  // 倒序詞（verlan）
  { fr: "ouf", lit: "verlan de « fou »", zh: "瘋狂的、太誇張了。", eq: "太扯了", ex: ["Il a fait le trajet à vélo en une journée ? C’est ouf !", "他一天就騎腳踏車騎完全程？太誇張了！"], reg: "familier", level: "B2", th: "verlan", note: "verlan 是把音節倒過來念的說法，verlan 本身就是 l’envers（反面）倒過來。" },
  { fr: "relou", lit: "verlan de « lourd »", zh: "很煩人的、很討厭的。", eq: "很煩", ex: ["Il répète toujours la même blague, il est relou.", "他一直講同一個笑話，很煩。"], reg: "familier", level: "B2", th: "verlan", note: "lourd 在口語中也有「（人）煩人、不識相」的意思。" },
  { fr: "chelou", lit: "verlan de « louche »", zh: "怪怪的、可疑的。", eq: "怪怪的", ex: ["Ce type qui nous suit depuis tout à l’heure, il est chelou.", "那個從剛剛一直跟著我們的人，很可疑。"], reg: "familier", level: "B2", th: "verlan" },
  { fr: "vénère", lit: "verlan de « énervé »", zh: "很生氣的。", eq: "氣炸了", ex: ["Il a raté son train, il est trop vénère.", "他錯過了火車，氣炸了。"], reg: "familier", level: "B2", th: "verlan" },
  { fr: "une meuf", lit: "verlan de « femme »", zh: "女生、女人；（ma meuf）我女朋友。", ex: ["C’est une meuf de ma classe.", "她是我班上的女生。"], reg: "familier", level: "B2", th: "verlan", note: "年輕人很常用，但對長輩或正式場合說會很失禮。" },
  { fr: "laisse béton", lit: "verlan de « laisse tomber »", zh: "算了吧。", eq: "算了", ex: ["Tu veux encore discuter ? Laisse béton.", "你還要吵？算了吧。"], reg: "familier", level: "C1", th: "verlan", note: "1970 年代流行的說法，因為歌手 Renaud 的歌而出名，現在聽起來有點復古。" },
  { fr: "chanmé", lit: "verlan de « méchant »", zh: "超棒的、超厲害的。", eq: "超猛", ex: ["Le concert d’hier soir était chanmé !", "昨晚的演唱會超猛的！"], reg: "familier", level: "C1", th: "verlan", note: "倒過來以後意思也變了：méchant 是「壞的」，chanmé 卻是稱讚。" },

  // 簡寫
  { fr: "un resto, un ciné, un appart", lit: "＝ un restaurant, un cinéma, un appartement", zh: "餐廳、電影院、公寓（口語簡稱）。", ex: ["On va au resto et après au ciné ?", "我們去餐廳，然後去看電影？"], reg: "familier", level: "A2", th: "abreviations" },
  { fr: "un ordi, un prof, la fac", lit: "＝ un ordinateur, un professeur, la faculté", zh: "電腦、老師、大學（口語簡稱）。", ex: ["Mon ordi est en panne et j’ai un devoir pour la fac demain !", "我的電腦壞了，明天還要交大學的作業！"], reg: "familier", level: "A2", th: "abreviations" },
  { fr: "à plus / à toute", lit: "＝ à plus tard / à tout à l’heure", zh: "待會見、回頭見。", eq: "掰、待會見", ex: ["Je file au supermarché, à toute !", "我趕去超市，待會見！"], reg: "familier", level: "A2", th: "abreviations", note: "簡訊常寫成 A+。à plus 的 s 要念出來。" },
  { fr: "t’inquiète", lit: "＝ ne t’inquiète pas", zh: "別擔心、沒事。", ex: ["Je te rembourse demain. – T’inquiète !", "我明天還你。－沒事啦！"], reg: "familier", level: "A2", th: "abreviations", note: "口語常把否定的 ne 省掉，這裡連 pas 都省了。" },
  { fr: "chais pas", lit: "＝ je ne sais pas", zh: "不知道。", ex: ["Il arrive quand ? – Chais pas.", "他什麼時候到？－不知道。"], reg: "familier", level: "B1", th: "abreviations", note: "口語把 je ne sais pas 念得很快就變成 chais pas，聽力時要聽得懂，寫作不要用。" },
];
