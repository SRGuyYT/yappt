import { AppShell } from "@/components/AppShell";
import { ShortsPlayerItem } from "@/components/ShortsPlayerItem";
import { shorts } from "@/lib/seed-data";

export default function ShortsPage() {
  return (
    <AppShell>
      <div className="mx-auto h-[88vh] max-w-xl snap-y snap-mandatory space-y-5 overflow-y-auto pr-1">
        {shorts.map((short) => (
          <ShortsPlayerItem key={short.id} short={short} />
        ))}
      </div>
    </AppShell>
  );
}
