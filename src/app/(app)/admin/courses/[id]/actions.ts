"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
}

export async function createModule(courseId: string, formData: FormData) {
  await requireAdmin();

  const title = z.string().min(1).parse(formData.get("title"));
  const maxOrder = await prisma.module.aggregate({ where: { courseId }, _max: { order: true } });

  await prisma.module.create({
    data: { title, courseId, order: (maxOrder._max.order ?? -1) + 1 },
  });

  revalidatePath(`/admin/courses/${courseId}`);
}

export async function deleteModule(courseId: string, moduleId: string) {
  await requireAdmin();
  await prisma.module.delete({ where: { id: moduleId } });
  revalidatePath(`/admin/courses/${courseId}`);
}

const moduleUpdateSchema = z.object({
  title: z.string().min(1),
  image: z
    .string()
    .nullish()
    .transform((v) => v?.trim() || null),
});

export async function updateModule(courseId: string, moduleId: string, formData: FormData) {
  await requireAdmin();

  const parsed = moduleUpdateSchema.parse({
    title: formData.get("title"),
    image: formData.get("image"),
  });

  await prisma.module.update({ where: { id: moduleId }, data: parsed });

  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath("/courses");
}

const lessonSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  estimatedMinutes: z.coerce.number().int().min(1).max(300),
});

export async function createLesson(courseId: string, moduleId: string, formData: FormData) {
  await requireAdmin();

  const parsed = lessonSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    estimatedMinutes: formData.get("estimatedMinutes"),
  });

  const maxOrder = await prisma.lesson.aggregate({ where: { moduleId }, _max: { order: true } });

  const lesson = await prisma.lesson.create({
    data: {
      ...parsed,
      moduleId,
      order: (maxOrder._max.order ?? -1) + 1,
      content: `# ${parsed.title}\n\nStart writing this lesson's content here.`,
    },
  });

  revalidatePath(`/admin/courses/${courseId}`);
  redirect(`/admin/courses/${courseId}/lessons/${lesson.id}`);
}

export async function deleteLesson(courseId: string, lessonId: string) {
  await requireAdmin();
  await prisma.lesson.delete({ where: { id: lessonId } });
  revalidatePath(`/admin/courses/${courseId}`);
}

const lessonUpdateSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  estimatedMinutes: z.coerce.number().int().min(1).max(300),
  content: z.string().min(1),
  // YouTube/Vimeo link or an uploaded file URL; blank means "no video".
  videoUrl: z
    .string()
    .nullish()
    .transform((v) => v?.trim() || null),
});

export async function updateLesson(courseId: string, lessonId: string, formData: FormData) {
  await requireAdmin();

  const parsed = lessonUpdateSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    estimatedMinutes: formData.get("estimatedMinutes"),
    content: formData.get("content"),
    videoUrl: formData.get("videoUrl"),
  });

  await prisma.lesson.update({ where: { id: lessonId }, data: parsed });

  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath(`/admin/courses/${courseId}/lessons/${lessonId}`);
}

export async function createQuiz(courseId: string, moduleId: string, formData: FormData) {
  await requireAdmin();
  const title = z.string().min(1).parse(formData.get("title"));
  await prisma.quiz.create({ data: { moduleId, title } });
  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath(`/admin/courses/${courseId}/modules/${moduleId}/quiz`);
}

export async function deleteQuiz(courseId: string, quizId: string) {
  await requireAdmin();
  await prisma.quiz.delete({ where: { id: quizId } });
  revalidatePath(`/admin/courses/${courseId}`);
}

const questionSchema = z.object({
  text: z.string().min(1),
  optionA: z.string().min(1),
  optionB: z.string().min(1),
  optionC: z.string().min(1),
  optionD: z.string().min(1),
  correctOption: z.enum(["A", "B", "C", "D"]),
});

export async function createQuestion(courseId: string, moduleId: string, quizId: string, formData: FormData) {
  await requireAdmin();

  const parsed = questionSchema.parse({
    text: formData.get("text"),
    optionA: formData.get("optionA"),
    optionB: formData.get("optionB"),
    optionC: formData.get("optionC"),
    optionD: formData.get("optionD"),
    correctOption: formData.get("correctOption"),
  });

  const maxOrder = await prisma.question.aggregate({ where: { quizId }, _max: { order: true } });

  await prisma.question.create({
    data: { ...parsed, quizId, order: (maxOrder._max.order ?? -1) + 1 },
  });

  revalidatePath(`/admin/courses/${courseId}/modules/${moduleId}/quiz`);
}

export async function deleteQuestion(courseId: string, moduleId: string, questionId: string) {
  await requireAdmin();
  await prisma.question.delete({ where: { id: questionId } });
  revalidatePath(`/admin/courses/${courseId}/modules/${moduleId}/quiz`);
}
