import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert";
import { getCartCount } from "./utils.mjs";

getCartCount();

const alertList = new Alert("alerts");
alertList.init();

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();
