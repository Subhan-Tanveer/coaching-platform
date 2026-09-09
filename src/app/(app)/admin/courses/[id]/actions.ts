"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ActionResult } from "@/lib/action-result";
import { newLessonContent } from "@/lib/lesson-content";

function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Please check the fields and try again.";
}

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
  title: z.string().min(1, "Give the module a title."),
  image: z
    .string()
    .nullish()
    .transform((v) => v?.trim() || null),
});

export async function updateModule(
  courseId: string,
  moduleId: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = moduleUpdateSchema.safeParse({
    title: formData.get("title"),
    image: formData.get("image"),
  });
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };

  await prisma.module.update({ where: { id: moduleId }, data: parsed.data });

  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath("/courses");
  return { ok: true };
}

const lessonSchema = z.object({
  title: z.string().min(1, "Give the lesson a title."),
  slug: z
    .string()
    .min(1, "Give the lesson a slug, e.g. understanding-promises.")
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
      content: newLessonContent(parsed.title),
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
  title: z.string().min(1, "Give the lesson a title."),
  slug: z
    .string()
    .min(1, "Give the lesson a slug, e.g. understanding-promises.")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  estimatedMinutes: z.coerce
    .number()
    .int()
    .min(1, "Lesson length must be at least 1 minute.")
    .max(300, "Lesson length must be 300 minutes or less."),
  content: z.string().min(1, "Write something in the lesson content box."),
  // YouTube/Vimeo link or an uploaded file URL; blank means "no video".
  videoUrl: z
    .string()
    .nullish()
    .transform((v) => v?.trim() || null),
});

export async function updateLesson(
  courseId: string,
  lessonId: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = lessonUpdateSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    estimatedMinutes: formData.get("estimatedMinutes"),
    content: formData.get("content"),
    videoUrl: formData.get("videoUrl"),
  });
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };

  try {
    await prisma.lesson.update({ where: { id: lessonId }, data: parsed.data });
  } catch {
    return { ok: false, error: "Couldn't save — another lesson in this module uses that slug." };
  }

  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath(`/admin/courses/${courseId}/lessons/${lessonId}`);
  revalidatePath("/learn", "layout");
  return { ok: true };
}

export async function createQuiz(courseId: string, moduleId: string, formData: FormData) {
  await requireAdmin();

  const title = z.string().min(1, "Give the quiz a title.").parse(formData.get("title"));
  const maxOrder = await prisma.quiz.aggregate({ where: { moduleId }, _max: { order: true } });

  const quiz = await prisma.quiz.create({
    data: { moduleId, title, order: (maxOrder._max.order ?? -1) + 1 },
  });

  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath("/learn", "layout");
  redirect(`/admin/courses/${courseId}/quizzes/${quiz.id}`);
}

export async function updateQuiz(
  courseId: string,
  quizId: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = z
    .object({ title: z.string().min(1, "Give the quiz a title.") })
    .safeParse({ title: formData.get("title") });
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };

  await prisma.quiz.update({ where: { id: quizId }, data: parsed.data });

  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath(`/admin/courses/${courseId}/quizzes/${quizId}`);
  revalidatePath("/learn", "layout");
  return { ok: true };
}

export async function deleteQuiz(courseId: string, quizId: string) {
  await requireAdmin();
  await prisma.quiz.delete({ where: { id: quizId } });
  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath("/learn", "layout");
}

const questionSchema = z.object({
  text: z.string().min(1, "Write the question."),
  optionA: z.string().min(1, "Fill in option A."),
  optionB: z.string().min(1, "Fill in option B."),
  optionC: z.string().min(1, "Fill in option C."),
  optionD: z.string().min(1, "Fill in option D."),
  correctOption: z.enum(["A", "B", "C", "D"]),
});

function readQuestion(formData: FormData) {
  return questionSchema.safeParse({
    text: formData.get("text"),
    optionA: formData.get("optionA"),
    optionB: formData.get("optionB"),
    optionC: formData.get("optionC"),
    optionD: formData.get("optionD"),
    correctOption: formData.get("correctOption"),
  });
}

export async function createQuestion(
  courseId: string,
  quizId: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = readQuestion(formData);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };

  const maxOrder = await prisma.question.aggregate({ where: { quizId }, _max: { order: true } });

  await prisma.question.create({
    data: { ...parsed.data, quizId, order: (maxOrder._max.order ?? -1) + 1 },
  });

  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath(`/admin/courses/${courseId}/quizzes/${quizId}`);
  return { ok: true };
}

export async function updateQuestion(
  courseId: string,
  quizId: string,
  questionId: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = readQuestion(formData);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };

  await prisma.question.update({ where: { id: questionId }, data: parsed.data });

  revalidatePath(`/admin/courses/${courseId}/quizzes/${quizId}`);
  return { ok: true };
}

export async function deleteQuestion(courseId: string, quizId: string, questionId: string) {
  await requireAdmin();
  await prisma.question.delete({ where: { id: questionId } });
  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath(`/admin/courses/${courseId}/quizzes/${quizId}`);
}
