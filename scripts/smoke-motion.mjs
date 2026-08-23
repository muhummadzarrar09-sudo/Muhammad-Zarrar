import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const errors = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`[console] ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`));

const t = (name, ok, extra = "") =>
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? " — " + extra : ""}`);

// ---- 1. Home: motion boot ----
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(900);
const hasLenis = await page.evaluate(() =>
  document.documentElement.classList.contains("has-lenis")
);
t("Lenis boots on home", hasLenis);

const marqueeJs = await page.evaluate(() => {
  const track = document.querySelector(".marquee-track");
  const before = getComputedStyle(track).animationName;
  return { before, x1: track.getBoundingClientRect().left };
});
await page.waitForTimeout(700);
const x2 = await page.evaluate(
  () => document.querySelector(".marquee-track").getBoundingClientRect().left
);
t(
  "Marquee JS takeover (CSS anim off, track drifting)",
  marqueeJs.before === "none" && Math.abs(x2 - marqueeJs.x1) > 10,
  `anim=${marqueeJs.before}, dx=${(x2 - marqueeJs.x1).toFixed(1)}px`
);

// ---- 2. SplitText lines ----
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1200);
const lineCount = await page.evaluate(
  () => document.querySelectorAll(".tl-line").length
);
t("SplitText line masks on titles", lineCount >= 4, `tl-line count=${lineCount}`);

// ---- 3. Same-page anchor glide: header CTA -> #brief ----
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);
await page.click("a.header-cta");
await page.waitForTimeout(2200);
const briefTop = await page.evaluate(() => {
  const el = document.querySelector("#brief");
  return el ? el.getBoundingClientRect().top : null;
});
t(
  "#brief glide clears sticky header",
  briefTop !== null && briefTop > 60 && briefTop < 400,
  `brief top=${briefTop === null ? "null" : briefTop.toFixed(0)}px`
);

// ---- 4. Inner page: cross-route hash glide (/pricing -> /#brief) ----
await page.goto(BASE + "/pricing", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.click("a.header-cta"); // href="/#brief"
await page.waitForTimeout(3000);
const url = page.url();
const briefTop2 = await page.evaluate(() => {
  const el = document.querySelector("#brief");
  return el ? el.getBoundingClientRect().top : null;
});
t(
  "Cross-route /#brief glides on arrival",
  url.includes("#brief") && briefTop2 !== null && briefTop2 > 60 && briefTop2 < 500,
  `url=${url.replace(BASE, "")}, top=${briefTop2 === null ? "null" : briefTop2.toFixed(0)}px`
);

// ---- 5. Same-route footer link glides to top ----
await page.goto(BASE + "/pricing", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(400);
const scrollBefore = await page.evaluate(() => window.scrollY);
await page.click('.footer-col a[href="/pricing"]');
await page.waitForTimeout(2000);
const scrollAfter = await page.evaluate(() => window.scrollY);
t(
  "Footer same-route click glides to top",
  scrollBefore > 800 && scrollAfter < 120,
  `before=${scrollBefore.toFixed(0)}, after=${scrollAfter.toFixed(0)}`
);

// ---- 6. Back to top button ----
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(500);
await page.click("button.footer-top");
await page.waitForTimeout(2200);
const topY = await page.evaluate(() => window.scrollY);
t("Back-to-top glides", topY < 100, `scrollY=${topY.toFixed(0)}`);

// ---- 7. Inner page hero line entrance (page-hero h1 split) ----
await page.goto(BASE + "/about", { waitUntil: "networkidle" });
await page.waitForTimeout(1400);
const heroLines = await page.evaluate(() =>
  document.querySelectorAll(".page-hero h1 .tl-line").length
);
t("Page-hero h1 splits into lines", heroLines >= 1, `lines=${heroLines}`);

// ---- 8. Reduced motion: no JS takeover, no hidden content ----
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  reducedMotion: "reduce",
});
const rpage = await ctx.newPage();
rpage.on("pageerror", (e) => errors.push(`[reduced pageerror] ${e.message}`));
await rpage.goto(BASE + "/", { waitUntil: "networkidle" });
await rpage.waitForTimeout(900);
const reducedOk = await rpage.evaluate(() => {
  const html = document.documentElement;
  const track = document.querySelector(".marquee-track");
  const title = document.querySelector(".sec-title");
  return {
    hasReduced: html.classList.contains("has-motion-reduced"),
    noLenis: !html.classList.contains("has-lenis"),
    marqueeAnim: getComputedStyle(track).animationName,
    titleVisible: title && getComputedStyle(title).opacity === "1",
  };
});
t(
  "Reduced motion: static, content visible",
  reducedOk.hasReduced &&
    reducedOk.noLenis &&
    reducedOk.marqueeAnim !== "none" &&
    reducedOk.titleVisible
);

await browser.close();
console.log("\nConsole/page errors:", errors.length ? errors : "none");
