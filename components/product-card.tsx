"use client";

import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/card";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl shadow-slate-950/40 transition hover:-translate-y-1 hover:border-amber-400/40">
      <div className="w-full h-56 bg-slate-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5 text-white space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-300">
              {product.set}
            </p>
            <h3 className="text-lg font-bold leading-tight mt-1">
              {product.name}
            </h3>
          </div>

          <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 uppercase">
            {product.type.replace("_", " ")}
          </span>
        </div>

        <p className="text-sm text-slate-400 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center pt-2">
          <p className="text-xl font-black">
            ${product.price.toFixed(2)}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-amber-400 text-slate-950 px-4 py-2 rounded-full text-sm font-bold hover:bg-amber-300 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}