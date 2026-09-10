# Ozkahya Studio

Ozkahya Studio ürünlerini sergileyen statik koleksiyon sitesi. Projede build
adımı, paket yöneticisi, veritabanı veya ortam değişkeni bulunmaz. Sipariş ve
ödeme işlemleri ürünlere tanımlanan Shopier bağlantıları üzerinden tamamlanır.

## Gereksinimler

- Modern bir web tarayıcısı
- Yerel sunucu için Python 3
- JavaScript kontrol komutları için isteğe bağlı olarak Node.js

## Local Development

Projeyi bilgisayarınıza alın ve klasöre girin:

```bash
git clone https://github.com/gulcin-ozkahya/silver.git
cd silver
```

Yerel sunucuyu başlatın:

```bash
python3 -m http.server 8777
```

Tarayıcıda aşağıdaki adresleri açın:

- Ana sayfa: [http://localhost:8777](http://localhost:8777)
- Koleksiyon: [http://localhost:8777/koleksiyon.html](http://localhost:8777/koleksiyon.html)

Sunucuyu durdurmak için terminalde `Ctrl + C` tuşlarına basın.

`8777` portu kullanımdaysa başka bir port seçebilirsiniz:

```bash
python3 -m http.server 8788
```

Bu durumda site `http://localhost:8788` adresinde açılır.

> `index.html` dosyası doğrudan tarayıcıda da açılabilir. Bağlantıların ve
> tarayıcı davranışlarının üretim ortamına daha yakın çalışması için yerel
> sunucu kullanılması önerilir.

## Dosya Yapısı

```text
silver/
├── index.html              # Ana sayfa
├── koleksiyon.html         # Koleksiyon ve filtreler
├── css/stil.css            # Tüm görsel stiller
├── js/urunler.js           # Ürünler, Shopier ve iletişim bilgileri
├── js/site.js              # Galeri, modal, filtre ve bağlantı davranışları
├── gorseller/              # Ürün görselleri
└── NASIL-KULLANILIR.md     # Ayrıntılı içerik düzenleme kılavuzu
```

## Ürün Düzenleme

Ürünler `js/urunler.js` içindeki `URUNLER` listesinde tutulur. Bir ürünün üç
görseli ve Shopier bağlantısı şu biçimde tanımlanır:

```js
{
  ad: "Örnek Bileklik",
  kategori: "bileklik",
  fiyat: "",
  shopier: "https://www.shopier.com/ozkahyastudio/12345678",
  gorseller: [
    "gorseller/ornek-bileklik-tam.jpg",
    "gorseller/ornek-bileklik-detay.jpg",
    "gorseller/ornek-bileklik-kolda.jpg",
  ],
  aciklama: "Ürünün kısa açıklaması.",
  detay: "999 ayar gümüş · El örgüsü",
  oneCikan: true,
  stok: true,
},
```

- Görsel sırası: tam ürün, detay, model üzerinde görünüm.
- `shopier` doluysa satın alma düğmesi doğrudan ilgili ilana gider.
- Ürün Shopier'de listelenmediyse `shopier: ""` bırakılır ve satın alma
  düğmesi gösterilmez.
- `stok: false` olduğunda ürün tükenmiş olarak işaretlenir.
- `oneCikan: true` ürünü ana sayfada da gösterir.

Genel Shopier mağazası ve iletişim bilgileri aynı dosyanın altındaki `ILETISIM`
nesnesinden değiştirilir.

## Kontroller

JavaScript dosyalarında sözdizimi hatası olmadığını kontrol etmek için:

```bash
node --check js/urunler.js
node --check js/site.js
```

Git değişikliklerinde boşluk veya biçim hatası kontrolü için:

```bash
git diff --check
```

Değişikliklerden sonra sayfayı yenileyin. Eski dosyalar görünüyorsa tarayıcıda
`Cmd + Shift + R` ile önbelleği atlayarak yenileyin.

## Deployment

`main` dalına gönderilen commitler bağlı Netlify projesinde otomatik olarak
yayınlanır:

```bash
git status
git add README.md
git commit -m "Local development dokumani ekle"
git push origin main
```

Canlı site: [https://ozkahyatelier.netlify.app](https://ozkahyatelier.netlify.app)

Ürün ve görsel düzenleme ayrıntıları için `NASIL-KULLANILIR.md` dosyasına bakın.
