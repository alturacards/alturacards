import { InventoryProduct } from "./inventory-types";

let inventory: InventoryProduct[] = [
  {
    id: "1",
    name: "Charizard ex",
    category: "Single Card",
    price: 249.99,
    stock: 3,
    image: "https://images.pokemontcg.io/sv3pt5/6_hires.png",
    description: "High-demand Charizard ex single.",
    setName: "151",
    cardNumber: "6/165",
    rarity: "Ultra Rare",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getInventory() {
  return inventory;
}

export function addProduct(product: InventoryProduct) {
  inventory.unshift(product);
}

export function updateProduct(id: string, updates: Partial<InventoryProduct>) {
  inventory = inventory.map((product) =>
    product.id === id
      ? {
          ...product,
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      : product
  );
}

export function deleteProduct(id: string) {
  inventory = inventory.filter((product) => product.id !== id);
}

export function getProductById(id: string) {
  return inventory.find((product) => product.id === id);
}