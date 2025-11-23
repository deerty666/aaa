// File: animation.js (منطق الحركة)

/**
 * دالة تأثير سقوط الصورة إلى السلة (Fly-to-Cart Effect)
 * تم تعديلها لتأخذ في الاعتبار التمرير (Scrolling) لضمان العمل الصحيح.
 * @param {HTMLElement} imgElement - عنصر الصورة المراد تحريكها.
 */
export function flyToCart(imgElement) {
    const flyingImg = imgElement.cloneNode(true);
    flyingImg.className = "flying-img";
    document.body.appendChild(flyingImg);

    // حساب الموقع مع الأخذ في الاعتبار التمرير
    const rect = imgElement.getBoundingClientRect();
    flyingImg.style.top = rect.top + window.scrollY + "px"; 
    flyingImg.style.left = rect.left + window.scrollX + "px"; 

    const cartRect = document.getElementById("cartBtn").getBoundingClientRect();

    setTimeout(() => {
        // تحريك الصورة إلى زر السلة وتصغيرها
        flyingImg.style.transform = `translate(${cartRect.left - rect.left}px, ${cartRect.top - rect.top}px) scale(0.2)`;
        flyingImg.style.opacity = "0";
    }, 10); 

    setTimeout(() => {
        flyingImg.remove();
    }, 700); 
}
