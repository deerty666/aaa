/* ====== بيانات الفروع - يرجى تعديل أرقام الواتساب والأسماء حسب الرغبة ====== */
const BRANCH_CONFIG = {
    'branch1': { 
        whatsapp: '966536803598', // ⭐️ رقم واتساب فرع الرياض (كمثال)
        name: 'لبن الاحمدية', // اسم الفرع في الرسائل وعنوان الصفحة
        deliveryFee: 5,
    },
    'branch2': {
        whatsapp: '9665XXXXXXXX2', // ⚠️ يرجى تغيير رقم الواتساب لفرع شمال الرياض
        name: 'شمال الرياض مخرج ٦', 
        deliveryFee: 5, 
    },
    'branch3': {
        whatsapp: '9665XXXXXXXX3', // ⚠️ يرجى تغيير رقم الواتساب لفرع الروضة
        name: 'الروضه خالد بن الوليد ', 
        deliveryFee: 5,
    }
};

/* ====== متغير لتحديد الفرع الحالي من الرابط ====== */
let currentBranchId = 'branch1'; // القيمة الافتراضية
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('branch')) {
    currentBranchId = urlParams.get('branch');
}
const currentBranch = BRANCH_CONFIG[currentBranchId] || BRANCH_CONFIG['branch1'];
document.title = `قائمة سحايب ديرتي - فرع ${currentBranch.name}`; // تحديث عنوان الصفحة باسم الفرع

