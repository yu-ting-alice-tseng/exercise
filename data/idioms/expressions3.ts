import type { Idiom } from "@/lib/idiomTypes";

/** 法文慣用語（第三批）。例句為本站原創。 */
export const EXPRESSIONS_3: Idiom[] = [
  // 說話與溝通
  { fr: "c’est du chinois (pour moi)", lit: "（對我來說）這是中文", zh: "完全看不懂、像天書一樣。", eq: "有看沒有懂、像天書", ex: ["Ce contrat, c’est du chinois pour moi !", "這份合約對我來說根本是天書！"], reg: "courant", level: "A2", th: "parole", note: "法國人覺得中文最難懂，就像我們說「像火星文」。" },
  { fr: "parler français comme une vache espagnole", lit: "說法文像一頭西班牙母牛", zh: "法文說得很爛。", eq: "破法文", ex: ["Quand je suis arrivé, je parlais français comme une vache espagnole.", "我剛來的時候，法文講得超爛。"], reg: "familier", level: "B2", th: "parole" },
  { fr: "avoir la langue bien pendue", lit: "舌頭掛得很好", zh: "很會說話、話很多。", eq: "能言善道、話匣子", ex: ["Ma grand-mère a la langue bien pendue, elle parle à tout le monde.", "我奶奶很會講話，跟誰都能聊。"], reg: "courant", level: "B2", th: "parole" },
  { fr: "être bavard comme une pie", lit: "像喜鵲一樣多話", zh: "非常多話。", eq: "嘰嘰喳喳", ex: ["Ce matin, ma fille est bavarde comme une pie.", "我女兒今天早上話超多。"], reg: "courant", level: "B1", th: "parole" },
  { fr: "tenir sa langue", lit: "抓住自己的舌頭", zh: "保守秘密、忍住不說。", eq: "守口如瓶", ex: ["C’est une surprise pour Léa, alors tiens ta langue !", "這是給蕾雅的驚喜，所以別說出去！"], reg: "courant", level: "B1", th: "parole" },
  { fr: "vendre la mèche", lit: "賣掉引信", zh: "洩露秘密。", eq: "走漏風聲、說溜嘴", ex: ["Qui a vendu la mèche ? Elle sait tout pour la fête !", "誰說溜嘴了？她已經知道派對的事了！"], reg: "courant", level: "B2", th: "parole" },
  { fr: "couper la parole à qqn", lit: "切斷某人的話", zh: "打斷別人說話。", eq: "插話、打斷", ex: ["Arrête de me couper la parole, laisse-moi finir !", "別再打斷我，讓我說完！"], reg: "courant", level: "B1", th: "parole" },
  { fr: "ne pas mâcher ses mots", lit: "不嚼自己的字", zh: "說話很直接，不留情面。", eq: "直言不諱", ex: ["Ma cheffe ne mâche pas ses mots : mon rapport était mauvais.", "我主管說話很直接：我的報告很差。"], reg: "courant", level: "B2", th: "parole" },
  { fr: "mettre les points sur les i", lit: "在 i 上面點上點", zh: "把話說清楚、講明白。", eq: "把話挑明", ex: ["Je vais mettre les points sur les i : personne ne part avant dix-huit heures.", "我把話說清楚：六點以前誰都不准走。"], reg: "courant", level: "C1", th: "parole" },
  { fr: "avoir le dernier mot", lit: "有最後一句話", zh: "爭論時佔上風、說了算。", eq: "佔上風、說了算", ex: ["Avec ma sœur, impossible de discuter : elle veut toujours avoir le dernier mot.", "跟我姊沒辦法討論：她總要佔上風。"], reg: "courant", level: "B2", th: "parole" },
  { fr: "parler à tort et à travers", lit: "錯錯亂亂地說", zh: "不經思考亂說話。", eq: "信口開河", ex: ["Il parle à tort et à travers de choses qu’il ne connaît pas.", "他對自己不懂的事信口開河。"], reg: "courant", level: "C1", th: "parole" },
  { fr: "casser du sucre sur le dos de qqn", lit: "在某人背上敲碎糖", zh: "在背後說人壞話。", eq: "背後說閒話", ex: ["Dès qu’elle sort, ils cassent du sucre sur son dos.", "她一出去，他們就在背後說她壞話。"], reg: "familier", level: "C1", th: "parole" },
  { fr: "faire marcher qqn", lit: "讓某人走路", zh: "捉弄某人、讓人信以為真。", eq: "耍人、唬人", ex: ["Tu as gagné un million ? Tu me fais marcher !", "你贏了一百萬？你在耍我吧！"], reg: "familier", level: "B1", th: "parole" },
  { fr: "jeter un froid", lit: "丟出一股冷意", zh: "讓氣氛一下子冷掉、變尷尬。", eq: "氣氛瞬間凍結", ex: ["Sa blague sur le divorce a jeté un froid.", "他那個離婚笑話讓氣氛瞬間冷掉。"], reg: "courant", level: "B2", th: "parole" },
  { fr: "dire ses quatre vérités à qqn", lit: "對某人說出他的四個真相", zh: "直截了當地說出別人的缺點。", eq: "當面數落", ex: ["J’en ai eu assez, je lui ai dit ses quatre vérités.", "我受夠了，就當面把他數落了一頓。"], reg: "courant", level: "C1", th: "parole" },
  { fr: "monter sur ses grands chevaux", lit: "騎上自己的高頭大馬", zh: "突然發火、擺出高姿態。", eq: "大發雷霆", ex: ["Pas la peine de monter sur tes grands chevaux, je posais juste une question.", "不必發這麼大的火，我只是問個問題。"], reg: "courant", level: "C1", th: "parole" },
  { fr: "prendre qqn au mot", lit: "抓住某人的話", zh: "把別人隨口說的話當真。", eq: "說到做到（逼人兌現）", ex: ["Tu as dit que tu ferais la vaisselle ? Je te prends au mot !", "你說你會洗碗？那我就當真囉！"], reg: "courant", level: "B2", th: "parole" },

  // 錢與工作
  { fr: "jeter l’argent par les fenêtres", lit: "把錢從窗戶丟出去", zh: "亂花錢、揮霍。", eq: "揮金如土", ex: ["Acheter un nouveau téléphone chaque année, c’est jeter l’argent par les fenêtres.", "每年換新手機，簡直是在亂花錢。"], reg: "courant", level: "B1", th: "argent" },
  { fr: "être fauché comme les blés", lit: "像麥子一樣被割光", zh: "身無分文、窮光蛋。", eq: "窮到脫褲", ex: ["Je ne peux pas venir au restaurant, je suis fauché comme les blés.", "我不能去餐廳，我窮到沒錢了。"], reg: "familier", level: "B2", th: "argent", note: "fauché 在口語中就是「沒錢的」。" },
  { fr: "être payé au lance-pierres", lit: "用彈弓發薪水", zh: "薪水很低。", eq: "薪水少得可憐", ex: ["Il travaille beaucoup, mais il est payé au lance-pierres.", "他工作很多，但薪水少得可憐。"], reg: "familier", level: "C1", th: "argent" },
  { fr: "travailler d’arrache-pied", lit: "工作到腳都要拔出來", zh: "拚命努力工作。", eq: "埋頭苦幹", ex: ["Elle a travaillé d’arrache-pied pour réussir le concours.", "她為了考上那個考試拚命用功。"], reg: "courant", level: "C1", th: "argent" },
  { fr: "mettre la clé sous la porte", lit: "把鑰匙放在門下", zh: "（店家、公司）關門倒閉。", eq: "關門大吉", ex: ["Après trente ans, la librairie du quartier a mis la clé sous la porte.", "開了三十年後，社區的書店關門了。"], reg: "courant", level: "C1", th: "argent" },
  { fr: "être sur la paille", lit: "睡在稻草上", zh: "窮困潦倒。", eq: "一貧如洗", ex: ["Après la faillite, ils se sont retrouvés sur la paille.", "破產之後，他們變得一貧如洗。"], reg: "courant", level: "C1", th: "argent" },
  { fr: "c’est donné", lit: "這是送的", zh: "非常便宜。", eq: "便宜到像送的", ex: ["Dix euros pour ce manteau ? C’est donné !", "這件大衣十歐元？簡直像送的！"], reg: "familier", level: "B1", th: "argent" },
  { fr: "se faire avoir", lit: "讓自己被擁有", zh: "被騙、被坑。", eq: "被坑、上當", ex: ["Cinquante euros pour un taxi de dix minutes ? Tu t’es fait avoir !", "十分鐘的計程車五十歐元？你被坑了！"], reg: "familier", level: "B1", th: "argent" },
  { fr: "payer rubis sur l’ongle", lit: "在指甲上付紅寶石", zh: "如數付清、一毛不少。", eq: "一次付清", ex: ["Il a payé la voiture rubis sur l’ongle.", "他把車錢一次付清。"], reg: "soutenu", level: "C1", th: "argent" },
  { fr: "tirer son épingle du jeu", lit: "把自己的別針從遊戲裡拿出來", zh: "在困難中全身而退、從中獲利。", eq: "全身而退", ex: ["Malgré la crise, cette petite entreprise a su tirer son épingle du jeu.", "儘管遇到危機，這家小公司還是全身而退。"], reg: "courant", level: "C1", th: "argent" },
  { fr: "faire des économies de bouts de chandelle", lit: "省下蠟燭頭", zh: "在微不足道的小地方省錢。", eq: "省小錢花大錢", ex: ["Éteindre le frigo la nuit ? Ce sont des économies de bouts de chandelle.", "晚上把冰箱關掉？這是在省小錢。"], reg: "courant", level: "C1", th: "argent" },
  { fr: "se tuer à la tâche", lit: "在工作中把自己殺死", zh: "拚命工作到累垮。", eq: "過勞", ex: ["Prends des vacances, ne te tue pas à la tâche.", "去休個假吧，別把自己累垮。"], reg: "courant", level: "C1", th: "argent" },
  { fr: "vouloir le beurre et l’argent du beurre", lit: "既要奶油又要賣奶油的錢", zh: "什麼好處都想要。", eq: "魚與熊掌想兼得", ex: ["Il veut travailler moins et gagner plus : il veut le beurre et l’argent du beurre.", "他想少做事又多賺錢：什麼好處都想要。"], reg: "courant", level: "B2", th: "argent" },
  { fr: "faire un tabac", lit: "做出一片菸草", zh: "大受歡迎、大成功。", eq: "大賣、轟動", ex: ["Son premier roman a fait un tabac.", "她的第一本小說大賣。"], reg: "familier", level: "B2", th: "argent" },
  { fr: "se vendre comme des petits pains", lit: "像小麵包一樣賣出", zh: "非常熱賣。", eq: "賣到缺貨", ex: ["Ces billets se vendent comme des petits pains.", "這些票賣到缺貨。"], reg: "courant", level: "B2", th: "argent" },

  // 動物
  { fr: "reprendre du poil de la bête", lit: "重新長出野獸的毛", zh: "恢復元氣、重新振作。", eq: "重振旗鼓", ex: ["Après sa grippe, il reprend du poil de la bête.", "流感過後，他漸漸恢復元氣。"], reg: "courant", level: "C1", th: "animaux" },
  { fr: "avoir la puce à l’oreille", lit: "耳朵裡有跳蚤", zh: "起了疑心。", eq: "起疑", ex: ["Son silence m’a mis la puce à l’oreille.", "他的沉默讓我起了疑心。"], reg: "courant", level: "C1", th: "animaux", note: "常說 mettre la puce à l’oreille à qqn（讓某人起疑）。" },
  { fr: "être copains comme cochons", lit: "像豬一樣要好", zh: "感情非常好。", eq: "好得像穿一條褲子", ex: ["Depuis l’école primaire, ils sont copains comme cochons.", "從小學開始，他們就好得像穿一條褲子。"], reg: "familier", level: "B2", th: "animaux" },
  { fr: "avoir un caractère de cochon", lit: "有豬的個性", zh: "脾氣很壞。", eq: "臭脾氣", ex: ["Il est gentil, mais le matin, il a un caractère de cochon.", "他人很好，但早上脾氣很差。"], reg: "familier", level: "B2", th: "animaux" },
  { fr: "avoir une langue de vipère", lit: "有毒蛇的舌頭", zh: "說話刻薄、愛說人壞話。", eq: "毒舌", ex: ["Méfie-toi d’elle, elle a une langue de vipère.", "小心她，她嘴巴很毒。"], reg: "courant", level: "B2", th: "animaux" },
  { fr: "faire le pied de grue", lit: "擺出鶴的腳", zh: "站著等很久。", eq: "苦等", ex: ["J’ai fait le pied de grue devant le cinéma pendant une heure.", "我在電影院前面站著等了一小時。"], reg: "courant", level: "C1", th: "animaux" },
  { fr: "être un ours", lit: "是一頭熊", zh: "孤僻、不喜歡社交。", eq: "孤僻", ex: ["Mon oncle est un ours, il ne vient jamais aux fêtes.", "我叔叔很孤僻，從來不參加聚會。"], reg: "courant", level: "B2", th: "animaux" },
  { fr: "avoir des yeux de lynx", lit: "有猞猁的眼睛", zh: "眼力非常好。", eq: "眼尖", ex: ["Elle a vu l’erreur tout de suite, elle a des yeux de lynx.", "她馬上就看到錯誤，眼睛真尖。"], reg: "courant", level: "C1", th: "animaux" },
  { fr: "rentrer dans sa coquille", lit: "縮回自己的殼裡", zh: "變得內向、退縮。", eq: "縮回殼裡", ex: ["Dès qu’on lui pose une question personnelle, il rentre dans sa coquille.", "一問他私人問題，他就縮回殼裡。"], reg: "courant", level: "B2", th: "animaux" },
  { fr: "c’est un panier de crabes", lit: "這是一籃螃蟹", zh: "一群人互相鬥爭、勾心鬥角。", eq: "勾心鬥角", ex: ["Ce service est un vrai panier de crabes.", "這個部門根本是勾心鬥角的地方。"], reg: "courant", level: "C1", th: "animaux" },
  { fr: "se regarder en chiens de faïence", lit: "像陶瓷狗一樣互看", zh: "互相敵視地瞪著對方。", eq: "大眼瞪小眼", ex: ["Depuis leur dispute, ils se regardent en chiens de faïence.", "吵架之後，他們就互相瞪著對方。"], reg: "courant", level: "C1", th: "animaux" },
  { fr: "tomber comme des mouches", lit: "像蒼蠅一樣掉下來", zh: "一個接一個倒下（生病等）。", eq: "接連倒下", ex: ["Avec la grippe, les élèves tombent comme des mouches.", "流感來了，學生一個接一個病倒。"], reg: "courant", level: "B2", th: "animaux" },
  { fr: "un vent à décorner les bœufs", lit: "能把牛角吹掉的風", zh: "非常強的風。", eq: "狂風大作", ex: ["Ne prends pas ton parapluie, il y a un vent à décorner les bœufs.", "別帶傘了，風大到可以把傘吹走。"], reg: "courant", level: "C1", th: "animaux" },

  // 身體
  { fr: "se lever du pied gauche", lit: "用左腳起床", zh: "一早起來心情就不好。", eq: "起床氣", ex: ["Laisse-le tranquille, il s’est levé du pied gauche.", "別煩他，他今天有起床氣。"], reg: "courant", level: "B1", th: "corps" },
  { fr: "avoir l’estomac dans les talons", lit: "胃跑到腳跟去了", zh: "餓得要命。", eq: "餓到前胸貼後背", ex: ["On mange quand ? J’ai l’estomac dans les talons !", "什麼時候吃飯？我餓到前胸貼後背了！"], reg: "familier", level: "B2", th: "corps" },
  { fr: "avoir les jambes en coton", lit: "腿是棉花做的", zh: "腿軟、沒力氣。", eq: "腿軟", ex: ["Après la course, j’avais les jambes en coton.", "跑完步，我的腿都軟了。"], reg: "courant", level: "B2", th: "corps" },
  { fr: "faire froid dans le dos", lit: "讓背脊發冷", zh: "讓人毛骨悚然。", eq: "毛骨悚然", ex: ["Cette histoire de fantôme me fait froid dans le dos.", "這個鬼故事讓我毛骨悚然。"], reg: "courant", level: "B2", th: "corps" },
  { fr: "se mordre les doigts", lit: "咬自己的手指", zh: "很後悔。", eq: "後悔莫及", ex: ["Je me mords les doigts de ne pas avoir acheté ces billets plus tôt.", "我很後悔沒早點買那些票。"], reg: "courant", level: "B2", th: "corps" },
  { fr: "mettre sa main au feu", lit: "把手放進火裡", zh: "敢打包票、非常確定。", eq: "敢打包票", ex: ["C’est lui qui a mangé le gâteau, j’en mettrais ma main au feu !", "是他吃了蛋糕，我敢打包票！"], reg: "courant", level: "C1", th: "corps" },
  { fr: "avoir la tête sur les épaules", lit: "頭在肩膀上", zh: "頭腦清楚、很理智。", eq: "腳踏實地、有頭腦", ex: ["Elle est jeune, mais elle a la tête sur les épaules.", "她雖然年輕，但很理智。"], reg: "courant", level: "B2", th: "corps" },
  { fr: "avoir les chevilles qui enflent", lit: "腳踝腫起來", zh: "變得驕傲自大。", eq: "自我膨脹", ex: ["Depuis son succès, il a les chevilles qui enflent.", "成功之後，他就自我膨脹了。"], reg: "familier", level: "C1", th: "corps" },
  { fr: "donner un coup de pouce", lit: "給一下大拇指", zh: "幫一點小忙、推一把。", eq: "助一臂之力", ex: ["Ses parents lui ont donné un coup de pouce pour acheter son appartement.", "他爸媽幫了他一把，讓他買了公寓。"], reg: "courant", level: "B1", th: "corps" },
  { fr: "avoir le compas dans l’œil", lit: "眼睛裡有圓規", zh: "目測很準。", eq: "眼睛就是尺", ex: ["Il coupe le gâteau en huit parts parfaites, il a le compas dans l’œil.", "他把蛋糕切成八等份，眼睛就是尺。"], reg: "courant", level: "C1", th: "corps" },
  { fr: "être sur les rotules", lit: "跪在膝蓋骨上", zh: "累到不行。", eq: "累趴", ex: ["Après le déménagement, on était tous sur les rotules.", "搬完家，我們全都累趴了。"], reg: "familier", level: "C1", th: "corps" },

  // 食物
  { fr: "occupe-toi de tes oignons", lit: "管好你自己的洋蔥", zh: "少管閒事。", eq: "關你什麼事", ex: ["Avec qui je sors ? Occupe-toi de tes oignons !", "我跟誰出去？少管閒事！"], reg: "familier", level: "B2", th: "nourriture", note: "也說 ce ne sont pas tes oignons（不關你的事）。" },
  { fr: "avoir le melon", lit: "有一顆甜瓜", zh: "自以為了不起。", eq: "大頭症", ex: ["Depuis qu’il a été promu, il a le melon.", "升職之後他就得了大頭症。"], reg: "familier", level: "B2", th: "nourriture" },
  { fr: "poireauter", lit: "像韭蔥一樣站著", zh: "苦等很久。", eq: "枯等", ex: ["J’ai poireauté deux heures à la préfecture.", "我在行政機關枯等了兩個小時。"], reg: "familier", level: "B2", th: "nourriture" },
  { fr: "tourner au vinaigre", lit: "變成醋", zh: "（情況）惡化、變僵。", eq: "鬧僵", ex: ["La discussion a vite tourné au vinaigre.", "討論很快就鬧僵了。"], reg: "courant", level: "C1", th: "nourriture" },
  { fr: "être dans les choux", lit: "在高麗菜裡", zh: "排名落後、失敗了。", eq: "墊底", ex: ["Après la troisième course, notre équipe est dans les choux.", "第三場比賽後，我們隊已經墊底了。"], reg: "familier", level: "C1", th: "nourriture" },
  { fr: "mettre les petits plats dans les grands", lit: "把小盤子放進大盤子裡", zh: "盛情款待、大費周章準備。", eq: "隆重款待", ex: ["Pour l’anniversaire de mamie, ils ont mis les petits plats dans les grands.", "為了奶奶的生日，他們隆重準備了一桌。"], reg: "courant", level: "C1", th: "nourriture" },
  { fr: "c’est du pain béni", lit: "這是祝福過的麵包", zh: "天賜良機、好得不能再好。", eq: "求之不得", ex: ["Ce stage à Paris, c’est du pain béni pour lui.", "這個巴黎的實習對他來說是求之不得的機會。"], reg: "courant", level: "C1", th: "nourriture" },

  // 顏色與數字
  { fr: "être rouge comme une tomate", lit: "紅得像番茄", zh: "臉紅（害羞或尷尬）。", eq: "臉紅得像蘋果", ex: ["Quand il lui a dit bonjour, elle est devenue rouge comme une tomate.", "他跟她打招呼時，她的臉紅得像番茄。"], reg: "courant", level: "A2", th: "couleurs" },
  { fr: "voir rouge", lit: "看見紅色", zh: "氣得要命、怒火中燒。", eq: "氣炸了", ex: ["Quand il a vu sa voiture rayée, il a vu rouge.", "看到車被刮傷，他氣炸了。"], reg: "courant", level: "B2", th: "couleurs" },
  { fr: "avoir des idées noires", lit: "有黑色的想法", zh: "有悲觀、負面的念頭。", eq: "胡思亂想、鑽牛角尖", ex: ["Quand il pleut longtemps, j’ai des idées noires.", "雨下太久的時候，我會有很負面的想法。"], reg: "courant", level: "B2", th: "couleurs" },
  { fr: "donner le feu vert", lit: "給綠燈", zh: "批准、同意。", eq: "開綠燈", ex: ["Le directeur a donné le feu vert pour le projet.", "主管批准了這個計畫。"], reg: "courant", level: "B1", th: "couleurs" },
  { fr: "se mettre au vert", lit: "把自己放進綠色裡", zh: "到鄉下休養。", eq: "回歸山林", ex: ["Ce week-end, on se met au vert dans une petite maison en Bretagne.", "這個週末，我們去布列塔尼的小房子休養。"], reg: "courant", level: "C1", th: "couleurs" },
  { fr: "c’est cousu de fil blanc", lit: "這是用白線縫的", zh: "（謊言、計謀）一眼就看穿。", eq: "破綻百出", ex: ["Son excuse est cousue de fil blanc.", "他的藉口一眼就能看穿。"], reg: "courant", level: "C1", th: "couleurs" },
  { fr: "il était moins une", lit: "差一分鐘", zh: "好險、差一點就……", eq: "千鈞一髮", ex: ["On a eu le train, mais il était moins une !", "我們趕上了火車，但好險！"], reg: "familier", level: "C1", th: "couleurs" },
  { fr: "faire les cent pas", lit: "走一百步", zh: "（焦急地）來回踱步。", eq: "來回踱步", ex: ["Pendant l’opération, il faisait les cent pas dans le couloir.", "手術時，他在走廊來回踱步。"], reg: "courant", level: "B2", th: "couleurs" },
  { fr: "être au septième ciel", lit: "在第七層天", zh: "高興極了、幸福得不得了。", eq: "飄飄欲仙", ex: ["Elle a eu son visa, elle est au septième ciel !", "她拿到簽證了，高興得不得了！"], reg: "courant", level: "B2", th: "couleurs" },
  { fr: "un de ces quatre", lit: "這四個裡的一個", zh: "改天、哪天。", eq: "改天", ex: ["On se fait un café un de ces quatre ?", "改天一起喝杯咖啡？"], reg: "familier", level: "C1", th: "couleurs" },

  // 天氣與時間
  { fr: "ce n’est pas demain la veille", lit: "明天不是前一天", zh: "不會那麼快發生、還早得很。", eq: "還早得很", ex: ["Lui, ranger sa chambre ? Ce n’est pas demain la veille !", "他會整理房間？還早得很！"], reg: "familier", level: "C1", th: "temps" },
  { fr: "renvoyer aux calendes grecques", lit: "延到希臘的朔日", zh: "無限期延後、等於不做。", eq: "遙遙無期", ex: ["Le projet de piscine a été renvoyé aux calendes grecques.", "游泳池的計畫被無限期延後了。"], reg: "soutenu", level: "C1", th: "temps", note: "calendes 是羅馬曆法的每月第一天，希臘人沒有這種曆法，所以這一天永遠不會來。" },
  { fr: "être dans le brouillard", lit: "在霧裡", zh: "一頭霧水、搞不清楚狀況。", eq: "一頭霧水", ex: ["Le matin, avant mon café, je suis complètement dans le brouillard.", "早上喝咖啡前，我腦袋一片霧水。"], reg: "courant", level: "B2", th: "temps" },
  { fr: "il n’y a pas le feu (au lac)", lit: "（湖上）沒有失火", zh: "不急、慢慢來。", eq: "急什麼", ex: ["Calme-toi, il n’y a pas le feu, on a tout notre temps.", "冷靜，不急，我們時間很充裕。"], reg: "familier", level: "B2", th: "temps" },
  { fr: "ça sent le roussi", lit: "聞到燒焦味", zh: "情況不妙。", eq: "苗頭不對", ex: ["Le chef nous convoque tous à dix-huit heures… ça sent le roussi.", "主管下午六點要召集我們所有人……苗頭不對。"], reg: "familier", level: "C1", th: "temps" },

  // 情緒與人際
  { fr: "faire la fine bouche", lit: "擺出挑剔的嘴", zh: "挑三揀四。", eq: "挑三揀四", ex: ["On t’offre un voyage, ne fais pas la fine bouche !", "人家送你一趟旅行，別挑三揀四了！"], reg: "courant", level: "C1", th: "sentiments" },
  { fr: "passer un savon à qqn", lit: "給某人抹肥皂", zh: "狠狠罵某人一頓。", eq: "罵到臭頭", ex: ["Mon père m’a passé un savon quand il a vu mes notes.", "我爸看到我的成績，把我罵到臭頭。"], reg: "familier", level: "B2", th: "sentiments" },
  { fr: "être à cheval sur qqch", lit: "騎在某事上", zh: "對某事非常講究、嚴格。", eq: "非常講究", ex: ["Mon prof est très à cheval sur la ponctualité.", "我的老師對準時非常講究。"], reg: "courant", level: "C1", th: "sentiments" },
  { fr: "se noyer dans un verre d’eau", lit: "在一杯水裡溺水", zh: "一點小事就慌了手腳。", eq: "小事就慌", ex: ["Ce n’est qu’un petit changement de programme, ne te noie pas dans un verre d’eau.", "只是行程小小改變而已，別慌成這樣。"], reg: "courant", level: "C1", th: "sentiments" },

  // 生活與處境
  { fr: "tomber à l’eau", lit: "掉進水裡", zh: "（計畫）泡湯、告吹。", eq: "泡湯", ex: ["Avec la grève, notre voyage est tombé à l’eau.", "因為罷工，我們的旅行泡湯了。"], reg: "courant", level: "B2", th: "vie" },
  { fr: "c’est le bouquet !", lit: "這是一束花", zh: "（反諷）這下更糟了、真是雪上加霜。", eq: "雪上加霜", ex: ["En retard, sous la pluie, et maintenant plus de batterie : c’est le bouquet !", "遲到、下雨，現在手機還沒電：真是雪上加霜！"], reg: "familier", level: "C1", th: "vie" },
  { fr: "vivre d’amour et d’eau fraîche", lit: "靠愛情和清水過活", zh: "只顧愛情不管現實生活。", eq: "有情飲水飽", ex: ["Ils ont vingt ans et vivent d’amour et d’eau fraîche.", "他們才二十歲，有情飲水飽。"], reg: "courant", level: "C1", th: "vie" },
];
