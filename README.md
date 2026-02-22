# Yappt

Modern YouTube-inspired UI built with Next.js App Router, TypeScript, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Tech

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Zustand for lightweight global state
- LocalStorage for user collections and comments

## Implemented Routes

- `/` Home feed with responsive video grid
- `/watch?v=<id>` Watch page with player, actions, description, comments, and up-next
- `/results?search_query=...` Search results
- `/channel/<slug>` Channel page
- `/shorts` Vertical shorts feed
- `/library` Local collections (history, liked, watch later, subscriptions)

## Data + Local State

- Static seeded dataset in `lib/seed-data.ts`
- No database
- No auth
- No server persistence
- LocalStorage keys:
  - watch history (max 50)
  - liked videos
  - watch later
  - subscribed channels
  - user comments by video id

## YouTube URL Paste Support

Supports:

- `https://www.youtube.com/watch?v=ID`
- `https://youtu.be/ID`
- `https://www.youtube.com/shorts/ID`

When a valid URL is used, the app:

- Extracts video ID
- Opens `/watch?v=<id>`
- Adds to recently watched
- Loads metadata via `/api/oembed`
- Falls back to default title/channel if metadata fails

## API Routes (No DB)

- `GET /api/health`
- `GET /api/oembed?url=...`
  - Calls YouTube oEmbed
  - In-memory TTL cache
  - In-memory rate limit

## Notes

- Dark mode default
- Skeleton loading states
- Keyboard shortcuts:
  - `/` focus search
  - `Esc` close modals
- Toast notifications for actions like copied links and save events
