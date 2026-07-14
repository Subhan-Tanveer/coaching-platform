import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSessionUser, STALE_SESSION_MESSAGE } from "@/lib/session-user";

const submitSchema = z.object({
  answers: z.record(z.string(), z.enum(["A", "B", "C", "D"])),
});

const PASS_THRESHOLD = 0.7;

export async function POST(req: Request, { params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await params;
  const user = await requireSessionUser();
  if (!user) {
    return NextResponse.json({ error: STALE_SESSION_MESSAGE }, { status: 401 });
  }

  const body = await req.json();
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: { orderBy: { order: "asc" } },
      module: { include: { course: true } },
    },
  });
  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: quiz.module.course.id } },
  });
  if (!enrollment) {
    return NextResponse.json({ error: "Not enrolled in this course" }, { status: 403 });
  }

  const breakdown = quiz.questions.map((question) => {
    const selected = parsed.data.answers[question.id];
    const correct = selected === question.correctOption;
    return { questionId: question.id, selected: selected ?? null, correct };
  });

  const score = breakdown.filter((b) => b.correct).length;
  const total = quiz.questions.length;
  const passed = total > 0 && score / total >= PASS_THRESHOLD;

  await prisma.quizAttempt.upsert({
    where: { userId_quizId: { userId: user.id, quizId } },
    update: { score, total, passed, answers: JSON.stringify(breakdown), completedAt: new Date() },
    create: {
      userId: user.id,
      quizId,
      score,
      total,
      passed,
      answers: JSON.stringify(breakdown),
    },
  });

  return NextResponse.json({ score, total, passed, breakdown });
}
