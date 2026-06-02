import { products } from "./data.js";
import { addToCart } from "./cart.js";

const detailEl = document.querySelector("#detail");

const id = new URLSearchParams(window.location.search).get("id");
const product = products.find((item) => item.id === id);

if (!product) {
  detailEl.innerHTML = `
    <section class="product-detail">
      <div class="detail-info">
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist.</p>
        <a class="button" href="./products.html">Back to products</a>
      </div>
    </section>
  `;
} else {
  detailEl.innerHTML = `
    <article class="product-detail">
      <div class="detail-image" aria-label="${product.name}">
        ${product.emoji}
      </div>

      <div class="detail-info">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p class="price">${product.price} SEK</p>

        <button id="addBtn">Add to cart</button>
        <p id="message" class="message"></p>

        <a href="./products.html">Back to products</a>
      </div>
    </article>
  `;

  const addBtn = document.querySelector("#addBtn");
  const messageEl = document.querySelector("#message");

  addBtn.addEventListener("click", () => {
    addToCart(product.id, 1);
    messageEl.textContent = `${product.name} has been added to your cart.`;
  });
}