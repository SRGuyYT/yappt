"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { channels, videos } from "@/lib/seed-data";
import { useAppStore } from "@/store/useAppStore";
import { History, Heart, Clock, LayoutGrid, Coffee, Zap, Moon, CalendarDays, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type TabType = "history" | "liked" | "watchLater" | "planner";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("history");
  const collections = useAppStore((state) => state.collections);

  const getVideos = (ids: string[]) => ids.map((id) => videos.find((v) => v.id === id)).filter(Boolean);

  const data = {
    history: getVideos(collections.history),
    liked: getVideos(collections.likedVideos),
    watchLater: getVideos(collections.watchLater),
  };

  const tabs = [
    { id: "history", label: "History", icon: History },
    { id: "liked", label: "Liked", icon: Heart },
    { id: "watchLater", label: "Watch Later", icon: Clock },
    { id: "planner", label: "Watch Planner", icon: CalendarDays },
  ];

  return (
    <AppShell>
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
           <div>
             <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">Library</h1>
             <p className="mt-2 text-zinc-400">Manage your collections and plan your viewing experience.</p>
           </div>
           
           <div className="flex gap-2 rounded-2xl border border-white/5 bg-black/40 p-1.5 backdrop-blur-md">
             {tabs.map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as TabType)}
                 className={cn(
                   "relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300",
                   activeTab === tab.id ? "text-white" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                 )}
               >
                 {activeTab === tab.id && (
                    <motion.div
                      layoutId="libraryActive"
                      className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                 )}
                 <tab.icon className={cn("h-4 w-4 relative z-10", activeTab === tab.id && "text-red-500")} />
                 <span className="relative z-10">{tab.label}</span>
               </button>
             ))}
           </div>
        </div>

        <div className="mt-12 min-h-[400px]">
          <AnimatePresence mode="wait">
             {activeTab === "planner" ? (
                <motion.div
                  key="planner"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="grid gap-6 md:grid-cols-3"
                >
                  <PlannerCategory 
                    title="Morning Focus" 
                    icon={Coffee} 
                    color="from-amber-500 to-orange-500" 
                    videos={data.watchLater.slice(0, 2)} 
                  />
                  <PlannerCategory 
                    title="Deep Learning" 
                    icon={Zap} 
                    color="from-purple-500 to-indigo-500" 
                    videos={data.watchLater.slice(2, 4)} 
                  />
                  <PlannerCategory 
                    title="Evening Wind Down" 
                    icon={Moon} 
                    color="from-blue-500 to-cyan-500" 
                    videos={data.watchLater.slice(4, 6)} 
                  />
                </motion.div>
             ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {data[activeTab as keyof typeof data]?.length === 0 ? (
                    <div className="col-span-full py-24 text-center">
                      <LayoutGrid className="mx-auto h-12 w-12 text-zinc-700" />
                      <p className="mt-4 text-lg font-medium text-zinc-500">Your {activeTab} is empty.</p>
                      <Link href="/" className="mt-6 inline-block rounded-xl bg-white px-6 py-2 text-sm font-bold text-black hover:scale-105 transition">Discover Content</Link>
                    </div>
                  ) : (
                    data[activeTab as keyof typeof data]?.map((video) => (
                      <VideoLink key={video!.id} video={video!} />
                    ))
                  )}
                </motion.div>
             )}
          </AnimatePresence>
        </div>
      </div>
    </AppShell>
  );
}

function PlannerCategory({ title, icon: Icon, color, videos }: any) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-black/40 p-6 backdrop-blur-md transition-all hover:border-white/10 hover:shadow-2xl hover:shadow-purple-500/5">
      <div className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${color} opacity-0 blur-3xl transition-opacity group-hover:opacity-10`} />
      
      <div className="flex items-center gap-4">
        <div className={`rounded-2xl bg-gradient-to-br ${color} p-3 shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      <div className="mt-8 space-y-4">
        {videos.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-600 italic">Drag videos here to plan your {title.toLowerCase()}.</p>
        ) : (
          videos.map((v: any) => (
            <Link key={v.id} href={`/watch?v=${v.id}`} className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 hover:bg-white/10 transition">
              <img src={v.thumbnailUrl} alt={v.title} className="h-12 w-20 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-white">{v.title}</p>
                <p className="text-[10px] text-zinc-500">{v.channelName}</p>
              </div>
            </Link>
          ))
        )}
      </div>
      
      <button className="mt-6 w-full rounded-2xl border border-white/5 bg-white/5 py-3 text-xs font-bold text-zinc-400 transition hover:bg-white/10 hover:text-white">
        + ADD TO SESSION
      </button>
    </div>
  );
}

function VideoLink({ video }: { video: any }) {
  return (
    <Link href={`/watch?v=${video.id}`} className="group block">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 transition-all group-hover:border-white/10 group-hover:shadow-2xl">
        <img src={video.thumbnailUrl} alt={video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute bottom-2 right-2 rounded-lg bg-black/80 px-2 py-1 text-[10px] font-bold text-white border border-white/10">{video.duration}</span>
      </div>
      <div className="mt-4">
        <h4 className="line-clamp-2 text-sm font-bold text-white group-hover:text-red-500 transition-colors">{video.title}</h4>
        <p className="mt-1 text-xs text-zinc-500">{video.channelName} • {formatViews(video.views)}</p>
      </div>
    </Link>
  );
}

function formatViews(views: number): string {
  if (views >= 1000000) return (views / 1000000).toFixed(1) + "M views";
  if (views >= 1000) return (views / 1000).toFixed(1) + "K views";
  return views + " views";
}
