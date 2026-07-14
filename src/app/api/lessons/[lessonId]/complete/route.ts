import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSessionUser, STALE_SESSION_MESSAGE } from "@/lib/session-user";

export async function POST(_req: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const user = await requireSessionUser();
  if (!user) {
    return NextResponse.json({ error: STALE_SESSION_MESSAGE }, { status: 401 });
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } },
  });
  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: lesson.module.course.id } },
  });
  if (!enrollment) {
    return NextResponse.json({ error: "Not enrolled in this course" }, { status: 403 });
  }

  await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId: user.id, lessonId } },
    update: { completed: true, completedAt: new Date() },
    create: { userId: user.id, lessonId, completed: true, completedAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
