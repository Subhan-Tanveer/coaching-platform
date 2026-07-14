import Link from "next/link";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export async function MarketingNav() {
  const session = await auth();

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-10">
      <Link href="/" className="pointer-events-auto text-sm font-semibold tracking-tight">
        <span className="gradient-text">Nexus</span> Academy
      </Link>
      <nav className="pointer-events-auto flex items-center gap-4 text-sm">
        <Link href="/courses" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
          Courses
        </Link>
        {session?.user ? (
          <Link href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}>
            <Button size="sm" variant="secondary">
              {session.user.role === "ADMIN" ? "Admin" : "Dashboard"}
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/login" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
              Log in
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
