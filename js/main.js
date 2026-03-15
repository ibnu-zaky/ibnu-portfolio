const themeBtn = document.getElementById("themeBtn");
let dark = true;
themeBtn.addEventListener("click", () => {
  dark = !dark;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  themeBtn.textContent = dark ? "🌙" : "☀️";
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
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: "smooth" });
    }
  });
});
