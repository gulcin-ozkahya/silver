/* ============================================================
   OZKAHYA STUDIO — ÜRÜN LİSTESİ
   ------------------------------------------------------------
   Yeni ürün eklemek için aşağıdaki listeye yeni bir blok ekleyin.
   Bir ürünü siteden kaldırmak için o bloğu silin.

   Her ürünün alanları:
     ad        : Ürünün adı
     kategori  : "kolye" | "kupe" | "yuzuk" | "bileklik" | "bilezik"
     fiyat     : Yazı olarak fiyat. Boş bırakırsanız fiyat satırı görünmez.
     shopier   : Ürünün Shopier satış sayfası. Boşsa satın alma düğmesi görünmez.
     gorsel    : tek fotoğraf  -> "gorseller/adi.jpg"
     gorseller : fotoğraf sırası -> [tam ürün, detay, kullanımda]
                 İlk fotoğraf kartta görünür; fare gelince diğer fotoğraflar sırayla kayar.
                 Pencerede altta küçük kareler çıkar, tıklayarak geçilir.
     aciklama  : Kısa tanıtım yazısı
     detay     : Malzeme / ölçü gibi bilgiler
     adEn, aciklamaEn, detayEn : Bu alanların İngilizce karşılıkları
     oneCikan  : true ise ana sayfada gösterilir
     stok      : false ise "Tükendi" etiketi çıkar

   NOT: Aşağıdaki ürün adları, açıklamalar ve ölçüler fotoğraflara
   bakılarak yazıldı; annenizle teyit edip düzeltin. Fiyatlar boş
   bırakıldı, fiyat satırı sitede gösterilmiyor.
   ============================================================ */

