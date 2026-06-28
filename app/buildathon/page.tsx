"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Trophy,
  Gift,
  Clock,
  Users,
  Code2,
  Palette,
  Megaphone,
  Lightbulb,
  Mail,
  Phone,
  MapPin,
  Crown,
  Sparkles,
  Zap,
  Globe,
  Star,
  ArrowRight,
  Rocket,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* ---------------------------------------------------------------- tokens --- */
const GOLD =
  "bg-gradient-to-r from-[#f8e3a6] via-[#edc168] to-[#d99a2b] bg-clip-text text-transparent";
const GOLD_BTN =
  "bg-gradient-to-b from-[#f7dd97] to-[#dca23a] text-[#3a0f33] shadow-[0_10px_30px_-8px_rgba(231,170,58,0.6)]";
const CARD =
  "rounded-3xl border border-white/10 bg-[#1a0825]";

/* ---------------------------------------------------------------- content --- */
const stats = [
  { icon: Globe,   label: "100% Online" },
  { icon: Trophy,  label: "Win ₹10,000 in Cash" },
  { icon: Gift,    label: "Free Registration" },
  { icon: Clock,   label: "48–72 Hour Sprint" },
  { icon: Users,   label: "Teams of 3–5" },
];

const projects = [
  {
    tag: "3D Hackathon",
    title: "Make a 3D Website",
    desc: "Build an immersive 3D web experience in a weekend and ship it live.",
    grad: "from-[#7c3aed] to-[#3b82f6]",
    icon: Globe,
  },
  {
    tag: "Cider",
    title: "Design, Code & Ship an iOS App",
    desc: "Take an idea to the App Store in 30 days — design, build, and launch.",
    grad: "from-[#f59e0b] to-[#ef4444]",
    icon: Zap,
  },
  {
    tag: "HackCraft",
    title: "Ship a Game Mod",
    desc: "Craft a playable mod from scratch and put it in players' hands.",
    grad: "from-[#10b981] to-[#06b6d4]",
    icon: Star,
  },
  {
    tag: "Low-level",
    title: "Build Something Low-level",
    desc: "Curious what really happens when you run a program? Build it and find out.",
    grad: "from-[#ec4899] to-[#8b5cf6]",
    icon: Code2,
  },
];

const audience = [
  {
    icon: Code2,
    title: "Developers & Engineers",
    desc: "Transform complex problems into elegant code. You build the logic that powers everything.",
    grad: "from-[#6d28d9] to-[#2563eb]",
  },
  {
    icon: Palette,
    title: "Designers — UI/UX, Product, Visual",
    desc: "Craft seamless experiences and stunning visuals. Your design shapes how the world interacts.",
    grad: "from-[#db2777] to-[#9333ea]",
  },
  {
    icon: Megaphone,
    title: "Hustlers who Pitch, Market & Ship",
    desc: "Turn bold ideas into real-world impact. You bring clarity, structure, and momentum.",
    grad: "from-[#ea580c] to-[#db2777]",
  },
  {
    icon: Lightbulb,
    title: "Product Thinkers & Makers",
    desc: "Own the vision: set the story, chase the dream, and push products from idea to launch.",
    grad: "from-[#0d9488] to-[#4f46e5]",
  },
];


/* ---------------------------------------------------------------- bits --- */
function StatChip({ icon: Icon, label }: { icon: typeof Trophy; label: string }) {
  return (
    <RevealItem className="group flex flex-col items-center gap-3 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#edc168]/30 bg-[#edc168]/10 text-[#edc168] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-110 group-hover:border-[#edc168]/60 group-hover:bg-[#edc168]/20">
        <Icon className="h-6 w-6" />
      </span>
      <span className="max-w-[9rem] text-sm font-semibold leading-snug text-white/80 group-hover:text-white transition-colors">
        {label}
      </span>
    </RevealItem>
  );
}

