import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-yellow-400">
          AlturaCards Admin
        </h1>

        <p className="mt-3 text-zinc-400">
          Manage your store, inventory, and card submissions.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link
            href="/admin/submissions"
            className="rounded-2xl border border-yellow-500/30 bg-zinc-950 p-6 hover:border-yellow-400"
          >
            <h2 className="text-2xl font-bold text-white">Submissions</h2>
            <p className="mt-2 text-zinc-400">
              Review sell-your-cards submissions and update statuses.
            </p>
          </Link>

          <Link
            href="/inventory"
            className="rounded-2xl border border-yellow-500/30 bg-zinc-950 p-6 hover:border-yellow-400"
          >
            <h2 className="text-2xl font-bold text-white">Inventory</h2>
            <p className="mt-2 text-zinc-400">
              Add, edit, and manage products in your store.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}