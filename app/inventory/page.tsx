"use client";

import { useEffect, useState } from "react";
import {
  getInventoryFromStorage,
  saveInventoryToStorage,
  InventoryProduct,
  ProductCategory,
} from "@/lib/inventory";

const categories: ProductCategory[] = [
  "Single Card",
  "Booster Pack",
  "Bundle",
  "ETB",
];

export default function InventoryPage() {
  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProductCategory>("Single Card");
  const [setNameValue, setSetNameValue] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [inventory, setInventory] = useState("");

  useEffect(() => {
    const savedProducts = getInventoryFromStorage();
    setProducts(savedProducts);
  }, []);

  const handleAddProduct = () => {
    if (!name.trim() || !price || !image.trim() || !inventory) return;

    const newProduct: InventoryProduct = {
      id: crypto.randomUUID(),
      name: name.trim(),
      category,
      set: setNameValue.trim(),
      price: Number(price),
      image: image.trim(),
      inventory: Number(inventory),
    };

    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    saveInventoryToStorage(updatedProducts);

    setName("");
    setCategory("Single Card");
    setSetNameValue("");
    setPrice("");
    setImage("");
    setInventory("");
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    saveInventoryToStorage(updatedProducts);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-yellow-400">Inventory</h1>

        <div className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="mb-4 text-2xl font-semibold text-white">Add Product</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Set name"
              value={setNameValue}
              onChange={(e) => setSetNameValue(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />

            <input
              type="number"
              placeholder="Stock quantity"
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
              className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <button
            onClick={handleAddProduct}
            className="mt-5 rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Add to Inventory
          </button>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Current Inventory
          </h2>

          {products.length === 0 ? (
            <p className="text-zinc-400">No products added yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-zinc-800 bg-black"
                >
                  <div className="aspect-[3/4] bg-zinc-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain p-4"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
                      {product.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {product.name}
                    </h3>
                    {product.set && (
                      <p className="mt-1 text-sm text-zinc-400">{product.set}</p>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-yellow-400">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
                        {product.inventory} in stock
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="mt-4 w-full rounded-xl bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}