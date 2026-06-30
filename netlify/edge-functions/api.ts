import { Elysia } from "elysia";

// ── Inline Data (JSON-based CMS) ──────────────────────────────────
const projects = [
  {
    id: 1,
    title: "Indomontir — Website Service Mobil",
    description:
      "Platform otomotif yang memudahkan user berinteraksi langsung dengan montir via WhatsApp.",
    categories: ["frontend", "teamwork"],
    image: "img/indomontir.png",
    link: "https://indomontir.id/",
    date: "Nov 2023",
  },
  {
    id: 2,
    title: "Foranggis — Child Aspiration Website",
    description:
      "Website aspirasi anak se-kecamatan Cimanggis untuk pemenuhan hak-hak anak secara digital.",
    categories: ["frontend", "teamwork"],
    image: "img/foranggis.png",
    link: "https://foranggis.com/",
    date: "Dec 2023",
  },
  {
    id: 3,
    title: "Inpex Oil & Gas — MOC System",
    description:
      "Desain aplikasi Management of Change untuk perusahaan minyak dan gas internasional Inpex.",
    categories: ["design", "teamwork"],
    image: null,
    placeholder: { title: "INPEX", subtitle: "Oil & Gas · MOC" },
    link: null,
    date: "Dec 2023",
  },
];

const posts = [
  {
    slug: "perjalanan-menjadi-web-developer",
    title: "Perjalanan Saya Menjadi Web Developer",
    excerpt:
      "Cerita tentang bagaimana saya memulai karir di dunia web development, dari belajar HTML dasar sampai membangun project nyata.",
    content:
      "Semua bermula dari rasa penasaran. Saat pertama kali membuka browser dan melihat sebuah website, saya bertanya: bagaimana ini dibuat?\n\nSaya mulai belajar HTML dan CSS secara otodidak melalui YouTube dan dokumentasi online. Awalnya sulit — banyak istilah yang tidak saya mengerti, dan hasil kode saya sering kali berantakan.\n\nNamun dengan konsistensi dan latihan setiap hari, pelan-pelan semuanya mulai masuk akal. Dari membuat halaman sederhana, saya mulai bereksperimen dengan layout yang lebih kompleks, lalu mulai belajar JavaScript.\n\nProject pertama saya yang \"serius\" adalah Indomontir — sebuah website service mobil. Ini adalah pengalaman pertama saya bekerja dalam tim, dan saya belajar banyak tentang kolaborasi, version control dengan Git, dan deadline management.\n\nSekarang, saya terus mengembangkan skill di bidang UI/UX design dan front-end development. Saya percaya bahwa kombinasi desain yang indah dan kode yang bersih adalah kunci untuk menciptakan pengalaman web yang luar biasa.\n\nTips untuk yang baru mulai belajar:\n• Mulai dari dasar — HTML dan CSS adalah fondasi\n• Jangan takut membuat kesalahan\n• Bangun project nyata, bukan hanya mengikuti tutorial\n• Bergabung dengan komunitas developer\n• Konsistensi lebih penting daripada intensitas",
    tags: ["career", "webdev"],
    date: "2024-06-15",
  },
  {
    slug: "tips-desain-ui-untuk-pemula",
    title: "5 Tips Desain UI yang Wajib Diketahui Pemula",
    excerpt:
      "Prinsip-prinsip dasar desain antarmuka yang bisa langsung meningkatkan kualitas visual project kamu.",
    content:
      "Desain UI yang baik bukan soal bakat — ini soal prinsip. Berikut 5 tips yang saya pelajari selama 2 tahun terakhir:\n\n1. Hierarchy Visual\nGunakan ukuran font, warna, dan spacing untuk mengarahkan mata pengguna. Elemen yang paling penting harus paling menonjol.\n\n2. Konsistensi\nGunakan sistem warna, tipografi, dan spacing yang konsisten di seluruh halaman. Buat design tokens (variabel CSS) sejak awal project.\n\n3. Whitespace Adalah Teman\nJangan takut dengan ruang kosong. Whitespace membuat konten lebih mudah dibaca dan desain terasa lebih premium.\n\n4. Pilih Maksimal 2 Font\nGunakan satu font untuk heading (misalnya Syne) dan satu untuk body text (misalnya DM Sans). Terlalu banyak font membuat desain terlihat tidak profesional.\n\n5. Warna dengan Tujuan\nSetiap warna harus punya alasan. Gunakan accent color untuk elemen interaktif dan CTA. Gunakan warna netral untuk teks dan background.\n\nBonus: Selalu desain untuk mobile terlebih dahulu (mobile-first), lalu scale up ke desktop.",
    tags: ["design", "tips"],
    date: "2024-07-20",
  },
  {
    slug: "kenapa-saya-pilih-figma",
    title: "Kenapa Saya Memilih Figma untuk Desain",
    excerpt:
      "Perbandingan tool desain dan alasan kenapa Figma menjadi pilihan utama saya untuk UI/UX design.",
    content:
      "Ketika saya pertama kali mulai belajar desain, saya mencoba berbagai tools: Photoshop, Canva, Adobe XD, dan Figma. Masing-masing punya kelebihan, tapi pada akhirnya Figma menjadi pilihan utama saya.\n\nAlasan utamanya:\n\nGratis dan Berbasis Browser\nFigma bisa diakses dari browser tanpa perlu install aplikasi berat. Versi gratis sudah sangat powerful untuk individual designer.\n\nKolaborasi Real-time\nSeperti Google Docs untuk desain — tim bisa bekerja di file yang sama secara bersamaan. Ini sangat membantu saat bekerja dengan developer.\n\nAuto Layout\nFitur Auto Layout di Figma membuat responsive design jadi jauh lebih mudah. Komponen bisa menyesuaikan ukuran secara otomatis.\n\nPlugin Ecosystem\nAda ribuan plugin gratis: icon libraries, image placeholders, color palette generators, dan banyak lagi.\n\nPrototyping Built-in\nTidak perlu tool terpisah untuk membuat prototype interaktif. Semuanya bisa dilakukan di dalam Figma.\n\nDesign System Ready\nDengan fitur Components dan Styles, membuat design system yang konsisten jadi sangat mudah.\n\nUntuk yang baru mulai belajar desain, saya sangat merekomendasikan Figma. Kurva belajarnya tidak terlalu curam, dan komunitasnya sangat supportive.",
    tags: ["design", "tools"],
    date: "2024-08-10",
  },
];

