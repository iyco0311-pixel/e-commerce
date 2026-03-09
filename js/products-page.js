import { products } from "./data.js";
import { addToCart } from "./cart.js";

const grid = document.querySelector("#grid");

grid.innerHTML = products
  .map((p) => {
    return `
      <article class="card">
        <div class="card-body">
          <h2 class="card-title">${p.name}</h2>
          <p class="card-price">${p.price} SEK</p>
          <a class="btn" href="./product.html?id=${encodeURIComponent(p.id)}">View</a>
          <button class="btn" data-id="${p.id}">Add</button>
        </div>
      </article>
    `;
  })
  .join("");

grid.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;

  addToCart(btn.dataset.id, 1);
});