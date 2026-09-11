/* ============================================================
   OZKAHYA STUDIO - Site davranışları ve dil geçişi
   Ürünler ve iletişim bilgileri js/urunler.js içindedir.
   Arayüz çevirileri js/ceviriler.js içindedir.
   ============================================================ */

/* ---------- Küçük yardımcılar ---------- */
const sec = (s, kok = document) => kok.querySelector(s);
const secTum = (s, kok = document) => [...kok.querySelectorAll(s)];

const DIL_ANAHTARI = "ozkahyaDil";
let aktifDil = "tr";
let aktifKategori = "hepsi";
let acikUrun = null;
let koleksiyonHazir = false;

function htmlKacis(deger) {
  return String(deger ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function ceviri(anahtar, degiskenler = {}) {
  const sozluk = CEVIRILER[aktifDil] || CEVIRILER.tr;
  const metin = sozluk[anahtar] ?? CEVIRILER.tr[anahtar] ?? anahtar;
  return String(metin).replace(/\{(\w+)\}/g, (_, ad) => degiskenler[ad] ?? "");
}

function urunMetni(urun, alan) {
  if (aktifDil === "en") return urun[`${alan}En`] || urun[alan] || "";
  return urun[alan] || "";
}

function kategoriMetni(kategori) {
  return KATEGORILER[kategori]?.[aktifDil] || KATEGORILER[kategori]?.tr || "";
}

function kayitliDiliOku() {
  const sorguDili = new URLSearchParams(location.search).get("lang");
  if (sorguDili === "tr" || sorguDili === "en") return sorguDili;

  try {
    const kayitliDil = localStorage.getItem(DIL_ANAHTARI);
    if (kayitliDil === "tr" || kayitliDil === "en") return kayitliDil;
  } catch (_) {
    /* Gizli gezinme gibi durumlarda site Türkçe açılmaya devam eder. */
  }

  return "tr";
}

function diliKaydet(dil) {
  try {
    localStorage.setItem(DIL_ANAHTARI, dil);
  } catch (_) {
    /* Depolama kapalı olsa da mevcut sayfadaki dil geçişi çalışır. */
  }
}

function dilParametresiniGuncelle(dil) {
  const adres = new URL(location.href);
  if (dil === "en") adres.searchParams.set("lang", "en");
  else adres.searchParams.delete("lang");
  history.replaceState({}, "", adres);
}

function sabitMetinleriCevir() {
  document.documentElement.lang = aktifDil;

  const sayfa = document.body.dataset.page;
  const anahtarKoku = sayfa === "collection" ? "collection" : "home";
  document.title = ceviri(`${anahtarKoku}Title`);
  const aciklama = sec('meta[name="description"]');
  if (aciklama) aciklama.content = ceviri(`${anahtarKoku}Description`);

  secTum("[data-i18n]").forEach((el) => {
    el.textContent = ceviri(el.dataset.i18n);
  });
  secTum("[data-i18n-html]").forEach((el) => {
    el.innerHTML = ceviri(el.dataset.i18nHtml);
  });

  const nitelikler = [
    ["i18nAriaLabel", "aria-label"],
    ["i18nTitle", "title"],
    ["i18nAlt", "alt"],
    ["i18nPlaceholder", "placeholder"],
  ];
  nitelikler.forEach(([veriAdi, nitelik]) => {
    const veriNiteligi = veriAdi.replace(/[A-Z]/g, (harf) => `-${harf.toLowerCase()}`);
    secTum(`[data-${veriNiteligi}]`).forEach((el) => {
      el.setAttribute(nitelik, ceviri(el.dataset[veriAdi]));
    });
  });

  secTum("[data-dil]").forEach((dugme) => {
    const secili = dugme.dataset.dil === aktifDil;
    dugme.classList.toggle("aktif", secili);
    dugme.setAttribute("aria-pressed", String(secili));
  });
}

const waNumara = () => ILETISIM.telefon.replace(/\D/g, "");
const waLink = (mesaj) =>
  `https://wa.me/${waNumara()}?text=${encodeURIComponent(mesaj)}`;

/* WhatsApp'ın kendi logosu - butonların başına eklenir */
const WA_SIMGE = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.297.347-.495.116-.198.058-.371-.03-.52-.087-.148-.658-1.583-.9-2.167-.242-.584-.487-.5-.67-.51-.174-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.445h.005c6.585 0 11.946-5.336 11.949-11.896a11.82 11.82 0 0 0-3.495-8.411m-8.47 18.336h-.004a9.9 9.9 0 0 1-5.031-1.378l-.361-.214-3.741.976 1.005-3.638-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.455-9.885 9.929-9.885a9.83 9.83 0 0 1 6.99 2.898 9.82 9.82 0 0 1 2.895 6.994c-.003 5.45-4.456 9.885-9.936 9.885"/></svg>`;

function waButonu(el) {
  if (!el || el.dataset.waHazir) return;
  el.dataset.waHazir = "1";
  el.classList.add("buton--wa");
  el.target = "_blank";
  el.rel = "noopener";
  el.insertAdjacentHTML("afterbegin", WA_SIMGE);
}

/* Fotoğrafı olmayan veya yüklenemeyen ürünler için yedek görsel */
function yedekGorsel(ad) {
  const guvenliAd = htmlKacis(ad);
  const harf = htmlKacis((ad || "M").trim().charAt(0).toUpperCase());
  return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${guvenliAd}">
    <rect width="400" height="400" fill="#f1ece4"/>
    <circle cx="200" cy="200" r="86" fill="none" stroke="#c9c1b4" stroke-width="1.5"/>
    <text x="200" y="228" text-anchor="middle" font-family="Georgia, serif"
          font-size="90" fill="#b4ab9c">${harf}</text>
  </svg>`;
}

function gorselListesi(urun) {
  if (Array.isArray(urun.gorseller) && urun.gorseller.length) return urun.gorseller;
  return urun.gorsel ? [urun.gorsel] : [];
}

function tekGorselHtml(kaynak, ad, tembel = true) {
  return `<img src="${htmlKacis(kaynak)}" alt="${htmlKacis(ad)}" ${tembel ? 'loading="lazy"' : ""} data-ad="${htmlKacis(ad)}">`;
}

/* Kart görseli: birden fazla fotoğraf varsa hoverda diğer fotoğrafları gösterir. */
function kartGorselHtml(urun) {
  const liste = gorselListesi(urun);
  const ad = urunMetni(urun, "ad");
  if (!liste.length) return yedekGorsel(ad);
  if (liste.length === 1) return tekGorselHtml(liste[0], ad);
  return `<div class="kart-galeri" data-foto-sayisi="${liste.length}" style="--foto-sayisi:${liste.length}">
    ${liste.map((gorsel) => tekGorselHtml(gorsel, ad)).join("")}
  </div>`;
}

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
  const ad = urunMetni(urun, "ad");
  const aciklama = urunMetni(urun, "aciklama");
  const gorselSayisi = gorselListesi(urun).length;
  const fotoAnahtari = gorselSayisi === 1 ? "photo" : "photos";
  const fiyatHtml = urun.fiyat ? `<span class="urun-fiyat">${htmlKacis(urun.fiyat)}</span>` : "";
  const shopierHtml = urun.shopier
    ? `<a class="urun-shopier-link" href="${htmlKacis(urun.shopier)}" target="_blank" rel="noopener"
          aria-label="${htmlKacis(ceviri("buyProductAria", { name: ad }))}">${htmlKacis(ceviri("buyShopierArrow"))}</a>`
    : "";

  return `
    <article class="urun" data-sira="${sira}" tabindex="0" role="button" aria-label="${htmlKacis(ceviri("productDetailsAria", { name: ad }))}">
      <div class="urun-gorsel">
        ${kartGorselHtml(urun)}
        ${urun.stok === false ? `<span class="etiket">${htmlKacis(ceviri("soldOut"))}</span>` : ""}
        ${gorselSayisi > 1 ? `<span class="foto-sayaci">${gorselSayisi} ${htmlKacis(ceviri(fotoAnahtari))}</span>` : ""}
      </div>
      <div class="urun-bilgi">
        <span class="urun-kategori">${htmlKacis(kategoriMetni(urun.kategori))}</span>
        <h3 class="urun-ad">${htmlKacis(ad)}</h3>
        <p class="urun-aciklama">${htmlKacis(aciklama)}</p>
        <div class="urun-alt ${urun.fiyat || urun.shopier ? "" : "urun-alt--sadece-detay"}">
          ${fiyatHtml}
          ${shopierHtml}
          <span class="urun-detay-link">${htmlKacis(ceviri("details"))}</span>
        </div>
      </div>
    </article>`;
}

function izgarayaBas(hedef, liste) {
  if (!hedef) return;
  if (!liste.length) {
    hedef.innerHTML = `<div class="bos-sonuc">${htmlKacis(ceviri("noResults"))}</div>`;
    return;
  }

  hedef.innerHTML = liste.map((urun) => urunKarti(urun, URUNLER.indexOf(urun))).join("");
  gorselleriKoru(hedef);
  secTum(".urun", hedef).forEach((kart) => {
    const kartiAc = () => pencereAc(URUNLER[Number(kart.dataset.sira)]);
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

/* ---------- Ürün penceresi ---------- */
function pencereGorselleriKur(urun) {
  const kutu = sec("#pencereGorsel");
  if (!kutu) return;

  const liste = gorselListesi(urun);
  const ad = urunMetni(urun, "ad");
  if (!liste.length) {
    kutu.innerHTML = yedekGorsel(ad);
    return;
  }

  kutu.innerHTML =
    tekGorselHtml(liste[0], ad, false) +
    (liste.length > 1
      ? `<div class="pencere-kucukler">${liste
          .map(
            (gorsel, sira) =>
              `<button class="${sira === 0 ? "aktif" : ""}" data-foto="${htmlKacis(gorsel)}"
                       aria-label="${htmlKacis(ceviri("photoAria", { number: sira + 1 }))}"><img src="${htmlKacis(gorsel)}" alt=""></button>`
          )
          .join("")}</div>`
      : "");

  gorselleriKoru(kutu);
  secTum(".pencere-kucukler button", kutu).forEach((dugme) =>
    dugme.addEventListener("click", (olay) => {
      olay.stopPropagation();
      const anaGorsel = sec("img[data-ad]", kutu);
      if (anaGorsel) anaGorsel.src = dugme.dataset.foto;
      secTum(".pencere-kucukler button", kutu).forEach((diger) => diger.classList.remove("aktif"));
      dugme.classList.add("aktif");
    })
  );
}

function pencereyiDoldur(urun) {
  const ad = urunMetni(urun, "ad");
  pencereGorselleriKur(urun);
  sec("#pencereKategori").textContent = kategoriMetni(urun.kategori);
  sec("#pencereAd").textContent = ad;

  const pencereFiyat = sec("#pencereFiyat");
  if (pencereFiyat) {
    pencereFiyat.textContent = urun.fiyat || "";
    pencereFiyat.hidden = !urun.fiyat;
  }

  sec("#pencereAciklama").textContent = urunMetni(urun, "aciklama");
  sec("#pencereDetay").textContent = urunMetni(urun, "detay");
  sec("#pencereStok").textContent = urun.stok === false
    ? ceviri("statusSoldOut")
    : urun.shopier
      ? ceviri("statusShopier")
      : ceviri("statusUnlisted");

  const shopierDugme = sec("#pencereShopier");
  if (shopierDugme) {
    shopierDugme.hidden = !urun.shopier || urun.stok === false;
    shopierDugme.href = urun.shopier || ILETISIM.shopierMagaza;
    shopierDugme.setAttribute("aria-label", ceviri("buyProductAria", { name: ad }));
  }

  const mesaj = ceviri("waProduct", { name: ad });
  const waDugme = sec("#pencereWhatsapp");
  if (ILETISIM.whatsappAktif && waDugme) {
    waDugme.href = waLink(mesaj);
    waButonu(waDugme);
  } else if (waDugme) {
    waDugme.remove();
    sec("#pencereEposta")?.classList.remove("buton--bos");
  }

  const epostaDugme = sec("#pencereEposta");
  if (epostaDugme) {
    epostaDugme.href =
      `mailto:${ILETISIM.eposta}?subject=${encodeURIComponent(ceviri("emailSubject", { name: ad }))}` +
      `&body=${encodeURIComponent(mesaj)}`;
  }
}

function pencereAc(urun) {
  if (!urun) return;
  acikUrun = urun;
  pencereyiDoldur(urun);

  const pencere = sec("#urunPenceresi");
  pencere.classList.add("acik");
  document.body.style.overflow = "hidden";
  sec(".kapat", pencere).focus();
}

function pencereKapat() {
  sec("#urunPenceresi")?.classList.remove("acik");
  document.body.style.overflow = "";
  acikUrun = null;
}

/* ---------- Koleksiyon sayfası: filtre ve arama ---------- */
function filtreleriBas() {
  const filtreKutusu = sec("#filtreler");
  if (!filtreKutusu) return;

  filtreKutusu.innerHTML =
    `<button class="filtre ${aktifKategori === "hepsi" ? "aktif" : ""}" data-kategori="hepsi">${htmlKacis(ceviri("all"))}</button>` +
    Object.keys(KATEGORILER)
      .filter((kategori) => URUNLER.some((urun) => urun.kategori === kategori))
      .map(
        (kategori) =>
          `<button class="filtre ${aktifKategori === kategori ? "aktif" : ""}" data-kategori="${kategori}">${htmlKacis(kategoriMetni(kategori))}</button>`
      )
      .join("");

  secTum(".filtre", filtreKutusu).forEach((dugme) =>
    dugme.addEventListener("click", () => {
      aktifKategori = dugme.dataset.kategori;
      filtreleriBas();
      koleksiyonYenile();
    })
  );
}

function koleksiyonYenile() {
  const izgara = sec("#tumUrunler");
  if (!izgara) return;

  const arama = sec("#arama");
  const yerelDil = aktifDil === "tr" ? "tr" : "en";
  const sorgu = (arama?.value || "").trim().toLocaleLowerCase(yerelDil);
  const liste = URUNLER.filter((urun) => {
    const kategoriUygun = aktifKategori === "hepsi" || urun.kategori === aktifKategori;
    const aranabilirMetin = [
      urun.ad,
      urun.adEn,
      urun.aciklama,
      urun.aciklamaEn,
      urun.detay,
      urun.detayEn,
    ].join(" ").toLocaleLowerCase(yerelDil);
    return kategoriUygun && (!sorgu || aranabilirMetin.includes(sorgu));
  });

  izgarayaBas(izgara, liste);
  const sayac = sec("#sayac");
  if (sayac) {
    const parcaAnahtari = liste.length === 1 ? "piece" : "pieces";
    sayac.textContent = `${liste.length} ${ceviri(parcaAnahtari)}`;
  }
}

function koleksiyonuKur() {
  if (!sec("#tumUrunler")) return;

  if (!koleksiyonHazir) {
    const istenenKategori = new URLSearchParams(location.search).get("kategori");
    if (istenenKategori && KATEGORILER[istenenKategori]) aktifKategori = istenenKategori;
    sec("#arama")?.addEventListener("input", koleksiyonYenile);
    koleksiyonHazir = true;
  }

  filtreleriBas();
  koleksiyonYenile();
}

/* ---------- İletişim bilgileri ---------- */
const ILETISIM_YAZI = {
  telefon: () => ILETISIM.telefon,
  eposta: () => ILETISIM.eposta,
  instagram: () => `@${ILETISIM.instagram}`,
  sehir: () => ILETISIM.sehir,
};

const ILETISIM_BAGLANTI = {
  telefon: () => `tel:+${waNumara()}`,
  whatsapp: () => waLink(ceviri("waGeneral")),
  eposta: () => `mailto:${ILETISIM.eposta}`,
  instagram: () => `https://instagram.com/${ILETISIM.instagram}`,
};

function iletisimiKur() {
  secTum("[data-iletisim]").forEach((el) => {
    const yaz = ILETISIM_YAZI[el.dataset.iletisim];
    if (yaz) el.textContent = yaz();
  });

  secTum("[data-baglanti]").forEach((el) => {
    const baglanti = ILETISIM_BAGLANTI[el.dataset.baglanti];
    if (baglanti) el.href = baglanti();
  });

  if (ILETISIM.whatsappAktif) {
    secTum("[data-whatsapp-key]").forEach((el) => {
      el.href = waLink(ceviri(el.dataset.whatsappKey || "waFallback"));
      waButonu(el);
    });
  } else {
    secTum("[data-whatsapp-key]").forEach((el) => el.remove());
  }

  const telEtiket = sec("[data-telefon-etiket]");
  if (telEtiket) telEtiket.textContent = ceviri(ILETISIM.whatsappAktif ? "whatsappLine" : "phone");

  const yil = sec("#yil");
  if (yil) yil.textContent = new Date().getFullYear();
}

/* ---------- Dil, menü ve üst bar ---------- */
function diliDegistir(yeniDil) {
  if (yeniDil !== "tr" && yeniDil !== "en") return;
  aktifDil = yeniDil;
  diliKaydet(aktifDil);
  dilParametresiniGuncelle(aktifDil);
  sabitMetinleriCevir();
  iletisimiKur();

  izgarayaBas(sec("#oneCikanlar"), URUNLER.filter((urun) => urun.oneCikan));
  koleksiyonuKur();
  if (acikUrun) pencereyiDoldur(acikUrun);
}

function dilSeciciyiKur() {
  secTum("[data-dil]").forEach((dugme) =>
    dugme.addEventListener("click", () => diliDegistir(dugme.dataset.dil))
  );
}

function menuyuKur() {
  const dugme = sec(".menu-dugmesi");
  const menu = sec(".menu");
  dugme?.addEventListener("click", () => {
    const acik = menu.classList.toggle("acik");
    dugme.setAttribute("aria-expanded", String(acik));
  });
  secTum(".menu a").forEach((baglanti) =>
    baglanti.addEventListener("click", () => {
      menu.classList.remove("acik");
      dugme?.setAttribute("aria-expanded", "false");
    })
  );

  const bar = sec(".ust-bar");
  const kaydir = () => bar?.classList.toggle("kaydirildi", window.scrollY > 8);
  kaydir();
  window.addEventListener("scroll", kaydir, { passive: true });
}

/* ---------- Başlat ---------- */
document.addEventListener("DOMContentLoaded", () => {
  aktifDil = kayitliDiliOku();
  diliKaydet(aktifDil);
  sabitMetinleriCevir();
  iletisimiKur();
  menuyuKur();
  dilSeciciyiKur();

  izgarayaBas(sec("#oneCikanlar"), URUNLER.filter((urun) => urun.oneCikan));
  koleksiyonuKur();

  sec("#urunPenceresi")?.addEventListener("click", (olay) => {
    if (olay.target.id === "urunPenceresi" || olay.target.closest(".kapat")) pencereKapat();
  });
  document.addEventListener("keydown", (olay) => {
    if (olay.key === "Escape") pencereKapat();
  });
});
