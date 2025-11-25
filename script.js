const container = document.getElementById("menuSections");

menuData.forEach(sec => {
  const group = document.createElement("div");
  group.innerHTML = `<h2 style='color:gold;border-bottom:1px solid gold;padding-bottom:5px;'>${sec.section}</h2>`;

  sec.items.forEach(item => {
    
    // 1. منطق عرض الرز (riceInfo) 🍚
    const riceInfo = item.rice
      ? `<p class="extra">يقدم مع: ${item.rice}</p>`
      : '';

    // 2. منطق عرض الإضافات (extrasInfo) ➕
    const extrasInfo = item.extras
      ? item.extras
          .map(extra => {
            // يتم إنشاء سطر HTML لكل إضافة
            return `<p class="extra">${extra.name} (+${extra.add} ريال)</p>`;
          })
          .join('') // دمج جميع سطور الإضافات في سلسلة نصية واحدة
      : '';

    const card = document.createElement("div");
    card.className = "card";
    
    // دمج جميع الأجزاء في قالب البطاقة
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>السعر: ${item.price} ريال</p>
      ${riceInfo}
      ${extrasInfo}
    `;
    group.appendChild(card);
  });

  container.appendChild(group);
});
