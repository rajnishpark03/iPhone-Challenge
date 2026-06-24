"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { sections } from "@/lib/content";
import { scrollToId } from "@/components/providers/SmoothScroll";
import Magnetic from "@/components/ui/Magnetic";
import MagicButton from "@/components/ui/MagicButton";
import InfoTip from "@/components/ui/InfoTip";
import { cn } from "@/lib/utils";

type Section = (typeof sections)[number];

// Short "what's in here" blurbs shown on hover/focus of each nav link.
const NAV_TIPS: Record<string, string> = {
  welcome: "Start here — what the challenge is all about",
  prizes: "The iPhone, features & rewards you can win",
  "how-it-works": "From sign-up to spotlight, step by step",
  "what-to-post": "Content formats & ideas that actually work",
  "content-ideas": "Hooks that grab the first 3 seconds",
  voice: "Find your natural on-camera voice",
  "best-practices": "Craft tips to level up every reel",
  "how-to-shoot": "Simple setups to shoot great video",
  scoring: "How entries are judged & ranked",
  "ground-rules": "The rules of the challenge",
  "fair-play": "Integrity — what gets entries disqualified",
  faq: "Common questions, answered",
};

// All sections (minus the hero intro) for wide screens.
const FULL_NAV = sections.slice(1, 13);
// A tighter, curated set for mid-width screens so links never crowd/wrap.
const LG_NAV_IDS = [
  "welcome",
  "prizes",
  "how-it-works",
  "what-to-post",
  "scoring",
  "ground-rules",
  "faq",
];
const LG_NAV = sections.filter((s) => LG_NAV_IDS.includes(s.id));

function PillRow({
  items,
  active,
  layoutId,
  className,
}: {
  items: Section[];
  active: string;
  layoutId: string;
  className?: string;
}) {
  return (
    <div className={cn("items-center gap-0.5", className)}>
      {items.map((s) => (
        <InfoTip key={s.id} tip={NAV_TIPS[s.id] ?? s.label} placement="bottom">
          <button
            onClick={() => scrollToId(s.id)}
            data-cursor="hover"
            className={cn(
              "relative whitespace-nowrap rounded-full px-2.5 py-1.5 text-[12px] font-medium transition-colors",
              active === s.id ? "text-fg" : "text-fg/45 hover:text-fg/80"
            )}
          >
            {active === s.id && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 rounded-full bg-surface/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {s.label}
          </button>
        </InfoTip>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  // Auto-hide on scroll-down, reveal on scroll-up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 320);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-7xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-500",
          scrolled ? "glass-strong shadow-float" : "bg-transparent"
        )}
      >
        {/* Brand */}
        <Magnetic strength={0.3}>
          <button
            onClick={() => scrollToId("hero")}
            data-cursor="hover"
            className="flex items-center gap-2 rounded-full px-2 py-1"
          >
            <Image
              src="/tutedude-logo.svg"
              alt="Tutedude"
              width={40}
              height={40}
              className="drop-shadow-[0_0_10px_rgba(139,110,245,0.65)]"
            />
            <span className="text-base font-semibold tracking-tight text-fg">
              Tutedude
            </span>
          </button>
        </Magnetic>

        {/* Section pills — curated on mid screens, full set on wide screens */}
        <PillRow
          items={LG_NAV}
          active={active}
          layoutId="nav-pill-lg"
          className="hidden lg:flex xl:hidden"
        />
        <PillRow
          items={FULL_NAV}
          active={active}
          layoutId="nav-pill-xl"
          className="hidden xl:flex"
        />

        {/* CTA */}
        <div className="flex items-center gap-2">
          <MagicButton
            onClick={() => scrollToId("closing")}
            variant="violet"
            size="md"
            cursorLabel="Join"
            className="!px-3.5 !py-2 sm:!px-5"
          >
            Join<span className="hidden sm:inline">&nbsp;Challenge</span>
          </MagicButton>
        </div>
      </nav>

      <AnimatePresence>{/* mobile dock lives separately */}</AnimatePresence>
    </motion.header>
  );
}
