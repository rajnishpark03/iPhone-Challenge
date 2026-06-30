"use client";

import { Check } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { GOLD, CARD } from "@/lib/tokens";

const checklist = [
  "Build Your Personal Brand",
  "Get Featured By TuteDude & Grow your audience",
  "Create portfolio that gets noticed by recruiters",
  "Win an iPhone 17",
];

export default function SectionWelcome() {
  return (
    <section className="relative mx-auto max-w-5xl px-5 py-6 text-center sm:px-8 sm:py-16">
      <div className="section-grid" />
      <Reveal direction="up">
        <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
          Welcome to the{" "}
          <span className={GOLD}>TuteDude iPhone Challenge</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base italic text-white/60">
          You&apos;re not here to sell. You&apos;re here to share your journey.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
          Whether you&apos;re learning GenAI, Python, Data Analytics, Video Editing, Graphic Design,
          Cybersecurity, Performance Marketing or any other course through TuteDude, this challenge
          is your opportunity to showcase your progress, projects and learning journey.
        </p>
      </Reveal>

      <RevealGroup
        className="mx-auto mt-6 grid max-w-3xl gap-2 sm:mt-10 sm:gap-3 sm:grid-cols-2"
        stagger={0.08}
      >
        {checklist.map((item) => (
          <RevealItem key={item}>
            <div className={`${CARD} flex h-full items-center gap-3 px-5 py-4 text-left`}>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edc168]/15 text-[#edc168]">
                <Check className="h-4 w-4" />
              </span>
              <span className="font-medium text-white/85">{item}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal direction="up" className="mt-6">
        <p className="text-sm italic text-white/50">
          One month. A handful of reels. A story only you can tell.
        </p>
      </Reveal>
    </section>
  );
}
