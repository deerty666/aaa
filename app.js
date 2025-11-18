const menu = [
  { id: 1, name: "برجر لحم", price: 3500, image: "https://via.placeholder.com/180", bestSeller: true },
  { id: 2, name: "برجر دجاج", price: 3000, image: "https://via.placeholder.com/180", bestSeller: false },
  { id: 3, name: "بطاطس مقلية", price: 1200, image: "https://via.placeholder.com/180", bestSeller: true },
  { id: 4, name: "مشروب غازي", price: 800, image: "https://via.placeholder.com/180", bestSeller: false },
];

let cart = [];

const menuList = document.getElementById("menuList");
const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItems = document.getElementById("cartItems");
const totalBreakdown = document.getElementById("totalBreakdown");
const cartCount = document.getElementById("cartCount");
const sendWhatsapp = document.getElementById("sendWhatsapp");
const clearCart = document.getElementById("clearCart");
const searchBar = document.getElementById("searchBar");

function displayMenu(items) {
  menuList.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      ${item.bestSeller ? '<div class="best-seller-badge">الأكثر مبيعاً</div>' : ''}
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <div class="price">${item.price} ريال</div>
      <button class="add-btn" onclick="addToCart(${item.id})">أضف للسلة</button>
    `;
    menuList.appendChild(card);
  });
}

function addToCart(id) {
  const item = menu.find(i => i.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({...item, qty: 1});
  }
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.innerHTML = `${item.name} × ${item.qty} - ${item.price*item.qty} ريال`;
    cartItems.appendChild(div);
  });
  totalBreakdown.innerText = `الإجمالي: ${total} ريال`;
  cartCount.innerText = cart.reduce((a,b)=>a+b.qty,0);
}

cartBtn.addEventListener("click", ()=>{cartDrawer.classList.add("open"); cartOverlay.classList.add("show");});
closeCartBtn.addEventListener("click", ()=>{cartDrawer.classList.remove("open"); cartOverlay.classList.remove("show");});
cartOverlay.addEventListener("click", ()=>{cartDrawer.classList.remove("open"); cartOverlay.classList.remove("show");});

clearCart.addEventListener("click", ()=>{
  cart = [];
  updateCart();
});

sendWhatsapp.addEventListener("click", ()=>{
  if(cart.length === 0) return alert("السلة فارغة");
  let text = "طلب من المنيو:\n";
  cart.forEach(item => {
    text += `${item.name} × ${item.qty} - ${item.price*item.qty} ريال\n`;
  });
  const type = document.querySelector('input[name="deliveryType"]:checked').value;
  text += `طريقة الطلب: ${type}`;
  const waUrl = `https://wa.me/967XXXXXXXXX?text=${encodeURIComponent(text)}`;
  window.open(waUrl,"_blank");
});

searchBar.addEventListener("input", ()=>{
  const query = searchBar.value.toLowerCase();
  const filtered = menu.filter(item => item.name.toLowerCase().includes(query));
  displayMenu(filtered);
});

displayMenu(menu);
updateCart();
