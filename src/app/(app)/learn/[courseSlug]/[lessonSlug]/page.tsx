import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, Clock, ClipboardCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { MarkCompleteButton } from "./mark-complete-button";
import "highlight.js/styles/github-dark.css";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;
  const session = await auth();
  const userId = session!.user.id;

  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
          quiz: { select: { id: true, title: true } },
        },
      },
    },
  });
  if (!course) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId: course.id } },
  });
  if (!enrollment) redirect(`/courses/${course.slug}`);

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentIndex = allLessons.findIndex((l) => l.slug === lessonSlug);
  const lesson = allLessons[currentIndex];
  if (!lesson) notFound();

  const currentModule = course.modules.find((m) => m.id === lesson.moduleId)!;
  const currentModuleIndex = course.modules.findIndex((m) => m.id === currentModule.id);
  const isLastLessonInModule = currentModule.lessons[currentModule.lessons.length - 1]?.id === lesson.id;

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLessonInFlat = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const nextStep =
    isLastLessonInModule && currentModule.quiz
      ? { href: `/learn/${course.slug}/quiz/${currentModule.quiz.id}`, label: currentModule.quiz.title }
      : nextLessonInFlat
        ? { href: `/learn/${course.slug}/${nextLessonInFlat.slug}`, label: nextLessonInFlat.title }
        : null;

  const [progressRows, quizAttempts] = await Promise.all([
    prisma.lessonProgress.findMany({
      where: { userId, lessonId: { in: allLessons.map((l) => l.id) }, completed: true },
      select: { lessonId: true },
    }),
    prisma.quizAttempt.findMany({
      where: {
        userId,
        quizId: { in: course.modules.map((m) => m.quiz?.id).filter((id): id is string => !!id) },
      },
      select: { quizId: true, score: true, total: true, passed: true },
    }),
  ]);
  const completedSet = new Set(progressRows.map((p) => p.lessonId));
  const attemptByQuizId = new Map(quizAttempts.map((a) => [a.quizId, a]));

  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[280px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Link href={`/courses/${course.slug}`} className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">
          &larr; {course.title}
        </Link>
        <nav className="mt-4 flex flex-col gap-4">
          {course.modules.map((mod) => (
            <div key={mod.id}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{mod.title}</p>
              <ul className="flex flex-col gap-0.5">
                {mod.lessons.map((l) => {
                  const isCurrent = l.id === lesson.id;
                  const isDone = completedSet.has(l.id);
                  return (
                    <li key={l.id}>
                      <Link
                        href={`/learn/${course.slug}/${l.slug}`}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
                          isCurrent
                            ? "bg-[var(--muted-bg)] text-[var(--foreground)]"
                            : "text-[var(--muted)] hover:text-[var(--foreground)]"
                        )}
                      >
                        {isDone ? (
                          <CheckCircle2 className="size-4 shrink-0 text-[var(--success)]" />
                        ) : (
                          <Circle className="size-4 shrink-0" />
                        )}
                        {l.title}
                      </Link>
                    </li>
                  );
                })}
                {mod.quiz && (
                  <li>
                    <Link
                      href={`/learn/${course.slug}/quiz/${mod.quiz.id}`}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    >
                      <ClipboardCheck
                        className={cn(
                          "size-4 shrink-0",
                          attemptByQuizId.get(mod.quiz.id)?.passed && "text-[var(--success)]"
                        )}
                      />
                      {mod.quiz.title}
                      {attemptByQuizId.has(mod.quiz.id) && (
                        <span className="ml-auto text-xs">
                          {attemptByQuizId.get(mod.quiz.id)!.score}/{attemptByQuizId.get(mod.quiz.id)!.total}
                        </span>
                      )}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <article>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="mb-1 text-xs text-[var(--muted)]">
              Module {currentModuleIndex + 1}: {currentModule.title}
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{lesson.title}</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-[var(--muted)]">
              <Clock className="size-3.5" />
              {lesson.estimatedMinutes} min
            </p>
          </div>
          <MarkCompleteButton lessonId={lesson.id} initiallyCompleted={completedSet.has(lesson.id)} />
        </div>

        <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-a:text-[var(--primary)] prose-code:before:content-none prose-code:after:content-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {lesson.content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-[var(--border)] pt-6">
          {prevLesson ? (
            <Link
              href={`/learn/${course.slug}/${prevLesson.slug}`}
              className="flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              <ChevronLeft className="size-4" />
              {prevLesson.title}
            </Link>
          ) : (
            <span />
          )}
          {nextStep ? (
            <Link
              href={nextStep.href}
              className="flex items-center gap-1 text-sm font-medium text-[var(--primary)]"
            >
              {nextStep.label}
              <ChevronRight className="size-4" />
            </Link>
          ) : (
            <Link href="/dashboard" className="text-sm font-medium text-[var(--primary)]">
              Back to dashboard
            </Link>
          )}
        </div>
      </article>
    </main>
  );
}
