import Link from "next/link";
import { auth } from "@/lib/auth";
import { LogoutButton } from "./logout-button";

export async function AppNav() {
  const session = await auth();

  return (
    <header className="glass sticky top-0 z-20 flex items-center justify-between px-6 py-4 sm:px-10">
      <Link href="/" className="text-sm font-semibold tracking-tight">
        <span className="gradient-text">Nexus</span> Academy
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        <Link href="/dashboard" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
          Dashboard
        </Link>
        <Link href="/courses" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
          Courses
        </Link>
        {session?.user?.role === "ADMIN" && (
          <Link href="/admin" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
            Admin
          </Link>
        )}
        <LogoutButton />
      </nav>
    </header>
  );
}