// ── Elysia App ────────────────────────────────────────────────────
const app = new Elysia({ aot: false })
  // CORS
  .onBeforeHandle(({ request, set }) => {
    const origin = request.headers.get("origin") || "";
    set.headers["Access-Control-Allow-Origin"] = origin || "*";
    set.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    set.headers["Access-Control-Allow-Headers"] = "Content-Type";

    if (request.method === "OPTIONS") {
      set.status = 204;
      return "";
    }
  })

  // Health check
  .get("/api", () => ({
    status: "OK",
    message: "ElysiaJS API running on Netlify Edge!",
  }))

  // Portfolio — returns all projects
  .get("/api/portfolio", () => projects)

  // Blog — returns all posts (without full content)
  .get("/api/posts", () =>
    posts.map(({ content, ...rest }) => rest)
  )

  // Blog — returns a single post by slug
  .get("/api/posts/:slug", ({ params: { slug } }) => {
    const post = posts.find((p) => p.slug === slug);
    if (!post) return { error: "Post not found" };
    return post;
  })

  // Contact form handler
  .post("/api/contact", async ({ request }) => {
    try {
      const body = await request.json();
      const { name, email, message } = body;

      if (!name || !email || !message) {
        return { success: false, message: "Semua field wajib diisi." };
      }

      console.log(`[Contact] ${name} <${email}>: ${message}`);
      return {
        success: true,
        message: "Pesan berhasil diterima! Terima kasih.",
      };
    } catch {
      return { success: false, message: "Format data tidak valid." };
    }
  })

  // Pageview analytics
  .post("/api/pageview", async ({ request }) => {
    try {
      const body = await request.json();
      const { path, referrer, timestamp } = body;
      console.log(`[Pageview] ${path} | ref: ${referrer} | at: ${timestamp}`);
      return { tracked: true };
    } catch {
      return { tracked: false };
    }
  });

export default async (request: Request) => {
  return app.handle(request);
};

export const config = { path: "/api/*" };
