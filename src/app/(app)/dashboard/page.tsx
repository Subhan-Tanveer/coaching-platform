import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JourneyMap, type JourneyModule } from "@/components/app/journey-map";
import { VideoPlaylist } from "@/components/marketing/video-playlist";

const DASHBOARD_CLIPS = [
  "/videos/hero.mp4",
  "/videos/frontend-kingdom.mp4",
  "/videos/backend-factory.mp4",
  "/videos/cyber-security-hq.mp4",
  "/videos/data-science-lab.mp4",
  "/videos/cloud-mountains.mp4",
  "/videos/marketing-city.mp4",
];

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    orderBy: { enrolledAt: "desc" },
    include: {
      course: {
        include: {
          world: true,
          modules: {
            orderBy: { order: "asc" },
            include: {
              lessons: { orderBy: { order: "asc" } },
              quizzes: { orderBy: { order: "asc" }, select: { id: true } },
            },
          },
        },
      },
    },
  });

  const lessonIds = enrollments.flatMap((e) => e.course.modules.flatMap((m) => m.lessons.map((l) => l.id)));
  const quizIds = enrollments.flatMap((e) =>
    e.course.modules.flatMap((m) => m.quizzes.map((q) => q.id))
  );

  const [progressRows, quizAttempts] = await Promise.all([
    prisma.lessonProgress.findMany({
      where: { userId, lessonId: { in: lessonIds }, completed: true },
      select: { lessonId: true },
    }),
    prisma.quizAttempt.findMany({
      where: { userId, quizId: { in: quizIds } },
      select: { quizId: true, passed: true },
    }),
  ]);
  const completedSet = new Set(progressRows.map((p) => p.lessonId));
  const passedQuizSet = new Set(quizAttempts.filter((a) => a.passed).map((a) => a.quizId));
  const attemptedQuizSet = new Set(quizAttempts.map((a) => a.quizId));

  return (
    <main>
      <section className="relative overflow-hidden px-6 pb-10 pt-16">
        <VideoPlaylist sources={DASHBOARD_CLIPS} />
        <div className="relative z-10 mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold tracking-tight">My courses</h1>
          <p className="mt-2 text-[var(--muted)]">Pick up right where you left off.</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 pb-16">
        {enrollments.length === 0 ? (
          <Card className="mt-10 p-2">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <CardTitle>No courses yet</CardTitle>
              <CardDescription>You haven&apos;t enrolled in anything yet — go pick a world.</CardDescription>
              <Link
                href="/"
                className="inline-flex h-10 items-center justify-center rounded-xl gradient-bg px-4 text-sm font-medium text-[var(--primary-foreground)]"
              >
                Explore worlds
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-10 flex flex-col gap-6">
          {enrollments.map((enrollment) => {
            const allLessons = enrollment.course.modules.flatMap((m) => m.lessons);
            const completedCount = allLessons.filter((l) => completedSet.has(l.id)).length;
            const pct = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;
            const nextLesson = allLessons.find((l) => !completedSet.has(l.id)) ?? allLessons[0];

            const journeyModules: JourneyModule[] = enrollment.course.modules
              .filter((mod) => mod.lessons.length > 0)
              .map((mod) => ({
                id: mod.id,
                title: mod.title,
                firstLessonSlug: mod.lessons[0].slug,
                totalLessons: mod.lessons.length,
                completedLessons: mod.lessons.filter((l) => completedSet.has(l.id)).length,
                hasQuiz: mod.quizzes.length > 0,
                // Green only once every quiz in the module is passed.
                quizPassed:
                  mod.quizzes.length === 0
                    ? null
                    : mod.quizzes.every((q) => passedQuizSet.has(q.id))
                      ? true
                      : mod.quizzes.some((q) => attemptedQuizSet.has(q.id))
                        ? false
                        : null,
              }));

            return (
              <Card key={enrollment.id} className="p-2" hover>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <Badge
                        className="w-fit"
                        style={{
                          background: `${enrollment.course.world.colorTheme}22`,
                          color: enrollment.course.world.colorTheme,
                        }}
                      >
                        {enrollment.course.world.name}
                      </Badge>
                      <CardTitle className="mt-2">{enrollment.course.title}</CardTitle>
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {completedCount} of {allLessons.length} lessons complete
                      </p>
                    </div>
                    {nextLesson && (
                      <Link
                        href={`/learn/${enrollment.course.slug}/${nextLesson.slug}`}
                        className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl gradient-bg px-4 text-sm font-medium text-[var(--primary-foreground)] hover:brightness-110"
                      >
                        {pct === 0 ? "Start course" : pct === 100 ? "Review course" : "Continue"}
                      </Link>
                    )}
                  </div>

                  <JourneyMap
                    courseSlug={enrollment.course.slug}
                    modules={journeyModules}
                    colorTheme={enrollment.course.world.colorTheme}
                  />
                </CardContent>
              </Card>
            );
          })}
          </div>
        )}
      </div>
    </main>
  );
}
