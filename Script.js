import menuData from "./menuData.js";

let cart = [];

window.onload = () => {
  loadSections();
};

function loadSections() {
  const box = document.getElementById("menu-sections");
  box.innerHTML = "";
  menuData.forEach(sec => {
    const d = document.createElement("div");
    d.className = "section-card";
    d.innerHTML = `<p>${sec.section}</p>`;
    d.onclick = () => loadItems(sec.section);
    box.appendChild(d);
  });
}

function loadItems(name){
  alert("تم التحميل: " + name);
}