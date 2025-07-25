import { getCartCount, getParam, loadHeaderFooter } from "./utils.mjs";
import ProcessCheckout from "./ProcessCheckout.mjs";

async function init() {
    await loadHeaderFooter();
    getCartCount();
    let order;
    const orderId = getParam("orderId");
    const message = getParam("message");

    if (orderId?.length > 0 && message?.length > 0) {
        document.querySelector("#order-message").textContent = `${message}!`;
        document.querySelector("#order-id").textContent = `Order Id: ${orderId}`;
    } else {
        order = new ProcessCheckout("so-cart", ".checkout-summary");
        order.init();
    }
  

    document.querySelector("#zip")?.addEventListener("blur", order.calculateOrderTotal.bind(order));

    document.querySelector("#checkoutSubmit")?.addEventListener("click", (e) => {
        e.preventDefault();
        const myForm = document.forms[0];
        const chk_status = myForm.checkValidity();
        myForm.reportValidity();
        if (chk_status) {
            order.checkout();
        }
    });

}
init();

