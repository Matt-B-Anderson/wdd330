import {
  getLocalStorage,
  setLocalStorage,
  resolveImagePublicPath,
  getDiscount,
  getDiscountBadge,
} from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    const alreadyInCart = cartItems.find(
      (cartItem) => cartItem.Result.Id === this.product.Id,
    );
    if (!alreadyInCart) {
      cartItems.push(this.product);
    }
    setLocalStorage("so-cart", cartItems);
    const count = cartItems?.length;
    document.querySelector(".cart-count").textContent = count;
  }
  renderProductDetails() {
    productDetailsLayout(this.product);
  }
}

function productDetailsLayout(product) {
  const discountBadge = getDiscountBadge(
    getDiscount(product.Result.SuggestedRetailPrice, product.Result.FinalPrice),
  );
  document.getElementById("discount-badge").innerHTML = discountBadge;
  document.querySelector("h2").textContent = product.Result.Name;
  document.querySelector("h3").textContent = product.Result.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Result.Images.PrimaryLarge;
  productImage.alt = product.Result.NameWithoutBrand;

  document.getElementById("productPrice").textContent =
    product.Result.FinalPrice;
  document.getElementById("productColor").textContent =
    product.Result.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML =
    product.Result.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Result.Id;
}
