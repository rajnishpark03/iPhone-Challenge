"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Top-of-page reading progress bar — styled as a smokey vapour trail with a
 * little rocket riding the leading edge. The filled bar is the smoke; the
 * rocket points the way and drifts forward as you scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });
  // leading-edge position of the rocket (front of the bar)
  const left = useTransform(scaleX, (v) => `${v * 100}%`);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-4">
      {/* soft smoke glow behind the bar */}
      <motion.div
        style={{ scaleX }}
        className="absolute left-0 top-0 h-3 w-full origin-left rounded-r-full bg-gradient-to-r from-transparent via-violet-400/35 to-ember/60 blur-[6px]"
      />
      {/* the bar itself */}
      <motion.div
        style={{ scaleX }}
        className="absolute left-0 top-[3px] h-[3px] w-full origin-left rounded-r-full bg-gradient-to-r from-violet-500/10 via-violet-500 to-ember"
      />

      {/* rocket riding the leading edge, with trailing smoke puffs */}
      <motion.div
        style={{ left }}
        className="absolute top-[4.5px] z-10 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="prog-puff prog-puff1" />
        <span className="prog-puff prog-puff2" />
        <span className="prog-puff prog-puff3" />
        <svg
          viewBox="0 0 64 32"
          className="prog-rocket h-4 w-8"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* fins (trailing, left) */}
          <path d="M10 9 L2 3 L13 12 Z" fill="#c0392b" />
          <path d="M10 23 L2 29 L13 20 Z" fill="#c0392b" />
          {/* body */}
          <path
            d="M4 16 C4 10 14 7 30 7 L44 7 C54 8 60 12 62 16 C60 20 54 24 44 25 L30 25 C14 25 4 22 4 16 Z"
            fill="#e9edf5"
          />
          {/* nose (leading, right) */}
          <path d="M44 7 C54 8 60 12 62 16 C60 20 54 24 44 25 Z" fill="#e0473a" />
          {/* window */}
          <circle cx="34" cy="16" r="4.4" fill="#2b86d6" stroke="#1b5fa6" strokeWidth="1.5" />
        </svg>
      </motion.div>

      <style jsx>{`
        .prog-rocket {
          filter: drop-shadow(0 0 6px rgba(255, 122, 26, 0.7))
            drop-shadow(0 0 3px rgba(183, 164, 255, 0.6));
        }
        .prog-puff {
          position: absolute;
          top: 50%;
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.6),
            rgba(210, 210, 230, 0)
          );
          filter: blur(2px);
          transform: translateY(-50%);
        }
        .prog-puff1 {
          left: -8px;
          animation: prog-puff 1.3s ease-out infinite;
        }
        .prog-puff2 {
          left: -16px;
          animation: prog-puff 1.3s ease-out 0.4s infinite;
        }
        .prog-puff3 {
          left: -24px;
          animation: prog-puff 1.3s ease-out 0.8s infinite;
        }
        @keyframes prog-puff {
          0% {
            opacity: 0;
            transform: translateY(-50%) scale(0.5);
          }
          35% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translate(-10px, -50%) scale(1.7);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .prog-puff {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
