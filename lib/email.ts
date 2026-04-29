// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const from = process.env.EMAIL_FROM || "AlturaCards <onboarding@resend.dev>";
const adminEmail = process.env.ADMIN_EMAIL;

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

export async function sendOrderConfirmationEmail({
  to,
  orderId,
  items,
  total,
}: {
  to: string;
  orderId: string;
  items: OrderItem[];
  total: number;
}) {
  return resend.emails.send({
    from,
    to,
    subject: `AlturaCards order confirmation #${orderId}`,
    html: `
      <h1>Thanks for your order!</h1>
      <p>Your order has been received.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>

      <h2>Order summary</h2>
      <ul>
        ${items
          .map(
            (item) =>
              `<li>${item.quantity}x ${item.name} — $${(
                item.price * item.quantity
              ).toFixed(2)} AUD</li>`
          )
          .join("")}
      </ul>

      <p><strong>Total:</strong> $${total.toFixed(2)} AUD</p>
      <p>We’ll contact you if we need anything else.</p>
      <p>AlturaCards</p>
    `,
  });
}

export async function sendSellSubmissionConfirmationEmail({
  to,
  buylistId,
  totalCards,
  estimatedTotal,
}: {
  to: string;
  buylistId: string;
  totalCards: number;
  estimatedTotal: number;
}) {
  return resend.emails.send({
    from,
    to,
    subject: `AlturaCards sell submission received #${buylistId}`,
    html: `
      <h1>Sell submission received</h1>
      <p>Thanks for submitting your cards to AlturaCards.</p>

      <p><strong>Buylist ID:</strong> ${buylistId}</p>
      <p><strong>Total cards:</strong> ${totalCards}</p>
      <p><strong>Estimated total:</strong> $${estimatedTotal.toFixed(2)} AUD</p>

      <h2>Important</h2>
      <p>Please include your Buylist ID inside or on your package so we can identify your submission.</p>
      <p>If card conditions are not as stated, the final offer may be adjusted.</p>

      <p>AlturaCards</p>
    `,
  });
}

export async function sendAdminNotificationEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  if (!adminEmail) return;

  return resend.emails.send({
    from,
    to: adminEmail,
    subject,
    html,
  });
}