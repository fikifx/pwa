// Nama cache untuk menyimpan aset yang di-cache
var cacheName = "kopi-kenangan-senja-v1";

// Daftar aset yang akan di-cache
var filesToCache = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/script.js",
  "/img/products/1.jpg",
  "/img/menu/1.jpg",
  "/img/tentang-kami.jpg",
  // tambahkan semua aset yang ingin di-cache di sini
];

// Instalasi service worker
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

// Aktivasi service worker
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (name) {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch event listener untuk mengintersep permintaan HTTP
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
