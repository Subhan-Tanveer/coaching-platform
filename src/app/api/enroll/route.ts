import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSessionUser, STALE_SESSION_MESSAGE } from "@/lib/session-user";

const enrollSchema = z.object({
  courseId: z.string().min(1),
});

export async function POST(req: Request) {
  const user = await requireSessionUser();
  if (!user) {
    return NextResponse.json({ error: STALE_SESSION_MESSAGE }, { status: 401 });
  }

  const body = await req.json();
  const parsed = enrollSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const course = await prisma.course.findUnique({ where: { id: parsed.data.courseId } });
  if (!course || !course.published) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const enrollment = await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    update: {},
    create: { userId: user.id, courseId: course.id },
  });

  return NextResponse.json({ ok: true, enrollmentId: enrollment.id });
}
