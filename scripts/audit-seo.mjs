#!/usr/bin/env node
/**
 * SEO + answer-engine audit over the exported site (out/).
 *
 * Zero dependencies, same spirit as check-static-routes.mjs: read what the
 * build actually produced, not what the source intends. Reports problems as
 * warnings and exits non-zero only on the hard failures (missing title, no
 * H1, duplicate titles, orphan pages) so it can run in CI next to the route
 * check without becoming noise.
 *
 * Usage: node scripts/audit-seo.mjs [--strict]
 */
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "out");
const STRICT = process.argv.includes("--strict");

const read = (file) => readFile(file, "utf8");
const exists = async (file) => {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
};

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&rsquo;/g, "’")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const words = (text) => (text ? text.split(" ").filter(Boolean).length : 0);

function ldTypes(html) {
  const types = new Set();
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    if (typeof node["@type"] === "string") types.add(node["@type"]);
    else if (Array.isArray(node["@type"])) node["@type"].forEach((t) => types.add(t));
    Object.values(node).forEach(walk);
  };
  for (const match of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      walk(JSON.parse(match[1]));
    } catch {
      types.add("INVALID_JSON");
    }
  }
  return types;
}

const sitemap = await read(path.join(OUT, "sitemap.xml"));
const routes = [
  ...new Set(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
      const url = new URL(m[1]);
      return decodeURIComponent(url.pathname).replace(/\/$/, "") || "/";
    }),
  ),
].sort();

const fileFor = (route) =>
  route === "/" ? path.join(OUT, "index.html") : path.join(OUT, `${route.slice(1)}.html`);

const pages = [];
const linkTargets = new Map();

for (const route of routes) {
  const file = fileFor(route);
  if (!(await exists(file))) {
    pages.push({ route, missing: true });
    continue;
  }
  const html = await read(file);
  const title = strip(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const description = strip(
    html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "",
  );
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => strip(m[1]));
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => strip(m[1]));
  const canonical =
    html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "";
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  /* alt="" is correct for decorative images; a missing alt attribute is not. */
  const noAlt = imgs.filter((tag) => !/\balt=/.test(tag)).length;
  const links = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((m) =>
    m[1].replace(/\/$/, "") || "/",
  );
  linkTargets.set(route, new Set(links));
  const text = strip(html);
  const prices = [...new Set(text.match(/PKR [\d,]+/g) ?? [])];
  const hasDate = /(\d{4}-\d{2}-\d{2}|20\d\d)/.test(text);
  const types = ldTypes(html);

  pages.push({
    route,
    title,
    titleLen: title.length,
    description,
    descLen: description.length,
    h1s,
    h2s,
    questionH2s: h2s.filter((h) => h.endsWith("?")).length,
    canonical,
    words: words(text),
    noAlt,
    imgs: imgs.length,
    prices,
    hasDate,
    types: [...types].sort(),
    links: new Set(links).size,
    hasAnswerBlock: /class="(answer|guide-answer|note-takeaway)/.test(html),
    hasFaqSchema: types.has("FAQPage"),
  });
}

const real = pages.filter((p) => !p.missing);
const warnings = [];
const failures = [];

/* ---- 1. Baseline metadata ---- */
for (const p of real) {
  if (!p.title) failures.push(`${p.route} has no <title>`);
  if (!p.description) failures.push(`${p.route} has no meta description`);
  if (p.h1s.length !== 1) failures.push(`${p.route} has ${p.h1s.length} H1 elements`);
  if (p.titleLen > 60 && p.titleLen <= 65)
    warnings.push(`${p.route} title is ${p.titleLen} chars (clips near 60): "${p.title}"`);
  if (p.titleLen > 65)
    warnings.push(`${p.route} title is ${p.titleLen} chars (truncates ~60): "${p.title}"`);
  if (p.descLen > 165)
    failures.push(`${p.route} description is ${p.descLen} chars (>165 is clipped)`);
  if (p.descLen && p.descLen < 110)
    warnings.push(`${p.route} description is only ${p.descLen} chars`);
  if (!p.canonical) failures.push(`${p.route} has no canonical`);
  if (p.noAlt) failures.push(`${p.route} has ${p.noAlt}/${p.imgs} images with no alt attribute`);
  /* /brief is an interactive form by design; its copy lives in the client
     component and is not a ranking target. Everything else must earn its URL. */
  if (p.words < 250 && p.route !== "/brief")
    warnings.push(`${p.route} is thin: ${p.words} words of visible text`);
}

