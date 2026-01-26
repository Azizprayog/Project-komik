"use client";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmText: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText,
  loading,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-700 shadow-xl p-6 animate-in fade-in zoom-in">

        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg px-4 py-2 text-sm bg-zinc-700 hover:bg-zinc-600 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg px-4 py-2 text-sm bg-red-600 hover:bg-red-500 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : confirmText}
          </button>

        </div>
      </div>
    </div>
  );
}
