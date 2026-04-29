"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Sell Your Cards", href: "/sell" },
    { name: "Cart", href: "/cart" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-yellow-500/20 bg-black/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold text-yellow-400">
          AlturaCards
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-yellow-400"
                    : "text-zinc-300 hover:text-yellow-300"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/sell"
            className="rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
          >
            Sell Now
          </Link>
        </div>
      </nav>
    </header>
  );
}