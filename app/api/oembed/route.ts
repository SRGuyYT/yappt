import { NextRequest, NextResponse } from "next/server";

type CacheItem = {
  expiresAt: number;
  data: unknown;
};

const cache = new Map<string, CacheItem>();
const requestLog = new Map<string, number[]>();
const CACHE_TTL_MS = 5 * 60 * 1000;
const LIMIT_WINDOW_MS = 60 * 1000;
const LIMIT_PER_WINDOW = 30;

const clientIp = (request: NextRequest): string =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const existing = requestLog.get(ip) ?? [];
  const valid = existing.filter((value) => now - value < LIMIT_WINDOW_MS);
  if (valid.length >= LIMIT_PER_WINDOW) {
    requestLog.set(ip, valid);
    return false;
  }

  requestLog.set(ip, [...valid, now]);
  return true;
};

export async function GET(request: NextRequest) {
  const ip = clientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url query param" }, { status: 400 });
  }

  const cached = cache.get(url);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.data);
  }

  try {
    const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const response = await fetch(endpoint, { next: { revalidate: 0 } });
    if (!response.ok) {
      throw new Error(`oEmbed request failed: ${response.status}`);
    }

    const data = await response.json();
    cache.set(url, { data, expiresAt: Date.now() + CACHE_TTL_MS });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        title: "YouTube Video",
        author_name: "Unknown channel",
      },
      { status: 200 },
    );
  }
}
