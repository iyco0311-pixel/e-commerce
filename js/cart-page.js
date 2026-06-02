import { products } from "./data.js";
import { getCart, removeFromCart } from "./cart.js";

const itemsEl = document.querySelector("#items");
const totalEl = document.querySelector("#total");

function render() {
  const cart = getCart();

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <p class="empty-cart">Your cart is empty.</p>
    `;
    totalEl.textContent = "Total items: 0";
    return;
  }

  itemsEl.innerHTML = cart
    .map((item) => {
      const product = products.find((productItem) => productItem.id === item.id);

      if (!product) {
        return "";
      }

      return `
        <article class="cart-item">
          <div>
            <h2>${product.name}</h2>
            <p>Quantity: ${item.qty}</p>
            <p>${product.price} SEK each</p>
          </div>

          <button data-remove="${item.id}">
            Remove
          </button>
        </article>
      `;
    })
    .join("");

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find((productItem) => productItem.id === item.id);

    if (!product) {
      return sum;
    }

    return sum + product.price * item.qty;
  }, 0);

  totalEl.textContent = `Total items: ${totalQty}. Total price: ${totalPrice} SEK`;
}

itemsEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-remove]");

  if (!button) {
    return;
  }

  removeFromCart(button.dataset.remove);
  render();
});

render();