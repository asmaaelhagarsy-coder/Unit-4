const CACHE_NAME='save-shine-v9';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.json','./icons/icon-96.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))))});
self.addEventListener('fetch',e=>{const req=e.request;e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{if(req.method==='GET'&&res.status===200&&res.type==='basic'){const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(req,clone))}return res}).catch(()=>caches.match('./index.html'))))});
