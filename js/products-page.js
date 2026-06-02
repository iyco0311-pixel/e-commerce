import { products } from "./data.js";
import { addToCart } from "./cart.js";

const grid = document.querySelector("#grid");

grid.innerHTML = products
  .map((product) => {
    return `
      <article class="product-card">
        <div class="product-image" aria-label="${product.name}">
          ${product.emoji}
        </div>

        <div class="card-body">
          <h2 class="card-title">${product.name}</h2>
          <p class="card-description">${product.description}</p>
          <p class="card-price">${product.price} SEK</p>

          <div class="card-actions">
            <a class="button" href="./product.html?id=${encodeURIComponent(product.id)}">
              View details
            </a>

            <button data-id="${product.id}">
              Add to cart
            </button>
          </div>
        </div>
      </article>
    `;
  })
  .join("");

grid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");

  if (!button) {
    return;
  }

  addToCart(button.dataset.id, 1);
  button.textContent = "Added";
});