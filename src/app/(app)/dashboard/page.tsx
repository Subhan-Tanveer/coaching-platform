import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JourneyMap, type JourneyModule } from "@/components/app/journey-map";

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
              quiz: { select: { id: true } },
            },
          },
        },
      },
    },
  });

  const lessonIds = enrollments.flatMap((e) => e.course.modules.flatMap((m) => m.lessons.map((l) => l.id)));
  const quizIds = enrollments.flatMap((e) =>
    e.course.modules.map((m) => m.quiz?.id).filter((id): id is string => !!id)
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
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">My courses</h1>
      <p className="mt-2 text-[var(--muted)]">Pick up right where you left off.</p>

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
                hasQuiz: !!mod.quiz,
                quizPassed: mod.quiz
                  ? passedQuizSet.has(mod.quiz.id)
                    ? true
                    : attemptedQuizSet.has(mod.quiz.id)
                      ? false
                      : null
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
    </main>
  );
}
