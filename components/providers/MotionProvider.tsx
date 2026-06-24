"use client";

import { MotionConfig } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

/**
 * On phones, switch Framer Motion to `reducedMotion="always"` so transform /
 * layout animations are skipped (only cheap opacity fades remain). On desktop
 * it stays `"never"`, i.e. Framer Motion's default — desktop is unchanged.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  return (
    <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
