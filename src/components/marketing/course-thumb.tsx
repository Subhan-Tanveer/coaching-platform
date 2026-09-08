/**
 * The optional image an admin attaches to a course. Cards render nothing when
 * no image is set, so seeded courses keep their original text-only look.
 */
export function CourseThumb({ src, alt }: { src: string | null; alt: string }) {
  if (!src) return null;

  return (
    <div className="-mx-2 -mt-2 mb-1 aspect-video overflow-hidden rounded-t-[var(--radius)] bg-[var(--muted-bg)]">
      {/* Admins paste arbitrary URLs here, so plain <img> avoids next/image's host allowlist. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="size-full object-cover" loading="lazy" />
    </div>
  );
}
