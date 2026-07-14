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

const worldSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  colorTheme: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a hex color like #22d3ee"),
});

export async function createWorld(formData: FormData) {
  await requireAdmin();

  const parsed = worldSchema.parse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    colorTheme: formData.get("colorTheme"),
  });

  const maxOrder = await prisma.world.aggregate({ _max: { order: true } });

  await prisma.world.create({
    data: { ...parsed, order: (maxOrder._max.order ?? -1) + 1 },
  });

  revalidatePath("/admin/worlds");
  revalidatePath("/");
}

export async function deleteWorld(worldId: string) {
  await requireAdmin();

  const courseCount = await prisma.course.count({ where: { worldId } });
  if (courseCount > 0) {
    throw new Error("Move or delete this world's courses before deleting it");
  }

  await prisma.world.delete({ where: { id: worldId } });
  revalidatePath("/admin/worlds");
  revalidatePath("/");
}
