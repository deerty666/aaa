// 💡 1. تعريف مصفوفة عربة التسوق العالمية
const shoppingCart = [];

// 💡 2. دالة لإغلاق النافذة المنبثقة
function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

// 💡 3. دالة إرسال الطلب عبر الواتساب ومسح السلة
function submitOrder() {
    
    // الحصول على بيانات الطلب النهائية
    const baseTotal = shoppingCart.reduce((total, item) => total + item.price, 0); 
    const selectedOption = document.querySelector('input[name="orderOption"]:checked');
    let deliveryFee = (selectedOption && selectedOption.value === 'delivery') ? 5 : 0;
    const finalTotal = baseTotal + deliveryFee;
    const deliveryStatus = (deliveryFee === 5) ? 'توصيل (+5 ريال)' : 'استلام من الفرع (مجاني)';

    // الحصول على قيمة حقل الموقع
    const locationInput = document.getElementById('locationInput');
    const userLocation = locationInput ? locationInput.value : 'لم يتم إدخال الموقع/العنوان.';

    // توليد قائمة الأصناف
    const itemsList = shoppingCart.map((item, index) => {
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
    
    // فتح رابط الواتساب في نافذة جديدة
    window.open(whatsappLink, '_blank');
    
    // مسح السلة وتحديث الواجهة
    shoppingCart.length = 0; 
    updateCartUI();
}

// 💡 4. دالة لتحديث واجهة المستخدم الخاصة بعربة التسوق
function updateCartUI() {
    const cartSummary = document.getElementById('cartSummary');
    const itemCount = shoppingCart.length;

    if (itemCount === 0) {
        cartSummary.innerHTML = '<h3>🛒 السلة فارغة</h3>';
        return; 
    }

    // حساب الإجمالي الأساسي
    const baseTotal = shoppingCart.reduce((total, item) => total + item.price, 0); 
    
    // الحفاظ على حالة التحديد والقيمة عند إعادة بناء DOM
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

    // توليد قائمة الأصناف في السلة
    let cartItemsHTML = shoppingCart.map(item => `
        <p style="border-bottom: 1px dotted #555; padding-bottom: 5px; font-size: 14px;">
            ${item.name} - ${item.price} ريال
        </p>
    `).join('');

    // الحصول على قيمة حقل الموقع السابق للحفاظ عليها
    const existingLocationInput = document.getElementById('locationInput');
    const existingLocationValue = existingLocationInput ? existingLocationInput.value : '';

    // حقن محتوى السلة مع الخيارات
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
    
    // إعادة ربط مستمعات الأحداث بعد إعادة بناء DOM
    document.querySelectorAll('input[name="orderOption"]').forEach(input => {
        input.addEventListener('change', updateCartUI);
    });
    
    document.getElementById('submitOrderBtn').addEventListener('click', submitOrder);
}


// 💡 5. دالة التعامل مع فتح تفاصيل الصنف وحقن المحتوى
function openItemOptions(item) {
    const modal = document.getElementById('itemModal');
    const modalContent = document.getElementById('modalContent');

    // توليد معلومات الرز الشرطية
    const riceInfo = item.rice
      ? `<p class="modal-extra" style="color:#bbb;">يأتي مع: ${item.rice}</p>`
      : '';

    // توليد قائمة الإضافات الشرطية
    const extrasInfo = item.extras
      ? `
        <h4 style="color:gold; border-top: 1px solid #333; padding-top: 10px; margin-top: 10px;">إضافات اختيارية:</h4>
        ${item.extras.map(extra => {
            return `<p class="modal-extra-option" style="font-size:15px;">${extra.name} (+${extra.add} ريال)</p>`;
          }).join('')}
        `
      : '';

    // دمج كل المحتوى، وإعادة تعريف زر الإغلاق لضمان ظهوره
    const itemDetailsHTML = `
        <span id="closeModalBtn" class="close-btn" onclick="closeModal()">&times;</span> 
        <h2 style="color:gold; padding-bottom: 10px;">${item.name}</h2>
        <p style="font-size: 20px;">السعر: ${item.price} ريال</p>
        
        ${riceInfo}
        
        <div style="margin-top: 15px;">
        ${extrasInfo}
        </div>
        
        <button id="addToCartBtn" style="background-color: gold; color: #111; padding: 10px 20px; border: none; border-radius: 8px; margin-top: 20px; cursor: pointer;">
            إضافة للسلة
        </button>
    `;

    modalContent.innerHTML = itemDetailsHTML;
    modal.style.display = 'block';
    
    // ربط زر الإضافة للسلة بالمنطق
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        shoppingCart.push(item);
        updateCartUI(); 
        closeModal();
    });
}

// 💡 6. تهيئة القائمة وبناء الهيكل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("menuSections");

    // نستخدم updateCartUI مرة واحدة لتهيئة عرض السلة عند تحميل الصفحة
    updateCartUI(); 

    menuData.forEach(sec => {
      const group = document.createElement("div");
      group.classList.add('item-grid-container'); 
      group.innerHTML = `<h2 style='color:gold;border-bottom:1px solid gold;padding-bottom:5px; margin-top: 30px;'>${sec.section}</h2>`;

      sec.items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        
        // واجهة مبسطة للعرض الأولي
        card.innerHTML = `
          <h3>${item.name}</h3>
          <p>السعر: ${item.price} ريال</p>
        `;
        
        // إضافة مستمع لحدث النقر لفتح النافذة المنبثقة
        card.addEventListener('click', () => {
            openItemOptions(item); 
        });

        group.appendChild(card);
      });

      container.appendChild(group);
    });
});
