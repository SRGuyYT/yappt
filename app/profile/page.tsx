"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { VideoCard } from "@/components/VideoCard";
import { Video } from "@/lib/types";
import { useAppStore } from "@/store/useAppStore";
import { videos } from "@/lib/seed-data";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const collections = useAppStore((state) => state.collections);
  const [activeTab, setActiveTab] = useState<"history" | "likedVideos" | "watchLater">("history");

  const getVideos = (ids: string[]) => {
    return (ids || []).map((id) => videos.find((v) => v.id === id)).filter((v): v is Video => !!v);
  };

  const activeVideos = getVideos(collections[activeTab]);

  return (
    <AppShell>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-end">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white/10 shadow-2xl">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md">
              Andri&apos;s Space
            </h1>
            <p className="mt-2 text-lg text-zinc-400">
              Content connoisseur • {collections.history.length} watched • {collections.likedVideos.length} liked
            </p>
          </div>
          <button className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-105 hover:shadow-violet-500/40">
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex gap-8 border-b border-white/5 pb-1">
          {(["history", "liked", "watchLater"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-lg font-medium transition ${
                activeTab === tab ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab === "history" && "History"}
              {tab === "liked" && "Liked Videos"}
              {tab === "watchLater" && "Watch Later"}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activeVideos.length === 0 ? (
            <div className="col-span-full py-12 text-center text-zinc-500">
              No videos found in this collection.
            </div>
          ) : (
            activeVideos.map((video) => (
              <VideoCard key={video!.id} video={video!} />
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
