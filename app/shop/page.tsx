"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { addToCart } from "@/lib/cart";

type ProductCategory = "SINGLE_CARD" | "BOOSTER_PACK" | "BUNDLE" | "ETB";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  set?: string;
  rarity?: string;
  quantity: number;
  category: ProductCategory;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to load products");
        }

        const data = await res.json();

        const normalized: Product[] = Array.isArray(data)
          ? data
              .filter((item) => Number(item.quantity) > 0)
              .map((item) => ({
                id: String(item.id),
                name: String(item.name),
                price: Number(item.price),
                image: String(item.image || "/placeholder-card.png"),
                set: String(item.set || "Unknown Set"),
                rarity: String(item.rarity || "Unknown Rarity"),
                quantity: Number(item.quantity),
                category: String(item.category || "SINGLE_CARD") as ProductCategory,
              }))
          : [];

        setProducts(normalized);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "ALL"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setMessage(`${product.name} added to cart`);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Shop</h1>
            <p className="mt-2 text-zinc-400">
              Browse our latest cards and sealed products.
            </p>
          </div>

          <div className="w-full md:w-64">
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Filter by category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            >
              <option value="ALL">All Products</option>
              <option value="SINGLE_CARD">Single Cards</option>
              <option value="BOOSTER_PACK">Booster Packs</option>
              <option value="BUNDLE">Bundles</option>
              <option value="ETB">ETBs</option>
            </select>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-green-300">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-zinc-400">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center text-zinc-400">
            No products found in this category.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-lg transition duration-300 hover:scale-[1.03] hover:border-yellow-500/50"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2 transition duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="p-4">
                  <h2 className="line-clamp-2 text-lg font-semibold">
                    {product.name}
                  </h2>

                  <div className="mt-2 space-y-1 text-sm text-zinc-400">
                    <p>Set: {product.set}</p>
                    <p>Rarity: {product.rarity}</p>
                    <p>Stock: {product.quantity}</p>
                  </div>

                  <p className="mt-4 text-xl font-bold text-yellow-400">
                    ${product.price.toFixed(2)}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full rounded-xl bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:bg-yellow-400"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}