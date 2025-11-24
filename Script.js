// File: Script.js (النسخة النهائية - مع دعم الأقسام ومسح السلة)


// ⭐️ استيراد جميع الوحدات والدوال المفصولة
import { generateWhatsAppMessage } from './messaging.js';
import { renderMenu } from './menuRenderer.js'; 
import { flyToCart } from './animation.js'; 
import { BRANCH_CONFIG } from './config.js';
import menuData from './menuData.js';


/* ================================================= */
/* 🛒 1. إدارة حالة التطبيق والسلة */
/* ================================================= */

// 1.1. تحديد الفرع الحالي 
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
        <p class="total-line">المجموع الفرعي: <span>${subtotal.toFixed(2)} ريال</span></p>
        <p class="total-line">رسوم التوصيل: <span>${currentBranch.deliveryFee.toFixed(2)} ريال</span></p>
        <p class="final-total-line">الإجمالي النهائي: <span>${finalTotal.toFixed(2)} ريال</span></p>
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

// ⚠️ إتاحة الدالة عالمياً لكي تتمكن دالة renderMenu المستوردة من الوصول إليها
window.showModal = showModal; 


/* ================================================= */
/* 📦 4. دوال التحكم بدرج السلة (Cart Drawer Controls) */
/* ================================================= */
function openCartDrawer() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartOverlay').classList.add('show');
}

function closeCartDrawer() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('show');
}

function clearCart() {
    cart = {};
    updateCartDisplay();
    // إغلاق الدرج بعد المسح
    closeCartDrawer(); 
}


/* ================================================= */
/* 🧭 5. دالة توليد الأقسام (Sections Rendering) (جديد) */
/* ================================================= */

/** توليد وعرض أزرار الأقسام القابلة للتمرير */
function renderSections() {
    const sectionsContainer = document.getElementById('sections');
    sectionsContainer.innerHTML = ''; 

    // استخدام menuData لبناء البطاقات
    menuData.forEach(section => {
        // التحقق من أن القسم متاح في الفرع الحالي
        if (section.sectionAvailableIn && !section.sectionAvailableIn.includes(currentBranchId)) {
            return; 
        }

        const sectionCard = document.createElement('div');
        sectionCard.className = 'sec-card';
        sectionCard.innerHTML = `
            <img src="${section.img || '/aaa/default-section.png'}" alt="${section.section}" loading="lazy">
            <span class="sec-name">${section.section}</span>
        `;
        
        // إضافة مستمع الحدث للانتقال إلى القسم عند النقر
        sectionCard.addEventListener('click', () => {
            // البحث عن عنوان القسم المقابل في القائمة الرئيسية بناءً على النص
            const targetHeader = Array.from(document.querySelectorAll('.section-header h2'))
                .find(h2 => h2.textContent.trim() === section.section);
            
            if (targetHeader) {
                // الانتقال إلى العنصر الأب (.section-header) لضمان التثبيت الصحيح
                targetHeader.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        sectionsContainer.appendChild(sectionCard);
    });
}


/* ================================================= */
/* 📞 6. معالجات الأحداث الرئيسية */
/* ================================================= */

// معالج حدث تحميل الصفحة (الآن يضمن وجود كل عناصر الـ DOM)
window.addEventListener('load', () => {
    
    // 1. ربط معالج تأكيد الإضافة للسلة 
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

    // 2. ربط معالج حدث زر الإرسال للواتساب 
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
        
        // ⭐️ الإصلاح: مسح السلة وإغلاق الدرج بعد الإرسال
        clearCart();
        closeCartDrawer();
    });

    // 3. ربط معالجات حدث فتح وإغلاق ومسح السلة 
    document.getElementById('cartBtn').addEventListener('click', openCartDrawer);
    document.getElementById('closeCartBtn').addEventListener('click', closeCartDrawer);
    document.getElementById('cartOverlay').addEventListener('click', closeCartDrawer); 
    document.getElementById('clearCart').addEventListener('click', clearCart);
    
    // 4. PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/aaa/service-worker.js') .then(reg => {
            console.log('Service Worker Registered!', reg.scope);
        })
        .catch(err => {
            console.error('Service Worker Registration failed:', err);
        });
    }

    // 5. استدعاء دالة renderSections لتوليد أزرار الأقسام (جديد)
    renderSections(); 
    
    // 6. استدعاء دالة renderMenu لتوليد القائمة
    renderMenu(menuData, currentBranchId); 
    updateCartDisplay();
});
