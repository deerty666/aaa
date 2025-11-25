// 💡 1. تعريف مصفوفة عربة التسوق العالمية
const shoppingCart = [];

// 💡 2. دالة لإغلاق النافذة المنبثقة
function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

// 💡 3. دالة لتحديث السعر التفاعلي في النافذة المنبثقة (محدثة لحساب الكمية والإضافات)
function updateModalPrice(basePrice) {
    // 1. قراءة سعر إضافة الأرز المختار
    const selectedRice = document.querySelector('input[name="rice_option"]:checked');
    const riceAdd = parseFloat(selectedRice ? selectedRice.getAttribute('data-price-add') : 0);

    // 2. قراءة مجموع أسعار الإضافات الاختيارية المحددة
    let extrasTotal = 0;
    document.querySelectorAll('input[name="optional_extra"]:checked').forEach(checkbox => {
        extrasTotal += parseFloat(checkbox.getAttribute('data-price-add'));
    });
    
    // 3. قراءة الكمية
    const quantityInput = document.getElementById('quantityInput');
    // نستخدم Math.max للتأكد من أن القيمة لا تقل عن 1
    const quantity = Math.max(1, parseInt(quantityInput ? quantityInput.value : 1) || 1); 
    
    // تحديث قيمة حقل الكمية لضمان عدم وجود قيم سالبة أو صفر
    if (quantityInput) quantityInput.value = quantity;


    // 4. حساب الإجمالي الجديد (للصنف الواحد أولاً)
    const pricePerItem = basePrice + riceAdd + extrasTotal;
    
    // 5. ضرب السعر في الكمية
    const newTotal = pricePerItem * quantity;

    // 6. تحديث القيمة المعروضة في النافذة المنبثقة
    document.getElementById('currentTotal').textContent = newTotal;
}

