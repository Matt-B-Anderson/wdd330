import{r,a as i}from"./utils-DO4b2wXX.js";/* empty css              */import{P as c}from"./ProductData-cC1gb4nn.js";function n(t){return`
    <li class="product-card">
      <a href="product_pages/?products=${t.Id}">
        <img src="${i(t.Image)}" alt="${t.Name}">
        <h2>${t.Brand.Name}</h2>
        <h3>${t.Name}</h3>
        <p class="product-card__price">$${t.FinalPrice}</p>
      </a>
    </li>
    `}class o{constructor(e,a,s){this.category=e,this.dataSource=a,this.listElement=s}async init(){const e=await this.dataSource.getData();this.renderList(e)}renderList(e){r(n,this.listElement,e)}}const l=new c("tents"),m=document.querySelector(".product-list"),d=new o("Tents",l,m);d.init();
