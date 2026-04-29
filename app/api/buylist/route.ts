import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.buylistItem.findMany({
      where: {
        active: true,
      },
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(
      items.map((item) => ({
        id: item.id,
        name: item.name,
        setName: item.setName,
        cardNumber: item.cardNumber,
        rarity: item.rarity,
        imageUrl: item.imageUrl,
        buyPrice: item.buyPrice,
        acceptsMint: item.acceptsMint,
        acceptsNearMint: item.acceptsNearMint,
        featured: item.featured,
        description: item.description,
      }))
    );
  } catch (error) {
    console.error("Failed to load buylist items:", error);

    return NextResponse.json(
      { error: "Failed to load buylist items" },
      { status: 500 }
    );
  }
}