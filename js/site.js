/* ============================================================
   OZKAHYA STUDIO — Site davranışları
   Bu dosyayı düzenlemenize gerek yok.
   Ürünler ve iletişim bilgileri js/urunler.js içindedir.
   ============================================================ */

/* ---------- Küçük yardımcılar ---------- */
const sec = (s, kok = document) => kok.querySelector(s);
const secTum = (s, kok = document) => [...kok.querySelectorAll(s)];

const waNumara = () => ILETISIM.telefon.replace(/\D/g, "");
const waLink = (mesaj) =>
  `https://wa.me/${waNumara()}?text=${encodeURIComponent(mesaj)}`;

/* WhatsApp'ın kendi logosu — butonların başına eklenir */
const WA_SIMGE = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.297.347-.495.116-.198.058-.371-.03-.52-.087-.148-.658-1.583-.9-2.167-.242-.584-.487-.5-.67-.51-.174-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.445h.005c6.585 0 11.946-5.336 11.949-11.896a11.82 11.82 0 0 0-3.495-8.411m-8.47 18.336h-.004a9.9 9.9 0 0 1-5.031-1.378l-.361-.214-3.741.976 1.005-3.638-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.455-9.885 9.929-9.885a9.83 9.83 0 0 1 6.99 2.898 9.82 9.82 0 0 1 2.895 6.994c-.003 5.45-4.456 9.885-9.936 9.885"/></svg>`;

/* Bir butonu WhatsApp butonuna dönüştürür: yeşil zemin + logo */
function waButonu(el) {
  if (!el || el.dataset.waHazir) return;
  el.dataset.waHazir = "1";
  el.classList.add("buton--wa");
  el.target = "_blank";
  el.rel = "noopener";
  el.insertAdjacentHTML("afterbegin", WA_SIMGE);
}

