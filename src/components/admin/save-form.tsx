"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ActionResult } from "@/lib/action-result";

type Props = {
  action: (formData: FormData) => Promise<ActionResult>;
  children: React.ReactNode;
  label?: string;
  successMessage?: string;
  className?: string;
  rowClassName?: string;
  buttonClassName?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
};

/**
 * A server-action form that actually tells you what happened. Saving an admin
 * form used to re-render an identical page, so there was no way to tell a
 * successful save from a rejected one.
 */
export function SaveForm({
  action,
  children,
  label = "Save changes",
  successMessage = "Saved",
  className,
  rowClassName,
  buttonClassName,
  size = "md",
  variant = "primary",
}: Props) {
  const [state, formAction, pending] = useActionState(
    async (_previous: ActionResult | null, formData: FormData) => action(formData),
    null
  );

  // Each submit produces a fresh object, so identity tells us what is new.
  const reported = useRef<ActionResult | null>(null);
  useEffect(() => {
    if (!state || state === reported.current) return;
    reported.current = state;
    if (state.ok) toast.success(successMessage);
    else toast.error(state.error);
  }, [state, successMessage]);

  return (
    <form action={formAction} className={className}>
      {children}
      <div className={rowClassName}>
        <Button
          type="submit"
          loading={pending}
          size={size}
          variant={variant}
          className={cn(buttonClassName)}
        >
          {pending ? "Saving…" : label}
        </Button>
      </div>
    </form>
  );
}
