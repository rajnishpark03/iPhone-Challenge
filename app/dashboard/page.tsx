"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Calendar, BookOpen, ExternalLink, Send, CheckCircle2, Loader2, PartyPopper } from "lucide-react";
import { useIsMobile } from "@/lib/useIsMobile";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { GOLD, GOLD_BTN, CARD } from "@/lib/tokens";
import { trackVisit, fetchParticipationStatus, registerParticipation } from "@/lib/tracking";
import { Modal } from "@/components/ui/Modal";

const CHALLENGE_START = new Date("2026-07-01T00:00:00+05:30").getTime();
const CHALLENGE_END   = new Date("2026-07-31T23:59:59+05:30").getTime();
const TOTAL_DAYS      = 31;


const AVATAR_COLORS = [
  "#e03c6e","#e05c3c","#d4a017","#3cb87a","#3c8fe0",
  "#7c3ce0","#e03cb8","#3cbce0","#e07c3c","#5c8f3c",
];
function firstLetter(email: string) {
  const match = email.match(/[a-zA-Z]/);
  return match ? match[0].toUpperCase() : "?";
}
function avatarColor(email: string) {
  const code = firstLetter(email).charCodeAt(0) || 0;
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

function useCountdown() {
  const [t, setT]         = useState({ d: 0, h: 0, min: 0, s: 0 });
  const [phase, setPhase] = useState<"live" | "ended">("live");
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      if (now <= CHALLENGE_END) {
        setPhase("live");
        const diff = CHALLENGE_END - now;
        setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), min: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
      } else {
        setPhase("ended");
        setT({ d: 0, h: 0, min: 0, s: 0 });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return { t, phase };
}

function useChallengeProgress() {
  const [pct, setPct]       = useState(0);
  const [daysLeft, setLeft] = useState(TOTAL_DAYS);
  const [daysGone, setGone] = useState(0);
  useEffect(() => {
    const tick = () => {
      const now    = Date.now();
      const span   = CHALLENGE_END - CHALLENGE_START;
      const gone   = Math.max(0, now - CHALLENGE_START);
      const leftMs = Math.max(0, CHALLENGE_END - now);
      setPct(Math.min(100, (gone / span) * 100));
      setLeft(Math.min(TOTAL_DAYS, Math.max(0, Math.ceil(leftMs / 86_400_000))));
      setGone(Math.min(TOTAL_DAYS, Math.floor(gone / 86_400_000)));
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return { pct, daysLeft, daysGone };
}

/* ── Flip box — AnimatePresence on desktop, plain text on mobile ── */
function CountBox({ value, label, large = false, isMobile }: { value: number; label: string; large?: boolean; isMobile: boolean }) {
  const str = String(value).padStart(2, "0");
  const boxCls = large
    ? "relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-[#edc168]/25 bg-[#2B0A30] shadow-[0_0_24px_rgba(237,193,104,0.12)] sm:h-24 sm:w-24 sm:rounded-2xl"
    : "relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-[#edc168]/30 bg-[#2B0A30] sm:h-16 sm:w-16";
  const textCls = large
    ? `font-display text-2xl font-extrabold sm:text-4xl ${GOLD}`
    : `font-display text-2xl font-extrabold sm:text-3xl ${GOLD}`;
  const labelCls = large
    ? "text-[0.55rem] font-bold uppercase tracking-widest text-white/40 sm:text-[0.65rem]"
    : "text-[9px] font-bold uppercase tracking-widest text-white/50 sm:text-[10px]";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={boxCls}>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px bg-black/15" />
        {isMobile ? (
          <span className={textCls}>{str}</span>
        ) : (
          <AnimatePresence mode="popLayout">
            <m.span
              key={str}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: "0%",    opacity: 1 }}
              exit={{    y: "100%",  opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.32, 0, 0.67, 0] }}
              className={textCls}
            >
              {str}
            </m.span>
          </AnimatePresence>
        )}
      </div>
      <span className={labelCls}>{label}</span>
    </div>
  );
}

