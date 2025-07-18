import { renderListWithTemplate, resolveImagePublicPath } from "./utils.mjs";

function productCardTemplate(product) {
  const discount = product.SuggestedRetailPrice
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100,
      )
    : 0;
  const discountBadge =
    discount > 0
      ? `<svg
    class="discount-badge"
    width="80" height="40"
    viewBox="0 0 80 40"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="${discount}% OFF!">
    <polygon points="0,0 65,0 80,20 65,40 0,40" fill="#e74c3c" />
    <text
      x="42.5" y="25"
      fill="#fff"
      font-family="Arial, Helvetica, sans-serif"
      font-size="14"
      font-weight="bold"
      text-anchor="middle">
      ${discount}% OFF!
    </text>
  </svg>`
      : "";

  const imgSrc = resolveImagePublicPath(product.Image);
  const imageTag = `
    <img
      src="${imgSrc}"
      alt="${product.Name}"
    />
  `;

  return `
    <li class="product-card">
    ${discountBadge}
      <a href="product_pages/?products=${product.Id}">
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
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
