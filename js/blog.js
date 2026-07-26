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

// Hamburger
const navLinks = document.getElementById("navLinks");
document.getElementById("ham").addEventListener("click", () =>
  navLinks.classList.toggle("open"),
);

// Reveal animation
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      obs.unobserve(e.target);
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".r").forEach((el) => obs.observe(el));

const postList = document.getElementById("postList");
const postDetail = document.getElementById("postDetail");
const backBtn = document.getElementById("backBtn");

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" });
}

function renderPostList(posts) {
  if (!posts.length) {
    postList.innerHTML = `<p style="color:var(--muted)">Belum ada artikel.</p>`;
    return;
  }
  postList.innerHTML = posts
    .map(
      (p) => `
          <div class="post-card" data-slug="${p.slug}">
            <div class="post-card-meta">
              <span class="post-card-date">${formatDate(p.date)}</span>
              <div class="post-card-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
            </div>
            <h2 class="post-card-title">${p.title}</h2>
            <p class="post-card-excerpt">${p.excerpt}</p>
            <span class="post-card-read">Baca selengkapnya →</span>
          </div>`,
    )
    .join("");

  postList.querySelectorAll(".post-card").forEach((card) => {
    card.addEventListener("click", () => openPost(card.dataset.slug));
  });
}

async function openPost(slug) {
  postList.style.display = "none";
  postDetail.style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });

  try {
    const res = await fetch(`/api/posts/${slug}`);
    const post = await res.json();

    document.getElementById("postTitle").textContent = post.title;
    document.getElementById("postDate").textContent = formatDate(post.date);
    document.getElementById("postTags").innerHTML = post.tags
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");
    document.getElementById("postContent").innerHTML = post.content
      .split("\n\n")
      .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
      .join("");

    postDetail.querySelectorAll(".r").forEach((el) => {
      el.classList.remove("in");
      obs.observe(el);
    });
  } catch {
    document.getElementById("postContent").innerHTML = `<p style="color:#ff5555">Gagal memuat artikel.</p>`;
  }
}

backBtn.addEventListener("click", () => {
  postDetail.style.display = "none";
  postList.style.display = "block";
});

async function loadPosts() {
  try {
    const res = await fetch("/api/posts");
    const posts = await res.json();
    renderPostList(posts);
  } catch {
    postList.innerHTML = `<p style="color:var(--muted)">Gagal memuat daftar artikel.</p>`;
  }
}

loadPosts();

try {
  navigator.sendBeacon(
    "/api/pageview",
    JSON.stringify({
      path: window.location.pathname,
      referrer: document.referrer || "direct",
      timestamp: new Date().toISOString(),
    }),
  );
} catch (_) {}