/* Fotoğrafı olmayan/yüklenemeyen ürünler için yedek görsel */
function yedekGorsel(ad) {
  const harf = (ad || "M").trim().charAt(0).toUpperCase();
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${ad}">
    <rect width="400" height="400" fill="#f1ece4"/>
    <circle cx="200" cy="200" r="86" fill="none" stroke="#c9c1b4" stroke-width="1.5"/>
    <text x="200" y="228" text-anchor="middle" font-family="Georgia, serif"
          font-size="90" fill="#b4ab9c">${harf}</text>
  </svg>`;
}

/* Bir ürünün fotoğraf listesi.
   urunler.js'te ya gorsel: "tek.jpg" ya da gorseller: ["bir.jpg","iki.jpg"] yazılabilir. */
function gorselListesi(urun) {
  if (Array.isArray(urun.gorseller) && urun.gorseller.length) return urun.gorseller;
  return urun.gorsel ? [urun.gorsel] : [];
}

function tekGorselHtml(kaynak, ad, tembel = true) {
  return `<img src="${kaynak}" alt="${ad}" ${tembel ? 'loading="lazy"' : ""} data-ad="${ad}">`;
}

/* Kart görseli: birden fazla fotoğraf varsa hoverda önce ikinci fotoğraf gösterilir */
function kartGorselHtml(urun) {
  const liste = gorselListesi(urun);
  if (!liste.length) return yedekGorsel(urun.ad);
  if (liste.length === 1) return tekGorselHtml(liste[0], urun.ad);
  return `<div class="kart-galeri" data-foto-sayisi="${liste.length}" style="--foto-sayisi:${liste.length}">
    ${liste.map((g) => tekGorselHtml(g, urun.ad)).join("")}
  </div>`;
}

/* Fotoğraf bulunamazsa yerine yedek görseli koy */
function gorselleriKoru(kok) {
  secTum("img[data-ad]", kok).forEach((img) => {
    img.addEventListener("error", () => {
      img.outerHTML = yedekGorsel(img.dataset.ad);
    });
  });
}

function kartGalerisiniKur(kart) {
  const galeri = sec(".kart-galeri", kart);
  const fotoSayisi = Number(galeri?.dataset.fotoSayisi || 0);
  if (!galeri || fotoSayisi < 2) return;

  let aktifFoto = 0;
  let zamanlayici = null;

  const fotoGoster = (sira) => {
    aktifFoto = Math.min(Math.max(sira, 0), fotoSayisi - 1);
    galeri.style.transform = `translateX(-${100 * aktifFoto}%)`;
  };

  const baslat = () => {
    fotoGoster(1);
    if (fotoSayisi === 2 || zamanlayici) return;

    zamanlayici = window.setInterval(() => {
      const sonraki = aktifFoto + 1 >= fotoSayisi ? 1 : aktifFoto + 1;
      fotoGoster(sonraki);
    }, 1600);
  };

  const durdur = () => {
    if (zamanlayici) window.clearInterval(zamanlayici);
    zamanlayici = null;
    fotoGoster(0);
  };

  kart.addEventListener("mouseenter", baslat);
  kart.addEventListener("mouseleave", durdur);
  kart.addEventListener("focusin", baslat);
  kart.addEventListener("focusout", durdur);
  kart.addEventListener("click", durdur);
}

/* ---------- Ürün kartı ---------- */
function urunKarti(urun, sira) {
  const gorselSayisi = gorselListesi(urun).length;
  const fiyatHtml = urun.fiyat ? `<span class="urun-fiyat">${urun.fiyat}</span>` : "";
  const shopierHtml = urun.shopier
    ? `<a class="urun-shopier-link" href="${urun.shopier}" target="_blank" rel="noopener"
          aria-label="${urun.ad} ürününü Shopier'de satın al">Shopier'de satın al →</a>`
    : "";

  return `
    <article class="urun" data-sira="${sira}" tabindex="0" role="button" aria-label="${urun.ad}, detayları gör">
      <div class="urun-gorsel">
        ${kartGorselHtml(urun)}
        ${urun.stok === false ? '<span class="etiket">Tükendi</span>' : ""}
        ${gorselSayisi > 1 ? `<span class="foto-sayaci">${gorselSayisi} fotoğraf</span>` : ""}
      </div>
      <div class="urun-bilgi">
        <span class="urun-kategori">${KATEGORILER[urun.kategori] || ""}</span>
        <h3 class="urun-ad">${urun.ad}</h3>
        <p class="urun-aciklama">${urun.aciklama || ""}</p>
        <div class="urun-alt ${urun.fiyat || urun.shopier ? "" : "urun-alt--sadece-detay"}">
          ${fiyatHtml}
          ${shopierHtml}
          <span class="urun-detay-link">Detay →</span>
        </div>
      </div>
    </article>`;
}

function izgarayaBas(hedef, liste) {
  if (!hedef) return;
  if (!liste.length) {
    hedef.innerHTML = `<div class="bos-sonuc">Bu aramaya uygun bir parça bulunamadı.</div>`;
    return;
  }
  hedef.innerHTML = liste
    .map((u) => urunKarti(u, URUNLER.indexOf(u)))
    .join("");
  gorselleriKoru(hedef);
  secTum(".urun", hedef).forEach((kart) => {
    const kartiAc = () => pencereAc(URUNLER[+kart.dataset.sira]);
    kartGalerisiniKur(kart);
    kart.addEventListener("click", (olay) => {
      if (olay.target.closest("a")) return;
      kartiAc();
    });
    kart.addEventListener("keydown", (olay) => {
      if (olay.target.closest("a")) return;
      if (olay.key !== "Enter" && olay.key !== " ") return;
      olay.preventDefault();
      kartiAc();
    });
  });
}

/* Pencerede birden fazla fotoğraf varsa altta küçük kareler çıkar */
function pencereGorselleriKur(urun) {
  const kutu = sec("#pencereGorsel");
  const liste = gorselListesi(urun);

  if (!liste.length) {
    kutu.innerHTML = yedekGorsel(urun.ad);
    return;
  }

  kutu.innerHTML =
    tekGorselHtml(liste[0], urun.ad, false) +
    (liste.length > 1
      ? `<div class="pencere-kucukler">` +
        liste
          .map(
            (g, i) =>
              `<button class="${i === 0 ? "aktif" : ""}" data-foto="${g}"
                       aria-label="${i + 1}. fotoğraf"><img src="${g}" alt=""></button>`
          )
          .join("") +
        `</div>`
      : "");

  gorselleriKoru(kutu);

  secTum(".pencere-kucukler button", kutu).forEach((d) =>
    d.addEventListener("click", (e) => {
      e.stopPropagation();
      const ana = sec("img[data-ad]", kutu);
      if (ana) ana.src = d.dataset.foto;
      secTum(".pencere-kucukler button", kutu).forEach((x) => x.classList.remove("aktif"));
      d.classList.add("aktif");
    })
  );
}

