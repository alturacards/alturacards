"use client";

type ConditionGuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ConditionGuideModal({
  isOpen,
  onClose,
}: ConditionGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-yellow-500/20 bg-zinc-950 p-6 shadow-2xl shadow-black/40">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl border border-zinc-700 bg-black px-3 py-2 text-sm text-white transition hover:border-yellow-500"
        >
          Close
        </button>

        <h2 className="pr-16 text-3xl font-bold text-white">Condition Guide</h2>
        <p className="mt-3 text-zinc-400">
          Use this guide to help estimate the condition of your cards before
          sending them to AlturaCards.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
            <h3 className="text-xl font-semibold text-white">Mint</h3>
            <p className="mt-2 text-zinc-300">
              Card appears pack fresh with virtually no visible wear. Corners are
              sharp, edges are clean, surface is clean, and centering is strong.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
            <h3 className="text-xl font-semibold text-white">Near Mint</h3>
            <p className="mt-2 text-zinc-300">
              Very minor wear may be visible under close inspection. Small edge
              whitening or light surface wear may be present, but overall the card
              still presents very cleanly.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-700 bg-black/40 p-5">
            <h3 className="text-xl font-semibold text-white">Lightly Played</h3>
            <p className="mt-2 text-zinc-300">
              Noticeable but moderate wear. Small scratches, edge wear, or corner
              wear may be present, though the card remains in solid overall shape.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-700 bg-black/40 p-5">
            <h3 className="text-xl font-semibold text-white">Moderately Played</h3>
            <p className="mt-2 text-zinc-300">
              Obvious wear is present. Heavier edge wear, whitening, scratches,
              dents, or scuffing may be visible.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-700 bg-black/40 p-5">
            <h3 className="text-xl font-semibold text-white">Heavily Played</h3>
            <p className="mt-2 text-zinc-300">
              Significant visible wear. Creases, heavy scratching, strong edge wear,
              dents, or other clear damage may be present.
            </p>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
            <h3 className="text-xl font-semibold text-white">Damaged</h3>
            <p className="mt-2 text-zinc-300">
              Major flaws such as bends, creases, peeling, water damage, ink marks,
              tears, or other serious defects.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
          <p className="text-sm leading-7 text-zinc-200">
            Final condition is determined by AlturaCards upon review. If submitted
            card conditions differ from what was expected, the final payout may be
            adjusted.
          </p>
        </div>
      </div>
    </div>
  );
}