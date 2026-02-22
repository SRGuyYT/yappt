"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Compass, History, Home, Library, PlaySquare, Film } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shorts", href: "/shorts", icon: Film },
  { label: "Subscriptions", href: "/library", icon: PlaySquare },
  { label: "Library", href: "/library", icon: Library },
  { label: "History", href: "/library", icon: History },
];

export function Sidebar() {
  const pathname = usePathname();
  const collapsed = useAppStore((state) => state.sidebarCollapsed);

  return (
    <motion.aside
      className={cn(
        "hidden border-r border-white/5 bg-black/20 p-4 backdrop-blur-xl md:block sticky top-16 h-[calc(100vh-4rem)]",
        collapsed ? "w-24" : "w-64"
      )}
      animate={{ width: collapsed ? 96 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav className="space-y-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className={cn(
                "group relative flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 overflow-hidden",
                active
                  ? "text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white hover:shadow-lg hover:shadow-purple-500/5",
                collapsed ? "justify-center flex-col gap-1 px-2" : "gap-4"
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebarActive"
                  className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-rose-600/10 border border-red-500/20 rounded-2xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon
                className={cn(
                  "relative z-10 transition-colors",
                  active ? "text-red-500" : "group-hover:text-red-400",
                  collapsed ? "h-6 w-6" : "h-5 w-5"
                )}
              />
              <span className={cn("relative z-10", collapsed ? "text-[10px]" : "")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      
      {!collapsed && (
        <div className="mt-8 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Subscriptions
          </h3>
          <div className="mt-4 space-y-3">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className="flex items-center gap-3 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                 <div className="h-8 w-8 rounded-full bg-white/10" />
                 <div className="h-2 w-24 rounded bg-white/10" />
               </div>
             ))}
          </div>
        </div>
      )}
    </motion.aside>
  );
}
