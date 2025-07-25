import { loadHeaderFooter } from "./utils.mjs";
import ProcessCheckout from "./ProcessCheckout.mjs";

loadHeaderFooter();

const order = new ProcessCheckout("so-cart", ".checkout-summary");
order.init();

document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  order.checkout();
});