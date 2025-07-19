import {
  getLocalStorage,
  loadHeaderFooter,
  setLocalStorage,
  getCartCount,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems?.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems?.join("");
  const total = cartItems?.reduce((sum, item) => sum + item.FinalPrice, 0);
  if (cartItems?.length > 0) {
    document.querySelector(".total").innerHTML = `Total: $${total}`;
  }

  document.querySelectorAll(".remove-from-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.currentTarget.dataset.id;

      const newCart = cartItems.filter((item) => String(item.Id) !== id);

      setLocalStorage("so-cart", newCart);
      renderCartContents();
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider">
   <button class="remove-from-cart"
              data-id="${item.Id}"
              aria-label="Remove ${item.Name}">
        ×
      </button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
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
