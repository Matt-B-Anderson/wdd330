import Alert from "./Alert";
import {
  getCartCount,
  resolveImagePublicPath,
  capitalizeFirst,
  loadHeaderFooter,
} from "./utils.mjs";

const alertList = new Alert("alerts");
alertList.init();

const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

function createProductTypes(categories) {
  const htmlItems = categories.map((category) => productTypeTemplate(category));
  document.querySelector(".product-types").innerHTML = htmlItems.join("");
}

function productTypeTemplate(category) {
  const imgSrc = resolveImagePublicPath(`../images/category-${category}.svg`);
  const imageTag = `
        <img
          src="${imgSrc}"
          alt="${category}"
        />
      `;
  return `
            <li>
                <a href="product_listing/?category=${category}">
                    ${imageTag}
                    <h2>${capitalizeFirst(category)}</h2>
                </a>
            </li>
    `;
}

async function init() {
  await loadHeaderFooter();
  getCartCount();
  createProductTypes(categories);
}
init();
