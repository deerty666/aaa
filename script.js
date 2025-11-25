// 💡 1. تعريف مصفوفة عربة التسوق العالمية
const shoppingCart = [];

// 💡 2. دالة لإغلاق النافذة المنبثقة
function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

// 💡 3. دالة لتحديث السعر التفاعلي في النافذة المنبثقة (جديدة)
function updateModalPrice(basePrice) {
    // 1. قراءة سعر إضافة الأرز المختار
    const selectedRice = document.querySelector('input[name="rice_option"]:checked');
    const riceAdd = parseFloat(selectedRice.getAttribute('data-price-add') || 0);

    // 2. حساب الإجمالي الجديد
    const newTotal = basePrice + riceAdd;

    // 3. تحديث القيمة المعروضة في النافذة المنبثقة
    document.getElementById('currentTotal').textContent = newTotal;
}

// 💡 4. دالة إرسال الطلب عبر الواتساب
function submitOrder() {
    
    // ... منطق حساب الإجمالي والحصول على الموقع ...
    const baseTotal = shoppingCart.reduce((total, item) => total + item.price, 0); 
    const selectedOption = document.querySelector('input[name="orderOption"]:checked');
    let deliveryFee = (selectedOption && selectedOption.value === 'delivery') ? 5 : 0;
    const finalTotal = baseTotal + deliveryFee;
    const deliveryStatus = (deliveryFee === 5) ? 'توصيل (+5 ريال)' : 'استلام من الفرع (مجاني)';
    const locationInput = document.getElementById('locationInput');
    const userLocation = locationInput ? locationInput.value : 'لم يتم إدخال الموقع/العنوان.';

    // توليد قائمة الأصناف
    const itemsList = shoppingCart.map((item, index) => {
        // نستخدم اسم الصنف المخصص والسعر النهائي من الكائن
        return `${index + 1}. ${item.name} - ${item.price} ريال`;
    }).join('%0A');

    // تجميع الرسالة النهائية للواتساب
    const whatsappMessage = `*✅ طلب جديد للمطعم: ( ${shoppingCart.length} صنف )*%0A`
                          + `----------------------%0A`
                          + `${itemsList}%0A`
                          + `----------------------%0A`
                          + `*🚚 خيار الطلب:* ${deliveryStatus}%0A`
                          + `*💰 الإجمالي النهائي:* ${finalTotal} ريال%0A%0A`
                          + `*📍 الموقع:* ${userLocation}`;

    const phoneNumber = '966536803598'; 
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappLink, '_blank');
    
    // مسح السلة وتحديث الواجهة
    shoppingCart.length = 0; 
    updateCartUI();
}

// 💡 5. دالة تحديث واجهة عربة التسوق
function updateCartUI() {
    // ... (لا توجد تغييرات جوهرية هنا، لكنها تستخدم now منطق submitOrder المحدث) ...
    const cartSummary = document.getElementById('cartSummary');
    const itemCount = shoppingCart.length;

    if (itemCount === 0) {
        cartSummary.innerHTML = '<h3>🛒 السلة فارغة</h3>';
        return; 
    }

    const baseTotal = shoppingCart.reduce((total, item) => total + item.price, 0); 
    let deliveryFee = 0;
    let finalTotal = baseTotal;
    let selectedValue = 'delivery'; 
    const existingRadio = document.querySelector('input[name="orderOption"]:checked');
    if (existingRadio) {
        selectedValue = existingRadio.value;
    }

    if (selectedValue === 'delivery') {
        deliveryFee = 5;
        finalTotal += deliveryFee;
    }

    let cartItemsHTML = shoppingCart.map(item => `
        <p style="border-bottom: 1px dotted #555; padding-bottom: 5px; font-size: 14px;">
            ${item.name} - ${item.price} ريال
        </p>
    `).join('');

    const existingLocationInput = document.getElementById('locationInput');
    const existingLocationValue = existingLocationInput ? existingLocationInput.value : '';

    cartSummary.innerHTML = `
        <h3 style="color: gold; text-align: center;">🛒 سلة المشتريات (${itemCount} صنف)</h3>
        
        <div style="padding: 10px; background: #222; border-radius: 8px; max-height: 200px; overflow-y: auto;">
            ${cartItemsHTML}
        </div>
        
        <div style="margin-top: 15px;">
            <h4 style="color: gold;">🚚 خيار الطلب:</h4>
            <label style="display: block; margin-bottom: 8px; font-size: 14px;">
                <input type="radio" name="orderOption" value="delivery" ${selectedValue === 'delivery' ? 'checked' : ''}> 
                توصيل (+5 ريال)
            </label>
            <label style="display: block; font-size: 14px;">
                <input type="radio" name="orderOption" value="pickup" ${selectedValue === 'pickup' ? 'checked' : ''}> 
                استلام من الفرع (مجاني)
            </label>
            
            <h4 style="color: gold; margin-top: 15px;">📍 تحديد الموقع/العنوان:</h4>
            <input type="text" id="locationInput" placeholder="اكتب عنوان التوصيل أو اسم الحي" value="${existingLocationValue}"
                   style="width: 95%; padding: 8px; border-radius: 4px; border: 1px solid #555; background: #333; color: white; margin-bottom: 10px;">

            <p style="border-top: 1px dashed #555; padding-top: 5px;">الإجمالي الأساسي: ${baseTotal} ريال</p>
            <p>رسوم التوصيل: ${deliveryFee} ريال</p>
            
            <p style="font-size: 22px; font-weight: bold; color: #25D366;">
                الإجمالي النهائي: ${finalTotal} ريال
            </p>
            
            <button id="submitOrderBtn" style="width: 100%; padding: 12px; background-color: #25D366; color: white; border: none; border-radius: 8px; margin-top: 10px; cursor: pointer; font-size: 16px;">
                إرسال الطلب عبر واتساب
            </button>
        </div>
    `;
    
    document.querySelectorAll('input[name="orderOption"]').forEach(input => {
        input.addEventListener('change', updateCartUI);
    });
    
    document.getElementById('submitOrderBtn').addEventListener('click', submitOrder);
}


