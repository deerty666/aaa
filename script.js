// مصفوفة لتخزين الأصناف التي يضيفها المستخدم للسلة
let shoppingCart = [];

// ==========================================================
// 💡 دوال التحكم بالسلة
// ==========================================================

function clearCart() {
    shoppingCart.length = 0;
    updateCartUI(); 
}

function deleteItem(itemName) {
    const itemIndex = shoppingCart.findIndex(item => item.name === itemName);

    if (itemIndex > -1) {
        shoppingCart.splice(itemIndex, 1);
    }
    updateCartUI();
}

function changeItemQuantity(itemName, delta) {
    const itemIndex = shoppingCart.findIndex(item => item.name === itemName);

    if (itemIndex > -1) {
        shoppingCart[itemIndex].quantity += delta;

        if (shoppingCart[itemIndex].quantity <= 0) {
            shoppingCart.splice(itemIndex, 1);
        }
    }
    updateCartUI();
}

// ==========================================================
// 🗺️ تكامل Google Maps API
// ==========================================================

function initAutocomplete() {
    const locationInput = document.getElementById('locationInput');
    
    if (locationInput) {
        const autocomplete = new google.maps.places.Autocomplete(locationInput, {
            types: ['address'], 
            componentRestrictions: {'country': 'sa'} 
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            
            if (place.geometry) {
                locationInput.value = place.formatted_address; 
            }
        });
    }
}


// ==========================================================
// 🛒 تحديث واجهة السلة
// ==========================================================

