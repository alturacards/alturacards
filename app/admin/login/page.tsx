"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
  setError(data.error || data.message || "Login failed");
  console.log("Login error:", data);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-yellow-500/30 bg-zinc-950 p-8 shadow-xl"
      >
        <h1 className="mb-2 text-3xl font-bold text-yellow-400">
          AlturaCards Admin
        </h1>

        <p className="mb-6 text-zinc-400">
          Enter your admin password to continue.
        </p>

        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-yellow-400"
        />

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-yellow-400 px-4 py-3 font-bold text-black hover:bg-yellow-300 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}