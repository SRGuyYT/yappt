"use client";

import { create } from "zustand";
import { addUserComment, pushHistory, readCollections, toggleListItem } from "@/lib/storage";
import { CommentItem, VideoCollections } from "@/lib/types";

type Toast = {
  id: string;
  message: string;
};

type AppState = {
  sidebarCollapsed: boolean;
  noClickbaitMode: boolean;
  goalMode: boolean;
  userGoal: string;
  collections: VideoCollections;
  toasts: Toast[];
  
  hydrate: () => void;
  toggleSidebar: () => void;
  toggleNoClickbait: () => void;
  toggleGoalMode: () => void;
  setUserGoal: (goal: string) => void;
  notify: (message: string) => void;
  removeToast: (id: string) => void;
  addToHistory: (videoId: string) => void;
  toggleLike: (videoId: string) => void;
  toggleWatchLater: (videoId: string) => void;
  toggleSubscription: (channelSlug: string) => void;
  addComment: (videoId: string, comment: CommentItem) => void;
};

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  noClickbaitMode: false,
  goalMode: false,
  userGoal: "coding",
  collections: {
    history: [],
    likedVideos: [],
    watchLater: [],
    subscribedChannels: [],
    userComments: {},
  },
  toasts: [],
  hydrate: () => set({ collections: readCollections() }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleNoClickbait: () => set((state) => ({ noClickbaitMode: !state.noClickbaitMode })),
  toggleGoalMode: () => set((state) => ({ goalMode: !state.goalMode })),
  setUserGoal: (goal) => set({ userGoal: goal }),
  notify: (message) =>
    set((state) => ({
      toasts: [...state.toasts, { id: `${Date.now()}-${Math.random()}`, message }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  addToHistory: (videoId) => set({ collections: pushHistory(videoId) }),
  toggleLike: (videoId) => set({ collections: toggleListItem("likedVideos", videoId) }),
  toggleWatchLater: (videoId) => set({ collections: toggleListItem("watchLater", videoId) }),
  toggleSubscription: (channelSlug) =>
    set({ collections: toggleListItem("subscribedChannels", channelSlug) }),
  addComment: (videoId, comment) => set({ collections: addUserComment(videoId, comment) }),
}));
