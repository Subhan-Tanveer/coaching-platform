import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@/lib/auth";

// Images are small enough to live comfortably in Blob's free tier; video is
// capped lower than Blob's real ceiling because the free tier only holds ~1GB
// total. Anything bigger belongs on YouTube/Vimeo and gets pasted as a link.
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 500 * 1024 * 1024;

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "File uploads aren't set up yet — paste a YouTube/Vimeo link or image URL instead." },
      { status: 501 }
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        // The token is minted here, so this is the only place the admin check
        // actually protects anything — the browser calls Blob directly after.
        const session = await auth();
        if (session?.user?.role !== "ADMIN") {
          throw new Error("Only an admin can upload files.");
        }

        const kind = clientPayload === "video" ? "video" : "image";

        return {
          allowedContentTypes:
            kind === "video"
              ? ["video/mp4", "video/webm", "video/quicktime"]
              : ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
          maximumSizeInBytes: kind === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // The admin form saves the returned URL itself, so there's nothing to
        // reconcile here.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 }
    );
  }
}
