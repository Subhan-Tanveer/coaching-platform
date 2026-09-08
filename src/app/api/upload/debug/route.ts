import { NextResponse } from "next/server";

// TEMPORARY diagnostic: reports which env var NAMES the running server sees.
// Never returns values. Delete once the Blob upload is confirmed working.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    blobKeysVisible: Object.keys(process.env).filter((k) => k.includes("BLOB")).sort(),
    hasReadWriteToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    vercelEnv: process.env.VERCEL_ENV ?? null,
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
  });
}