/* ---- 2. Duplicate titles / descriptions ---- */
const dupes = (key) => {
  const map = new Map();
  for (const p of real) {
    const value = p[key];
    if (!value) continue;
    map.set(value, [...(map.get(value) ?? []), p.route]);
  }
  for (const [value, list] of map) {
    if (list.length > 1) failures.push(`duplicate ${key}: ${list.join(", ")} — "${value.slice(0, 60)}"`);
  }
};
dupes("title");
dupes("description");

/* ---- 3. Orphans: every route must be linked from somewhere else ---- */
for (const p of real) {
  const linkedFrom = real.filter(
    (other) => other.route !== p.route && linkTargets.get(other.route)?.has(p.route),
  );
  if (linkedFrom.length === 0) failures.push(`${p.route} is orphaned — no internal links to it`);
}

/* ---- 4. Answer-engine readiness ---- */
for (const p of real) {
  if (!p.types.length) warnings.push(`${p.route} has no JSON-LD at all`);
  if (!p.hasDate) warnings.push(`${p.route} never states a date (freshness signal)`);
}
const lowLinks = real.filter((p) => p.links < 8);
for (const p of lowLinks) warnings.push(`${p.route} has only ${p.links} internal links`);

/* ---- 5. Price questions: does any page answer one in the HTML? ---- */
const pricePages = real.filter((p) => p.prices.length >= 3);
if (!pricePages.length) failures.push("no page states three or more published prices in its HTML");

/* ---- 6. Machine-readable surface ---- */
const llmsPath = path.join(OUT, "llms.txt");
const llms = (await exists(llmsPath)) ? await read(llmsPath) : "";
if (!llms) failures.push("llms.txt is missing");
if (llms && !/PKR [\d,]+/.test(llms))
  warnings.push("llms.txt states no prices — an answer engine summarizing cost gets nothing");

const robots = (await exists(path.join(OUT, "robots.txt")))
  ? await read(path.join(OUT, "robots.txt"))
  : "";
if (!/Sitemap:/.test(robots)) failures.push("robots.txt does not point at the sitemap");

let feedOk = false;
try {
  const feed = await read(path.join(OUT, "feed.xml"));
  feedOk = (feed.match(/<item>/g) ?? []).length > 0;
} catch {
  /* handled below */
}
if (!feedOk) warnings.push("feed.xml missing or empty");

/* ---- Report ---- */
const pad = (s, n) => String(s).padEnd(n);
console.log(`\nSEO / answer-engine audit — ${real.length} routes from sitemap.xml\n`);
console.log(
  pad("route", 30) +
    pad("words", 7) +
    pad("title", 7) +
    pad("desc", 6) +
    pad("h2?", 5) +
    pad("links", 7) +
    "schema",
);
console.log("-".repeat(112));
for (const p of [...real].sort((a, b) => b.words - a.words)) {
  console.log(
    pad(p.route, 30) +
      pad(p.words, 7) +
      pad(p.titleLen, 7) +
      pad(p.descLen, 6) +
      pad(p.questionH2s, 5) +
      pad(p.links, 7) +
      p.types.join(",").slice(0, 46),
  );
}

const faqCoverage = real.filter((p) => p.hasFaqSchema).length;
console.log(
  `\nFAQPage schema on ${faqCoverage}/${real.length} routes · ` +
    `${pricePages.length} routes state 3+ prices · llms.txt ${llms ? `${words(llms)} words` : "missing"}`,
);

if (warnings.length) {
  console.log(`\n${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  · ${w}`);
}
if (failures.length) {
  console.log(`\n${failures.length} failure(s):`);
  for (const f of failures) console.log(`  ✗ ${f}`);
}
if (!warnings.length && !failures.length) console.log("\nNo findings.");

if (failures.length || (STRICT && warnings.length)) process.exitCode = 1;
