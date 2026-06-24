"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Video, Rocket } from "lucide-react";
import { meta } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { scrollToId } from "@/components/providers/SmoothScroll";
import { useIsMobile } from "@/lib/useIsMobile";
import MagicButton from "@/components/ui/MagicButton";
import HeroHorizon from "@/components/ui/HeroHorizon";
import { GradientText, ShinyText, Eyebrow } from "@/components/ui/TextEffects";
import FloatingText from "@/components/ui/FloatingText";
import InfoTip from "@/components/ui/InfoTip";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const chipIcons = [Trophy, Video, Rocket];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      const prefersReduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(max-width: 767px)").matches;

      // (Title now reveals + floats per-letter via Framer Motion — see below.)
      if (!prefersReduced) {
        // Parallax depth on scroll
        gsap.to(".hero-parallax-slow", {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-fade", {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "60% top",
            scrub: true,
          },
        });
      }
      ScrollTrigger.refresh();
    },
    { scope: root }
  );

  // Mouse parallax for floating badges
  const onMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const rx = (e.clientX / innerWidth - 0.5) * 2;
    const ry = (e.clientY / innerHeight - 0.5) * 2;
    gsap.to(".hero-magnet", {
      x: (i, t) => rx * Number((t as HTMLElement).dataset.depth ?? 12),
      y: (i, t) => ry * Number((t as HTMLElement).dataset.depth ?? 12),
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <section
      id="hero"
      ref={root}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-24"
    >
      {/* 3D layer — skipped on phones (WebGL is the heaviest hero cost) */}
      <div className="hero-parallax-slow pointer-events-none absolute inset-0 z-0">
        {!isMobile && <HeroScene />}
      </div>

      {/* cinematic rock horizon anchoring the first screen */}
      <HeroHorizon />

      {/* Floating glass badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        data-depth="22"
        className="hero-magnet absolute left-[8%] top-[22%] hidden md:block"
      >
        <div className="glass-strong flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-fg shadow-glow">
          <Sparkles className="h-4 w-4 text-ember" /> {meta.phone.badge}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        data-depth="-18"
        className="hero-magnet absolute right-[9%] top-[30%] hidden md:block"
      >
        <div className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-3 text-left shadow-glow">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ember/20 text-ember">
            <Trophy className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-fg/50">
              {meta.phone.featured}
            </p>
            <p className="text-sm font-semibold text-fg">{meta.phone.views}</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="hero-fade relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex items-center gap-3"
        >
          <Image
            src="/tutedude-logo.svg"
            alt="Tutedude"
            width={38}
            height={38}
            className="drop-shadow-[0_0_12px_rgba(139,110,245,0.7)]"
          />
          <span className="text-sm font-medium text-fg/70">
            {meta.brand}
          </span>
          <span className="h-3 w-px bg-surface/20" />
          <Eyebrow tone="ember">{meta.edition}</Eyebrow>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-brand"
          data-cursor="hover"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
          </span>
          {meta.challengeTag}
        </motion.div>

        {/* Huge title — every letter (and the iPhone) floats independently */}
        <h1 className="font-display text-[clamp(2rem,10vw,8.5rem)] font-extrabold leading-[0.96] tracking-[-0.04em] sm:leading-[0.92]">
          <span className="block whitespace-nowrap py-[0.04em]">
            <FloatingText
              text={meta.title[0]}
              baseDelay={0.25}
              seedOffset={0}
              float={false}
            />
          </span>
          <span className="block whitespace-nowrap py-[0.04em]">
            <FloatingText
              text={meta.title[1]}
              charClassName="text-gradient-violet"
              baseDelay={0.45}
              seedOffset={20}
              float={false}
            />
            {/* small iPhone tucked beside "iPhone" — floats on its own too */}
            <motion.span
              className="inline-block align-middle"
              initial={{ opacity: 0, y: 64 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="inline-block will-change-transform"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              >
                <Image
                  src="/iphone-15-prize.png"
                  alt=""
                  aria-hidden
                  width={914}
                  height={1200}
                  priority
                  className="ml-[0.16em] inline-block h-[0.72em] w-auto -translate-y-[0.05em] align-middle drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]"
                />
              </motion.span>
            </motion.span>
          </span>
          <span className="block whitespace-nowrap py-[0.04em]">
            <InfoTip
              tip="How it works — the 6 steps from sign-up to winning. Click to jump in →"
              placement="bottom"
            >
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("how-it-works");
                }}
                data-cursor="hover"
                data-cursor-label="How it works"
                aria-label="See how the Tutedude iPhone Challenge works"
                className="inline-block cursor-pointer transition-opacity hover:opacity-90"
              >
                <FloatingText
                  text={meta.title[2]}
                  charClassName="text-gradient-violet"
                  baseDelay={0.65}
                  seedOffset={40}
                  float={false}
                />
              </a>
            </InfoTip>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-7 text-balance text-lg font-medium text-fg/70 sm:text-xl"
        >
          {meta.tagline.slice(0, 3).join(" ")}{" "}
          <ShinyText className="font-semibold">{meta.tagline[3]}</ShinyText>
        </motion.p>

        {/* CTA + chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.7 }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagicButton
              onClick={() => scrollToId("welcome")}
              variant="violet"
              size="lg"
              cursorLabel="Begin"
            >
              Start the Journey
            </MagicButton>
            <MagicButton
              onClick={() => scrollToId("prizes")}
              variant="ghost"
              size="lg"
              cursorLabel="View"
            >
              See the Prizes
            </MagicButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {meta.heroChips.map((chip, i) => {
              const Icon = chipIcons[i];
              return (
                <span
                  key={chip}
                  data-cursor="hover"
                  className={cn(
                    "flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-fg/80 transition-colors hover:text-fg",
                    i === 0 && "border-ember/30 text-ember"
                  )}
                >
                  <Icon className="h-4 w-4" /> {chip}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
