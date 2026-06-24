"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Deterministic 0..1 pseudo-random so SSR and client markup match (no
 *  hydration mismatch) — same float pattern every render. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 0.5) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Splits `text` into characters that each float independently: a one-time
 * rise-in on mount, then a perpetual, per-letter gentle bob with its own
 * amplitude / speed / phase. Nested spans keep the entrance and the loop from
 * fighting over `transform`. On phones the global MotionConfig reduced-motion
 * switch disables the transforms, so letters simply fade in and sit still.
 */
export default function FloatingText({
  text,
  charClassName,
  baseDelay = 0.25,
  seedOffset = 0,
  float = true,
}: {
  text: string;
  charClassName?: string;
  baseDelay?: number;
  seedOffset?: number;
  /** When false, letters rise in once and then sit perfectly still (steady). */
  float?: boolean;
}) {
  return (
    <>
      {Array.from(text).map((ch, i) => {
        const s = seedOffset + i + 1;
        const amp = 4 + rand(s) * 6; // 4–10px bob
        const dur = 2.6 + rand(s * 1.7) * 2.4; // 2.6–5s loop
        const phase = rand(s * 2.3) * 2.5; // desynced start

        return (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 64 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: baseDelay + i * 0.05,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.span
              className={cn("inline-block will-change-transform", charClassName)}
              animate={float ? { y: [0, -amp, 0] } : undefined}
              transition={
                float
                  ? {
                      duration: dur,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: phase,
                    }
                  : undefined
              }
            >
              {ch}
            </motion.span>
          </motion.span>
        );
      })}
    </>
  );
}
