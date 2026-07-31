// ─── Cache Versioning (bump versi ini setiap deploy baru) ───────────────────
const CACHE_VERSION = 'v7';
const CACHE_NAME = `portofolio-cache-${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
];

// ─── Install: Pre-cache aset statis ─────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => {
        // skipWaiting: SW baru langsung aktif tanpa menunggu tab lama ditutup
        self.skipWaiting();
      })
  );
});

// ─── Activate: Hapus cache lama secara otomatis ──────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name.startsWith('portofolio-cache-') && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => {
      // clients.claim: SW baru langsung mengontrol semua tab yang terbuka
      self.clients.claim();
    })
  );
});

// ─── Fetch: Strategi Cache-First dengan fallback ke network ─────────────────
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