/* ====== بيانات المنيو - تم تحديث جميع مسارات الصور إلى صيغة WEBP وباسم قصير ====== */
const menuData = [
    // 1. القسم الجديد: الكل
    { 
        section:"الكل", 
        sectionImg: "logo-bg.webp", // 🔄 مسار نسبي
        items:[] 
    },
    { 
        section:"الشوايه", 
        sectionImg: "sh00.webp", // 🔄 مسار نسبي
        items:[
            // الوجبة 1
            {id:"sh1", img:"sh00.webp", name:"حبة شواية", basePrice:46, availableIn: ['branch1','branch2', 'branch3'], options:[ 
                {name:"رز شعبي", price:0},
                {name:"رز بشاور", price:4},
                {name:"رز مندي", price:4},
                {name:"رز مثلوثه", price:4}
            ]},
            // الوجبة 2: تم تغيير اسمها
            {id:"sh2", img:"sh00.webp", name:"نص شواية بالرز", basePrice:24, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"رز شعبي", price:0},
                {name:"رز بشاور", price:1},
                {name:"رز مندي", price:1},
                {name:"رز مثلوثه", price:1}
            ]},
            // الوجبة 3: نص شواية سادة
            {id:"sh3", img:"sh10.webp", name:"ربع دجاج ",
             basePrice:13,
             isBestSeller: true,
             availableIn: ['branch1', 'branch2', 'branch3'], options:[
               {name:"شوايه", price:0},
               {name:"مندي", price:0}  
            ]},
            // الوجبة 4: العرض الاقتصادي الجديد
            {
                id:"sh4", 
                img:"sh20.webp", 
                name:"نصف دجاج (ساده بدون رز شوايه آو مضبي آو مندي)", 
                basePrice:15, 
                isBestSeller: true, 
                availableIn: ['branch1', 'branch2', 'branch3'], 
                options:[
                    {name:"شوايه", price:0},
                    {name:"مظبي", price:0},
                    {name:"مندي", price:0}
                ]
            }
        ]
    },
    { 
        section:"المظبي", 
        sectionImg: "md00.webp", // 🔄 مسار نسبي
        items:[
            // الوجبة 1
            {id:"md1", img:"md00.webp", name:" حبة مظبي", basePrice:46, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"رز شعبي", price:0},
                {name:"رز بشاور", price:4},
                {name:"رز مندي", price:4},
                {name:"رز مثلوثه", price:4}
            ]},
            // الوجبة 2
            {id:"md2", img:"md00.webp", name:"نص مظبي", basePrice:24, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"رز شعبي", price:0},
                {name:"رز بشاور", price:1},
                {name:"رز مندي", price:1},
                {name:"رز مثلوثه", price:1}
            ]}
        ]
    },
    { 
        section:"مندي", 
        sectionImg: "mn00.webp", // 🔄 مسار نسبي
        items:[
            // الوجبة 1
            {id:"mn1", img:"mn00.webp", name:" حبه مندي", basePrice:46, availableIn: ['branch1','branch2', 'branch3'], options:[ 
                {name:"رز شعبي", price:0},
                {name:"رز بشاور", price:4},
                {name:"رز مندي", price:4},
                {name:"رز مثلوثه", price:4}
            ]},
            // الوجبة 2
            {id:"mn2", img:"mn00.webp", name:"نص مندي", basePrice:24, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"رز شعبي", price:0},
                {name:"رز بشاور", price:1},
                {name:"رز مندي", price:1},
                {name:"رز مثلوثه", price:1}
            ]}
        ]
    },
    { 
        section:"حبه مدفون", 
        sectionImg: "mf00.webp", // 🔄 مسار نسبي
        items:[
            // الوجبة 1
            {id:"mdf1", img:"mf01.webp", name:"مدفون حبه كامل", basePrice:46, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"رز شعبي", price:0},
                {name:"رز بشاور", price:4},
                {name:"رز مندي", price:4},
                {name:"رز مثلوثه", price:4}
            ]},
            // الوجبة 2
            {id:"mdf2", img:"mf00.webp", name:"نص مدفون", basePrice:24, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"رز شعبي", price:0},
                {name:"رز بشاور", price:1},
                {name:"رز مندي", price:1},
                {name:"رز مثلوثه", price:1}
            ]}
        ]
    },
    { 
        section:"مقلوبه", 
        sectionImg: "mq00.webp", // 🔄 مسار نسبي
        items:[
            // الوجبة 1
            {id:"mq1", img:"mq00.webp", name:" حبه مقلوبه ", basePrice:50, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز شعبي", price:0}]},
            // الوجبة 2
            {id:"mq2", img:"mq00.webp", name:"نص دجاج مقلوبه", basePrice:25, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز شعبي", price:0}]}
        ]
    },
    { 
        section:"مضغوط", 
        sectionImg: "mg00.webp", // 🔄 مسار نسبي
        items:[
            // الوجبة 1
            {
                id:"mg1", 
                img:"mg00.webp", 
                name:"حبه دجاج مضغوط ", 
                basePrice:50, 
                isBestSeller: true, 
                availableIn: ['branch1', 'branch2', 'branch3'], 
                options:[{name:"رز مضغوط", price:0}]
            }, 
            // الوجبة 2
            {id:"mg2", img:"mg00.webp", name:"نص حبه مضغوط", basePrice:25, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز مضغوط", price:0}]}
        ]
    },
    { 
        section:"زربيان", 
        sectionImg: "zb00.webp", // 🔄 مسار نسبي
        items:[
            // الوجبة 1
            {id:"zb1", img:"zb00.webp", name:"دجاج زربيان حبه", basePrice:50, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز زربيان", price:0}]},
            // الوجبة 2
            {id:"zb2", img:"zb00.webp", name:"نص حبه زربيان", basePrice:25, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز زربيان", price:0}]}
        ]
    },
    { 
        section:"قسم اللحوم", 
        sectionImg: "me00.webp", // 🔄 مسار نسبي
        items:[
            // الوجبة 1
            {
                id:"t1", 
                img:"me01.webp", 
                name:"تيس مندي كامل", 
                basePrice:1550, 
                isAvailable: true, 
                availableIn: ['branch1', 'branch2', 'branch3'], 
                options:[ 
                    {name:"رز شعبي", price:0},
                    {name:"رز بشاور", price:50},
                    {name:"رز مندي", price:50}
                ]
            },
            // الوجبة 2
            {id:"t2", img:"me02.webp", name:"نص تيس مندي", basePrice:750, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"رز شعبي", price:0},
                {name:"رز بشاور", price:25},
                {name:"رز مندي", price:25}
            ]},
            // الوجبة 3
            {id:"t3", img:"me03.webp", name:"ربع تيس مندي", basePrice:375, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"رز شعبي", price:0},
                {name:"رز بشاور", price:13},
                {name:"رز مندي", price:13}
            ]},
            // الوجبة 4
            {id:"t4", img:"me04.webp", name:"نفر لحم مندي", basePrice:85, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"رز شعبي", price:0},
                {name:"رز بشاور", price:5},
                {name:"رز مندي", price:5}
            ]},
            // الوجبة 5 (حاشي مكموت - خصم)
            {
                id:"t5", 
                img:"me05.webp", 
                name:"نفر حاشي مكموت", 
                basePrice:59, 
                isBestSeller: true, 
                branchDiscounts: { 
                    'branch1': 50,
                    'branch2': 50,
                    'branch3': 50
                },
                availableIn: ['branch1', 'branch2', 'branch3'],
                options: [
                    { name: "رز شعبي", price: 0 },
                    { name: "رز بشاور", price: 3 }, 
                    { name: "رز مندي", price: 3 }
                ]
            },
            // الوجبة 6 (برمه لحم - خصم وأكثر مبيعاً)
            {
                id:"t6",
                img:"me06.webp", 
                name:"نفر برمه لحم هرفي مع المرق",
                basePrice:80, 
                isBestSeller: true, 
                branchDiscounts: { 
                    'branch1': 68,
                    'branch2': 68,
                    'branch3': 68
                },
                availableIn: ['branch1', 'branch2', 'branch3'],
                options:[
                    { name: "رز شعبي", price: 0 },
                    { name: "رز بشاور", price: 0 },
                    { name: "رز مندي", price: 0 }
                ]
            }
        ]
    },
    { 
        section:"المشويات", 
        sectionImg: "gr00.webp", // 🔄 مسار نسبي
        // تم تحديد توافر قسم المشويات لفرع الرياض (branch1) فقط
        sectionAvailableIn: ['branch1'], 
        items:[
            // الوجبة 1
            {
                id:"gr1",
                img:"gr01.webp", // 🔄 مسار نسبي
                name:"كباب لحم",
                basePrice:38,
                availableIn: ['branch1'], // مقيد بـ branch1
                options:[
                    {name:"نفر", price:0},
                    {name:"نص كيلو", price:38},
                    {name:"كيلو", price:112}
                ]
            },
            // الوجبة 2
            {
                id:"gr2",
                img:"gr02.webp", // 🔄 مسار نسبي
                name:"كباب دجاج",
                basePrice:30,
                availableIn: ['branch1'], // مقيد بـ branch1
                options:[
                    {name:"نفر", price:0},
                    {name:"نص كيلو", price:30},
                    {name:"كيلو", price:90}
                ]
            },
            // الوجبة 3
            {
                id:"gr3",
                img:"gr03.webp", // 🔄 مسار نسبي
                name:"اوصال لحم",
                basePrice:45,
                availableIn: ['branch1'], // مقيد بـ branch1
                options:[
                    {name:"نفر", price:0},
                    {name:"نص كيلو", price:45},
                    {name:"كيلو", price:135}
                ]
            },
            // الوجبة 4
            {
                id:"gr4",
                img:"gr04.webp", // 🔄 مسار نسبي
                name:"شيش طاووق",
                basePrice:30,
                availableIn: ['branch1'], // مقيد بـ branch1
                options:[
                    {name:"نفر", price:0},
                    {name:"نص كيلو", price:30},
                    {name:"كيلو", price:90}
                ]
            }
        ]
    },
    { 
        section:"الأرز والاضافات", 
        sectionImg: "ex00.webp", // 🔄 مسار نسبي
        items:[
            {id:"ex1", img:"ex01.webp", name:"حبة رز بشاور إضافي", basePrice:18, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex2", img:"ex02.webp", name:"حبة رز مندي إضافي", basePrice:18, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex3", img:"ex03.webp", name:"حبة رز مثلوثه إضافي", basePrice:18, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex4", img:"ex04.webp", name:"مكرونه إضافي", basePrice:18, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex5", img:"ex05.webp", name:"نص رز بشاور إضافي", basePrice:9, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex6", img:"ex06.webp", name:"نص رز مندي إضافي", basePrice:9, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex7", img:"ex07.webp", name:"نص رز مثلوثه إضافي", basePrice:9, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex8", img:"ex08.webp", name:"نص مكرونه إضافي", basePrice:9, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex9", img:"ex09.webp", name:"صحن إضافي", basePrice:3, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex10", img:"ex10.webp", name:"حبة بيبسي", basePrice:4, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex11", img:"ex11.webp", name:"حبة ميرندا", basePrice:4, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex12", img:"ex12.webp", name:"حبة سفن", basePrice:4, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex13", img:"ex13.webp", name:"حبة ديو", basePrice:4, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex14", img:"ex14.webp", name:"موية", basePrice:2, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex15", img:"ex15.webp", name:"سلطة حارة (دقوس)", basePrice:2, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex16", img:"ex16.webp", name:"سلطة زبادي", basePrice:4, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex17", img:"ex17.webp", name:"سلطة طحينة", basePrice:4, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex18", img:"ex18.webp", name:"سلطة خضراء", basePrice:8, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex19", img:"ex19.webp", name:"تبولة", basePrice:8, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex20", img:"ex20.webp", name:"متبل", basePrice:8, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex21", img:"ex21.webp", name:"بابا غنوج", basePrice:8, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex22", img:"ex22.webp", name:"فتوش", basePrice:8, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex23", img:"ex23.webp", name:"حمص", basePrice:8, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"ex24", img:"ex24.webp", name:"باذنجان", basePrice:8, availableIn: ['branch1', 'branch2', 'branch3']}
        ]
    },
    { 
        section:"الحلى", 
        sectionImg: "kn00.webp", // 🔄 مسار نسبي
        sectionAvailableIn: ['branch1', 'branch2', 'branch3'],
        items:[
            {id:"kn1", img:"kn01.webp", name:"صحن كنافة", basePrice:18, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"kn2", img:"kn02.webp", name:"كنافة بالقشطة", basePrice:18, availableIn: ['branch1', 'branch2', 'branch3']},
            {id:"kn3", img:"kn03.webp", name:"كنافة بالنوتيلا", basePrice:18, availableIn: ['branch1', 'branch2', 'branch3']}
        ]
    }
];


