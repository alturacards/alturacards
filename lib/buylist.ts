export type BuylistCategory = "Single" | "Graded" | "Sealed";

export type BuylistItem = {
  id: string;
  name: string;
  set: string;
  number: string;
  rarity: string;
  image: string;
  cashPrice: number;
  category: BuylistCategory;
};

export const buylistItems: BuylistItem[] = [
  {
    id: "1",
    name: "Archeops",
    set: "White Flare",
    number: "51/86",
    rarity: "Rare",
    image: "https://images.pokemontcg.io/rsv10pt5/51_hires.png",
    cashPrice: 1.50,
    category: "Single",
  },
  {
    id: "2",
    name: "Sewaddle",
    set: "White Flare",
    number: "87/86",
    rarity: "Illustration Rare",
    image: "https://images.pokemontcg.io/rsv10pt5/87_hires.png",
    cashPrice: 15,
    category: "Single",
  },
  {
    id: "3",
    name: "Leavanny",
    set: "White Flare",
    number: "89/86",
    rarity: "Illustration Rare",
    image: "https://images.pokemontcg.io/rsv10pt5/89_hires.png",
    cashPrice: 28,
    category: "Single",
  },
  {
    id: "4",
    name: "Cottonee",
    set: "White Flare",
    number: "90/86",
    rarity: "Illustraion Rare",
    image: "https://images.pokemontcg.io/rsv10pt5/90_hires.png",
    cashPrice: 12.50,
    category: "Single",
  },
  {
    id: "5",
    name: "Bulbasaur",
    set: "151 Japanese",
    number: "166/165",
    rarity: "Art Rare",
    image: "https://public.getcollectr.com/public-assets/products/product_10012089.png?optimizer=image&format=webp&width=1200&quality=80&strip=metadata",
    cashPrice: 25,
    category: "Single",
  },
  {
    id: "6",
    name: "Venusaur",
    set: "151 Japanese",
    number: "168/165",
    rarity: "Art Rare",
    image: "https://public.getcollectr.com/public-assets/products/product_10012123.png?optimizer=image&format=webp&width=1200&quality=80&strip=metadata",
    cashPrice: 130,
    category: "Graded",
  },
];