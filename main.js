// main.js (محتوى ملف Script.js بعد التحديث والتقسيم)

// 1. ⚙️ الاستيراد من الملفات الوحدوية (Modules)
import { BRANCH_CONFIG, menuData, processMenuData } from './config.js';
import { flyToCart, flashCartButton, formatCurrency } from './ui-utils.js';
import * as CartLogic from './cart-logic.js'; 
import { registerServiceWorker, initNotificationPrompt, initInstallPrompt } from './pwa-setup.js';

// 2. ⭐️ المتغيرات وحالة التطبيق (State)
// المصدر: Script.js
let currentBranchId = 'branch1'; 
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('branch')) {
    currentBranchId = urlParams.get('branch');
}
const currentBranch = BRANCH_CONFIG[currentBranchId] || BRANCH_CONFIG['branch1'];
document.title = `قائمة سحايب ديرتي - فرع ${currentBranch.name}`;

const processedMenuData = processMenuData(menuData); 
let cart = CartLogic.loadCart(currentBranchId); 
let currentSection = processedMenuData[1].section;
let modalData = {}; 
let selectedItemImage = null; 
let userLocation = null; // للإحداثيات الجغرافية

// 3. 🎯 مراجع عناصر DOM (Elements)
// المصدر: menu.html و Script.js
const elements = {
    sectionsEl: document.getElementById('sections'),
    menuContainer: document.getElementById('menuList'), 
    searchBar: document.getElementById('searchBar'),
    installAppBtn: document.getElementById('installAppBtn'),
    cartBtn: document.getElementById('cartBtn'),
    cartCount: document.getElementById('cartCount'),
    cartDrawer: document.getElementById('cartDrawer'),
    cartOverlay: document.getElementById('cartOverlay'),
    closeCartBtn: document.getElementById('closeCartBtn'),
    cartItemsContainer: document.getElementById('cartItems'),
    totalBreakdown: document.getElementById('totalBreakdown'),
    sendWhatsapp: document.getElementById('sendWhatsapp'),
    clearCart: document.getElementById('clearCart'),
    deliveryTypeRadios: document.querySelectorAll('input[name="deliveryType"]'),
    manualAddressInput: document.getElementById('manualAddress'),
    getLocationBtn: document.getElementById('getLocationBtn'),
    locationStatus: document.getElementById('locationStatus'),
    optionModal: document.getElementById('optionModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalOptions: document.getElementById('modalOptions'),
    itemNoteInput: document.getElementById('itemNote'),
    modalConfirm: document.getElementById('modalConfirm'),
};


// 4. 🚀 دوال الموقع الجغرافي (Geolocation)
// المصدر: Script.js
function onSuccess(position) {
    userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    elements.locationStatus.innerText = `تم تحديد الموقع بنجاح: Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}`;
    elements.locationStatus.style.color = '#4CAF50';
    elements.getLocationBtn.disabled = false;
    // ملء حقل العنوان اليدوي بالإحداثيات
    elements.manualAddressInput.value = `تم تحديد الموقع تلقائياً. Lat: ${userLocation.lat.toFixed(6)}, Lng: ${userLocation.lng.toFixed(6)}`; 
    updateCartUI();
}

function onError(error) {
    elements.locationStatus.innerText = '❌ فشل تحديد الموقع. أدخل العنوان يدوياً.';
    elements.locationStatus.style.color = 'var(--red)';
    elements.getLocationBtn.disabled = false;
    userLocation = null; 
    updateCartUI();
}

function getMyLocation() {
    elements.locationStatus.innerText = 'جاري البحث عن موقعك... 📡';
    elements.locationStatus.style.color = '#aaa';
    elements.getLocationBtn.disabled = true;
    if (!navigator.geolocation) {
        elements.locationStatus.innerText = '❌ المتصفح لا يدعم تحديد الموقع الجغرافي.';
        elements.locationStatus.style.color = 'var(--red)';
        elements.getLocationBtn.disabled = false;
        return;
    }
    navigator.geolocation.getCurrentPosition(
        onSuccess,
        onError,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

// 5. ✏️ دوال الـ RENDER والـ UI

// 5.1 عرض الأقسام (Sections)
// المصدر: Script.js
function renderSections() {
    elements.sectionsEl.innerHTML = ''; 
    
    processedMenuData.forEach(sec => {
        if (sec.section !== "الكل" && sec.sectionAvailableIn && !sec.sectionAvailableIn.includes(currentBranchId)) {
            return; 
        }

        const sectionDisplayName = sec.section === "الكل" ? `فرع ${currentBranch.name}` : sec.section;
        const card = document.createElement('div');
        card.className = 'sec-card';
        card.innerHTML = `
            <img src="${sec.sectionImg}" alt="${sec.section}" onerror="this.style.opacity=.35">
            <div class="sec-name">${sectionDisplayName}</div>
        `;
        
        if(sec.section === currentSection) card.classList.add('active');
        
        card.onclick = () => {
            document.querySelectorAll('.sec-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentSection = sec.section;
            renderMenu(currentSection);
            elements.searchBar.value = '';
        };
        elements.sectionsEl.appendChild(card);
    });
    renderMenu(currentSection);
}

// 5.2 عرض المنتجات (Menu)
// المصدر: Script.js
function renderMenu(sectionName, searchTerm = '') {
    elements.menuContainer.innerHTML = '';
    const normalizedSearch = searchTerm.trim().toLowerCase();
    
    let itemsToRender = [];
    if(sectionName === "الكل") {
        itemsToRender = processedMenuData.flatMap(sec => sec.section !== "الكل" ? sec.items : [])
    } else {
        const sectionData = processedMenuData.find(sec => sec.section === sectionName);
        if (sectionData) {
            itemsToRender = sectionData.items;
        }
    }
    
    // فلترة البحث
    const filteredItems = itemsToRender.filter(item => 
        item.name.toLowerCase().includes(normalizedSearch) || 
        (item.description && item.description.toLowerCase().includes(normalizedSearch)) ||
        (item.actualSection && item.actualSection.toLowerCase().includes(normalizedSearch))
    );

    if (filteredItems.length === 0) {
        elements.menuContainer.innerHTML = '<p style="text-align: center; color: var(--gold); padding: 30px;">عفواً، لا يوجد أصناف في هذا القسم أو لا توجد نتائج للبحث.</p>';
        return;
    }

    filteredItems.forEach(item => {
        const hasOptions = item.options.length > 1 || (item.options.length === 1 && item.options[0].name !== "");
        const isAvailable = item.availableIn.includes(currentBranchId);
        const hasDiscount = item.branchDiscounts && item.branchDiscounts[currentBranchId];
        const discountedPriceForBranch = hasDiscount ? item.branchDiscounts[currentBranchId] : item.basePrice;

        let buttonText = "أضف للسلة"; 
        let buttonAttributes = ""; 
        let cardClassAddition = ""; 
        let bestSellerBadge = '';
        
        if (!isAvailable) { 
            buttonText = "غير متوفر مؤقتاً ⛔"; 
            buttonAttributes = "disabled"; 
            cardClassAddition = " unavailable-card"; 
        } else if (hasDiscount) { 
            cardClassAddition = " discount-card"; 
        }
        
        if (item.isBestSeller) { 
            bestSellerBadge = '<span class="best-seller-badge">الأكثر مبيعاً 🏆</span>'; 
        }

        let priceDisplay;
        if (hasDiscount) {
             priceDisplay = `
                <span class="old-price">${item.basePrice.toFixed(2)} ر.س</span>
                <span class="discount-price">${discountedPriceForBranch.toFixed(2)} ر.س</span>
            `;
        } else {
            priceDisplay = item.basePrice > 0 ? `${item.basePrice.toFixed(2)} ر.س` : 
                           (item.options.length > 0 && item.options[0].price > 0 ? 
                           `ابتداءً من ${item.options[0].price.toFixed(2)} ر.س` : 
                           `${(item.options[0]?.price || 0).toFixed(2)} ر.س`);
        }

        const displayedSection = item.actualSection || sectionName;
        
        const card=document.createElement('div');
        card.className='card' + cardClassAddition;
        card.innerHTML=`
            <img src="${item.img}" alt="${item.name}" onerror="this.style.opacity=.35">
            ${bestSellerBadge}
            <h3>${item.name}</h3>
            <p>${displayedSection}</p>
            <div class="price">${priceDisplay}</div>
            <button class="add-btn" data-item-id="${item.id}" data-has-options="${hasOptions}" ${buttonAttributes}>
                ${hasOptions ? 'اختيار الخيارات' : buttonText}
            </button>
        `;

        if (isAvailable) {
            card.querySelector('button').onclick = function() {
                const itemForCart = {...item}; 
                if(hasDiscount){ itemForCart.basePrice = discountedPriceForBranch; }
                delete itemForCart.actualSection;
                
                selectedItemImage = card.querySelector('img'); 

                if(hasOptions){
                    openOptionModal(itemForCart);
                } else {
                    const itemToAdd = {
                        ...itemForCart,
                        selectedOption: itemForCart.options[0], 
                        note: '',
                    };
                    CartLogic.addToCart(itemToAdd, currentBranchId);
                    updateCartUI();
                    flashCartButton();
                    if (selectedItemImage) flyToCart(selectedItemImage);
                }
            };
        }
        elements.menuContainer.appendChild(card);
    });
}

// 5.3 دالة فتح نافذة الخيارات المنبثقة
function openOptionModal(item) {
    modalData = item;
    elements.modalTitle.textContent = item.name;
    elements.modalOptions.innerHTML = '';
    elements.itemNoteInput.value = ''; 
    
    item.options.forEach((option, index) => {
        const optionId = `option-${item.id}-${index}`;
        const div = document.createElement('div');
        div.className = 'option-radio';
        div.innerHTML = `
            <input type="radio" id="${optionId}" name="modalOption" value="${option.name}" data-price="${option.price}" ${index === 0 ? 'checked' : ''}>
            <label for="${optionId}">${option.name} ${option.price > 0 ? ` (+${formatCurrency(option.price)})` : ''}</label>
        `;
        elements.modalOptions.appendChild(div);
    });
    
    elements.optionModal.style.display = 'flex';
}

// 5.4 تحديث واجهة السلة (Render Cart UI)
function updateCartUI() {
    cart = CartLogic.loadCart(currentBranchId);
    
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    elements.cartCount.textContent = totalItems;
    elements.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    const deliveryType = document.querySelector('input[name="deliveryType"]:checked')?.value || 'pickup';
    const manualAddressNote = elements.manualAddressInput.value.trim();
    const { subtotal, deliveryFee, total, isDelivery } = CartLogic.calculateTotals(currentBranch, cart, deliveryType, manualAddressNote);

    elements.cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        elements.cartItemsContainer.innerHTML = '<p class="empty-cart-message">السلة فارغة. ابدأ بإضافة أصنافك المفضلة!</p>';
    } else {
        cart.forEach(item => {
            const itemPrice = (item.basePrice || 0) + (item.selectedOption ? item.selectedOption.price : 0);
            const totalItemPrice = itemPrice * item.qty;
            const itemKey = item.key;
            
            const optionText = item.selectedOption && item.selectedOption.name ? `(${item.selectedOption.name})` : '';
            const noteHtml = item.note ? `<div class="item-note-display">📝 ملاحظة: ${item.note}</div>` : '';

            const row = document.createElement('div');
            row.className = 'cart-row';
            row.innerHTML = `
                <div class="cart-item-info">
                    <span class="item-qty">${item.qty}×</span>
                    <div class="item-details-text">
                        <span class="item-name">${item.name} ${optionText}</span>
                        <span class="item-total">${formatCurrency(totalItemPrice)}</span>
                        ${noteHtml}
                    </div>
                </div>
                <div class="qty-control">
                    <button class="qty-btn increment-btn" data-key="${itemKey}">+</button>
                    <button class="qty-btn decrement-btn" data-key="${itemKey}">-</button>
                </div>
            `;
            elements.cartItemsContainer.appendChild(row);
        });

        elements.cartItemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const key = e.target.dataset.key;
                const type = e.target.classList.contains('increment-btn') ? 'increment' : 'decrement';
                CartLogic.updateCartQuantity(key, type, currentBranchId);
                updateCartUI();
            });
        });
    }

    elements.totalBreakdown.innerHTML = `
        <p>الإجمالي الفرعي: <span>${formatCurrency(subtotal)}</span></p>
        <p>رسوم التوصيل: <span>${formatCurrency(deliveryFee)}</span></p>
        <h3 class="${totalItems === 0 ? 'hidden' : ''}">الإجمالي المطلوب: <span>${formatCurrency(total)}</span></h3>
    `;
    
    // تحديث رابط الواتساب
    elements.sendWhatsapp.href = CartLogic.generateWhatsappLink(
        currentBranch, 
        cart, 
        deliveryType, 
        userLocation, 
        manualAddressNote
    );
}