/* ====== دوال تحميل المنيو والسلة والواتساب ... ====== */

const menuContainer = document.getElementById('menuContainer');
const cartSidebar = document.getElementById('cartSidebar');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const totalBreakdown = document.getElementById('totalBreakdown');
const clearCartBtn = document.getElementById('clearCart');
const sendWhatsappBtn = document.getElementById('sendWhatsapp');
const searchInput = document.getElementById('searchInput');
const scrollToTopBtn = document.getElementById('scrollToTop');
const deliveryOptionSelect = document.getElementById('deliveryOption');
const addressLabel = document.getElementById('addressLabel');
const deliveryAddress = document.getElementById('deliveryAddress');

// Modal Elements
const optionModal = document.getElementById('optionModal');
const modalTitle = document.getElementById('modalTitle');
const modalOptions = document.getElementById('modalOptions');
const modalConfirm = document.getElementById('modalConfirm');
const itemNote = document.getElementById('itemNote');


let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedItem = null;

// ===========================================
// 1. دوال تحميل الواجهة
// ===========================================

function renderMenu() {
    menuContainer.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // فلترة بيانات المنيو حسب الفرع المحدد
    const filteredMenuData = menuData.map(section => {
        // التحقق من توافر القسم في الفرع الحالي (إذا كان محددًا)
        const isSectionAvailable = !section.sectionAvailableIn || section.sectionAvailableIn.includes(currentBranchId);
        
        // فلترة الوجبات داخل القسم
        const filteredItems = section.items.filter(item => {
            const isItemAvailable = item.availableIn.includes(currentBranchId);
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) || section.section.toLowerCase().includes(searchTerm);
            return isItemAvailable && matchesSearch;
        });

        // إرجاع القسم مع الوجبات المفلترة، أو إرجاع القسم كاملاً إذا لم يتم تطبيقه على الفرع الحالي
        return {
            ...section,
            items: filteredItems,
            isAvailable: isSectionAvailable
        };
    }).filter(section => section.isAvailable && (section.items.length > 0 || section.section === "الكل")); // إخفاء الأقسام الفارغة باستثناء "الكل"

    
    let allItems = []; // لتخزين جميع الوجبات لغرض فلترة "الكل"

    filteredMenuData.forEach(section => {
        if (section.section !== "الكل") {
            allItems.push(...section.items);
            
            // 1. إنشاء بطاقة القسم
            const sectionCard = document.createElement('div');
            sectionCard.className = 'section-card';
            sectionCard.id = `section-${section.section.replace(/\s/g, '')}`;
            
            const sectionHeader = document.createElement('h2');
            sectionHeader.innerHTML = `<img src="${section.sectionImg}" alt="${section.section}" loading="lazy" onerror="this.onerror=null;this.src='logo-bg.webp';"> ${section.section}`;
            sectionCard.appendChild(sectionHeader);

            // 2. إنشاء حاوية الوجبات
            const itemsGrid = document.createElement('div');
            itemsGrid.className = 'items-grid';
            
            section.items.forEach(item => {
                itemsGrid.appendChild(createItemCard(item));
            });

            sectionCard.appendChild(itemsGrid);
            menuContainer.appendChild(sectionCard);
        }
    });

    // معالجة قسم "الكل" بشكل خاص
    const allSection = filteredMenuData.find(s => s.section === "الكل");
    if (allSection) {
        allSection.items = allItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) || item.section.toLowerCase().includes(searchTerm);
            return matchesSearch;
        });
        
        if (allSection.items.length > 0 && searchTerm) { // إظهار قسم "الكل" فقط عند وجود بحث
            const sectionCard = document.createElement('div');
            sectionCard.className = 'section-card';
            sectionCard.id = `section-All`;
            
            const sectionHeader = document.createElement('h2');
            sectionHeader.innerHTML = `<img src="${allSection.sectionImg}" alt="${allSection.section}" loading="lazy" onerror="this.onerror=null;this.src='logo-bg.webp';"> نتائج البحث`;
            sectionCard.appendChild(sectionHeader);

            const itemsGrid = document.createElement('div');
            itemsGrid.className = 'items-grid';
            
            allSection.items.forEach(item => {
                itemsGrid.appendChild(createItemCard(item));
            });

            sectionCard.appendChild(itemsGrid);
            menuContainer.appendChild(sectionCard);
        }
    }
}

