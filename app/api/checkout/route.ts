import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(secretKey);

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cart = body?.cart as CartItem[];

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or invalid" },
        { status: 400 }
      );
    }

    const validItems = cart.filter(
      (item) =>
        item &&
        typeof item.name === "string" &&
        item.name.trim().length > 0 &&
        typeof item.price === "number" &&
        Number.isFinite(item.price) &&
        item.price > 0 &&
        typeof item.quantity === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );

    if (validItems.length === 0) {
      return NextResponse.json(
        { error: "No valid cart items found" },
        { status: 400 }
      );
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: validItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "aud",
          product_data: {
            name: item.name,
            ...(item.image ? { images: [item.image] } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
      })),
      success_url: `${origin}/cart?success=true`,
      cancel_url: `${origin}/cart`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "No checkout URL returned from Stripe" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create checkout session",
      },
      { status: 500 }
    );
  }
}