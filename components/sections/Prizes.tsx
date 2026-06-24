"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Star, Crown, Award } from "lucide-react";
import { prizes } from "@/lib/content";
import SectionShell from "@/components/ui/SectionShell";
import { GradientText } from "@/components/ui/TextEffects";
import SpotlightCard from "@/components/ui/SpotlightCard";
import TiltCard from "@/components/ui/TiltCard";
import ParticleField from "@/components/ui/ParticleField";
import { Reveal } from "@/components/ui/Reveal";

const cardIcons = [Sparkles, Star];

export default function Prizes() {
  return (
    <SectionShell
      id="prizes"
      eyebrow={prizes.eyebrow}
      index={prizes.index}
      eyebrowTone="ember"
    >
      <Reveal direction="up">
        <h2 className="mb-12 font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] tracking-tight">
          {prizes.titleLead}{" "}
          <GradientText variant="ember">{prizes.titleAccent}</GradientText>
        </h2>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Grand prize — large showcase */}
        <Reveal direction="scale" className="group lg:row-span-2">
          <TiltCard max={9} className="h-full">
            <div className="glow-border relative flex h-full min-h-[460px] flex-col justify-between overflow-hidden rounded-4xl bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900 p-8 shadow-glow">
              <ParticleField density={40} color="183,164,255" interactive={false} />
              <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-ember/20 blur-3xl" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-ember px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-glow-ember">
                  <Crown className="h-4 w-4" /> {prizes.grand.badge}
                </span>
              </div>

              {/* floating iPhone 15 — the grand prize */}
              <div className="relative z-10 flex flex-1 items-center justify-center py-8">
                <motion.div
                  animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <Image
                    src="/iphone-15-green.png"
                    alt="iPhone 15 in green — the grand prize"
                    width={360}
                    height={720}
                    priority
                    className="h-auto w-40 drop-shadow-[0_28px_60px_rgba(0,0,0,0.55)] sm:w-44"
                  />
                </motion.div>
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-4xl font-extrabold text-white">
                  {prizes.grand.name}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                  {prizes.grand.description}
                </p>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        {/* Two stacked spotlight cards */}
        {prizes.cards.map((card, i) => {
          const Icon = cardIcons[i];
          return (
            <Reveal key={card.title} direction="left" delay={i * 0.1} className="group">
              <SpotlightCard className="h-full min-h-[218px] !p-7" glow="violet">
                <div className="flex h-full flex-col">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-brand ring-1 ring-violet-400/30 transition-transform group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-2xl font-bold text-fg">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg/75">
                    {card.description}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      {/* Hall of Fame banner */}
      <Reveal direction="up" className="mt-5">
        <SpotlightCard glow="ember" className="!p-7">
          <div className="flex items-center gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ember/20 text-ember ring-1 ring-ember/30">
              <Award className="h-7 w-7" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-fg">
                {prizes.hallOfFame.title}
              </h3>
              <p className="mt-1 text-sm text-fg/75">
                {prizes.hallOfFame.description}
              </p>
            </div>
          </div>
        </SpotlightCard>
      </Reveal>
    </SectionShell>
  );
}
