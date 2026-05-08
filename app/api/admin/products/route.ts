import { NextResponse } from "next/server";
import { PriceSource, ProductCategory } from "@prisma/client";
import { prisma } from "@/lib/prisma";

function normalizeCategory(category: string): ProductCategory {
  switch (category) {
    case "Single Card":
    case "SINGLE_CARD":
      return ProductCategory.SINGLE_CARD;
    case "Booster Pack":
    case "BOOSTER_PACK":
      return ProductCategory.BOOSTER_PACK;
    case "Bundle":
    case "BUNDLE":
      return ProductCategory.BUNDLE;
    case "ETB":
      return ProductCategory.ETB;
    default:
      return ProductCategory.SINGLE_CARD;
  }
}

export async function GET() {
  try {
    const items = await prisma.inventoryItem.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      items.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.currentPrice ?? 0),
        image: item.imageUrl,
        set: item.setName ?? "Unknown Set",
        rarity: item.rarity ?? "Unknown Rarity",
        stock: item.inventory ?? 0,
        quantity: item.inventory ?? 0,
        category: item.category,
        featured: item.featured,
      }))
    );
  } catch (error) {
    console.error("Failed to load admin products:", error);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !(body.imageUrl || body.image)) {
      return NextResponse.json(
        { error: "Name and image URL are required" },
        { status: 400 }
      );
    }

    const product = await prisma.inventoryItem.create({
      data: {
        name: body.name,
        category: normalizeCategory(body.category),
        imageUrl: body.imageUrl || body.image,
        currentPrice: Number(body.currentPrice || body.price || 0),
        manualPrice: Number(body.manualPrice || body.price || 0),
        inventory: Number(body.inventory || body.quantity || body.stock || 0),
        priceSource: PriceSource.MANUAL,
        setName: body.setName || body.set || null,
        cardNumber: body.cardNumber || null,
        rarity: body.rarity || null,
        description: body.description || null,
        featured: Boolean(body.featured),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to save product:", error);
    return NextResponse.json(
      { error: "Failed to save product" },
      { status: 500 }
    );
  }
}