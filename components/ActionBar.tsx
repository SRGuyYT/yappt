"use client";

import { useEffect, useState } from "react";
import { ShareModal } from "@/components/ShareModal";
import { Video } from "@/lib/types";
import { useAppStore } from "@/store/useAppStore";
import { ThumbsUp, ThumbsDown, Share2, Clock, Bell } from "lucide-react";

type ActionBarProps = {
  video: Video;
};

export function ActionBar({ video }: ActionBarProps) {
  const collections = useAppStore((state) => state.collections);
  const toggleLike = useAppStore((state) => state.toggleLike);
  const toggleWatchLater = useAppStore((state) => state.toggleWatchLater);
  const toggleSubscription = useAppStore((state) => state.toggleSubscription);
  const notify = useAppStore((state) => state.notify);
  const [isShareOpen, setShareOpen] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const liked = collections.likedVideos.includes(video.id);
  const watchLater = collections.watchLater.includes(video.id);
  const subscribed = collections.subscribedChannels.includes(video.channelSlug);
  
  const shareUrl =
    typeof window === "undefined" ? `/watch?v=${video.id}` : `${window.location.origin}/watch?v=${video.id}`;

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 p-0.5">
            <img 
              src={video.channelAvatarUrl} 
              alt={video.channelName} 
              className="h-full w-full rounded-full object-cover" 
            />
          </div>
          <div>
            <h4 className="font-bold text-white text-lg">{video.channelName}</h4>
            <p className="text-xs text-zinc-400">1.2M subscribers</p>
          </div>
          <button
            onClick={() => toggleSubscription(video.channelSlug)}
            className={`ml-4 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:scale-105 ${
              subscribed
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            {subscribed ? (
               <>
                 <Bell className="h-4 w-4" /> Subscribed
               </>
            ) : (
              "Subscribe"
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <button
              onClick={() => {
                toggleLike(video.id);
                if (disliked) setDisliked(false);
              }}
              className={`flex items-center gap-2 rounded-l-full px-5 py-2.5 text-sm font-medium transition hover:bg-white/10 ${
                liked ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <ThumbsUp className={`h-4 w-4 ${liked ? "fill-white" : ""}`} />
              {liked ? "Liked" : "Like"}
            </button>
            <div className="h-6 w-px bg-white/10" />
            <button
              onClick={() => setDisliked((prev) => !prev)}
              className={`rounded-r-full px-5 py-2.5 transition hover:bg-white/10 ${
                 disliked ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <ThumbsDown className={`h-4 w-4 ${disliked ? "fill-white" : ""}`} />
            </button>
          </div>

          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-400 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
          
          <button
            onClick={() => {
              toggleWatchLater(video.id);
              notify(watchLater ? "Removed from watch later" : "Saved to watch later");
            }}
            className={`flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur-md transition hover:bg-white/10 ${
               watchLater ? "text-emerald-400" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Clock className={`h-4 w-4 ${watchLater ? "fill-emerald-400" : ""}`} />
            Save
          </button>
        </div>
      </div>
      <ShareModal
        open={isShareOpen}
        onClose={() => setShareOpen(false)}
        shareUrl={shareUrl}
        onCopied={() => notify("Copied link")}
      />
    </>
  );
}
