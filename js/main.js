const themeBtn = document.getElementById("themeBtn");
const storedTheme = localStorage.getItem("theme");
let dark = storedTheme ? storedTheme === "dark" : true;
document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
themeBtn.textContent = dark ? "🌙" : "☀️";
themeBtn.addEventListener("click", () => {
  dark = !dark;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  themeBtn.textContent = dark ? "🌙" : "☀️";
  localStorage.setItem("theme", dark ? "dark" : "light");
});
document
  .getElementById("ham")
  .addEventListener("click", () =>
    document.getElementById("navLinks").classList.toggle("open"),
  );
const phrases = ["Web Designer.", "Front End Developer.", "UI/UX Enthusiast."];
let pi = 0,
  ci = 0,
  del = false;
const te = document.getElementById("typed");
(function loop() {
  const cur = phrases[pi];
  if (!del) {
    te.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) {
      del = true;
      setTimeout(loop, 1800);
      return;
    }
  } else {
    te.textContent = cur.slice(0, --ci);
    if (ci === 0) {
      del = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(loop, del ? 45 : 95);
})();
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target
        .querySelectorAll(".sk-fill")
        .forEach((f) => (f.style.width = f.dataset.w + "%"));
      obs.unobserve(e.target);
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".r").forEach((el) => obs.observe(el));
window.addEventListener("load", () => {
  document
    .querySelectorAll(".hero .r")
    .forEach((el, i) =>
      setTimeout(() => el.classList.add("in"), 150 + i * 140),
    );
});
// ── Dynamic Project Loader ────────────────────────────────────────
const categoryLabels = {
  frontend: "Front End",
  design: "Apps Design",
  teamwork: "Team Work",
};

function renderCard(project, index) {
  const cats = project.categories.join(" ");
  const delay = index > 0 ? ` d${index}` : "";
  const tags = project.categories
    .map((c) => `<span class="tag">${categoryLabels[c] || c}</span>`)
    .join("");

  let thumbHTML;
  if (project.image) {
    thumbHTML = `<div class="card-thumb"><img src="${project.image}" alt="${project.title}" loading="lazy" /></div>`;
  } else if (project.placeholder) {
    thumbHTML = `<div class="card-thumb" style="background:linear-gradient(135deg,#0a0a1a,#12122a)"><div class="card-ph"><span class="ph-t">${project.placeholder.title}</span><span class="ph-s">${project.placeholder.subtitle}</span></div></div>`;
  } else {
    thumbHTML = `<div class="card-thumb"></div>`;
  }

  const linkHTML = project.link
    ? `<a href="${project.link}" target="_blank" class="card-link"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>`
    : `<span class="card-link" style="opacity:.3"><i class="fa-solid fa-arrow-up-right-from-square"></i></span>`;

  return `<div class="card r${delay}" data-cat="${cats}">${thumbHTML}<div class="card-body"><div class="card-tags">${tags}</div><h3 class="card-title">${project.title}</h3><p class="card-desc">${project.description}</p><div class="card-foot"><span class="card-date">${project.date}</span>${linkHTML}</div></div></div>`;
}

function bindFilters() {
  document.querySelectorAll(".f-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".f-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      document.querySelectorAll(".card").forEach((c) => {
        c.classList.toggle(
          "hidden",
          f !== "all" && !c.dataset.cat.split(" ").includes(f),
        );
      });
    });
  });
}

async function loadProjects() {
  const container = document.getElementById("projectCards");
  if (!container) return;

  try {
    const res = await fetch("/api/portfolio");
    const projects = await res.json();
    container.innerHTML = projects.map(renderCard).join("");
  } catch {
    // Fallback: if API is not available, show a message
    container.innerHTML = `<p style="color:var(--muted);font-size:.9rem;">Memuat project...</p>`;
  }

  // Re-observe new cards for reveal animation
  container.querySelectorAll(".r").forEach((el) => obs.observe(el));
  bindFilters();
}

loadProjects();

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("submitBtn");
    const feedback = document.getElementById("formFeedback");
    
    btn.disabled = true;
    btn.textContent = "Mengirim...";
    feedback.textContent = "";
    feedback.className = "form-feedback";

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (response.ok && result.success) {
        feedback.textContent = result.message || "Pesan berhasil dikirim!";
        feedback.classList.add("success");
        contactForm.reset();
      } else {
        throw new Error(result.message || "Gagal mengirim pesan.");
      }
    } catch (err) {
      feedback.textContent = err.message || "Terjadi kesalahan koneksi.";
      feedback.classList.add("error");
    } finally {
      btn.disabled = false;
      btn.textContent = "Kirim Pesan ↗";
    }
  });
}

// Pageview Tracking — fire on load
try {
  navigator.sendBeacon(
    "/api/pageview",
    JSON.stringify({
      path: window.location.pathname,
      referrer: document.referrer || "direct",
      timestamp: new Date().toISOString(),
    })
  );
} catch (_) {}
