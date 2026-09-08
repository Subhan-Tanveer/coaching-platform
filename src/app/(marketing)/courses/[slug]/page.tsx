import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, PlayCircle } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/marketing/scroll-reveal";
import { BackgroundVideo } from "@/components/marketing/background-video";
import { EnrollButton } from "./enroll-button";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();

  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      world: true,
      modules: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!course || !course.published) notFound();

  const enrollment = session?.user
    ? await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
      })
    : null;

  const firstLesson = course.modules[0]?.lessons[0];
  const firstLessonHref = firstLesson ? `/learn/${course.slug}/${firstLesson.slug}` : null;
  const lessonCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const totalMinutes = course.modules.reduce(
    (sum, m) => sum + m.lessons.reduce((s, l) => s + l.estimatedMinutes, 0),
    0
  );

  return (
    <main>
      <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:pt-40">
        <BackgroundVideo src={`/videos/${course.world.slug}.mp4`} />
        <div className="relative z-10 mx-auto max-w-6xl">
          <ScrollReveal>
            <Link href={`/worlds/${course.world.slug}`}>
              <Badge
                className="mb-4 w-fit"
                style={{ background: `${course.world.colorTheme}22`, color: course.world.colorTheme }}
              >
                {course.world.name}
              </Badge>
            </Link>
            <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">{course.title}</h1>
            <p className="mt-4 max-w-2xl text-[var(--muted)]">{course.description}</p>
            {course.heroImage && (
              <div className="mt-8 aspect-video max-w-2xl overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--muted-bg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={course.heroImage} alt={course.title} className="size-full object-cover" />
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <ScrollReveal>
            <h2 className="mb-4 text-xl font-semibold tracking-tight">Curriculum</h2>
            <div className="flex flex-col gap-4">
              {course.modules.map((mod) => (
                <Card key={mod.id} className="p-2">
                  <CardContent>
                    {mod.image && (
                      <div className="-mx-2 -mt-2 mb-3 aspect-[3/1] overflow-hidden rounded-t-[var(--radius)] bg-[var(--muted-bg)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={mod.image} alt={mod.title} className="size-full object-cover" loading="lazy" />
                      </div>
                    )}
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                      {mod.title}
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {mod.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-[var(--muted-bg)]"
                        >
                          <span className="flex items-center gap-2">
                            <PlayCircle className="size-4 text-[var(--primary)]" />
                            {lesson.title}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                            <Clock className="size-3.5" />
                            {lesson.estimatedMinutes}m
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <Card className="sticky top-24 p-2">
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold">Free</span>
                  <span className="text-xs text-[var(--muted)]">
                    {course.modules.length} modules &middot; {lessonCount} lessons &middot; {totalMinutes} min
                  </span>
                </div>
                {enrollment ? (
                  <Link href={firstLessonHref ?? "/dashboard"}>
                    <button className="inline-flex h-12 w-full items-center justify-center rounded-xl gradient-bg text-base font-medium text-[var(--primary-foreground)] shadow-[var(--shadow-lift)] hover:brightness-110">
                      Continue learning
                    </button>
                  </Link>
                ) : (
                  <EnrollButton
                    courseId={course.id}
                    isLoggedIn={!!session?.user}
                    firstLessonHref={firstLessonHref}
                  />
                )}
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
