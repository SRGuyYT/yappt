"use client";

import { useEffect } from "react";
import { ToastHost } from "@/components/ToastHost";
import { useAppStore } from "@/store/useAppStore";

export function ClientBootstrap() {
  const hydrate = useAppStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <ToastHost />;
}