// 💡 4. دالة إرسال الطلب عبر الواتساب (محدثة لتحسين الترميز)
function submitOrder() {
    
    const baseTotal = shoppingCart.reduce((total, item) => total + item.price, 0); 
    const selectedOption = document.querySelector('input[name="orderOption"]:checked');
    // التأكد من أن التوصيل هو الخيار الافتراضي
    const isDelivery = selectedOption ? selectedOption.value === 'delivery' : true; 
    let deliveryFee = isDelivery ? 5 : 0;
    const finalTotal = baseTotal + deliveryFee;
    const deliveryStatus = isDelivery ? 'توصيل (+5 ريال)' : 'استلام من الفرع (مجاني)';
    const locationInput = document.getElementById('locationInput');
    const userLocation = locationInput ? locationInput.value : 'لم يتم إدخال الموقع/العنوان.';

    // توليد قائمة الأصناف
    const itemsList = shoppingCart.map((item, index) => {
        return `${index + 1}. ${item.name} - ${item.price} ريال`;
    }).join('\n'); // استخدام \n للفصل بين الأسطر

    // تجميع الرسالة النهائية للواتساب (تم تحسين النص لترميز أفضل)
    const rawMessage = `*✅ طلب جديد للمطعم: (${shoppingCart.length} صنف)*\n`
                          + `----------------------\n`
                          + `${itemsList}\n`
                          + `----------------------\n`
                          + `*🚚 خيار الطلب:* ${deliveryStatus}\n`
                          + `*💰 الإجمالي النهائي:* ${finalTotal} ريال\n\n`
                          + `*📍 الموقع:* ${userLocation}`;

    const phoneNumber = '966536803598'; 
    // ترميز الرسالة كاملة
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(rawMessage)}`;
    
    window.open(whatsappLink, '_blank');
    
    // مسح السلة وتحديث الواجهة
    shoppingCart.length = 0; 
    updateCartUI();
}

// 💡 5. دالة تحديث واجهة عربة التسوق (محدثة لزر الإغلاق والشارة)
function updateCartUI() {
    const cartSummary = document.getElementById('cartSummary');
    const itemCount = shoppingCart.length;

    // تحديث شارة العدد على الزر العائم
    const cartCountBadge = document.getElementById('cartCountBadge');
    if (itemCount > 0) {
        cartCountBadge.textContent = itemCount;
        cartCountBadge.style.display = 'block';
    } else {
        cartCountBadge.style.display = 'none';
        cartSummary.classList.remove('open'); // إخفاء النافذة إذا أصبحت فارغة
    }

    if (itemCount === 0) {
        cartSummary.innerHTML = `
            <span class="close-btn" style="float: right;" onclick="document.getElementById('cartSummary').classList.remove('open')">&times;</span>
            <h3 style="color: gold; text-align: center; margin-top: 0;">🛒 السلة فارغة</h3>`;
        return; 
    }

    const baseTotal = shoppingCart.reduce((total, item) => total + item.price, 0); 
    let deliveryFee = 0;
    let finalTotal = baseTotal;
    
    // تحديد القيمة المحددة أو الافتراض على 'delivery'
    let selectedValue = 'delivery'; 
    const existingRadio = document.querySelector('.cart-summary input[name="orderOption"]:checked');
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
        <span class="close-btn" style="float: right;" onclick="document.getElementById('cartSummary').classList.remove('open')">&times;</span>
        <h3 style="color: gold; text-align: center; margin-top: 0;">🛒 سلة المشتريات (${itemCount} صنف)</h3>
        
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
    
    // يجب ربط الأحداث مرة أخرى لأننا قمنا بتحديث innerHTML
    document.querySelectorAll('.cart-summary input[name="orderOption"]').forEach(input => {
        input.addEventListener('change', updateCartUI);
    });
    
    document.getElementById('submitOrderBtn').addEventListener('click', submitOrder);
}


// 💡 6. دالة التعامل مع فتح تفاصيل الصنف وحقن المحتوى (محدثة بالكامل)
function openItemOptions(item) {
    const modal = document.getElementById('itemModal');
    const modalContent = document.getElementById('modalContent');

    // 💡 توليد خيارات الأرز كأزرار راديو
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
        
        const paidRiceOptions = (item.extras || []).filter(extra => 
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
    
    // 💡 توليد خيارات الإضافات الاختيارية كخانة اختيار (Checkboxes)
    let extraCheckboxesHTML = '';
    const nonRiceExtras = (item.extras || []).filter(extra => 
        !extra.name.includes("رز") && !extra.name.includes("مثلوثة")
    );
    
    if (nonRiceExtras.length > 0) {
        extraCheckboxesHTML = `
            <h4 style="color:gold; border-top: 1px solid #333; padding-top: 10px; margin-top: 10px;">🌶️ إضافات اختيارية:</h4>
            <div id="extraCheckboxesContainer" style="margin-bottom: 15px;">
        ` + nonRiceExtras.map(extra => `
            <label style="display:block; margin-right: 10px; font-size: 15px;">
                <input type="checkbox" name="optional_extra" value="${extra.name}" data-price-add="${extra.add}">
                ${extra.name} (+${extra.add} ريال)
            </label>
        `).join('') + `</div>`;
    }

    // دمج كل المحتوى
    const itemDetailsHTML = `
        <span id="closeModalBtn" class="close-btn" onclick="closeModal()">&times;</span> 
        <h2 style="color:gold; padding-bottom: 10px;">${item.name}</h2>
        <p style="font-size: 18px;">السعر الأساسي: <span id="basePrice">${item.price}</span> ريال</p>
        
        ${riceOptionsHTML} 
        
        ${extraCheckboxesHTML} 
        
        <div style="display:flex; align-items:center; margin-top:20px; font-size: 18px; border-top: 1px solid #333; padding-top: 10px;">
            <label for="quantityInput" style="margin-left: 10px;">الكمية:</label>
            <input type="number" id="quantityInput" value="1" min="1" 
                   style="width: 60px; padding: 5px; border-radius: 4px; border: 1px solid gold; background: #333; color: white; text-align: center;">
        </div>

        <p style="font-size: 24px; font-weight: bold; margin-top: 15px; color: #25D366;">
            الإجمالي الحالي: <span id="currentTotal">${item.price}</span> ريال
        </p>

        <button id="addToCartBtn" style="background-color: gold; color: #111; padding: 10px 20px; border: none; border-radius: 8px; margin-top: 20px; cursor: pointer;">
            إضافة للسلة
        </button>
    `;

    modalContent.innerHTML = itemDetailsHTML;
    modal.style.display = 'block';
    
    // 💡 ربط مستمعات حدث لخيارات الأرز والإضافات والكمية لتحديث السعر
    const updateHandler = () => updateModalPrice(item.price);

    document.querySelectorAll('input[name="rice_option"]').forEach(radio => {
        radio.addEventListener('change', updateHandler); 
    });
    document.querySelectorAll('input[name="optional_extra"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateHandler);
    });
    document.getElementById('quantityInput').addEventListener('input', updateHandler);

    // 💡 ربط زر الإضافة للسلة بالمنطق المخصص (محدث)
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantityInput').value) || 1;
        const finalPricePerItem = parseFloat(document.getElementById('currentTotal').textContent) / quantity; 
        
        // بناء اسم الصنف المخصص
        const selectedRiceOption = document.querySelector('input[name="rice_option"]:checked');
        const selectedRiceName = selectedRiceOption ? selectedRiceOption.value : item.rice || 'بدون أرز';
        
        let extrasList = [];
        document.querySelectorAll('input[name="optional_extra"]:checked').forEach(checkbox => {
            extrasList.push(checkbox.value);
        });
        
        const extrasString = extrasList.length > 0 ? ` + إضافات: ${extrasList.join(', ')}` : '';
        const customName = `${item.name} (أرز: ${selectedRiceName})${extrasString}`;

        // 💡 تكرار إضافة الصنف حسب الكمية
        for (let i = 0; i < quantity; i++) {
            const customItem = {
                name: customName,
                price: finalPricePerItem 
            };
            shoppingCart.push(customItem);
        }
        
        updateCartUI(); 
        closeModal();
    });
}

// 💡 7. تهيئة القائمة وبناء الهيكل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("menuSections");
    updateCartUI(); 

    // 💡 ربط زر عرض السلة العائم بالنافذة الجانبية
    document.getElementById('cartToggleButton').addEventListener('click', () => {
        document.getElementById('cartSummary').classList.toggle('open');
    });

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
