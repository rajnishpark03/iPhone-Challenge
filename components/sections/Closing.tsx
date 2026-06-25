"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Sparkles, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";
import { closing, meta } from "@/lib/content";
import { GradientText, ShinyText } from "@/components/ui/TextEffects";
import ParticleField from "@/components/ui/ParticleField";
import MagicButton from "@/components/ui/MagicButton";
import Magnetic from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { scrollToId } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

const socials = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Linkedin, label: "LinkedIn" },
];

export default function Closing() {
  return (
    <footer id="closing" className="relative overflow-hidden pt-28">
      <ParticleField density={70} color="183,164,255" />

      {/* glow base */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] bg-[radial-gradient(60%_80%_at_50%_100%,rgba(109,77,242,0.35),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-8">
        {/* floating badges */}
        <div className="relative mb-10 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 -top-6 hidden sm:block"
          >
            <div className="glass-strong flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-fg shadow-glow">
              <Sparkles className="h-4 w-4 text-ember" /> {closing.nowFeaturing}
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 top-2 hidden sm:block"
          >
            <div className="flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white ring-1 ring-surface/10">
              <Play className="h-3.5 w-3.5 fill-white" /> {closing.reelTime}
            </div>
          </motion.div>
        </div>

        <Reveal direction="up">
          <span className="inline-flex items-center gap-2 rounded-full bg-ember/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ember ring-1 ring-ember/30">
            {closing.eyebrow}
          </span>
        </Reveal>

        <h2 className="mt-8 font-display text-[clamp(2.6rem,9vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.03em]">
          <Reveal direction="up" delay={0.05}>
            <span className="block text-fg">{closing.titleLead}</span>
          </Reveal>
          <Reveal direction="up" delay={0.12}>
            <span className="block text-fg">{closing.titleLine2}</span>
          </Reveal>
          <Reveal direction="up" delay={0.19}>
            <span className="block">
              <GradientText variant="violet">{closing.titleAccent}</GradientText>
            </span>
          </Reveal>
        </h2>

        {/* chips */}
        <Reveal direction="up" delay={0.25} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {closing.chips.map((chip) => {
            const ember = chip === closing.emberChip;
            return (
              <span
                key={chip}
                data-cursor="hover"
                className={cn(
                  "rounded-full px-5 py-2.5 text-base font-semibold transition-transform duration-300 hover:-translate-y-1",
                  ember
                    ? "bg-ember text-white shadow-glow-ember"
                    : "glass text-fg/85"
                )}
              >
                {ember ? "★ " : "• "}
                {chip}
              </span>
            );
          })}
        </Reveal>

        <Reveal direction="up" delay={0.3} className="mt-10">
          <MagicButton
            onClick={() => scrollToId("hero")}
            variant="violet"
            size="lg"
            cursorLabel="Let's go"
          >
            Join the Challenge
          </MagicButton>
        </Reveal>

        {/* big hashtag */}
        <Reveal direction="blur" delay={0.2} className="mt-20">
          <p className="font-display text-[clamp(1.6rem,6vw,4rem)] font-extrabold tracking-tight">
            <ShinyText>{closing.hashtag}</ShinyText>
          </p>
        </Reveal>
      </div>

      {/* giant "Challenge" wordmark — links to How It Works, info on hover.
          Text stays steady; only the iPhone floats. */}
      <div className="group relative z-0 mt-16 flex justify-center">
        <div className="flex w-full justify-center overflow-hidden">
          <button
            onClick={() => scrollToId("how-it-works")}
            data-cursor="hover"
            aria-label="See how the challenge works"
            className="cursor-pointer bg-transparent"
          >
            <span className="block select-none whitespace-nowrap bg-gradient-to-b from-violet-300/40 via-violet-500/20 to-transparent bg-clip-text font-display text-[19vw] font-extrabold leading-[0.8] tracking-tight text-transparent transition-all duration-500 group-hover:from-violet-200/80 group-hover:via-violet-400/50">
              Challenge
            </span>
          </button>
        </div>

        {/* floating iPhone — same image as the grand prize */}
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-[28%] top-[38%] z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/iphone-15-prize.png"
            alt="iPhone 15 — the prize"
            width={457}
            height={600}
            className="h-auto w-20 drop-shadow-[0_26px_55px_rgba(0,0,0,0.6)] sm:w-28 lg:w-36"
          />
        </motion.div>

        {/* hover tooltip */}
        <span className="glass-strong pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 translate-y-3 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-fg opacity-0 shadow-glow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          ✨ How it works: Learn → Create → Share → Win · tap to see the steps
        </span>
      </div>

      {/* footer bar */}
      <div className="relative z-10 -mt-[4vw] border-t border-line/10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-5 py-8 sm:flex-row sm:px-8">
          <div className="flex items-center gap-2">
            <Image
              src="/tutedude-logo.svg"
              alt="Tutedude"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="text-sm font-semibold text-fg">
              {meta.brand}
            </span>
            <span className="ml-2 text-xs text-fg/40">
              {meta.title.join(" ")} · {meta.edition}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {socials.map(({ Icon, label }) => (
              <Magnetic key={label} strength={0.5}>
                <a
                  href="#"
                  aria-label={label}
                  data-cursor="hover"
                  data-cursor-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full glass text-fg/70 transition-all duration-300 hover:scale-110 hover:bg-violet-500/20 hover:text-fg"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
        <p className="pb-8 text-center text-xs text-fg/30">
          © {new Date().getFullYear()} {meta.brand} · {meta.challengeTag}
        </p>
      </div>
    </footer>
  );
}
