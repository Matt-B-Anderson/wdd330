import{g as o}from"./utils-DO4b2wXX.js";/* empty css              */function n(){const a=o("so-cart"),t=a.map(r=>l(r));document.querySelector(".product-list").innerHTML=t.join("");const c=a.reduce((r,e)=>r+e.FinalPrice,0);a.length>0&&(document.querySelector(".total").innerHTML=`Total: $${c}`)}function l(a){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${a.Image}"
      alt="${a.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${a.Name}</h2>
  </a>
  <p class="cart-card__color">${a.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${a.FinalPrice}</p>
</li>`}n();
