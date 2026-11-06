/** 每日一字與每日諺語：依日期輪替，同一天每個人看到的都一樣 */

export interface Word {
  fr: string;
  pos: string;
  zh: string;
  ex: string;
  exZh: string;
}

export const WORDS: Word[] = [
  { fr: "flâner", pos: "動詞", zh: "閒逛、漫步", ex: "J'aime flâner dans les rues de Paris le dimanche.", exZh: "我喜歡星期天在巴黎街頭閒逛。" },
  { fr: "la rentrée", pos: "陰性名詞", zh: "開學；放完暑假回到工作崗位", ex: "La rentrée scolaire a lieu début septembre.", exZh: "開學在九月初。" },
  { fr: "le goûter", pos: "陽性名詞", zh: "下午點心", ex: "Les enfants prennent leur goûter à seize heures.", exZh: "孩子們下午四點吃點心。" },
  { fr: "dépaysant", pos: "形容詞", zh: "令人有身處異地之感的", ex: "Ce voyage au Maroc était vraiment dépaysant.", exZh: "這趟摩洛哥之旅真的很有異國風情。" },
  { fr: "la grasse matinée", pos: "陰性名詞", zh: "睡懶覺", ex: "Le dimanche, je fais la grasse matinée.", exZh: "星期天我會睡到很晚。" },
  { fr: "bouquiner", pos: "動詞（口語）", zh: "看書", ex: "Elle adore bouquiner dans un café.", exZh: "她很喜歡在咖啡館看書。" },
  { fr: "la flemme", pos: "陰性名詞（口語）", zh: "懶得動", ex: "J'ai la flemme de sortir ce soir.", exZh: "我今晚懶得出門。" },
  { fr: "chouette", pos: "形容詞（口語）", zh: "很棒的", ex: "C'est chouette, ton nouvel appartement !", exZh: "你的新公寓好棒！" },
  { fr: "la balade", pos: "陰性名詞", zh: "散步、兜風", ex: "On fait une balade au bord de la Seine ?", exZh: "我們去塞納河邊散個步？" },
  { fr: "savourer", pos: "動詞", zh: "細細品嚐", ex: "Prends le temps de savourer ton café.", exZh: "慢慢品嚐你的咖啡吧。" },
  { fr: "se débrouiller", pos: "反身動詞", zh: "設法應付、還過得去", ex: "Je me débrouille bien en français maintenant.", exZh: "我現在法文還算應付得來。" },
  { fr: "le coup de foudre", pos: "陽性名詞", zh: "一見鍾情", ex: "Quand j'ai vu cette ville, ça a été le coup de foudre.", exZh: "我一看到這座城市就愛上了。" },
  { fr: "la bise", pos: "陰性名詞", zh: "貼臉頰打招呼", ex: "En France, on se fait souvent la bise pour se dire bonjour.", exZh: "在法國，打招呼時常常互相貼臉頰。" },
  { fr: "les retrouvailles", pos: "陰性複數名詞", zh: "重逢", ex: "Nos retrouvailles après dix ans ont été très émouvantes.", exZh: "我們十年後重逢，非常感動。" },
  { fr: "le terroir", pos: "陽性名詞", zh: "風土（某地的特產與傳統）", ex: "Ce fromage est un produit du terroir.", exZh: "這種起司是當地的風土特產。" },
  { fr: "l'esprit d'escalier", pos: "陽性名詞", zh: "事後才想到該怎麼回答", ex: "J'ai trouvé la bonne réponse trop tard : c'est l'esprit d'escalier !", exZh: "我太晚才想到該怎麼回嘴，真是事後諸葛！" },
  { fr: "la convivialité", pos: "陰性名詞", zh: "歡樂融洽的氣氛", ex: "J'aime la convivialité des repas en famille.", exZh: "我喜歡家庭聚餐的溫馨氣氛。" },
  { fr: "épanouissant", pos: "形容詞", zh: "讓人成長、充實的", ex: "Enseigner est un métier très épanouissant.", exZh: "教書是一份很充實的工作。" },
  { fr: "le quotidien", pos: "陽性名詞", zh: "日常生活", ex: "Le sport fait partie de mon quotidien.", exZh: "運動是我日常生活的一部分。" },
  { fr: "la vitrine", pos: "陰性名詞", zh: "櫥窗", ex: "À Noël, les vitrines des grands magasins sont magnifiques.", exZh: "聖誕節時，百貨公司的櫥窗非常漂亮。" },
  { fr: "le marché", pos: "陽性名詞", zh: "市集、傳統市場", ex: "Le samedi matin, nous faisons les courses au marché.", exZh: "星期六早上我們去市集買菜。" },
  { fr: "s'ennuyer", pos: "反身動詞", zh: "感到無聊", ex: "Je ne m'ennuie jamais quand je lis.", exZh: "我看書時從不覺得無聊。" },
  { fr: "le rêve", pos: "陽性名詞", zh: "夢想", ex: "Vivre un an en France, c'est mon rêve.", exZh: "在法國住一年是我的夢想。" },
  { fr: "la madeleine de Proust", pos: "陰性名詞", zh: "勾起往事回憶的東西", ex: "Cette chanson, c'est ma madeleine de Proust.", exZh: "這首歌會讓我想起往事。" },
  { fr: "râler", pos: "動詞（口語）", zh: "抱怨、發牢騷", ex: "Les Français adorent râler, dit-on.", exZh: "據說法國人很愛抱怨。" },
  { fr: "le pique-nique", pos: "陽性名詞", zh: "野餐", ex: "Il fait beau : on organise un pique-nique ?", exZh: "天氣很好，我們來野餐吧？" },
  { fr: "épuisé", pos: "形容詞", zh: "筋疲力盡的", ex: "Après ce long voyage, je suis épuisé.", exZh: "長途旅行之後，我累壞了。" },
  { fr: "la nostalgie", pos: "陰性名詞", zh: "懷舊、鄉愁", ex: "Il parle de son enfance avec nostalgie.", exZh: "他帶著懷念談起童年。" },
  { fr: "émerveiller", pos: "動詞", zh: "使驚嘆", ex: "Les lumières de la ville m'ont émerveillé.", exZh: "城市的燈光讓我驚嘆不已。" },
  { fr: "la flânerie", pos: "陰性名詞", zh: "漫無目的的閒逛", ex: "Une après-midi de flânerie, rien de mieux !", exZh: "閒逛一整個下午，再好不過了！" },
];

