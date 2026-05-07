"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type SubmissionItem = {
  id: string;
  cardName: string;
  setName?: string | null;
  quantity: number;
  condition: "MINT" | "NEAR_MINT";
  offeredBuyPrice: number;
  lineTotal: number;
};

type SubmissionResponse = {
  id: string;
  fullName: string;
  email: string;
  buylistId: string;
  notes?: string | null;
  status: string;
  estimatedTotal: number;
  createdAt: string;
  items: SubmissionItem[];
};

export default function SellSuccessPage() {
  const searchParams = useSearchParams();
  const buylistId = searchParams.get("buylistId");

  const [submission, setSubmission] = useState<SubmissionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSubmission() {
      if (!buylistId) {
        setError("Missing buylist ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await fetch(`/api/sell-submission/${buylistId}`, {
          cache: "no-store",
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.error || "Failed to load submission");
        }

        setSubmission(data);
      } catch (err) {
        console.error("Failed to load submission:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load submission"
        );
      } finally {
        setLoading(false);
      }
    }

    loadSubmission();
  }, [buylistId]);

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        {loading ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center text-zinc-400">
            Loading submission details...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-500/30 bg-zinc-950 p-10 text-center">
            <h1 className="text-3xl font-bold text-red-400">
              Unable to Load Submission
            </h1>
            <p className="mt-4 text-zinc-300">{error}</p>
            <div className="mt-8">
              <a
                href="/sell"
                className="inline-flex rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Back to Sell Page
              </a>
            </div>
          </div>
        ) : !submission ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center text-zinc-400">
            Submission not found.
          </div>
        ) : (
          <div className="space-y-8">
            <section className="rounded-3xl border border-yellow-500/20 bg-zinc-950 p-10">
              <h1 className="text-4xl font-bold text-yellow-400">
                Submission Successful
              </h1>

              <p className="mt-4 text-lg text-zinc-300">
                Thank you for submitting your cards to AlturaCards.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-black p-5">
                  <p className="text-sm text-zinc-400">Buylist ID</p>
                  <p className="mt-2 text-2xl font-bold text-yellow-400">
                    {submission.buylistId}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-black p-5">
                  <p className="text-sm text-zinc-400">Submission Status</p>
                  <p className="mt-2 text-2xl font-bold text-white">
                    {submission.status}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-black p-5">
                  <p className="text-sm text-zinc-400">Estimated Total</p>
                  <p className="mt-2 text-2xl font-bold text-yellow-400">
                    ${submission.estimatedTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-zinc-400">
                Please include your Buylist ID inside your package so we can
                identify your submission when your cards arrive.
              </p>
            </section>

            <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-2xl font-bold text-white">
                  Submitted Cards
                </h2>

                <div className="mt-6 space-y-4">
                  {submission.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-zinc-800 bg-black p-5"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {item.cardName}
                          </h3>

                          {item.setName && (
                            <p className="mt-1 text-sm text-zinc-400">
                              Set: {item.setName}
                            </p>
                          )}

                          <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-300">
                            <span className="rounded-full border border-zinc-700 px-3 py-1">
                              Condition:{" "}
                              {item.condition === "MINT"
                                ? "Mint"
                                : "Near Mint"}
                            </span>
                            <span className="rounded-full border border-zinc-700 px-3 py-1">
                              Quantity: {item.quantity}
                            </span>
                            <span className="rounded-full border border-zinc-700 px-3 py-1">
                              Price Each: ${item.offeredBuyPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="text-left md:text-right">
                          <p className="text-sm text-zinc-400">Line Total</p>
                          <p className="text-2xl font-bold text-yellow-400">
                            ${item.lineTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="h-fit rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-2xl font-bold text-white">
                  Submission Details
                </h2>

                <div className="mt-5 space-y-4 text-sm text-zinc-300">
                  <div className="rounded-2xl border border-zinc-800 bg-black p-4">
                    <p className="text-zinc-400">Submitted By</p>
                    <p className="mt-1 font-semibold text-white">
                      {submission.fullName}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-black p-4">
                    <p className="text-zinc-400">Email</p>
                    <p className="mt-1 font-semibold text-white">
                      {submission.email}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-black p-4">
                    <p className="text-zinc-400">Total Items</p>
                    <p className="mt-1 font-semibold text-white">
                      {submission.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}
                    </p>
                  </div>

                  {submission.notes && (
                    <div className="rounded-2xl border border-zinc-800 bg-black p-4">
                      <p className="text-zinc-400">Notes</p>
                      <p className="mt-1 whitespace-pre-wrap text-white">
                        {submission.notes}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t border-zinc-800 pt-5">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Estimated Payout</span>
                    <span className="text-xl font-bold text-yellow-400">
                      ${submission.estimatedTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="/"
                    className="inline-flex w-full justify-center rounded-2xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
                  >
                    Return Home
                  </a>
                </div>
              </aside>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}