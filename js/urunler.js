/* ============================================================
   ÖZKAHYA ATELIER — ÜRÜN LİSTESİ
   ------------------------------------------------------------
   Yeni ürün eklemek için aşağıdaki listeye yeni bir blok ekleyin.
   Bir ürünü siteden kaldırmak için o bloğu silin.

   Her ürünün alanları:
     ad        : Ürünün adı
     kategori  : "kolye" | "kupe" | "yuzuk" | "bileklik" | "bilezik"
     fiyat     : Yazı olarak fiyat. Fiyat göstermek istemezseniz ""
     gorsel    : tek fotoğraf  -> "gorseller/adi.jpg"
     gorseller : birden fazla fotoğraf -> ["gorseller/bir.jpg", "gorseller/iki.jpg"]
                 İlk fotoğraf kartta görünür; ikinciye fare gelince geçiş yapar.
                 Pencerede altta küçük kareler çıkar, tıklayarak geçilir.
     aciklama  : Kısa tanıtım yazısı
     detay     : Malzeme / ölçü gibi bilgiler
     oneCikan  : true ise ana sayfada gösterilir
     stok      : false ise "Tükendi" etiketi çıkar

   NOT: Aşağıdaki ürün adları, açıklamalar ve ölçüler fotoğraflara
   bakılarak yazıldı; annenizle teyit edip düzeltin. Fiyatlar boş
   bırakıldı, kartta "Fiyat için sorun" yazıyor.
   ============================================================ */

