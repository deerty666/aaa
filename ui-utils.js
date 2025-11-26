// ui-utils.js

// دالة لتنسيق الرقم كعملة
export function formatCurrency(number) {
    return `${number.toFixed(2)} ر.س`; 
}

// 🚀 دالة تأثير سقوط الصورة إلى السلة (Fly-to-Cart)
// المصدر: Script.js
export function flyToCart(imgElement) {
    const flyingImg = imgElement.cloneNode(true);
    flyingImg.className = "flying-img"; 
    document.body.appendChild(flyingImg);

    const rect = imgElement.getBoundingClientRect();
    flyingImg.style.top = rect.top + "px";
    flyingImg.style.left = rect.left + "px";

    const cartRect = document.getElementById("cartBtn").getBoundingClientRect();

    setTimeout(() => {
        flyingImg.style.transform = `translate(${cartRect.left - rect.left}px, ${cartRect.top - rect.top}px) scale(0.2)`;
        flyingImg.style.opacity = "0";
    }, 10);

    setTimeout(() => {
        flyingImg.remove();
    }, 800);
}

// دالة وميض زر السلة
// المصدر: Script.js
export function flashCartButton() {
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.classList.add('flash-cart-btn');
    setTimeout(() => {
        cartBtn.classList.remove('flash-cart-btn');
    }, 400); 
}
طلبااااااات 
