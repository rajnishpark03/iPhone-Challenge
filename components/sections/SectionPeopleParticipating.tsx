"use client";

import { useRef, useState, useEffect } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { GOLD } from "@/lib/tokens";
import { useIsMobile } from "@/lib/useIsMobile";

const posts = [
  "DZ2ICedSYRi",
  "DQb0ASYkwaN",
  "DXpFKMigw_c",
  "DZSc3GJCP4_",
  "DZXoIEUiHE_",
  "DV_hFS6E87G",
  "DWCQMX5kzgf",
  "DUPchyOkvee",
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PostCard({ code }: { code: string }) {
  const url = `https://www.instagram.com/p/${code}/`;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-[78vw] sm:w-[300px] shrink-0 snap-start rounded-2xl border border-[#edc168]/20 bg-[#2b0a30] overflow-hidden shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] flex flex-col">
      {/* custom dark header */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-[#2b0a30] border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#edc168]/15 text-[#edc168]">
            <InstagramIcon className="h-4 w-4" />
          </span>
          <span className="text-xs font-semibold text-white/60">Instagram Reel</span>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="text-[9px] font-bold uppercase tracking-widest text-[#edc168] hover:opacity-75 transition-opacity">
          Open ↗
        </a>
      </div>

      {/* iframe — shifted to hide Instagram header; only loads when near viewport */}
      <div className="relative overflow-hidden" style={{ height: 380 }}>
        <iframe
          src={visible ? `https://www.instagram.com/p/${code}/embed/` : undefined}
          width="300"
          height="500"
          title={`Instagram reel ${code}`}
          style={{ display: "block", marginTop: -64, width: "100%", border: "none" }}
        />
        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none"
          style={{ background: "linear-gradient(to top, #2b0a30 40%, transparent)" }} />
      </div>

      {/* custom footer */}
      <a href={url} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 bg-[#2b0a30] border-t border-white/[0.06] text-xs font-semibold text-[#edc168] hover:bg-[#3a1042] transition-colors">
        <InstagramIcon className="h-3.5 w-3.5" />
        Watch on Instagram
      </a>
    </div>
  );
}

export default function SectionPeopleParticipating() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0–1
  const isMobile = useIsMobile();
  const SEGMENTS = isMobile ? 3 : 2;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const activeSeg = Math.min(SEGMENTS - 1, Math.floor(progress * SEGMENTS));

  return (
    <section className="relative py-6 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 relative">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            See what other learners{" "}
            <span className={GOLD}>are creating.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-white/60">
            From first projects to AI experiments, learners across TuteDude are already sharing
            their journey. Don&apos;t miss your chance to join them.
          </p>
        </Reveal>
      </div>
      {/* scroll strip */}
      <div
        ref={scrollRef}
        className="mt-6 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory"
      >
        <div className="flex gap-4 px-5 sm:px-8" style={{ width: "max-content" }}>
          {posts.map((code) => (
            <PostCard key={code} code={code} />
          ))}
          {/* right padding sentinel */}
          <div className="w-1 shrink-0" />
        </div>
      </div>

      {/* swipe hint — mobile only */}
      <p className="mt-3 text-center text-xs text-white/55 sm:hidden">
        ← swipe to see more →
      </p>

      {/* scroll dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {Array.from({ length: SEGMENTS }, (_, seg) => (
          <button
            key={seg}
            aria-label={`Go to section ${seg + 1}`}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const max = el.scrollWidth - el.clientWidth;
              el.scrollTo({ left: (max * seg) / (SEGMENTS - 1), behavior: "smooth" });
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeSeg === seg ? "w-5 bg-[#edc168]" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
