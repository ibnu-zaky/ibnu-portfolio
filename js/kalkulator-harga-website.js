const WA_NUMBER = "6285186660950";

const basePackages = [
  { id: "landing", name: "Landing Page", price: 800000, desc: "1 halaman, fokus konversi" },
  { id: "profile", name: "Company Profile", price: 1800000, desc: "5–6 halaman, untuk bisnis" },
  { id: "ecommerce", name: "Toko Online", price: 3500000, desc: "Katalog produk & checkout" },
  { id: "custom", name: "Custom / Aplikasi Web", price: 5500000, desc: "Sistem sesuai kebutuhan" },
];

const featureGroups = [
  {
    title: "Desain & Konten",
    items: [
      { id: "copywriting", name: "Copywriting profesional", desc: "Teks konten ditulis ulang oleh saya", price: 300000 },
      { id: "premium-img", name: "Premium images / ilustrasi", desc: "Stok foto & ilustrasi berbayar", price: 250000 },
      { id: "logo", name: "Desain logo", desc: "Logo dari nol jika belum punya", price: 400000 },
      { id: "darkmode", name: "Dark / light mode toggle", desc: "Tampilan bisa ganti tema", price: 200000 },
    ],
  },
  {
    title: "Fungsi & Interaksi",
    items: [
      { id: "contact-form", name: "Contact form", desc: "Formulir kontak terkirim ke email", price: 150000 },
      { id: "blog", name: "Sistem blog", desc: "Halaman artikel yang bisa diupdate", price: 600000 },
      { id: "multilang", name: "Multi-bahasa", desc: "Konten dalam 2+ bahasa", price: 500000 },
      { id: "booking", name: "Sistem booking / reservasi", desc: "Jadwal & pemesanan online", price: 900000 },
      { id: "admin-panel", name: "Admin panel / CMS", desc: "Kelola konten sendiri tanpa coding", price: 1200000 },
    ],
  },
  {
    title: "Toko & Pembayaran",
    items: [
      { id: "payment", name: "Payment gateway", desc: "Midtrans / Xendit, dll", price: 700000 },
      { id: "shipping", name: "Cek ongkir otomatis", desc: "JNE, JNT, dan kurir lain", price: 400000 },
      { id: "coupon", name: "Sistem kupon / diskon", desc: "Kode promo untuk pelanggan", price: 300000 },
      { id: "member", name: "Member area", desc: "Login, keranjang, wishlist", price: 800000 },
    ],
  },
  {
    title: "Teknis & Perawatan",
    items: [
      { id: "domain", name: "Domain & SSL 1 tahun", desc: "Nama domain .com/.id + HTTPS", price: 250000 },
      { id: "hosting", name: "Hosting 1 tahun", desc: "Termasuk maintenance & backup", price: 400000 },
      { id: "seo", name: "Optimasi SEO dasar", desc: "Meta tag, sitemap, kecepatan", price: 350000 },
      { id: "analytics", name: "Google Analytics setup", desc: "Pantau statistik pengunjung", price: 150000 },
      { id: "fast-delivery", name: "Pengerjaan express", desc: "Dipercepat dari estimasi normal", price: 500000 },
    ],
  },
];

let selectedBase = null;
let selectedFeatures = new Set();

function formatRupiah(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

function renderBase() {
  const grid = document.getElementById("baseGrid");
  grid.innerHTML = basePackages
    .map(
      (pkg) => `
          <div class="base-card ${selectedBase === pkg.id ? "active" : ""}" data-id="${pkg.id}">
            <div class="base-name">${pkg.name}</div>
            <div class="base-desc">${pkg.desc}</div>
            <div class="base-price">mulai ${formatRupiah(pkg.price)}</div>
          </div>
        `,
    )
    .join("");

  grid.querySelectorAll(".base-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedBase = card.dataset.id;
      renderBase();
      renderFeatures();
      updateSummary();
    });
  });
}

function renderFeatures() {
  const section = document.getElementById("featureSection");
  if (!selectedBase) {
    section.innerHTML = "";
    return;
  }

  section.innerHTML = `
          <div class="step-label"><span class="num">02</span> Tambahkan fitur (opsional)</div>
          ${featureGroups
            .map(
              (group) => `
            <div class="feature-group">
              <div class="feature-group-title">${group.title}</div>
              <div class="feature-list">
                ${group.items
                  .map(
                    (f) => `
                  <div class="feature-row ${selectedFeatures.has(f.id) ? "active" : ""}" data-id="${f.id}">
                    <div class="feature-left">
                      <div class="checkbox">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#0b0d14" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <div class="feature-info">
                        <div class="feature-name">${f.name}</div>
                        <div class="feature-desc">${f.desc}</div>
                      </div>
                    </div>
                    <div class="feature-price">+${formatRupiah(f.price)}</div>
                  </div>
                `,
                  )
                  .join("")}
              </div>
            </div>
          `
            )
            .join("")} 
        `;

  section.querySelectorAll(".feature-row").forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.dataset.id;
      if (selectedFeatures.has(id)) selectedFeatures.delete(id);
      else selectedFeatures.add(id);
      renderFeatures();
      updateSummary();
    });
  });
}

function getFeatureData(id) {
  for (const g of featureGroups) {
    const f = g.items.find((x) => x.id === id);
    if (f) return f;
  }
  return null;
}

function animateNumber(el, from, to, duration = 400) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(from + (to - from) * eased);
    el.textContent = formatRupiah(current);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

let lastTotal = 0;

function updateSummary() {
  const totalEl = document.getElementById("totalPrice");
  const metaEl = document.getElementById("metaInfo");
  const ctaBtn = document.getElementById("ctaBtn");
  const emptyHint = document.getElementById("emptyHint");

  if (!selectedBase) {
    animateNumber(totalEl, lastTotal, 0);
    lastTotal = 0;
    metaEl.textContent = "Pilih jenis website untuk mulai";
    ctaBtn.disabled = true;
    emptyHint.classList.add("show");
    return;
  }

  emptyHint.classList.remove("show");
  const base = basePackages.find((p) => p.id === selectedBase);
  let total = base.price;
  let featureCount = selectedFeatures.size;

  selectedFeatures.forEach((id) => {
    const f = getFeatureData(id);
    if (f) total += f.price;
  });

  animateNumber(totalEl, lastTotal, total);
  lastTotal = total;

  metaEl.textContent = `${base.name} + ${featureCount} fitur tambahan`;
  ctaBtn.disabled = false;
}

document.getElementById("ctaBtn").addEventListener("click", () => {
  if (!selectedBase) return;
  const base = basePackages.find((p) => p.id === selectedBase);
  let total = base.price;
  let lines = [`Halo Ibnu, saya mau tanya-tanya soal pembuatan website.`, ``, `Jenis: ${base.name} (${formatRupiah(base.price)})`];

  if (selectedFeatures.size > 0) {
    lines.push(``, `Fitur tambahan:`);
    selectedFeatures.forEach((id) => {
      const f = getFeatureData(id);
      if (f) {
        total += f.price;
        lines.push(`- ${f.name} (+${formatRupiah(f.price)})`);
      }
    });
  }

  lines.push(``, `Estimasi total: ${formatRupiah(total)}`, ``, `Boleh dibantu jelasin lebih lanjut?`);

  const message = encodeURIComponent(lines.join("\n"));
  window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, "_blank");
});

renderBase();
renderFeatures();
updateSummary();