function updateCartUI() {
    const cartSummary = document.getElementById('cartSummary');
    
    const baseTotal = shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 15; 
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

        <p style="border-top: 1px dashed #555; padding-top: 5px;">الإجمالي الأساسي: ${baseTotal.toFixed(2)} ريال</p>
        <p>رسوم التوصيل: ${deliveryFee.toFixed(2)} ريال</p>
        <h4 style="color: #ffc107;">الإجمالي النهائي: ${finalTotal.toFixed(2)} ريال</h4>

        <button onclick="sendWhatsAppOrder()">إرسال الطلب عبر WhatsApp</button>
    `;
    
    if (typeof initAutocomplete === 'function') {
        initAutocomplete();
    }
}


// ==========================================================
// ⚙️ وظائف إضافية (محدثة بالبحث المتداخل)
// ==========================================================

function renderMenu() {
    const menuContainer = document.getElementById('menuContainer');
    
    // التكرار الخارجي: على كل قسم (sectionObj) في مصفوفة menuData
    const fullMenuHTML = menuData.map(sectionObj => {
        
        const sectionName = sectionObj.section;
        const itemsArray = sectionObj.items;
        
        // التكرار الداخلي: على كل صنف (item) داخل مصفوفة itemsArray
        const itemsHTML = itemsArray.map(item => `
            <div class="item-card" onclick="openItemOptions('${item.name.replace(/'/g, "\\'")}')">
                <img src="${item.imageURL || 'images/placeholder.jpg'}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; margin-left: 10px;">
                <div style="flex-grow: 1;">
                    <h3>${item.name}</h3>
                    <p style="font-size: 14px; color: #aaa;">${item.description || ''}</p>
                    <p>السعر: <strong>${item.price}</strong> ريال / الأرز المقترح: ${item.rice || 'لا يوجد'}</p>
                </div>
            </div>
        `).join('');
        
        // دمج عنوان القسم وبطاقات الأصناف
        return `
            <h2 style="color: #ffc107; border-bottom: 2px solid #333; padding-bottom: 5px; margin-top: 30px;">${sectionName}</h2>
            <div class="menu-container">
                ${itemsHTML}
            </div>
        `;
    }).join('');

    menuContainer.innerHTML = fullMenuHTML;
}

function openItemOptions(itemName) {
    // 💡 تسطيح المصفوفة والبحث عن الصنف في جميع الأقسام
    const allItems = menuData.flatMap(section => section.items);
    const item = allItems.find(i => i.name === itemName);

    if (!item) return;

    const modal = document.getElementById('itemModal');
    const modalContent = document.getElementById('modalContent');
    
    // توليد خيارات الأرز الإضافية ديناميكياً
    const dynamicExtrasHTML = item.extras ? item.extras.map(extra => `
        <label><input type="radio" name="rice_option" value="${extra.name}" data-add-price="${extra.add}"> ${extra.name} (+${extra.add} ريال)</label><br>
    `).join('') : '';

    // محتوى النافذة المنبثقة
    modalContent.innerHTML = `
        <h3>${item.name}</h3>
        <p style="color: #ffc107;">${item.description || ''}</p>
        <p>السعر الأساسي: ${item.price} ريال</p>
        
        <h4>اختر نوع الأرز:</h4>
        <div onchange="updateModalPrice('${item.name}')">
            <label><input type="radio" name="rice_option" value="${item.rice || 'بدون أرز'}" data-add-price="0" checked> ${item.rice || 'بدون أرز'} (مجاني)</label><br>
            
            ${dynamicExtrasHTML}
            
            <label><input type="radio" name="rice_option" value="بدون أرز" data-add-price="0"> بدون أرز (مجاني)</label>
        </div>
        
        <h4>إضافات اختيارية:</h4>
        <div onchange="updateModalPrice('${item.name}')">
            <label><input type="checkbox" name="optional_extra" value="إضافة كاتشب" data-add-price="3"> كاتشب (+3 ريال)</label><br>
            <label><input type="checkbox" name="optional_extra" value="إضافة سلطة خضراء" data-add-price="3"> سلطة خضراء (+3 ريال)</label><br>
        </div>
        
        <h4>الكمية:</h4>
        <input type="number" id="quantityInput" value="1" min="1" 
               oninput="updateModalPrice('${item.name}')" 
               style="width: 100px; padding: 5px; margin-bottom: 15px; background-color: #333; color: white; border: 1px solid #555;">
               
        <p>الإجمالي للصنف الواحد: <strong id="currentTotal">${item.price}</strong> ريال</p>
        <button id="addToCartBtn" style="background-color: #ffc107; color: #121212;">أضف إلى السلة</button>
    `;
    
    modal.style.display = 'block';
    
    // ربط زر الإضافة للسلة بالمنطق المخصص (المحدث)
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        // 1. قراءة الكمية المطلوبة وسعر القطعة
        const quantityInput = document.getElementById('quantityInput');
        const quantity = Math.max(1, parseInt(quantityInput.value) || 1);
        
        const currentTotalText = document.getElementById('currentTotal').textContent;
        const finalPricePerItem = parseFloat(currentTotalText) / quantity; 

        // 2. بناء اسم الصنف المخصص (مفتاح البحث الفريد)
        const selectedRiceOption = document.querySelector('input[name="rice_option"]:checked');
        const selectedRiceName = selectedRiceOption ? selectedRiceOption.value : item.rice || 'بدون أرز';
        const riceAddPrice = selectedRiceOption ? parseFloat(selectedRiceOption.dataset.addPrice) || 0 : 0;
        
        let extrasList = [];
        document.querySelectorAll('input[name="optional_extra"]:checked').forEach(checkbox => {
            const extraPrice = parseFloat(checkbox.dataset.addPrice) || 0;
            extrasList.push(`${checkbox.value.replace('إضافة ', '')} (+${extraPrice} ريال)`);
        });
        
        // بناء جملة الأرز والإضافات التفصيلية
        const riceDetail = `${selectedRiceName}${riceAddPrice > 0 ? ` (+${riceAddPrice} ريال)` : ''}`;
        const extrasString = extrasList.length > 0 ? ` | إضافات: ${extrasList.join(', ')}` : '';
        
        const customName = `${item.name} (الأرز: ${riceDetail})${extrasString}`;

        // 3. البحث في السلة: هل يوجد صنف بنفس الاسم والسعر؟ 
        const existingItemIndex = shoppingCart.findIndex(cartItem => 
            cartItem.name === customName && cartItem.price === finalPricePerItem
        );

        if (existingItemIndex > -1) {
            shoppingCart[existingItemIndex].quantity += quantity;
        } else {
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
    
    updateModalPrice(itemName);
}

function updateModalPrice(itemName) {
    // 1. تسطيح المصفوفة والبحث عن الصنف أولاً
    const allItems = menuData.flatMap(section => section.items);
    const item = allItems.find(i => i.name === itemName);
    if (!item) return;

    const quantityInput = document.getElementById('quantityInput');
    const totalElement = document.getElementById('currentTotal');

    const quantity = Math.max(1, parseInt(quantityInput ? quantityInput.value : 1) || 1);

    // 2. نبدأ بالسعر الأساسي للصنف
    let price = item.price;

    // 3. حساب الأرز: نقرأ data-add-price من الراديو المختار
    const selectedRiceOption = document.querySelector('input[name="rice_option"]:checked');
    if (selectedRiceOption) {
        const riceAddPrice = parseFloat(selectedRiceOption.dataset.addPrice) || 0;
        price += riceAddPrice;
    }

    // 4. حساب الإضافات الأخرى: نقرأ data-add-price من كل مربع مختار
    document.querySelectorAll('input[name="optional_extra"]:checked').forEach(checkbox => {
        const extraAddPrice = parseFloat(checkbox.dataset.addPrice) || 0;
        price += extraAddPrice;
    });

    // 5. السعر النهائي للكمية المختارة
    const finalTotal = price * quantity;
    
    totalElement.textContent = finalTotal.toFixed(2);
}

function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

function sendWhatsAppOrder() {
    // نضمن قراءة القيمة بعد تحديثها بالإكمال التلقائي
    const location = document.getElementById('locationInput').value || 'لم يتم تحديد موقع'; 
    const notes = document.getElementById('notesInput').value || 'لا توجد ملاحظات';
    
    // قراءة الإجمالي النهائي بدقة من عنصر h4
    const finalTotalText = document.getElementById('cartSummary').querySelector('h4').textContent;
    const finalTotal = parseFloat(finalTotalText.replace(/[^\d.]/g, '')) || 0;
    
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

    const encodedMessage = encodeURIComponent(message.trim());
    const phoneNumber = '966555555555'; 

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartUI();
});
