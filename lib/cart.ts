export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const CART_KEY = "alturacards_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find((c) => c.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
}