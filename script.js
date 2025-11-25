// مصفوفة لتخزين الأصناف التي يضيفها المستخدم للسلة
let shoppingCart = [];

// ==========================================================
// 💡 دوال التحكم بالسلة (جديدة)
// ==========================================================

// 💡 دالة تفريغ السلة بالكامل
function clearCart() {
    shoppingCart.length = 0;
    updateCartUI(); // تحديث الواجهة
}

// 💡 دالة الحذف الفردي (تستخدم splice)
function deleteItem(itemName) {
    const itemIndex = shoppingCart.findIndex(item => item.name === itemName);

    if (itemIndex > -1) {
        shoppingCart.splice(itemIndex, 1);
    }
    updateCartUI();
}

// 💡 دالة تغيير كمية صنف محدد (+ أو -)
function changeItemQuantity(itemName, delta) {
    const itemIndex = shoppingCart.findIndex(item => item.name === itemName);

    if (itemIndex > -1) {
        shoppingCart[itemIndex].quantity += delta;

        // إذا أصبحت الكمية صفر أو أقل، نحذف الصنف بالكامل
        if (shoppingCart[itemIndex].quantity <= 0) {
            shoppingCart.splice(itemIndex, 1);
        }
    }
    updateCartUI();
}

// ==========================================================
// 🗺️ تكامل Google Maps API (جديد)
// ==========================================================

// الدالة التي تستدعيها مكتبة Google Maps بعد تحميلها
function initAutocomplete() {
    const locationInput = document.getElementById('locationInput');
    
    // التحقق من وجود الحقل (لأنه يتم إنشاؤه ديناميكياً)
    if (locationInput) {
        const autocomplete = new google.maps.places.Autocomplete(locationInput, {
            types: ['address'], 
            componentRestrictions: {'country': 'sa'} 
        });

        // ربط مستمع الحدث: عند اختيار المستخدم لعنوان من القائمة
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            
            if (place.geometry) {
                // نضع العنوان المنسق والجاهز مرة أخرى في حقل الإدخال
                locationInput.value = place.formatted_address; 
            }
        });
    }
}


// ==========================================================
// 🛒 تحديث واجهة السلة (محدثة)
// ==========================================================

function updateCartUI() {
    const cartSummary = document.getElementById('cartSummary');
    
    // 💡 حساب الإجمالي باستخدام الكميات (price * quantity)
    const baseTotal = shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 15; // رسوم توصيل ثابتة
    const finalTotal = baseTotal + deliveryFee;

    if (shoppingCart.length === 0) {
        cartSummary.innerHTML = '<h3>🛒 السلة فارغة</h3>';
        return;
    }

    let cartItemsHTML = shoppingCart.map(item => `
        <div style="border-bottom: 1px dotted #555; padding-bottom: 5px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
            <p style="font-size: 14px; margin: 0;">
                ${item.name} 
                <span style="color: #ccc; font-size: 12px; display: block;">(${item.price} ريال/قطعة)</span>
            </p>
            
            <div style="display: flex; align-items: center;">
                <button onclick="changeItemQuantity('${item.name.replace(/'/g, "\\'")}', 1)" style="background: green; color: white; border: none; width: 25px; height: 25px; border-radius: 4px; cursor: pointer; margin: 0 5px;">+</button>
                <span style="font-weight: bold; margin: 0 5px; color: gold;">${item.quantity}</span>
                <button onclick="changeItemQuantity('${item.name.replace(/'/g, "\\'")}', -1)" style="background: red; color: white; border: none; width: 25px; height: 25px; border-radius: 4px; cursor: pointer;">-</button>
                
                <button onclick="deleteItem('${item.name.replace(/'/g, "\\'")}')" 
                        style="background: transparent; color: red; border: none; font-size: 18px; cursor: pointer; margin-right: 5px;">
                    ❌
                </button>
            </div>
            
        </div>
    `).join('');

    cartSummary.innerHTML = `
        <h3>🛒 ملخص السلة</h3>
        ${cartItemsHTML}
        
        <hr style="border-color: #555;">
        
        <p><strong>خيارات الطلب:</strong></p>
        <label for="locationInput">العنوان:</label>
        <input type="text" id="locationInput" placeholder="أدخل العنوان هنا..." style="width: 90%; padding: 8px; margin-bottom: 10px; border-radius: 4px; border: 1px solid #555; background-color: #333; color: white;">

        <label for="notesInput">ملاحظات إضافية (اختياري):</label>
        <textarea id="notesInput" placeholder="اكتب ملاحظاتك..." style="width: 90%; padding: 8px; margin-bottom: 10px; border-radius: 4px; border: 1px solid #555; background-color: #333; color: white;"></textarea>
        
        <button onclick="clearCart()" 
            style="width: 100%; padding: 8px; background-color: #8B0000; color: white; border: none; border-radius: 4px; margin-top: 10px; cursor: pointer; font-size: 14px;">
            🗑️ تفريغ السلة بالكامل
        </button>

        <p style="border-top: 1px dashed #555; padding-top: 5px;">الإجمالي الأساسي: ${baseTotal} ريال</p>
        <p>رسوم التوصيل: ${deliveryFee} ريال</p>
        <h4 style="color: #ffc107;">الإجمالي النهائي: ${finalTotal} ريال</h4>

        <button onclick="sendWhatsAppOrder()">إرسال الطلب عبر WhatsApp</button>
    `;
    
    // 💡 يجب استدعاء الدالة هنا لربط Autocomplete بالحقل الجديد
    if (typeof initAutocomplete === 'function') {
        initAutocomplete();
    }
}


