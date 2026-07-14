"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fetchJson } from "@/lib/fetch-json";
import { celebrateLessonComplete } from "@/lib/celebrate";

export function MarkCompleteButton({ lessonId, initiallyCompleted }: { lessonId: string; initiallyCompleted: boolean }) {
  const router = useRouter();
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [isPending, startTransition] = useTransition();

  async function onClick() {
    const { ok, error } = await fetchJson(`/api/lessons/${lessonId}/complete`, { method: "POST" });
    if (!ok) {
      toast.error(error ?? "Couldn't mark this lesson complete");
      return;
    }
    setCompleted(true);
    toast.success("Lesson complete!");
    celebrateLessonComplete();
    startTransition(() => router.refresh());
  }

  if (completed) {
    return (
      <Button variant="secondary" disabled className="gap-2">
        <CheckCircle2 className="size-4 text-[var(--success)]" />
        Completed
      </Button>
    );
  }

  return (
    <Button onClick={onClick} loading={isPending} className="gap-2">
      <CheckCircle2 className="size-4" />
      Mark complete
    </Button>
  );
}
