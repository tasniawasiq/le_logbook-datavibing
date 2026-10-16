// Offline support for VMR Log.
// Pages: try the network first so updates show up, fall back to the saved copy offline.
// Everything else: use the saved copy if there is one.
const CACHE = "vmr-log-v1";
const FILES = ["./", "./index.html", "./manifest.json",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy));
      return res;
    }).catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok && (req.url.startsWith(self.location.origin) || req.url.includes("fonts.g"))) {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
  }).catch(() => hit)));
});
