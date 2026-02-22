import { CommentItem, VideoCollections } from "@/lib/types";

const STORAGE_KEY = "yt-clone-state-v1";

const defaultState: VideoCollections = {
  history: [],
  likedVideos: [],
  watchLater: [],
  subscribedChannels: [],
  userComments: {},
};

const isBrowser = () => typeof window !== "undefined";

export const readCollections = (): VideoCollections => {
  if (!isBrowser()) return defaultState;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState;

  try {
    const parsed = JSON.parse(raw) as Partial<VideoCollections>;
    return {
      history: parsed.history ?? [],
      likedVideos: parsed.likedVideos ?? [],
      watchLater: parsed.watchLater ?? [],
      subscribedChannels: parsed.subscribedChannels ?? [],
      userComments: parsed.userComments ?? {},
    };
  } catch {
    return defaultState;
  }
};

export const writeCollections = (next: VideoCollections): void => {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const pushHistory = (id: string): VideoCollections => {
  const state = readCollections();
  const list = [id, ...state.history.filter((item) => item !== id)].slice(0, 50);
  const next = { ...state, history: list };
  writeCollections(next);
  return next;
};

export const toggleListItem = (
  key: "likedVideos" | "watchLater" | "subscribedChannels",
  id: string,
): VideoCollections => {
  const state = readCollections();
  const hasId = state[key].includes(id);
  const nextList = hasId ? state[key].filter((item) => item !== id) : [id, ...state[key]];
  const next = { ...state, [key]: nextList };
  writeCollections(next);
  return next;
};

export const addUserComment = (videoId: string, comment: CommentItem): VideoCollections => {
  const state = readCollections();
  const existing = state.userComments[videoId] ?? [];
  const next = {
    ...state,
    userComments: {
      ...state.userComments,
      [videoId]: [comment, ...existing],
    },
  };
  writeCollections(next);
  return next;
};
