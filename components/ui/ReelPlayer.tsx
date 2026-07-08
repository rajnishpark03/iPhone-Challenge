"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function ReelPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play();
    setPlaying(true);
  };

  const stars = [
    { top: "-14%", left: "78%",  size: 22, delay: 0,    dur: 2.8, color: "#f8e3a6", glow: true  },
    { top: "5%",   left: "-20%", size: 20, delay: 0.7,  dur: 3.0, color: "#edc168", glow: true  },
    { top: "88%",  left: "72%",  size: 18, delay: 1.3,  dur: 2.6, color: "#f8e3a6", glow: true  },
    { top: "-6%",  left: "28%",  size: 13, delay: 0.9,  dur: 2.3, color: "#edc168", glow: false },
    { top: "22%",  left: "94%",  size: 14, delay: 0.3,  dur: 2.7, color: "#f8e3a6", glow: false },
    { top: "38%",  left: "-24%", size: 12, delay: 1.6,  dur: 2.2, color: "#edc168", glow: false },
    { top: "60%",  left: "90%",  size: 13, delay: 0.5,  dur: 2.5, color: "#f8e3a6", glow: false },
    { top: "76%",  left: "-16%", size: 11, delay: 1.1,  dur: 2.4, color: "#edc168", glow: false },
    { top: "12%",  left: "55%",  size: 8,  delay: 1.8,  dur: 1.9, color: "#f8e3a6", glow: false },
    { top: "48%",  left: "-10%", size: 7,  delay: 0.4,  dur: 2.1, color: "#edc168", glow: false },
    { top: "70%",  left: "98%",  size: 8,  delay: 2.0,  dur: 1.8, color: "#f8e3a6", glow: false },
    { top: "-2%",  left: "-6%",  size: 6,  delay: 1.4,  dur: 2.0, color: "#edc168", glow: false },
  ];

  return (
    <div className="relative w-[240px] sm:w-[280px]">
      {/* twinkling stars */}
      {stars.map((s, i) => (
        <div key={i} style={{ position: "absolute", top: s.top, left: s.left, pointerEvents: "none", zIndex: 10 }}>
          {s.glow && <div style={{ position: "absolute", inset: -s.size, borderRadius: "50%", background: `radial-gradient(circle, ${s.color}55 0%, transparent 70%)`, filter: "blur(8px)" }} />}
          <svg viewBox="0 0 24 24" className="star-twinkle" style={{ width: s.size, height: s.size, display: "block", "--star-dur": `${s.dur}s`, "--star-delay": `${s.delay}s` } as React.CSSProperties} aria-hidden>
            <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" fill={s.color} />
          </svg>
        </div>
      ))}

      {/* glowing bg behind the frame */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10" style={{ transform: "translate(-50%, -50%)", width: "160%", height: "140%", borderRadius: "50%", background: "radial-gradient(ellipse at 50% 50%, rgba(237,193,104,0.55) 0%, rgba(180,60,220,0.22) 45%, transparent 72%)", filter: "blur(36px)" }} />

      <div className="overflow-hidden rounded-2xl border-2 border-[#edc168]/30 bg-[#2b0a30] shadow-[0_8px_40px_-8px_rgba(237,193,104,0.25)]">

      <video
        ref={videoRef}
        src={src}
        poster="/Instagram iPhone 17 cover page.png"
        controls={playing}
        playsInline
        preload="none"
        className="w-full rounded-2xl"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {/* custom play button overlay — hidden once playing */}
      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
          aria-label="Play video"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#edc168] shadow-[0_0_24px_rgba(237,193,104,0.6)] transition-transform hover:scale-110">
            <Play className="h-7 w-7 fill-[#2b0a30] text-[#2b0a30] ml-1" />
          </span>
        </button>
      )}
      </div>
    </div>
  );
}
