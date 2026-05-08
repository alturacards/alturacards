export default function TermsPage() {
  const sections = [
    {
      title: "1. Overview",
      content:
        "These Terms and Conditions govern your use of the AlturaCards website and services. By accessing our website or purchasing from us, you agree to be bound by these Terms.",
    },
    {
      title: "2. Business Information",
      content:
        "AlturaCards is an online retailer based in Melbourne, Australia, specialising in trading cards and related products.",
    },
    {
      title: "3. Products and Availability",
      bullets: [
        "All products listed are subject to availability.",
        "We reserve the right to limit quantities or discontinue products at any time.",
        "Product descriptions and images are for illustrative purposes only.",
      ],
    },
    {
      title: "4. Pricing",
      bullets: [
        "All prices are listed in AUD (Australian Dollars).",
        "Prices may change without notice.",
        "We reserve the right to correct pricing errors at any time.",
      ],
    },
    {
      title: "5. Orders",
      bullets: [
        "Once an order is placed, you will receive a confirmation email.",
        "We reserve the right to cancel or refuse any order for any reason, including suspected fraud, stock issues, or pricing errors.",
      ],
    },
    {
      title: "6. Payments",
      bullets: [
        "Payments are processed securely via third-party providers.",
        "We do not store your full payment details.",
        "Orders will not be dispatched until payment is confirmed.",
      ],
    },
    {
      title: "7. Shipping",
      bullets: [
        "We ship Australia-wide and may offer international shipping.",
        "Shipping times are estimates only and are not guaranteed.",
        "AlturaCards is not responsible for delays caused by couriers, customs, or events outside our control.",
      ],
    },
    {
      title: "8. Returns and Refunds",
      bullets: [
        "Returns may be accepted within 14 days of delivery, subject to eligibility.",
        "Items must be unused and in original condition.",
        "Sealed products cannot be returned once opened unless required by law.",
        "Refunds will be processed after the item is received and inspected.",
        "Shipping costs are non-refundable unless the item is faulty or incorrect.",
      ],
    },
    {
      title: "9. Damaged or Incorrect Items",
      content:
        "If you receive a damaged or incorrect item, please contact us within 48 hours of delivery with clear photos and your order details. We will review the issue and arrange a suitable resolution.",
    },
    {
      title: "10. Pre-Orders",
      bullets: [
        "Pre-order items will be shipped once stock becomes available.",
        "Release dates may change without notice.",
        "Pre-order cancellations may be refused or subject to a fee where permitted by law.",
      ],
    },
    {
      title: "11. Authenticity",
      content:
        "We aim to ensure that all products sold are genuine and sourced from reputable distributors, suppliers, or collections.",
    },
    {
      title: "12. Limitation of Liability",
      bullets: [
        "To the maximum extent permitted by law, AlturaCards is not liable for indirect, incidental, or consequential losses.",
        "Our total liability in relation to any product or order is limited to the amount paid for that product or order, except where liability cannot be excluded by law.",
      ],
    },
    {
      title: "13. Intellectual Property",
      content:
        "All content on this website, including logos, branding, graphics, text, and design elements, is owned by or licensed to AlturaCards and must not be used without prior written permission.",
    },
    {
      title: "14. Privacy",
      content:
        "Your personal information is handled in accordance with our Privacy Policy.",
    },
    {
      title: "15. Governing Law",
      content:
        "These Terms are governed by the laws of Victoria, Australia.",
    },
    {
      title: "16. Changes to Terms",
      content:
        "We reserve the right to update these Terms at any time. Continued use of the website after changes are published constitutes acceptance of the updated Terms.",
    },
    {
      title: "17. Contact Information",
      content:
        "If you have any questions about these Terms, please contact us using the details provided on our website.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-yellow-500/20 bg-gradient-to-b from-yellow-500/10 via-black to-black">
        <div className="mx-auto max-w-5xl px-6 py-16 md:px-8 md:py-20">
          <div className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-sm font-medium text-yellow-400">
            AlturaCards
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-yellow-400 md:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
            Please read these Terms and Conditions carefully before using the
            AlturaCards website or placing an order. By continuing to use this
            website, you agree to the terms set out below.
          </p>

          <p className="mt-4 text-sm text-white/50">
            Last Updated: April 19, 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold text-yellow-400">
                {section.title}
              </h2>

              {section.content && (
                <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
                  {section.content}
                </p>
              )}

              {section.bullets && (
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/75 md:text-base">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}