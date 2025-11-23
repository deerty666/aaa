// اسم الكاش الخاص بنا (تم التحديث إلى v5)
const CACHE_NAME = 'deerty-menu-v5';

// الملفات الأساسية التي يجب تخزينها مؤقتاً
const urlsToCache = [
    '/aaa/', 
    '/aaa/menu.html',
    '/aaa/style.css',
    '/aaa/Script.js',
    '/aaa/manifest.json',
    // 🚨 الملفات الخمسة الجديدة
    '/aaa/config.js',
    '/aaa/menuData.js',
    '/aaa/animation.js',
    '/aaa/menuRenderer.js',
    '/aaa/messaging.js'
];

self.addEventListener('install', (evt) => {
    // تخزين الملفات الأساسية
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
    // مسح أي كاش قديم لا يتطابق مع CACHE_NAME
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
    // استراتيجية \"الشبكة أولاً مع العودة للكاش\"
    evt.respondWith(
        fetch(evt.request)
            .catch(() => caches.match(evt.request))
    );
});
