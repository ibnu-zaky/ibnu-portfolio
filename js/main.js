/* ── THEME TOGGLE ── */
const themeBtn = document.getElementById("themeBtn");
let dark = true;
themeBtn.addEventListener("click", () => {
  dark = !dark;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  themeBtn.textContent = dark ? "🌙" : "☀️";
});

/* ── HAMBURGER ── */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));

/* ── TYPED EFFECT ── */
const phrases = ["Web Designer.", "Front End Developer.", "UI/UX Enthusiast."];
let pi = 0,
  ci = 0,
  del = false;
const el = document.getElementById("typedText");
(function type() {
  const cur = phrases[pi];
  if (!del) {
    el.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) {
      del = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    el.textContent = cur.slice(0, --ci);
    if (ci === 0) {
      del = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, del ? 45 : 95);
})();

/* ── SCROLL REVEAL (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      // animate skill bars once visible
      e.target.querySelectorAll(".sk-fill").forEach((f) => {
        f.style.width = f.dataset.w + "%";
      });
      revealObserver.unobserve(e.target);
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((r) => revealObserver.observe(r));

// Hero elements: trigger immediately after load
window.addEventListener("load", () => {
  document.querySelectorAll(".hero .reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), 100 + i * 130);
  });
});

/* ── PROJECT FILTER ── */
const fBtns = document.querySelectorAll(".f-btn");
const cards = document.querySelectorAll(".card");

fBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    fBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    cards.forEach((c) => {
      const cats = c.dataset.cat.split(" ");
      c.classList.toggle("hidden", f !== "all" && !cats.includes(f));
    });
  });
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth" });
      navLinks.classList.remove("open");
    }
  });
});
