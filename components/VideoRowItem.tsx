"use client";

import Link from "next/link";
import { Video } from "@/lib/types";
import { formatViews, timeAgo, truncate } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { motion } from "framer-motion";

type VideoRowItemProps = {
  video: Video;
};

export function VideoRowItem({ video }: VideoRowItemProps) {
  const addToHistory = useAppStore((state) => state.addToHistory);
  const noClickbaitMode = useAppStore((state) => state.noClickbaitMode);

  const displayTitle = noClickbaitMode ? video.factualTitle : video.title;

  return (
    <Link href={`/watch?v=${video.id}`} onClick={() => addToHistory(video.id)}>
      <motion.div
        className="group relative flex cursor-pointer gap-4 overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-3 backdrop-blur-md transition-all hover:border-white/10 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ y: -2, scale: 1.01 }}
      >
        <div className="relative aspect-video w-48 shrink-0 overflow-hidden rounded-2xl shadow-lg sm:w-64">
          <img
            src={video.thumbnailUrl}
            alt={displayTitle}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/10">
            {video.duration}
          </span>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/20 shadow-xl">
              <div className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white ml-1" />
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
          <div>
            <h3 className="line-clamp-2 text-base font-semibold leading-tight text-white group-hover:text-purple-300 transition-colors">
              {truncate(displayTitle, 100)}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-medium hover:text-zinc-200 transition-colors">
                {video.channelName}
              </span>
              <span className="h-1 w-1 rounded-full bg-zinc-600" />
              <span className="text-zinc-500">
                {formatViews(video.views)} • {timeAgo(video.publishedAt)}
              </span>
            </div>
          </div>
          
          <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
            {video.description}
          </p>

          <div className="mt-auto flex items-center gap-3">
             <div className="flex -space-x-2">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="h-6 w-6 rounded-full border border-black bg-zinc-800" />
               ))}
             </div>
             <span className="text-xs text-zinc-500">+12 friends watched</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
