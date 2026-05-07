import { NextResponse } from "next/server";
import { CardCondition } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  sendSellSubmissionConfirmationEmail,
  sendAdminNotificationEmail,
} from "@/lib/email";

type SellSubmissionItem = {
  buylistItemId: string;
  name: string;
  setName?: string;
  cardNumber?: string;
  condition: CardCondition;
  quantity: number;
  estimatedPrice: number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      customerName,
      customerEmail,
      phone,
      notes,
      items,
    }: {
      customerName: string;
      customerEmail: string;
      phone?: string;
      notes?: string;
      items: SellSubmissionItem[];
    } = body;

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Customer name and email are required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "At least one card is required." },
        { status: 400 }
      );
    }

    const validItems = items.filter(
      (item) =>
        item.buylistItemId &&
        item.name &&
        item.condition &&
        Number(item.quantity) > 0 &&
        Number(item.estimatedPrice) > 0
    );

    if (validItems.length === 0) {
      return NextResponse.json(
        { error: "No valid cards were submitted." },
        { status: 400 }
      );
    }

    const estimatedTotal = validItems.reduce((total, item) => {
      return total + Number(item.estimatedPrice) * Number(item.quantity);
    }, 0);

    if (estimatedTotal < 50) {
      return NextResponse.json(
        { error: "Minimum sell submission value is $50 AUD." },
        { status: 400 }
      );
    }

    const totalCards = validItems.reduce((total, item) => {
      return total + Number(item.quantity);
    }, 0);

    const buylistId = `ALT-${Date.now()}`;

    const submission = await prisma.sellSubmission.create({
      data: {
        buylistId,
        fullName: customerName,
        email: customerEmail,
        phone: phone || null,
        notes: notes || null,
        estimatedTotal,
        status: "PENDING",
        items: {
          create: validItems.map((item) => {
            const quantity = Number(item.quantity);
            const offeredBuyPrice = Number(item.estimatedPrice);

            return {
              buylistItemId: item.buylistItemId,
              cardName: item.name,
              setName: item.setName || null,
              cardNumber: item.cardNumber || null,
<<<<<<< HEAD
               condition: item.condition as CardCondition,
=======
              condition: item.condition,
>>>>>>> 2caab91 (Fix cart suspense and build errors)
              quantity,
              offeredBuyPrice,
              lineTotal: offeredBuyPrice * quantity,
            };
          }),
        },
      },
      include: {
        items: true,
      },
    });

    await sendSellSubmissionConfirmationEmail({
      to: customerEmail,
      buylistId: submission.buylistId,
      totalCards,
      estimatedTotal,
    });

    await sendAdminNotificationEmail({
      subject: `New AlturaCards sell submission #${submission.buylistId}`,
      html: `
        <h1>New sell submission received</h1>

        <p><strong>Buylist ID:</strong> ${submission.buylistId}</p>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Total cards:</strong> ${totalCards}</p>
        <p><strong>Estimated total:</strong> $${estimatedTotal.toFixed(2)} AUD</p>

        <h2>Submitted cards</h2>
        <ul>
          ${submission.items
            .map(
              (item) => `
                <li>
                  ${item.quantity}x ${item.cardName}
                  ${item.setName ? ` — ${item.setName}` : ""}
                  ${item.cardNumber ? ` #${item.cardNumber}` : ""}
                  — ${item.condition}
                  — $${item.offeredBuyPrice.toFixed(2)} each
                  — Line total: $${item.lineTotal.toFixed(2)}
                </li>
              `
            )
            .join("")}
        </ul>

        ${notes ? `<h2>Customer notes</h2><p>${notes}</p>` : ""}
      `,
    });

    return NextResponse.json({
      success: true,
      buylistId: submission.buylistId,
      submission,
    });
  } catch (error) {
    console.error("Sell submission error:", error);

    return NextResponse.json(
      { error: "Failed to create sell submission." },
      { status: 500 }
    );
  }
}
