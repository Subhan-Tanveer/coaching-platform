# Nexus Academy

A cinematic coaching/courses platform. Courses are organized into **Worlds** (instead of flat categories), each with its own themed video backdrop; each course is a set of modules and text-based lessons with progress tracking and checkpoint quizzes.

This is Phase 1 of a larger vision — a solid, real, end-to-end platform with no AI and no payments yet, but designed so those can be layered on later without a rewrite.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Prisma + Postgres (free-tier hosted, e.g. [Neon](https://neon.tech)) via `@prisma/adapter-pg`
- NextAuth v5 (Credentials + JWT sessions)
- GSAP + ScrollTrigger + ScrollSmoother (marketing scroll reveals) — Framer Motion (3D-tilt cards, micro-interactions, confetti celebrations)
- Themed background video loops per world/course (`public/videos/`) — see `src/components/marketing/video-playlist.tsx` and `background-video.tsx`
- react-markdown + rehype-highlight (lesson content rendering)

## Getting started

```bash
npm install
npx prisma migrate dev   # applies the schema to your Postgres database
npx prisma db seed       # seeds 6 full courses (101 modules, 319 lessons, 18 quizzes) + an admin and student account
npm run dev
```

You'll need a `DATABASE_URL` (Postgres connection string) and `AUTH_SECRET` in `.env` — see `.env.example`.

Open http://localhost:3000.

Demo accounts (created by the seed script):

- **Admin:** `admin@courses.local` / `Admin123!` → `/admin`
- **Student:** `student@courses.local` / `Student123!` → `/dashboard`

## Project structure

- `src/app/(marketing)` — public pages: video-hero landing (`/`), world pages, course catalog/detail, login/signup. Wrapped in GSAP ScrollSmoother.
- `src/app/(app)` — authenticated pages: student dashboard (with an animated journey-map per course), lesson reader (`/learn/...`), and the whole `/admin` area. Framer Motion only, no ScrollSmoother.
- `src/components/marketing` — `video-playlist.tsx` (homepage hero, cycles through all clips in sequence), `background-video.tsx` (single looping clip, used on world/course/login/signup pages), nav bar, scroll-reveal helper.
- `src/components/app` — nav bar, logout button, the dashboard journey-map component.
- `src/components/ui` — hand-rolled shadcn-style primitives (button, card — with optional 3D cursor-tilt — input, badge).
- `public/videos/` — one clip per world (`frontend-kingdom.mp4`, etc.) plus `hero.mp4`; filenames match `World.slug` exactly so pages can reference `/videos/${world.slug}.mp4` directly.
- `prisma/schema.prisma` — data model: `User`, `World`, `Course`, `Module`, `Lesson`, `Enrollment`, `LessonProgress`, `Quiz`, `Question`, `QuizAttempt`.
- `prisma/seed.ts` — imports each course's full curriculum from `prisma/seed-data/*.ts` and upserts it into the database.
- `prisma/seed-data/` — the actual course content, one file per course (`react-fundamentals.ts`, `nodejs-apis.ts`, `security-fundamentals.ts`, `python-for-data.ts`, `intro-to-cloud-computing.ts`, `gohighlevel-mastery.ts`), each a `CourseContentSeed` (see `types.ts`). Every course was built from real research into comparable courses/products (official docs, roadmap.sh, PortSwigger, OWASP, DataCamp, Udemy/Coursera syllabi, GoHighLevel's own help docs) rather than an arbitrary module count — course sizes range from 14 to 19 modules depending on how much the subject actually covers.

## Content model

- A **World** is a themed category (e.g. "Frontend Kingdom") — one of the cards on the landing page, with its own video backdrop and accent color.
- A **Course** belongs to a World, and holds **Modules**, which hold **Lessons**, structured in three difficulty tiers (Basics → Intermediate → Advanced).
- Lesson content is Markdown (`Lesson.content`), rendered with syntax-highlighted code blocks.
- Each course has exactly **3 checkpoint quizzes** — one `Quiz` (10 multiple-choice `Question`s) attached to the last `Module` of each tier. `POST /api/quizzes/[quizId]/submit` grades server-side and upserts a `QuizAttempt` (score, pass/fail at a 70% threshold, and a per-question right/wrong breakdown) so students see exactly what they got right and wrong and whether they're ready for the next tier. Quizzes don't hard-block progress — they're informational checkpoints, not gates.
- **Enrollment** is free right now (`POST /api/enroll` just creates the row) — `Course.price` exists in the schema so a real Stripe checkout can be slotted in later without a migration.
- **LessonProgress** tracks per-user, per-lesson completion, which drives the dashboard's progress bars and journey map.

## Admin

Anything under `/admin` requires a logged-in user with `role: "ADMIN"` (enforced by `src/proxy.ts`, Next.js 16's renamed middleware convention). From there you can create/edit Worlds, Courses, Modules, and Lessons, manage each module's checkpoint quiz questions, and manually enroll a student by email (there's no self-serve checkout yet).

## Deploying (Render, free tier)

`render.yaml` is a Blueprint targeting Render's free web-service plan — no persistent disk needed, since the database lives on a separate free-tier Postgres host (Neon) rather than on Render itself.

1. Create a free Postgres database (e.g. at [neon.tech](https://neon.tech)) and copy its connection string.
2. In Render: New → Blueprint → connect this repo. It'll detect `render.yaml`.
3. Set the two secrets it asks for: `DATABASE_URL` (the Neon connection string) and `AUTH_SECRET` (generate with `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`).
4. Deploy. First boot runs `prisma migrate deploy` + reseeds course content automatically (safe to re-run on every deploy — it only upserts Worlds/Courses/Modules/Lessons/Quizzes, never touches real user accounts, enrollments, or progress).

Two free-tier quirks worth knowing, not bugs:
- Render's free web service spins down after ~15 min idle and takes 30-60s to wake back up on the next visit.
- Neon's free compute also scales to zero when idle; the first query after a period of inactivity can take a few seconds while it wakes up.

## Deliberately deferred

Not dropped, just sequenced for a later phase: AI mentor/voice, real instructional video lessons, gamification (XP/streaks/badges), real payments, community features, an in-browser code playground, and certificates.

## Notes

- `npx tsc --noEmit`, `npm run lint`, and `npm run build` should all pass clean; run them after any change.
