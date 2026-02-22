"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { VideoRowItem } from "@/components/VideoRowItem";
import { videos } from "@/lib/seed-data";
import { useAppStore } from "@/store/useAppStore";

function ResultsPageContent() {
  const { noClickbaitMode } = useAppStore();
  const searchParams = useSearchParams();
  const query = (searchParams.get("search_query") ?? "").trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];

    return videos.filter((video) => {
      const searchable = `${video.title} ${video.factualTitle} ${video.channelName} ${video.tags.join(" ")}`.toLowerCase();
      return searchable.includes(query);
    });
  }, [query]);

  return (
    <AppShell initialQuery={searchParams.get("search_query") ?? ""}>
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", "Videos", "Channels", "Playlists"].map((filter) => (
          <button
            key={filter}
            className={`rounded-full px-4 py-1.5 text-sm ${
              filter === "Videos" ? "bg-zinc-100 text-zinc-900" : "bg-zinc-900 text-zinc-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">Try searching for something else</h2>
          <p className="mt-2 text-zinc-400">No results found for &quot;{query || "your query"}&quot;.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((video) => (
            <VideoRowItem 
              key={`${video.id}-result`} 
              video={{
                ...video,
                title: noClickbaitMode ? video.factualTitle : video.title
              }} 
            />
          ))}
        </div>
      )}
    </AppShell>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <div className="h-20 animate-pulse rounded-2xl bg-zinc-900" />
        </AppShell>
      }
    >
      <ResultsPageContent />
    </Suspense>
  );
}
