export function FeedSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-video rounded-2xl bg-zinc-800" />
          <div className="mt-3 flex gap-3">
            <div className="h-9 w-9 rounded-full bg-zinc-800" />
            <div className="flex-1 space-y-2">
              <div className="h-3 rounded bg-zinc-800" />
              <div className="h-3 w-2/3 rounded bg-zinc-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SideListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex animate-pulse gap-3">
          <div className="h-20 w-36 rounded-xl bg-zinc-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3 rounded bg-zinc-800" />
            <div className="h-3 w-1/2 rounded bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
