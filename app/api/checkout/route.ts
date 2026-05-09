import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(stripeSecretKey);

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CustomerDetails = {
  name: string;
  address: string;
  phone: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const cart = body?.cart as CartItem[];
    const customer = body?.customer as CustomerDetails;

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or invalid" },
        { status: 400 }
      );
    }

    if (
      !customer ||
      typeof customer.name !== "string" ||
      typeof customer.address !== "string" ||
      typeof customer.phone !== "string" ||
      customer.name.trim().length === 0 ||
      customer.address.trim().length === 0 ||
      customer.phone.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Delivery details are required" },
        { status: 400 }
      );
    }

    const validItems = cart.filter((item) => {
      return (
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
    });

    if (validItems.length === 0) {
      return NextResponse.json(
        { error: "No valid cart items found" },
        { status: 400 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin");

    if (!siteUrl) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_SITE_URL" },
        { status: 500 }
      );
    }

    const totalAmount = validItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const cleanCustomer = {
      name: customer.name.trim(),
      address: customer.address.trim(),
      phone: customer.phone.trim(),
    };

    const order = await prisma.order.create({
      data: {
        totalAmount,
        currency: "aud",
        status: "PENDING",

        customerName: cleanCustomer.name,
        customerAddress: cleanCustomer.address,
        customerPhone: cleanCustomer.phone,

        items: {
          create: validItems.map((item) => ({
            name: item.name.trim(),
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.image || null,
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: validItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "aud",
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.name.trim(),
            ...(item.image ? { images: [item.image] } : {}),
          },
        },
      })),

      metadata: {
        orderId: order.id,
        customerName: cleanCustomer.name,
        customerAddress: cleanCustomer.address,
        customerPhone: cleanCustomer.phone,
      },

      success_url: `${siteUrl}/cart?success=true&orderId=${order.id}`,
      cancel_url: `${siteUrl}/cart?cancelled=true`,
    });

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        stripeSessionId: session.id,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "No checkout URL returned from Stripe" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: session.url,
    });
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