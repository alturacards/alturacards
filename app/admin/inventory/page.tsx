"use client";

import { useEffect, useState } from "react";
import { InventoryProduct, ProductCategory } from "@/lib/inventory-types";

const categories: ProductCategory[] = [
  "Single Card",
  "Booster Pack",
  "Bundle",
  "ETB",
];

const emptyForm = {
  name: "",
  category: "Single Card" as ProductCategory,
  price: "",
  stock: "",
  image: "",
  description: "",
  setName: "",
  cardNumber: "",
  rarity: "",
  featured: false,
};

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  async function loadProducts() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/products", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to load products");
      }

      const data: InventoryProduct[] = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSubmitting(true);

      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      const url = editingId
        ? `/api/admin/products/${editingId}`
        : "/api/admin/products";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to save product");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadProducts();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(product: InventoryProduct) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      image: product.image,
      description: product.description || "",
      setName: product.setName || "",
      cardNumber: product.cardNumber || "",
      rarity: product.rarity || "",
      featured: Boolean(product.featured),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete");
      }

      await loadProducts();

      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm);
      }
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to delete product");
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-yellow-400">
          Admin Inventory
        </h1>

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <section className="rounded-2xl border border-yellow-500/30 bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Product name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
                required
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
                required
              />

              <input
                name="stock"
                type="number"
                min="0"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
                required
              />

              <input
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
                required
              />

              <input
                name="setName"
                placeholder="Set name"
                value={form.setName}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
              />

              <input
                name="cardNumber"
                placeholder="Card number"
                value={form.cardNumber}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
              />

              <input
                name="rarity"
                placeholder="Rarity"
                value={form.rarity}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
              />

              <label className="flex items-center gap-3 text-sm text-zinc-300">
                <input
                  name="featured"
                  type="checkbox"
                  checked={form.featured}
                  onChange={handleChange}
                />
                Featured product
              </label>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update Product"
                    : "Add Product"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-lg border border-zinc-600 px-5 py-3 text-white transition hover:border-zinc-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="rounded-2xl border border-yellow-500/30 bg-zinc-900 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Current Inventory</h2>

            {loading ? (
              <p className="text-zinc-400">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-zinc-400">No products found.</p>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 md:flex-row"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-32 w-32 rounded-lg bg-zinc-800 object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-yellow-400">
                        {product.name}
                      </h3>
                      <p className="text-sm text-zinc-400">{product.category}</p>
                      <p className="mt-2">Price: ${product.price.toFixed(2)}</p>
                      <p>Stock: {product.stock}</p>
                      {product.setName && <p>Set: {product.setName}</p>}
                      {product.cardNumber && <p>Card No: {product.cardNumber}</p>}
                      {product.rarity && <p>Rarity: {product.rarity}</p>}
                      {product.featured && (
                        <p className="mt-1 text-sm text-yellow-300">Featured</p>
                      )}
                    </div>

                    <div className="flex gap-2 md:flex-col">
                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-300"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg border border-red-500 px-4 py-2 text-red-400 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}