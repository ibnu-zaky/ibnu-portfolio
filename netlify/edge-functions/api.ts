import { Elysia } from "elysia";

const app = new Elysia({ aot: false })
  // CORS — allow same-origin and common dev origins
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
  .get("/api", () => {
    return { status: "OK", message: "ElysiaJS API running on Netlify Edge!" };
  })

  // Portfolio data
  .get("/api/portfolio", () => {
    return [
      { id: 1, title: "Indomontir", description: "Website Service Mobil — platform otomotif via WhatsApp" },
      { id: 2, title: "Foranggis", description: "Child Aspiration Website — aspirasi anak se-kecamatan Cimanggis" },
      { id: 3, title: "Inpex Oil & Gas", description: "Desain aplikasi MOC untuk perusahaan minyak dan gas" },
    ];
  })

  // Contact form handler
  .post("/api/contact", async ({ request }) => {
    try {
      const body = await request.json();
      const { name, email, message } = body;

      if (!name || !email || !message) {
        return { success: false, message: "Semua field wajib diisi." };
      }

      // Log the contact submission (in production, send email / save to DB)
      console.log(`[Contact] ${name} <${email}>: ${message}`);

      return { success: true, message: "Pesan berhasil diterima! Terima kasih." };
    } catch {
      return { success: false, message: "Format data tidak valid." };
    }
  })

  // Pageview analytics endpoint
  .post("/api/pageview", async ({ request }) => {
    try {
      const body = await request.json();
      const { path, referrer, timestamp } = body;

      // Log the pageview (in production, save to DB / analytics service)
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
