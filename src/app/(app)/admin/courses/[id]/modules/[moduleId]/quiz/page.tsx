import Link from "next/link";
import { notFound } from "next/navigation";
import { Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createQuestion, deleteQuestion } from "../../../actions";

export default async function AdminQuizPage({
  params,
}: {
  params: Promise<{ id: string; moduleId: string }>;
}) {
  const { id, moduleId } = await params;

  const mod = await prisma.module.findUnique({
    where: { id: moduleId },
    include: {
      course: true,
      quiz: { include: { questions: { orderBy: { order: "asc" } } } },
    },
  });

  if (!mod || mod.courseId !== id || !mod.quiz) notFound();

  const boundCreateQuestion = createQuestion.bind(null, id, moduleId, mod.quiz.id);
  const boundDeleteQuestion = deleteQuestion.bind(null, id, moduleId);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href={`/admin/courses/${id}`} className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">
        &larr; {mod.course.title}
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">{mod.quiz.title}</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Checkpoint for &ldquo;{mod.title}&rdquo; &middot; {mod.quiz.questions.length} questions (aim for 10)
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {mod.quiz.questions.map((q, i) => (
          <Card key={q.id} className="p-2">
            <CardContent>
              <div className="mb-2 flex items-start justify-between gap-3">
                <p className="text-sm font-medium">
                  {i + 1}. {q.text}
                </p>
                <form action={boundDeleteQuestion.bind(null, q.id)}>
                  <button
                    type="submit"
                    className="rounded-lg p-1 text-[var(--muted)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)]"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </form>
              </div>
              <ul className="grid gap-1 text-xs text-[var(--muted)] sm:grid-cols-2">
                {(["A", "B", "C", "D"] as const).map((opt) => (
                  <li key={opt} className={opt === q.correctOption ? "font-medium text-[var(--success)]" : undefined}>
                    {opt}. {q[`option${opt}` as const]}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-2">
        <CardContent>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">Add question</h2>
          <form action={boundCreateQuestion} className="grid gap-3">
            <Input name="text" placeholder="Question text" required />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input name="optionA" placeholder="Option A" required />
              <Input name="optionB" placeholder="Option B" required />
              <Input name="optionC" placeholder="Option C" required />
              <Input name="optionD" placeholder="Option D" required />
            </div>
            <Select name="correctOption" defaultValue="A" required>
              <option value="A">Correct answer: A</option>
              <option value="B">Correct answer: B</option>
              <option value="C">Correct answer: C</option>
              <option value="D">Correct answer: D</option>
            </Select>
            <Button type="submit" className="w-fit">
              Add question
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
