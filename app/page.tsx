"use client";

import Link from "next/link";

const featuredProducts = [
  {
    id: "1",
    name: "Mega Gardevoir ex",
    category: "Single Card",
    price: "$280",
    image: "https://images.pokemontcg.io/me1/178_hires.png",
  },
  {
    id: "2",
    name: "Mega Latias ex",
    category: "Single Card",
    price: "$2",
    image: "https://images.pokemontcg.io/me1/100_hires.png",
  },
  {
    id: "3",
    name: "Vulpix",
    category: "Single Card",
    price: "$22.99",
    image: "https://images.pokemontcg.io/me1/138_hires.png",
  },
  {
    id: "4",
    name: "Swadloon",
    category: "Single Card",
    price: "$6.99",
    image: "https://images.pokemontcg.io/rsv10pt5/88_hires.png",
  },
  {
    id: "5",
    name: "Emboar",
    category: "Single Card",
    price: "$8.99",
    image: "https://images.pokemontcg.io/rsv10pt5/98_hires.png",
  },
  {
    id: "6",
    name: "Keldeo ex",
    category: "Single Card",
    price: "$75.99",
    image: "https://images.pokemontcg.io/rsv10pt5/167_hires.png",
  },
  {
    id: "7",
    name: "Oshawott",
    category: "Single Card",
    price: "$80.99",
    image: "https://images.pokemontcg.io/rsv10pt5/105_hires.png",
  },
  {
    id: "8",
    name: "Zorua",
    category: "Single Card",
    price: "$40",
    image: "https://images.pokemontcg.io/rsv10pt5/142_hires.png",
  },
  {
    id: "9",
    name: "Hilda",
    category: "Single Card",
    price: "$12",
    image: "https://images.pokemontcg.io/rsv10pt5/164_hires.png",
  },
  {
    id: "10",
    name: "Bouffalant ex",
    category: "Single Card",
    price: "$25",
    image: "https://images.pokemontcg.io/rsv10pt5/170_hires.png",
  },
];

export default function HomePage() {
  const carouselItems = [...featuredProducts, ...featuredProducts];

  return (
    <main className="bg-black text-white">
      <section className="relative flex min-h-[80vh] items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-500/5" />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            Buy, Sell & Collect
            <span className="block text-yellow-400">Pokémon Cards</span>
          </h1>

          <p className="mt-6 text-lg text-zinc-400 md:text-xl">
            Shop premium singles, booster packs, and elite trainer boxes.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/shop" className="btn-primary px-8 py-3 text-base">
              Shop Now
            </Link>

            <Link href="/shop" className="btn-secondary px-8 py-3 text-base">
              View Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
                Featured Products
              </p>
              <h2 className="mt-2 text-3xl font-bold text-white">
                Hot Stock at AlturaCards
              </h2>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/70 py-6">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-black to-transparent" />

            <div className="featured-track flex w-max gap-6 px-6 group-hover:[animation-play-state:paused]">
              {carouselItems.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="card w-[240px] shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-black"
                >
                  <div className="flex aspect-[3/4] items-center justify-center bg-zinc-900 p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
                      {product.category}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-white">
                      {product.name}
                    </h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-yellow-400">
                        {product.price}
                      </span>
                      <Link
                        href="/shop"
                        className="rounded-full border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition hover:border-yellow-400 hover:text-white"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .featured-track {
          animation: scrollFeatured 40s linear infinite;
        }

        @keyframes scrollFeatured {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 12px));
          }
        }
      `}</style>
    </main>
  );
}