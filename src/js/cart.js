import {
  getLocalStorage,
  loadHeaderFooter,
  setLocalStorage,
  getCartCount,
} from "./utils.mjs";

function calculateTotal(cartItems) {
  return cartItems?.reduce((sum, item) => sum + item.Result.FinalPrice, 0);
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems?.map((item) => cartItemTemplate(item));
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

      const newCart = cartItems.filter((item) => String(item.Result.Id) !== id);

      setLocalStorage("so-cart", newCart);
      getCartCount();
      renderCartContents();
    });
  });
}

function cartItemTemplate(item) {
  console.log(item);
  const newItem = `
  <li class="cart-card divider">
   <button class="remove-from-cart"
              data-id="${item.Result.Id}"
              aria-label="Remove ${item.Result.Name}">
        ×
      </button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Result.Images.PrimaryMedium}"
      alt="${item.Result.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Result.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Result.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.Result.FinalPrice}</p>
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
