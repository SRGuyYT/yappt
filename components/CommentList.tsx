"use client";

import { useMemo, useState } from "react";
import { seededComments } from "@/lib/seed-data";
import { CommentItem } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { ThumbsUp } from "lucide-react";

type CommentListProps = {
  videoId: string;
};

export function CommentList({ videoId }: CommentListProps) {
  const [sortBy, setSortBy] = useState<"top" | "newest">("top");
  const userComments = useAppStore((state) => state.collections.userComments[videoId]);

  const comments = useMemo(() => {
    const merged: CommentItem[] = [...(userComments ?? []), ...(seededComments[videoId] ?? [])];

    return merged.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.likes - a.likes;
    });
  }, [sortBy, userComments, videoId]);

  return (
    <section className="mt-8 space-y-6">
      <div className="flex items-center gap-6">
        <h4 className="text-xl font-bold text-white">{comments.length} Comments</h4>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as "top" | "newest")}
            className="appearance-none rounded-lg bg-transparent py-1 pl-2 pr-8 text-sm font-medium text-white outline-none hover:text-zinc-300 cursor-pointer"
          >
            <option value="top" className="bg-zinc-900">Top comments</option>
            <option value="newest" className="bg-zinc-900">Newest first</option>
          </select>
          {/* Chevron */}
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-zinc-400">
               <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <article key={comment.id} className="flex gap-4 group">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10">
               <img src={comment.avatarUrl} alt={comment.author} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {comment.author}
                </span>
                <span className="text-xs text-zinc-500">{timeAgo(comment.createdAt)}</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{comment.text}</p>
              <div className="mt-2 flex items-center gap-4">
                <button className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{comment.likes}</span>
                </button>
                <button className="rounded-full px-3 py-1 text-xs font-medium text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
                  Reply
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
