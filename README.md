# Nexus Academy

An immersive, 3D-first coaching/courses platform. Courses are organized into **Worlds** (instead of flat categories) that you fly into from a cinematic 3D landing page; each course is a set of modules and text-based lessons with progress tracking.

This is Phase 1 of a larger vision — a solid, real, end-to-end platform with no video, no AI, and no payments yet, but designed so those can be layered on later without a rewrite.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Prisma + SQLite (`prisma/dev.db`) via `@prisma/adapter-better-sqlite3`
- NextAuth v5 (Credentials + JWT sessions)
- React Three Fiber + drei (3D landing hero) — GSAP + ScrollTrigger + ScrollSmoother (marketing scroll reveals) — Framer Motion (app/dashboard/admin micro-interactions)
- react-markdown + rehype-highlight (lesson content rendering)

## Getting started

```bash
npm install
npx prisma migrate dev   # creates prisma/dev.db and applies the schema
npx prisma db seed       # seeds 6 full courses (101 modules, 319 lessons, 18 quizzes) + an admin and student account
npm run dev
```

Open http://localhost:3000.

Demo accounts (created by the seed script):

- **Admin:** `admin@courses.local` / `Admin123!` → `/admin`
- **Student:** `student@courses.local` / `Student123!` → `/dashboard`

## Project structure

- `src/app/(marketing)` — public pages: 3D landing (`/`), world pages, course catalog/detail, login/signup. Wrapped in GSAP ScrollSmoother.
- `src/app/(app)` — authenticated pages: student dashboard, lesson reader (`/learn/...`), and the whole `/admin` area. Framer Motion only, no ScrollSmoother.
- `src/components/three` — the 3D world-navigation hero (`WorldCanvas`) and its reduced-motion/no-JS-yet static fallback.
- `src/components/marketing` / `src/components/app` — route-group-specific nav bars and scroll/animation helpers.
- `src/components/ui` — hand-rolled shadcn-style primitives (button, card, input, badge).
- `prisma/schema.prisma` — data model: `User`, `World`, `Course`, `Module`, `Lesson`, `Enrollment`, `LessonProgress`, `Quiz`, `Question`, `QuizAttempt`.
- `prisma/seed.ts` — imports each course's full curriculum from `prisma/seed-data/*.ts` and upserts it into the database.
- `prisma/seed-data/` — the actual course content, one file per course (`react-fundamentals.ts`, `nodejs-apis.ts`, `security-fundamentals.ts`, `python-for-data.ts`, `intro-to-cloud-computing.ts`, `gohighlevel-mastery.ts`), each a `CourseContentSeed` (see `types.ts`). Every course was built from real research into comparable courses/products (official docs, roadmap.sh, PortSwigger, OWASP, DataCamp, Udemy/Coursera syllabi, GoHighLevel's own help docs) rather than an arbitrary module count — course sizes range from 14 to 19 modules depending on how much the subject actually covers.

## Content model

- A **World** is a themed category (e.g. "Frontend Kingdom") — one of the nodes on the 3D landing page.
- A **Course** belongs to a World, and holds **Modules**, which hold **Lessons**, structured in three difficulty tiers (Basics → Intermediate → Advanced).
- Lesson content is Markdown (`Lesson.content`), rendered with syntax-highlighted code blocks.
- Each course has exactly **3 checkpoint quizzes** — one `Quiz` (10 multiple-choice `Question`s) attached to the last `Module` of each tier. `POST /api/quizzes/[quizId]/submit` grades server-side and upserts a `QuizAttempt` (score, pass/fail at a 70% threshold, and a per-question right/wrong breakdown) so students see exactly what they got right and wrong and whether they're ready for the next tier. Quizzes don't hard-block progress — they're informational checkpoints, not gates.
- **Enrollment** is free right now (`POST /api/enroll` just creates the row) — `Course.price` exists in the schema so a real Stripe checkout can be slotted in later without a migration.
- **LessonProgress** tracks per-user, per-lesson completion, which drives the dashboard's progress bars.

## Admin

Anything under `/admin` requires a logged-in user with `role: "ADMIN"` (enforced by `src/proxy.ts`, Next.js 16's renamed middleware convention). From there you can create/edit Worlds, Courses, Modules, and Lessons, manage each module's checkpoint quiz questions, and manually enroll a student by email (there's no self-serve checkout yet).

## Deliberately deferred

Not dropped, just sequenced for a later phase: AI mentor/voice, video lessons, gamification (XP/streaks/badges), real payments, community features, an in-browser code playground, and certificates.

## Notes

- SQLite + on-disk file storage means production deployment needs a host with a persistent filesystem (a small VPS, or Render/Fly with a persistent disk) rather than serverless/Vercel.
- `npx tsc --noEmit`, `npm run lint`, and `npm run build` should all pass clean; run them after any change.
