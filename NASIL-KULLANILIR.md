# Ozka Studio — Site Kullanım Kılavuzu

Bu site tamamen dosyalardan oluşuyor; veritabanı, kurulum veya aylık ücret yok.
Değişiklik yapmak için sadece **iki dosyaya** dokunmanız yeterli.

---

## 1. Siteyi bilgisayarda açmak

`index.html` dosyasına çift tıklayın — tarayıcıda açılır.

Daha doğru bir önizleme için (fotoğraflar ve filtreler tam çalışır) Terminal'de:

```bash
cd ~/Desktop/silver && python3 -m http.server 8777
```

Sonra tarayıcıda `http://localhost:8777` adresine gidin. Durdurmak için Terminal'de `Ctrl + C`.

---

## 2. Yeni ürün eklemek

`js/urunler.js` dosyasını herhangi bir metin düzenleyiciyle açın.
Listedeki bir bloğu kopyalayıp yapıştırın ve bilgilerini değiştirin:

```js
  {
    ad: "Yeni Kolye",
    kategori: "kolye",              // kolye | kupe | yuzuk | bileklik | bilezik
    fiyat: "1.200 ₺",               // fiyat göstermek istemezseniz: ""
    gorsel: "gorseller/yeni-kolye.jpg",
    aciklama: "Kısa tanıtım yazısı.",
    detay: "1000 ayar gümüş · 45 cm zincir",
    oneCikan: true,                 // true ise ana sayfada da görünür
    stok: true,                     // false ise "Tükendi" yazar
  },
```

Kurallar:

- Her satırın sonundaki **virgülü silmeyin**.
- Yazıları **çift tırnak** içinde bırakın.
- Ürünü siteden kaldırmak için bloğu `{` ile `},` arası tamamen silin.

---

## 3. Fotoğraf eklemek

Üç adım, başka hiçbir şey gerekmiyor.

### Adım 1 — Fotoğrafı klasöre koyun

Fotoğrafı Finder'da `silver/gorseller/` klasörünün içine sürükleyin.

### Adım 2 — Dosyayı yeniden adlandırın

Dosya adında **Türkçe karakter, boşluk ve büyük harf kullanmayın**:

| Doğru | Yanlış |
| --- | --- |
| `ay-tasi-yuzuk.jpg` | `Ay Taşı Yüzük.jpg` |
| `zeytin-dali-kolye.jpg` | `IMG_4821 (1).JPG` |
| `halka-kupe-2.jpg` | `küpe kopya.jpeg` |

Türkçe karakter veya boşluk olursa fotoğraf internette görünmez.

### Adım 3 — `urunler.js` içindeki tek satırı değiştirin

O ürünün `gorsel:` satırını yeni dosya adıyla yazın:

```js
    gorsel: "gorseller/ay-tasi-yuzuk.jpg",
```

Kaydedin, tarayıcıda sayfayı yenileyin (`Cmd + R`). Fotoğraf yerine oturur.

### Çalışan örnek

Bunu görebilmeniz için listedeki **ilk ürüne** (Ay Çiçeği Kolye) gerçek bir
fotoğraf dosyası bağladım:

- Dosya: `gorseller/ay-cicegi-kolye.jpg` (1200 × 1200 piksel, JPEG)
- `urunler.js` içindeki satırı: `gorsel: "gorseller/ay-cicegi-kolye.jpg",`

Yani akış tam olarak şöyle işliyor. Annenizin kendi fotoğrafını denemek için
en kolay yol: çektiği fotoğrafı `ay-cicegi-kolye.jpg` adıyla kaydedip bu
dosyanın **üzerine yazmak**. Hiçbir kod değişmez, sayfayı yenileyince yeni
fotoğraf görünür.

> Not: bu örnek dosya da benim çizdiğim geçici bir görüntüdür, gerçek bir
> fotoğraf değil. Diğer 11 ürün `.svg` uzantılı çizimler kullanıyor;
> hepsi gerçek fotoğraflarla değiştirilmek üzere konuldu.

### Bir ürüne iki fotoğraf koymak

Bir ürünün birden fazla fotoğrafı olabilir. `gorsel:` satırının yerine
`gorseller:` yazıp listelemek yeterli:

```js
    gorseller: [
      "gorseller/bileklik-tam-halka.jpg",   // 1. sıra: kartta görünen
      "gorseller/bileklik-on-detay.jpg",    // 2. sıra: fare üzerine gelince
    ],
```

Nasıl çalışır:

- **Kart:** 1. fotoğraf görünür. Fare üzerine gelince yumuşak geçişle
  2. fotoğrafa döner. Köşede "2 fotoğraf" etiketi çıkar.