const STARS = [
  { top: "-14%", left: "78%",  size: 22, delay: 0,   dur: 2.8, color: "#f8e3a6", glow: true  },
  { top: "5%",   left: "-20%", size: 20, delay: 0.7, dur: 3.0, color: "#edc168", glow: true  },
  { top: "88%",  left: "72%",  size: 18, delay: 1.3, dur: 2.6, color: "#f8e3a6", glow: true  },
  { top: "-6%",  left: "28%",  size: 13, delay: 0.9, dur: 2.3, color: "#edc168", glow: false },
  { top: "22%",  left: "94%",  size: 14, delay: 0.3, dur: 2.7, color: "#f8e3a6", glow: false },
  { top: "38%",  left: "-24%", size: 12, delay: 1.6, dur: 2.2, color: "#edc168", glow: false },
  { top: "60%",  left: "90%",  size: 13, delay: 0.5, dur: 2.5, color: "#f8e3a6", glow: false },
  { top: "76%",  left: "-16%", size: 11, delay: 1.1, dur: 2.4, color: "#edc168", glow: false },
];

const CHECKLIST: React.ReactNode[] = [
  "Public profile",
  <span key="tag">Tagged <strong className="text-[#edc168]">@tutedudeofficial</strong> and used <strong className="text-[#edc168]">#TutedudeiPhoneChallenge</strong></span>,
  "Original content with captions",
  "Reel is live",
];

