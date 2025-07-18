import Alert from "./Alert";
import {
  getCartCount,
  resolveImagePublicPath,
  capitalizeFirst,
} from "./utils.mjs";

getCartCount();

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

createProductTypes(categories);
