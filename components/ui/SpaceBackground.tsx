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
const STARS = Array.from({ length: 150 }, () => {
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

      {/* small rocket launching bottom → top with a smoke trail */}
      <div className="shuttle">
        <div className="plume" />
        <span className="puff puff1" />
        <span className="puff puff2" />
        <span className="puff puff3" />
        <span className="puff puff4" />
        <div className="flame" />
        <svg className="rocket" viewBox="0 0 60 96" xmlns="http://www.w3.org/2000/svg">
          {/* fins */}
          <path d="M18 60 L8 78 L18 72 Z" fill="#c0392b" />
          <path d="M42 60 L52 78 L42 72 Z" fill="#c0392b" />
          {/* body */}
          <path
            d="M30 4 C42 16 44 34 44 50 L44 66 C44 70 40 73 30 73 C20 73 16 70 16 66 L16 50 C16 34 18 16 30 4 Z"
            fill="#e9edf5"
          />
          {/* nose */}
          <path d="M30 4 C36 11 40 20 41 28 L19 28 C20 20 24 11 30 4 Z" fill="#e0473a" />
          {/* window */}
          <circle cx="30" cy="38" r="7" fill="#2b86d6" stroke="#1b5fa6" strokeWidth="2.5" />
          {/* fuselage shade */}
          <path d="M44 50 L44 66 C44 70 40 73 30 73 L30 28 C36 32 41 40 44 50 Z" fill="#000" opacity="0.06" />
          {/* engine ring */}
          <rect x="18" y="69" width="24" height="6" rx="3" fill="#9aa3b2" />
        </svg>
      </div>

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

        .star {
          position: absolute;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
          opacity: var(--op);
          animation-name: twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          will-change: opacity, transform;
        }
        :global([data-theme="light"]) .space-stars {
          opacity: 0.35;
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: calc(var(--op) * 0.25);
            transform: scale(0.8);
          }
          50% {
            opacity: var(--op);
            transform: scale(1.15);
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
