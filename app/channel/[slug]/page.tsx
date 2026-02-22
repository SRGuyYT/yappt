"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { VideoCard } from "@/components/VideoCard";
import { channels, videos } from "@/lib/seed-data";

export default function ChannelPage() {
  const params = useParams<{ slug: string }>();
  const [tab, setTab] = useState<"Home" | "Videos" | "Playlists" | "About">("Videos");
  const channel = channels.find((item) => item.slug === params.slug);
  const channelVideos = videos.filter((video) => video.channelSlug === params.slug);

  if (!channel) {
    return (
      <AppShell>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h1 className="text-2xl font-semibold">Channel not found</h1>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="overflow-hidden rounded-2xl border border-zinc-800">
        <img src={channel.bannerUrl} alt={channel.name} className="h-40 w-full object-cover md:h-56" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <img src={channel.avatarUrl} alt={channel.name} className="h-20 w-20 rounded-full" />
        <div>
          <h1 className="text-2xl font-semibold">{channel.name}</h1>
          <p className="text-zinc-400">{channel.subscribers} subscribers</p>
          <p className="mt-1 text-sm text-zinc-500">{channel.description}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
        {(["Home", "Videos", "Playlists", "About"] as const).map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`rounded-full px-4 py-2 text-sm ${
              tab === item ? "bg-zinc-100 text-zinc-900" : "bg-zinc-900 text-zinc-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Videos" ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channelVideos.map((video) => (
            <VideoCard key={`${video.id}-${video.title}`} video={video} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 text-zinc-300">
          {tab === "Home" && "Featured uploads and channel highlights appear here."}
          {tab === "Playlists" && "Playlists UI is ready for future extension."}
          {tab === "About" && channel.description}
        </div>
      )}
    </AppShell>
  );
}