// ==========================================================
// ⚙️ وظائف إضافية (محدثة)
// ==========================================================

function renderMenu() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = menuData.map(item => `
        <div class="item-card" onclick="openItemOptions('${item.name}')">
            <h3>${item.name}</h3>
            <p>السعر: ${item.price} ريال</p>
            <p>الأرز المقترح: ${item.rice}</p>
        </div>
    `).join('');
}

function openItemOptions(itemName) {
    const item = menuData.find(i => i.name === itemName);
    if (!item) return;

    const modal = document.getElementById('itemModal');
    const modalContent = document.getElementById('modalContent');
    
    // حساب سعر الأرز (إذا كان موجوداً)
    const ricePrice = 5; 

    // محتوى النافذة المنبثقة
    modalContent.innerHTML = `
        <h3>${item.name}</h3>
        <p>السعر الأساسي: ${item.price} ريال</p>
        
        <h4>اختر نوع الأرز:</h4>
        <div onchange="updateModalPrice('${item.name}')">
            <label><input type="radio" name="rice_option" value="${item.rice}" checked> ${item.rice} (مجاني)</label><br>
            <label><input type="radio" name="rice_option" value="أرز أبيض"> أرز أبيض (+${ricePrice} ريال)</label><br>
            <label><input type="radio" name="rice_option" value="بدون أرز"> بدون أرز (مجاني)</label>
        </div>
        
        <h4>إضافات اختيارية (+3 ريال لكل إضافة):</h4>
        <div onchange="updateModalPrice('${item.name}')">
            <label><input type="checkbox" name="optional_extra" value="إضافة كاتشب"> كاتشب</label><br>
            <label><input type="checkbox" name="optional_extra" value="إضافة سلطة خضراء"> سلطة خضراء</label><br>
        </div>
        
        <h4>الكمية:</h4>
        <input type="number" id="quantityInput" value="1" min="1" 
               oninput="updateModalPrice('${item.name}')" 
               style="width: 100px; padding: 5px; margin-bottom: 15px; background-color: #333; color: white; border: 1px solid #555;">
               
        <p>الإجمالي للصنف الواحد: <strong id="currentTotal">${item.price}</strong> ريال</p>
        <button id="addToCartBtn" style="background-color: #ffc107; color: #121212;">أضف إلى السلة</button>
    `;
    
    modal.style.display = 'block';
    
    // 💡 ربط زر الإضافة للسلة بالمنطق المخصص (محدث للتعامل مع الكمية كوحدة واحدة)
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        // 1. قراءة الكمية المطلوبة وسعر القطعة
        const quantityInput = document.getElementById('quantityInput');
        const quantity = Math.max(1, parseInt(quantityInput.value) || 1);
        
        // يجب أن نستخدم قيمة currentTotal ونقسمها على الكمية للحصول على سعر القطعة
        const currentTotalText = document.getElementById('currentTotal').textContent;
        const finalPricePerItem = parseFloat(currentTotalText) / quantity; 

        // 2. بناء اسم الصنف المخصص (مفتاح البحث الفريد)
        const selectedRiceOption = document.querySelector('input[name="rice_option"]:checked');
        const selectedRiceName = selectedRiceOption ? selectedRiceOption.value : item.rice || 'بدون أرز';
        
        let extrasList = [];
        document.querySelectorAll('input[name="optional_extra"]:checked').forEach(checkbox => {
            extrasList.push(checkbox.value);
        });
        
        const extrasString = extrasList.length > 0 ? ` + إضافات: ${extrasList.join(', ')}` : '';
        const customName = `${item.name} (أرز: ${selectedRiceName})${extrasString}`;

        // 3. البحث في السلة: هل يوجد صنف بنفس الاسم والسعر؟
        const existingItemIndex = shoppingCart.findIndex(cartItem => 
            cartItem.name === customName && cartItem.price === finalPricePerItem
        );

        if (existingItemIndex > -1) {
            // 4. التحديث: إذا كان موجوداً، زد الكمية
            shoppingCart[existingItemIndex].quantity += quantity;
        } else {
            // 5. الإضافة: إذا لم يكن موجوداً، أضف كائناً جديداً بخصائص الكمية
            const customItem = {
                name: customName,
                price: finalPricePerItem,
                quantity: quantity 
            };
            shoppingCart.push(customItem);
        }
        
        updateCartUI(); 
        closeModal();
    });
    
    // نضمن تحديث السعر عند الفتح لأول مرة
    updateModalPrice(itemName);
}

