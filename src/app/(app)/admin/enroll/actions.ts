"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
}

const enrollSchema = z.object({
  email: z.string().email(),
  courseId: z.string().min(1),
});

export async function enrollStudentByEmail(formData: FormData) {
  await requireAdmin();

  const parsed = enrollSchema.parse({
    email: formData.get("email"),
    courseId: formData.get("courseId"),
  });

  const student = await prisma.user.findUnique({ where: { email: parsed.email.toLowerCase() } });
  if (!student) {
    throw new Error("No user found with that email");
  }

  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: student.id, courseId: parsed.courseId } },
    update: {},
    create: { userId: student.id, courseId: parsed.courseId },
  });

  revalidatePath("/admin/enroll");
}

export async function removeEnrollment(enrollmentId: string) {
  await requireAdmin();
  await prisma.enrollment.delete({ where: { id: enrollmentId } });
  revalidatePath("/admin/enroll");
}
