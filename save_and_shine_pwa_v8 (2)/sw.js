const CACHE_NAME='save-shine-v1';
const ASSETS=[
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-96.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
self.addEventListener('install',evt=>{
  evt.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));
});
self.addEventListener('activate',evt=>{
  evt.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch',evt=>{
  const req=evt.request;
  evt.respondWith(
    caches.match(req).then(cached=>cached||fetch(req).then(res=>{
      // Optional: cache new GET requests
      if(req.method==='GET' && res.status===200 && res.type==='basic'){
        const clone=res.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put(req, clone));
      }
      return res;
    }).catch(()=>caches.match('./index.html')))
  );
});
