import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] px-3 text-sm outline-none transition-shadow placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[var(--primary)]/40",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] px-3 py-2 text-sm outline-none transition-shadow placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[var(--primary)]/40",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] px-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-[var(--primary)]/40",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = "Select";
