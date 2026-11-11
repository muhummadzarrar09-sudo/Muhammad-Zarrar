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

  // Field Notes must be followable: one static feed containing every note,
  // advertised in the head of the index, plus an llms.txt that points at it.
  const feed = await readFile(path.join(OUT, "feed.xml"), "utf8");
  assert(feed.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), "feed.xml is not XML");
  assert(feed.includes('<rss version="2.0"'), "feed.xml is not an RSS 2.0 document");
  for (const route of sitemapRoutes.filter((path) => path.startsWith("/notes/"))) {
    assert(
      feed.includes(`${origin}${route}<`),
      `feed.xml is missing a note: ${route}`,
    );
  }

  const notesIndexHtml = await readFile(path.join(OUT, "notes.html"), "utf8");
  assert(
    notesIndexHtml.includes('type="application/rss+xml"') &&
      notesIndexHtml.includes(`${origin}/feed.xml`),
    "the notes index does not advertise the RSS feed",
  );
  assert(
    notesIndexHtml.includes('type="search"'),
    "the notes index lost its search field",
  );
  for (const route of sitemapRoutes.filter((path) => path.startsWith("/notes/"))) {
    assert(
      notesIndexHtml.includes(`href="${route}"`),
      `the notes index does not link to ${route} in its pre-JS HTML`,
    );
  }

  const llms = await readFile(path.join(OUT, "llms.txt"), "utf8");
  assert(llms.startsWith(`# `), "llms.txt is missing its H1");
  assert(llms.includes(`${origin}/feed.xml`), "llms.txt does not point at the feed");
  assert(llms.includes(`${origin}/sitemap.xml`), "llms.txt does not point at the sitemap");
  assert(
    llms.includes("PKR 150,000"),
    "llms.txt states no prices — an answer engine summarizing cost has nothing to quote",
  );
  assert(
    llms.includes("How to cite this site"),
    "llms.txt lost its citation guidance",
  );

  // Every note needs its own share card and tab icon, and the exported post
  // must actually point at them. A note added without art fails the build.
  const noteSocial = JSON.parse(
    await readFile(path.join(ROOT, "src/content/note-social.json"), "utf8"),
  ).notes;

  for (const route of sitemapRoutes.filter((path) => path.startsWith("/notes/"))) {
    const slug = route.slice("/notes/".length);
    assert(
      noteSocial[slug],
      `note has no share-card art in src/content/note-social.json: ${slug}`,
    );

    const card = path.join(OUT, "social", "notes", `${slug}.png`);
    const icon = path.join(OUT, "social", "notes", `${slug}-icon.png`);
    assert(await exists(card), `missing share card for ${slug}`);
    assert(await exists(icon), `missing tab icon for ${slug}`);

    const html = await readFile(path.join(OUT, "notes", `${slug}.html`), "utf8");
    assert(
      html.includes(`${origin}/social/notes/${slug}.png`),
      `${slug} does not advertise its own share card`,
    );
    assert(
      html.includes(`href="/social/notes/${slug}-icon.png"`),
      `${slug} does not advertise its own tab icon`,
    );
    assert(
      html.includes('property="og:type" content="article"'),
      `${slug} is not declared as an article`,
    );
  }

  // The guides cluster: every guide ships a share card, the answer-first block
  // the snippet depends on, and FAQ schema that matches the questions actually
  // printed on the page. A guide added without any of that fails the build.
  const guideSocial = JSON.parse(
    await readFile(path.join(ROOT, "src/content/guide-social.json"), "utf8"),
  ).guides;
  const guideRoutes = sitemapRoutes.filter((path) => path.startsWith("/guides/"));
  assert(guideRoutes.length >= 4, `the guides cluster has only ${guideRoutes.length} routes`);

  const guidesIndexHtml = await readFile(path.join(OUT, "guides.html"), "utf8");
  for (const route of guideRoutes) {
    const slug = route.slice("/guides/".length);
    assert(
      guideSocial[slug],
      `guide has no share-card art in src/content/guide-social.json: ${slug}`,
    );
    assert(
      await exists(path.join(OUT, "social", "guides", `${slug}.png`)),
      `missing share card for guide ${slug}`,
    );
    assert(
      guidesIndexHtml.includes(`href="${route}"`),
      `the guides index does not link to ${route} in its pre-JS HTML`,
    );

    const html = await readFile(
      path.join(OUT, "guides", `${slug}.html`),
      "utf8",
    );
    assert(html.includes('class="guide-answer'), `guide ${slug} lost its answer block`);
    assert(
      html.includes(`${origin}/social/guides/${slug}.png`),
      `guide ${slug} does not advertise its own share card`,
    );
    assert(
      html.includes('"@type":"FAQPage"'),
      `guide ${slug} is missing FAQPage schema`,
    );
    const questions = html.match(/"@type":"Question"/g)?.length ?? 0;
    assert(questions >= 3, `guide ${slug} has only ${questions} schema questions`);
    assert(
      (html.match(/<details class="faq-entry"/g)?.length ?? 0) === questions,
      `guide ${slug}: FAQ questions on the page and in schema disagree`,
    );
  }

  // The cost estimator is server-rendered, and it must quote the same prices
  // the pricing page publishes. If either drifts, the build fails.
  const pricingHtml = await readFile(path.join(OUT, "pricing.html"), "utf8");
  assert(
    pricingHtml.includes('id="estimate"'),
    "the pricing page lost its cost estimator",
  );
  assert(
    pricingHtml.includes('class="estimator-figure"'),
    "the estimator has no server-rendered result",
  );
  assert(
    pricingHtml.includes('aria-pressed="true"'),
    "the estimator has no default selection in the pre-JS HTML",
  );
  for (const price of [
    "PKR 35,000",
    "PKR 150,000",
    "PKR 200,000",
    "PKR 250,000",
    "PKR 300,000",
  ]) {
    assert(
      pricingHtml.includes(price),
      `pricing page no longer publishes ${price} — the estimator would drift`,
    );
  }

  // The published price catalogue (src/content/price-list.ts) is what the
  // JSON-LD and llms.txt quote. Each display string must also be visible on
  // the page a customer reads, or the structured data is lying.
  assert(
    pricingHtml.includes('"@type":"OfferCatalog"'),
    "the pricing page lost its OfferCatalog",
  );
  assert(
    pricingHtml.includes('"@type":"AggregateOffer"'),
    "the pricing page lost its AggregateOffer price band",
  );
  const offerCount = (pricingHtml.match(/"@type":"Offer"/g) ?? []).length;
  assert(
    offerCount === 7,
    `the OfferCatalog lists ${offerCount} offers, expected 7`,
  );
  for (const display of [
    "PKR 35,000–50,000",
    "PKR 150,000",
    "PKR 300,000",
    "PKR 500,000",
    "from PKR 250,000",
    "from PKR 200,000",
    "from PKR 300,000",
  ]) {
    assert(
      pricingHtml.includes(display),
      `the price catalogue quotes "${display}" but the page does not show it`,
    );
  }

  // The FAQ hub must ship its questions in the HTML as well as in schema.
  const faqHtml = await readFile(path.join(OUT, "faq.html"), "utf8");
  assert(faqHtml.includes('"@type":"FAQPage"'), "the FAQ hub is missing FAQPage schema");
  const faqQuestions = faqHtml.match(/"@type":"Question"/g)?.length ?? 0;
  assert(faqQuestions >= 10, `the FAQ hub has only ${faqQuestions} schema questions`);
  assert(
    (faqHtml.match(/<details class="faq-entry"/g)?.length ?? 0) === faqQuestions,
    "FAQ questions on the page and in schema disagree",
  );

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