// 6. 🎧 ربط معالجات الأحداث (Event Handlers)

// 6.1 البحث
elements.searchBar.addEventListener('input', (e) => {
    renderMenu(currentSection, e.target.value);
});

// 6.2 فتح وإغلاق السلة
function closeCart() {
    elements.cartDrawer.classList.remove('open');
    elements.cartOverlay.classList.remove('show');
    elements.cartDrawer.setAttribute('aria-hidden','true');
    elements.cartBtn.style.display = 'flex';
}

elements.cartBtn.addEventListener('click', () => {
    elements.cartDrawer.classList.add('open');
    elements.cartOverlay.classList.add('show');
    elements.cartDrawer.setAttribute('aria-hidden','false');
    updateCartUI(); 
    elements.cartBtn.style.display = 'none';
});
elements.cartOverlay.addEventListener('click', closeCart);
elements.closeCartBtn.addEventListener('click', closeCart);

// 6.3 تحديد نوع التوصيل
elements.deliveryTypeRadios.forEach(radio => {
    radio.addEventListener('change', updateCartUI);
});

// 6.4 العنوان والموقع
elements.manualAddressInput.addEventListener('input', updateCartUI);
elements.getLocationBtn.addEventListener('click', getMyLocation);

// 6.5 مسح السلة
elements.clearCart.addEventListener('click', () => {
    if (confirm('هل أنت متأكد من مسح جميع الأصناف من السلة؟')) {
        CartLogic.clearCart(currentBranchId);
        updateCartUI();
    }
});

