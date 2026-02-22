"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Zap, Coffee, Palette, ArrowRight } from "lucide-react";
import { Video } from "@/lib/types";
import { videos } from "@/lib/seed-data";
import { VideoCard } from "@/components/VideoCard";

const moods = [
  { id: "chill", label: "Chill & Relaxed", icon: Coffee, color: "from-blue-500 to-cyan-500" },
  { id: "productive", label: "Focus & Productive", icon: Zap, color: "from-amber-500 to-orange-500" },
  { id: "creative", label: "Creative & Inspired", icon: Palette, color: "from-purple-500 to-pink-500" },
  { id: "energetic", label: "High Energy", icon: Smile, color: "from-green-500 to-emerald-500" },
];

export function MoodFilter() {
  const [step, setStep] = useState<"ask" | "results">("ask");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const filteredVideos = videos.filter((v) => v.mood === selectedMood);

  const handleSelect = (id: string) => {
    setSelectedMood(id);
    setStep("results");
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <AnimatePresence mode="wait">
        {step === "ask" ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              How are you feeling today?
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Pick a mood and we'll find the perfect videos for you.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 w-full max-w-4xl">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => handleSelect(mood.id)}
                  className="group relative flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-white/20"
                >
                  <div className={`rounded-2xl bg-gradient-to-br ${mood.color} p-4 shadow-lg transition-transform group-hover:scale-110`}>
                    <mood.icon className="h-8 w-8 text-white" />
                  </div>
                  <span className="font-bold text-white">{mood.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep("ask")}
                  className="rounded-full bg-white/5 p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <ArrowRight className="h-5 w-5 rotate-180" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Showing {selectedMood} vibes
                  </h2>
                  <p className="text-sm text-zinc-500">Handpicked for your current state.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
