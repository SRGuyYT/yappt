"use client";

import Link from "next/link";
import { Video } from "@/lib/types";
import { formatViews, timeAgo, truncate } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

type VideoCardProps = {
  video: Video;
};

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function VideoCard({ video }: VideoCardProps) {
  const addToHistory = useAppStore((state) => state.addToHistory);
  const noClickbaitMode = useAppStore((state) => state.noClickbaitMode);

  const displayTitle = noClickbaitMode ? video.factualTitle : video.title;

  return (
    <Link href={`/watch?v=${video.id}`} onClick={() => addToHistory(video.id)}>
      <CardContainer className="inter-var w-full">
        <CardBody className="relative group/card w-full h-auto rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md hover:shadow-2xl hover:shadow-red-500/[0.1] transition-all duration-300">
          <CardItem translateZ="50" className="w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <img
                src={video.thumbnailUrl}
                alt={displayTitle}
                className="h-full w-full object-cover group-hover/card:scale-110 transition-transform duration-500"
              />
              <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/10">
                {video.duration}
              </span>
            </div>
          </CardItem>

          <CardItem
            translateZ="60"
            className="mt-4 flex gap-3 items-start"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 shadow-lg">
              <img
                src={video.channelAvatarUrl}
                alt={video.channelName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <h3 className="line-clamp-2 text-sm font-bold leading-tight text-white group-hover/card:text-red-400 transition-colors">
                {truncate(displayTitle, 60)}
              </h3>
              <div className="flex flex-col text-xs text-zinc-400">
                <span className="font-medium hover:text-white transition-colors">
                  {video.channelName}
                </span>
                <span className="text-zinc-500 group-hover/card:text-zinc-300 transition-colors">
                  {formatViews(video.views)} • {timeAgo(video.publishedAt)}
                </span>
              </div>
            </div>
          </CardItem>
        </CardBody>
      </CardContainer>
    </Link>
  );
}
