import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductCategory, PriceSource } from "@prisma/client";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function mapCategory(category: string): ProductCategory | null {
  switch (category) {
    case "Single Card":
      return "SINGLE_CARD";
    case "Booster Pack":
      return "BOOSTER_PACK";
    case "Bundle":
      return "BUNDLE";
    case "ETB":
      return "ETB";
    default:
      return null;
  }
}

function formatCategory(category: ProductCategory): string {
  switch (category) {
    case "SINGLE_CARD":
      return "Single Card";
    case "BOOSTER_PACK":
      return "Booster Pack";
    case "BUNDLE":
      return "Bundle";
    case "ETB":
      return "ETB";
  }
}

export async function GET(_req: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const item = await prisma.inventoryItem.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: item.id,
      name: item.name,
      category: formatCategory(item.category),
      price: item.currentPrice,
      stock: item.inventory,
      image: item.imageUrl,
      description: item.description,
      setName: item.setName,
      cardNumber: item.cardNumber,
      rarity: item.rarity,
      featured: item.featured,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  } catch (error) {
    console.error("Failed to load product:", error);
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const body = await req.json();

    const existing = await prisma.inventoryItem.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const category =
      body.category !== undefined
        ? mapCategory(body.category)
        : existing.category;

    if (!category) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const price =
      body.price !== undefined && body.price !== ""
        ? Number(body.price)
        : existing.currentPrice;

    const stock =
      body.stock !== undefined && body.stock !== ""
        ? Number(body.stock)
        : existing.inventory;

    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json(
        { error: "Price must be a valid number" },
        { status: 400 }
      );
    }

    if (!Number.isInteger(stock) || stock < 0) {
      return NextResponse.json(
        { error: "Stock must be a valid whole number" },
        { status: 400 }
      );
    }

    const updated = await prisma.inventoryItem.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        category,
        setName:
          body.setName !== undefined ? body.setName?.trim() || null : existing.setName,
        imageUrl: body.image ?? existing.imageUrl,
        inventory: stock,
        manualPrice: price,
        currentPrice: price,
        priceSource: PriceSource.MANUAL,
        description:
          body.description !== undefined
            ? body.description?.trim() || null
            : existing.description,
        cardNumber:
          body.cardNumber !== undefined
            ? body.cardNumber?.trim() || null
            : existing.cardNumber,
        rarity:
          body.rarity !== undefined
            ? body.rarity?.trim() || null
            : existing.rarity,
        featured:
          body.featured !== undefined
            ? Boolean(body.featured)
            : existing.featured,
      },
    });

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      category: formatCategory(updated.category),
      price: updated.currentPrice,
      stock: updated.inventory,
      image: updated.imageUrl,
      description: updated.description,
      setName: updated.setName,
      cardNumber: updated.cardNumber,
      rarity: updated.rarity,
      featured: updated.featured,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    await prisma.inventoryItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}