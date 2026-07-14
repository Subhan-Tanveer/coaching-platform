"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fetchJson } from "@/lib/fetch-json";

export function EnrollButton({
  courseId,
  isLoggedIn,
  firstLessonHref,
}: {
  courseId: string;
  isLoggedIn: boolean;
  firstLessonHref: string | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onEnroll() {
    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setLoading(true);
    const { ok, data, error } = await fetchJson<{ error?: string }>("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });
    setLoading(false);

    if (!ok) {
      toast.error(error ?? data?.error ?? "Could not enroll");
      return;
    }

    toast.success("You're enrolled!");
    router.push(firstLessonHref ?? "/dashboard");
    router.refresh();
  }

  return (
    <Button size="lg" className="w-full" loading={loading} onClick={onEnroll}>
      Enroll for free
    </Button>
  );
}
