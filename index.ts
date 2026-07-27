import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";

const app = new Elysia()
  .use(staticPlugin({
    assets: ".",
    prefix: "/"
  }))
  .get("/", () => Bun.file("index.html"))
  .get("/blog", () => Bun.file("blog.html"))
  .get("/kalkulator-harga-website", () => Bun.file("kalkulator-harga-website.html"))
  .get("/penghitung-hpp", () => Bun.file("penghitung-hpp.html"))
  .get("/tools", () => Bun.file("tools.html"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);