"use client";

import Image from "next/image";
import { useCart, type Product } from "@/components/cart-provider";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const imageSrc =
    product.imageUrl || product.image || "/placeholder.png";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-lg">
      <div className="relative mb-4 aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-900">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>

      <h3 className="text-lg font-semibold text-white">
        {product.name}
      </h3>

      {product.setName && (
        <p className="mt-1 text-sm text-zinc-400">
          {product.setName}
        </p>
      )}

      <p className="mt-3 text-lg font-bold text-yellow-400">
        ${product.price.toFixed(2)} AUD
      </p>

      <button
        type="button"
        onClick={() => addToCart(product)}
        className="mt-4 w-full rounded-xl bg-yellow-500 px-4 py-3 font-semibold text-black transition hover:bg-yellow-400"
      >
        Add to Cart
      </button>
    </div>
  );
}
