// File: menuRenderer.js (منطق العرض - مصحح)

/**
 * دالة إنشاء وعرض بطاقات المنيو على الصفحة.
 * @param {Array<Object>} menuData - بيانات المنيو.
 * @param {string} currentBranchId - مُعرف الفرع الحالي.
 */
export function renderMenu(menuData, currentBranchId) {
    // ⭐️ التصحيح: تغيير 'mainContent' إلى 'menuList'
    const mainContent = document.getElementById('menuList'); 
    if (!mainContent) return;

    mainContent.innerHTML = ''; 

    // 💡 ملاحظة: يجب أن تكون دالة window.showModal مُعرفة في Script.js
    if (typeof window.showModal !== 'function') {
        console.error("Critical Error: window.showModal function is missing in Script.js.");
        return;
    }

    // حلقة لتوليد أقسام المنيو
    menuData.forEach(section => {
        // التحقق من توافر القسم في الفرع الحالي
        if (section.sectionAvailableIn && !section.sectionAvailableIn.includes(currentBranchId)) {
            return; // تخطي القسم غير المتوفر
        }

        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'section-header';
        sectionHeader.innerHTML = `<h2>${section.section}</h2>`;
        mainContent.appendChild(sectionHeader);

        const sectionContent = document.createElement('div');
        sectionContent.className = 'section-content';

        // حلقة لتوليد بطاقات المنتجات
        section.items.forEach(item => {
            // التحقق من توافر المنتج في الفرع الحالي
            if (!item.availableIn.includes(currentBranchId)) {
                return; // تخطي المنتج غير المتوفر
            }
            
            // تحديد السعر المعروض (مع تطبيق الخصم إذا وجد)
            let displayPrice = item.basePrice;
            let priceText = `${displayPrice.toFixed(2)} ريال`;
            
            if (item.branchDiscounts && item.branchDiscounts[currentBranchId]) {
                displayPrice = item.branchDiscounts[currentBranchId];
                priceText = `<span class="old-price">${item.basePrice.toFixed(2)}</span> ${displayPrice.toFixed(2)} ريال`;
            }

            const itemCard = document.createElement('div');
            itemCard.className = 'menu-item-card';
            itemCard.setAttribute('data-item-id', item.id);
            itemCard.innerHTML = `
                <img src="${item.img}" alt="${item.name}" loading="lazy">
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    ${item.isBestSeller ? '<span class="best-seller">الأكثر مبيعاً 🌟</span>' : ''}
                    <p class="item-price">${priceText}</p>
                </div>
                <button class="add-to-cart-btn" data-item-id="${item.id}" data-section-index="${menuData.indexOf(section)}" data-item-index="${section.items.indexOf(item)}">
                    + إضافة
                </button>
            `;
            
            // ربط زر الإضافة بدالة showModal الموجودة في Script.js
            const addButton = itemCard.querySelector('.add-to-cart-btn');
            addButton.addEventListener('click', (e) => {
                const sectionIndex = parseInt(e.currentTarget.getAttribute('data-section-index'));
                const itemIndex = parseInt(e.currentTarget.getAttribute('data-item-index'));
                const itemData = menuData[sectionIndex].items[itemIndex];
                window.showModal(itemData, menuData.indexOf(section));
            });

            sectionContent.appendChild(itemCard);
        });

        mainContent.appendChild(sectionContent);
    });
}
