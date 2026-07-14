"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
    >
      <LogOut className="size-4" />
      Log out
    </button>
  );
}
