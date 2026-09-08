import Link from "next/link";
import { Compass, Map, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/marketing/scroll-reveal";
import { CourseThumb } from "@/components/marketing/course-thumb";
import { VideoPlaylist } from "@/components/marketing/video-playlist";

const HERO_CLIPS = [
  "/videos/hero.mp4",
  "/videos/frontend-kingdom.mp4",
  "/videos/backend-factory.mp4",
  "/videos/cyber-security-hq.mp4",
  "/videos/data-science-lab.mp4",
  "/videos/cloud-mountains.mp4",
  "/videos/marketing-city.mp4",
];

const STEPS = [
  {
    icon: Map,
    title: "Pick a world",
    description: "Every subject is a place, not a category. Fly into the one that matches what you want to learn.",
  },
  {
    icon: Compass,
    title: "Work through missions",
    description: "Courses are broken into focused, hands-on lessons you can finish in one sitting.",
  },
  {
    icon: TrendingUp,
    title: "Track real progress",
    description: "Every lesson you complete shows up on your dashboard, so you always know what's next.",
  },
];

export default async function HomePage() {
  const worlds = await prisma.world.findMany({
    orderBy: { order: "asc" },
    select: { slug: true, name: true, tagline: true, colorTheme: true },
  });

  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    take: 6,
    include: { world: true, modules: { include: { lessons: true } } },
  });

  return (
    <main>
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-28 text-center">
        <VideoPlaylist sources={HERO_CLIPS} />
        <div className="relative z-10 flex flex-col items-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            Nexus Academy
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Step into a world.
            <br />
            <span className="gradient-text">Come out knowing it.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-[var(--muted)] sm:text-lg">
            Every subject is a place. Pick a world below to start learning.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/courses">
              <Button size="lg">Browse all courses</Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline">
                Create free account
              </Button>
            </Link>
          </div>
          <div className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
            {worlds.map((world) => (
              <Link
                key={world.slug}
                href={`/worlds/${world.slug}`}
                className="glass flex flex-col items-center gap-1 rounded-2xl p-4 text-center transition-transform hover:-translate-y-1"
              >
                <span
                  className="mb-1 size-2.5 rounded-full"
                  style={{ background: world.colorTheme, boxShadow: `0 0 14px ${world.colorTheme}` }}
                />
                <span className="text-sm font-semibold">{world.name}</span>
                <span className="text-xs text-[var(--muted)]">{world.tagline}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <ScrollReveal className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--muted)]">Three steps between you and a new skill.</p>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <ScrollReveal key={step.title} className={i === 1 ? "sm:translate-y-6" : undefined}>
              <Card className="h-full p-2" hover tilt>
                <CardContent className="flex flex-col items-start gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl gradient-bg text-[var(--primary-foreground)]">
                    <step.icon className="size-5" />
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <ScrollReveal className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured courses</h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--muted)]">
            A sample of what&apos;s live across every world right now.
          </p>
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const lessonCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
            return (
              <ScrollReveal key={course.id}>
                <Link href={`/courses/${course.slug}`}>
                  <Card className="h-full p-2" hover tilt>
                    <CardContent className="flex h-full flex-col gap-3">
                      <CourseThumb src={course.heroImage} alt={course.title} />
                      <Badge
                        className="w-fit"
                        style={{ background: `${course.world.colorTheme}22`, color: course.world.colorTheme }}
                      >
                        {course.world.name}
                      </Badge>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription className="flex-1">{course.description}</CardDescription>
                      <p className="text-xs text-[var(--muted)]">
                        {course.modules.length} modules &middot; {lessonCount} lessons
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-32 pt-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to fly in?</h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--muted)]">
            Create a free account and start your first mission today.
          </p>
          <Link href="/signup" className="mt-8 inline-block">
            <Button size="lg">Create free account</Button>
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
