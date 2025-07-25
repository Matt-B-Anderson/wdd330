// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// get url params
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  remove = false,
) {
  const htmlStrings = list.map(template);
  if (remove) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");

  const headerElement = document.querySelector("#main-header");

  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}

export function resolveImagePublicPath(path) {
  const clean = path.replace(/^(\.\.\/)+/, "");
  return import.meta.env.BASE_URL + clean;
}

export function getCartCount() {
  const cartItems = getLocalStorage("so-cart");
  document.querySelector(".cart-count").textContent = cartItems?.length ?? 0;
}

export function getDiscount(SuggestedRetailPrice, FinalPrice) {
  if (!SuggestedRetailPrice) return 0;
  const discountPercent =
    ((SuggestedRetailPrice - FinalPrice) / SuggestedRetailPrice) * 100;
  return Number(discountPercent.toFixed(2));
}

export function getDiscountBadge(discount) {
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

  return discountBadge;
}

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(path) {
  const res = await fetch(path);
  const data = await convertToJson(res);
  return data.Result;
}

export function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}