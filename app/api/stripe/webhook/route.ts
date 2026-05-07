import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing stripe-signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("❌ Webhook signature verification failed:", error);
    return new NextResponse("Webhook error", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        console.error("❌ Missing orderId metadata");
        return NextResponse.json({ received: true });
      }

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "PAID",
          customerEmail: session.customer_details?.email || null,
          stripeSessionId: session.id,
        },
      });

      console.log("✅ Order marked as PAID:", orderId);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook DB error:", error);
    return new NextResponse("Webhook DB error", { status: 500 });
  }
}