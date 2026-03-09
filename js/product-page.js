import { products } from "./data.js";
import { addToCart } from "./cart.js";

const detailEl = document.querySelector("#detail");

const id = new URLSearchParams(window.location.search).get("id");
const product = products.find((p) => p.id === id);

if (!product) {
  detailEl.textContent = "Product not found.";
} else {
  detailEl.innerHTML = `
    <h2>${product.name}</h2>
    <p>${product.price} SEK</p>
    <button id="addBtn">Add to cart</button>
  `;

  const addBtn = document.querySelector("#addBtn");
  addBtn.addEventListener("click", () => {
    addToCart(product.id, 1);
  });
}