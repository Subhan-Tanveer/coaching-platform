"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Upload, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { parseVideoUrl } from "@/lib/video";

type Props = {
  name: string;
  kind: "image" | "video";
  label: string;
  hint?: string;
  defaultValue?: string | null;
};

/**
 * One control, two ways in: paste a link (YouTube/Vimeo for video, any URL for
 * an image) or upload a file straight to Blob storage. Either way the value
 * ends up in the same named input, so the surrounding server action doesn't
 * need to care which route the admin took.
 */
export function MediaField({ name, kind, label, hint, defaultValue }: Props) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPickFile(file: File) {
    setError(null);
    setProgress(0);
    try {
      const blob = await upload(`${kind}s/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        clientPayload: kind,
        onUploadProgress: (event) => setProgress(Math.round(event.percentage)),
      });
      setValue(blob.url);
    } catch (e) {
      setError(
        e instanceof Error && e.message
          ? e.message
          : `Couldn't upload that ${kind}. You can paste a link instead.`
      );
    } finally {
      setProgress(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const video = kind === "video" ? parseVideoUrl(value) : null;
  const uploading = progress !== null;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">{label}</label>

      <div className="flex gap-2">
        <Input
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={kind === "video" ? "Paste a YouTube or Vimeo link" : "Paste an image URL"}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] px-3 text-sm transition-colors hover:bg-[var(--muted-bg)] disabled:opacity-50"
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {uploading ? `${progress}%` : "Upload"}
        </button>
        {value && !uploading && (
          <button
            type="button"
            onClick={() => setValue("")}
            title="Remove"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition-colors hover:bg-[var(--danger-bg)] hover:text-[var(--danger)]"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept={kind === "video" ? "video/mp4,video/webm,video/quicktime" : "image/*"}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPickFile(file);
        }}
      />

      {hint && !error && <p className="text-xs text-[var(--muted)]">{hint}</p>}
      {error && <p className="text-xs text-[var(--danger)]">{error}</p>}

      {value && kind === "image" && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={value}
          alt=""
          className="mt-1 max-h-40 w-fit rounded-lg border border-[var(--border)] object-cover"
        />
      )}

      {value && video?.kind === "file" && (
        <video src={video.src} controls className="mt-1 max-h-52 w-fit rounded-lg border border-[var(--border)]" />
      )}

      {value && (video?.kind === "youtube" || video?.kind === "vimeo") && (
        <p className="text-xs text-[var(--success)]">
          {video.kind === "youtube" ? "YouTube" : "Vimeo"} video detected — it&apos;ll play inside the lesson.
        </p>
      )}
    </div>
  );
}