// 💡 6. دالة التعامل مع فتح تفاصيل الصنف وحقن المحتوى (محدثة)
function openItemOptions(item) {
    const modal = document.getElementById('itemModal');
    const modalContent = document.getElementById('modalContent');

    // 💡 توليد خيارات الأرز كأزرار راديو (محدث)
    let riceOptionsHTML = '';
    if (item.rice) {
        riceOptionsHTML = `
            <h4 style="color:gold;">🍚 خيارات الأرز:</h4>
            <div id="riceOptionsContainer" style="margin-bottom: 15px;">
                <label style="display:block; margin-right: 10px; font-size: 15px;">
                    <input type="radio" name="rice_option" value="${item.rice}" checked data-price-add="0">
                    ${item.rice} (مجاني)
                </label>
        `;
        
        // تصفية الخيارات المدفوعة من مصفوفة extras (باستخدام محتوى الاسم)
        const paidRiceOptions = item.extras.filter(extra => 
            extra.name.includes("رز") || extra.name.includes("مثلوثة")
        );

        riceOptionsHTML += paidRiceOptions.map(extra => `
            <label style="display:block; margin-right: 10px; font-size: 15px;">
                <input type="radio" name="rice_option" value="${extra.name}" data-price-add="${extra.add}">
                ${extra.name} (+${extra.add} ريال)
            </label>
        `).join('');

        riceOptionsHTML += `</div>`;
    }
    
    // توليد الإضافات (ما زالت كـ نص ثابت، لكن نتركها هنا للتطوير المستقبلي)
    const extrasInfo = item.extras
      ? `
        <h4 style="color:gold; border-top: 1px solid #333; padding-top: 10px; margin-top: 10px;">إضافات اختيارية:</h4>
        ${item.extras.map(extra => {
            if (!extra.name.includes("رز") && !extra.name.includes("مثلوثة")) {
                return `<p class="modal-extra-option" style="font-size:15px;">${extra.name} (+${extra.add} ريال)</p>`;
            }
            return '';
          }).join('')}
        `
      : '';

    // دمج كل المحتوى
    const itemDetailsHTML = `
        <span id="closeModalBtn" class="close-btn" onclick="closeModal()">&times;</span> 
        <h2 style="color:gold; padding-bottom: 10px;">${item.name}</h2>
        <p style="font-size: 18px;">السعر الأساسي: <span id="basePrice">${item.price}</span> ريال</p>
        
        ${riceOptionsHTML} 
        
        <div style="margin-top: 15px;">
        ${extrasInfo}
        </div>
        
        <p style="font-size: 24px; font-weight: bold; margin-top: 15px;">
            الإجمالي الحالي: <span id="currentTotal">${item.price}</span> ريال
        </p>

        <button id="addToCartBtn" style="background-color: gold; color: #111; padding: 10px 20px; border: none; border-radius: 8px; margin-top: 20px; cursor: pointer;">
            إضافة للسلة
        </button>
    `;

    modalContent.innerHTML = itemDetailsHTML;
    modal.style.display = 'block';
    
    // 💡 ربط مستمعات حدث لخيارات الأرز لتحديث السعر
    document.querySelectorAll('input[name="rice_option"]').forEach(radio => {
        radio.addEventListener('change', () => {
            updateModalPrice(item.price); 
        });
    });

    // 💡 ربط زر الإضافة للسلة بالمنطق المخصص (محدث)
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        const finalPrice = parseFloat(document.getElementById('currentTotal').textContent);
        const selectedRiceOption = document.querySelector('input[name="rice_option"]:checked');
        const selectedRiceName = selectedRiceOption ? selectedRiceOption.value : item.rice || 'بدون أرز';

        const customName = `${item.name} - (مع ${selectedRiceName})`;

        const customItem = {
            name: customName,
            price: finalPrice 
        };

        shoppingCart.push(customItem);
        updateCartUI(); 
        closeModal();
    });
}

// 💡 7. تهيئة القائمة وبناء الهيكل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("menuSections");
    updateCartUI(); 

    menuData.forEach(sec => {
      const group = document.createElement("div");
      group.classList.add('item-grid-container'); 
      group.innerHTML = `<h2 style='color:gold;border-bottom:1px solid gold;padding-bottom:5px; margin-top: 30px;'>${sec.section}</h2>`;

      sec.items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
          <h3>${item.name}</h3>
          <p>السعر: ${item.price} ريال</p>
        `;
        
        card.addEventListener('click', () => {
            openItemOptions(item); 
        });

        group.appendChild(card);
      });

      container.appendChild(group);
    });
});
