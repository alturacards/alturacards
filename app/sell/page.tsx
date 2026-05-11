"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type BuylistItem = {
  id: string;
  name: string;
  setName?: string | null;
  cardNumber?: string | null;
  rarity?: string | null;
  imageUrl: string;
  buyPrice: number;
  acceptsMint: boolean;
  acceptsNearMint: boolean;
  featured: boolean;
  description?: string | null;
};

type SelectedCard = {
  buylistItemId: string;
  quantity: number;
  condition: "MINT";
};

export default function SellPage() {
  const router = useRouter();

  const [buylistItems, setBuylistItems] = useState<BuylistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("Australia");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [selectedCards, setSelectedCards] = useState<
    Record<string, SelectedCard>
  >({});

  async function loadBuylist() {
    try {
      setLoading(true);

      const res = await fetch("/api/buylist", {
        cache: "no-store",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load buylist");
      }

      setBuylistItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load buylist:", error);
      alert(error instanceof Error ? error.message : "Failed to load buylist");
      setBuylistItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBuylist();
  }, []);

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return buylistItems;

    return buylistItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(term) ||
        (item.setName || "").toLowerCase().includes(term) ||
        (item.rarity || "").toLowerCase().includes(term) ||
        (item.cardNumber || "").toLowerCase().includes(term)
      );
    });
  }, [buylistItems, search]);

  const selectedEntries = useMemo(() => {
    return Object.values(selectedCards).filter((entry) => entry.quantity > 0);
  }, [selectedCards]);

  const selectedItemsDetailed = useMemo(() => {
    return selectedEntries
      .map((entry) => {
        const item = buylistItems.find(
          (buylistItem) => buylistItem.id === entry.buylistItemId
        );

        if (!item) return null;

        return {
          ...entry,
          item,
          lineTotal: item.buyPrice * entry.quantity,
        };
      })
      .filter(Boolean) as Array<{
      buylistItemId: string;
      quantity: number;
      condition: "MINT";
      item: BuylistItem;
      lineTotal: number;
    }>;
  }, [selectedEntries, buylistItems]);

  const totalCards = selectedItemsDetailed.reduce(
    (sum, entry) => sum + entry.quantity,
    0
  );

  const estimatedTotal = selectedItemsDetailed.reduce(
    (sum, entry) => sum + entry.lineTotal,
    0
  );

  function increaseQuantity(itemId: string) {
    setSelectedCards((prev) => {
      const existing = prev[itemId];

      return {
        ...prev,
        [itemId]: {
          buylistItemId: itemId,
          quantity: existing ? existing.quantity + 1 : 1,
          condition: "MINT",
        },
      };
    });
  }

  function decreaseQuantity(itemId: string) {
    setSelectedCards((prev) => {
      const existing = prev[itemId];

      if (!existing) return prev;

      const newQuantity = existing.quantity - 1;

      if (newQuantity <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }

      return {
        ...prev,
        [itemId]: {
          ...existing,
          quantity: newQuantity,
        },
      };
    });
  }

  function setQuantity(itemId: string, quantity: number) {
    const safeQuantity = Math.max(0, Math.floor(quantity) || 0);

    setSelectedCards((prev) => {
      if (safeQuantity <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }

      return {
        ...prev,
        [itemId]: {
          buylistItemId: itemId,
          quantity: safeQuantity,
          condition: "MINT",
        },
      };
    });
  }

  async function handleSubmit() {
    const customerName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const customerEmail = email.trim();

    if (
      !customerName ||
      !customerEmail ||
      !addressLine1.trim() ||
      !city.trim() ||
      !stateRegion.trim() ||
      !postcode.trim() ||
      !country.trim() ||
      !phone.trim()
    ) {
      alert("Please complete all required contact and address fields.");
      return;
    }

    if (!agreed) {
      alert("Please agree to the sell submission terms before continuing.");
      return;
    }

    if (selectedItemsDetailed.length === 0) {
      alert("Please add at least one card to your submission.");
      return;
    }

    if (estimatedTotal < 50) {
      alert("Minimum sell submission value is $50 AUD.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        customerName,
        customerEmail,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim(),
        city: city.trim(),
        state: stateRegion.trim(),
        postcode: postcode.trim(),
        country: country.trim(),
        phone: phone.trim(),
        notes: notes.trim(),
        items: selectedItemsDetailed.map((entry) => ({
          buylistItemId: entry.buylistItemId,
          name: entry.item.name,
          setName: entry.item.setName,
          cardNumber: entry.item.cardNumber,
          condition: "MINT",
          quantity: entry.quantity,
          estimatedPrice: entry.item.buyPrice,
        })),
      };

      const res = await fetch("/api/sell-submission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit cards");
      }

      router.push(
        `/sell/success?buylistId=${encodeURIComponent(
          data?.buylistId || ""
        )}&total=${encodeURIComponent(
          String(data?.submission?.estimatedTotal || estimatedTotal)
        )}`
      );
    } catch (error) {
      console.error("Submission failed:", error);
      alert(error instanceof Error ? error.message : "Failed to submit cards");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-3xl border border-yellow-500/20 bg-zinc-950 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400/80">
              AlturaCards Buylist
            </p>

            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Sell Your Cards
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
              Browse the cards we are actively buying, check our offered prices,
              choose your quantities, and submit your sell request directly to
              AlturaCards.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <input
                type="email"
                placeholder="Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400 md:col-span-2"
              />

              <input
                type="text"
                placeholder="First Name *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400"
              />

              <input
                type="text"
                placeholder="Last Name *"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400"
              />

              <input
                type="text"
                placeholder="Address Line 1 *"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400 md:col-span-2"
              />

              <input
                type="text"
                placeholder="Address Line 2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400 md:col-span-2"
              />

              <input
                type="text"
                placeholder="City *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400"
              />

              <input
                type="text"
                placeholder="State / Region *"
                value={stateRegion}
                onChange={(e) => setStateRegion(e.target.value)}
                className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400"
              />

              <input
                type="text"
                placeholder="Postcode *"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400"
              />

              <input
                type="text"
                placeholder="Country *"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400"
              />

              <input
                type="tel"
                placeholder="Phone *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400 md:col-span-2"
              />

              <textarea
                placeholder="Additional notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400 md:col-span-2"
              />

              <label className="flex gap-3 rounded-2xl border border-zinc-800 bg-black p-4 text-sm leading-6 text-zinc-300 md:col-span-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-yellow-500"
                />

                <span>
                  I agree to submit my cards sorted in the same order as this
                  submission. I understand that incorrect condition, incorrect
                  card versions, or unsorted submissions may result in adjusted
                  payout or rejection.
                </span>
              </label>
            </div>
          </div>

          <aside className="rounded-3xl border border-yellow-500/20 bg-zinc-950 p-8">
            <h2 className="text-2xl font-bold text-yellow-400">
              Important Things to Know
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-300">
              <p>
                We are currently only accepting{" "}
                <span className="font-semibold text-yellow-300">Mint</span>{" "}
                cards.
              </p>

              <p>
                Minimum sell submission value is{" "}
                <span className="font-semibold text-yellow-300">$50 AUD</span>.
              </p>

              <p>
                Include your Buylist ID inside your package so we can identify
                your submission.
              </p>

              <p>
                Sort your cards in the same order as your submission to make
                processing faster.
              </p>

              <p>
                If the condition received does not match the stated condition,
                your final payout may be adjusted.
              </p>

              <p>
                <Link
                  href="/condition-guide"
                  className="font-semibold text-yellow-400 underline underline-offset-4 transition hover:text-yellow-300"
                >
                  Click here to check our card condition guide.
                </Link>
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}