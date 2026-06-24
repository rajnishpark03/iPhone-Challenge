import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Hover/focus info tooltip — wraps any trigger (button, link…) and reveals a
 * small rounded info card with a short description. CSS-only (no JS, no rAF) so
 * it's cheap on every device. Accessible: shows on keyboard focus too.
 *
 *   <InfoTip tip="What you can win" placement="bottom"><button>…</button></InfoTip>
 */
export default function InfoTip({
  tip,
  children,
  placement = "top",
  className,
}: {
  tip: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom";
  className?: string;
}) {
  const isTop = placement === "top";
  return (
    <span className={cn("group/tip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-[60] w-max max-w-[220px] -translate-x-1/2 rounded-xl px-3 py-2 text-center text-[11.5px] font-medium leading-snug",
          "opacity-0 transition-all duration-200 ease-out",
          "bg-[rgb(10,9,25)] text-white/90 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur",
          "translate-y-1 group-hover/tip:translate-y-0 group-hover/tip:opacity-100 group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100",
          isTop ? "bottom-[calc(100%+10px)]" : "top-[calc(100%+10px)]"
        )}
      >
        {tip}
        {/* arrow */}
        <span
          className={cn(
            "absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[rgb(10,9,25)]",
            isTop ? "bottom-[-4px]" : "top-[-4px]"
          )}
        />
      </span>
    </span>
  );
}
