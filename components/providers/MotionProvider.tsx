"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { useIsMobile } from "@/lib/useIsMobile";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
