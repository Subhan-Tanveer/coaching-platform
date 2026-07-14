type FetchJsonResult<T> = { ok: boolean; status: number; data: T | null; error: string | null };

/**
 * fetch() + res.json() but never throws — a dev-server hot-reload, a dropped
 * connection, or a non-JSON error page would otherwise crash the caller with
 * an unhandled exception instead of surfacing a normal error to the user.
 */
export async function fetchJson<T = Record<string, unknown>>(
  input: string,
  init?: RequestInit
): Promise<FetchJsonResult<T>> {
  let res: Response;
  try {
    res = await fetch(input, init);
  } catch {
    return { ok: false, status: 0, data: null, error: "Network error — check your connection and try again" };
  }

  try {
    const data = (await res.json()) as T;
    return { ok: res.ok, status: res.status, data, error: null };
  } catch {
    return { ok: false, status: res.status, data: null, error: "Something went wrong — please try again" };
  }
}
