import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, getCartCount } from "./utils.mjs";

getCartCount();

const category = getParam("category");

const dataSource = new ProductData(category);

const element = document.querySelector(".product-list");

const productList = new ProductList(category, dataSource, element);

productList.init();
