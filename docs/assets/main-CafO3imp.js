import { r as s } from "./utils-D6dTBaom.js";
/* empty css              */ import { P as i } from "./ProductData-cC1gb4nn.js";
function c(t) {
  return `
    <li class="product-card">
      <a href="product_pages/?products=${t.Id}">
        <img src="${t.Image}" alt="${t.Name}">
        <h2>${t.Brand.Name}</h2>
        <h3>${t.Name}</h3>
        <p class="product-card__price">$${t.FinalPrice}</p>
      </a>
    </li>
    `;
}
class n {
  constructor(e, a, r) {
    (this.category = e), (this.dataSource = a), (this.listElement = r);
  }
  async init() {
    const e = await this.dataSource.getData();
    this.renderList(e);
  }
  renderList(e) {
    s(c, this.listElement, e);
  }
}
const o = new i("tents"),
  l = document.querySelector(".product-list"),
  d = new n("Tents", o, l);
d.init();
