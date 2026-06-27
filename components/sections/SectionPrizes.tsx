"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Star, Award, Crown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { prizes } from "@/lib/content";
import { useIsMobile } from "@/lib/useIsMobile";
import { GOLD, GOLD_BTN, CARD } from "@/lib/tokens";

const prizeIcons: LucideIcon[] = [Sparkles, Star];

export default function SectionPrizes() {
  const isMobile = useIsMobile();

  return (
    <>
      {/* ---- prize cards ---- */}
      <section className="relative mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            {prizes.titleLead}{" "}
            <span className={GOLD}>{prizes.titleAccent}</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-7 grid gap-3 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {prizes.cards.map((card, i) => {
            const Icon = prizeIcons[i] ?? Sparkles;
            return (
              <RevealItem key={card.title}>
                <div
                  className={`${CARD} group h-full p-4 sm:p-7 hover:-translate-y-1.5 hover:border-[#edc168]/30 hover:shadow-[0_0_28px_rgba(237,193,104,0.1)]`}
                >
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#edc168]/25 bg-[#edc168]/10 text-[#edc168] transition-transform group-hover:scale-110 sm:mb-5 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {card.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
          <RevealItem>
            <div
              className={`${CARD} group h-full p-7 hover:-translate-y-1.5 hover:border-[#edc168]/30 hover:shadow-[0_0_28px_rgba(237,193,104,0.1)]`}
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#edc168]/25 bg-[#edc168]/10 text-[#edc168] transition-transform group-hover:scale-110">
                <Award className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-bold">{prizes.hallOfFame.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {prizes.hallOfFame.description}
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* ---- grand prize banner ---- */}
      <section className="mx-auto max-w-5xl px-5 py-4 sm:px-8 sm:py-16">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f8e3a6] via-[#edc168] to-[#d99a2b] p-5 text-[#3a0f33] shadow-[0_30px_80px_-30px_rgba(231,170,58,0.7)] sm:p-8 lg:p-12">
            {/* grid behind content */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(58,15,51,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(58,15,51,0.12) 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" />

            <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
              {/* text */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#3a0f33]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                  <Crown className="h-4 w-4" /> {prizes.grand.badge}
                </span>
                <h3 className="mt-3 font-display text-xl font-extrabold sm:mt-5 sm:text-5xl">
                  {prizes.grand.name}
                </h3>
                <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-[#3a0f33]/80 sm:mt-4">
                  {prizes.grand.description}
                </p>
                <button
                  className={`mt-5 rounded-full px-7 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 bg-[#3a0f33] sm:mt-7`}
                >
                  Register Now for Free!
                </button>
              </div>

              {/* iphone image */}
              <motion.div
                animate={isMobile ? {} : { y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="relative isolate shrink-0"
              >
                {/* static light behind phone */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10" style={{ transform: "translate(-50%, -50%)", width: "160%", height: "140%", borderRadius: "50%", background: "radial-gradient(ellipse at 50% 50%, rgba(237,193,104,0.55) 0%, rgba(180,60,220,0.22) 45%, transparent 72%)", filter: "blur(36px)" }} />
                <Image
                  src="/iphone-17-prize.webp"
                  alt="iPhone 17"
                  width={160}
                  height={320}
                  className="h-48 w-auto object-contain drop-shadow-[0_16px_32px_rgba(58,15,51,0.35)] sm:h-64"
                />
                {/* prize chip badge */}
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-max -rotate-[6deg] rounded-lg border border-[#edc168]/40 bg-[#2b0a30]/90 px-2 py-1 shadow-[0_4px_12px_rgba(237,193,104,0.18)] backdrop-blur-sm">
                  <p className="text-[6px] font-bold uppercase tracking-[0.14em] text-[#edc168]/60">
                    Grand Prize Worth
                  </p>
                  <p className={`font-display text-xs font-extrabold leading-tight ${GOLD}`}>
                    ₹82,900
                  </p>
                  <div className="my-0.5 h-px bg-[#edc168]/20" />
                  <p className="text-[6px] font-semibold tracking-wide text-white/50">
                    🎉 Win for Free
                  </p>
                </div>

                {!isMobile &&
                  [
                    { top: "-20%", left: "85%", delay: 0, size: 18 },
                    { top: "8%", left: "-28%", delay: 0.5, size: 13 },
                    { top: "70%", left: "90%", delay: 1.0, size: 15 },
                    { top: "88%", left: "-15%", delay: 1.5, size: 10 },
                    { top: "42%", left: "108%", delay: 2.0, size: 12 },
                    { top: "-8%", left: "40%", delay: 0.8, size: 9 },
                  ].map((s, i) => (
                    <motion.svg
                      key={i}
                      viewBox="0 0 24 24"
                      style={{
                        position: "absolute",
                        top: s.top,
                        left: s.left,
                        width: s.size,
                        height: s.size,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.3, 0.5],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.2,
                        delay: s.delay,
                        ease: "easeInOut",
                      }}
                    >
                      <path
                        d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z"
                        fill="#3a0f33"
                      />
                    </motion.svg>
                  ))}
              </motion.div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
