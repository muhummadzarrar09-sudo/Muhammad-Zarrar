import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory, parent = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.join(parent, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(path.join(directory, entry.name), relative)));
    } else {
      files.push(relative.split(path.sep).join("/"));
    }
  }

  return files;
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function routeForHtmlFile(relativeFile) {
  const withoutExtension = relativeFile.slice(0, -".html".length);
  return withoutExtension === "index" ? "/" : `/${withoutExtension}`;
}

function normalizedCanonical(value) {
  const url = new URL(value);
  // The origin and the origin with a slash are the same root canonical URL.
  return url.pathname === "/" && !url.search && !url.hash ? url.origin : url.toString();
}

try {
  const sitemapPath = path.join(OUT, "sitemap.xml");
  assert(await exists(sitemapPath), "out/sitemap.xml was not generated");

  const sitemapXml = await readFile(sitemapPath, "utf8");
  const urls = [...sitemapXml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((match) =>
    decodeXml(match[1].trim()),
  );
  assert(urls.length > 0, "sitemap.xml contains no <loc> entries");

  const sitemapEntries = urls.map((url) => new URL(url));
  const origins = new Set(sitemapEntries.map((url) => url.origin));
  assert(origins.size === 1, "sitemap entries use more than one canonical host");
  const origin = sitemapEntries[0].origin;
  const sitemapRoutes = sitemapEntries.map(({ pathname }) => pathname);
  const sitemapRouteSet = new Set(sitemapRoutes);

  assert(
    sitemapRouteSet.size === sitemapRoutes.length,
    "sitemap.xml contains duplicate routes",
  );
  assert(!sitemapRouteSet.has("/breif"), "the typo redirect must not be indexed");

  for (const route of sitemapRoutes) {
    assert(!route.endsWith(".html"), `sitemap URL must be extensionless: ${route}`);
    assert(route === "/" || !route.endsWith("/"), `unexpected trailing slash: ${route}`);

    const relativeHtml = route === "/" ? "index.html" : `${route.slice(1)}.html`;
    const htmlPath = path.join(OUT, ...relativeHtml.split("/"));
    assert(await exists(htmlPath), `sitemap route has no exported HTML file: ${route}`);

    const html = await readFile(htmlPath, "utf8");
    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    assert(canonical, `exported page has no canonical tag: ${route}`);
    assert(
      normalizedCanonical(canonical) === normalizedCanonical(`${origin}${route}`),
      `canonical does not match ${route}: ${canonical}`,
    );
  }

  const exportedHtmlFiles = (await walk(OUT)).filter(
    (file) =>
      file.endsWith(".html") &&
      file !== "404.html" &&
      file !== "_not-found.html",
  );
  const exportedRoutes = new Set(exportedHtmlFiles.map(routeForHtmlFile));
  const missingFromSitemap = [...exportedRoutes].filter((route) => !sitemapRouteSet.has(route));
  const missingFromExport = [...sitemapRouteSet].filter((route) => !exportedRoutes.has(route));

  assert(
    missingFromSitemap.length === 0,
    `exported pages missing from sitemap: ${missingFromSitemap.join(", ")}`,
  );
  assert(
    missingFromExport.length === 0,
    `sitemap routes missing from export: ${missingFromExport.join(", ")}`,
  );

  const robots = await readFile(path.join(OUT, "robots.txt"), "utf8");
  assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "robots.txt does not point to this sitemap");

  const vercel = JSON.parse(await readFile(path.join(ROOT, "vercel.json"), "utf8"));
  assert(vercel.cleanUrls === true, "Vercel must map extensionless URLs to exported .html files");
  assert(
    vercel.redirects?.some(
      (rule) => rule.source === "/breif" && rule.destination === "/brief" && rule.permanent,
    ),
    "Vercel is missing the /breif → /brief permanent redirect",
  );

  const cloudflareRedirects = await readFile(path.join(OUT, "_redirects"), "utf8");
  assert(
    cloudflareRedirects.split(/\r?\n/).some((line) => line.trim() === "/breif /brief 301"),
    "Cloudflare Pages is missing the /breif → /brief redirect",
  );

  console.log(
    `Verified ${sitemapRoutes.length} direct routes: each has exported HTML, a matching canonical, a sitemap entry, and host routing config.`,
  );
} catch (error) {
  console.error(`Static route check failed: ${error.message}`);
  process.exitCode = 1;
}