export default function DashboardPage() {
  const isMobile                    = useIsMobile();
  const { user, loading: authLoading, hasCourses, logout } = useAuth();
  const router                      = useRouter();
  const { t: countdown, phase }     = useCountdown();
  const { pct, daysLeft, daysGone } = useChallengeProgress();
  const confettiRef                 = useRef<ReturnType<typeof setInterval> | null>(null);

  const USER_NAME  = user?.name || "User";
  const USER_EMAIL = user?.email || "user@example.com";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  // Redirect to not-enrolled if user has no courses
  useEffect(() => {
    if (!authLoading && user && !hasCourses) {
      router.push("/not-enrolled");
    }
  }, [authLoading, user, hasCourses, router]);

  // Track dashboard visit
  useEffect(() => {
    if (!authLoading && user && hasCourses) {
      trackVisit(user, { hasCourses: true, page: "dashboard" });
    }
  }, [authLoading, user, hasCourses]);

  // Participation state
  const [registered, setRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [showRegisteredModal, setShowRegisteredModal] = useState(false);
  useEffect(() => {
    if (!authLoading && user && hasCourses) {
      fetchParticipationStatus(user).then((s) => {
        if (s?.registered) setRegistered(true);
      });
    }
  }, [authLoading, user, hasCourses]);

  const handleRegister = async () => {
    if (!user || registered || registering) return;
    setRegistering(true);
    const { ok } = await registerParticipation(user);
    setRegistering(false);
    if (ok) {
      setRegistered(true);
      setShowRegisteredModal(true);
    }
  };

  useEffect(() => {
    if (isMobile) return;
    const colors = ["#edc168","#f8e3a6","#ce2ea0","#7c3aed","#f472b6","#fff","#d99a2b"];
    const container = document.getElementById("db-confetti");
    if (!container) return;
    const spawn = () => {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      const size = 5 + Math.random() * 7;
      const dur  = 4 + Math.random() * 6;
      el.style.cssText = `left:${Math.random()*100}vw;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?"50%":"2px"};animation-duration:${dur}s;animation-delay:${Math.random()*2}s;`;
      container.appendChild(el);
      setTimeout(() => el.remove(), (dur + 2) * 1000);
    };
    for (let i = 0; i < 50; i++) setTimeout(spawn, i * 55);
    confettiRef.current = setInterval(spawn, 900);
    return () => { if (confettiRef.current) clearInterval(confettiRef.current); };
  }, [isMobile]);

  // Show loading while verifying session
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2B0A30]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#edc168] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#2B0A30] font-sans text-white">

      <div id="db-confetti" className="pointer-events-none fixed inset-0 z-[99] overflow-hidden" aria-hidden />

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#2B0A30]/75 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="/" className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-70">
            <Image src="/tutedudelogo.webp" alt="Tutedude" width={30} height={30} />
            <span className="text-lg font-bold tracking-tight">Tutedude</span>
          </a>
          <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.10] bg-white/[0.05] px-3 py-1.5">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"
              style={{ background: avatarColor(USER_EMAIL) }}
            >
              {firstLetter(USER_EMAIL)}
            </div>
            <span className="max-w-[80px] truncate text-sm font-semibold text-white/90 sm:max-w-none">{USER_NAME}</span>
            <button
              onClick={() => logout().then(() => router.push("/login"))}
              className="ml-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-white/60 transition-colors hover:bg-white/10 hover:text-white/90"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="relative mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-8 sm:pb-12 sm:pt-16">
        <div className="section-grid" />
        <div className="relative z-10 flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:gap-12 lg:text-left">

          {/* LEFT */}
          <div className="flex w-full flex-col items-center lg:flex-1 lg:items-start">
            <m.h1
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(1.9rem,6.5vw,3.8rem)] font-extrabold leading-[1.1] tracking-tight"
            >
              Welcome to the{" "}
              <span className={GOLD}>TuteDude iPhone<br />Challenge! 🚀</span>
            </m.h1>

            <m.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex flex-col items-center lg:items-start"
            >
              <p className="mt-3 text-xl font-bold text-white sm:text-2xl">You&rsquo;re officially in!</p>
              <p className="mt-2 max-w-sm text-sm font-semibold leading-relaxed text-white/75 sm:text-base">
                Create, share, and submit your reels to get one step closer to winning an iPhone 17.
              </p>

              {/* ── I'm Participating opt-in ── */}
              <div className="mt-5">
                {registered ? (
                  <div className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-5 py-2.5 text-sm font-bold text-green-300">
                    <CheckCircle2 className="h-4 w-4" />
                    You&rsquo;re participating!
                  </div>
                ) : (
                  <button
                    onClick={handleRegister}
                    disabled={registering}
                    className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold ${GOLD_BTN} disabled:cursor-wait disabled:opacity-70`}
                  >
                    {registering ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <PartyPopper className="h-4 w-4" />
                    )}
                    {registering ? "Registering…" : "I'm Participating"}
                  </button>
                )}
              </div>
            </m.div>

            {/* chips */}
            <m.div
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.6 }}
              className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/85">
                <svg className="h-4 w-4 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                Platform: Instagram
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/85">
                <Calendar className="h-4 w-4 text-[#edc168]" /> 1 July – 31 July
              </div>
            </m.div>

            {/* countdown + progress */}
            <m.div
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.6 }}
              className="mt-7 flex w-full flex-col items-center lg:items-start"
            >
              <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/50">
                {phase === "live" ? "⏳ Challenge Ends In" : "🎉 Challenge Has Ended"}
              </p>

              {phase === "ended" ? (
                <p className={`font-display text-2xl font-extrabold ${GOLD}`}>Winners Announced Soon!</p>
              ) : (
                <div className="flex items-start gap-2">
                  <CountBox value={countdown.d}   label="Days"  isMobile={isMobile} />
                  <span className="mt-4 text-xl font-bold text-[#edc168]/60">:</span>
                  <CountBox value={countdown.h}   label="Hours" isMobile={isMobile} />
                  <span className="mt-4 text-xl font-bold text-[#edc168]/60">:</span>
                  <CountBox value={countdown.min} label="Min"   isMobile={isMobile} />
                  <span className="mt-4 text-xl font-bold text-[#edc168]/60">:</span>
                  <CountBox value={countdown.s}   label="Sec"   isMobile={isMobile} />
                </div>
              )}

              {/* progress bar */}
              <div className="mt-6 w-full max-w-xs lg:max-w-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/45">Challenge Progress</span>
                  <span className="text-[0.65rem] font-bold text-[#edc168]">{daysLeft} days left</span>
                </div>
                <div className="relative h-4 w-full">
                  <div className="absolute inset-y-[5px] left-0 right-0 rounded-full bg-white/10" />
                  <m.div
                    className="absolute inset-y-[5px] left-0 rounded-full bg-gradient-to-r from-[#f8e3a6] to-[#edc168]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <m.div
                    className="absolute top-0 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#2B0A30] bg-[#edc168] shadow-[0_0_12px_rgba(237,193,104,0.9)]"
                    initial={{ left: "0.5rem" }}
                    animate={{ left: pct === 0 ? "0.5rem" : pct >= 100 ? "calc(100% - 0.5rem)" : `${pct}%` }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[0.65rem] font-semibold text-white/40">📅 1 July</span>
                  <span className="text-[0.65rem] font-semibold text-white/40">Day {daysGone === 0 ? "—" : daysGone} of {TOTAL_DAYS}</span>
                  <span className="text-[0.65rem] font-semibold text-white/40">31 July 📅</span>
                </div>
              </div>
            </m.div>
          </div>

          {/* RIGHT: iPhone */}
          <div className="flex shrink-0 items-center justify-center">
            <m.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
              className="relative isolate"
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10" style={{ transform:"translate(-50%,-50%)", width:"160%", height:"140%", borderRadius:"50%", background:"radial-gradient(ellipse at 50% 50%,rgba(237,193,104,0.55) 0%,rgba(180,60,220,0.22) 45%,transparent 72%)", filter:"blur(36px)" }} />
              <Image src="/iphone-17-prize.webp" alt="iPhone 17 Grand Prize" width={600} height={600} priority sizes="(max-width:640px) 180px,(max-width:1024px) 280px,380px" className="h-[180px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] sm:h-[280px] lg:h-[380px]" />
              <div className="absolute bottom-[10%] left-1/2 w-28 -translate-x-1/2 rounded-xl border-2 border-[#edc168] bg-[#2b0a30] p-2 shadow-[0_0_24px_rgba(237,193,104,0.35)] sm:w-36 sm:-rotate-[5deg] sm:rounded-2xl sm:p-3">
                <p className="text-[7px] font-bold uppercase tracking-widest text-[#edc168]/80 sm:text-[8px]">Grand Prize Worth</p>
                <p className={`mt-0.5 font-display text-base font-extrabold leading-none sm:text-xl ${GOLD}`}>₹82,900</p>
                <div className="my-1 h-px bg-[#edc168]/20" />
                <p className="text-[7px] font-bold uppercase tracking-wider text-white/55 sm:text-[9px]">🎉 Win for FREE</p>
              </div>
              <div>
                {STARS.map((s, i) => (
                  <div key={i} style={{ position:"absolute", top:s.top, left:s.left, pointerEvents:"none" }}>
                    {s.glow && <div style={{ position:"absolute", inset:-s.size, borderRadius:"50%", background:`radial-gradient(circle,${s.color}55 0%,transparent 70%)`, filter:"blur(8px)" }} />}
                    <svg viewBox="0 0 24 24" className="star-twinkle" style={{ width:s.size, height:s.size, display:"block", ["--star-dur" as string]:`${s.dur}s`, ["--star-delay" as string]:`${s.delay}s` }} aria-hidden>
                      <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" fill={s.color} />
                    </svg>
                  </div>
                ))}
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* ── SUBMIT & HANDBOOK ── */}
      <section className="relative mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-10">
        <div className="section-grid" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-3 lg:gap-8">

          <m.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`${CARD} p-6 sm:p-8 lg:col-span-2`}
          >
            <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#edc168]">Submit</p>
            <h2 className={`font-display text-[clamp(1.4rem,4vw,2rem)] font-extrabold ${GOLD}`}>Submit Your Reel</h2>
            <p className="mt-1 text-sm font-semibold text-white/60">A quick check before submitting:</p>
            <ul className="mt-4 space-y-3">
              {CHECKLIST.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#edc168]" />
                  <span className="text-sm font-semibold text-white/90">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href="/dashboard/submit"
                className={`inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold ${GOLD_BTN}`}
              >
                <Send className="h-4 w-4" /> Submit Your Reel
              </a>
            </div>
            <p className="mt-3 text-[0.65rem] font-semibold text-white/45">
              Fill in your details and submit your reel link to complete your entry.
            </p>
          </m.div>

          <m.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className={`${CARD} flex flex-col p-6 sm:p-8`}
          >
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#edc168]">Before You Hit Record</p>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-[#edc168]" />
              <h3 className="font-display text-xl font-extrabold sm:text-2xl">Creator Handbook</h3>
            </div>
            <p className="mt-3 flex-1 text-sm font-semibold leading-relaxed text-white/70">
              Learn what makes a winning reel, understand the judging criteria, and avoid common mistakes before you hit record.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[{ val: "12", label: "Chapters" }, { val: "5 min", label: "Quick Read" }].map(({ val, label }) => (
                <div key={label} className="rounded-xl border border-[#edc168]/20 bg-[#edc168]/[0.08] p-3">
                  <p className={`font-display text-lg font-extrabold ${GOLD}`}>{val}</p>
                  <p className="mt-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-white/50">{label}</p>
                </div>
              ))}
            </div>
            <a href="https://drive.google.com/file/d/1A_AsQHdnQ1JNDu3uO0i0O9Hf5JDRkG4w/view" target="_blank" rel="noopener noreferrer" className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${GOLD_BTN}`}>
              Open Handbook <ExternalLink className="h-4 w-4" />
            </a>
          </m.div>
        </div>
      </section>

      {/* ── BIG TIMER ── */}
      <section className="relative mx-auto max-w-6xl px-4 py-14 text-center sm:px-8 sm:py-20">
        <div className="section-grid" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(237,193,104,0.15),transparent_70%)] blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <m.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <p className="mb-8 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/50">
              {phase === "live" ? "Challenge Ends In" : "Challenge Has Ended"}
            </p>

            {phase === "ended" ? (
              <p className={`font-display text-3xl font-extrabold sm:text-5xl ${GOLD}`}>Winners Announced Soon!</p>
            ) : (
              <div className="flex items-start justify-center gap-1.5 sm:gap-4">
                {[
                  { value: countdown.d,   label: "Days"  },
                  { value: countdown.h,   label: "Hours" },
                  { value: countdown.min, label: "Min"   },
                  { value: countdown.s,   label: "Sec"   },
                ].map(({ value, label }, idx) => (
                  <div key={label} className="flex items-start gap-1.5 sm:gap-4">
                    {idx !== 0 && <span className="mt-4 text-lg font-bold text-[#edc168]/40 sm:mt-5 sm:text-3xl">:</span>}
                    <CountBox value={value} label={label} large isMobile={isMobile} />
                  </div>
                ))}
              </div>
            )}

            <p className="mt-8 text-sm font-semibold text-white/40">
              {phase === "live" ? "Challenge closes 31 July 2026 · Keep creating!" : "Thank you for participating!"}
            </p>
          </m.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Image src="/tutedudelogo.webp" alt="Tutedude" width={22} height={22} className="opacity-70" />
          <span className="text-sm font-bold opacity-70">Tutedude</span>
        </div>
        <p className="text-xs text-white/35">© {new Date().getFullYear()} Tutedude · iPhone Challenge Dashboard</p>
      </footer>

      {/* ── Registration success modal ── */}
      <Modal
        open={showRegisteredModal}
        onClose={() => setShowRegisteredModal(false)}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/15 shadow-[0_0_32px_rgba(34,197,94,0.25)]">
            <CheckCircle2 className="h-8 w-8 text-green-400" />
          </div>
          <h2 className={`font-display text-2xl font-extrabold ${GOLD}`}>
            You&rsquo;re In! 🎉
          </h2>
          <p className="mt-3 max-w-xs text-sm font-semibold text-white/70">
            You&rsquo;ve successfully registered for the Tutedude iPhone Challenge.
            Now go create your reel and submit it before 31 July!
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a
              href="/dashboard/submit"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold ${GOLD_BTN}`}
            >
              <Send className="h-4 w-4" /> Submit Your Reel
            </a>
            <button
              onClick={() => setShowRegisteredModal(false)}
              className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/[0.08]"
            >
              Continue Later
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
