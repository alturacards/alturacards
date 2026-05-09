"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CartItem, getCart, saveCart } from "@/lib/cart";

export default function CartPageContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkingOut, setCheckingOut] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const searchParams = useSearchParams();

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const loadCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    const success = searchParams.get("success");

    if (success === "true") {
      saveCart([]);
      setCartItems([]);
      setPurchaseSuccess(true);
      window.dispatchEvent(new Event("cartUpdated"));
      return;
    }

    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [searchParams]);

  const updateQuantity = (id: string, amount: number) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    saveCart(updatedCart);
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!customer.name.trim() || !customer.address.trim() || !customer.phone.trim()) {
      alert("Please enter your full name, delivery address and contact number.");
      return;
    }

    try {
      setCheckingOut(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cartItems,
          customer,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error || data?.details || "Failed to create checkout session"
        );
      }

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      throw new Error("No checkout URL returned");
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong during checkout."
      );
    } finally {
      setCheckingOut(false);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold">Your Cart</h1>

        {purchaseSuccess ? (
          <div className="rounded-2xl border border-yellow-500/30 bg-zinc-950 p-10 text-center">
            <h2 className="text-3xl font-bold text-yellow-400">
              Thank you for your purchase!
            </h2>
            <p className="mt-4 text-zinc-300">
              Your payment was successful and your order is being packed.
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-zinc-400">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                >
                  <div className="relative h-32 w-24 overflow-hidden rounded-lg bg-zinc-900">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="mt-2 font-bold text-yellow-400">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-9 w-9 rounded-lg bg-zinc-800 text-lg"
                      >
                        -
                      </button>

                      <span className="min-w-[24px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-9 w-9 rounded-lg bg-zinc-800 text-lg"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto rounded-lg bg-red-600 px-3 py-2 text-sm font-medium hover:bg-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <h2 className="mb-4 text-2xl font-bold">Delivery Details</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                  placeholder="Full name"
                  className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                />

                <textarea
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                  placeholder="Delivery address"
                  className="min-h-28 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                />

                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  placeholder="Contact number"
                  className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-500"
                />
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold">Order Summary</h2>

              <div className="mb-3 flex items-center justify-between text-zinc-300">
                <span>Items</span>
                <span>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <div className="mb-6 flex items-center justify-between text-xl font-bold text-yellow-400">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut || cartItems.length === 0}
                className="w-full rounded-xl bg-yellow-500 px-4 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {checkingOut ? "Redirecting..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}