// cart-logic.js

import { formatCurrency } from './ui-utils.js';

// 1. حالة السلة (State)
let cart = []; 

// 2. دوال الحفظ والتحميل (Storage)
export function loadCart(branchId) {
    // استخدام مفتاح خاص بالفرع
    cart = JSON.parse(localStorage.getItem(`deerty_cart_${branchId}`) || '[]');
    return cart;
}

export function saveCart(branchId) {
    localStorage.setItem(`deerty_cart_${branchId}`, JSON.stringify(cart));
}

export function clearCart(branchId) {
    cart = [];
    saveCart(branchId);
}

// 3. دوال منطق السلة (Core Logic)
export function updateCartQuantity(itemKey, type, branchId) {
    loadCart(branchId); 

    const itemIndex = cart.findIndex(item => item.key === itemKey);

    if (itemIndex > -1) {
        if (type === 'increment') {
            cart[itemIndex].qty++;
        } else if (type === 'decrement') {
            cart[itemIndex].qty--;
            if (cart[itemIndex].qty <= 0) {
                cart.splice(itemIndex, 1); 
            }
        }
    }
    saveCart(branchId);
    return cart; 
}

export function addToCart(item, branchId) {
    loadCart(branchId); 

    const obj = {...item};
    // حذف خصائص المنطق من الصنف قبل إضافته للسلة
    delete obj.branchDiscounts; 
    delete obj.isBestSeller; 
    delete obj.availableIn;
    
    // إنشاء مفتاح فريد للصنف
    const optionName = obj.selectedOption ? obj.selectedOption.name : '';
    const note = obj.note ? obj.note : '';
    const key = obj.id + '-' + optionName + '-' + note;
    
    const found = cart.find(i => i.key === key);

    if (found) {
        found.qty += 1;
    } else {
        cart.push({...obj, key, qty: 1}); 
    }
    
    saveCart(branchId);
    return cart; 
}

// 4. دالة حساب الإجمالي
export function calculateTotals(branchConfig, cart, deliveryType) {
    let subtotal = 0;
    cart.forEach(item => {
        const price = (item.basePrice || 0) + (item.selectedOption ? item.selectedOption.price : 0);
        subtotal += price * item.qty;
    });

    const isDelivery = deliveryType === 'delivery'; 
    const deliveryFee = isDelivery ? branchConfig.deliveryFee : 0;
    const total = subtotal + deliveryFee;

    return { subtotal, deliveryFee, total, isDelivery };
}

// 5. دالة إنشاء رابط الواتساب
// المصدر: دمج منطق sendWhatsapp من Script.js
export function generateWhatsappLink(branchConfig, cart, deliveryType, userLocation, manualAddressNote) {
    if (cart.length === 0) return '#';

    const { subtotal, deliveryFee, total, isDelivery } = calculateTotals(branchConfig, cart, deliveryType, manualAddressNote);
    const whatsappNumber = branchConfig.whatsapp;

    let message = `*✨ طلب جديد من مطاعم سحايب ديرتي - فرع ${branchConfig.name} ✨*\n\n`;
    message += `🛒 *الطلبات:*\n`;

    cart.forEach((it) => {
        const price = (it.basePrice || 0) + (it.selectedOption ? it.selectedOption.price : 0);
        const totalItemPrice = price * it.qty;
        
        const optionText = it.selectedOption && it.selectedOption.name && 
                           !['نفر', 'طبق', 'عبوة'].includes(it.selectedOption.name) ? 
                           ` - ${it.selectedOption.name}` : '';
        
        const noteText = it.note ? ` (ملاحظة: ${it.note})` : '';

        message += `${it.qty} × ${it.name}${optionText} ${noteText} \n  *الإجمالي:* ${formatCurrency(totalItemPrice)}\n`;
    });

    message += `\n---`;
    message += `\n*🧾 ملخص الفاتورة:*\n`;
    message += `  الإجمالي الفرعي: ${formatCurrency(subtotal)}\n`;

    if (isDelivery) {
        message += `  رسوم التوصيل: ${formatCurrency(deliveryFee)}\n`;
        if (manualAddressNote) {
            message += `  *العنوان اليدوي:* ${manualAddressNote}\n`;
        } else if (userLocation) {
            message += `  *إحداثيات الموقع (محدد):* \n  Lat: ${userLocation.lat}, Lng: ${userLocation.lng}\n`;
        } else {
            message += `  *العنوان:* لم يتم تحديد موقع/عنوان. يرجى التحديد عند التواصل.\n`;
        }
    } else {
         message += `  *نوع الطلب:* استلام من الفرع (${branchConfig.name})\n`;
         message += `  رسوم التوصيل: ${formatCurrency(0)}\n`;
    }

    message += `\n*💰 الإجمالي المطلوب: ${formatCurrency(total)}*\n\n`;
    message += `_شكراً لك لاختيار مطاعم سحايب ديرتي!_`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    return whatsappUrl;
}
