"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundVideo } from "@/components/marketing/background-video";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (res?.error) {
      toast.error("Invalid email or password");
      return;
    }

    router.push(params.get("callbackUrl") ?? "/dashboard");
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
                <LogIn className="size-5" />
              </div>
              <h1 className="text-xl font-semibold">Welcome back</h1>
              <p className="mt-1 text-sm text-[var(--muted)]">Log in to continue your journey</p>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" loading={loading} className="mt-1 w-full">
                Log in
              </Button>
            </form>
            <p className="mt-5 text-center text-sm text-[var(--muted)]">
              No account?{" "}
              <Link href="/signup" className="font-medium text-[var(--primary)]">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
