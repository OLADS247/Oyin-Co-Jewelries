// ----- LOAD CART -----
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// ----- SAVE CART FUNCTION -----
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ----- RENDER CART FUNCTION -----
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItemsContainer.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₦${item.price}</td>
        <td>
          <button onclick="decreaseQty(${index})">−</button>
          <span style="margin:0 10px;">${item.quantity}</span>
          <button onclick="increaseQty(${index})">+</button>
        </td>
        <td>₦${itemTotal}</td>
        <td>
          <button onclick="removeItem(${index})">Remove</button>
        </td>
      </tr>
    `;
  });

  cartTotal.textContent = `Total: ₦${total}`;
  updateCartBadge();
}

// ----- CART ITEM QUANTITY -----
function increaseQty(index) {
  cart[index].quantity += 1;
  saveCart();
  renderCart();
}

function decreaseQty(index) {
  cart[index].quantity -= 1;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

// ----- UPDATE CART BADGE -----
function updateCartBadge() {
  const badge = document.querySelector(".cart .badge");
  if (!badge) return;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
}

// ----- INITIAL RENDER -----
renderCart();

// ----- CHECKOUT BUTTON -----
document.getElementById("checkoutBtn").addEventListener("click", () => {
  // Save cart array (not DOM) for checkout page
  localStorage.setItem("cartItems", JSON.stringify(cart));
  window.location.href = "checkout.html";
});
