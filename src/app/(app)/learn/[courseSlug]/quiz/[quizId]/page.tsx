import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { QuizForm } from "./quiz-form";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ courseSlug: string; quizId: string }>;
}) {
  const { courseSlug, quizId } = await params;
  const session = await auth();
  const userId = session!.user.id;

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: { orderBy: { order: "asc" } },
      module: {
        include: {
          course: {
            include: { modules: { orderBy: { order: "asc" }, include: { lessons: { orderBy: { order: "asc" } } } } },
          },
        },
      },
    },
  });
  if (!quiz || quiz.module.course.slug !== courseSlug) notFound();

  const course = quiz.module.course;
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId: course.id } },
  });
  if (!enrollment) redirect(`/courses/${course.slug}`);

  const moduleIndex = course.modules.findIndex((m) => m.id === quiz.module.id);
  const currentModule = course.modules[moduleIndex];
  const nextModule = course.modules[moduleIndex + 1];
  const continueHref = nextModule?.lessons[0]
    ? `/learn/${course.slug}/${nextModule.lessons[0].slug}`
    : "/dashboard";

  const lastLessonOfModule = currentModule.lessons[currentModule.lessons.length - 1];

  const existingAttempt = await prisma.quizAttempt.findUnique({
    where: { userId_quizId: { userId, quizId } },
  });

  const initialResult = existingAttempt
    ? {
        score: existingAttempt.score,
        total: existingAttempt.total,
        passed: existingAttempt.passed,
        breakdown: JSON.parse(existingAttempt.answers),
      }
    : null;

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      {lastLessonOfModule && (
        <Link
          href={`/learn/${course.slug}/${lastLessonOfModule.slug}`}
          className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          &larr; Back to {quiz.module.title}
        </Link>
      )}
      <h1 className="mt-2 mb-1 text-2xl font-bold tracking-tight sm:text-3xl">{quiz.title}</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">
        {quiz.questions.length} questions &middot; checkpoint for {quiz.module.title}
      </p>

      <QuizForm
        quizId={quiz.id}
        questions={quiz.questions}
        continueHref={continueHref}
        initialResult={initialResult}
      />
    </main>
  );
}
