import {
  getLocalStorage,
  loadHeaderFooter,
  setLocalStorage,
  getCartCount,
} from "./utils.mjs";

function calculateTotal(cartItems) {
  return (
    cartItems?.reduce((sum, entry) => {
      const price = entry.item.Result.FinalPrice;
      const qty = entry.quantity;
      return sum + price * qty;
    }, 0) ?? 0
  );
}

function updateCartQuantity(itemId, delta) {
  const cartItems = getLocalStorage("so-cart");

  const newCart = cartItems
    .map((entry) => {
      if (entry.item.Result.Id === itemId) {
        console.log("working");
        const q = entry.quantity + delta;
        return { ...entry, quantity: Math.max(0, q) };
      }
      return entry;
    })
    .filter((entry) => entry.quantity > 0);
  setLocalStorage("so-cart", newCart);
  getCartCount();
  renderCartContents();
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  let htmlItems;
  if (cartItems.length > 0) {
    htmlItems = cartItems.map((item) => cartItemTemplate(item));
  } else {
    htmlItems = "";
  }

  document.querySelector(".product-list").innerHTML = htmlItems?.join("");
  if (cartItems?.length > 0) {
    document.querySelector(".total").innerHTML =
      `Total: $${calculateTotal(cartItems)}`;
  } else {
    document.querySelector(".total").innerHTML = "";
  }

  document.querySelectorAll(".remove-from-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.currentTarget.dataset.id;
      const newCart = cartItems.filter(
        (item) => String(item.item.Result.Id) !== id,
      );

      setLocalStorage("so-cart", newCart);
      getCartCount();
      renderCartContents();
    });
  });

  document.querySelectorAll(".qty-increment").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.dataset.id;
      console.log(id);
      updateCartQuantity(id, +1);
    });
  });

  document.querySelectorAll(".qty-decrement").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.dataset.id;
      updateCartQuantity(id, -1);
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
    <button
        class="remove-from-cart"
        data-id="${item.item.Result.Id}"
        aria-label="Remove ${item.item.Result.Name}"
    >
        ×
    </button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.item.Result.Images.PrimaryMedium}"
      alt="${item.item.Result.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.item.Result.Name}</h2>
  </a>
  <p class="cart-card__color">${item.item.Result.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <div id="cart-quantity-stepper" class="quantity-selector"> 
        <button
            type="button"
            class="qty-btn qty-decrement"
            aria-label="Remove item"
            title="Remove item"
            data-id="${item.item.Result.Id}"
        >
            <svg viewBox="0 0 24 24" class="icon-trash">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
        </button>
        <div
            class="qty-value"
            aria-live="polite"
            aria-atomic="true"
        >
        ${item.quantity}
        </div>
        <button
            type="button"
            class="qty-btn qty-increment"
            aria-label="Increase quantity"
            title="Increase quantity"
            data-id="${item.item.Result.Id}"
        >
            <svg viewBox="0 0 24 24" class="icon-plus">
            <rect x="11" y="5" width="2" height="14"/>
            <rect x="5" y="11" width="14" height="2"/>
            </svg>
        </button>
    </div>
</div>
  <p class="cart-card__price">$${item.item.Result.FinalPrice}</p>
</li>
`;

  return newItem;
}

async function init() {
  await loadHeaderFooter();
  getCartCount();
  renderCartContents();
}
init();
