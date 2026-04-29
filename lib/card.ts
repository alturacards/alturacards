export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  set?: string;
};

export const CART_KEY = "alturacards-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to read cart:", error);
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(item: CartItem) {
  if (typeof window === "undefined") return;

  const cart = getCart();
  const existing = cart.find((cartItem) => cartItem.id === item.id);

  let updatedCart: CartItem[];

  if (existing) {
    updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
        : cartItem
    );
  } else {
    updatedCart = [...cart, item];
  }

  saveCart(updatedCart);
  window.dispatchEvent(new Event("cart-updated"));
}