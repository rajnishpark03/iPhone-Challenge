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
          <Image src="/tutedudelogo.png" alt="Tutedude" width={36} height={36} />
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
          <div className="relative inline-flex flex-wrap items-center gap-3">
            {/* connecting line — desktop only */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 overflow-hidden sm:block">
              <div className="h-1 rounded-full bg-gradient-to-r from-transparent via-[#edc168]/40 to-transparent" />
              <motion.div
                className="absolute top-0 h-1 w-8 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #fff5cc, #edc168, #fff5cc, transparent)",
                  boxShadow:
                    "0 0 12px 4px rgba(237,193,104,0.9), 0 0 24px 8px rgba(237,193,104,0.4)",
                }}
                initial={{ left: "0%" }}
                animate={isMobile ? {} : { left: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
              />
            </div>

            {chips.map((chip) => (
              <span
                key={chip}
                className={`relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold ${
                  chip === emberChip ? GOLD_BTN : `${CARD} text-white/85`
                }`}
              >
                {chip === "Learn" && <GraduationCap className="h-4 w-4" />}
                {chip === "Create" && <Clapperboard className="h-4 w-4" />}
                {chip === "Share" && <Share2 className="h-4 w-4" />}
                {chip === emberChip && <Trophy className="h-4 w-4" />}
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
          <button
            className={`rounded-full px-8 py-4 text-base font-bold sm:px-12 sm:py-4 sm:text-lg ${GOLD_BTN}`}
          >
            Register Now for Free!
          </button>
        </div>
      </Reveal>
    </section>
  );
}
