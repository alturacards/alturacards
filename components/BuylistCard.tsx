import { type BuylistItem } from "@/lib/buylist";

type BuylistCardProps = {
  item: BuylistItem;
  onAdd: (item: BuylistItem) => void;
};

export default function BuylistCard({ item, onAdd }: BuylistCardProps) {
  return (
    <div className="grid gap-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:grid-cols-[110px_1fr_auto] md:items-center">
      
      {/* Image */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black">
        <img
          src={item.image}
          alt={item.name}
          className="h-[150px] w-full object-contain p-2"
        />
      </div>

      {/* Info */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-semibold text-white">{item.name}</h3>
          <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-300">
            {item.category}
          </span>
        </div>

        <p className="mt-2 text-sm text-zinc-400">
          {item.set} • {item.number} • {item.rarity}
        </p>

        {/* Price */}
        <div className="mt-4 text-sm">
          <div className="inline-block rounded-xl border border-zinc-800 bg-black px-4 py-2 text-zinc-300">
            Buy Price:{" "}
            <span className="font-semibold text-white">
              ${item.cashPrice.toFixed(2)} AUD
            </span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onAdd(item)}
          className="rounded-2xl bg-yellow-500 px-5 py-3 font-semibold text-black transition hover:bg-yellow-400"
        >
          Add to sell list
        </button>
      </div>
    </div>
  );
}