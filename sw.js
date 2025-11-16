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
  "/TemplateData/UnityProgress.js",
  "/TemplateData/favicon.ico",
  "/TemplateData/fullscreen.png",
  "/TemplateData/progressEmpty.Dark.png",
  "/TemplateData/progressEmpty.Light.png",
  "/TemplateData/progressFull.Dark.png",
  "/TemplateData/progressFull.Light.png",
  "/TemplateData/progressLogo.Dark.png",
  "/TemplateData/progressLogo.Light.png",
  "/TemplateData/webgl-logo.png",
  "/TanukiSunset-256.png",
  "/TanukiSunset-512.png",
  "/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
          console.log("✅ Cached:", url);
        } catch (err) {
          console.error("❌ Failed to cache:", url, err);
        }
      }
    })
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
