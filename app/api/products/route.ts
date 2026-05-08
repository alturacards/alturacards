import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.inventoryItem.findMany({
      where: {
        inventory: {
          gt: 0,
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const products = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.currentPrice ?? 0),
      image: item.imageUrl,
      set: item.setName ?? "Unknown Set",
      rarity: item.rarity ?? "Unknown Rarity",
      quantity: item.inventory ?? 0,
      category: item.category,
      featured: item.featured,
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to load products:", error);

    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}