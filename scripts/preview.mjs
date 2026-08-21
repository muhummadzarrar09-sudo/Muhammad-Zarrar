/**
 * Zero-dependency preview server for the static export in ./out
 * (mirrors how Cloudflare Pages resolves clean URLs).
 * Run after `npm run build`: node scripts/preview.mjs
 */
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "out");
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

async function tryFile(filePath) {
  try {
    const s = await stat(filePath);
    if (!s.isFile()) return null;
    return readFile(filePath);
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
    const full = path.join(ROOT, safePath);
    if (!full.startsWith(ROOT)) {
      res.writeHead(403).end();
      return;
    }

    const candidates = [
      full,
      `${full}.html`,
      path.join(full, "index.html"),
    ];
    for (const candidate of candidates) {
      const data = await tryFile(candidate);
      if (data) {
        const ext = path.extname(candidate).toLowerCase();
        res.writeHead(200, {
          "Content-Type": MIME[ext] || "application/octet-stream",
          "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600",
        });
        res.end(data);
        return;
      }
    }

    const notFound = await tryFile(path.join(ROOT, "404.html"));
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(notFound ?? "404");
  } catch {
    res.writeHead(500).end();
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Preview of ./out → http://${HOST}:${PORT}`);
});
