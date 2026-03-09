const KEY = "cart";

function readCart() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function getCart() {
  return readCart();
}

export function addToCart(id, qty = 1) {
  const cart = readCart();
  const found = cart.find((item) => item.id === id);

  if (found) found.qty += qty;
  else cart.push({ id, qty });

  writeCart(cart);
}

export function removeFromCart(id) {
  const cart = readCart().filter((item) => item.id !== id);
  writeCart(cart);
}