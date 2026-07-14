"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type JourneyModule = {
  id: string;
  title: string;
  firstLessonSlug: string;
  totalLessons: number;
  completedLessons: number;
  hasQuiz: boolean;
  quizPassed: boolean | null;
};

function moduleStatus(mod: JourneyModule): "complete" | "progress" | "upcoming" {
  const lessonsDone = mod.totalLessons > 0 && mod.completedLessons === mod.totalLessons;
  if (lessonsDone && (!mod.hasQuiz || mod.quizPassed === true)) return "complete";
  if (mod.completedLessons > 0) return "progress";
  return "upcoming";
}

export function JourneyMap({
  courseSlug,
  modules,
  colorTheme,
}: {
  courseSlug: string;
  modules: JourneyModule[];
  colorTheme: string;
}) {
  return (
    <div
      className="flex items-center overflow-x-auto pb-1"
      style={{ ["--accent" as string]: colorTheme }}
    >
      {modules.map((mod, i) => {
        const status = moduleStatus(mod);
        const prevComplete = i > 0 && moduleStatus(modules[i - 1]) === "complete";

        return (
          <div key={mod.id} className="flex items-center">
            {i > 0 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.35, delay: i * 0.04, ease: "easeOut" }}
                style={{ transformOrigin: "left", background: prevComplete ? "var(--accent)" : undefined }}
                className={cn("h-0.5 w-5 shrink-0 sm:w-7", !prevComplete && "bg-[var(--border)]")}
              />
            )}
            <Link
              href={`/learn/${courseSlug}/${mod.firstLessonSlug}`}
              className="group flex flex-col items-center gap-1.5"
              title={mod.title}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-semibold transition-colors sm:size-9",
                  status === "progress" && "border-[var(--accent)] text-[var(--accent)]",
                  status === "upcoming" && "border-[var(--border)] text-[var(--muted)]"
                )}
                style={status === "complete" ? { background: "var(--accent)", borderColor: "var(--accent)" } : undefined}
              >
                {status === "complete" ? (
                  <CheckCircle2 className="size-4 text-[var(--background)] sm:size-5" />
                ) : (
                  i + 1
                )}
              </motion.div>
              <span className="max-w-[60px] truncate text-[10px] text-[var(--muted)] group-hover:text-[var(--foreground)] sm:max-w-[72px]">
                {mod.title}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
