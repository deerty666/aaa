// File: messaging.js (منطق الرسائل)

/**
 * دالة لتجميع محتويات السلة وصياغة رسالة واتساب النهائية.
 * @param {Object} cartItems - محتويات السلة الحالية.
 * @param {Object} currentBranch - إعدادات الفرع الحالي (Whatsapp, DeliveryFee).
 * @param {string} deliveryAddress - نص عنوان التوصيل.
 * @param {string} orderNotes - ملاحظات الطلب العامة.
 */
export function generateWhatsAppMessage(cartItems, currentBranch, deliveryAddress, orderNotes) {
    let message = `*طلب جديد من فرع: ${currentBranch.name}*\n\n`;
    let total = 0;

    // 1. تجميع تفاصيل الطلبات وحساب الإجمالي الفرعي (Subtotal):
    for (const key in cartItems) {
        const item = cartItems[key];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        message += `✅ ${item.quantity} x ${item.name}`;
        if (item.option) {
            message += ` (${item.option})`;
        }
        if (item.note) {
            message += ` - ملاحظة: ${item.note}`;
        }
        message += ` | المجموع: ${itemTotal.toFixed(2)} ريال\n`;
    }
    
    // 2. حساب المجموع النهائي وإضافته للرسالة
    const subtotal = total;
    const finalTotal = subtotal + currentBranch.deliveryFee;

    message += `\n*-- تفاصيل الحساب --*\n`;
    message += `المجموع الفرعي: ${subtotal.toFixed(2)} ريال\n`;
    message += `رسوم التوصيل: ${currentBranch.deliveryFee.toFixed(2)} ريال\n`;
    message += `*الإجمالي النهائي: ${finalTotal.toFixed(2)} ريال*\n\n`;
    
    // 3. إضافة بيانات العميل
    message += `*-- بيانات العميل --*\n`;
    message += `العنوان: ${deliveryAddress || 'لم يتم إدخال عنوان'}\n`;
    if (orderNotes) {
         message += `ملاحظات عامة: ${orderNotes}\n`;
    }

    // 4. بناء الرابط:
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${currentBranch.whatsapp}?text=${encodedMessage}`;
}
