import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Video } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

export const formatViews = (views: number): string => {
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B views`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  return `${views} views`;
};

export const timeAgo = (isoDate: string): string => {
  const now = Date.now();
  const then = new Date(isoDate).getTime();
  const diff = Math.max(now - then, 0);

  const day = 24 * 60 * 60 * 1000;
  const month = 30 * day;
  const year = 365 * day;

  if (diff >= year) return `${Math.floor(diff / year)} years ago`;
  if (diff >= month) return `${Math.floor(diff / month)} months ago`;
  if (diff >= day) return `${Math.floor(diff / day)} days ago`;
  return "today";
};

export const truncate = (text: string, max = 130): string =>
  text.length > max ? `${text.slice(0, max).trim()}...` : text;

export const parseYouTubeInput = (input: string): string | null => {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (YOUTUBE_ID_REGEX.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (!["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(url.hostname)) {
      return null;
    }

    if (url.hostname === "youtu.be") {
      const id = url.pathname.replace("/", "").split("?")[0];
      return YOUTUBE_ID_REGEX.test(id) ? id : null;
    }

    if (url.pathname.startsWith("/watch")) {
      const id = url.searchParams.get("v");
      return id && YOUTUBE_ID_REGEX.test(id) ? id : null;
    }

    if (url.pathname.startsWith("/shorts/")) {
      const id = url.pathname.split("/")[2];
      return id && YOUTUBE_ID_REGEX.test(id) ? id : null;
    }
  } catch {
    return null;
  }

  return null;
};

export const isLikelyUrl = (value: string): boolean => /^https?:\/\//i.test(value.trim());

export const getRelatedVideos = (video: Video, pool: Video[], count = 12): Video[] => {
  const otherVideos = pool.filter((item) => item.id !== video.id);
  const scored = otherVideos.map((candidate) => {
    const overlap = candidate.tags.filter((tag) => video.tags.includes(tag)).length;
    return {
      candidate,
      score: overlap * 3 + Math.random(),
    };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((entry) => entry.candidate);
};
