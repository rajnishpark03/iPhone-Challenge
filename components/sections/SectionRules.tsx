"use client";

import { Check, X, Eye, Heart, Users, Repeat, Bot, TrendingUp, AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { m as motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { useIsMobile } from "@/lib/useIsMobile";
import { fairPlay } from "@/lib/content";
import { GOLD, CARD } from "@/lib/tokens";

const doItems = [
  "Create original content.",
  "Share authentic experiences. Don't force promotional content.",
  "Keep it respectful and positive.",
  "Tag @tutedudeofficial and use hashtag #TutedudeiPhoneChallenge in every reel.",
  "Post only between 1 July and 31 July.",
  "Have fun and be creative.",
];

const dontItems = [
  "No copied or stolen content.",
  "No fake testimonials or misleading claims.",
  "Only share genuine learning experiences.",
  "No artificial engagement.",
  "No offensive, hateful, or inappropriate content.",
  "Do not target or degrade others.",
];

const flags = [
  {
    Icon: Eye,
    label: "Purchased views",
    desc: "Buying video views from third-party services is strictly prohibited and easily detected.",
    anim: { scale: [1, 1.25, 1, 1.25, 1] },
    dur: 2.5,
  },
  {
    Icon: Heart,
    label: "Purchased likes",
    desc: "Paid likes inflate your reel's credibility artificially and are against challenge rules.",
    anim: { scale: [1, 1.35, 1] },
    dur: 1.2,
  },
  {
    Icon: Users,
    label: "Engagement groups",
    desc: "Using engagement pods or coordinated groups to boost your numbers is considered cheating.",
    anim: { x: [0, -3, 3, -3, 0] },
    dur: 1.8,
  },
  {
    Icon: Repeat,
    label: "View exchanges",
    desc: "Swapping views or likes with other creators for reciprocation is not allowed.",
    anim: { rotate: [0, 360] },
    dur: 1.5,
  },
  {
    Icon: Bot,
    label: "Automated activity",
    desc: "Using bots, scripts, or automation tools to generate fake interactions is a disqualifying offence.",
    anim: { opacity: [1, 0.2, 1, 0.2, 1] },
    dur: 1.6,
  },
  {
    Icon: TrendingUp,
    label: "Suspicious growth patterns",
    desc: "Sudden, unnatural spikes in views or followers will trigger an immediate review of your entry.",
    anim: { y: [0, -6, 0] },
    dur: 1.4,
  },
];

export default function SectionRules() {
  const isMobile = useIsMobile();
  return (
    <>
      {/* ---- Do & Don't ---- */}
      <section className="relative mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            Play it{" "}
            <span className={GOLD}>right.</span>
          </h2>
        </Reveal>

        <div className="mt-7 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2">
          {[
            { title: "DO", items: doItems, isDo: true },
            { title: "DON'T", items: dontItems, isDo: false },
          ].map(({ title, items, isDo }) => (
            <Reveal key={title} direction={isDo ? "left" : "right"}>
              <div
                className={`${CARD} h-full p-4 sm:p-7 ${
                  isDo ? "ring-1 ring-emerald-400/20" : "ring-1 ring-rose-400/20"
                }`}
              >
                <div className="mb-3 flex items-center gap-3 sm:mb-5">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white ${
                      isDo ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  >
                    {isDo ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold">{title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          isDo
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-rose-500/20 text-rose-300"
                        }`}
                      >
                        {isDo ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                      </span>
                      <span className="text-sm text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" className="mt-8 text-center">
          <p className="text-sm italic text-white/50">
            *Breaking these rules may result in immediate disqualification.
          </p>
        </Reveal>
      </section>

      {/* ---- Fair Play ---- */}
      <section className="relative mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            {fairPlay.titleLead}{" "}
            <span className={GOLD}>{fairPlay.titleAccent}</span>
          </h2>
          <p className="mt-3 text-center text-base text-white/60">
            {fairPlay.subtitle}
          </p>
        </Reveal>

        <RevealGroup className="mt-7 grid gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {flags.map(({ Icon, label, desc, anim, dur }) => (
            <RevealItem key={label} className="h-full">
              {isMobile ? (
                <div className={`${CARD} flex h-full flex-col gap-4 p-5`}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edc168]/10 text-[#edc168]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-semibold text-white/90">{label}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/50">{desc}</p>
                </div>
              ) : (
                <motion.div
                  className={`${CARD} flex h-full flex-col gap-4 p-5 cursor-default`}
                  whileHover="hovered"
                  variants={{ hovered: { y: -4, borderColor: "rgba(237,193,104,0.25)" } }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edc168]/10 text-[#edc168]">
                      <motion.div variants={{ hovered: anim }} transition={{ duration: dur, ease: "easeInOut" }}>
                        <Icon className="h-5 w-5" />
                      </motion.div>
                    </span>
                    <span className="font-semibold text-white/90">{label}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/50">{desc}</p>
                </motion.div>
              )}
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal direction="scale" className="mt-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#b3500a] to-[#e0640a] p-4 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white">
                <AlertTriangle className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold text-white">
                  {fairPlay.warning.title}
                </h3>
                <p className="mt-1.5 text-white/85">{fairPlay.warning.subtitle}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
