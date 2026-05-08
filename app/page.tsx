"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
  set?: string;
  setName?: string;
  rarity?: string;
  quantity?: number;
  inventory?: number;
  featured?: boolean;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to load products");
        }

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Featured products error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const featuredProducts = useMemo(() => {
    return products.filter((product) => {
      const stock = product.quantity ?? product.inventory ?? 0;
      return product.featured === true && stock > 0;
    });
  }, [products]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-zinc-950 to-black p-8 shadow-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            AlturaCards
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            Buy and sell Pokémon cards with confidence.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-zinc-300">
            Shop singles, sealed products, bundles and featured cards from our
            live inventory.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
            >
              Shop Now
            </Link>

            <Link
              href="/sell"
              className="rounded-full border border-yellow-400 px-6 py-3 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              Sell Your Cards
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
              Live Inventory
            </p>
            <h2 className="mt-2 text-3xl font-bold">Featured Products</h2>
          </div>

          <Link href="/shop" className="text-sm font-semibold text-yellow-400">
            View all
          </Link>
        </div>

        {loading ? (
          <p className="text-zinc-400">Loading featured products...</p>
        ) : featuredProducts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-zinc-400">
            No featured products are currently in stock.
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="flex w-max animate-scroll gap-6 hover:[animation-play-state:paused]">
              {[...featuredProducts, ...featuredProducts].map(
                (product, index) => {
                  const image = product.imageUrl || product.image || "";
                  const setName = product.setName || product.set || "Pokémon TCG";
                  const stock = product.quantity ?? product.inventory ?? 0;

                  return (
                    <Link
                      key={`${product.id}-${index}`}
                      href="/shop"
                      className="w-64 shrink-0 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 transition hover:border-yellow-400"
                    >
                      <div className="relative mb-4 h-72 w-full overflow-hidden rounded-xl bg-zinc-900">
                        {image ? (
                          <Image
                            src={image}
                            alt={product.name}
                            fill
                            sizes="256px"
                            className="object-contain p-3"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-zinc-500">
                            No image
                          </div>
                        )}
                      </div>

                      <h3 className="line-clamp-1 font-semibold text-white">
                        {product.name}
                      </h3>

                      <p className="mt-1 line-clamp-1 text-sm text-zinc-400">
                        {setName}
                      </p>

                      {product.rarity && (
                        <p className="mt-1 text-xs text-zinc-500">
                          {product.rarity}
                        </p>
                      )}

                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold text-yellow-400">
                          ${product.price.toFixed(2)}
                        </span>

                        <span className="text-xs text-zinc-400">
                          Stock: {stock}
                        </span>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}