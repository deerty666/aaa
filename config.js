// config.js

/* ====== بيانات الفروع (BRANCH_CONFIG) ====== */
// المصدر: Script.js
export const BRANCH_CONFIG = {
    'branch1': { 
        whatsapp: '966536803598', 
        name: 'لبن الاحمدية', 
        deliveryFee: 5,
    },
    'branch2': {
        whatsapp: '9665XXXXXXXX2', 
        name: 'شمال الرياض مخرج ٦', 
        deliveryFee: 5, 
    },
    'branch3': {
        whatsapp: '9665XXXXXXXX3', 
        name: 'الروضه خالد بن الوليد ', 
        deliveryFee: 5,
    }
};

/* ====== بيانات المنيو (menuData) - أصناف القائمة الخاصة بك ====== */
// المصدر: Script.js
export const menuData = [
    // 1. القسم الجديد: الكل
    { 
        section:"الكل", 
        sectionImg: "logo-bg.webp", // صورة عامة
        items:[] 
    },
    { 
        section:"الشوايه", 
        sectionImg: "sh00.webp", // صورة القسم
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
        sectionImg: "md00.webp",
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
        sectionImg: "mn00.webp",
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
        sectionImg: "mf00.webp",
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
        sectionImg: "mq00.webp",
        items:[
            // الوجبة 1
            {id:"mq1", img:"mq00.webp", name:" حبه مقلوبه ", basePrice:50, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز شعبي", price:0}]},
            // الوجبة 2
            {id:"mq2", img:"mq00.webp", name:"نص دجاج مقلوبه", basePrice:25, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز شعبي", price:0}]}
        ]
    },
    { 
        section:"مضغوط", 
        sectionImg: "mg00.webp",
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
        sectionImg: "zb00.webp",
        items:[
            // الوجبة 1
            {id:"zb1", img:"zb00.webp", name:"دجاج زربيان حبه", basePrice:50, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز زربيان", price:0}]},
            // الوجبة 2
            {id:"zb2", img:"zb00.webp", name:"نص حبه زربيان", basePrice:25, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"رز زربيان", price:0}]}
        ]
    },
    { 
        section:"قسم اللحوم", 
        sectionImg: "me00.webp",
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
        sectionImg: "gr00.webp",
        // تم تحديد توافر قسم المشويات لفرع الرياض (branch1) فقط
        sectionAvailableIn: ['branch1'], 
        items:[
            // الوجبة 1
            {
                id:"gr1",
                img:"gr01.webp",
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
                img:"gr02.webp",
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
                img:"gr03.webp",
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
                img:"gr04.webp",
                name:"شيش طاووق",
                basePrice:30,
                availableIn: ['branch1'], // مقيد بـ branch1
                options:[
                    {name:"نفر", price:0},
                    {name:"نص كيلو", price:30},
                    {name:"كيلو", price:90}
                ]
            },
            // الوجبة 5 (مشكل مشاوي - أكثر مبيعاً)
            {
                id:"gr5",
                img:"gr05.webp",
                name:"مشكل مشاوي",
                basePrice:35,
                isBestSeller: true, 
                availableIn: ['branch1'], // مقيد بـ branch1
                options:[
                    {name:"نفر", price:0},
                    {name:"نص كيلو", price:35},
                    {name:"كيلو", price:95}
                ]
            }
        ]
    },
    { 
        section:"الأطباق الجانبية", 
        sectionImg: "si00.webp",
        items:[
            // الوجبة الجديدة: شوربة (أكثر مبيعاً)
            {id:"side0", img:"si08.webp", name:"شوربة", basePrice:8, isBestSeller: true, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 1: جريش (أكثر مبيعاً)
            {id:"side1", img:"si01.webp", name:"جريش", basePrice:0, isBestSeller: true, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صغير", price:5}, {name:"كبير", price:10}]},
            // الوجبة 2
            {id:"side3", img:"si02.webp", name:"قرصان", basePrice:0, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صغير", price:5}, {name:"كبير", price:10}]},
            // الوجبة 3
            {id:"side5", img:"si03.webp", name:"طحينه", basePrice:3, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"علبه", price:0}]},
            // الوجبة 4
            {id:"side6", img:"si04.webp", name:"سلطه حار", basePrice:3, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"علبه", price:0}]},
            // الوجبة 5
            {id:"side7", img:"si05.webp", name:"نفر رز شعبي", basePrice:10, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"نفر", price:0}]},
            // الوجبة 6
            {id:"side8", img:"si06.webp", name:"نفر رز بشاور", basePrice:10, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"نفر", price:0}]},
            // الوجبة 7
            {id:"side9", img:"si07.webp", name:"نفر رز مندي", basePrice:10, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"نفر", price:0}]}
        ]
    },
    { 
        section:"المشروبات", 
        sectionImg: "dr00.webp",
        items:[
            // الوجبة 1
            {id:"bev-p", img:"dr01.webp", name:"ببسي", basePrice:0, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"صغير", price:3},
                {name:"وسط", price:6},
                {name:"كبير", price:9}
            ]},
            // الوجبة 2
            {id:"bev-h", img:"dr02.webp", name:"حمضيات", basePrice:0, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"صغير", price:3},
                {name:"وسط", price:6},
                {name:"كبير", price:9}
            ]},
            // الوجبة 3
            {id:"bev-s", img:"dr03.webp", name:"سفن اب", basePrice:0, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"صغير", price:3},
                {name:"وسط", price:6},
                {name:"كبير", price:9}
            ]},
            // الوجبة 4
            {id:"bev-m", img:"dr04.webp", name:"لبن المراعي", basePrice:0, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"صغير", price:2},
                {name:"وسط", price:6},
                {name:"كبير", price:11}
            ]},
            // الوجبة 5
            {id:"bev-q", img:"dr05.webp", name:"لبن القريه", basePrice:3, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"عبوة", price:0}]}
        ]
    },
    { 
        section:"الايدامات", 
        sectionImg: "ed00.webp",
        items:[
            // الوجبة 1
            {id:"eid1", img:"ed01.webp", name:"ملوخيه", basePrice:10, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 2
            {id:"eid2", img:"ed02.webp", name:"باميه", basePrice:10, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 3
            {id:"eid3", img:"ed03.webp", name:"مشكل خضار", basePrice:10, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 4
            {id:"eid4", img:"ed04.webp", name:"مشكل فران", basePrice:10, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 5
            {id:"eid5", img:"ed05.webp", name:"مسقع", basePrice:12, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]}
        ]
    },
    { 
        section:"المقبلات", 
        sectionImg: "ap00.webp",
        items:[
            // الوجبة الجديدة: ورق عنب 
            {id:"app-wrk", img:"ap09.webp", name:"ورق عنب", basePrice:0, availableIn: ['branch1', 'branch2', 'branch3'], options:[
                {name:"صغير", price:7},
                {name:"كبير", price:12}
            ]},
            // الوجبة 1
            {id:"app-kh", img:"ap01.webp", name:"سلطه خضراء", basePrice:5, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 2
            {id:"app-sl", img:"ap02.webp", name:"سلطه سحايب", basePrice:7, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 3
            {id:"app-tb", img:"ap03.webp", name:"تبوله", basePrice:7, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 4
            {id:"app-ht", img:"ap04.webp", name:"حمص", basePrice:8, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 5
            {id:"app-bb", img:"ap05.webp", name:"بابا غنوج", basePrice:8, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 6
            {id:"app-mt", img:"ap06.webp", name:"متبل", basePrice:8, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 7
            {id:"app-yz", img:"ap07.webp", name:"زبادي بالخيار", basePrice:5, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"صحن", price:0}]},
            // الوجبة 8
            {id:"app-md", img:"ap08.webp", name:"مخلل", basePrice:3, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"علبه", price:0}]}
        ]
    },
    { 
        section:"حلا", 
        sectionImg: "kn00.webp",
        sectionAvailableIn: ['branch1', 'branch2', 'branch3'],
        items:[
            // الوجبة 1
            {id:"kna1", img:"kn01.webp", name:"كنافه قشطه", basePrice:10, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"", price:0}]},
            // الوجبة 2
            {id:"kna2", img:"kn02.webp", name:"كنافه جلاكسي", basePrice:12, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"", price:0}]},
            // الوجبة 3
            {id:"kna3", img:"kn03.webp", name:"كنافه نوتيلا", basePrice:12, availableIn: ['branch1', 'branch2', 'branch3'], options:[{name:"", price:0}]}
        ]
    } 
];

