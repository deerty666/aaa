// اسم الكاش الخاص بنا
const CACHE_NAME = 'deerty-menu-v1';

// الملفات الأساسية التي يجب تخزينها مؤقتاً لتمكين التثبيت (PWA requirement)
const urlsToCache = [
    '/aaa/', // 🎯 جذر المستودع
    '/aaa/menu.html', // 🎯 المسار المطلق الصحيح
    '/aaa/style.css', // 🎯 المسار المطلق الصحيح
    '/aaa/Script.js', // 🎯 المسار المطلق الصحيح
    '/aaa/manifest.json' // 🎯 المسار المطلق الصحيح
];

self.addEventListener('install', (evt) => {
    // تخزين الملفات الأساسية الضرورية لتمكين التثبيت
    evt.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache and caching essential files for PWA install.');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting()) // تفعيل العامل الخدمي فوراً
    );
});

self.addEventListener('activate', (evt) => {
    // السيطرة على العميل ومسح أي كاش قديم (مهم)
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
        fetch(evt.request).catch(function () {
            // إذا فشل الاتصال بالشبكة، نعود إلى الكاش
            return caches.match(evt.request);
        })
    );
});
