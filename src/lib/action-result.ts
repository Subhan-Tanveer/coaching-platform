/** What an admin form action reports back so the form can show the outcome. */
export type ActionResult = { ok: true } | { ok: false; error: string };
