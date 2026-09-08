import { parseVideoUrl } from "@/lib/video";

/**
 * Renders whatever the admin put in the lesson's video field — a YouTube or
 * Vimeo link becomes an embed, an uploaded file gets the native player.
 */
export function LessonVideo({ videoUrl, title }: { videoUrl: string | null; title: string }) {
  const video = parseVideoUrl(videoUrl);
  if (!video) return null;

  if (video.kind === "file") {
    return (
      <video
        src={video.src}
        controls
        preload="metadata"
        className="mb-8 aspect-video w-full rounded-[var(--radius)] border border-[var(--border)] bg-black"
      />
    );
  }

  return (
    <div className="mb-8 aspect-video w-full overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-black">
      <iframe
        src={video.embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="size-full"
      />
    </div>
  );
}
