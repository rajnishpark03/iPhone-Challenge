"use client";

import Image from "next/image";
import { m as motion } from "framer-motion";
import { Trophy, GraduationCap, Clapperboard, Share2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useIsMobile } from "@/lib/useIsMobile";
import { GOLD, GOLD_BTN, CARD } from "@/lib/tokens";

const chips = ["Learn", "Create", "Share", "Win"];
const emberChip = "Win";

export default function SectionClosingCTA() {
  const isMobile = useIsMobile();

  return (
    <section className="relative mx-auto max-w-4xl px-5 py-8 text-center sm:px-8 sm:py-20">
      <div className="section-grid" />
      <Reveal direction="up">
        <div className="mb-6 flex items-center justify-center gap-3">
          <Image src="/tutedudelogo.webp" alt="Tutedude" width={36} height={36} />
          <span className="font-display text-lg font-extrabold tracking-tight text-white/80">
            Tutedude
          </span>
        </div>

        <h2 className="font-display text-[clamp(1.9rem,7vw,5rem)] font-extrabold leading-[1] tracking-tight">
          Someone&apos;s favourite{" "}
          <span className={GOLD}>creator</span>{" "}
          could be you.
        </h2>

        {/* chips row */}
        <div className="mt-5 flex justify-center sm:mt-8">
          <div className="relative inline-flex items-center gap-1.5 sm:gap-3">
            {/* connecting line — visible on both mobile and desktop */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden">
              <div className="h-px rounded-full bg-gradient-to-r from-transparent via-[#edc168]/40 to-transparent sm:h-1" />
              {/* mobile: CSS-animated shine */}
              <div
                className="chip-shine absolute top-0 h-px w-10 rounded-full sm:hidden"
                style={{
                  background: "linear-gradient(90deg, transparent, #fff5cc, #edc168, #fff5cc, transparent)",
                  boxShadow: "0 0 8px 3px rgba(237,193,104,0.85)",
                }}
              />
              {/* desktop: Framer Motion shine */}
              {!isMobile && (
                <motion.div
                  className="absolute top-0 h-1 w-8 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, #fff5cc, #edc168, #fff5cc, transparent)",
                    boxShadow: "0 0 12px 4px rgba(237,193,104,0.9), 0 0 24px 8px rgba(237,193,104,0.4)",
                  }}
                  initial={{ left: "0%" }}
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
                />
              )}
            </div>

            {chips.map((chip) => (
              <span
                key={chip}
                className={`relative z-10 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold sm:gap-2 sm:px-5 sm:py-2.5 sm:text-base ${
                  chip === emberChip ? GOLD_BTN : `${CARD} text-white/85`
                }`}
              >
                {chip === "Learn" && <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />}
                {chip === "Create" && <Clapperboard className="h-3 w-3 sm:h-4 sm:w-4" />}
                {chip === "Share" && <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />}
                {chip === emberChip && <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />}
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* hashtag */}
        <p className={`mt-6 font-display text-2xl font-extrabold sm:mt-10 sm:text-4xl ${GOLD}`}>
          #TutedudeiPhoneChallenge
        </p>

        {/* CTA button */}
        <div className="mt-5 sm:mt-8">
          <a
            href="/login"
            className={`inline-block rounded-full px-8 py-4 text-base font-bold sm:px-12 sm:py-4 sm:text-lg ${GOLD_BTN}`}
          >
            Register Now for Free!
          </a>
        </div>
      </Reveal>
    </section>
  );
}
