"use client";

import { FormEvent, useState } from "react";
import { CommentItem } from "@/lib/types";
import { useAppStore } from "@/store/useAppStore";
import { Send } from "lucide-react";

type CommentBoxProps = {
  videoId: string;
};

export function CommentBox({ videoId }: CommentBoxProps) {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const addComment = useAppStore((state) => state.addComment);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const comment: CommentItem = {
      id: `local-${Date.now()}`,
      videoId,
      author: "You",
      avatarUrl: "https://i.pravatar.cc/120?img=11",
      text: trimmed,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    addComment(videoId, comment);
    setText("");
    setFocused(false);
  };

  return (
    <form onSubmit={submit} className="mt-8 flex gap-4">
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10">
        <img src="https://i.pravatar.cc/120?img=11" alt="You" className="h-full w-full object-cover" />
      </div>
      <div className="flex-1">
        <div className={`relative overflow-hidden rounded-2xl border bg-black/20 backdrop-blur-sm transition-all duration-300 ${focused ? "border-white/20 shadow-lg shadow-purple-500/5" : "border-white/5"}`}>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => !text && setFocused(false)}
            placeholder="Add a comment..."
            className="min-h-[60px] w-full resize-none bg-transparent p-4 text-sm text-white placeholder-zinc-500 outline-none"
          />
          {focused && (
            <div className="flex justify-end bg-white/5 px-2 py-2">
              <button
                type="button"
                onClick={() => {
                  setText("");
                  setFocused(false);
                }}
                className="rounded-full px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!text.trim()}
                className="ml-2 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 Comment <Send className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
