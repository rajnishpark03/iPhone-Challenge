"use client";

import { cn } from "@/lib/utils";

/**
 * Fixed, full-page aurora: drifting gradient blobs + animated grid + radial
 * vignette. Sits behind all content.
 */
export default function AuroraBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas",
        className
      )}
      aria-hidden
    >
      {/* deep base gradient (theme-aware) */}
      <div className="aurora-base absolute inset-0" />

      {/* drifting blobs */}
      <div
        className="aurora-blob"
        style={{
          width: 620,
          height: 620,
          top: "-12%",
          left: "-8%",
          opacity: "calc(0.5 * var(--aurora-blob-opacity))",
          background:
            "radial-gradient(circle at 30% 30%, #6D4DF2, transparent 60%)",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: 520,
          height: 520,
          top: "20%",
          right: "-10%",
          animationDelay: "-6s",
          background:
            "radial-gradient(circle at 60% 40%, #FF7A1A, transparent 62%)",
          opacity: "calc(0.32 * var(--aurora-blob-opacity))",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: 700,
          height: 700,
          bottom: "-20%",
          left: "25%",
          animationDelay: "-11s",
          background:
            "radial-gradient(circle at 50% 50%, #5733E0, transparent 60%)",
          opacity: "calc(0.42 * var(--aurora-blob-opacity))",
        }}
      />

      {/* animated grid with radial mask */}
      <div className="absolute inset-0 bg-grid mask-radial opacity-70" />

      {/* top + bottom vignette for depth */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--bg)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg)] to-transparent" />
    </div>
  );
}
