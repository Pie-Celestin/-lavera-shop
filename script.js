// LAVÉRA Shopping Cart

let cart = JSON.parse(localStorage.getItem("laveraCart")) || [];

function addToCart(name, price) {
  const existingProduct = cart.find(item => item.name === name);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();

  alert(name + " added to your cart!");
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);

  saveCart();
  updateCartCount();
  displayCart();
}

function saveCart() {
  localStorage.setItem("laveraCart", JSON.stringify(cart));
}

function updateCartCount() {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartButton = document.getElementById("cart-count");

  if (cartButton) {
    cartButton.textContent = totalItems;
  }
}

function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";

    if (totalContainer) {
      totalContainer.textContent = "0 RWF";
    }

    return;
  }

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const product = document.createElement("div");

    product.innerHTML = `
      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:15px;
        margin-bottom:10px;
        border:1px solid #eee;
        border-radius:10px;
      ">

        <div>
          <strong>${item.name}</strong>
          <p>
            ${item.quantity} × ${item.price.toLocaleString()} RWF
          </p>
        </div>

        <button
          onclick="removeFromCart('${item.name}')"
          style="
            background:#111;
            color:white;
            border:none;
            padding:8px 15px;
            border-radius:20px;
            cursor:pointer;
          ">
          Remove
        </button>

      </div>
    `;

    cartContainer.appendChild(product);
  });

  if (totalContainer) {
    totalContainer.textContent =
      total.toLocaleString() + " RWF";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  displayCart();
});
