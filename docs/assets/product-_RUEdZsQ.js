import { g as a, s as r, a as n } from "./utils-D6dTBaom.js";
/* empty css              */ import { P as c } from "./ProductData-cC1gb4nn.js";
class s {
  constructor(e, o) {
    (this.productId = e), (this.product = {}), (this.dataSource = o);
  }
  async init() {
    (this.product = await this.dataSource.findProductById(this.productId)),
      this.renderProductDetails(),
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addProductToCart.bind(this));
  }
  addProductToCart() {
    const e = a("so-cart") || [];
    e.find((d) => d.Id === this.product.Id) || e.push(this.product),
      r("so-cart", e);
  }
  renderProductDetails() {
    i(this.product);
  }
}
function i(t) {
  (document.querySelector("h2").textContent = t.Brand.Name),
    (document.querySelector("h3").textContent = t.NameWithoutBrand);
  const e = document.getElementById("productImage");
  (e.src = t.Image),
    (e.alt = t.NameWithoutBrand),
    (document.getElementById("productPrice").textContent = t.FinalPrice),
    (document.getElementById("productColor").textContent =
      t.Colors[0].ColorName),
    (document.getElementById("productDesc").innerHTML =
      t.DescriptionHtmlSimple),
    (document.getElementById("addToCart").dataset.id = t.Id);
}
const u = new c("tents"),
  m = n("products"),
  l = new s(m, u);
l.init();
