"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { parseYouTubeInput } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { Bell, Menu, Upload, User, Video, Target, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TopNavProps = {
  initialQuery?: string;
};

export function TopNav({ initialQuery }: TopNavProps) {
  const router = useRouter();
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const notify = useAppStore((state) => state.notify);
  const { noClickbaitMode, toggleNoClickbait, goalMode, toggleGoalMode, userGoal } = useAppStore();
  const [openPasteModal, setOpenPasteModal] = useState(false);
  const [pastedUrl, setPastedUrl] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openFromUrl = () => {
    const id = parseYouTubeInput(pastedUrl);
    if (!id) {
      notify("Invalid YouTube URL");
      return;
    }
    setOpenPasteModal(false);
    setPastedUrl("");
    router.push(`/watch?v=${id}&source=url`);
  };

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/5 bg-black/70 backdrop-blur-xl supports-[backdrop-filter]:bg-black/40"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <button
            onClick={toggleSidebar}
            className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-1 group">
            <img 
              src="/YT.png" 
              alt="StreamFlow" 
              className="h-10 w-auto transition-transform group-hover:scale-110 object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
            />
          </Link>

          <div className="mx-auto hidden max-w-2xl flex-1 lg:block px-8">
            <SearchBar initialQuery={initialQuery} className="w-full" />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => toggleGoalMode()}
              className={cn(
                "hidden items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all lg:flex",
                goalMode ? "border-blue-500/50 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]" : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
              )}
            >
              <Target className="h-4 w-4" />
              <span>{goalMode ? `Goal: ${userGoal}` : "Goal Mode"}</span>
            </button>

            <button
              onClick={() => toggleNoClickbait()}
              className={cn(
                "hidden items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all lg:flex",
                noClickbaitMode ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
              )}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>{noClickbaitMode ? "Clean Feed" : "No Clickbait"}</span>
            </button>

            <button
              onClick={() => setOpenPasteModal(true)}
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white lg:flex"
            >
              <Video className="h-4 w-4" />
              <span>Paste URL</span>
            </button>

            <button className="hidden sm:flex rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
              <Upload className="h-5 w-5" />
            </button>

            <button className="relative rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-black" />
            </button>

            <Link href="/profile">
              <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-transparent bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] transition hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="h-full w-full overflow-hidden rounded-full bg-black">
                  <img
                    src="https://i.pravatar.cc/150?img=11"
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Mobile Search Bar - Conditional */}
        <div className="px-4 pb-3 lg:hidden">
          <SearchBar initialQuery={initialQuery} />
        </div>
      </motion.header>

      {/* Paste URL Modal with Glass Effect */}
      {openPasteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-black/80 p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Paste YouTube URL</h3>
              <button 
                onClick={() => setOpenPasteModal(false)}
                className="rounded-full p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="relative">
              <input
                value={pastedUrl}
                onChange={(e) => setPastedUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all"
                autoFocus
              />
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpenPasteModal(false)}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={openFromUrl}
                className="rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:scale-105 transition-all"
              >
                Open Video
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
