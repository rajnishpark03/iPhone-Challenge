"use client";

import { m as motion } from "framer-motion";

/**
 * Animated moon surface for the hero — a layered lunar foreground (cratered
 * regolith) with a warm rim-light crest, drifting almost imperceptibly to feel
 * alive. Sits above the sky/planets but behind the hero content, and never
 * intercepts pointer events. Falls back to a static surface for reduced motion.
 */
export default function HeroHorizon() {
  return (
    <motion.div
      className="hero-horizon pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[46%] select-none"
      aria-hidden
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* warm glow rising off the lit rim */}
      <div className="absolute bottom-[6%] left-1/2 h-44 w-[64%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,_rgba(255,138,58,0.20),_transparent_70%)] blur-2xl" />

      <svg
        viewBox="0 0 1440 460"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="moonFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#23233f" />
            <stop offset="1" stopColor="#0c0c1a" />
          </linearGradient>
          <linearGradient id="moonNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b1c2c" />
            <stop offset="1" stopColor="#07070f" />
          </linearGradient>
          <radialGradient id="craterFloor" cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#000" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="moonRim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff9a52" stopOpacity="0" />
            <stop offset="0.38" stopColor="#ffb578" stopOpacity="0.9" />
            <stop offset="0.72" stopColor="#ff7a1a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* far ridge */}
        <path
          fill="url(#moonFar)"
          d="M0,250 C200,210 340,168 520,198 C700,228 820,150 1010,180 C1180,206 1300,250 1440,220 L1440,460 L0,460 Z"
        />

        {/* near lunar surface */}
        <path
          fill="url(#moonNear)"
          d="M0,332 C160,300 250,248 430,250 C560,251 640,300 760,300 C900,300 980,234 1130,250 C1270,265 1340,320 1440,300 L1440,460 L0,460 Z"
        />

        {/* craters (subtle depressions with a faint lit upper rim) */}
        <g opacity="0.6">
          <ellipse cx="250" cy="372" rx="60" ry="20" fill="url(#craterFloor)" />
          <ellipse cx="250" cy="362" rx="60" ry="18" fill="none" stroke="#3a3b52" strokeWidth="1.5" opacity="0.5" />
          <ellipse cx="560" cy="392" rx="42" ry="14" fill="url(#craterFloor)" />
          <ellipse cx="560" cy="384" rx="42" ry="13" fill="none" stroke="#3a3b52" strokeWidth="1.4" opacity="0.5" />
          <ellipse cx="980" cy="360" rx="74" ry="22" fill="url(#craterFloor)" />
          <ellipse cx="980" cy="349" rx="74" ry="20" fill="none" stroke="#3a3b52" strokeWidth="1.6" opacity="0.5" />
          <ellipse cx="1240" cy="392" rx="50" ry="16" fill="url(#craterFloor)" />
          <ellipse cx="1240" cy="384" rx="50" ry="15" fill="none" stroke="#3a3b52" strokeWidth="1.4" opacity="0.5" />
        </g>

        {/* warm rim-light along the near crest */}
        <path
          fill="none"
          stroke="url(#moonRim)"
          strokeWidth="3"
          strokeLinecap="round"
          d="M0,332 C160,300 250,248 430,250 C560,251 640,300 760,300 C900,300 980,234 1130,250 C1270,265 1340,320 1440,300"
        />
      </svg>
    </motion.div>
  );
}
