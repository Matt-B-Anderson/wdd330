import {
  getLocalStorage,
  setLocalStorage,
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
      (cartItem) => cartItem.item.Id === this.product.Id,
    );
    if (!alreadyInCart) {
      cartItems.push({ quantity: 1, item: this.product });
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
  console.log(product);
  const discountBadge = getDiscountBadge(
    getDiscount(product.SuggestedRetailPrice, product.FinalPrice),
  );
  document.getElementById("discount-badge").innerHTML = discountBadge;
  document.querySelector("h2").textContent = product.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Images.PrimaryLarge;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent =
    product.FinalPrice;
  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
