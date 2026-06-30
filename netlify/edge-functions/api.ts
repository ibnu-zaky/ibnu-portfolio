import { Elysia } from "elysia";

const app = new Elysia({ aot: false })
  .get("/api", () => {
    return { status: "OK", message: "ElysiaJS API running on Netlify Edge!" };
  })
  .get("/api/portfolio", () => {
    return [
      { id: 1, title: "Project A", description: "Deskripsi Project A" },
      { id: 2, title: "Project B", description: "Deskripsi Project B" },
    ];
  })
  .post("/api/contact", ({ body }) => {
    // Simulasi pemrosesan data form contact
    return { success: true, message: "Pesan berhasil diterima", data: body };
  });

export default async (request: Request) => {
  return app.handle(request);
};
