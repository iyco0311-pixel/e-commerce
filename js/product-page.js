import { products } from "./data.js";
import { addToCart } from "./cart.js";

const detailEl = document.querySelector("#detail");

// Get the product ID from the URL query parameters and find the corresponding product
const id = new URLSearchParams(window.location.search).get("id");

// Find the product in the products array using the retrieved ID
const product = products.find((p) => p.id === id);

if (!product) {
  // If the product is not found, display a message
  detailEl.textContent = "Product not found.";
} else {
  // If the product is found, render its details and an "Add to cart" button
  detailEl.innerHTML = `
    <h2>${product.name}</h2>
    <p>${product.price} SEK</p>
    <button id="addBtn">Add to cart</button>
  `;

  // Add a click event listener to the "Add to cart" button to add the product to the cart
  const addBtn = document.querySelector("#addBtn");
  addBtn.addEventListener("click", () => {
    addToCart(product.id, 1);
  });
}