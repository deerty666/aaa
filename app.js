import menuData from './menuData.js';
total += row.price * row.qty;
const div = document.createElement('div');
div.className = 'cart-row';
div.innerHTML = `
<div>
<div style="font-weight:700">${row.name}</div>
<div class="muted">${formatPrice(row.price)} ر.س</div>
</div>
<div class="qty">
<button class="small-btn" data-id="${row.id}" data-action="dec">-</button>
<div>${row.qty}</div>
<button class="small-btn" data-id="${row.id}" data-action="inc">+</button>
<button class="small-btn" data-id="${row.id}" data-action="remove">حذف</button>
</div>
`;
cartItemsEl.appendChild(div);
});
cartTotalEl.textContent = formatPrice(total);
}


// Events
branchSelect.addEventListener('change', buildUI);
searchInput.addEventListener('input', buildUI);


menuSectionsEl.addEventListener('click', e=>{
const btn = e.target.closest('button');
if(!btn) return;
const action = btn.dataset.action;
const id = btn.dataset.id;
if(action === 'add') addToCart(id);
if(action === 'details') alert('تفاصيل الصنف: ' + id);
renderCart();
});


openCartBtn.addEventListener('click', ()=>{cartModal.classList.remove('hidden');renderCart();});
closeCartBtn.addEventListener('click', ()=>{cartModal.classList.add('hidden');});


cartItemsEl.addEventListener('click', e=>{
const btn = e.target.closest('button'); if(!btn) return;
const id = btn.dataset.id; const act = btn.dataset.action;
const row = cart.find(r=>r.id===id);
if(!row) return;
if(act==='inc') row.qty++;
if(act==='dec'){ row.qty--; if(row.qty<=0) cart = cart.filter(x=>x.id!==id); }
if(act==='remove') cart = cart.filter(x=>x.id!==id);
renderCart();
});


getLocationBtn.addEventListener('click', ()=>{
if(!navigator.geolocation){ alert('الموقع غير مدعوم في متصفحك'); return; }
getLocationBtn.textContent = 'جاري الحصول على الموقع...';
navigator.geolocation.getCurrentPosition(pos=>{
userLocation = {lat:pos.coords.latitude, lng:pos.coords.longitude};
getLocationBtn.textContent = 'تم اضافة موقعي';
}, err=>{
alert('رفض الوصول للموقع أو حدث خطأ');
