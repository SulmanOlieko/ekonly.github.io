const cacheName = 'acai-consultancy-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/acai-color.css',
  '/images/logo.png',
  '/images/logo-2.png',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png',
  '/js/site.js'
];

// Install the Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// Update the cache
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
