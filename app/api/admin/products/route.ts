import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatCategory(category: string): string {
  switch (category) {
    case "SINGLE_CARD":
      return "Single Card";
    case "BOOSTER_PACK":
      return "Booster Pack";
    case "BUNDLE":
      return "Bundle";
    case "ETB":
      return "ETB";
    default:
      return category;
  }
}

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
      category: formatCategory(String(item.category)),
      price: item.currentPrice,
      stock: item.inventory,
      image: item.imageUrl,
      description: item.description ?? "",
      setName: item.setName ?? "",
      cardNumber: item.cardNumber ?? "",
      rarity: item.rarity ?? "",
      featured: item.featured,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products failed:", error);

    return NextResponse.json(
      {
        error: "Failed to load public products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}