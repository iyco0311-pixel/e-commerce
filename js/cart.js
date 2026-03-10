const KEY = "cart";
// Storage key used in localStorage

function readCart() {
  try {
    // Attempt to read the cart from localStorage
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    // If there's an error (e.g., invalid JSON), return an empty cart
    return [];
  }
}

function writeCart(cart) {
  // Write the cart back to localStorage as a JSON string
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function getCart() {
  // Public function to retrieve the current cart contents
  return readCart();
}

export function addToCart(id, qty = 1) {
  const cart = readCart();
  const found = cart.find((item) => item.id === id);

  // If the item is already in the cart, increase its quantity; otherwise, add a new item
  if (found) found.qty += qty;
  else cart.push({ id, qty });

  writeCart(cart);
}

export function removeFromCart(id) {
  // Remove the item with the specified id from the cart
  const cart = readCart().filter((item) => item.id !== id);
  writeCart(cart);
}