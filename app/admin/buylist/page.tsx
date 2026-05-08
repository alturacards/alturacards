"use client";

import { useState } from "react";

export default function AdminBuylistPage() {
  const [form, setForm] = useState({
    name: "",
    setName: "",
    cardNumber: "",
    rarity: "",
    imageUrl: "",
    buyPrice: "",
    acceptsMint: true,
    acceptsNearMint: true,
    active: true,
    featured: false,
    description: "",
  });

  const [message, setMessage] = useState("");

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/admin/buylist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setMessage("Failed to add buylist card.");
      return;
    }

    setMessage("Buylist card added successfully.");

    setForm({
      name: "",
      setName: "",
      cardNumber: "",
      rarity: "",
      imageUrl: "",
      buyPrice: "",
      acceptsMint: true,
      acceptsNearMint: true,
      active: true,
      featured: false,
      description: "",
    });
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-yellow-400">
          Add Buylist Card
        </h1>

        <p className="mt-2 text-zinc-400">
          Add cards that customers can sell to AlturaCards.
        </p>

        {message && (
          <div className="mt-6 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-yellow-300">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3"
            placeholder="Card name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />

          <input
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3"
            placeholder="Set name"
            value={form.setName}
            onChange={(e) => updateField("setName", e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3"
            placeholder="Card number"
            value={form.cardNumber}
            onChange={(e) => updateField("cardNumber", e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3"
            placeholder="Rarity"
            value={form.rarity}
            onChange={(e) => updateField("rarity", e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => updateField("imageUrl", e.target.value)}
            required
          />

          <input
            type="number"
            step="0.01"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3"
            placeholder="Buy price AUD"
            value={form.buyPrice}
            onChange={(e) => updateField("buyPrice", e.target.value)}
            required
          />

          <textarea
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3"
            placeholder="Description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={form.acceptsMint}
              onChange={(e) => updateField("acceptsMint", e.target.checked)}
            />
            Accept Mint
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={form.acceptsNearMint}
              onChange={(e) =>
                updateField("acceptsNearMint", e.target.checked)
              }
            />
            Accept Near Mint
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => updateField("active", e.target.checked)}
            />
            Active
          </label>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => updateField("featured", e.target.checked)}
            />
            Featured
          </label>

          <button className="w-full rounded-xl bg-yellow-500 px-4 py-3 font-bold text-black hover:bg-yellow-400">
            Add to Buylist
          </button>
        </form>
      </div>
    </main>
  );
}