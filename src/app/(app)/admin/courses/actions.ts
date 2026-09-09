"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { ActionResult } from "@/lib/action-result";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
}

function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Please check the fields and try again.";
}

const courseSchema = z.object({
  slug: z
    .string()
    .min(1, "Give the course a slug, e.g. advanced-javascript.")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  title: z.string().min(1, "Give the course a title."),
  description: z.string().min(1, "Add a short course description."),
  worldId: z.string().min(1, "Pick a world for this course."),
  // Either a pasted URL or an uploaded Blob URL; blank means "no image".
  heroImage: z
    .string()
    .nullish()
    .transform((v) => v?.trim() || null),
});

export async function createCourse(formData: FormData) {
  await requireAdmin();

  const parsed = courseSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    description: formData.get("description"),
    worldId: formData.get("worldId"),
    heroImage: formData.get("heroImage"),
  });

  const maxOrder = await prisma.course.aggregate({
    where: { worldId: parsed.worldId },
    _max: { order: true },
  });

  const course = await prisma.course.create({
    data: { ...parsed, order: (maxOrder._max.order ?? -1) + 1, published: true },
  });

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect(`/admin/courses/${course.id}`);
}

export async function updateCourseDetails(
  courseId: string,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = courseSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    description: formData.get("description"),
    worldId: formData.get("worldId"),
    heroImage: formData.get("heroImage"),
  });
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };

  const published = formData.get("published") === "on";

  try {
    await prisma.course.update({
      where: { id: courseId },
      data: { ...parsed.data, published },
    });
  } catch {
    return { ok: false, error: "Couldn't save — that slug is probably taken." };
  }

  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath("/courses");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteCourse(courseId: string) {
  await requireAdmin();
  await prisma.course.delete({ where: { id: courseId } });
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect("/admin/courses");
}
