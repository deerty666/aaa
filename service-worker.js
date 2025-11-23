// File: service-worker.js (النسخة النهائية - محدثة برقم الإصدار v5)

// اسم الكاش الخاص بنا
const CACHE_NAME = 'deerty-menu-v5'; // ⭐️ تم رفع الإصدار لضمان تحديث الكاش!

// الملفات الأساسية التي يجب تخزينها مؤقتاً
const urlsToCache = [
    '/Dirty55/', 
    '/Dirty55/menu.html',
    '/Dirty55/style.css',
    '/Dirty55/Script.js',
    '/Dirty55/manifest.json',
    // ⭐️ إضافة جميع وحدات JavaScript الجديدة:
    '/Dirty55/config.js', 
    '/Dirty55/menuData.js', 
    '/Dirty55/animation.js', 
    '/Dirty55/menuRenderer.js',
    '/Dirty55/messaging.js'
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache and caching essential files for PWA install.');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.map(k => {
                if (k !== CACHE_NAME) {
                    console.log('Deleting old cache:', k);
                    return caches.delete(k);
                }
            }))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (evt) => {
    // استراتيجية "الشبكة أولاً مع العودة للكاش"
    evt.respondWith(
        fetch(evt.request).catch(() => caches.match(evt.request))
    );
});
