"use client";

import { useEffect } from "react";

type ShareModalProps = {
  open: boolean;
  onClose: () => void;
  shareUrl: string;
  onCopied: () => void;
};

export function ShareModal({ open, onClose, shareUrl, onCopied }: ShareModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    onCopied();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
        <h3 className="text-lg font-semibold">Share</h3>
        <p className="mt-2 text-sm text-zinc-400">Copy this link to share the video.</p>
        <input
          readOnly
          value={shareUrl}
          className="mt-4 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800">
            Cancel
          </button>
          <button
            onClick={handleCopy}
            className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
          >
            Copy link
          </button>
        </div>
      </div>
    </div>
  );
}
