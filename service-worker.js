const CACHE_NAME = "travelnest-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/explore.html",
  "/budget.html",
  "/trip.html",
  "/mood.html",
  "/support.html",

  "/css/style.css",
  "/css/home.css",
  "/css/explore.css",
  "/css/budget.css",
  "/css/trip.css",
  "/css/mood.css",
  "/css/support.css",

  "/js/script.js",
  "/js/home.js",
  "/js/explore.js",
  "/js/budget.js",
  "/js/trip.js",
  "/js/mood.js",
  "/js/support.js",

  "/images/logo.png",
  "/images/Untitled design.png",

  "/audio/jungle ambience.mp3",
  "/audio/ocean waves.mp3",
  "/audio/rain.mp3"

];

/* INSTALL */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

/* FETCH */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

/* ACTIVATE */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});