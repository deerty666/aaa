// اسم الكاش الخاص بنا
const CACHE_NAME = 'deerty-menu-v1';

// الملفات الأساسية التي يجب تخزينها مؤقتاً لتمكين التثبيت (PWA requirement)
const urlsToCache = [
    '/aaa/', 
    '/aaa/index.html',        // 🌟 جديد: صفحة اختيار الفرع
    '/aaa/menu.html',
    '/aaa/style.css',
    '/aaa/main.js',           // 🌟 جديد: الملف الرئيسي
    '/aaa/config.js',         // 🌟 جديد: ملف إعدادات المنيو
    '/aaa/cart-logic.js',     // 🌟 جديد: ملف منطق السلة
    '/aaa/ui-utils.js',       // 🌟 جديد: ملف أدوات الواجهة
    '/aaa/pwa-setup.js',      // 🌟 جديد: ملف إعدادات PWA
    '/aaa/manifest.json'
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
    // هذا يضمن أن يتم جلب جميع البيانات (بما في ذلك menuData من config.js) من الشبكة دائماً
    evt.respondWith(
        fetch(evt.request).catch(function() {
            // إذا فشل جلب البيانات من الشبكة، نرجع النسخة المخزنة مؤقتاً فقط للملفات الأساسية
            return caches.match(evt.request);
        })
    );
});
