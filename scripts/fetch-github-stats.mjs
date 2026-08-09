/**
 * fetch-github-stats.mjs
 * Pulls live GitHub data at build time and writes to src/data/github.json
 * Uses unauthenticated REST API (60 req/hr) — enough for portfolio builds.
 * If GITHUB_TOKEN is set, uses it for higher rate limits.
 */

// Some CI/sandbox environments need TLS relaxation
process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= "1";
if (process.env.ALLOW_INSECURE_TLS === "1") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/data/github.json");

const USER = "muhummadzarrar09-sudo";
const HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

async function fetchJSON(url) {
  const r = await fetch(url, { headers: HEADERS });
  if (!r.ok) throw new Error(`GitHub API ${r.status}: ${url}`);
  return r.json();
}

function daysAgo(dateStr) {
  const ms = Date.now() - new Date(dateStr).getTime();
  return Math.floor(ms / 86_400_000);
}

function relativeDate(dateStr) {
  const d = daysAgo(dateStr);
  if (d === 0) return "today";
  if (d === 1) return "yesterday";
  if (d < 7) return `${d} days ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

async function main() {
  console.log("⏳ Fetching GitHub stats for", USER);

  // 1. User profile
  const profile = await fetchJSON(`https://api.github.com/users/${USER}`);
  const totalRepos = profile.public_repos;

  // 2. Repos sorted by last push (top 10)
  const repos = await fetchJSON(
    `https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`
  );

  const latestRepos = repos.slice(0, 10).map((r) => ({
    name: r.name,
    pushedAt: r.pushed_at,
    language: r.language,
    description: r.description,
    url: r.html_url,
    daysAgo: daysAgo(r.pushed_at),
  }));

  const latestPush = repos[0]?.pushed_at ?? new Date().toISOString();

  // 3. Recent events to estimate activity
  const events = await fetchJSON(
    `https://api.github.com/users/${USER}/events/public?per_page=100`
  );

  const pushEvents = events.filter((e) => e.type === "PushEvent");
  const recentCommits7d = pushEvents.filter(
    (e) => daysAgo(e.created_at) <= 7
  ).length;
  const recentCommits30d = pushEvents.filter(
    (e) => daysAgo(e.created_at) <= 30
  ).length;

  const stats = {
    totalRepos,
    latestPush: latestPush,
    latestPushRelative: relativeDate(latestPush),
    recentCommits7d,
    recentCommits30d,
    latestRepos,
    fetchedAt: new Date().toISOString(),
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(stats, null, 2) + "\n");
  console.log(`✅ Wrote ${OUT}`);
  console.log(`   Latest push: ${relativeDate(latestPush)}`);
  console.log(`   Public repos: ${totalRepos}`);
  console.log(`   Pushes (7d): ${recentCommits7d}, (30d): ${recentCommits30d}`);
}

main().catch((e) => {
  // GitHub activity is optional decoration, never a reason to make a deploy fail.
  // Keep the checked-in snapshot intact so TypeScript retains its stable data shape.
  console.warn("⚠️  Failed to refresh GitHub stats:", e.message);
  if (existsSync(OUT)) {
    console.warn("   Using the existing checked-in GitHub activity snapshot.");
    return;
  }

  // A fresh checkout should include the snapshot. Fail clearly if it does not,
  // rather than generating data with an unstable schema.
  throw new Error(`GitHub activity snapshot is missing: ${OUT}`);
});
