"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/lib/action-result";

type Props = {
  published: boolean;
  action: (formData: FormData) => Promise<ActionResult>;
};

/**
 * Draft/Live switch for a course. While the action is in flight the track
 * shows where it is heading, so the flip feels immediate even though the real
 * state only arrives with the server's re-render.
 */
export function PublishToggle({ published, action }: Props) {
  const [pending, startTransition] = useTransition();
  const target = pending ? !published : published;

  function toggle() {
    const formData = new FormData();
    formData.set("published", String(!published));

    startTransition(async () => {
      const result = await action(formData);
      if (result.ok) toast.success(result.message ?? "Saved");
      else toast.error(result.error);
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            target ? "text-[var(--success)]" : "text-[var(--warning)]"
          )}
        >
          {target ? "Live" : "Draft"}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={target}
          aria-label={published ? "Unpublish this course" : "Publish this course"}
          onClick={toggle}
          disabled={pending}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full border border-[var(--border)] transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40",
            target ? "bg-[var(--success)]" : "bg-[var(--muted-bg)]",
            pending && "opacity-60"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 size-4.5 rounded-full bg-white shadow transition-all",
              target ? "left-[calc(100%-1.25rem)]" : "left-0.5"
            )}
          />
        </button>
      </div>
      <p className="max-w-[15rem] text-right text-xs text-[var(--muted)]">
        {target ? "Students can find this course." : "Hidden from students until you publish."}
      </p>
    </div>
  );
}
