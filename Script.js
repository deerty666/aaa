// File: Script.js (النسخة النهائية - مع دعم الأقسام ومسح السلة وعرض الطلبات والخيارات)


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

// حالة الصنف المؤقت في النافذة المنبثقة
let currentModalItem = null; 


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

/** ⭐️ إضافة دالة مساعدة لزيادة الكمية */
function increaseQuantity(key) {
    if (cart[key]) {
        cart[key].quantity += 1;
        updateCartDisplay();
    }
}

/** ⭐️ إضافة دالة مساعدة لإنقاص الكمية */
function decreaseQuantity(key) {
    if (cart[key]) {
        cart[key].quantity -= 1;
        if (cart[key].quantity <= 0) {
            delete cart[key];
        }
        updateCartDisplay();
    }
}

/** ⭐️ إضافة دالة مساعدة لإزالة صنف */
function removeItem(key) {
    if (cart[key]) {
        delete cart[key];
        updateCartDisplay();
    }
}

/** ⭐️ تحديث عرض السلة والعداد (تم إضافة عرض الأصناف هنا) */
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const totalBreakdown = document.getElementById('totalBreakdown');
    const cartItemsContainer = document.getElementById('cartItems'); 
    
    cartItemsContainer.innerHTML = ''; // مسح المحتوى القديم

    // توليد عناصر السلة
    for (const key in cart) {
        const item = cart[key];
        const itemPriceTotal = (item.price * item.quantity).toFixed(2);
        
        const optionDisplay = item.option && item.option !== 'الخيار الافتراضي' ? 
                              `<span style="font-size:0.8em; color:#999; display:block;">(${item.option})</span>` : '';
        const noteDisplay = item.note ? `<p class="item-note-display">ملاحظة: ${item.note}</p>` : '';

        const cartRow = document.createElement('div');
        cartRow.className = 'cart-row';
        cartRow.innerHTML = `
            <div class="item-info">
                <strong>${item.name}</strong> 
                ${optionDisplay}
                ${noteDisplay}
            </div>
            <div class="controls">
                <button onclick="decreaseQuantity('${key}')">-</button>
                <span style="padding:0 8px;">${item.quantity}</span>
                <button onclick="increaseQuantity('${key}')">+</button>
            </div>
            <div class="item-total-price" style="text-align:left; font-weight:700;">
                ${itemPriceTotal} ر.س 
                <button onclick="removeItem('${key}')" title="حذف" style="background-color: transparent; color: var(--red); padding: 0 5px; font-size: 1.2em;">✖</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartRow);
    }

    // تحديث العداد
    let count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.style.display = count > 0 ? 'block' : 'none';

    // تحديث الإجمالي
    const { subtotal, finalTotal } = calculateTotal();
    totalBreakdown.innerHTML = `
        <div class="total-line">المجموع الفرعي: <span>${subtotal.toFixed(2)} ريال</span></div>
        <div class="total-line">رسوم التوصيل: <span>${currentBranch.deliveryFee.toFixed(2)} ريال</span></div>
        <div class="final-total-line">الإجمالي النهائي: <span>${finalTotal.toFixed(2)} ريال</span></div>
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

/** ⭐️ عرض النافذة المنبثقة للخيارات (تم إضافة منطق الخيارات) */
function showModal(itemData, sectionIndex) {
    const modal = document.getElementById('optionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalOptionsContainer = document.getElementById('modalOptions');
    const itemNote = document.getElementById('itemNote');

    // تهيئة حالة الصنف المؤقت 
    currentModalItem = { 
        ...itemData, 
        selectedOption: null, 
        finalPrice: itemData.basePrice 
    };

    modalTitle.textContent = itemData.name;
    modalOptionsContainer.innerHTML = '';
    itemNote.value = ''; // مسح الملاحظات القديمة

    // بناء خيارات الصنف (نفترض أن options هي مجموعة خيارات)
    if (itemData.options && itemData.options.length > 0) {
        const optionGroup = itemData.options[0]; // التعامل مع أول مجموعة خيارات
        
        optionGroup.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'opt-btn';
            
            let priceText = choice.priceAdjustment > 0 ? ` (+${choice.priceAdjustment.toFixed(2)} ر.س)` : 
                            choice.priceAdjustment < 0 ? ` (${choice.priceAdjustment.toFixed(2)} ر.س)` : '';

            btn.textContent = `${choice.name}${priceText}`;
            btn.setAttribute('data-choice-name', choice.name);
            btn.setAttribute('data-price-adj', choice.priceAdjustment);
            
            btn.addEventListener('click', (e) => {
                // إزالة التحديد من الجميع
                modalOptionsContainer.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
                
                // تحديد الزر الحالي
                e.currentTarget.classList.add('active');
                
                // تحديث حالة الصنف المؤقت
                const adj = parseFloat(e.currentTarget.getAttribute('data-price-adj'));
                currentModalItem.selectedOption = e.currentTarget.getAttribute('data-choice-name');
                currentModalItem.finalPrice = itemData.basePrice + adj; 
            });

            modalOptionsContainer.appendChild(btn);
        });
        
        // التحديد التلقائي لأول خيار (هام جداً لضمان وجود سعر مبدئي)
        if (optionGroup.choices.length > 0) {
            modalOptionsContainer.querySelector('.opt-btn').click(); 
        }
    } else {
        // في حال عدم وجود خيارات، يتم تهيئة السعر الافتراضي
        currentModalItem.selectedOption = 'الخيار الافتراضي';
        currentModalItem.finalPrice = itemData.basePrice;
    }

    // إظهار النافذة
    modal.style.display = 'flex';
}

