import { getParam, getCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

getCartCount();

const dataSource = new ProductData("tents");
const productId = getParam("products");

const product = new ProductDetails(productId, dataSource);
product.init();
