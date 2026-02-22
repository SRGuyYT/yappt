"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { isLikelyUrl, parseYouTubeInput, cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

type SearchBarProps = {
  initialQuery?: string;
  className?: string;
};

export function SearchBar({ initialQuery = "", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;

    const id = parseYouTubeInput(value);
    if (isLikelyUrl(value) && id) {
      router.push(`/watch?v=${id}&source=url`);
      return;
    }

    router.push(`/results?search_query=${encodeURIComponent(value)}`);
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className={cn(
        "relative flex w-full items-center overflow-hidden rounded-full border border-white/5 bg-white/5 transition-all duration-300 backdrop-blur-md",
        focused ? "border-white/20 bg-white/10 shadow-lg shadow-purple-500/10 ring-1 ring-white/10" : "hover:border-white/10 hover:bg-white/8",
        className
      )}
      layoutId="searchBar"
    >
      <div className="pl-4 text-zinc-400">
        <Search className="h-4 w-4" />
      </div>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search..."
        className="h-10 w-full bg-transparent px-3 text-sm text-white placeholder-zinc-500 outline-none"
      />
      <div className="pr-2">
        <div className="flex h-5 items-center gap-1 rounded border border-white/10 bg-black/20 px-1.5 text-[10px] font-medium text-zinc-500">
          <span>/</span>
        </div>
      </div>
    </motion.form>
  );
}
