"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Cart", href: "/cart" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-yellow-500/20 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-yellow-400"
        >
          AlturaCards
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-yellow-400"
                    : "text-white/70 hover:text-yellow-400"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}