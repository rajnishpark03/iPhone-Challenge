"use client";

/**
 * Full-page night-sky background, inspired by the macOS "Big Sur" twilight:
 * a deep-navy sky that warms toward the horizon, a deterministic twinkling
 * starfield, a drifting comet, occasional shooting stars, and a small rocket
 * that launches from the bottom of the screen straight up, trailing smoke.
 * The 3D planets/moon live in a separate WebGL layer (PlanetScene). This sits
 * behind all content, ignores pointer events, and dials down on the light theme.
 */

// Deterministic PRNG so server-rendered and client markup match (no hydration
// mismatch) — same stars every render.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20240701);
const STARS = Array.from({ length: 64 }, () => {
  const r = rand();
  return {
    x: rand() * 100,
    y: rand() * 100,
    size: r < 0.85 ? 1 + rand() * 1.4 : 2.2 + rand() * 1.6, // a few bigger
    delay: rand() * 6,
    dur: 2.4 + rand() * 4,
    op: 0.35 + rand() * 0.65,
  };
});

export default function SpaceBackground() {
  return (
    <div className="space-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* deep-navy sky with a warm horizon glow (strong on dark, faint on light) */}
      <div className="space-tint absolute inset-0" />

      {/* galaxy nebula clouds + a soft milky-way band (pure CSS, GPU-cheap) */}
      <div className="galaxy absolute inset-0" />
      <div className="milky-way absolute inset-0" />

      {/* stars */}
      <div className="space-stars absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              ["--op" as string]: s.op,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }}
          />
        ))}
      </div>

      {/* drifting comet */}
      <div className="comet">
        <span className="comet-tail" />
        <span className="comet-head" />
      </div>

      {/* shooting stars */}
      <span className="shooting s1" />
      <span className="shooting s2" />
      <span className="shooting s3" />


      <style jsx>{`
        .space-tint {
          background:
            radial-gradient(
              120% 80% at 50% 102%,
              rgba(255, 150, 92, 0.12) 0%,
              rgba(120, 96, 168, 0.06) 26%,
              transparent 56%
            ),
            radial-gradient(
              130% 115% at 50% -8%,
              rgba(44, 44, 116, 0.6) 0%,
              rgba(10, 12, 34, 0.8) 46%,
              rgba(3, 4, 12, 0.95) 100%
            );
          opacity: 0.95;
        }
        :global([data-theme="light"]) .space-tint {
          background:
            radial-gradient(
              120% 80% at 50% 102%,
              rgba(255, 170, 110, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              130% 110% at 50% -10%,
              rgba(120, 110, 200, 0.1) 0%,
              rgba(180, 180, 220, 0.06) 60%,
              transparent 100%
            );
          opacity: 1;
        }

        /* ---- galaxy nebula: a few large, soft colour clouds drifting slowly ---- */
        .galaxy {
          background:
            radial-gradient(
              42% 38% at 22% 32%,
              rgba(124, 92, 252, 0.32) 0%,
              transparent 70%
            ),
            radial-gradient(
              48% 42% at 80% 24%,
              rgba(56, 96, 220, 0.26) 0%,
              transparent 72%
            ),
            radial-gradient(
              50% 46% at 68% 78%,
              rgba(214, 86, 196, 0.2) 0%,
              transparent 74%
            ),
            radial-gradient(
              40% 40% at 14% 82%,
              rgba(255, 140, 90, 0.14) 0%,
              transparent 72%
            );
          filter: blur(8px) saturate(120%);
          opacity: 0.85;
        }
        @keyframes galaxy-drift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1.02);
            opacity: 0.85;
          }
          50% {
            transform: translate3d(-2.5%, 1.5%, 0) scale(1.12);
            opacity: 1;
          }
        }

        /* diagonal milky-way band: bright dust core fading at the edges */
        .milky-way {
          background: linear-gradient(
            122deg,
            transparent 30%,
            rgba(190, 200, 255, 0.05) 44%,
            rgba(214, 196, 255, 0.12) 50%,
            rgba(190, 200, 255, 0.05) 56%,
            transparent 70%
          );
          -webkit-mask-image: radial-gradient(
            120% 80% at 50% 50%,
            #000 35%,
            transparent 80%
          );
          mask-image: radial-gradient(
            120% 80% at 50% 50%,
            #000 35%,
            transparent 80%
          );
          opacity: 0.7;
        }
        :global([data-theme="light"]) .galaxy {
          opacity: 0.4;
          filter: blur(10px) saturate(110%);
        }
        :global([data-theme="light"]) .milky-way {
          opacity: 0.3;
        }
        @media (prefers-reduced-motion: reduce) {
          .galaxy {
            animation: none;
          }
        }

        .star {
          position: absolute;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
          opacity: var(--op);
          animation-name: twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          will-change: opacity;
        }
        :global([data-theme="light"]) .space-stars {
          opacity: 0.35;
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: calc(var(--op) * 0.25);
          }
          50% {
            opacity: var(--op);
          }
        }

        /* comet — a bright head with a long, soft tail, gently drifting */
        .comet {
          position: absolute;
          top: 16%;
          left: 62%;
          animation: comet-drift 28s ease-in-out infinite;
        }
        .comet-head {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 0 12px 3px rgba(255, 255, 255, 0.9),
            0 0 30px 9px rgba(170, 205, 255, 0.5);
        }
        .comet-tail {
          position: absolute;
          left: 3px;
          top: 3px;
          width: 190px;
          height: 3px;
          transform-origin: left center;
          transform: rotate(-26deg);
          background: linear-gradient(
            90deg,
            rgba(206, 226, 255, 0.85),
            rgba(206, 226, 255, 0)
          );
          border-radius: 999px;
          filter: blur(1.2px);
        }
        :global([data-theme="light"]) .comet {
          opacity: 0.4;
        }
        @keyframes comet-drift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-6vw, 4vh);
          }
        }

        /* shooting stars */
        .shooting {
          position: absolute;
          width: 120px;
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0)
          );
          border-radius: 999px;
          filter: drop-shadow(0 0 6px rgba(183, 164, 255, 0.9));
          opacity: 0;
          transform: rotate(18deg);
          animation: shoot 7s linear infinite;
        }
        .s1 {
          top: 12%;
          left: -10%;
          animation-delay: 1.5s;
        }
        .s2 {
          top: 32%;
          left: -10%;
          animation-delay: 4.5s;
          animation-duration: 9s;
        }
        .s3 {
          top: 6%;
          left: -10%;
          animation-delay: 8s;
          animation-duration: 11s;
        }
        :global([data-theme="light"]) .shooting {
          opacity: 0;
          filter: drop-shadow(0 0 6px rgba(109, 77, 242, 0.5));
        }
        @keyframes shoot {
          0% {
            opacity: 0;
            transform: translate(0, 0) rotate(18deg);
          }
          6% {
            opacity: 1;
          }
          18% {
            opacity: 0;
          }
          100% {
            opacity: 0;
            transform: translate(120vw, 40vh) rotate(18deg);
          }
        }

        /* small rocket — launches straight up from the bottom */
        .shuttle {
          position: absolute;
          left: 0;
          top: 0;
          width: 34px;
          height: 170px;
          transform-origin: 50% 30%;
          animation: fly 17s linear infinite;
          animation-delay: -2s;
        }
        .rocket {
          position: absolute;
          top: 0;
          left: 0;
          width: 34px;
          height: 54px;
          filter: drop-shadow(0 0 10px rgba(183, 164, 255, 0.45));
        }
        .flame {
          position: absolute;
          top: 50px;
          left: 50%;
          width: 10px;
          height: 18px;
          transform: translateX(-50%);
          background: radial-gradient(
            50% 60% at 50% 25%,
            #fff 0%,
            #ffd56b 35%,
            #ff7a1a 70%,
            transparent 100%
          );
          border-radius: 50% 50% 50% 50% / 30% 30% 70% 70%;
          filter: blur(0.5px);
          animation: flicker 0.18s ease-in-out infinite alternate;
        }
        @keyframes flicker {
          from {
            transform: translateX(-50%) scaleY(0.85);
            opacity: 0.85;
          }
          to {
            transform: translateX(-50%) scaleY(1.15);
            opacity: 1;
          }
        }
        .plume {
          position: absolute;
          top: 54px;
          left: 50%;
          width: 20px;
          height: 110px;
          transform: translateX(-50%);
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.5),
            rgba(208, 205, 230, 0.22) 35%,
            rgba(180, 180, 210, 0.08) 65%,
            transparent 100%
          );
          border-radius: 50%;
          filter: blur(8px);
        }
        .puff {
          position: absolute;
          left: 50%;
          width: 14px;
          height: 14px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.55),
            rgba(210, 210, 230, 0)
          );
          filter: blur(2px);
          transform: translateX(-50%);
          animation: puff 1.8s ease-out infinite;
        }
        .puff1 {
          top: 62px;
          animation-delay: 0s;
        }
        .puff2 {
          top: 86px;
          animation-delay: 0.45s;
        }
        .puff3 {
          top: 112px;
          animation-delay: 0.9s;
        }
        .puff4 {
          top: 140px;
          animation-delay: 1.35s;
        }
        @keyframes puff {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.5);
          }
          30% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) scale(1.7);
          }
        }
        :global([data-theme="light"]) .plume,
        :global([data-theme="light"]) .puff {
          opacity: 0.5;
        }

        @keyframes fly {
          0% {
            transform: translate(78vw, 112vh) scale(0.9);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translate(72vw, -36vh) scale(1.05);
            opacity: 0;
          }
        }

        /* ---- Mobile / touch: drop the GPU-heavy work for a smooth feel ---- */
        @media (max-width: 820px), (pointer: coarse) {
          .galaxy {
            filter: none; /* animated blur() is the single costliest effect */
            animation: none;
            opacity: 0.72;
          }
          .milky-way {
            display: none; /* mask-image compositing is pricey on phones */
          }
          .comet {
            display: none;
          }
          .star {
            box-shadow: none; /* cheaper compositing */
            animation-name: twinkle-fade; /* opacity-only, no scale repaint */
          }
          .star:nth-child(2n) {
            display: none; /* ~half as many animated nodes */
          }
        }
        @keyframes twinkle-fade {
          0%,
          100% {
            opacity: calc(var(--op) * 0.32);
          }
          50% {
            opacity: var(--op);
          }
        }

        /* ---- Light theme: a soft dawn sky, not just dimmed-down space ---- */
        :global([data-theme="light"]) .space-tint {
          background:
            radial-gradient(
              120% 92% at 50% 110%,
              rgba(255, 196, 158, 0.55) 0%,
              rgba(255, 222, 194, 0.2) 24%,
              transparent 54%
            ),
            linear-gradient(180deg, #cfe0ff 0%, #e8e2fb 44%, #f7f2ff 100%);
          opacity: 1;
        }
        :global([data-theme="light"]) .galaxy {
          background:
            radial-gradient(
              44% 38% at 22% 26%,
              rgba(255, 255, 255, 0.85) 0%,
              transparent 70%
            ),
            radial-gradient(
              48% 40% at 78% 20%,
              rgba(255, 255, 255, 0.72) 0%,
              transparent 72%
            ),
            radial-gradient(
              50% 44% at 66% 82%,
              rgba(206, 192, 255, 0.5) 0%,
              transparent 74%
            ),
            radial-gradient(
              42% 38% at 14% 84%,
              rgba(255, 210, 182, 0.5) 0%,
              transparent 72%
            );
          filter: blur(6px);
          opacity: 0.9;
        }
        :global([data-theme="light"]) .milky-way {
          display: none;
        }
        :global([data-theme="light"]) .space-stars {
          opacity: 0.2;
        }
        :global([data-theme="light"]) .comet {
          opacity: 0.55;
        }

        @media (prefers-reduced-motion: reduce) {
          .star,
          .flame,
          .puff,
          .comet {
            animation: none;
          }
          .shuttle,
          .shooting {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
