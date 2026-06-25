"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  Trophy,
  Gift,
  Clock,
  Users,
  Code2,
  Palette,
  Megaphone,
  Lightbulb,
  FileText,
  Briefcase,
  Headphones,
  Play,
  Plus,
  Minus,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Crown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/* ---------------------------------------------------------------- tokens --- */
const GOLD =
  "bg-gradient-to-r from-[#f8e3a6] via-[#edc168] to-[#d99a2b] bg-clip-text text-transparent";
const GOLD_BTN =
  "bg-gradient-to-b from-[#f7dd97] to-[#dca23a] text-[#3a0f33] shadow-[0_10px_30px_-8px_rgba(231,170,58,0.6)]";
const CARD =
  "rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md";

/* ---------------------------------------------------------------- content --- */
const stats = [
  { icon: Check, label: "100% Online" },
  { icon: Trophy, label: "Win ₹10,000 in Cash" },
  { icon: Gift, label: "Free Registration" },
  { icon: Clock, label: "48–72 Hours of Intense Creation" },
  { icon: Users, label: "Work in Teams of 3–5" },
];

const projects = [
  {
    tag: "Hackathon",
    title: "Make a 3D Website",
    desc: "Build an immersive 3D web experience in a weekend and ship it live.",
    grad: "from-[#7c3aed] to-[#3b82f6]",
  },
  {
    tag: "Cider",
    title: "Design, Code & Ship an iOS App",
    desc: "Take an idea to the App Store in 30 days — design, build, and launch.",
    grad: "from-[#f59e0b] to-[#ef4444]",
  },
  {
    tag: "HackCraft",
    title: "Ship a Game Mod",
    desc: "Craft a playable mod from scratch and put it in players' hands.",
    grad: "from-[#10b981] to-[#06b6d4]",
  },
  {
    tag: "Putting the 'You' in CPU",
    title: "Build Something Low-level",
    desc: "Curious what really happens when you run a program? Build it and find out.",
    grad: "from-[#ec4899] to-[#8b5cf6]",
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

const internship = [
  {
    icon: FileText,
    title: "Resume Building",
    desc: "Elevate your career with our personalised resume-building feature.",
  },
  {
    icon: Briefcase,
    title: "Job Opportunities",
    desc: "Access exclusive job opportunities shared directly with you.",
  },
  {
    icon: Headphones,
    title: "Career Support",
    desc: "Benefit from our guidance and tips to sharpen your job search and prospects.",
  },
];

const reviews = [
  { name: "Hard Branots", role: "Student", grad: "from-[#7c3aed] to-[#db2777]" },
  { name: "Hely Branots", role: "Student", grad: "from-[#2563eb] to-[#06b6d4]" },
  { name: "Anny Roy", role: "Student", grad: "from-[#f59e0b] to-[#ef4444]" },
  { name: "Karan Mehta", role: "Student", grad: "from-[#10b981] to-[#4f46e5]" },
];

const faqs = [
  {
    q: "Why should I opt for Tutedude Plus?",
    a: "Tutedude provides professionally curated content by Indian instructors along with live doubt-solving and personal one-to-one mentorship you won't find anywhere else. And amazingly, you learn for free if you're enrolled under the 100% Refund offer.",
  },
  {
    q: "What is the validity of the courses and when can I watch them?",
    a: "Your courses come with lifetime validity — watch them anytime, at your own pace, as many times as you like.",
  },
  {
    q: "Will my course validity expire after I receive the 100% Refund amount?",
    a: "No. Even after you receive your 100% refund, your course access stays active so you can keep learning.",
  },
  {
    q: "Why should I opt for Tutedude?",
    a: "Industry-grade content, real mentorship, project-based learning, and placement support — all designed to take you from learner to professional.",
  },
];

/* ---------------------------------------------------------------- bits --- */
function StatChip({ icon: Icon, label }: { icon: typeof Check; label: string }) {
  return (
    <RevealItem className="group flex flex-col items-center gap-3 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#edc168]/30 bg-[#edc168]/10 text-[#edc168] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
        <Icon className="h-6 w-6" />
      </span>
      <span className="max-w-[10rem] text-sm font-semibold leading-snug text-white/85">
        {label}
      </span>
    </RevealItem>
  );
}

function PhotoCard({
  grad,
  children,
}: {
  grad: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br ${grad}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(255,255,255,0.25),transparent_60%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:14px_14px]" />
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- page --- */
export default function BuildathonPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#2b0a30] font-sans text-white">
      {/* glow background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_-10%,#5d1659_0%,#360e3a_42%,#1c0922_100%)]" />
        <div className="absolute -right-[10%] top-[14%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(206,46,160,0.34),transparent_70%)] blur-3xl" />
        <div className="absolute -left-[12%] top-[55%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.3),transparent_70%)] blur-3xl" />
      </div>

      {/* ---------------------------------------------------------- navbar --- */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#2b0a30]/60 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-2">
            <Image src="/tutedude-logo.svg" alt="Tutedude" width={30} height={30} />
            <span className="text-lg font-bold tracking-tight">Tutedude</span>
          </a>
          <div className="flex items-center gap-3">
            <button className="rounded-full px-5 py-2 text-sm font-semibold text-white/80 transition-colors hover:text-white">
              Login
            </button>
            <button
              className={`rounded-full px-5 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5 ${GOLD_BTN}`}
            >
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      {/* ---------------------------------------------------------- hero --- */}
      <section className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pb-24 pt-20 text-center sm:px-8 sm:pt-28">
        {/* hex badge */}
        <div className="pointer-events-none absolute top-10 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 opacity-[0.07]">
          <div className="h-full w-full [clip-path:polygon(50%_0,93%_25%,93%_75%,50%_100%,7%_75%,7%_25%)] border border-white bg-white/5" />
        </div>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#edc168]/30 bg-[#edc168]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#edc168]"
        >
          <Sparkles className="h-3.5 w-3.5" /> The Tutedude Buildathon
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.6rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight"
        >
          Tutedude{" "}
          <span className="relative whitespace-nowrap">
            <span className={GOLD}>Buildathon</span>
            <Sparkles className="absolute -right-7 -top-2 hidden h-6 w-6 text-[#edc168] sm:block" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Build. Collaborate. Launch your ideas. It's not just a competition — it's
          your chance to build something real, with real impact.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className={`mt-9 rounded-full px-8 py-4 text-base font-bold ${GOLD_BTN}`}
        >
          Register Now for Free!
        </motion.button>

        {/* floating iPhone — same prize image as the homepage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="pointer-events-none mt-14"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/iphone-15-prize.png"
              alt="iPhone — Buildathon prize"
              width={457}
              height={600}
              priority
              className="mx-auto w-40 drop-shadow-[0_36px_70px_rgba(0,0,0,0.55)] sm:w-48 lg:w-56"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ------------------------------------------------ what is buildathon --- */}
      <section className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8">
        <Reveal direction="up">
          <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            What Is <span className={GOLD}>Buildathon?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/65">
            Buildathon is an online 48–72 hour sprint where creators come together to
            design, develop, and market real products. Whether you're a developer,
            designer, or visionary — this is your chance to collaborate, innovate, and
            launch.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5"
          stagger={0.1}
        >
          {stats.map((s) => (
            <StatChip key={s.label} icon={s.icon} label={s.label} />
          ))}
        </RevealGroup>
      </section>

      {/* ----------------------------------------------------- project types --- */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-tight">
            What Type of Projects <span className={GOLD}>Can You Build?</span>
          </h2>
        </Reveal>
        <RevealGroup
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {projects.map((p) => (
            <RevealItem key={p.tag}>
              <div
                className={`${CARD} group h-full overflow-hidden p-1 transition-transform duration-300 hover:-translate-y-1.5`}
              >
                <div
                  className={`mb-4 flex h-32 items-center justify-center rounded-[1.3rem] bg-gradient-to-br ${p.grad} text-2xl font-extrabold text-white/95`}
                >
                  {p.tag}
                </div>
                <div className="px-4 pb-5">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                    {p.desc}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ------------------------------------------------------- who can join --- */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            Who Can <span className={GOLD}>Join?</span>
          </h2>
          <p className="mt-3 text-center text-lg font-medium text-white/60">
            If you can build, you belong.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {audience.map((a) => (
            <RevealItem key={a.title}>
              <div
                className={`${CARD} group flex h-full gap-5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#edc168]/30`}
              >
                <PhotoCard grad={a.grad}>
                  <a.icon className="absolute bottom-3 left-3 h-7 w-7 text-white/90" />
                </PhotoCard>
                <div className="flex-1 self-center">
                  <h3 className="text-xl font-bold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {a.desc}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ------------------------------------------------------- internship --- */}
      <section className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8">
        <Reveal direction="up">
          <h2 className="font-display text-[clamp(1.8rem,4.5vw,2.9rem)] font-extrabold tracking-tight">
            <span className={GOLD}>Internship Assistance</span> with Resume Building
            in One Place
          </h2>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3" stagger={0.1}>
          {internship.map((it) => (
            <RevealItem key={it.title}>
              <div
                className={`${CARD} group h-full p-7 text-left transition-transform duration-300 hover:-translate-y-1.5`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#edc168]/30 bg-[#edc168]/10 text-[#edc168] transition-transform group-hover:scale-110">
                  <it.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{it.desc}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ---------------------------------------------------- tutedude plus --- */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <Reveal direction="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f8e3a6] via-[#edc168] to-[#d99a2b] p-8 text-center text-[#3a0f33] shadow-[0_30px_80px_-30px_rgba(231,170,58,0.7)] sm:p-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#3a0f33]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                <Crown className="h-4 w-4" /> Tutedude Plus
              </span>
              <h3 className="mt-5 font-display text-2xl font-extrabold sm:text-4xl">
                What are you waiting for? Get Tutedude Plus
              </h3>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <button className="rounded-full bg-[#3a0f33] px-7 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
                  Start Subscription
                </button>
                <p className="text-lg font-extrabold">
                  ₹1,200<span className="text-sm font-semibold">/year</span>{" "}
                  <span className="text-sm font-medium text-[#3a0f33]/55 line-through">
                    ₹10,000/year
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------ video reviews --- */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-tight">
            Video Reviews from <span className={GOLD}>Our Students!</span>
          </h2>
        </Reveal>
        <RevealGroup
          className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4"
          stagger={0.08}
        >
          {reviews.map((r) => (
            <RevealItem key={r.name}>
              <div className="group">
                <PhotoCard grad={r.grad}>
                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#3a0f33] shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-5 w-5 translate-x-0.5 fill-current" />
                  </span>
                </PhotoCard>
                <p className="mt-3 text-center text-lg font-bold">{r.name}</p>
                <p className="text-center text-sm text-[#edc168]">{r.role}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ------------------------------------------------------------- faq --- */}
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-tight">
            Frequently Asked <span className={GOLD}>Questions</span>
          </h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} direction="up" delay={i * 0.05}>
                <div className={`${CARD} overflow-hidden`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold sm:text-lg">{f.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-[#edc168] text-[#3a0f33]"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-white/65">
                      {f.a}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------- footer --- */}
      <footer className="border-t border-white/5 bg-[#1c0922]/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Image src="/tutedude-logo.svg" alt="Tutedude" width={28} height={28} />
              <span className="text-lg font-bold">Tutedude</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Build. Collaborate. Launch. Join the Buildathon and turn your ideas into
              real products.
            </p>
          </div>

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
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#edc168]" /> support@tutedude.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#edc168]" /> +91 79888 00474
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#edc168]" /> Suncity
                Success Tower, Sector 65, Gurugram, Haryana, 122005
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Social Links
            </h4>
            <div className="flex gap-3">
              {[Linkedin, Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform hover:-translate-y-1 ${GOLD_BTN}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="border-t border-white/5 py-6 text-center text-xs text-white/35">
          © {new Date().getFullYear()} Tutedude · Buildathon ·{" "}
          <span className="inline-flex items-center gap-1">
            Made with <ArrowRight className="h-3 w-3" /> purpose
          </span>
        </p>
      </footer>
    </div>
  );
}
