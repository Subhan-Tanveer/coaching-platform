import Link from "next/link";
import { notFound } from "next/navigation";
import { Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { SaveForm } from "@/components/admin/save-form";
import { createQuestion, updateQuestion, deleteQuestion, updateQuiz } from "../../actions";

const OPTIONS = ["A", "B", "C", "D"] as const;

export default async function AdminQuizPage({
  params,
}: {
  params: Promise<{ id: string; quizId: string }>;
}) {
  const { id, quizId } = await params;

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: { orderBy: { order: "asc" } },
      module: { include: { course: { select: { id: true, title: true } } } },
    },
  });

  if (!quiz || quiz.module.course.id !== id) notFound();

  const boundCreateQuestion = createQuestion.bind(null, id, quizId);
  const boundDeleteQuestion = deleteQuestion.bind(null, id, quizId);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href={`/admin/courses/${id}`} className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">
        &larr; {quiz.module.course.title}
      </Link>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">{quiz.title}</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Quiz in &ldquo;{quiz.module.title}&rdquo; &middot; {quiz.questions.length} question{quiz.questions.length === 1 ? "" : "s"} (aim for 10)
      </p>

      <Card className="mt-8 p-2">
        <CardContent>
          <SaveForm
            action={updateQuiz.bind(null, id, quizId)}
            className="flex flex-col gap-2"
            label="Rename quiz"
            successMessage="Quiz renamed"
            size="sm"
            variant="secondary"
            buttonClassName="w-fit"
          >
            <label className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
              Quiz title
            </label>
            <Input name="title" defaultValue={quiz.title} required />
          </SaveForm>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-col gap-3">
        {quiz.questions.map((question, index) => (
          <Card key={question.id} className="p-2">
            <CardContent>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Question {index + 1}
                </span>
                <form action={boundDeleteQuestion.bind(null, question.id)}>
                  <button
                    type="submit"
                    className="rounded-lg p-1 text-[var(--muted)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)]"
                    title="Delete this question"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </form>
              </div>
              <SaveForm
                action={updateQuestion.bind(null, id, quizId, question.id)}
                className="grid gap-3"
                label="Save question"
                successMessage="Question saved"
                size="sm"
                variant="secondary"
                buttonClassName="w-fit"
              >
                <Input name="text" defaultValue={question.text} required />
                <div className="grid gap-3 sm:grid-cols-2">
                  {OPTIONS.map((option) => (
                    <Input
                      key={option}
                      name={`option${option}`}
                      defaultValue={question[`option${option}` as const]}
                      placeholder={`Option ${option}`}
                      required
                    />
                  ))}
                </div>
                <Select name="correctOption" defaultValue={question.correctOption} required>
                  {OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      Correct answer: {option}
                    </option>
                  ))}
                </Select>
              </SaveForm>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-2">
        <CardContent>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            Add question
          </h2>
          <SaveForm
            action={boundCreateQuestion}
            className="grid gap-3"
            label="Add question"
            successMessage="Question added"
            buttonClassName="w-fit"
          >
            <Input name="text" placeholder="Question text" required />
            <div className="grid gap-3 sm:grid-cols-2">
              {OPTIONS.map((option) => (
                <Input key={option} name={`option${option}`} placeholder={`Option ${option}`} required />
              ))}
            </div>
            <Select name="correctOption" defaultValue="A" required>
              {OPTIONS.map((option) => (
                <option key={option} value={option}>
                  Correct answer: {option}
                </option>
              ))}
            </Select>
          </SaveForm>
        </CardContent>
      </Card>

      <Link
        href={`/admin/courses/${id}`}
        className="mt-8 inline-block text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        &larr; Back to the course
      </Link>
    </main>
  );
}
