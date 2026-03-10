import { getCart, removeFromCart } from "./cart.js";

const itemsEl = document.querySelector("#items");
const totalEl = document.querySelector("#total");

function render() {
  // Get the current cart contents
  const cart = getCart();

  // If the cart is empty, display a message and return early
  if (cart.length === 0) {
    itemsEl.textContent = "Your cart is empty.";
    totalEl.textContent = "Total items: 0";
    return;
  }

  // Render each cart item as a div with a remove button
  itemsEl.innerHTML = cart
    .map(
      (item) => `
        <div>
          ${item.id} × ${item.qty}
          <button data-remove="${item.id}">Remove</button>
        </div>
      `
    )
    .join("");

  // Calculate and display the total quantity of items in the cart
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  totalEl.textContent = `Total items: ${totalQty}`;
}

// Add a click event listener to the items container to handle remove button clicks
itemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-remove]");
  if (!btn) return;

  // Remove the item from the cart using its id and re-render the cart
  removeFromCart(btn.dataset.remove);
  render();
});

// Initial render of the cart page
render();