function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';

    // حساب السعر الحالي مع الخصم إن وجد
    let currentPrice = item.basePrice;
    let originalPrice = item.basePrice;
    let discount = 0;
    
    if (item.branchDiscounts && item.branchDiscounts[currentBranchId] !== undefined) {
        discount = item.branchDiscounts[currentBranchId];
        currentPrice = discount;
    }
    
    // تحديد السعر الأساسي للوجبة
    const basePriceText = (item.options && item.options.length > 0) ? 
        `يبدأ من ${currentPrice.toFixed(2)} ر.س` : 
        `${currentPrice.toFixed(2)} ر.س`;

    // صورة الوجبة
    const imgElement = document.createElement('img');
    imgElement.src = item.img;
    imgElement.alt = item.name;
    imgElement.loading = 'lazy';
    imgElement.onerror = function() { this.onerror = null; this.src = 'sh00.webp'; }; // صورة احتياطية
    card.appendChild(imgElement);

    // تفاصيل الوجبة
    const infoDiv = document.createElement('div');
    infoDiv.className = 'item-info';

    const title = document.createElement('h3');
    title.textContent = item.name;
    infoDiv.appendChild(title);

    const priceDiv = document.createElement('div');
    priceDiv.className = 'price-tag';
    
    if (discount > 0) {
        priceDiv.innerHTML = `
            <span class="discount-price">${currentPrice.toFixed(2)} ر.س</span>
            <span class="original-price">${originalPrice.toFixed(2)} ر.س</span>
        `;
    } else {
        priceDiv.textContent = basePriceText;
    }
    
    infoDiv.appendChild(priceDiv);
    
    // أيقونة الأفضل مبيعًا
    if (item.isBestSeller) {
        const bestSeller = document.createElement('span');
        bestSeller.className = 'badge best-seller';
        bestSeller.textContent = 'الأكثر مبيعاً 🏆';
        infoDiv.appendChild(bestSeller);
    }

    card.appendChild(infoDiv);

    // زر الإضافة
    const addButton = document.createElement('button');
    addButton.className = 'add-to-cart-btn';
    addButton.textContent = 'أضف للسلة';
    addButton.onclick = (e) => {
        e.stopPropagation(); // منع فتح المودال عند النقر على الزر
        if (item.options && item.options.length > 0) {
            openModal(item, imgElement);
        } else {
            addToCart({
                id: item.id,
                name: item.name,
                price: currentPrice,
                option: null,
                note: '',
                quantity: 1,
                img: item.img
            });
            flyToCart(imgElement);
        }
    };
    card.appendChild(addButton);
    
    // لفتح المودال عند النقر على أي مكان في البطاقة (إذا كانت تحتوي على خيارات)
    card.onclick = () => {
        if (item.options && item.options.length > 0) {
            openModal(item, imgElement);
        }
    };

    return card;
}