/* ====== دالة معالجة البيانات لتقديم "الأكثر مبيعاً" في بداية القائمة ====== */
// المصدر: Script.js
export function processMenuData(data) {
    let bestSellers = [];
    let processedMenuData = [];
    data.forEach(section => {
        if (section.section === "الكل") {
            processedMenuData.push(section); 
            return;
        }
        let regularItems = [];
        section.items.forEach(item => {
            const itemWithSection = {...item, actualSection: item.actualSection || section.section};
            if (item.isBestSeller === true) {
                bestSellers.push(itemWithSection);
            } else {
                regularItems.push(itemWithSection);
            }
        });
        if (regularItems.length > 0 || section.sectionAvailableIn) {
            let newSection = {...section};
            newSection.items = regularItems;
            processedMenuData.push(newSection);
        }
    });

    if (bestSellers.length > 0) {
        processedMenuData.splice(1, 0, {
            section: 'الأكثر مبيعاً',
            sectionImg: '/Dirty55/star-icon.webp', 
            items: bestSellers
        });
    }

    const allItems = processedMenuData.flatMap(sec => sec.section !== "الكل" ? sec.items : []);
    const allSection = processedMenuData.find(sec => sec.section === "الكل");
    if (allSection) {
        allSection.items = allItems;
    }

    return processedMenuData;
}
