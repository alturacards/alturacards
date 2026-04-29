export type ProductCategory = "Single Card" | "Booster Pack" | "Bundle" | "ETB";

export type InventoryProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  set?: string;
  price: number;
  image: string;
  inventory: number;
};

export const INVENTORY_STORAGE_KEY = "alturacards_inventory";

export function getInventoryFromStorage(): InventoryProduct[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.category === "string" &&
        typeof item.price === "number" &&
        typeof item.image === "string" &&
        typeof item.inventory === "number"
    );
  } catch {
    return [];
  }
}

export function saveInventoryToStorage(products: InventoryProduct[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(products));
}