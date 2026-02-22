"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ActionBar } from "@/components/ActionBar";
import { AppShell } from "@/components/AppShell";
import { CommentBox } from "@/components/CommentBox";
import { CommentList } from "@/components/CommentList";
import { PlayerShell } from "@/components/PlayerShell";
import { SideListSkeleton } from "@/components/Skeletons";
import { videos } from "@/lib/seed-data";
import { Video } from "@/lib/types";
import { formatViews, getRelatedVideos, parseYouTubeInput, timeAgo } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

type OEmbedResponse = {
  title: string;
  author_name: string;
};

export default function WatchPage() {
  const { noClickbaitMode } = useAppStore();

  return (
    <Suspense
      fallback={
        <AppShell>
          <div className="h-[420px] animate-pulse rounded-2xl bg-zinc-900" />
        </AppShell>
      }
    >
      <WatchPageContent noClickbaitMode={noClickbaitMode} />
    </Suspense>
  );
}

function WatchPageContent({ noClickbaitMode }: { noClickbaitMode: boolean }) {
  const searchParams = useSearchParams();
  const videoParam = searchParams.get("v") ?? "";
  const normalizedId = parseYouTubeInput(videoParam) ?? videoParam;
  const addToHistory = useAppStore((state) => state.addToHistory);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resolvedVideo, setResolvedVideo] = useState<Video | null>(null);

  useEffect(() => {
    setLoading(true);
    const existing = videos.find((video) => video.id === normalizedId);
    if (existing) {
      setResolvedVideo(existing);
      setLoading(false);
      return;
    }

    if (!normalizedId) {
      setResolvedVideo(null);
      setLoading(false);
      return;
    }

    const loadMeta = async () => {
      try {
        const url = `https://www.youtube.com/watch?v=${normalizedId}`;
        const response = await fetch(`/api/oembed?url=${encodeURIComponent(url)}`);
        const data = (await response.json()) as OEmbedResponse;
        setResolvedVideo({
          id: normalizedId,
          title: data.title ?? "YouTube Video",
          factualTitle: data.title ?? "YouTube Video",
          channelName: data.author_name ?? "Unknown channel",
          channelSlug: "external",
          channelAvatarUrl: "https://i.pravatar.cc/120?img=71",
          thumbnailUrl: `https://i.ytimg.com/vi/${normalizedId}/hqdefault.jpg`,
          duration: "—",
          views: 0,
          publishedAt: new Date().toISOString(),
          tags: ["external", "youtube"],
          description: "Imported from a pasted YouTube URL.",
        });
      } catch {
        setResolvedVideo({
          id: normalizedId,
          title: "YouTube Video",
          factualTitle: "YouTube Video",
          channelName: "Unknown channel",
          channelSlug: "external",
          channelAvatarUrl: "https://i.pravatar.cc/120?img=71",
          thumbnailUrl: `https://i.ytimg.com/vi/${normalizedId}/hqdefault.jpg`,
          duration: "—",
          views: 0,
          publishedAt: new Date().toISOString(),
          tags: ["external", "youtube"],
          description: "Imported from a pasted YouTube URL.",
        });
      } finally {
        setLoading(false);
      }
    };

    void loadMeta();
  }, [normalizedId]);

  useEffect(() => {
    if (!resolvedVideo) return;
    addToHistory(resolvedVideo.id);
  }, [resolvedVideo, addToHistory]);

  const displayTitle = useMemo(() => {
    if (!resolvedVideo) return "";
    return noClickbaitMode ? resolvedVideo.factualTitle : resolvedVideo.title;
  }, [resolvedVideo, noClickbaitMode]);

  const upNext = useMemo(() => {
    if (!resolvedVideo) return videos.slice(0, 10);
    return getRelatedVideos(resolvedVideo, videos, 12);
  }, [resolvedVideo]);

  if (!normalizedId) {
    return (
      <AppShell>
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">No video selected</h2>
          <p className="mt-2 text-zinc-400">Open a video from Home or paste a YouTube link.</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div>
          <PlayerShell videoIdOrUrl={normalizedId} />
          {loading || !resolvedVideo ? (
            <div className="mt-4 h-32 animate-pulse rounded-2xl bg-zinc-900" />
          ) : (
            <>
              <h1 className="mt-4 text-2xl font-bold">{displayTitle}</h1>
              <p className="mt-1 text-sm text-zinc-400">
                {formatViews(resolvedVideo.views)} • {timeAgo(resolvedVideo.publishedAt)}
              </p>
              <ActionBar video={resolvedVideo} />

              <section className="mt-4 rounded-2xl bg-white/5 p-4 border border-white/5 backdrop-blur-md">
                <p className={`text-sm text-zinc-200 ${expanded ? "" : "line-clamp-3"}`}>
                  {resolvedVideo.description}
                </p>
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="mt-2 text-sm font-medium text-zinc-300 hover:text-white"
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              </section>

              <CommentBox videoId={resolvedVideo.id} />
              <CommentList videoId={resolvedVideo.id} />
            </>
          )}
        </div>

        <aside>
          <h3 className="mb-4 text-lg font-bold">Up next</h3>
          {loading ? (
            <SideListSkeleton />
          ) : (
            <div className="space-y-4">
              {upNext.map((video) => (
                <Link
                  key={`${video.id}-next`}
                  href={`/watch?v=${video.id}`}
                  className="group flex gap-3 rounded-2xl p-2 transition hover:bg-white/5 border border-transparent hover:border-white/10"
                >
                  <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-xl">
                    <img src={video.thumbnailUrl} alt={video.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-110" />
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-xs font-bold text-white group-hover:text-red-500 transition-colors">
                      {noClickbaitMode ? video.factualTitle : video.title}
                    </p>
                    <p className="mt-1 text-[10px] text-zinc-500">{video.channelName}</p>
                    <p className="text-[10px] text-zinc-400">{formatViews(video.views)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>
    </AppShell>
  );
}
