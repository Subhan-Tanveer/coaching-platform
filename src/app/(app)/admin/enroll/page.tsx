import { Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { enrollStudentByEmail, removeEnrollment } from "./actions";

export default async function AdminEnrollPage() {
  const [courses, enrollments] = await Promise.all([
    prisma.course.findMany({ orderBy: { title: "asc" } }),
    prisma.enrollment.findMany({
      orderBy: { enrolledAt: "desc" },
      take: 30,
      include: { user: true, course: true },
    }),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Enrollments</h1>
      <p className="mt-2 text-[var(--muted)]">Manually enroll a student in a course.</p>

      <Card className="mt-8 p-2">
        <CardContent>
          <form action={enrollStudentByEmail} className="grid gap-3 sm:grid-cols-2">
            <Input name="email" type="email" placeholder="student@email.com" required />
            <Select name="courseId" required defaultValue="">
              <option value="" disabled>
                Choose a course
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </Select>
            <Button type="submit" className="sm:col-span-2">
              Enroll student
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="mb-4 mt-10 text-lg font-semibold">Recent enrollments</h2>
      <div className="flex flex-col gap-2">
        {enrollments.map((enrollment) => (
          <Card key={enrollment.id} className="p-2">
            <CardContent className="flex items-center justify-between gap-4 py-3">
              <div className="text-sm">
                <span className="font-medium">{enrollment.user.email}</span>{" "}
                <span className="text-[var(--muted)]">&rarr; {enrollment.course.title}</span>
              </div>
              <form action={removeEnrollment.bind(null, enrollment.id)}>
                <button
                  type="submit"
                  className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)]"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
