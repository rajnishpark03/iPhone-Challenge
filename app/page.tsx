"use client";

import { useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Calendar,
  Target,
  Trophy,
  Gift,
  BookOpen,
  Code2,
  Lightbulb,
  TrendingUp,
  Bot,
  Smile,
  Mic,
  Monitor,
  AudioLines,
  Sparkles,
  Smartphone,
  VenetianMask,
  Eye,
  Heart,
  Users,
  Repeat,
  AlertTriangle,
  Crown,
  Star,
  Award,
  Plus,
  Minus,
  Film,
  Mail,
  Phone,
  MapPin,
  UserPlus,
  AtSign,
  Link2,
  PartyPopper,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  meta,
  welcome,
  prizes,
  howItWorks,
  whatToPost,
  contentIdeas,
  howToShoot,
  scoring,
  groundRules,
  fairPlay,
  faq,
  closing,
} from "@/lib/content";

/* ---------------------------------------------------------------- tokens --- */
const GOLD =
  "bg-gradient-to-r from-[#f8e3a6] via-[#edc168] to-[#d99a2b] bg-clip-text text-transparent";
const GOLD_BTN =
  "cursor-pointer bg-gradient-to-b from-[#f7dd97] to-[#dca23a] text-[#3a0f33] shadow-[0_10px_30px_-8px_rgba(231,170,58,0.55)] transition-all duration-200 hover:shadow-[0_0_40px_rgba(237,193,104,0.55)] hover:brightness-105 active:scale-[0.97]";
const CARD =
  "rounded-2xl border border-white/[0.12] bg-[#3a1042] transition-all duration-200";

const snapshotIcons = [Calendar, Smartphone, Target, Trophy];
const stepIcons = [UserPlus, Film, Smartphone, AtSign, Link2, PartyPopper];
const postIcons: LucideIcon[] = [BookOpen, Code2, Lightbulb, TrendingUp, Bot, Smile];
const shootIcons: Record<string, LucideIcon> = {
  mic: Mic,
  monitor: Monitor,
  "audio-lines": AudioLines,
  sparkles: Sparkles,
  smartphone: Smartphone,
  "venetian-mask": VenetianMask,
};
const flagIcons: Record<string, LucideIcon> = {
  eye: Eye,
  heart: Heart,
  users: Users,
  repeat: Repeat,
  bot: Bot,
  "trending-up": TrendingUp,
};
const prizeIcons = [Sparkles, Star];

