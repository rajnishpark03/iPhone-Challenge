/**
 * Cinematic rock horizon for the hero — a layered sandstone-formation
 * silhouette (à la White Pocket / macOS "Big Sur") anchored to the bottom of
 * the first screen, with a warm rim-light crest catching the last of the
 * twilight. Pure SVG, sits above the sky/planets but behind the hero content,
 * and never intercepts pointer events.
 */
export default function HeroHorizon() {
  return (
    <div
      className="hero-horizon pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[44%] select-none"
      aria-hidden
    >
      {/* warm glow rising off the lit rock */}
      <div className="absolute bottom-[6%] left-1/2 h-44 w-[64%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,_rgba(255,138,58,0.20),_transparent_70%)] blur-2xl" />

      <svg
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="rockFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b1a3a" />
            <stop offset="1" stopColor="#0a0a18" />
          </linearGradient>
          <linearGradient id="rockNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d0d1f" />
            <stop offset="1" stopColor="#050510" />
          </linearGradient>
          <linearGradient id="rockRim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff9a52" stopOpacity="0" />
            <stop offset="0.38" stopColor="#ffb578" stopOpacity="0.9" />
            <stop offset="0.72" stopColor="#ff7a1a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* far mesa ridge */}
        <path
          fill="url(#rockFar)"
          d="M0,250 C200,210 340,168 520,198 C700,228 820,150 1010,180 C1180,206 1300,250 1440,220 L1440,420 L0,420 Z"
        />

        {/* near rounded rock formation */}
        <path
          fill="url(#rockNear)"
          d="M0,332 C160,300 250,248 430,250 C560,251 640,300 760,300 C900,300 980,234 1130,250 C1270,265 1340,320 1440,300 L1440,420 L0,420 Z"
        />

        {/* warm rim-light along the near crest */}
        <path
          fill="none"
          stroke="url(#rockRim)"
          strokeWidth="3"
          strokeLinecap="round"
          d="M0,332 C160,300 250,248 430,250 C560,251 640,300 760,300 C900,300 980,234 1130,250 C1270,265 1340,320 1440,300"
        />
      </svg>
    </div>
  );
}