const URUNLER = [
  {
    ad: "Örgü Kolye",
    kategori: "kolye",
    fiyat: "",
    gorseller: [
      "gorseller/orgu-kolye.jpg",      // 1. sıra: tam halka
      "gorseller/orgu-takim.jpg",      // 2. sıra: bilekliğiyle takım
    ],
    aciklama: "Yuvarlak örgü gümüş kordon, uçlarında desenli silindir kapaklar. Aynı örgüden bileklikle takım oluşturuyor.",
    detay: "1000 ayar gümüş · Çengel kapama",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Örgü Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorseller: [
      "gorseller/orgu-bileklik-takim.jpg",   // 1. sıra: tam halka
      "gorseller/orgu-takim.jpg",            // 2. sıra: kolyesiyle takım
    ],
    aciklama: "Kolyenin aynı örgüsünden, desenli kapaklı bileklik.",
    detay: "1000 ayar gümüş · Çengel kapama",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Mor Taşlı Kolye",
    kategori: "kolye",
    fiyat: "",                                  // fiyatı yazınca kartta görünür
    gorsel: "gorseller/mor-tasli-kolye.jpg",
    aciklama: "El örgüsü gümüş kordon, ortasında mor taş; uçları püsküllü.",
    detay: "1000 ayar gümüş · Ayarlanabilir uzunluk",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Mor Taşlı Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorseller: [
      "gorseller/mor-tasli-bileklik-tam.jpg",
      "gorseller/mor-tasli-bileklik-tas-yakin.jpg",
    ],
    aciklama: "İnce örgü kordonların ortasına oturtulmuş oval mor taş.",
    detay: "1000 ayar gümüş · Çengel kapama",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Burgu Örgü Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorsel: "gorseller/orgu-bileklik-burgu.jpg",
    aciklama: "Sarmal dokulu, dolgun örgü; tırtıllı uç kapakları ve çengel kapama.",
    detay: "1000 ayar gümüş",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "İnce Örgü Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorsel: "gorseller/orgu-bileklik-ince.jpg",
    aciklama: "Hafif ve her güne uygun, ince burgulu örgü.",
    detay: "1000 ayar gümüş",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "İnci Detaylı Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorseller: [
      "gorseller/inci-bileklik.jpg",
      "gorseller/inci-bileklik-bilekte-yakin.png",
      "gorseller/inci-bileklik-bilekte-genel.png",
    ],
    aciklama: "Örgü halkaların arasına oturtulmuş üç inci.",
    detay: "1000 ayar gümüş · İnci",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Boncuk Detaylı Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorseller: [
      // 1. sıra: tam halka fotoğrafı (henüz yok, çekilince buraya)
      "gorseller/boncuk-bileklik.jpg",   // 2. sıra: ön detay
    ],
    aciklama: "Örgü zemine serpiştirilmiş minik gümüş toplar.",
    detay: "1000 ayar gümüş",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Geniş Örgü Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorsel: "gorseller/orgu-bileklik-genis.jpg",
    aciklama: "Kalın hasır örgü; ortada parlak silindir kapama.",
    detay: "1000 ayar gümüş",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Düğüm Detaylı Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorsel: "gorseller/dugum-detayli-bileklik.png",
    aciklama: "İnce örgü gümüş kordonların ortasında elde örülmüş düğüm formu.",
    detay: "1000 ayar gümüş · Örgü düğüm detay",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Tek İnci Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorsel: "gorseller/tek-inci-bileklik.png",
    aciklama: "Ortasında tek inci ve örgü yuva bulunan zarif gümüş bileklik.",
    detay: "1000 ayar gümüş · İnci",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Geniş Hasır Örgü Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorseller: [
      "gorseller/genis-hasir-orgu-bileklik.png",
      "gorseller/genis-hasir-orgu-bileklik-tam.png",
    ],
    aciklama: "Yoğun hasır örgü dokusuyla geniş ve belirgin bir bileklik formu.",
    detay: "1000 ayar gümüş · Geniş örgü form",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Boncuklu Dalga Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorsel: "gorseller/boncuklu-dalga-bileklik.jpg",
    aciklama: "Dalga formundaki çift örgünün içinde tekrar eden minik gümüş boncuklar.",
    detay: "1000 ayar gümüş · Boncuk detay",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Sonsuzluk Düğümlü Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorsel: "gorseller/sonsuzluk-dugumlu-bileklik.jpg",
    aciklama: "Sonsuzluk formunu andıran geniş düğüm detayı, ince örgü kordonlarla tamamlanıyor.",
    detay: "1000 ayar gümüş · Düğüm form",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Çok Sıralı Düğüm Bileklik",
    kategori: "bileklik",
    fiyat: "",
    gorsel: "gorseller/cok-sirali-dugum-bileklik.jpg",
    aciklama: "Çok sıralı ince örgü kordonların ortasında küçük bir düğüm detayı.",
    detay: "1000 ayar gümüş · Çok sıralı örgü",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Sert Bakır Bilezik",
    kategori: "bilezik",
    fiyat: "",
    gorsel: "gorseller/sert-bakir-bilezik.jpg",
    aciklama: "Açık uçlu sert bakır form; örgü geçişleri ve el işi yüzey dokusuyla sıcak bir parça.",
    detay: "Bakır · Sert açık bilezik form",
    oneCikan: true,
    stok: true,
  },
  {
    ad: "Bakır Tel Bilezik",
    kategori: "bilezik",
    fiyat: "",
    gorseller: [
      "gorseller/bakir-tel-bilezik.jpg",
      "gorseller/bakir-tel-bilezik-bilekte.jpg",
    ],
    aciklama: "İnce bakır tellerle örülmüş geniş bilezik; ikinci fotoğrafta bilekte duruşu görülebilir.",
    detay: "Bakır tel · Çok sıralı örgü",
    oneCikan: true,
    stok: true,
  },
];

/* Kategori isimlerinin sitede nasıl görüneceği */
const KATEGORILER = {
  kolye: "Kolye",
  kupe: "Küpe",
  yuzuk: "Yüzük",
  bileklik: "Bileklik",
  bilezik: "Bilezik",
};

/* ============================================================
   İLETİŞİM BİLGİLERİ — tek yerden değiştirin
   ============================================================ */
const ILETISIM = {
  telefon: "+90 540 456 87 75",
  eposta: "hasibeozkahya@hotmail.com",
  instagram: "ateliermora",            // @ işareti olmadan
  sehir: "İzmir",

  /* WhatsApp butonları açık. Kapatmak isterseniz true yerine false yazın;
     sitedeki tüm WhatsApp butonları kaybolur, e-posta butonu öne geçer. */
  whatsappAktif: true,
};