/* ---------- Ürün penceresi ---------- */
function pencereAc(urun) {
  if (!urun) return;
  const p = sec("#urunPenceresi");
  pencereGorselleriKur(urun);
  sec("#pencereKategori").textContent = KATEGORILER[urun.kategori] || "";
  sec("#pencereAd").textContent = urun.ad;
  const pencereFiyat = sec("#pencereFiyat");
  if (pencereFiyat) {
    pencereFiyat.textContent = urun.fiyat || "";
    pencereFiyat.hidden = !urun.fiyat;
  }
  sec("#pencereAciklama").textContent = urun.aciklama || "";
  sec("#pencereDetay").textContent = urun.detay || "";
  sec("#pencereStok").textContent = urun.stok === false
    ? "Şu an tükendi. Benzeri özel olarak üretilebilir."
    : urun.shopier
      ? "Sipariş ve ödeme Shopier üzerinden tamamlanır."
      : "Bu parça Shopier'de henüz listelenmedi. Ürün hakkında bilgi alabilirsiniz.";

  const shopierDugme = sec("#pencereShopier");
  if (shopierDugme) {
    shopierDugme.hidden = !urun.shopier || urun.stok === false;
    shopierDugme.href = urun.shopier || ILETISIM.shopierMagaza;
    shopierDugme.setAttribute("aria-label", `${urun.ad} ürününü Shopier'de satın al`);
  }

  const mesaj = `Merhaba, "${urun.ad}" hakkında bilgi almak istiyorum.`;

  const waDugme = sec("#pencereWhatsapp");
  if (ILETISIM.whatsappAktif) {
    waDugme.href = waLink(mesaj);
    waButonu(waDugme);
  } else if (waDugme) {
    /* WhatsApp kapalı: butonu kaldır, e-posta butonunu öne çıkar */
    waDugme.remove();
    sec("#pencereEposta").classList.remove("buton--bos");
  }

  sec("#pencereEposta").href =
    `mailto:${ILETISIM.eposta}?subject=${encodeURIComponent(urun.ad + " hakkında")}` +
    `&body=${encodeURIComponent(mesaj)}`;

  p.classList.add("acik");
  document.body.style.overflow = "hidden";
  sec(".kapat", p).focus();
}

function pencereKapat() {
  sec("#urunPenceresi").classList.remove("acik");
  document.body.style.overflow = "";
}

/* ---------- Koleksiyon sayfası: filtre + arama ---------- */
function koleksiyonuKur() {
  const izgara = sec("#tumUrunler");
  if (!izgara) return;

  const filtreKutusu = sec("#filtreler");
  const arama = sec("#arama");
  let aktifKategori = "hepsi";

  /* Filtre düğmelerini kategorilerden üret */
  filtreKutusu.innerHTML =
    `<button class="filtre aktif" data-kategori="hepsi">Tümü</button>` +
    Object.entries(KATEGORILER)
      .filter(([k]) => URUNLER.some((u) => u.kategori === k))
      .map(([k, ad]) => `<button class="filtre" data-kategori="${k}">${ad}</button>`)
      .join("");

  function yenile() {
    const q = (arama?.value || "").toLocaleLowerCase("tr");
    const liste = URUNLER.filter((u) => {
      const kategoriUygun = aktifKategori === "hepsi" || u.kategori === aktifKategori;
      const metin = `${u.ad} ${u.aciklama || ""} ${u.detay || ""}`.toLocaleLowerCase("tr");
      return kategoriUygun && (!q || metin.includes(q));
    });
    izgarayaBas(izgara, liste);
    const sayac = sec("#sayac");
    if (sayac) sayac.textContent = `${liste.length} parça`;
  }

  secTum(".filtre", filtreKutusu).forEach((d) =>
    d.addEventListener("click", () => {
      secTum(".filtre", filtreKutusu).forEach((x) => x.classList.remove("aktif"));
      d.classList.add("aktif");
      aktifKategori = d.dataset.kategori;
      yenile();
    })
  );
  arama?.addEventListener("input", yenile);

  /* Adres satırında ?kategori=kolye varsa o filtreyi seç */
  const istenen = new URLSearchParams(location.search).get("kategori");
  if (istenen && KATEGORILER[istenen]) {
    sec(`.filtre[data-kategori="${istenen}"]`, filtreKutusu)?.click();
  } else {
    yenile();
  }
}

