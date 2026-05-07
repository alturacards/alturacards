import { Suspense } from "react";
import CartPageContent from "./CartPageContent";

export default function CartPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-black p-10 text-white">Loading cart...</main>}>
      <CartPageContent />
    </Suspense>
  );
}