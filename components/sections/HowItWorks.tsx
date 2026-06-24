"use client";

import { useRef } from "react";
import {
  UserPlus,
  Film,
  Instagram,
  AtSign,
  Link2,
  PartyPopper,
} from "lucide-react";
import { howItWorks } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/TextEffects";
import { Reveal } from "@/components/ui/Reveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

const stepIcons = [UserPlus, Film, Instagram, AtSign, Link2, PartyPopper];

export default function HowItWorks() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(max-width: 767px)").matches;
      if (prefersReduced) return;

      // Draw the connecting line as you scroll
      gsap.fromTo(
        ".timeline-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current ?? undefined,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });
      ScrollTrigger.refresh();
    },
    { scope: root }
  );

  return (
    <SectionShell
      id="how-it-works"
      eyebrow={howItWorks.eyebrow}
      index={howItWorks.index}
    >
      <Reveal direction="up">
        <h2 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {howItWorks.titleLead}{" "}
          <GradientText variant="violet">{howItWorks.titleAccent}</GradientText>
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-fg/75">
          {howItWorks.subtitle}
        </p>
      </Reveal>

      <div ref={root} className="timeline-track relative mt-16 pl-2">
        {/* track line */}
        <div className="absolute bottom-4 left-[34px] top-4 w-[2px] bg-surface/10 md:left-[39px]">
          <div className="timeline-fill h-full w-full origin-top bg-gradient-to-b from-violet-400 via-violet-500 to-ember" />
        </div>

        <div className="space-y-6">
          {howItWorks.steps.map((step, i) => {
            const Icon = stepIcons[i];
            const isLast = i === howItWorks.steps.length - 1;
            return (
              <div
                key={step.n}
                className="timeline-step group relative flex items-start gap-6"
              >
                {/* node */}
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <div
                    className={cn(
                      "flex h-[70px] w-[70px] items-center justify-center rounded-2xl text-lg font-extrabold transition-all duration-300 group-hover:scale-110",
                      isLast
                        ? "bg-ember text-white shadow-glow-ember"
                        : "glass-strong text-brand group-hover:bg-violet-500/20"
                    )}
                  >
                    {step.n}
                  </div>
                </div>

                {/* card */}
                <div
                  data-cursor="hover"
                  className="flex-1 rounded-3xl glass p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-violet-400/30 group-hover:bg-surface/[0.07]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl",
                        isLast
                          ? "bg-ember/20 text-ember"
                          : "bg-violet-500/15 text-brand"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-bold text-fg">
                      {step.titleAccent ? (
                        <>
                          Tag{" "}
                          <GradientText variant="ember">
                            {step.titleAccent}
                          </GradientText>
                        </>
                      ) : (
                        step.title
                      )}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-fg/75">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
