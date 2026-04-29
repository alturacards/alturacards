export type ProductCategory = "Single Card" | "Booster Pack" | "Bundle" | "ETB";

export type InventoryProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  image: string;
  description?: string;
  setName?: string;
  cardNumber?: string;
  rarity?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
};