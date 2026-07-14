"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return true;
}

export function BackgroundVideo({ src, className }: { src: string; className?: string }) {
  const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (reducedMotion) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="size-full object-cover opacity-60"
        src={src}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 120% 80% at 50% -10%, transparent 0%, var(--background) 75%)" }}
      />
    </div>
  );
}