// ⚠️ إتاحة الدالة عالمياً لكي تتمكن دالة renderMenu المستوردة من الوصول إليها
window.showModal = showModal; 


/* ================================================= */
/* 📦 4. دوال التحكم بدرج السلة (Cart Drawer Controls) */
/* ================================================= */
function openCartDrawer() {
    updateCartDisplay(); // تحديث العرض قبل الفتح لضمان أحدث محتوى
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
    closeCartDrawer(); 
}


/* ================================================= */
/* 🧭 5. دالة توليد الأقسام (Sections Rendering) */
/* ================================================= */

/** توليد وعرض أزرار الأقسام القابلة للتمرير */
function renderSections() {
    const sectionsContainer = document.getElementById('sections');
    sectionsContainer.innerHTML = ''; 

    menuData.forEach(section => {
        if (section.sectionAvailableIn && !section.sectionAvailableIn.includes(currentBranchId)) {
            return; 
        }

        const sectionCard = document.createElement('div');
        sectionCard.className = 'sec-card';
        sectionCard.innerHTML = `
            <img src="${section.img || '/aaa/default-section.png'}" alt="${section.section}" loading="lazy">
            <span class="sec-name">${section.section}</span>
        `;
        
        sectionCard.addEventListener('click', () => {
            const targetHeader = Array.from(document.querySelectorAll('.section-header h2'))
                .find(h2 => h2.textContent.trim() === section.section);
            
            if (targetHeader) {
                targetHeader.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        sectionsContainer.appendChild(sectionCard);
    });
}


/* ================================================= */
/* 📞 6. معالجات الأحداث الرئيسية */
/* ================================================= */

window.addEventListener('load', () => {
    
    // 1. ربط معالج تأكيد الإضافة للسلة 
    document.getElementById('modalConfirm').addEventListener('click', () => {
        if (!currentModalItem) return; // استخدام currentModalItem

        const itemNote = document.getElementById('itemNote').value;
        
        // تجهيز الصنف للإضافة باستخدام حالة النافذة المنبثقة
        const itemToAdd = {
            id: currentModalItem.id,
            name: currentModalItem.name,
            price: currentModalItem.finalPrice, // السعر المحسوب
            quantity: 1, 
            option: currentModalItem.selectedOption,
            note: itemNote
        };

        addToCart(itemToAdd);

        // إغلاق النافذة ومسح الحالة
        document.getElementById('optionModal').style.display = 'none';
        document.getElementById('itemNote').value = '';
        currentModalItem = null;
    });

    // 2. ربط معالج حدث زر الإرسال للواتساب 
    document.getElementById('sendWhatsapp').addEventListener('click', () => {
        if (Object.keys(cart).length === 0) {
            alert('سلتك فارغة! يرجى إضافة منتجات قبل الإرسال.');
            return;
        }
        
        const deliveryAddress = document.getElementById('manualAddress').value; 
        const orderNotes = document.getElementById('orderNotes') ? document.getElementById('orderNotes').value : ''; 

        const whatsappLink = generateWhatsAppMessage(
            cart, 
            currentBranch, 
            deliveryAddress,
            orderNotes
        );
        window.open(whatsappLink, '_blank');
        
        // مسح السلة وإغلاق الدرج بعد الإرسال
        clearCart();
    });

    // 3. ربط معالجات حدث فتح وإغلاق ومسح السلة (مع تعريض الدوال المساعدة عالمياً)
    document.getElementById('cartBtn').addEventListener('click', openCartDrawer);
    document.getElementById('closeCartBtn').addEventListener('click', closeCartDrawer);
    document.getElementById('cartOverlay').addEventListener('click', closeCartDrawer); 
    document.getElementById('clearCart').addEventListener('click', clearCart);
    
    // تعريض الدوال المساعدة عالمياً لاستخدامها في onclick بالـ HTML المُولّد
    window.increaseQuantity = increaseQuantity;
    window.decreaseQuantity = decreaseQuantity;
    window.removeItem = removeItem;


    // 4. PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/aaa/service-worker.js') .then(reg => {
            console.log('Service Worker Registered!', reg.scope);
        })
        .catch(err => {
            console.error('Service Worker Registration failed:', err);
        });
    }

    // 5. استدعاء دالة renderSections لتوليد أزرار الأقسام
    renderSections(); 
    
    // 6. استدعاء دالة renderMenu لتوليد القائمة
    renderMenu(menuData, currentBranchId); 
    updateCartDisplay();
});
