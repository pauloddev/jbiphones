// Build estático sem dependências: copia o site para /dist e troca o
// placeholder da URL pela URL de produção.
// Ordem: VERCEL_PROJECT_PRODUCTION_URL (automática na Vercel) -> SITE_URL (site.config.mjs)
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { SITE_URL } from "../site.config.mjs";

const PLACEHOLDER = "https://TROCAR-PELO-LINK-DO-VERCEL.vercel.app";
const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const url = (prod ? `https://${prod}` : SITE_URL).replace(/\/+$/, "");

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");
cpSync("assets", "dist/assets", { recursive: true });

for (const f of ["favicon.ico", "favicon.svg", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "site.webmanifest", "og-image.jpg"]) {
  if (existsSync(f)) cpSync(f, `dist/${f}`);
  else console.warn(`[seo] Aviso: ${f} não existe na raiz do projeto.`);
}
for (const f of ["index.html", "404.html", "robots.txt", "sitemap.xml"]) {
  writeFileSync(`dist/${f}`, readFileSync(f, "utf8").split(PLACEHOLDER).join(url));
}
if (url === PLACEHOLDER) console.warn("[seo] Aviso: SITE_URL ainda é o placeholder. Configure site.config.mjs ou faça o deploy na Vercel.");
console.log(`[seo] Build pronto em /dist com SITE_URL = ${url}`);