- **Ürün penceresi:** fotoğrafın altında küçük kareler görünür,
  tıklayarak aralarında geçiş yapılır.
- Telefonda fare olmadığı için karta dokununca pencere açılır, geçiş
  oradaki küçük karelerden yapılır.

İkiden fazla da yazabilirsiniz; kartta ilk ikisi kullanılır, pencerede
hepsi görünür.

### Fotoğraf çekerken

- **Kare** çekin veya sonradan kare kırpın (örn. 1000 × 1000 piksel). Site kareye göre tasarlandı.
- 2000 pikselden büyük dosyaları küçültün; site daha hızlı açılır.
  Önizleme (Preview) ile: `Araçlar › Boyutu Ayarla`.
- Açık ve sade bir zemin (beyaz kağıt, keten bez, ahşap) sitenin açık temasıyla uyumlu olur.
- Pencere kenarında, gün ışığında çekin; flaş gümüş ve bakırda parlama yapar.
- `.jpg`, `.jpeg`, `.png` ve `.webp` uzantılarının hepsi çalışır.
- Fotoğraf bulunamazsa **site bozulmaz**; yerine ürünün baş harfini taşıyan sade bir kutu çıkar.
  Yani yanlış dosya adı yazmak hiçbir şeyi kırmaz.

---

## 4. Telefon, e-posta, Instagram değiştirmek

Aynı dosyanın (`js/urunler.js`) **en altındaki** blok:

```js
const ILETISIM = {
  telefon: "+90 540 456 87 75",
  eposta: "hasibeozkahya@hotmail.com",
  instagram: "ozka",               // @ işareti olmadan
  sehir: "İzmir",
  whatsappAktif: true,             // false yaparsanız WhatsApp butonları kaybolur
};
```

Burayı bir kez değiştirdiğinizde site içindeki **tüm** telefon, e-posta,
Instagram ve WhatsApp bağlantıları otomatik güncellenir. WhatsApp bağlantıları
da yukarıdaki telefon numarasını kullanır.

`whatsappAktif: false` yazarsanız üst menüdeki yeşil WhatsApp düğmesi ve
diğer WhatsApp butonları siteden kalkar; yerlerini e-posta butonu alır.

> Instagram kullanıcı adı (`ozka`) örnek olarak duruyor; hesap adı
> farklıysa değiştirmeniz gerekir.

---

## 5. Renkleri veya yazıları değiştirmek

- **Renkler:** `css/stil.css` dosyasının en üstündeki `:root` bloğu.
- **Sayfa yazıları** (başlıklar, atölye hikâyesi, bakım önerileri): `index.html`
- **Koleksiyon sayfası yazıları:** `koleksiyon.html`

---

## 6. Siteyi internete koymak

Site tek başına çalışan dosyalardan oluştuğu için sunucuya ihtiyaç yok.
Ücretsiz seçenekler:

| Yöntem | Nasıl | Ticari kullanım |
| --- | --- | --- |
| **Cloudflare Pages** | Panelde *Direct Upload*, klasörü sürükleyin | ✅ Ücretsiz planda serbest |
| **Netlify Drop** | [app.netlify.com/drop](https://app.netlify.com/drop) adresine klasörü sürükleyin | ✅ Serbest (aylık 100 GB) |
| **Vercel** | Klasörde `npx vercel` komutu | ⚠️ Ücretsiz (Hobby) plan kişisel/ticari olmayan kullanım için |
| **GitHub Pages** | Dosyaları bir depoya koyup Pages'i açın | ⚠️ Mağaza siteleri için önerilmiyor |

Site yapı adımı (build) gerektirmediği için hepsinde ayar yapmadan çalışır.

Kendi alan adınız (`ozkahyaatelier.com` gibi) olsun isterseniz yıllık ücretle
(yaklaşık 10–15 $) alıp bu servislerin hepsine ücretsiz bağlayabilirsiniz.

---

## Dosya düzeni

```
silver/
├── index.html          → Ana sayfa
├── koleksiyon.html     → Tüm ürünler (filtre + arama)
├── css/stil.css        → Görünüm, renkler
├── js/urunler.js       → ÜRÜNLER ve İLETİŞİM  ← en çok bunu düzenleyeceksiniz
├── js/site.js          → Site davranışları (dokunmaya gerek yok)
└── gorseller/          → Ürün fotoğrafları
```

---

## İleride online satış

Şu an sipariş WhatsApp / e-posta üzerinden ilerliyor. İleride sepet ve
kredi kartı ödemesi istenirse mevcut ürün listesi olduğu gibi korunabilir;
üzerine ödeme altyapısı (Shopify, iyzico, Stripe) eklenir.