/* ---------- İletişim bilgilerini sayfaya yaz ----------
   data-iletisim="telefon|eposta|instagram|sehir"  → yazıyı yazar
   data-baglanti="telefon|whatsapp|eposta|instagram" → bağlantıyı (href) kurar
   data-whatsapp="mesaj"                           → hazır mesajlı WhatsApp bağlantısı
------------------------------------------------------- */
const ILETISIM_YAZI = {
  telefon: () => ILETISIM.telefon,
  eposta: () => ILETISIM.eposta,
  instagram: () => "@" + ILETISIM.instagram,
  sehir: () => ILETISIM.sehir,
};

const ILETISIM_BAGLANTI = {
  telefon: () => `tel:+${waNumara()}`,
  whatsapp: () => waLink("Merhaba, bir ürün hakkında bilgi almak istiyorum."),
  eposta: () => `mailto:${ILETISIM.eposta}`,
  instagram: () => `https://instagram.com/${ILETISIM.instagram}`,
};

function iletisimiKur() {
  secTum("[data-iletisim]").forEach((el) => {
    const yaz = ILETISIM_YAZI[el.dataset.iletisim];
    if (yaz) el.textContent = yaz();
  });

  secTum("[data-baglanti]").forEach((el) => {
    const bag = ILETISIM_BAGLANTI[el.dataset.baglanti];
    if (bag) el.href = bag();
  });

  /* WhatsApp kapalıysa ilgili tüm butonlar sayfadan kaldırılır */
  if (ILETISIM.whatsappAktif) {
    secTum("[data-whatsapp]").forEach((el) => {
      el.href = waLink(el.dataset.whatsapp || "Merhaba, takılarınız hakkında bilgi almak istiyorum.");
      waButonu(el);
    });
  } else {
    secTum("[data-whatsapp]").forEach((el) => el.remove());
  }

  const telEtiket = sec("[data-telefon-etiket]");
  if (telEtiket) telEtiket.textContent = ILETISIM.whatsappAktif ? "WhatsApp bilgi hattı" : "Telefon";

  const yil = sec("#yil");
  if (yil) yil.textContent = new Date().getFullYear();
}

/* ---------- Menü ve üst bar ---------- */
function menuyuKur() {
  const dugme = sec(".menu-dugmesi");
  const menu = sec(".menu");
  dugme?.addEventListener("click", () => {
    const acik = menu.classList.toggle("acik");
    dugme.setAttribute("aria-expanded", acik);
  });
  secTum(".menu a").forEach((a) =>
    a.addEventListener("click", () => menu.classList.remove("acik"))
  );

  const bar = sec(".ust-bar");
  const kaydir = () => bar?.classList.toggle("kaydirildi", window.scrollY > 8);
  kaydir();
  window.addEventListener("scroll", kaydir, { passive: true });
}

/* ---------- Başlat ---------- */
document.addEventListener("DOMContentLoaded", () => {
  iletisimiKur();
  menuyuKur();

  /* Ana sayfa: öne çıkan ürünler */
  izgarayaBas(
    sec("#oneCikanlar"),
    URUNLER.filter((u) => u.oneCikan)
  );

  koleksiyonuKur();

  sec("#urunPenceresi")?.addEventListener("click", (e) => {
    if (e.target.id === "urunPenceresi" || e.target.closest(".kapat")) pencereKapat();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") pencereKapat();
  });
});
