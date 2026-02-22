import { Channel, CommentItem, Short, Video } from "@/lib/types";

const avatar = (seed: number) => `https://i.pravatar.cc/120?img=${seed}`;
const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const channels: Channel[] = [
  {
    slug: "pixel-lab",
    name: "Pixel Lab",
    avatarUrl: avatar(11),
    bannerUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
    subscribers: "2.4M",
    description: "Design systems, product breakdowns, and modern UI tutorials.",
  },
  {
    slug: "code-sprint",
    name: "Code Sprint",
    avatarUrl: avatar(18),
    bannerUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
    subscribers: "1.1M",
    description: "Fast-paced coding guides and architecture walk-throughs.",
  },
  {
    slug: "motion-room",
    name: "Motion Room",
    avatarUrl: avatar(23),
    bannerUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80",
    subscribers: "830K",
    description: "Music, creative edits, and production workflows.",
  },
  {
    slug: "daily-tech",
    name: "Daily Tech",
    avatarUrl: avatar(30),
    bannerUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    subscribers: "3.8M",
    description: "Hardware reviews, software deep dives, and tech news.",
  },
  {
    slug: "film-craft",
    name: "Film Craft",
    avatarUrl: avatar(39),
    bannerUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
    subscribers: "950K",
    description: "Storytelling, cinematography, and creator interviews.",
  },
];

const channelLookup = new Map(channels.map((channel) => [channel.slug, channel]));

const makeVideo = (
  id: string,
  title: string,
  factualTitle: string,
  mood: Video["mood"],
  channelSlug: string,
  duration: string,
  views: number,
  publishedAt: string,
  tags: string[],
  description: string,
): Video => {
  const channel = channelLookup.get(channelSlug);

  if (!channel) {
    throw new Error(`Unknown channel slug: ${channelSlug}`);
  }

  return {
    id,
    title,
    factualTitle,
    mood,
    channelName: channel.name,
    channelSlug: channel.slug,
    channelAvatarUrl: channel.avatarUrl,
    thumbnailUrl: thumb(id),
    duration,
    views,
    publishedAt,
    tags,
    description,
  };
};

// Real YouTube Video IDs with relevant metadata
export const videos: Video[] = [
  // --- GOAL: CODING / PRODUCTIVE ---
  makeVideo("wm5gMKuwSYk", "Next.js 14 Tutorial for Beginners", "Introductory Course to Next.js 14", "productive", "code-sprint", "28:15", 450000, "2025-10-15T12:00:00.000Z", ["coding", "nextjs", "react"], "A comprehensive guide to building your first App Router application."),
  makeVideo("Zq5fmkH0T78", "Mastering React Server Components", "Deep Dive into React Server Components", "productive", "code-sprint", "18:42", 120000, "2025-09-10T09:30:00.000Z", ["coding", "react", "architecture"], "Understanding the 'why' and 'how' of RSCs in modern web dev."),
  makeVideo("_W3R2VwRyF4", "10 CSS Tricks You Should Know", "Essential CSS Techniques for Developers", "productive", "pixel-lab", "12:30", 890000, "2025-11-05T14:00:00.000Z", ["coding", "css", "design"], "Advanced selectors and layout tricks to speed up your styling."),
  makeVideo("SqcY0GlETPk", "React Tutorial for Beginners", "ReactJS Crash Course 2026", "productive", "code-sprint", "45:10", 2100000, "2025-06-20T08:00:00.000Z", ["coding", "react", "tutorial"], "Zero to hero in React.js concepts."),
  makeVideo("F627pKNUCVQ", "Docker in 100 Seconds", "Quick Docker Overview", "energetic", "daily-tech", "01:40", 500000, "2025-12-01T10:00:00.000Z", ["coding", "devops", "tech"], "Fast-paced introduction to containerization."),
  makeVideo("WXuK6gekU1Y", "Git & GitHub Crash Course", "Version Control Fundamentals", "productive", "code-sprint", "32:00", 950000, "2025-08-15T16:00:00.000Z", ["coding", "git", "tools"], "Everything you need to know to collaborate on code."),
  makeVideo("lH95n4pBf2E", "Unit Testing for Beginners", "Introduction to Unit Testing", "productive", "code-sprint", "15:20", 300000, "2025-07-10T11:00:00.000Z", ["coding", "testing", "quality"], "Why testing matters and how to write your first test case."),

  // --- MOOD: CHILL (Lofi, Setups, Day in Life) ---
  makeVideo("jfKfPfyJRdk", "lofi hip hop radio - beats to relax/study to", "Lofi Music Live Stream", "chill", "motion-room", "Live", 50000000, "2025-01-01T00:00:00.000Z", ["chill", "music", "focus"], "The iconic study girl radio for deep work sessions."),
  makeVideo("wV218h2nLgE", "My Minimal Desk Setup 2026", "Minimalist Workspace Tour", "chill", "pixel-lab", "08:45", 150000, "2025-05-20T13:00:00.000Z", ["chill", "setup", "tech"], "Touring a distraction-free environment for coding and design."),
  makeVideo("U8k8e8X9jsA", "Day in the Life of a Software Engineer", "Software Engineer Vlog", "chill", "daily-tech", "14:20", 800000, "2025-09-05T09:00:00.000Z", ["chill", "vlog", "coding"], "A realistic look at working in tech, meetings, and coding."),
  makeVideo("5qap5aO4i9A", "lofi coding session [no talking]", "Silent Coding ASMR", "chill", "code-sprint", "55:00", 200000, "2025-10-30T20:00:00.000Z", ["chill", "coding", "asmr"], "Just keyboard sounds and code on screen."),

  // --- MOOD: CREATIVE (Design, Art, Motion) ---
  makeVideo("W2y7OGka6o0", "Figma to Code: The Right Way", "Design to Development Handoff", "creative", "pixel-lab", "16:15", 350000, "2025-04-12T15:30:00.000Z", ["creative", "design", "coding"], "Bridging the gap between designers and developers."),
  makeVideo("B7wHpNUUT4Y", "UI Design Trends 2026", "Upcoming UI Design Trends", "creative", "pixel-lab", "10:50", 600000, "2025-12-28T12:00:00.000Z", ["creative", "design", "trends"], "Glassmorphism, Bento grids, and new typography styles."),
  makeVideo("8J_gC_tT3c0", "How to Film Cinematic B-Roll", "Cinematic B-Roll Tutorial", "creative", "film-craft", "13:40", 420000, "2025-06-15T14:00:00.000Z", ["creative", "film", "camera"], "Lighting and composition tips for beautiful shots."),
  makeVideo("e-ORhEE9VVg", "Color Grading Like a Pro", "Professional Color Grading Guide", "creative", "film-craft", "12:08", 468000, "2025-06-19T08:00:00.000Z", ["creative", "color", "film"], "Use LUTs and curves without crushing shadows."),
  makeVideo("60ItHLz5WEA", "Framer Motion Animation Guide", "React Animation Tutorial", "creative", "code-sprint", "10:24", 845000, "2025-07-27T09:15:00.000Z", ["creative", "coding", "animation"], "Making your React apps feel alive with motion."),

  // --- MOOD: ENERGETIC (Hype, Fast Tech, News) ---
  makeVideo("lHvY8W1v2tM", "Is AI Replacing Programmers?", "AI Impact on Programming Jobs", "energetic", "daily-tech", "11:30", 2500000, "2025-11-20T18:00:00.000Z", ["energetic", "tech", "ai"], "An honest look at the future of dev jobs."),
  makeVideo("W7174XJ52Xk", "I Built a SaaS in 24 Hours", "24-Hour SaaS Building Challenge", "energetic", "code-sprint", "22:15", 1100000, "2025-08-01T10:00:00.000Z", ["energetic", "coding", "challenge"], "Speedrunning the launch of a new product."),
  makeVideo("bMknfKXIFA8", "React vs Angular vs Vue - The Final Battle", "Frontend Framework Comparison", "energetic", "code-sprint", "15:00", 1800000, "2025-03-10T12:00:00.000Z", ["energetic", "coding", "tech"], "Comparing the big three frameworks in 2026."),
  makeVideo("0r6C3z3TEKw", "Nothing Phone 3 Review", "Latest Smartphone Review", "energetic", "daily-tech", "09:45", 3000000, "2025-09-15T15:00:00.000Z", ["energetic", "tech", "review"], "Unboxing and testing the newest transparent phone."),
];

