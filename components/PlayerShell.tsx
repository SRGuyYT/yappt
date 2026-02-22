import { parseYouTubeInput } from "@/lib/utils";

type PlayerShellProps = {
  videoIdOrUrl: string;
};

export function PlayerShell({ videoIdOrUrl }: PlayerShellProps) {
  const videoId = parseYouTubeInput(videoIdOrUrl) ?? videoIdOrUrl;

  return (
    <div className="relative group rounded-3xl bg-black">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 opacity-20 blur-xl transition duration-1000 group-hover:opacity-40" />
      
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
