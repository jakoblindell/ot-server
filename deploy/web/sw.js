// Service worker for the installed web client. Pages come from the network
// as usual (with the headers the client needs); only when the server cannot
// be reached, an offline page is shown instead of the browser's error.
// Everything else is left to the browser: the client keeps its own files
// (IndexedDB) and game assets (Cache Storage).
var OFFLINE_CACHE = "offline-v1";
var OFFLINE_PAGE = "app/offline.html";
var OFFLINE_FILES = [OFFLINE_PAGE, "app/icon-192.png"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(OFFLINE_CACHE).then(function (cache) {
      return cache.addAll(OFFLINE_FILES);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (event) {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match(OFFLINE_PAGE);
      })
    );
  } else if (new URL(event.request.url).pathname === "/app/icon-192.png") {
    // the offline page's icon
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match("app/icon-192.png");
      })
    );
  }
});
