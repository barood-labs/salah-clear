const C="sc-v1",F=["./","index.html","style.css","app.js","adhan.js","cities.js","azkar.js","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png","privacy.html"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request))));
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.openWindow("./"))});