function openModal(item, imgElement) {
    selectedItem = item;
    modalTitle.textContent = `اختيار صنف ${item.name}`;
    modalOptions.innerHTML = '';
    itemNote.value = ''; // مسح الملاحظات القديمة

    // حساب السعر الأساسي بعد الخصم
    let basePriceAfterDiscount = item.basePrice;
     if (item.branchDiscounts && item.branchDiscounts[currentBranchId] !== undefined) {
        basePriceAfterDiscount = item.branchDiscounts[currentBranchId];
    }
    
    item.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-choice';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'itemOption';
        input.id = `option-${index}`;
        input.value = option.name;
        input.dataset.price = option.price;
        
        // تعيين الخيار الأول كافتراضي
        if (index === 0) {
            input.checked = true;
        }

        const label = document.createElement('label');
        label.htmlFor = `option-${index}`;
        
        let priceText = option.price > 0 ? `+${option.price.toFixed(2)} ر.س` : '(أساسي)';
        label.innerHTML = `<span>${option.name}</span> <span class="option-price">${priceText}</span>`;
        
        optionDiv.appendChild(input);
        optionDiv.appendChild(label);
        modalOptions.appendChild(optionDiv);
    });

    // تحديث زر التأكيد لعرض السعر الإجمالي
    function updateConfirmButton() {
        const selectedOption = document.querySelector('input[name="itemOption"]:checked');
        if (selectedOption) {
            const optionPrice = parseFloat(selectedOption.dataset.price) || 0;
            const totalPrice = basePriceAfterDiscount + optionPrice;
            modalConfirm.textContent = `أضف للسلة (${totalPrice.toFixed(2)} ر.س)`;
        }
    }

    // تحديث السعر عند تغيير الخيار
    modalOptions.addEventListener('change', updateConfirmButton);
    
    // تعيين وظيفة التأكيد
    modalConfirm.onclick = () => {
        const selectedOption = document.querySelector('input[name="itemOption"]:checked');
        if (!selectedOption) return;

        const optionPrice = parseFloat(selectedOption.dataset.price) || 0;
        const totalPrice = basePriceAfterDiscount + optionPrice;
        
        addToCart({
            id: selectedItem.id,
            name: selectedItem.name,
            price: totalPrice,
            option: selectedOption.value,
            note: itemNote.value.trim(),
            quantity: 1,
            img: selectedItem.img
        });
        
        // إغلاق المودال وتفعيل تأثير الحركة
        closeModal();
        // إرسال صورة الوجبة إلى دالة الحركة
        const itemCard = document.querySelector(`.item-card img[src='${selectedItem.img}']`);
        if (itemCard) {
            flyToCart(itemCard);
        }
    };
    
    // تحديث السعر الافتراضي عند الفتح
    updateConfirmButton();

    optionModal.style.display = 'flex';
}

