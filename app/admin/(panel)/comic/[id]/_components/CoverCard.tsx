"use client";

type Props = {
  coverUrl?: string | null;
  previewUrl?: string | null;
  onPick: (file: File) => void;
};

export default function CoverCard({ coverUrl, previewUrl, onPick }: Props) {
  return (
    <div className="space-y-3">
      <label className="block cursor-pointer">
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) =>
            e.target.files && onPick(e.target.files[0])
          }
        />

        <div className="relative w-full aspect-[2/3] rounded-xl border border-slate-700 overflow-hidden bg-slate-900 flex items-center justify-center group">
          {previewUrl || coverUrl ? (
            <img
              src={previewUrl ?? coverUrl!}
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />
          ) : (
            <span className="text-slate-400">No Cover</span>
          )}

          {/* overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <span className="text-white font-semibold">
              Click to change cover
            </span>
          </div>
        </div>
      </label>
    </div>
  );
}