const URUNLER = [
  {
    ad: "Örgü Kolye",
    adEn: "Woven Necklace",
    kategori: "kolye",
    fiyat: "",
    shopier: "https://www.shopier.com/ozkahyastudio/50697128",
    gorseller: [
      "gorseller/orgu-kolye-dogal-v2.jpg",
      "gorseller/orgu-kolye-detay.jpg",
      "gorseller/orgu-kolye-takili.jpg",
    ],
    aciklama: "Yuvarlak örgü gümüş kordon, uçlarında desenli silindir kapaklar. Aynı örgüden bileklikle takım oluşturuyor.",
    aciklamaEn: "Round woven silver cord with patterned cylindrical end caps. Pairs with the bracelet in the same weave.",
    detay: "1000 ayar gümüş · Çengel kapama",
    detayEn: "1000-fineness silver · Hook closure",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Örgü Bileklik",
    adEn: "Woven Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "https://www.shopier.com/ozkahyastudio/50654083",
    gorseller: [
      "gorseller/orgu-bileklik-yeni-tam.jpg",
      "gorseller/orgu-bileklik-yeni-detay.jpg",
      "gorseller/orgu-bileklik-kolda.jpg",
    ],
    aciklama: "Yuvarlak örgü dokusu ve desenli kapaklarıyla zarif gümüş bileklik.",
    aciklamaEn: "An elegant silver bracelet with a rounded woven texture and patterned end caps.",
    detay: "1000 ayar gümüş · Çengel kapama",
    detayEn: "1000-fineness silver · Hook closure",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Sık Örgü Bileklik",
    adEn: "Dense-Weave Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "",
    gorseller: [
      "gorseller/sik-orgu-bileklik-tam.jpg",
      "gorseller/sik-orgu-bileklik-detay.jpg",
      "gorseller/sik-orgu-bileklik-kolda.jpg",
    ],
    aciklama: "Sık dokulu gümüş örgü kordon, desenli silindir kapaklar ve klipsli kapama.",
    aciklamaEn: "Densely woven silver cord with patterned cylindrical end caps and a clasp closure.",
    detay: "999 ayar gümüş · El örgüsü · Klipsli kapama",
    detayEn: "999-fineness silver · Handwoven · Clasp closure",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Mor Taşlı Kolye",
    adEn: "Purple Stone Necklace",
    kategori: "kolye",
    fiyat: "",                                  // fiyatı yazınca kartta görünür
    shopier: "https://www.shopier.com/ozkahyastudio/50654026",
    gorseller: [
      "gorseller/mor-tasli-kolye-tam-v2.jpg",
      "gorseller/mor-tasli-bileklik-tas-yakin.jpg",
      "gorseller/mor-tasli-kolye-takili.jpg",
    ],
    aciklama: "El örgüsü gümüş kordon, ortasında mor taş ve uçları püsküllü.",
    aciklamaEn: "Handwoven silver cord with a purple stone at the center and tassel ends.",
    detay: "1000 ayar gümüş · Ayarlanabilir uzunluk",
    detayEn: "1000-fineness silver · Adjustable length",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Mor Taşlı Bileklik",
    adEn: "Purple Stone Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "https://www.shopier.com/ozkahyastudio/50696994",
    gorseller: [
      "gorseller/mor-tasli-bileklik-dogal-v2.jpg",
      "gorseller/mor-tasli-bileklik-tas-yakin.jpg",
      "gorseller/mor-tasli-bileklik-kolda.jpg",
    ],
    aciklama: "İnce örgü kordonların ortasına oturtulmuş oval mor taş.",
    aciklamaEn: "An oval purple stone set between finely woven silver cords.",
    detay: "1000 ayar gümüş · Çengel kapama",
    detayEn: "1000-fineness silver · Hook closure",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "İnce Örgü Bileklik",
    adEn: "Fine Woven Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "https://www.shopier.com/ozkahyastudio/50654176",
    gorseller: [
      "gorseller/orgu-bileklik-ince-tam-v2.jpg",
      "gorseller/orgu-bileklik-ince-detay-v2.jpg",
      "gorseller/orgu-bileklik-ince-kolda.jpg",
    ],
    aciklama: "Hafif ve her güne uygun, ince burgulu örgü.",
    aciklamaEn: "A lightweight, finely twisted weave designed for everyday wear.",
    detay: "1000 ayar gümüş",
    detayEn: "1000-fineness silver",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "İnci Detaylı Bileklik",
    adEn: "Pearl Detail Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "https://www.shopier.com/ozkahyastudio/50654114",
    gorseller: [
      "gorseller/inci-detayli-bileklik-tam.jpg",
      "gorseller/inci-bileklik.jpg",
      "gorseller/inci-detayli-bileklik-bilekte-genel-temiz.jpg",
    ],
    aciklama: "Örgü halkaların arasına oturtulmuş üç inci.",
    aciklamaEn: "Three pearls set between handwoven silver loops.",
    detay: "1000 ayar gümüş · İnci",
    detayEn: "1000-fineness silver · Pearl",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Boncuk Detaylı Bileklik",
    adEn: "Beaded Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "",
    gorseller: [
      "gorseller/boncuk-detayli-bileklik-tam.jpg",
      "gorseller/boncuk-detayli-bileklik-detay.jpg",
      "gorseller/boncuk-detayli-bileklik-bilekte-bej.jpg",
    ],
    aciklama: "Bilekte zarif duran örgü zemin üzerinde minik gümüş top detayları.",
    aciklamaEn: "Tiny silver beads rest on a woven base for a delicate look on the wrist.",
    detay: "1000 ayar gümüş",
    detayEn: "1000-fineness silver",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Geniş Örgü Bileklik",
    adEn: "Wide Woven Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "https://www.shopier.com/ozkahyastudio/50715995",
    gorseller: [
      "gorseller/genis-orgu-bileklik-tam.jpg",
      "gorseller/genis-orgu-bileklik-detay-v2.png",
      "gorseller/genis-orgu-bileklik-kolda.jpg",
    ],
    aciklama: "Kalın hasır örgü ve ortada parlak silindir kapama.",
    aciklamaEn: "Thick basket weave finished with a polished cylindrical clasp at the center.",
    detay: "1000 ayar gümüş",
    detayEn: "1000-fineness silver",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Düğüm Detaylı Bileklik",
    adEn: "Knot Detail Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "https://www.shopier.com/ozkahyastudio/50704360",
    gorseller: [
      "gorseller/dugum-detayli-bileklik-tam-v2.jpg",
      "gorseller/dugum-detayli-bileklik.png",
      "gorseller/dugum-detayli-bileklik-kolda-v2.jpg",
    ],
    aciklama: "İnce örgü gümüş kordonların ortasında elde örülmüş düğüm formu.",
    aciklamaEn: "A handwoven knot form at the center of finely braided silver cords.",
    detay: "1000 ayar gümüş · Örgü düğüm detay",
    detayEn: "1000-fineness silver · Woven knot detail",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Tek İnci Bileklik",
    adEn: "Single Pearl Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "https://www.shopier.com/ozkahyastudio/50696866",
    gorseller: [
      "gorseller/tek-inci-bileklik.png",
      "gorseller/tek-inci-bileklik-inci-detay.jpg",
      "gorseller/tek-inci-bileklik-kolda.jpg",
    ],
    aciklama: "Ortasında tek inci ve örgü yuva bulunan zarif gümüş bileklik.",
    aciklamaEn: "An elegant silver bracelet with a single pearl in a woven setting.",
    detay: "1000 ayar gümüş · İnci",
    detayEn: "1000-fineness silver · Pearl",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Geniş Hasır Örgü Bileklik",
    adEn: "Wide Basket-Weave Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "",
    gorseller: [
      "gorseller/genis-hasir-orgu-bileklik-tam.png",
      "gorseller/genis-hasir-orgu-bileklik.png",
      "gorseller/genis-hasir-orgu-bileklik-kolda.jpg",
    ],
    aciklama: "Yoğun hasır örgü dokusuyla geniş ve belirgin bir bileklik formu.",
    aciklamaEn: "A wide, substantial bracelet defined by its dense basket-weave texture.",
    detay: "1000 ayar gümüş · Geniş örgü form",
    detayEn: "1000-fineness silver · Wide woven form",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Boncuklu Dalga Bileklik",
    adEn: "Beaded Wave Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "",
    gorseller: [
      "gorseller/boncuklu-dalga-bileklik-tam.jpg",
      "gorseller/boncuklu-dalga-bileklik.jpg",
      "gorseller/boncuklu-dalga-bileklik-kolda.jpg",
    ],
    aciklama: "Dalga formundaki çift örgünün içinde tekrar eden minik gümüş boncuklar.",
    aciklamaEn: "Tiny silver beads repeat within a double weave shaped into a flowing wave.",
    detay: "1000 ayar gümüş · Boncuk detay",
    detayEn: "1000-fineness silver · Beaded detail",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Sonsuzluk Düğümlü Bileklik",
    adEn: "Infinity Knot Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "https://www.shopier.com/ozkahyastudio/50704004",
    gorseller: [
      "gorseller/sonsuzluk-dugumlu-bileklik-dogal-v2.jpg",
      "gorseller/sonsuzluk-dugumlu-bileklik.jpg",
      "gorseller/sonsuzluk-dugumlu-bileklik-kolda.jpg",
    ],
    aciklama: "Sonsuzluk formunu andıran geniş düğüm detayı, ince örgü kordonlarla tamamlanıyor.",
    aciklamaEn: "A broad infinity-inspired knot finished with finely woven silver cords.",
    detay: "1000 ayar gümüş · Düğüm form",
    detayEn: "1000-fineness silver · Knot form",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Çok Sıralı Düğüm Bileklik",
    adEn: "Multi-Strand Knot Bracelet",
    kategori: "bileklik",
    fiyat: "",
    shopier: "",
    gorseller: [
      "gorseller/cok-sirali-dugum-bileklik-klipsli.png",
      "gorseller/cok-sirali-dugum-bileklik.jpg",
      "gorseller/cok-sirali-dugum-bileklik-kolda.jpg",
    ],
    aciklama: "Çok sıralı ince örgü kordonların ortasında küçük bir düğüm detayı.",
    aciklamaEn: "A small knot detail centered between multiple finely woven silver cords.",
    detay: "1000 ayar gümüş · Çok sıralı örgü",
    detayEn: "1000-fineness silver · Multi-strand weave",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Sert Bakır Bilezik",
    adEn: "Rigid Copper Cuff",
    kategori: "bilezik",
    fiyat: "",
    shopier: "https://www.shopier.com/ozkahyastudio/50697059",
    gorseller: [
      "gorseller/sert-bakir-bilezik.jpg",
      "gorseller/sert-bakir-bilezik-detay.jpg",
      "gorseller/sert-bakir-bilezik-kolda.jpg",
    ],
    aciklama: "Açık uçlu sert bakır form, örgü geçişleri ve el işi yüzey dokusuyla sıcak bir parça.",
    aciklamaEn: "An open-ended rigid copper cuff with woven transitions and a warm, hand-finished surface.",
    detay: "Bakır · Sert açık bilezik form",
    detayEn: "Copper · Rigid open cuff",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Bakır Tel Bilezik",
    adEn: "Copper Wire Cuff",
    kategori: "bilezik",
    fiyat: "",
    shopier: "",
    gorseller: [
      "gorseller/bakir-tel-bilezik.jpg",
      "gorseller/bakir-tel-bilezik-detay.jpg",
      "gorseller/bakir-tel-bilezik-bilekte-bej.jpg",
    ],
    aciklama: "İnce bakır tellerle örülmüş geniş bilezik. İkinci fotoğrafta bilekte duruşu görülebilir.",
    aciklamaEn: "A wide cuff woven from fine copper wires. The second photo shows how it sits on the wrist.",
    detay: "Bakır tel · Çok sıralı örgü",
    detayEn: "Copper wire · Multi-strand weave",
    oneCikan: true,
    stok: true,
  },
];

/* Kategori isimlerinin sitede nasıl görüneceği */
const KATEGORILER = {
  kolye: { tr: "Kolye", en: "Necklace" },
  kupe: { tr: "Küpe", en: "Earrings" },
  yuzuk: { tr: "Yüzük", en: "Ring" },
  bileklik: { tr: "Bileklik", en: "Bracelet" },
  bilezik: { tr: "Bilezik", en: "Cuff" },
};

/* ============================================================
   İLETİŞİM BİLGİLERİ — tek yerden değiştirin
   ============================================================ */
const ILETISIM = {
  telefon: "+90 540 456 87 75",
  eposta: "hasibeozkahya@hotmail.com",
  instagram: "ozkahya",                // @ işareti olmadan
  sehir: "İzmir",
  shopierMagaza: "https://www.shopier.com/ozkahyastudio",

  /* WhatsApp butonları açık. Kapatmak isterseniz true yerine false yazın;
     sitedeki tüm WhatsApp butonları kaybolur, e-posta butonu öne geçer. */
  whatsappAktif: true,
};