function closeModal() {
    optionModal.style.display = 'none';
    selectedItem = null;
}

// ===========================================
// 2. دوال السلة (Cart Logic)
// ===========================================

function addToCart(item) {
    const existingItem = cart.find(cartItem => 
        cartItem.id === item.id && 
        cartItem.option === item.option &&
        cartItem.note === item.note
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }
    
    saveCart();
    renderCart();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // إزالة العنصر إذا كانت الكمية صفر أو أقل
    }
    saveCart();
    renderCart();
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">سلتك فارغة حالياً.</p>';
        cartCount.style.display = 'none';
        totalBreakdown.innerHTML = `
            <div class="total-row">
                <span>الإجمالي:</span> 
                <span class="total-price">0.00 ر.س</span>
            </div>
        `;
        return;
    }

    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'cart-item-details';
        detailsDiv.innerHTML = `
            <h4>${item.name}</h4>
            <p>${item.option || ''} ${item.note ? `(ملاحظة: ${item.note})` : ''}</p>
            <span>${item.price.toFixed(2)} ر.س × ${item.quantity} = ${(itemTotal).toFixed(2)} ر.س</span>
        `;
        
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'cart-item-controls';
        
        const minusBtn = document.createElement('button');
        minusBtn.textContent = '-';
        minusBtn.onclick = () => updateQuantity(index, -1);
        
        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = item.quantity;
        
        const plusBtn = document.createElement('button');
        plusBtn.textContent = '+';
        plusBtn.onclick = () => updateQuantity(index, 1);
        
        controlsDiv.appendChild(minusBtn);
        controlsDiv.appendChild(quantitySpan);
        controlsDiv.appendChild(plusBtn);
        
        cartItemDiv.appendChild(detailsDiv);
        cartItemDiv.appendChild(controlsDiv);
        cartItemsContainer.appendChild(cartItemDiv);
    });

    const deliveryFee = deliveryOptionSelect.value === 'delivery' ? currentBranch.deliveryFee : 0;
    const finalTotal = subtotal + deliveryFee;

    // تحديث ملخص الفاتورة
    totalBreakdown.innerHTML = `
        <div class="total-row">
            <span>المجموع الفرعي:</span> 
            <span>${subtotal.toFixed(2)} ر.س</span>
        </div>
        <div class="total-row">
            <span>رسوم التوصيل:</span> 
            <span>${deliveryFee.toFixed(2)} ر.س</span>
        </div>
        <div class="total-row final-total">
            <span>الإجمالي:</span> 
            <span class="total-price">${finalTotal.toFixed(2)} ر.س</span>
        </div>
    `;

    // تحديث عدد العناصر في زر السلة
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = 'inline-block';
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function clearCart() {
    if (confirm('هل أنت متأكد من مسح جميع عناصر السلة؟')) {
        cart = [];
        saveCart();
        renderCart();
        cartSidebar.classList.remove('open');
    }
}

