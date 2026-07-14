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

const courseSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  title: z.string().min(1),
  description: z.string().min(1),
  worldId: z.string().min(1),
});

export async function createCourse(formData: FormData) {
  await requireAdmin();

  const parsed = courseSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    description: formData.get("description"),
    worldId: formData.get("worldId"),
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

export async function updateCourseDetails(courseId: string, formData: FormData) {
  await requireAdmin();

  const parsed = courseSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    description: formData.get("description"),
    worldId: formData.get("worldId"),
  });
  const published = formData.get("published") === "on";

  await prisma.course.update({
    where: { id: courseId },
    data: { ...parsed, published },
  });

  revalidatePath(`/admin/courses/${courseId}`);
  revalidatePath("/courses");
  revalidatePath("/");
}

export async function deleteCourse(courseId: string) {
  await requireAdmin();
  await prisma.course.delete({ where: { id: courseId } });
  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect("/admin/courses");
}
