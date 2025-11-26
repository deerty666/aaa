// pwa-setup.js

// المصدر: Script.js
export let deferredPrompt = null;
const installAppBtn = document.getElementById('installAppBtn');

// 1. منطق تثبيت PWA (Install Prompt)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installAppBtn.style.display = 'block';
});

export function initInstallPrompt() {
    installAppBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            installAppBtn.style.display = 'none';
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
        }
    });
}

// 2. تسجيل العامل الخدمي (Service Worker)
// المصدر: Script.js
export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/Dirty55/service-worker.js') .then(reg => {
                console.log('Service Worker Registered!', reg.scope);
            })
            .catch(err => {
                console.error('Service Worker Registration failed:', err);
            });
        });
    }
}

// 3. منطق الإشعارات (Notifications Prompt)
// المصدر: Script.js
const notificationPrompt = document.getElementById('notificationPrompt');
const allowNotificationsBtn = document.getElementById('allowNotifications');
const denyNotificationsBtn = document.getElementById('denyNotifications');

function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            localStorage.setItem('notifications_asked', 'true');
        } else {
            localStorage.setItem('notifications_asked', 'true');
        }
    });
}

function showNotificationPrompt() {
    // المصدر: Script.js - منطق الإظهار
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    
    if (!('Notification' in window) || localStorage.getItem('notifications_asked') || Notification.permission === 'granted') {
        return;
    }
    
    if (isStandalone) { 
        // إذا كان التطبيق مثبتاً (Standalone): تأخير الظهور لمدة 10 ثوانٍ 
        setTimeout(() => {
             notificationPrompt.style.display = 'flex';
        }, 10000); 
    } 
}

export function initNotificationPrompt() {
    allowNotificationsBtn.addEventListener('click', () => {
        notificationPrompt.style.display = 'none';
        localStorage.setItem('notifications_asked', 'true'); 
        requestNotificationPermission();
    });

    denyNotificationsBtn.addEventListener('click', () => {
        notificationPrompt.style.display = 'none';
        localStorage.setItem('notifications_asked', 'true');
    });
    
    showNotificationPrompt();
}
