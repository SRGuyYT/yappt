"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { motion } from "framer-motion";

import { AuroraBackground } from "@/components/ui/aurora-background";

type AppShellProps = {
  children: ReactNode;
  initialQuery?: string;
};

export function AppShell({ children, initialQuery }: AppShellProps) {
  return (
    <AuroraBackground>
      <div className="relative z-10 min-h-screen w-full text-white selection:bg-red-500/30 selection:text-white">
        <TopNav initialQuery={initialQuery} />
        <div className="mx-auto flex max-w-[1920px]">
          <Sidebar />
          <motion.main
            className="flex-1 overflow-x-hidden p-6 md:p-8"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {children}
          </motion.main>
        </div>
      </div>
    </AuroraBackground>
  );
}
