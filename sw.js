 const CACHE_NAME = 'insulancore-v4';
 const ASSETS = [
     './',
     './index.html',
     './style.css',
     './script.js',
     './manifest.json',
     './icon_512_1775120645222.png'
 ];
 
 self.addEventListener('install', (e) => {
     self.skipWaiting();
     e.waitUntil(
         caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
     );
 });
 
 self.addEventListener('activate', (e) => {
     e.waitUntil(
         caches.keys().then((keys) => {
             return Promise.all(
                 keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
             );
         }).then(() => self.clients.claim())
     );
 });
 
 // Network-First strategy: always try fresh content, fallback to cache
 self.addEventListener('fetch', (e) => {
     e.respondWith(
         fetch(e.request)
             .then((res) => {
                 // Cache the fresh response
                 const clone = res.clone();
                 caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                 return res;
             })
             .catch(() => caches.match(e.request))
     );
 });