function updateModalPrice(itemName) {
    const item = menuData.find(i => i.name === itemName);
    if (!item) return;
    
    const ricePrice = 5;
    const extraPrice = 3; 

    const quantityInput = document.getElementById('quantityInput');
    const totalElement = document.getElementById('currentTotal');

    // 💡 تم حذف السطر الذي كان يعيد تعيين قيمة حقل الكمية باستمرار
    const quantity = Math.max(1, parseInt(quantityInput ? quantityInput.value : 1) || 1);

    // 1. حساب السعر الأساسي والإضافات
    let price = item.price;

    // 2. حساب الأرز
    const selectedRiceOption = document.querySelector('input[name="rice_option"]:checked');
    if (selectedRiceOption && selectedRiceOption.value === 'أرز أبيض') {
        price += ricePrice;
    }

    // 3. حساب الإضافات
    document.querySelectorAll('input[name="optional_extra"]:checked').forEach(() => {
        price += extraPrice;
    });

    // 4. السعر النهائي للكمية المختارة
    const finalTotal = price * quantity;
    
    totalElement.textContent = finalTotal.toFixed(2);
}

function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

function sendWhatsAppOrder() {
    const location = document.getElementById('locationInput').value || 'لم يتم تحديد موقع';
    const notes = document.getElementById('notesInput').value || 'لا توجد ملاحظات';
    const finalTotal = parseFloat(document.getElementById('cartSummary').querySelector('h4').textContent.replace(/[^\d.]/g, ''));
    
    let orderDetails = shoppingCart.map(item => 
        `*${item.name}* (الكمية: ${item.quantity}) - الإجمالي: ${item.price * item.quantity} ريال`
    ).join('\n');

    const message = `
*طلب جديد* 📝
---
${orderDetails}
---
*رسوم التوصيل*: 15 ريال
*الإجمالي النهائي*: ${finalTotal} ريال
*العنوان*: ${location}
*ملاحظات*: ${notes}
    `;

    // ترميز الرسالة لـ URL
    const encodedMessage = encodeURIComponent(message.trim());
    // رقم مطعم افتراضي
    const phoneNumber = '966555555555'; 

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// تشغيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartUI();
});
