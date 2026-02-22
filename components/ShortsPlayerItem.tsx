"use client";

import { useState } from "react";
import { seededComments } from "@/lib/seed-data";
import { Short } from "@/lib/types";

type ShortsPlayerItemProps = {
  short: Short;
};

export function ShortsPlayerItem({ short }: ShortsPlayerItemProps) {
  const [liked, setLiked] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const comments = seededComments[short.id] ?? [];

  return (
    <section className="relative mx-auto flex h-[88vh] w-full max-w-md snap-start items-end overflow-hidden rounded-3xl border border-zinc-800 bg-black">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${short.id}?playsinline=1&rel=0`}
        title={short.title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
      <div className="relative z-10 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
        <h3 className="text-base font-semibold">{short.title}</h3>
        <p className="text-sm text-zinc-300">{short.channelName}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setLiked((prev) => !prev)}
            className={`rounded-full px-3 py-1 text-sm ${liked ? "bg-pink-500/30" : "bg-zinc-800"}`}
          >
            👍 {liked ? short.likes + 1 : short.likes}
          </button>
          <button onClick={() => setCommentOpen(true)} className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
            💬 Comments
          </button>
          <button className="rounded-full bg-zinc-800 px-3 py-1 text-sm">↗ Share</button>
        </div>
      </div>

      {commentOpen && (
        <div className="absolute inset-0 z-20 flex items-end bg-black/50" onClick={() => setCommentOpen(false)}>
          <div
            className="w-full rounded-t-2xl border border-zinc-700 bg-zinc-900 p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <h4 className="mb-2 text-sm font-semibold">Comments</h4>
            <div className="max-h-56 space-y-2 overflow-y-auto">
              {comments.length === 0 ? (
                <p className="text-sm text-zinc-400">No comments yet</p>
              ) : (
                comments.slice(0, 6).map((comment) => (
                  <p key={comment.id} className="text-sm text-zinc-200">
                    <span className="font-medium">{comment.author}:</span> {comment.text}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
