import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
let productsInCart;
if (
  getLocalStorage("so-cart") !== null ||
  getLocalStorage("so-cart" !== undefined)
) {
  productsInCart = getLocalStorage("so-cart");
} else {
  productsInCart = [];
}
function addProductToCart(product) {
  const alreadyInCart = productsInCart.find(
    (cartItem) => cartItem.Id === product.Id,
  );
  if (!alreadyInCart) {
    productsInCart.push(product);
  }
  setLocalStorage("so-cart", productsInCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
