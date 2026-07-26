const themeBtn = document.getElementById("themeBtn");
const storedTheme = localStorage.getItem("theme");
let dark = storedTheme ? storedTheme === "dark" : true;
document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
if (themeBtn) {
  themeBtn.textContent = dark ? "🌙" : "☀️";
  themeBtn.addEventListener("click", () => {
    dark = !dark;
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    themeBtn.textContent = dark ? "🌙" : "☀️";
    localStorage.setItem("theme", dark ? "dark" : "light");
  });
}

const navLinks = document.getElementById("navLinks");
const ham = document.getElementById("ham");
if (ham && navLinks) {
  ham.addEventListener("click", () => navLinks.classList.toggle("open"));
}

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      obs.unobserve(e.target);
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".r").forEach((el) => obs.observe(el));
