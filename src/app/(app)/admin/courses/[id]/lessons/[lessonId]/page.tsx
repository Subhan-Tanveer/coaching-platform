import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { MediaField } from "@/components/admin/media-field";
import { SaveForm } from "@/components/admin/save-form";
import { updateLesson } from "../../actions";

export default async function AdminLessonEditPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const { id, lessonId } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } },
  });

  if (!lesson || lesson.module.courseId !== id) notFound();

  const boundUpdateLesson = updateLesson.bind(null, id, lessonId);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href={`/admin/courses/${id}`} className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">
        &larr; {lesson.module.course.title}
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">Edit lesson</h1>

      <Card className="mt-8 p-2">
        <CardContent>
          <SaveForm
            action={boundUpdateLesson}
            className="grid gap-3"
            label="Save lesson"
            successMessage="Lesson saved"
            buttonClassName="w-fit"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <Input name="title" defaultValue={lesson.title} required className="sm:col-span-2" />
              <Input
                name="estimatedMinutes"
                type="number"
                defaultValue={lesson.estimatedMinutes}
                required
              />
            </div>
            <Input name="slug" defaultValue={lesson.slug} required />
            <MediaField
              name="videoUrl"
              kind="video"
              label="Lesson video"
              hint="Paste a YouTube or Vimeo link (free, recommended), or upload a file."
              defaultValue={lesson.videoUrl}
            />
            <Textarea
              name="content"
              defaultValue={lesson.content}
              required
              rows={20}
              className="font-mono text-sm"
            />
          </SaveForm>
        </CardContent>
      </Card>
    </main>
  );
}