/* ---------------------------------------------------------------- page --- */
export default function Home() {
  const [open, setOpen] = useState<number | null>(0);
  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#2b0a30] font-sans text-white">
      {/* fixed background: gradient + grid + glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_-10%,#5d1659_0%,#360e3a_42%,#1c0922_100%)]" />
        {/* subtle animated grid */}
        <div className="animate-grid-drift absolute inset-0" />
        <div className="absolute -right-[10%] top-[14%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(206,46,160,0.34),transparent_70%)] blur-3xl" />
        <div className="absolute -left-[12%] top-[55%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.3),transparent_70%)] blur-3xl" />
      </div>
      {/* ---------------------------------------------------------- navbar --- */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#2b0a30]/75 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image src="/tutedudelogo.png" alt="Tutedude" width={30} height={30} />
            <span className="text-lg font-bold tracking-tight">{meta.brand}</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
<button className={`whitespace-nowrap rounded-full px-4 py-3 text-xs font-bold sm:px-5 sm:py-2.5 sm:text-sm ${GOLD_BTN}`}>
              Register Now
            </button>
          </div>
        </nav>
      </header>

      {/* ---------------------------------------------------------- hero --- */}
      <section className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-10 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
        <div className="section-grid" />

        {/* stacked on mobile, side-by-side on desktop */}
        <div className="relative z-10 flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:gap-12 lg:text-left">

          {/* ---- LEFT: text ---- */}
          <div className="flex w-full flex-col items-center lg:flex-1 lg:items-start">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#edc168]/30 bg-[#edc168]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#edc168] sm:px-4 sm:text-xs"
            >
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> {meta.challengeTag}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block font-display text-[clamp(1.1rem,4vw,2.2rem)] font-extrabold leading-tight tracking-tight text-white/80">
                {meta.brand}
              </span>
              <span className={`block font-display text-[clamp(2.8rem,12vw,6.5rem)] font-extrabold leading-[0.9] tracking-tight ${GOLD}`}>
                iPhone
                <br />
                Challenge<sup className="align-super text-[0.28em] font-bold">™</sup>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-white/70 sm:max-w-md sm:text-base"
            >
              {meta.tagline.join(" ")} {welcome.body}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`mt-6 rounded-full px-6 py-3 text-sm font-bold sm:mt-8 sm:px-10 sm:py-4 sm:text-base ${GOLD_BTN}`}
            >
              Register Now for Free!
            </motion.button>
          </div>

          {/* ---- RIGHT: iPhone + price badge ---- */}
          <div className="relative flex justify-center lg:shrink-0">
            <motion.div
              animate={isMobile ? {} : { y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
              className="relative"
            >
              <Image
                src="/iphone-17-prize.webp"
                alt="iPhone 17"
                width={300}
                height={600}
                className="h-[200px] max-w-[90vw] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] sm:h-[300px] lg:h-[420px]"
              />

              {/* ₹82,900 badge */}
              <div className="absolute bottom-[10%] left-1/2 w-28 -translate-x-1/2 rounded-xl border-2 border-[#edc168] bg-[#2b0a30] p-2 shadow-[0_0_24px_rgba(237,193,104,0.35)] sm:w-40 sm:-rotate-[5deg] sm:rounded-2xl sm:p-3 lg:w-48">
                <p className="text-[7px] font-bold uppercase tracking-widest text-[#edc168]/60 sm:text-[9px]">Grand Prize Worth</p>
                <p className={`mt-0.5 font-display text-lg font-extrabold leading-none sm:text-2xl lg:text-3xl ${GOLD}`}>
                  ₹82,900
                </p>
                <div className="my-1 h-px bg-[#edc168]/20 sm:my-2" />
                <p className="text-[8px] font-bold uppercase tracking-wider text-white/55 sm:text-[10px]">
                  🎉 Win for FREE
                </p>
              </div>

              {/* twinkling stars — desktop only */}
              {!isMobile && [
                { top: "-12%", left: "72%",  delay: 0,    size: 14, dur: 2.2 },
                { top: "3%",   left: "-18%", delay: 0.4,  size: 11, dur: 2.6 },
                { top: "-6%",  left: "30%",  delay: 0.9,  size: 8,  dur: 1.9 },
                { top: "20%",  left: "90%",  delay: 0.2,  size: 13, dur: 2.4 },
                { top: "36%",  left: "-22%", delay: 0.7,  size: 10, dur: 2.1 },
                { top: "54%",  left: "86%",  delay: 1.1,  size: 14, dur: 2.8 },
                { top: "70%",  left: "-14%", delay: 1.5,  size: 9,  dur: 2.3 },
                { top: "84%",  left: "68%",  delay: 0.6,  size: 11, dur: 2.0 },
                { top: "10%",  left: "52%",  delay: 1.3,  size: 7,  dur: 1.8 },
                { top: "48%",  left: "-8%",  delay: 2.0,  size: 10, dur: 2.7 },
                { top: "78%",  left: "92%",  delay: 0.3,  size: 8,  dur: 2.2 },
                { top: "28%",  left: "-5%",  delay: 1.7,  size: 6,  dur: 2.4 },
              ].map((s, i) => (
                <motion.svg
                  key={i}
                  viewBox="0 0 24 24"
                  style={{ position: "absolute", top: s.top, left: s.left, width: s.size, height: s.size }}
                  animate={{ opacity: [0, 1, 0.4, 1, 0], scale: [0.3, 1.3, 0.8, 1.2, 0.3], rotate: [0, 90, 180, 270, 360] }}
                  transition={{ repeat: Infinity, duration: s.dur, delay: s.delay, ease: "easeInOut" }}
                >
                  <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" fill="#f8e3a6" />
                </motion.svg>
              ))}
            </motion.div>
          </div>
        </div>

        {/* snapshot stats */}
        <RevealGroup
          className="relative z-10 mt-10 grid w-full grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-6 lg:mt-20"
          stagger={0.1}
        >
          {welcome.snapshot.rows.map((row, i) => {
            const Icon = snapshotIcons[i] ?? Gift;
            return (
              <RevealItem
                key={row.label}
                className="group flex flex-col items-center gap-3 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#edc168]/30 bg-[#edc168]/10 text-[#edc168] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-[11px] uppercase tracking-wider text-white/45">
                  {row.label}
                </span>
                <span className="-mt-1.5 max-w-[11rem] text-sm font-semibold leading-snug text-white/90">
                  {row.value}
                </span>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* ---------------------------------------- what is the challenge --- */}
      <section className="relative mx-auto max-w-5xl px-5 py-10 text-center sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            {welcome.titleLead}{" "}
            <span className={GOLD}>
              {welcome.titleAccent} {welcome.titleEmoji}
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            {welcome.body}
          </p>
        </Reveal>
        <RevealGroup
          className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2"
          stagger={0.08}
        >
          {welcome.checklist.map((item) => (
            <RevealItem key={item}>
              <div className={`${CARD} flex items-center gap-3 px-5 py-4 text-left`}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#edc168]/15 text-[#edc168]">
                  <Check className="h-4 w-4" />
                </span>
                <span className="font-medium text-white/85">{item}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal direction="up" className="mt-6">
          <p className="text-sm italic text-white/50">{welcome.snapshot.footnote}</p>
        </Reveal>
      </section>

      {/* --------------------------------------------- what to post --- */}
      <section className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-tight">
            There&apos;s no <span className={GOLD}>&ldquo;right&rdquo;</span> type of reel.
          </h2>
          <p className="mt-3 text-center text-base text-white/60">
            {whatToPost.subtitle}
          </p>
        </Reveal>
        <RevealGroup
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {whatToPost.categories.map((cat, i) => {
            const Icon = postIcons[i] ?? BookOpen;
            return (
              <RevealItem key={cat.title}>
                <div
                  className={`${CARD} group h-full p-6 hover:-translate-y-1.5 hover:border-[#edc168]/30 hover:shadow-[0_0_28px_rgba(237,193,104,0.1)] hover:border-[#edc168]/30`}
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#edc168]/25 bg-[#edc168]/10 text-[#edc168] transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-bold">{cat.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <Reveal direction="up" className="mt-6 text-center">
          <p className="text-sm font-medium text-[#edc168]">{whatToPost.footnote}</p>
        </Reveal>
      </section>

      {/* --------------------------------------------- six steps to win --- */}
      <section className="relative mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            {howItWorks.titleLead} <span className={GOLD}>{howItWorks.titleAccent}</span>
          </h2>
          <p className="mt-3 text-center text-base text-white/60">
            {howItWorks.subtitle}
          </p>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {howItWorks.steps.map((step, i) => {
            const Icon = stepIcons[i] ?? UserPlus;
            return (
              <RevealItem key={step.n}>
                <div className={`${CARD} group h-full p-6 hover:-translate-y-1.5 hover:border-[#edc168]/30 hover:shadow-[0_0_28px_rgba(237,193,104,0.1)]`}>
                  <motion.span
                    className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-b from-[#f7dd97] to-[#dca23a] text-base font-extrabold text-[#3a0f33]"
                    initial={isMobile ? false : { scale: 0, rotate: -20, opacity: 0 }}
                    whileInView={isMobile ? {} : { scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.08 }}
                    whileHover={isMobile ? {} : {
                      scale: 1.2,
                      rotate: [0, -10, 10, -6, 0],
                      boxShadow: "0 0 24px rgba(237,193,104,0.7)",
                      transition: { duration: 0.45, ease: "easeInOut" },
                    }}
                  >
                    {step.n}
                    {!isMobile && (
                      <motion.span
                        className="absolute inset-0 rounded-2xl bg-[#edc168]"
                        initial={{ opacity: 0.55, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.7 }}
                        transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      />
                    )}
                  </motion.span>
                  <div className="mt-4 flex items-center gap-2">
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

      {/* --------------------------------------------- pick your style --- */}
      <section className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            {howToShoot.titleLead} <span className={GOLD}>{howToShoot.titleAccent}</span>
          </h2>
          <p className="mt-3 text-center text-base text-white/60">
            {howToShoot.subtitle}
          </p>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {howToShoot.styles.map((style) => {
            const Icon = shootIcons[style.icon] ?? Mic;
            return (
              <RevealItem key={style.title}>
                <div className={`${CARD} group h-full p-7 hover:-translate-y-1.5 hover:border-[#edc168]/30 hover:shadow-[0_0_28px_rgba(237,193,104,0.1)] hover:border-[#edc168]/30`}>
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#edc168]/25 bg-[#edc168]/10 text-[#edc168] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="text-xl font-bold">{style.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {style.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <Reveal direction="up" className="mt-6 text-center">
          <p className="text-sm font-medium text-[#edc168]">
            {howToShoot.banner.title} {howToShoot.banner.subtitle}
          </p>
        </Reveal>
      </section>

      {/* --------------------------------------------- prizes --- */}
      <section className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            {prizes.titleLead} <span className={GOLD}>{prizes.titleAccent}</span>
          </h2>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {prizes.cards.map((card, i) => {
            const Icon = prizeIcons[i] ?? Sparkles;
            return (
              <RevealItem key={card.title}>
                <div className={`${CARD} group h-full p-7 hover:-translate-y-1.5 hover:border-[#edc168]/30 hover:shadow-[0_0_28px_rgba(237,193,104,0.1)]`}>
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#edc168]/25 bg-[#edc168]/10 text-[#edc168] transition-transform group-hover:scale-110">
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
            <div className={`${CARD} group h-full p-7 hover:-translate-y-1.5 hover:border-[#edc168]/30 hover:shadow-[0_0_28px_rgba(237,193,104,0.1)]`}>
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

      {/* --------------------------------------------- grand prize banner --- */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f8e3a6] via-[#edc168] to-[#d99a2b] p-6 text-[#3a0f33] shadow-[0_30px_80px_-30px_rgba(231,170,58,0.7)] sm:p-8 lg:p-12">
            {/* grid behind text + image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(58,15,51,0.12) 1px,transparent 1px),linear-gradient(90deg,rgba(58,15,51,0.12) 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" />
            <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
              {/* text */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#3a0f33]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                  <Crown className="h-4 w-4" /> {prizes.grand.badge}
                </span>
                <h3 className="mt-4 font-display text-2xl font-extrabold sm:mt-5 sm:text-5xl">
                  {prizes.grand.name}
                </h3>
                <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-[#3a0f33]/80">
                  {prizes.grand.description}
                </p>
                <button className="mt-7 rounded-full bg-[#3a0f33] px-7 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
                  Register Now for Free!
                </button>
              </div>
              {/* iphone image with stars — float+stars desktop only */}
              <motion.div
                animate={isMobile ? {} : { y: [0, -14, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="relative shrink-0"
              >
                <Image
                  src="/iphone-17-prize.webp"
                  alt="iPhone 17"
                  width={160}
                  height={320}
                  className="h-48 w-auto object-contain drop-shadow-[0_16px_32px_rgba(58,15,51,0.35)] sm:h-64"
                />
                {/* prize chip badge — sits on the bottom of the phone */}
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-max -rotate-[6deg] rounded-lg border border-[#edc168]/40 bg-[#2b0a30]/90 px-2 py-1 shadow-[0_4px_12px_rgba(237,193,104,0.18)] backdrop-blur-sm">
                  <p className="text-[6px] font-bold uppercase tracking-[0.14em] text-[#edc168]/60">Grand Prize Worth</p>
                  <p className={`font-display text-xs font-extrabold leading-tight ${GOLD}`}>₹82,900</p>
                  <div className="my-0.5 h-px bg-[#edc168]/20" />
                  <p className="text-[6px] font-semibold tracking-wide text-white/50">🎉 Win for Free</p>
                </div>
                {!isMobile && [
                  { top: "-20%", left: "85%",  delay: 0,    size: 18 },
                  { top: "8%",   left: "-28%", delay: 0.5,  size: 13 },
                  { top: "70%",  left: "90%",  delay: 1.0,  size: 15 },
                  { top: "88%",  left: "-15%", delay: 1.5,  size: 10 },
                  { top: "42%",  left: "108%", delay: 2.0,  size: 12 },
                  { top: "-8%",  left: "40%",  delay: 0.8,  size: 9  },
                ].map((s, i) => (
                  <motion.svg
                    key={i}
                    viewBox="0 0 24 24"
                    style={{ position: "absolute", top: s.top, left: s.left, width: s.size, height: s.size }}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5], rotate: [0, 180, 360] }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: s.delay, ease: "easeInOut" }}
                  >
                    <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" fill="#3a0f33" />
                  </motion.svg>
                ))}
              </motion.div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --------------------------------------------- 10 hooks --- */}
      <section className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-tight">
            {contentIdeas.titleLead} <span className={GOLD}>{contentIdeas.titleAccent}</span>
          </h2>
          <p className="mt-3 text-center text-base text-white/60">
            {contentIdeas.subtitle}
          </p>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2" stagger={0.05}>
          {contentIdeas.hooks.map((hook) => (
            <RevealItem key={hook.n}>
              <div className={`${CARD} group flex items-center gap-4 p-4 transition-transform duration-300 hover:translate-x-1.5`}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edc168]/12 text-sm font-extrabold text-[#edc168]">
                  {hook.n}
                </span>
                <p className="font-semibold text-white/90">{hook.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal direction="up" className="mt-6 text-center">
          <p className="text-sm font-medium text-[#edc168]">{contentIdeas.footnote}</p>
        </Reveal>
      </section>

      {/* --------------------------------------------- scoring --- */}
      <section className="relative mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-tight">
            {scoring.titleLead} <span className={GOLD}>{scoring.titleAccent}</span>
          </h2>
          <p className="mt-3 text-center text-base text-white/60">{scoring.subtitle}</p>
        </Reveal>

        <div className="relative mt-14">
          {/* vertical connecting line */}
          <motion.div
            className="absolute left-[27px] top-0 w-px sm:left-[31px]"
            style={{ background: "linear-gradient(to bottom, rgba(237,193,104,0.6), rgba(237,193,104,0.08))" }}
            initial={{ height: 0 }}
            whileInView={{ height: "calc(100% - 56px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="space-y-3">
            {scoring.criteria.map((c, i) => {
              const criterionIcons = [TrendingUp, Sparkles, Repeat, BookOpen, Check];
              const Icon = criterionIcons[i] ?? Star;
              const isLast = i === scoring.criteria.length - 1;
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="group relative flex items-start gap-5 sm:gap-6"
                >
                  {/* circle icon */}
                  <div className="relative z-10 shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.12, boxShadow: "0 0 20px rgba(237,193,104,0.5)" }}
                      transition={{ duration: 0.25 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#edc168]/40 bg-[#3a1042] shadow-[0_0_0_4px_rgba(237,193,104,0.06)] transition-colors duration-300 group-hover:border-[#edc168]/80 group-hover:bg-[#4a1855] sm:h-16 sm:w-16"
                    >
                      <Icon className="h-5 w-5 text-[#edc168] sm:h-6 sm:w-6" />
                    </motion.div>
                  </div>

                  {/* content card */}
                  <div className={`flex-1 rounded-2xl border border-white/[0.08] bg-[#3a1042] p-4 transition-all duration-300 group-hover:border-[#edc168]/25 group-hover:bg-[#441350] group-hover:shadow-[0_8px_32px_-8px_rgba(237,193,104,0.15)] sm:p-5 ${isLast ? "" : "mb-1"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-extrabold text-white sm:text-lg">{c.name}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-white/50 sm:text-sm">{c.detail}</p>
                      </div>
                      {/* percentage badge */}
                      <span className="shrink-0 rounded-full border border-[#edc168]/30 bg-[#edc168]/10 px-3 py-1 font-display text-base font-extrabold text-[#edc168] sm:text-lg">
                        {c.pct}%
                      </span>
                    </div>
                    {/* mini progress bar inside card */}
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#f8e3a6] to-[#dca23a]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Reveal direction="up" className="mt-10 text-center">
          <p className="mx-auto max-w-sm text-sm italic text-white/40">
            {scoring.callout.lead}{" "}
            <span className="font-bold not-italic text-white">{scoring.callout.accent}</span>{" "}
            {scoring.callout.tail}
          </p>
        </Reveal>
      </section>

      {/* --------------------------------------------- do & don't --- */}
      <section className="relative mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            {groundRules.titleLead} <span className={GOLD}>{groundRules.titleAccent}</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[groundRules.do, groundRules.dont].map((panel, idx) => {
            const isDo = idx === 0;
            return (
              <Reveal key={panel.title} direction={isDo ? "left" : "right"}>
                <div
                  className={`${CARD} h-full p-7 ${
                    isDo ? "ring-1 ring-emerald-400/20" : "ring-1 ring-rose-400/20"
                  }`}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white ${
                        isDo ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    >
                      {isDo ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                    </span>
                    <h3 className="font-display text-2xl font-extrabold">{panel.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {panel.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            isDo
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-rose-500/20 text-rose-300"
                          }`}
                        >
                          {isDo ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        </span>
                        <span className="text-sm text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal direction="up" className="mt-8 text-center">
          <p className="text-sm text-white/55">
            {groundRules.footnote.lead}{" "}
            <span className="font-bold text-white">{groundRules.footnote.accent}</span>
          </p>
        </Reveal>
      </section>

      {/* --------------------------------------------- fair play --- */}
      <section className="relative mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            {fairPlay.titleLead} <span className={GOLD}>{fairPlay.titleAccent}</span>
          </h2>
          <p className="mt-3 text-center text-base text-white/60">{fairPlay.subtitle}</p>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {fairPlay.flags.map((flag) => {
            const Icon = flagIcons[flag.icon] ?? Eye;
            return (
              <RevealItem key={flag.label}>
                <div className={`${CARD} flex items-center gap-4 p-5`}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edc168]/12 text-[#edc168]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-white/85">{flag.label}</span>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <Reveal direction="scale" className="mt-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#b3500a] to-[#e0640a] p-7">
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

      {/* --------------------------------------------- faq --- */}
      <section className="relative mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-tight">
            {faq.titleLead} <span className={GOLD}>{faq.titleAccent}</span>
          </h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            const yes = item.a === "YES";
            return (
              <Reveal key={item.q} direction="up" delay={i * 0.04}>
                <div className={`${CARD} overflow-hidden`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold sm:text-lg">{item.q}</span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold text-white ${
                          yes ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      >
                        {item.a}
                      </span>
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors sm:h-8 sm:w-8 ${
                          isOpen ? "bg-[#edc168] text-[#3a0f33]" : "bg-white/10 text-white"
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-white/65">
                      {item.detail}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal direction="up" className="mt-8 text-center">
          <p className="text-sm text-white/55">{faq.footnote}</p>
        </Reveal>
      </section>

      {/* --------------------------------------------- closing cta --- */}
      <section className="relative mx-auto max-w-4xl px-5 py-12 text-center sm:px-8 sm:py-20">
        <div className="section-grid" />
        <Reveal direction="up">
          <div className="mb-6 flex items-center justify-center gap-3">
            <Image src="/tutedudelogo.png" alt="Tutedude" width={36} height={36} />
            <span className="font-display text-lg font-extrabold tracking-tight text-white/80">Tutedude</span>
          </div>
          <h2 className="font-display text-[clamp(1.9rem,7vw,5rem)] font-extrabold leading-[1] tracking-tight">
            {closing.titleLead} {closing.titleLine2}{" "}
            <span className={GOLD}>{closing.titleAccent}</span>
          </h2>
          <div className="mt-8 flex justify-center">
            {/* inline container shrinks to exact chips width so line spans chip-to-chip only */}
            <div className="relative inline-flex flex-wrap items-center gap-3">

              {/* connecting line — desktop only */}
              <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 overflow-hidden sm:block">
                <div className="h-1 rounded-full bg-gradient-to-r from-transparent via-[#edc168]/40 to-transparent" />
                {!isMobile && (
                  <motion.div
                    className="absolute top-0 h-1 w-8 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, #fff5cc, #edc168, #fff5cc, transparent)",
                      boxShadow: "0 0 12px 4px rgba(237,193,104,0.9), 0 0 24px 8px rgba(237,193,104,0.4)",
                    }}
                    animate={{ left: ["0%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
                  />
                )}
              </div>

              {closing.chips.map((chip) => (
                <span
                  key={chip}
                  className={`relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-base font-semibold ${
                    chip === closing.emberChip
                      ? GOLD_BTN
                      : `${CARD} text-white/85`
                  }`}
                >
                  {chip === closing.emberChip && <Trophy className="h-4 w-4" />}
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <p className={`mt-10 font-display text-2xl font-extrabold sm:text-4xl ${GOLD}`}>
            {closing.hashtag}
          </p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- footer --- */}
      <footer className="relative overflow-hidden border-t border-white/5 bg-[#1c0922]/60">
        {/* large watermark text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-8 select-none overflow-hidden"
        >
          <p
            className="whitespace-nowrap text-center font-display font-extrabold leading-none tracking-tight text-white/[0.06]"
            style={{ fontSize: "clamp(3.5rem, 18vw, 18rem)" }}
          >
            Tutedude
          </p>
        </div>

        {/* footer brand row */}
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 border-b border-white/[0.06] px-5 pb-10 pt-12 text-center sm:px-8">
          <Image src="/tutedudelogo.png" alt="Tutedude" width={44} height={44} className="opacity-90" />
          <span className="font-display text-xl font-extrabold tracking-tight text-white">Tutedude</span>
          <p className="max-w-xs text-xs text-white/40">Learn · Create · Share · Win — Tutedude iPhone Challenge 2026</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Other Links
            </h4>
            <ul className="space-y-2 text-sm text-white/55">
              {["About us", "Contact us", "Privacy Policy", "Terms of Use"].map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-[#edc168]">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Social Links
            </h4>
            <div className="flex gap-3">
              {([
                { label: "LinkedIn",  href: "https://in.linkedin.com/company/tutedudeofficial",  path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { label: "Instagram", href: "https://www.instagram.com/tutedudeofficial/",       path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01 M7.55 3h8.9A4.55 4.55 0 0 1 21 7.55v8.9A4.55 4.55 0 0 1 16.45 21H7.55A4.55 4.55 0 0 1 3 16.45V7.55A4.55 4.55 0 0 1 7.55 3z" },
                { label: "Facebook",  href: "https://facebook.com/tutedude.officials",            path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { label: "YouTube",   href: "https://www.youtube.com/@tutedudeofficial",          path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
              ] as const).map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform hover:-translate-y-1 ${GOLD_BTN}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#edc168]" /> support@tutedude.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#edc168]" /> +91 7988800474
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Registered Office
            </h4>
            <p className="flex items-start gap-2 text-sm leading-relaxed text-white/55">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#edc168]" /> Suncity Success
              Tower, Sector 65, Gurugram, Haryana, 122005
            </p>
          </div>
        </div>
        <p className="border-t border-white/5 py-6 text-center text-xs text-white/35">
          © {new Date().getFullYear()} {meta.brand} · {meta.challengeTag}
        </p>
      </footer>
    </div>
  );
}
