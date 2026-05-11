

export default function ConditionGuidePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-yellow-500/20 bg-zinc-950 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
          AlturaCards
        </p>

        <h1 className="mt-4 text-4xl font-bold">Condition Guide</h1>

        <div className="mt-8 space-y-6 text-zinc-300">
          <section>
            <h2 className="text-2xl font-bold text-yellow-400">Mint</h2>
            <p className="mt-3 leading-7">
              Cards must be clean, pack-fresh, and free from visible damage.
              This means no whitening, dents, bends, scratches, creases, stains,
              water damage, or edge wear.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-400">
              Cards We May Reject
            </h2>
            <p className="mt-3 leading-7">
              We may reject or reduce the payout for cards with visible damage,
              heavy scratching, corner wear, peeling, warping, ink marks,
              incorrect versions, or condition issues not declared in the
              submission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-400">
              Final Assessment
            </h2>
            <p className="mt-3 leading-7">
              AlturaCards will inspect all cards after they arrive. Final payout
              may change if the received condition does not match the condition
              selected during submission.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}