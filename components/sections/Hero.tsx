"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Trophy, Video, Rocket } from "lucide-react";
import { meta } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { scrollToId } from "@/components/providers/SmoothScroll";
import MagicButton from "@/components/ui/MagicButton";
import HeroHorizon from "@/components/ui/HeroHorizon";
import { GradientText, ShinyText, Eyebrow } from "@/components/ui/TextEffects";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const chipIcons = [Trophy, Video, Rocket];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Title line reveal (mask up)
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line span");
      if (!prefersReduced) {
        gsap.set(lines, { yPercent: 120 });
        gsap.to(lines, {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.3,
        });

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
      {/* 3D layer */}
      <div className="hero-parallax-slow pointer-events-none absolute inset-0 z-0">
        <HeroScene />
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
            alt="TuteDude"
            width={28}
            height={28}
            className="rounded-md"
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

        {/* Huge title with line-mask reveal */}
        <h1 className="font-display text-[clamp(3rem,12vw,9.5rem)] font-extrabold leading-[0.86] tracking-[-0.04em]">
          <span className="hero-line block overflow-hidden">
            <span className="block">{meta.title[0]}</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="block">
              <GradientText variant="violet">{meta.title[1]}</GradientText>
            </span>
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

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToId("welcome")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        data-cursor="hover"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-fg/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line/20 p-1">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-violet-300"
          />
        </span>
        <ArrowDown className="h-3 w-3 animate-bounce" />
      </motion.button>
    </section>
  );
}
