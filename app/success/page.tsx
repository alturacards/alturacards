import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export default async function SuccessPage(props: any) {
  const searchParams = await props.searchParams; // ✅ FIX HERE
  const sessionId = searchParams?.session_id;

  if (!sessionId) {
    return <div>No order found (no session id).</div>;
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer_details"],
  });

  const items = session.line_items?.data || [];

  return (
    <div style={{ padding: "40px" }}>
      <h1>✅ Payment Successful</h1>

      <h2>Order Summary</h2>

      <ul>
        {items.map((item: any, i: number) => (
          <li key={i}>
            {item.description} × {item.quantity} — $
            {(item.amount_total / 100).toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Total: ${(session.amount_total! / 100).toFixed(2)}</h3>
    </div>
  );
}