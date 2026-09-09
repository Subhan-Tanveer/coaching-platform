/** What an admin form action reports back so the form can show the outcome. */
export type ActionResult =
  /** `message` wins over the form's static success text — needed when the same
   *  form flips meaning after it runs, like publish/unpublish. */
  | { ok: true; message?: string }
  | { ok: false; error: string };
