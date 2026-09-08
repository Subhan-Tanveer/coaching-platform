export type VideoSource =
  | { kind: "youtube"; embedUrl: string }
  | { kind: "vimeo"; embedUrl: string }
  | { kind: "file"; src: string }
  | null;

/**
 * Lessons accept a video as either a pasted YouTube/Vimeo link (free, what
 * most course owners will use) or an uploaded file URL. Both land in the same
 * `Lesson.videoUrl` column, so the shape has to be worked out at render time.
 */
export function parseVideoUrl(raw: string | null | undefined): VideoSource {
  const url = raw?.trim();
  if (!url) return null;

  const youtubeId = extractYouTubeId(url);
  if (youtubeId) {
    return { kind: "youtube", embedUrl: `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1` };
  }

  const vimeoId = extractVimeoId(url);
  if (vimeoId) {
    return { kind: "vimeo", embedUrl: `https://player.vimeo.com/video/${vimeoId}` };
  }

  return { kind: "file", src: url };
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
    /(?:youtube\.com\/live\/)([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}
