import { Suspense } from "react";
import SellSuccessContent from "./SellSuccessContent";

export default function SellSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black p-10 text-white">
          Loading...
        </main>
      }
    >
      <SellSuccessContent />
    </Suspense>
  );
}