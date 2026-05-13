document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closePopup");

  // Check first visit and show popup if available
  try {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited && popup) popup.style.display = "flex";
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (popup) popup.style.display = "none";
        localStorage.setItem("hasVisited", "true");
      });
    }
  } catch (e) {
    // localStorage unavailable or other error — fail silently
    console.warn('popup/load', e);
  }
});
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("siteNav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    if (!navLinks) return;
    const isActive = navLinks.classList.toggle("active");
    menuToggle.setAttribute('aria-expanded', String(isActive));
  });
}

// ================= CART SETUP =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= ADD TO CART =================
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      category: button.dataset.category,
      quantity: 1
    };

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
  });
});

// ================= CART BADGE =================
function updateCartBadge() {
  const badge = document.querySelector(".cart .badge");
  if (!badge) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
}

// ================= INIT =================
updateCartBadge();

