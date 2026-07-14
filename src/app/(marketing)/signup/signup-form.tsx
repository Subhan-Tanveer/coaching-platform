"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { fetchJson } from "@/lib/fetch-json";
import { BackgroundVideo } from "@/components/marketing/background-video";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { ok, data, error } = await fetchJson<{ error?: string }>("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!ok) {
      toast.error(error ?? data?.error ?? "Something went wrong");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (signInRes?.error) {
      toast.success("Account created — please log in");
      router.push("/login");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <BackgroundVideo src="/videos/hero.mp4" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm"
      >
        <Card className="p-2">
          <CardContent className="pt-6">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-3 flex size-11 items-center justify-center rounded-xl gradient-bg text-[var(--primary-foreground)]">
                <Sparkles className="size-5" />
              </div>
              <h1 className="text-xl font-semibold">Begin your journey</h1>
              <p className="mt-1 text-sm text-[var(--muted)]">Create your account to start learning</p>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <Input
                type="text"
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                required
                minLength={8}
                placeholder="Password (min. 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" loading={loading} className="mt-1 w-full">
                Create account
              </Button>
            </form>
            <p className="mt-5 text-center text-sm text-[var(--muted)]">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-[var(--primary)]">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