export const shorts: Short[] = [
  { id: "Zi_XLOBDo_Y", title: "CSS Grid in 60s", channelName: "Code Sprint", channelSlug: "code-sprint", likes: 32000 },
  { id: "YqeW9_5kURI", title: "My Desk Setup", channelName: "Pixel Lab", channelSlug: "pixel-lab", likes: 27000 },
  { id: "QH2-TGUlwu4", title: "VS Code Shortcuts", channelName: "Code Sprint", channelSlug: "code-sprint", likes: 41000 },
  { id: "04854XqcfCY", title: "Cinematic Lighting", channelName: "Film Craft", channelSlug: "film-craft", likes: 19000 },
  { id: "xTlNMmZKwpA", title: "Tech Myth Busted", channelName: "Daily Tech", channelSlug: "daily-tech", likes: 36000 },
  { id: "fLexgOxsZu0", title: "Storytelling Hook", channelName: "Film Craft", channelSlug: "film-craft", likes: 29000 },
  { id: "4NRXx6U8ABQ", title: "Fix your contrast", channelName: "Pixel Lab", channelSlug: "pixel-lab", likes: 18000 },
  { id: "34Na4j8AVgA", title: "File structure tip", channelName: "Code Sprint", channelSlug: "code-sprint", likes: 22000 },
  { id: "9jK-NcRmVcw", title: "Sound design hack", channelName: "Motion Room", channelSlug: "motion-room", likes: 25000 },
  { id: "YykjpeuMNEk", title: "Browser trick", channelName: "Daily Tech", channelSlug: "daily-tech", likes: 20000 },
];

export const seededComments: Record<string, CommentItem[]> = videos.reduce(
  (acc, video, index) => {
    acc[video.id] = [
      {
        id: `${video.id}-c1`,
        videoId: video.id,
        author: "Dev Fan",
        avatarUrl: avatar(50 + (index % 10)),
        text: "This saved my life, thank you so much for the clear explanation!",
        likes: 42 + index,
        createdAt: new Date(Date.now() - (index + 1) * 86_400_000).toISOString(),
      },
      {
        id: `${video.id}-c2`,
        videoId: video.id,
        author: "Tech Enthusiast",
        avatarUrl: avatar(60 + (index % 10)),
        text: "Waiting for the part 2!",
        likes: 18 + index,
        createdAt: new Date(Date.now() - (index + 2) * 86_400_000).toISOString(),
      },
    ];
    return acc;
  },
  {} as Record<string, CommentItem[]>,
);
