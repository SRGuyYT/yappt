"use client";

import { useEffect, useState, useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { FeedSkeleton } from "@/components/Skeletons";
import { VideoCard } from "@/components/VideoCard";
import { MoodFilter } from "@/components/MoodFilter";
import { videos } from "@/lib/seed-data";
import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Target, Sparkles, X } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showMoodMode, setShowMoodMode] = useState(false);
  const { noClickbaitMode, goalMode, userGoal, toggleNoClickbait, toggleGoalMode } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  const filteredVideos = useMemo(() => {
    let list = [...videos];
    
    if (goalMode) {
      list = list.filter((v) => 
        v.title.toLowerCase().includes(userGoal.toLowerCase()) || 
        v.description.toLowerCase().includes(userGoal.toLowerCase()) ||
        v.tags.some(t => t.toLowerCase().includes(userGoal.toLowerCase()))
      );
    }
    
    return list;
  }, [goalMode, userGoal]);

  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        {/* Banner with Feature Toggles */}
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="absolute top-0 right-0 p-4">
             <div className="flex gap-3">
               <button 
                onClick={toggleNoClickbait}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  noClickbaitMode ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
               >
                 <ShieldCheck className="h-4 w-4" />
                 NO CLICKBAIT
               </button>
               <button 
                onClick={toggleGoalMode}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  goalMode ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-zinc-400 hover:bg-white/10"
                }`}
               >
                 <Target className="h-4 w-4" />
                 GOAL MODE
               </button>
             </div>
          </div>

          <div className="max-w-2xl">
            <h1 className="text-5xl font-black tracking-tighter text-white md:text-6xl">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500 underline decoration-red-500/30">Better</span>.
            </h1>
            <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
              Your personalized, AI-enhanced video experience. No noise, just content.
            </p>
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => setShowMoodMode(true)}
                className="flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-black transition hover:scale-105 hover:shadow-xl hover:shadow-white/10"
              >
                <Sparkles className="h-5 w-5" />
                HOW DO YOU FEEL?
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {goalMode && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4"
              >
                <p className="text-sm font-medium text-blue-300">
                  <span className="opacity-60">Focusing on:</span> <span className="underline decoration-blue-500/50">{userGoal}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <AnimatePresence>
          {showMoodMode && (
            <motion.section
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative"
            >
              <button 
                onClick={() => setShowMoodMode(false)}
                className="absolute top-4 right-4 z-10 rounded-full bg-white/5 p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
              <MoodFilter />
            </motion.section>
          )}
        </AnimatePresence>

        {loading ? (
          <FeedSkeleton />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos.map((video) => (
              <VideoCard 
                key={`${video.id}-${video.title}`} 
                video={{
                  ...video,
                  title: noClickbaitMode ? video.factualTitle : video.title
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