// ===========================================
// 3. دالة إرسال الطلب (WhatsApp Logic)
// ===========================================

function generateWhatsAppMessage() {
    if (cart.length === 0) {
        alert('لا يمكن إرسال طلب وسلتك فارغة!');
        return;
    }

    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const deliveryOption = deliveryOptionSelect.value;
    const deliveryAddressText = deliveryAddress.value.trim();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = deliveryOption === 'delivery' ? currentBranch.deliveryFee : 0;
    const finalTotal = subtotal + deliveryFee;
    
    let message = `*طلب جديد من قائمة سحايب ديرتي (فرع ${currentBranch.name})* \n\n`;
    
    // تفاصيل العميل
    message += `*الاسم:* ${customerName || 'غير محدد'}\n`;
    message += `*الجوال:* ${customerPhone || 'غير محدد'}\n`;
    message += `*نوع الطلب:* ${deliveryOption === 'delivery' ? 'توصيل' : 'استلام من الفرع'}\n`;

    if (deliveryOption === 'delivery' && deliveryAddressText) {
        message += `*العنوان:* ${deliveryAddressText}\n`;
    }
    
    message += `\n*============= تفاصيل الطلب =============*\n`;

    // تفاصيل الوجبات
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        message += `\n*${item.name}* (×${item.quantity})\n`;
        message += `  - السعر: ${item.price.toFixed(2)} ر.س\n`;
        if (item.option) {
            message += `  - الخيار: ${item.option}\n`;
        }
        if (item.note) {
            message += `  - ملاحظة: ${item.note}\n`;
        }
        message += `  - المجموع: ${itemTotal.toFixed(2)} ر.س\n`;
    });

    // الإجمالي
    message += `\n*============= الإجمالي =============*\n`;
    message += `*المجموع الفرعي:* ${subtotal.toFixed(2)} ر.س\n`;
    if (deliveryFee > 0) {
         message += `*رسوم التوصيل:* ${deliveryFee.toFixed(2)} ر.س\n`;
    }
    message += `*الإجمالي النهائي:* ${finalTotal.toFixed(2)} ر.س\n`;

    const whatsappUrl = `https://wa.me/${currentBranch.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ===========================================
// 4. الإعدادات الأولية والمستمعات (Listeners)
// ===========================================

function initialize() {
    document.getElementById('branchName').textContent = currentBranch.name;

    // إظهار وإخفاء حقل العنوان بناءً على خيار التوصيل
    deliveryOptionSelect.addEventListener('change', () => {
        const isDelivery = deliveryOptionSelect.value === 'delivery';
        addressLabel.style.display = isDelivery ? 'block' : 'none';
        deliveryAddress.style.display = isDelivery ? 'block' : 'none';
        deliveryAddress.required = isDelivery;
        renderCart(); // لإعادة حساب رسوم التوصيل
    });
    
    // إخفاء الـ sidebar عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && e.target !== cartBtn) {
            cartSidebar.classList.remove('open');
        }
    });

    // فتح السلة
    cartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartSidebar.classList.toggle('open');
    });

    // مسح السلة
    clearCartBtn.addEventListener('click', clearCart);

    // إرسال عبر واتساب
    sendWhatsappBtn.addEventListener('click', generateWhatsAppMessage);

    // البحث
    searchInput.addEventListener('input', () => {
        renderMenu();
        // إظهار زر العودة للأعلى بعد البحث
        if (searchInput.value.trim() !== '') {
             scrollToTopBtn.style.display = 'block';
        } else {
             scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll To Top
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // إغلاق المودال عند النقر خارج المحتوى
    optionModal.addEventListener('click', (e) => {
        if (e.target === optionModal) {
            closeModal();
        }
    });

    renderMenu();
    renderCart();
    
    // تم حذف استدعاء دالة الإشعارات هنا
}

// 💡 NEW: تسجيل عامل الخدمة (Service Worker) الخفيف لضمان التحديث الفوري
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // 🎯 المسار المطلق الصحيح لتسجيل العامل الخدمي
        navigator.serviceWorker.register('/aaa/service-worker.js') .then(reg => {
            console.log('Service Worker Registered!', reg.scope);
        })
        .catch(err => {
            console.error('Service Worker Registration failed:', err);
        });
    });
}

// 🚀 ------------------------------------------
// ✨ دالة تأثير سقوط الصورة إلى السلة (Fly-to-Cart)
// ------------------------------------------
function flyToCart(imgElement) {
    // 1. استنساخ الصورة
    const flyingImg = imgElement.cloneNode(true);
    flyingImg.className = "flying-img"; // تطبيق الأنماط
    document.body.appendChild(flyingImg);

    // 2. تحديد موقع الصورة الأصلية
    const rect = imgElement.getBoundingClientRect();
    flyingImg.style.top = rect.top + "px";
    flyingImg.style.left = rect.left + "px";

    // 3. تحديد موقع زر السلة
    const cartRect = document.getElementById("cartBtn").getBoundingClientRect();

    // 4. بدء الحركة
    setTimeout(() => {
        // تحريك الصورة إلى زر السلة وتصغيرها
        flyingImg.style.transform = `translate(${cartRect.left - rect.left}px, ${cartRect.top - rect.top}px) scale(0.2)`;
        flyingImg.style.opacity = "0";
    }, 10); // تأخير بسيط لبدء حركة CSS

    // 5. إزالة الصورة بعد انتهاء الحركة
    setTimeout(() => {
        flyingImg.remove();
        // تشغيل تأثير الاهتزاز الخفيف لزر السلة
        const cartBtn = document.getElementById('cartBtn');
        cartBtn.classList.add('shake');
        setTimeout(() => {
            cartBtn.classList.remove('shake');
        }, 500);
    }, 400); // يجب أن يكون هذا الوقت أطول من مدة الحركة في CSS
}

// تم حذف دوال الإشعارات بالكامل من هنا

// بدء التهيئة عند تحميل الصفحة
window.onload = initialize;
