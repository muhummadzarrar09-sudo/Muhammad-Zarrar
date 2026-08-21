/* Zarrar.Solutions service worker.
 * Deliberate pass-through: satisfies PWA installability without
 * caching stale content. Content freshness beats offline here. */
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  /* network-first by default — no respondWith, no cache drift */
});
