import { NextResponse } from "next/server";

const inventory = [
  {
    id: "1",
    name: "Charizard ex",
    image: "https://images.pokemontcg.io/sv4pt5/54_hires.png",
    price: 149.99,
    set: "Paldean Fates",
    quantity: 3,
  },
  {
    id: "2",
    name: "Pikachu",
    image: "https://images.pokemontcg.io/base1/58_hires.png",
    price: 24.99,
    set: "Base Set",
    quantity: 5,
  },
  {
    id: "3",
    name: "Mew ex",
    image: "https://images.pokemontcg.io/sv3pt5/151_hires.png",
    price: 89.99,
    set: "151",
    quantity: 0,
  },
];

export async function GET() {
  try {
    return NextResponse.json(inventory);
  } catch (error) {
    console.error("Inventory API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory" },
      { status: 500 }
    );
  }
}