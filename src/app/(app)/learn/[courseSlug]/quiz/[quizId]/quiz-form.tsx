"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, PartyPopper, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { fetchJson } from "@/lib/fetch-json";
import { celebrateQuizPassed, celebratePerfectQuiz } from "@/lib/celebrate";

type Question = {
  id: string;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
};

type Option = "A" | "B" | "C" | "D";

type Result = {
  score: number;
  total: number;
  passed: boolean;
  breakdown: { questionId: string; selected: Option | null; correct: boolean }[];
};

export function QuizForm({
  quizId,
  questions,
  continueHref,
  initialResult,
}: {
  quizId: string;
  questions: Question[];
  continueHref: string;
  initialResult: Result | null;
}) {
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(initialResult);

  const allAnswered = questions.every((q) => answers[q.id]);

  async function onSubmit() {
    if (!allAnswered) {
      toast.error("Answer every question before submitting");
      return;
    }
    setSubmitting(true);
    const { ok, data, error } = await fetchJson<Result & { error?: string }>(`/api/quizzes/${quizId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    });
    setSubmitting(false);

    if (!ok || !data) {
      toast.error(error ?? data?.error ?? "Couldn't submit quiz");
      return;
    }
    setResult(data);
    if (data.score === data.total) {
      celebratePerfectQuiz();
    } else if (data.passed) {
      celebrateQuizPassed();
    }
  }

  function retake() {
    setResult(null);
    setAnswers({});
  }

  if (result) {
    const breakdownMap = new Map(result.breakdown.map((b) => [b.questionId, b]));
    return (
      <div className="flex flex-col gap-6">
        <Card className="p-2">
          <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
            {result.passed ? (
              <PartyPopper className="size-10 text-[var(--success)]" />
            ) : (
              <RotateCcw className="size-10 text-[var(--warning)]" />
            )}
            <h2 className="text-2xl font-bold">
              {result.score} / {result.total} correct
            </h2>
            <p className="text-[var(--muted)]">
              {result.passed
                ? "Nice work — you're ready for what's next."
                : "You might want to review this section before moving on, but you can continue whenever you're ready."}
            </p>
            <div className="mt-2 flex gap-3">
              <Button variant="secondary" onClick={retake} className="gap-2">
                <RotateCcw className="size-4" />
                Retake quiz
              </Button>
              <Link href={continueHref}>
                <Button>Continue</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3">
          {questions.map((q, i) => {
            const entry = breakdownMap.get(q.id);
            return (
              <Card key={q.id} className="p-2">
                <CardContent className="flex items-start gap-3">
                  {entry?.correct ? (
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--success)]" />
                  ) : (
                    <XCircle className="mt-0.5 size-5 shrink-0 text-[var(--danger)]" />
                  )}
                  <div>
                    <p className="text-sm font-medium">
                      {i + 1}. {q.text}
                    </p>
                    {!entry?.correct && (
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        Your answer: {entry?.selected ? q[`option${entry.selected}` as const] : "—"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {questions.map((q, i) => (
        <Card key={q.id} className="p-2">
          <CardContent>
            <p className="mb-3 text-sm font-medium">
              {i + 1}. {q.text}
            </p>
            <div className="flex flex-col gap-2">
              {(["A", "B", "C", "D"] as const).map((opt) => (
                <label
                  key={opt}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors",
                    answers[q.id] === opt
                      ? "border-[var(--primary)] bg-[var(--muted-bg)]"
                      : "border-[var(--border)] hover:bg-[var(--muted-bg)]"
                  )}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                    className="size-4 accent-[var(--primary)]"
                  />
                  {q[`option${opt}` as const]}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <Button size="lg" loading={submitting} onClick={onSubmit} className="w-fit">
        Submit quiz
      </Button>
    </div>
  );
}
