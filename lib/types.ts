export type Video = {
  id: string;
  title: string;
  channelName: string;
  channelSlug: string;
  channelAvatarUrl: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  publishedAt: string;
  tags: string[];
  description: string;
  mood?: "productive" | "chill" | "creative" | "energetic";
  factualTitle: string;
};

export type Channel = {
  slug: string;
  name: string;
  avatarUrl: string;
  bannerUrl: string;
  subscribers: string;
  description: string;
};

export type Short = {
  id: string;
  title: string;
  channelName: string;
  channelSlug: string;
  likes: number;
};

export type CommentItem = {
  id: string;
  videoId: string;
  author: string;
  avatarUrl: string;
  text: string;
  likes: number;
  createdAt: string;
};

export type VideoCollections = {
  history: string[];
  likedVideos: string[];
  watchLater: string[];
  subscribedChannels: string[];
  userComments: Record<string, CommentItem[]>;
};
