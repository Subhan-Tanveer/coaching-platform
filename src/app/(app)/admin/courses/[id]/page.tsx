import Link from "next/link";
import { notFound } from "next/navigation";
import { Trash2, Plus, ClipboardCheck, Pencil, Video } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { isUnwritten } from "@/lib/lesson-content";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MediaField } from "@/components/admin/media-field";
import { SaveForm } from "@/components/admin/save-form";
import { updateCourseDetails, deleteCourse } from "../actions";
import {
  createModule,
  deleteModule,
  updateModule,
  createLesson,
  deleteLesson,
  createQuiz,
  deleteQuiz,
} from "./actions";

export default async function AdminCourseEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [course, worlds] = await Promise.all([
    prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: { orderBy: { order: "asc" } },
            quiz: { include: { _count: { select: { questions: true } } } },
          },
        },
      },
    }),
    prisma.world.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!course) notFound();

  const boundUpdateCourse = updateCourseDetails.bind(null, course.id);
  const boundDeleteCourse = deleteCourse.bind(null, course.id);
  const boundCreateModule = createModule.bind(null, course.id);
  const boundDeleteModule = deleteModule.bind(null, course.id);
  const boundDeleteQuiz = deleteQuiz.bind(null, course.id);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/admin/courses" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">
        &larr; All courses
      </Link>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{course.title}</h1>

      <Card className="mt-8 p-2">
        <CardContent>
          <h2 className="mb-4 text-lg font-semibold">Course details</h2>
          <SaveForm
            action={boundUpdateCourse}
            className="grid gap-3 sm:grid-cols-2"
            successMessage="Course saved"
            rowClassName="sm:col-span-2"
            buttonClassName="w-full"
          >
            <Input name="title" defaultValue={course.title} required />
            <Input name="slug" defaultValue={course.slug} required />
            <Textarea
              name="description"
              defaultValue={course.description}
              required
              className="sm:col-span-2"
              rows={3}
            />
            <div className="sm:col-span-2">
              <MediaField
                name="heroImage"
                kind="image"
                label="Course image"
                hint="Shown on the course card and at the top of the course page."
                defaultValue={course.heroImage}
              />
            </div>
            <Select name="worldId" defaultValue={course.worldId} required>
              {worlds.map((world) => (
                <option key={world.id} value={world.id}>
                  {world.name}
                </option>
              ))}
            </Select>
            <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <input type="checkbox" name="published" defaultChecked={course.published} className="size-4" />
              Published
            </label>
          </SaveForm>
        </CardContent>
      </Card>

      <h2 className="mb-4 mt-10 text-xl font-semibold tracking-tight">Modules &amp; lessons</h2>
      <div className="flex flex-col gap-4">
        {course.modules.map((mod) => {
          const boundCreateLesson = createLesson.bind(null, course.id, mod.id);
          const boundDeleteLesson = deleteLesson.bind(null, course.id);
          return (
            <Card key={mod.id} className="p-2">
              <CardContent>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <SaveForm
                    action={updateModule.bind(null, course.id, mod.id)}
                    className="flex flex-1 flex-col gap-2"
                    label="Save module"
                    successMessage="Module saved"
                    size="sm"
                    variant="secondary"
                    buttonClassName="w-fit"
                  >
                    <Input name="title" defaultValue={mod.title} required className="max-w-xs" />
                    <MediaField
                      name="image"
                      kind="image"
                      label="Module image"
                      defaultValue={mod.image}
                    />
                  </SaveForm>
                  <form action={boundDeleteModule.bind(null, mod.id)}>
                    <button
                      type="submit"
                      className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)]"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </form>
                </div>
                <ul className="mb-3 flex flex-col gap-1">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-[var(--muted-bg)]">
                      <Link
                        href={`/admin/courses/${course.id}/lessons/${lesson.id}`}
                        className="group flex flex-1 flex-wrap items-center gap-x-2 gap-y-1"
                        title="Edit this lesson"
                      >
                        <Pencil className="size-3.5 shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--primary)]" />
                        <span className="transition-colors group-hover:text-[var(--primary)]">
                          {lesson.title}
                        </span>
                        <span className="text-xs text-[var(--muted)]">{lesson.estimatedMinutes}m</span>
                        {lesson.videoUrl && (
                          <span className="inline-flex items-center gap-1 text-xs text-[var(--success)]">
                            <Video className="size-3.5" />
                            video
                          </span>
                        )}
                        {isUnwritten(lesson.content) && (
                          <span className="text-xs text-[var(--warning)]">not written yet</span>
                        )}
                      </Link>
                      <form action={boundDeleteLesson.bind(null, lesson.id)}>
                        <button
                          type="submit"
                          className="rounded-lg p-1 text-[var(--muted)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)]"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
                <form action={boundCreateLesson} className="flex flex-wrap items-center gap-2">
                  <Input name="title" placeholder="Lesson title" required className="max-w-[180px]" />
                  <Input name="slug" placeholder="lesson-slug" required className="max-w-[160px]" />
                  <Input
                    name="estimatedMinutes"
                    type="number"
                    placeholder="Min"
                    defaultValue={5}
                    required
                    className="max-w-[80px]"
                  />
                  <Button type="submit" size="sm" variant="secondary" className="gap-1">
                    <Plus className="size-3.5" />
                    Add lesson
                  </Button>
                </form>

                <div className="mt-3 border-t border-[var(--border)] pt-3">
                  {mod.quiz ? (
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/admin/courses/${course.id}/modules/${mod.id}/quiz`}
                        className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                      >
                        <ClipboardCheck className="size-4" />
                        {mod.quiz.title} &middot; {mod.quiz._count.questions} questions
                      </Link>
                      <form action={boundDeleteQuiz.bind(null, mod.quiz.id)}>
                        <button
                          type="submit"
                          className="rounded-lg p-1 text-[var(--muted)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)]"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </form>
                    </div>
                  ) : (
                    <form action={createQuiz.bind(null, course.id, mod.id)} className="flex items-center gap-2">
                      <Input name="title" placeholder="Checkpoint quiz title" required className="max-w-[220px]" />
                      <Button type="submit" size="sm" variant="secondary" className="gap-1">
                        <ClipboardCheck className="size-3.5" />
                        Add quiz
                      </Button>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 p-2">
        <CardContent>
          <form action={boundCreateModule} className="flex items-center gap-2">
            <Input name="title" placeholder="New module title" required />
            <Button type="submit" size="sm" className="gap-1 shrink-0">
              <Plus className="size-3.5" />
              Add module
            </Button>
          </form>
        </CardContent>
      </Card>

      <form action={boundDeleteCourse} className="mt-10">
        <Button type="submit" variant="danger" size="sm">
          Delete this course
        </Button>
      </form>
    </main>
  );
}
