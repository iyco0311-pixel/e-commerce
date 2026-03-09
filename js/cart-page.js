import { getCart, removeFromCart } from "./cart.js";

const itemsEl = document.querySelector("#items");
const totalEl = document.querySelector("#total");

function render() {
  const cart = getCart();

  if (cart.length === 0) {
    itemsEl.textContent = "Your cart is empty.";
    totalEl.textContent = "Total items: 0";
    return;
  }

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

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  totalEl.textContent = `Total items: ${totalQty}`;
}

itemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-remove]");
  if (!btn) return;

  removeFromCart(btn.dataset.remove);
  render();
});

render();