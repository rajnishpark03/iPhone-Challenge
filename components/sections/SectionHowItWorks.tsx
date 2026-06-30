"use client";

import { m as motion } from "framer-motion";
import { UserPlus, Film, Smartphone, AtSign, Link2, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { useIsMobile } from "@/lib/useIsMobile";
import { GOLD, CARD } from "@/lib/tokens";

const steps: { n: string; title: string; description: string }[] = [
  {
    n: "1",
    title: "Register",
    description: "Sign up for the iPhone Challenge in seconds.",
  },
  {
    n: "2",
    title: "Create",
    description:
      "Create an Instagram reel in the most creative way showing your learning journey in Tutedude.",
  },
  {
    n: "3",
    title: "Post on Instagram",
    description: "Publish your reels publicly on your profile.",
  },
  {
    n: "4",
    title: "Tag Tutedude",
    description:
      "Tag tutedudeofficial and use the official challenge hashtag #TutedudeiPhoneChallenge in your reel.",
  },
  {
    n: "5",
    title: "Submit Link",
    description:
      "Drop your posted reels link in the submission form in the dashboard.",
  },
  {
    n: "6",
    title: "Win",
    description:
      "The best reels get featured across TuteDude, and one learner takes home the iPhone 17.",
  },
];

const stepIcons: LucideIcon[] = [UserPlus, Film, Smartphone, AtSign, Link2, Trophy];

export default function SectionHowItWorks() {
  const isMobile = useIsMobile();

  return (
    <section className="relative mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-16">
      <div className="section-grid" />
      <Reveal direction="up">
        <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
          Your Journey to Winning.{" "}
          <span className={GOLD}>From sign up to spotlight</span>
        </h2>
        <p className="mt-3 text-center text-base text-white/60">
          From sign-up to spotlight — here&apos;s the whole journey at a glance.
        </p>
      </Reveal>

      <RevealGroup className="mt-7 grid gap-3 sm:mt-12 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {steps.map((step, i) => {
          const Icon = stepIcons[i] ?? UserPlus;
          return (
            <RevealItem key={step.n}>
              <div
                className={`${CARD} group h-full p-4 sm:p-6 hover:-translate-y-1.5 hover:border-[#edc168]/30 hover:shadow-[0_0_28px_rgba(237,193,104,0.1)]`}
              >
                {isMobile ? (
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-b from-[#f7dd97] to-[#dca23a] text-base font-extrabold text-[#3a0f33]">
                    {step.n}
                  </span>
                ) : (
                  <motion.span
                    className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-b from-[#f7dd97] to-[#dca23a] text-base font-extrabold text-[#3a0f33]"
                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.08 }}
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, -6, 0], boxShadow: "0 0 24px rgba(237,193,104,0.7)", transition: { duration: 0.45, ease: "easeInOut" } }}
                  >
                    {step.n}
                    <motion.span
                      className="absolute inset-0 rounded-2xl bg-[#edc168]"
                      initial={{ opacity: 0.55, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.7 }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    />
                  </motion.span>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <Icon className="h-5 w-5 shrink-0 text-[#edc168]" />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