// 6.6 تأكيد نافذة الخيارات (Modal)
elements.modalConfirm.addEventListener('click', () => {
    const selectedOptionEl = elements.modalOptions.querySelector('input[name="modalOption"]:checked');
    
    if (!selectedOptionEl && modalData.options.length > 0) {
        alert('يرجى اختيار أحد الخيارات.');
        return;
    }
    
    // إعداد بيانات الصنف للسلة
    const itemToAdd = {
        id: modalData.id,
        name: modalData.name,
        basePrice: modalData.basePrice,
        selectedOption: {
            name: selectedOptionEl ? selectedOptionEl.value : (modalData.options[0]?.name || 'بدون خيارات'),
            price: selectedOptionEl ? parseFloat(selectedOptionEl.dataset.price) : (modalData.options[0]?.price || 0)
        },
        note: elements.itemNoteInput.value.trim(),
    };
    
    CartLogic.addToCart(itemToAdd, currentBranchId);
    
    if (selectedItemImage) flyToCart(selectedItemImage);
    flashCartButton();
    
    elements.optionModal.style.display = 'none';
    
    updateCartUI();
});

// 7. 🚀 التهيئة والبدء (INITIALIZATION)
document.addEventListener('DOMContentLoaded', () => {
    renderSections(); 
    updateCartUI();
    registerServiceWorker();
    initNotificationPrompt();
    initInstallPrompt();
});
