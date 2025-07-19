import {
  getDiscountBadge,
  getDiscount,
  getData,
  renderListWithTemplate,
  resolveImagePublicPath,
  capitalizeFirst,
} from "./utils.mjs";

function productCardTemplate(product) {
  const discountBadge = getDiscountBadge(
    getDiscount(product.SuggestedRetailPrice, product.FinalPrice),
  );
  const imgSrc = product.Images.PrimaryMedium;
  const imageTag = `
    <img
      src="${imgSrc}"
      alt="${product.Name}"
    />
  `;

  return `
    <li class="product-card">
    ${discountBadge}
      <a href="product_pages/?product=${product.Id}">
        ${imageTag}
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    document.getElementById("category").innerText =
      `Top Products: ${capitalizeFirst(this.category)}`;
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
