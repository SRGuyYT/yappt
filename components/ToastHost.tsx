"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export function ToastHost() {
  const toasts = useAppStore((state) => state.toasts);
  const removeToast = useAppStore((state) => state.removeToast);

  useEffect(() => {
    if (!toasts.length) return;

    const timer = setTimeout(() => removeToast(toasts[0].id), 2200);
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <div className="fixed bottom-4 right-4 z-[60] space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 shadow-lg"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
