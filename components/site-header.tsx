"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function SiteHeader() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-white">
          AlturaCards
        </Link>

        <nav className="hidden md:flex gap-6 text-sm text-slate-300">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/shop" className="hover:text-white transition">
            Shop
          </Link>
          <Link href="/cart" className="hover:text-white transition">
            Cart
          </Link>
        </nav>

        <Link
          href="/cart"
          className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300 transition"
        >
          Cart ({totalItems})
        </Link>
      </div>
    </header>
  );
}