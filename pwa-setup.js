// pwa-setup.js
// دوال إعداد الـ PWA، والإشعارات، وشاشة التثبيت

let deferredPrompt;
const installAppBtn = document.getElementById('installAppBtn');
const notificationPrompt = document.getElementById('notificationPrompt');
const enableNotificationsBtn = document.getElementById('enableNotificationsBtn');
const dismissNotificationsBtn = document.getElementById('dismissNotificationsBtn');


// 1. 📢 منطق الإشعارات
// المصدر: Script.js
export function initNotificationPrompt() {
    // لا تظهر النافذة إذا كان المتصفح لا يدعم الإشعارات
    if (!('Notification' in window)) return;
    
    // إظهار النافذة إذا لم يتم سؤال المستخدم من قبل ولم يرفض الإشعارات بشكل دائم
    if (Notification.permission === 'default') {
        setTimeout(() => {
            notificationPrompt.style.display = 'flex';
        }, 3000); // تظهر بعد 3 ثوانٍ
    }
}

function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
        notificationPrompt.style.display = 'none'; // إخفاء النافذة بعد الرد
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // يمكنك إرسال إشعار ترحيبي بسيط هنا
        } else {
            console.log('Notification permission denied.');
        }
    });
}

// 2. 📲 منطق تثبيت الـ PWA
// المصدر: Script.js
export function initInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        // منع ظهور مطالبة المتصفح الافتراضية
        e.preventDefault();
        // حفظ الحدث ليتم استدعاؤه لاحقاً
        deferredPrompt = e;
        // إظهار زر التثبيت المخصص
        installAppBtn.style.display = 'flex';
    });

    installAppBtn.addEventListener('click', () => {
        if (deferredPrompt) {
            // إخفاء الزر المخصص
            installAppBtn.style.display = 'none';
            // إظهار مطالبة المتصفح للتثبيت
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            });
        }
    });
}

// 3. 🛡️ تسجيل العامل الخدمي (Service Worker)
// المصدر: Script.js
export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // تأكد أن المسار صحيح إذا كان تطبيقك في مجلد فرعي
            navigator.serviceWorker.register('/Dirty55/service-worker.js') 
            .then(reg => {
                console.log('Service Worker Registered!', reg.scope);
            })
            .catch(err => {
                console.error('Service Worker Registration failed:', err);
            });
        });
    }
}


// 4. 🔗 ربط الأحداث بنافذة الإشعارات
enableNotificationsBtn.addEventListener('click', requestNotificationPermission);
dismissNotificationsBtn.addEventListener('click', () => {
    notificationPrompt.style.display = 'none';
    // يمكنك هنا وضع علامة في LocalStorage لعدم الإزعاج مرة أخرى
});