function PhotoCard({ grad, children }: { grad: string; children?: React.ReactNode }) {
  return (
    <div className={`relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${grad}`}>
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(255,255,255,0.25),transparent_60%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:14px_14px]" />
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- page --- */
export default function BuildathonPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#150920] font-sans text-white">

      {/* ── global background ─────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_-5%,#4a1060_0%,#270a35_40%,#0f0518_100%)]" />
        <div className="bld-grid absolute inset-0" />
        <div className="absolute -right-[8%] top-[10%] h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle,rgba(180,40,140,0.28),transparent_65%)] blur-3xl" />
        <div className="absolute -left-[10%] top-[50%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(100,50,220,0.22),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(237,193,104,0.06),transparent_70%)] blur-3xl" />
      </div>

      <style jsx>{`
        .bld-grid {
          background-image:
            linear-gradient(rgba(237,193,104,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,100,230,0.06) 1px, transparent 1px);
          background-size: 52px 52px;
          -webkit-mask-image: radial-gradient(ellipse 80% 65% at 50% 35%, #000 30%, transparent 80%);
          mask-image: radial-gradient(ellipse 80% 65% at 50% 35%, #000 30%, transparent 80%);
          will-change: background-position;
          animation: bld-grid-drift 28s linear infinite;
        }
        @keyframes bld-grid-drift { to { background-position: 52px 52px; } }
        @media (prefers-reduced-motion: reduce) { .bld-grid { animation: none; } }
      `}</style>

      {/* ── navbar ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#150920]/70 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-2.5">
            <Image src="/tutedudelogo.png" alt="Tutedude" width={32} height={32} />
            <span className="text-lg font-bold tracking-tight">Tutedude</span>
          </a>
          <div className="flex items-center gap-3">
            <button className="hidden rounded-full px-5 py-2 text-sm font-semibold text-white/70 transition-colors hover:text-white sm:block">
              Login
            </button>
            <button className={`rounded-full px-5 py-2 text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgba(231,170,58,0.7)] ${GOLD_BTN}`}>
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      {/* ── hero ──────────────────────────────────────────────────────── */}
      <section className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pb-28 pt-16 text-center sm:px-8 sm:pt-24">

        {/* perspective diamond stage */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-0 w-[min(90vw,700px)] -translate-x-1/2">
          <svg viewBox="0 0 700 580" className="h-auto w-full" aria-hidden>
            <defs>
              <linearGradient id="cyanStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.65" />
              </linearGradient>
              <filter id="diamondGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* solid bg fill — blocks grid behind the box */}
            <polygon points="350,68 636,218 636,448 350,530 64,448 64,218" fill="rgba(43,10,48,0.88)" stroke="none" />

            {/* right wall */}
            <polygon points="350,68 636,218 636,448 350,448" fill="rgba(34,211,238,0.04)" stroke="url(#cyanStroke)" strokeWidth="1.8" filter="url(#diamondGlow)" />
            {/* left wall */}
            <polygon points="350,68 64,218 64,448 350,448" fill="rgba(129,140,248,0.04)" stroke="url(#cyanStroke)" strokeWidth="1.8" filter="url(#diamondGlow)" />
            {/* top lid */}
            <polygon points="350,68 636,218 350,368 64,218" fill="rgba(34,211,238,0.06)" stroke="url(#cyanStroke)" strokeWidth="2.2" filter="url(#diamondGlow)" />
            {/* bottom base */}
            <polygon points="350,448 636,448 350,530 64,448" fill="rgba(34,211,238,0.05)" stroke="url(#cyanStroke)" strokeWidth="1.8" filter="url(#diamondGlow)" />

            {/* lid grid horizontals */}
            {[0.3, 0.6].map((t, i) => (
              <line key={`lh${i}`}
                x1={64 + (636-64)*t*0.5} y1={218 + (368-218)*t*0.55}
                x2={636 - (636-64)*t*0.5} y2={218 + (368-218)*t*0.55}
                stroke="rgba(34,211,238,0.1)" strokeWidth="0.7" />
            ))}
            {/* lid diagonals */}
            {[0.35, 0.65].map((t, i) => (
              <line key={`ld${i}`}
                x1={64 + (636-64)*t} y1={218}
                x2={350} y2={368}
                stroke="rgba(34,211,238,0.08)" strokeWidth="0.7" />
            ))}

            {/* sparkle dots */}
            {[[28,90],[672,72],[680,280],[16,340],[668,460],[90,490],[350,16],[350,545],[160,140],[540,140]].map(([cx,cy],i) => (
              <circle key={i} cx={cx} cy={cy} r={i%3===0?2.8:1.6}
                fill={i%2===0?"#22d3ee":"#a78bfa"}
                opacity={0.45+(i%3)*0.18} />
            ))}
          </svg>
        </div>

        {/* eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-7 inline-flex items-center gap-2 rounded-full border border-[#edc168]/30 bg-[#edc168]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#edc168]"
        >
          <Sparkles className="h-3.5 w-3.5" /> The Tutedude Buildathon
        </motion.span>

        {/* title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center"
        >
          <span className="block font-display text-[clamp(1.5rem,3.2vw,2.4rem)] font-extrabold leading-tight tracking-tight text-white/90">
            Tutedude
          </span>
          <span className={`relative block font-display text-[clamp(4.2rem,15vw,9.5rem)] font-extrabold leading-[0.86] tracking-tight ${GOLD}`}>
            Buildathon
            <sup className="align-super text-[0.28em] font-bold opacity-70">™</sup>
          </span>
        </motion.h1>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative z-10 mt-7 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg"
        >
          Build. Collaborate. Launch your ideas.{" "}
          <span className="text-white/85 font-medium">It&apos;s not just a competition</span> — it&apos;s
          your chance to build something real, with real impact.
        </motion.p>

        {/* cta row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.7 }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`rounded-full px-9 py-4 text-base font-bold transition-shadow hover:shadow-[0_20px_50px_-10px_rgba(231,170,58,0.65)] ${GOLD_BTN}`}
          >
            Register Now for Free!
          </motion.button>
          <button className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white/80 backdrop-blur transition-all hover:border-white/30 hover:bg-white/10 hover:text-white">
            Learn More <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>

        {/* social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative z-10 mt-10 flex items-center gap-3 text-sm text-white/45"
        >
          <div className="flex -space-x-2">
            {["from-violet-500 to-blue-500","from-pink-500 to-purple-500","from-amber-400 to-red-500","from-emerald-400 to-cyan-500"].map((g,i) => (
              <div key={i} className={`h-8 w-8 rounded-full border-2 border-[#150920] bg-gradient-to-br ${g}`} />
            ))}
          </div>
          <span>Join <span className="font-semibold text-white/70">2,400+</span> builders already registered</span>
        </motion.div>
      </section>

      {/* ── what is buildathon ────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8">
        <Reveal direction="up">
          <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            What Is <span className={GOLD}>Buildathon?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60">
            Buildathon is an online <span className="font-semibold text-white/85">48–72 hour sprint</span> where creators
            come together to design, develop, and market real products. Whether you&apos;re a developer,
            designer, or visionary — this is your chance to collaborate, innovate, and launch.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8" stagger={0.09}>
          {stats.map((s) => (
            <StatChip key={s.label} icon={s.icon} label={s.label} />
          ))}
        </RevealGroup>
      </section>

      {/* ── project types ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-tight">
            What Type of Projects <span className={GOLD}>Can You Build?</span>
          </h2>
          <p className="mt-3 text-center text-base text-white/55">
            Every format is fair game — pick a track or mix them.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {projects.map((p) => {
            const Icon = p.icon;
            return (
              <RevealItem key={p.tag}>
                <div className={`${CARD} group h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]`}>
                  <div className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${p.grad}`}>
                    <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <Icon className="h-8 w-8 text-white/90" />
                      <span className="text-sm font-bold text-white/90 px-3 text-center">{p.tag}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold leading-snug">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* ── prize banner ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#edc168]/20 bg-gradient-to-br from-[#2a0a3a] via-[#3a0f33] to-[#1a0525] p-8 sm:p-12">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#edc168]/15 blur-3xl" />
            <div className="absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-[#a855f7]/15 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left sm:gap-8">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#edc168]/30 bg-[#edc168]/10">
                <Trophy className="h-10 w-10 text-[#edc168]" />
              </div>
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edc168]/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#edc168]">
                  <Crown className="h-3 w-3" /> Grand Prize
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                  Win <span className={GOLD}>₹10,000 Cash</span> + Recognition
                </h3>
                <p className="mt-1.5 text-sm text-white/60">
                  Top teams win cash prizes, certificates, internship opportunities, and permanent
                  recognition in the Tutedude Hall of Fame.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`shrink-0 rounded-full px-7 py-3.5 text-sm font-bold ${GOLD_BTN}`}
              >
                Register Free
              </motion.button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── who can join ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            Who Can <span className={GOLD}>Join?</span>
          </h2>
          <p className="mt-3 text-center text-lg font-medium text-white/55">
            If you can build, you belong here.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2" stagger={0.1}>
          {audience.map((a) => (
            <RevealItem key={a.title}>
              <div className={`${CARD} group flex h-full items-center gap-5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#edc168]/25 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.4)]`}>
                <PhotoCard grad={a.grad}>
                  <a.icon className="absolute bottom-3 left-3 h-7 w-7 text-white/90" />
                </PhotoCard>
                <div className="flex-1">
                  <h3 className="text-lg font-bold leading-snug">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{a.desc}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ── how it works ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-tight">
            How It <span className={GOLD}>Works</span>
          </h2>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-3" stagger={0.09}>
          {[
            { n: "01", icon: Rocket, title: "Register Free", desc: "Sign up solo or form a team of 3–5 members in seconds." },
            { n: "02", icon: Code2,  title: "Build in 48–72 hrs", desc: "Sprint, collaborate, and ship a real working product." },
            { n: "03", icon: Trophy, title: "Win & Get Featured", desc: "Get judged, win prizes, and join the Hall of Fame." },
          ].map((s) => (
            <RevealItem key={s.n}>
              <div className={`${CARD} group h-full p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#edc168]/25`}>
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-[#f7dd97] to-[#dca23a] text-[#3a0f33]">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className={`block text-xs font-bold uppercase tracking-widest ${GOLD}`}>{s.n}</span>
                <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ── final cta ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <Reveal direction="up">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#edc168]/25 bg-[#edc168]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#edc168]">
            <Rocket className="h-3.5 w-3.5" /> Your Turn
          </span>
          <h2 className="mt-6 font-display text-[clamp(2.4rem,7vw,5rem)] font-extrabold leading-[0.95] tracking-tight">
            Ready to <span className={GOLD}>Build</span><br />something real?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base text-white/60 sm:text-lg">
            Join 2,400+ builders. Register free, form your team, and launch your idea this weekend.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-full px-10 py-4 text-base font-bold transition-shadow hover:shadow-[0_20px_50px_-10px_rgba(231,170,58,0.65)] ${GOLD_BTN}`}
            >
              Register Now for Free!
            </motion.button>
          </div>
          <p className={`mt-8 font-display text-2xl font-extrabold sm:text-3xl ${GOLD}`}>#TutedudeBuilds</p>
        </Reveal>
      </section>

      {/* ── footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] bg-[#0d0514]/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Image src="/tutedudelogo.png" alt="Tutedude" width={30} height={30} />
              <span className="text-lg font-bold">Tutedude</span>
            </div>
            <p className="text-sm leading-relaxed text-white/45">
              Build. Collaborate. Launch. Join the Buildathon and turn your ideas into real products.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/70">Other Links</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {["About us", "Contact us", "Privacy Policy", "Terms of Use"].map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-[#edc168]">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/70">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#edc168]" /> support@tutedude.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#edc168]" /> +91 7999749959</li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#edc168]" />
                1st floor, AltF, Orchid Business Park, Central Park II, Sector 48, Gurugram, Haryana 122018
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/70">Social Links</h4>
            <div className="flex gap-3">
              {[
                { label: "LinkedIn",  href: "https://in.linkedin.com/company/tutedudeofficial", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { label: "Instagram", href: "https://www.instagram.com/tutedudeofficial/",      path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01 M7.55 3h8.9A4.55 4.55 0 0 1 21 7.55v8.9A4.55 4.55 0 0 1 16.45 21H7.55A4.55 4.55 0 0 1 3 16.45V7.55A4.55 4.55 0 0 1 7.55 3z" },
                { label: "Facebook",  href: "https://facebook.com/tutedude.officials",           path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { label: "YouTube",   href: "https://www.youtube.com/@tutedudeofficial",         path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all hover:-translate-y-1 hover:shadow-[0_8px_20px_-4px_rgba(231,170,58,0.5)] ${GOLD_BTN}`}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="border-t border-white/[0.06] py-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Tutedude · Buildathon™ · Made with purpose
        </p>
      </footer>
    </div>
  );
}
