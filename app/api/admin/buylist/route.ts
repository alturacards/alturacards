import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.buylistItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to load buylist:", error);

    return NextResponse.json(
      { error: "Failed to load buylist" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const item = await prisma.buylistItem.create({
      data: {
        name: body.name,
        setName: body.setName || null,
        cardNumber: body.cardNumber || null,
        rarity: body.rarity || null,
        imageUrl: body.imageUrl,
        buyPrice: Number(body.buyPrice || 0),
        acceptsMint: Boolean(body.acceptsMint),
        acceptsNearMint: Boolean(body.acceptsNearMint),
        active: Boolean(body.active),
        featured: Boolean(body.featured),
        description: body.description || null,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Failed to create buylist item:", error);

    return NextResponse.json(
      { error: "Failed to create buylist item" },
      { status: 500 }
    );
  }
}