export interface Proverb {
  fr: string;
  zh: string;
}

export const PROVERBS: Proverb[] = [
  { fr: "Petit à petit, l'oiseau fait son nid.", zh: "鳥兒一點一點築巢：積少成多，慢慢來。" },
  { fr: "Qui ne tente rien n'a rien.", zh: "不嘗試就一無所獲。" },
  { fr: "Après la pluie, le beau temps.", zh: "雨過天晴。" },
  { fr: "Vouloir, c'est pouvoir.", zh: "有志者事竟成。" },
  { fr: "C'est en forgeant qu'on devient forgeron.", zh: "打鐵才能成為鐵匠：熟能生巧。" },
  { fr: "Mieux vaut tard que jamais.", zh: "晚做總比不做好。" },
  { fr: "L'habit ne fait pas le moine.", zh: "穿上僧袍不等於是僧人：人不可貌相。" },
  { fr: "Rien ne sert de courir, il faut partir à point.", zh: "跑得快沒用，要及時出發（拉封丹寓言〈龜兔賽跑〉）。" },
  { fr: "Chacun son goût.", zh: "各有所好。" },
  { fr: "Paris ne s'est pas fait en un jour.", zh: "巴黎不是一天造成的。" },
  { fr: "Les petits ruisseaux font les grandes rivières.", zh: "小溪匯成大河：涓滴成流。" },
  { fr: "Tout vient à point à qui sait attendre.", zh: "懂得等待的人，好事自然會來。" },
  { fr: "La nuit porte conseil.", zh: "睡一覺再做決定。" },
  { fr: "Il faut tourner sa langue sept fois dans sa bouche avant de parler.", zh: "說話前要先把舌頭在嘴裡轉七圈：三思而後言。" },
  { fr: "Qui va lentement va sûrement.", zh: "慢慢走，走得穩。" },
  { fr: "Il n'y a pas de fumée sans feu.", zh: "無風不起浪。" },
];

/** 以當地日期計算的天數（每天午夜換一次） */
export function dayNumber(t: number): number {
  const d = new Date(t);
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86_400_000);
}
