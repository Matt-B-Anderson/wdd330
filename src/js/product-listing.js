import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, getCartCount, loadHeaderFooter } from "./utils.mjs";

const category = getParam("category");

const dataSource = new ExternalServices();

const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

async function init() {
  await loadHeaderFooter();
  getCartCount();
  productList.init();
}
init();
