// sw.js
const CACHE_NAME = "tanuki-sunset";
const urlsToCache = [
  "/", 
  "/index.html",
  "/Build/UnityLoader.js",
  "/Build/WebGL.data.unityweb",
  "/Build/WebGL.json",
  "/Build/WebGL.wasm.code.unityweb",
  "/Build/WebGL.wasm.framework.unityweb",
  "/UnityProgress.js",
  "/favicon.ico",
  "/fullscreen.png",
  "/progressEmpty.Dark.png",
  "/progressEmpty.Light.png",
  "/progressFull.Dark.png",
  "/progressFull.Light.png",
  "/progressLogo.Dark.png",
  "/progressLogo.Light.png",
  "/webgl-logo.png",
  "/TanukiSunset-256.png",
  "/TanukiSunset-512.png",
  "/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
});
