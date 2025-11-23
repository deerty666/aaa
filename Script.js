// File: Script.js (النسخة النهائية - نظيفة ومقسمة)

// ⭐️ استيراد جميع الوحدات والدوال المفصولة
import { generateWhatsAppMessage } from './messaging.js';
import { renderMenu } from './menuRenderer.js'; 
import { flyToCart } from './animation.js'; 
import { BRANCH_CONFIG } from './config.js';
import menuData from './menuData.js';


/* ================================================= */
/* 🛒 1. إدارة حالة التطبيق والسلة */
/* ================================================= */

// 1.1. تحديد الفرع الحالي (باستخدام BRANCH_CONFIG المستورد)
let currentBranchId = 'branch1'; 
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('branch')) {
    currentBranchId = urlParams.get('branch');
}
const currentBranch = BRANCH_CONFIG[currentBranchId] || BRANCH_CONFIG['branch1'];
document.title = `قائمة سحايب ديرتي - فرع ${currentBranch.name}`;

// 1.2. حالة السلة وتخزينها
let cart = JSON.parse(localStorage.getItem('cart')) || {};


/* ================================================= */
/* 🧮 2. دوال الحساب والتحديث (Core Logic) */
/* ================================================= */

/** حساب الإجمالي النهائي للسلة */
function calculateTotal() {
    let subtotal = 0;
    for (const key in cart) {
        subtotal += cart[key].price * cart[key].quantity;
    }
    const finalTotal = subtotal + currentBranch.deliveryFee;
    return { subtotal, finalTotal };
}

/** تحديث عرض السلة والعداد */
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const totalBreakdown = document.getElementById('totalBreakdown');
    
    // ⚠️ (هنا يجب إضافة منطق بناء HTML لقائمة السلة باستخدام كائن 'cart') 

    // تحديث العداد
    let count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'block' : 'none';

    // تحديث الإجمالي
    const { subtotal, finalTotal } = calculateTotal();
    totalBreakdown.innerHTML = `
        <p>المجموع الفرعي: <span>${subtotal.toFixed(2)} ريال</span></p>
        <p>رسوم التوصيل: <span>${currentBranch.deliveryFee.toFixed(2)} ريال</span></p>
        <p class="final-total">الإجمالي النهائي: <span>${finalTotal.toFixed(2)} ريال</span></p>
    `;

    // تخزين السلة
    localStorage.setItem('cart', JSON.stringify(cart));
}

/** إضافة صنف إلى السلة بعد التأكيد من النافذة المنبثقة */
function addToCart(item) {
    const key = `${item.id}-${item.option || ''}-${item.note || ''}`;

    if (cart[key]) {
        cart[key].quantity += item.quantity;
    } else {
        cart[key] = { ...item };
    }
    
    // ⭐️ استخدام دالة الحركة المستوردة
    const imgElement = document.querySelector(`.menu-item-card[data-item-id="${item.id}"] img`);
    if (imgElement) {
        flyToCart(imgElement); 
    }

    updateCartDisplay();
}


/* ================================================= */
/* 📱 3. دوال النوافذ المنبثقة (Modal Logic) */
/* ================================================= */
// ⚠️ هذه الدوال تبقى هنا لأنها تعالج حالة التطبيق (cart) والـ DOM مباشرة

let selectedItemData = null; 
let selectedSectionIndex = null; 

function showModal(itemData, sectionIndex) {
    selectedItemData = itemData;
    selectedSectionIndex = sectionIndex;
    
    const modal = document.getElementById('optionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalOptionsContainer = document.getElementById('modalOptions');

    modalTitle.textContent = itemData.name;
    modalOptionsContainer.innerHTML = '';
    
    // ⚠️ (هنا يجب إضافة منطق بناء خيارات الراديو/الاختيار بناءً على itemData.options)
    
    // إظهار النافذة
    modal.style.display = 'flex';
}

// ⚠️ إتاحة الدالة عالمياً لكي تتمكن دالة renderMenu المستوردة من الوصول إليها عبر event listeners
window.showModal = showModal; 

// معالج تأكيد الإضافة للسلة
document.getElementById('modalConfirm').addEventListener('click', () => {
    if (!selectedItemData) return;

    // ⚠️ (هنا يجب إضافة منطق قراءة الخيار المحدد وحساب السعر بناءً عليه)
    const selectedOption = 'الخيار الافتراضي'; 
    const itemNote = document.getElementById('itemNote').value;
    let finalPrice = selectedItemData.basePrice;

    const itemToAdd = {
        id: selectedItemData.id,
        name: selectedItemData.name,
        price: finalPrice, 
        quantity: 1, 
        option: selectedOption,
        note: itemNote
    };

    addToCart(itemToAdd);

    // إخفاء النافذة ومسح الملاحظات
    document.getElementById('optionModal').style.display = 'none';
    document.getElementById('itemNote').value = '';
    selectedItemData = null;
});


/* ================================================= */
/* 📞 4. معالجات الأحداث الرئيسية */
/* ================================================= */

// 4.1. معالج حدث زر الإرسال للواتساب
document.getElementById('sendWhatsapp').addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
        alert('سلتك فارغة! يرجى إضافة منتجات قبل الإرسال.');
        return;
    }
    
    // الحصول على العنوان والملاحظات من حقول الإدخال
    const deliveryAddress = document.getElementById('manualAddress').value; 
    const orderNotes = document.getElementById('orderNotes') ? document.getElementById('orderNotes').value : ''; 

    // ⭐️ استخدام دالة generateWhatsAppMessage المستوردة
    const whatsappLink = generateWhatsAppMessage(
        cart, 
        currentBranch, 
        deliveryAddress,
        orderNotes
    );
    window.open(whatsappLink, '_blank');
});

// 4.2. معالج حدث تحميل الصفحة (لتوليد المنيو وعرض السلة)
window.addEventListener('load', () => {
    // ⭐️ استدعاء دالة renderMenu المستوردة
    renderMenu(menuData, currentBranchId); 
    updateCartDisplay();
});

// 4.3. PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/aaa/service-worker.js') .then(reg => {
            console.log('Service Worker Registered!', reg.scope);
        })
        .catch(err => {
            console.error('Service Worker Registration failed:', err);
        });
    });
}

// ... (بقية الدوال المساعدة الأخرى: مسح السلة، فتح/إغلاق السلة، إلخ.) ...
