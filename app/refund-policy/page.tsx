export default function RefundPolicyPage() {
  const sections = [
    {
      title: "1. Overview",
      content:
        "At AlturaCards, we want customers to shop with confidence. This Refund Policy explains when you may be entitled to a refund, replacement, or other remedy.",
    },
    {
      title: "2. Australian Consumer Law",
      content:
        "Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. You may be entitled to a repair, replacement, refund, or compensation where required by law.",
    },
    {
      title: "3. Change of Mind",
      bullets: [
        "We may choose not to offer refunds for change-of-mind purchases.",
        "If we do accept a change-of-mind return, the item must be unused, unopened where applicable, and in original saleable condition.",
        "Any approved change-of-mind return may be subject to conditions, including return shipping at the customer’s cost.",
      ],
    },
    {
      title: "4. Damaged, Faulty, or Incorrect Items",
      bullets: [
        "If your item arrives damaged, faulty, or incorrect, please contact us as soon as possible.",
        "Please include your order number, a description of the issue, and clear photos where relevant.",
        "We will review the issue and provide an appropriate remedy in line with Australian Consumer Law.",
      ],
    },
    {
      title: "5. Sealed Products",
      bullets: [
        "Sealed products such as booster packs, boxes, tins, and other sealed trading card products are generally not eligible for return once opened, except where required by law.",
        "We do not accept returns based on pull rates, card contents, or expected value from sealed products.",
      ],
    },
    {
      title: "6. Single Cards and Collectibles",
      bullets: [
        "We aim to describe card condition as accurately as possible.",
        "Minor print variation, centering, or manufacturer imperfections may not qualify as faults.",
        "Please review item descriptions and images carefully before purchase.",
      ],
    },
    {
      title: "7. Graded Cards",
      bullets: [
        "Unless required by law, graded cards are generally sold as final sale.",
        "The assigned grade reflects the opinion of the grading company, not AlturaCards.",
        "We do not offer refunds because a customer disagrees with the assigned grade or expected resale value.",
      ],
    },
    {
      title: "8. Return Process",
      bullets: [
        "Contact us before sending any item back.",
        "If your return is approved, we will provide instructions for the return.",
        "Items sent back without prior approval may not be accepted.",
      ],
    },
    {
      title: "9. Refund Timing",
      content:
        "Approved refunds will be processed back to the original payment method where possible. Processing times may vary depending on your payment provider or financial institution.",
    },
    {
      title: "10. Shipping Costs",
      bullets: [
        "Original shipping fees are generally non-refundable for change-of-mind returns.",
        "Where an item is faulty, damaged, incorrect, or otherwise covered by your consumer rights, we will work with you on an appropriate outcome, which may include return shipping costs where required.",
      ],
    },
    {
      title: "11. Pre-Orders",
      bullets: [
        "Pre-order release dates may change due to supplier or distributor delays.",
        "We may decline cancellation requests for pre-orders unless required by law or unless otherwise stated at the time of purchase.",
      ],
    },
    {
      title: "12. Contact Us",
      content:
        "For refund or return enquiries, please contact us using the contact details provided on our website and include your order number and issue details.",
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
            Refund Policy
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
            This page explains our approach to returns, refunds, replacements,
            and customer remedies for cards, sealed products, and collectibles.
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

        <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-6">
          <h3 className="text-lg font-semibold text-yellow-400">
            Consumer Rights Notice
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
            Nothing in this policy excludes, restricts, or modifies rights you
            may have under the Australian Consumer Law.
          </p>
        </div>
      </section>
    </main>
  );
}