export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Overview",
      content:
        "This Privacy Policy explains how AlturaCards collects, uses, stores, and discloses your personal information when you visit our website or make a purchase from us.",
    },
    {
      title: "2. What Information We Collect",
      bullets: [
        "Name",
        "Email address",
        "Phone number",
        "Billing and shipping address",
        "Order and purchase details",
        "Payment-related information processed by our payment providers",
        "Device, browser, and website usage information",
      ],
    },
    {
      title: "3. How We Collect Information",
      bullets: [
        "When you place an order",
        "When you contact us",
        "When you subscribe to updates or marketing",
        "When you browse our website",
        "Through cookies or similar technologies",
      ],
    },
    {
      title: "4. How We Use Your Information",
      bullets: [
        "To process and fulfil orders",
        "To provide customer support",
        "To send order confirmations and shipping updates",
        "To improve our website, services, and product offerings",
        "To detect fraud, misuse, or unauthorised activity",
        "To send marketing communications where permitted or where you have opted in",
      ],
    },
    {
      title: "5. Payments",
      content:
        "We use third-party payment providers to process payments securely. We do not store your full card or payment details on our servers unless expressly stated otherwise.",
    },
    {
      title: "6. Cookies and Analytics",
      content:
        "We may use cookies, analytics tools, and similar technologies to understand how visitors use our website, remember preferences, and improve performance. You can usually control cookies through your browser settings.",
    },
    {
      title: "7. Disclosure of Personal Information",
      bullets: [
        "Payment processors",
        "Shipping and delivery providers",
        "Website hosting and technology providers",
        "Professional advisers where reasonably necessary",
        "Authorities or regulators where required by law",
      ],
    },
    {
      title: "8. Storage and Security",
      content:
        "We take reasonable steps to protect personal information from misuse, interference, loss, unauthorised access, modification, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.",
    },
    {
      title: "9. Access and Correction",
      content:
        "You may request access to the personal information we hold about you, and you may ask us to correct inaccurate, incomplete, or outdated information, subject to any legal exceptions.",
    },
    {
      title: "10. Marketing Communications",
      content:
        "If you subscribe to marketing updates, you can unsubscribe at any time using the unsubscribe link in our emails or by contacting us directly.",
    },
    {
      title: "11. Third-Party Links",
      content:
        "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties.",
    },
    {
      title: "12. International Services",
      content:
        "Some of our service providers may store or process information outside Australia. Where this occurs, we will take reasonable steps to ensure your information is handled appropriately.",
    },
    {
      title: "13. Children’s Privacy",
      content:
        "Our website is not directed to children under 13, and we do not knowingly collect personal information from children without appropriate consent where required.",
    },
    {
      title: "14. Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. The latest version will always be published on this page with the updated effective date.",
    },
    {
      title: "15. Contact Us",
      content:
        "If you have any questions about this Privacy Policy or wish to request access or correction of your personal information, please contact us using the details on our website.",
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
            Privacy Policy
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">
            This page explains how AlturaCards handles personal information when
            you use our website, place an order, or contact us.
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