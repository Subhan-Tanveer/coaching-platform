import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createCourse } from "./actions";

export default async function AdminCoursesPage() {
  const [courses, worlds] = await Promise.all([
    prisma.course.findMany({
      orderBy: { order: "asc" },
      include: { world: true, _count: { select: { enrollments: true, modules: true } } },
    }),
    prisma.world.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
      <p className="mt-2 text-[var(--muted)]">Manage course content, modules, and lessons.</p>

      <div className="mt-10 flex flex-col gap-4">
        {courses.map((course) => (
          <Link key={course.id} href={`/admin/courses/${course.id}`}>
            <Card className="p-2" hover>
              <CardContent className="flex items-center justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <p className="font-semibold">{course.title}</p>
                    {!course.published && <Badge variant="warning">Draft</Badge>}
                  </div>
                  <p className="text-xs text-[var(--muted)]">
                    {course.world.name} &middot; {course._count.modules} modules &middot;{" "}
                    {course._count.enrollments} enrolled
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-10 p-2">
        <CardContent>
          <h2 className="mb-4 text-lg font-semibold">Create a course</h2>
          {worlds.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">
              Create a world first before adding courses.
            </p>
          ) : (
            <form action={createCourse} className="grid gap-3 sm:grid-cols-2">
              <Input name="title" placeholder="Title" required />
              <Input name="slug" placeholder="Slug (e.g. react-fundamentals)" required />
              <Textarea name="description" placeholder="Description" required className="sm:col-span-2" rows={3} />
              <Select name="worldId" required defaultValue="">
                <option value="" disabled>
                  Choose a world
                </option>
                {worlds.map((world) => (
                  <option key={world.id} value={world.id}>
                    {world.name}
                  </option>
                ))}
              </Select>
              <Button type="submit">Create course</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
