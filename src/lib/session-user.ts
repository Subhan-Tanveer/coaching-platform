import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * auth() only decodes the JWT — it doesn't confirm the user it points to
 * still exists. A stale session (e.g. the underlying user was deleted, or a
 * dev database got reseeded) would otherwise pass this check and then blow
 * up as an unhandled foreign-key error on the first write. Callers that are
 * about to write a row referencing session.user.id should use this instead
 * of `auth()` directly.
 */
export async function requireSessionUser() {
  const session = await auth();
  if (!session?.user) return null;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  return user;
}

export const STALE_SESSION_MESSAGE = "Your session is no longer valid — please log out and log back in.";
