"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { ShieldX, ExternalLink } from "lucide-react";
import { GOLD, GOLD_BTN, CARD } from "@/lib/tokens";
import { useAuth } from "@/lib/useAuth";
import { trackVisit, trackEvent } from "@/lib/tracking";

export default function NotEnrolledPage() {
  const router = useRouter();
  const { user, hasCourses, loading, logout } = useAuth();

  // If user is not logged in, redirect to login
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // If user has courses, redirect to dashboard
  useEffect(() => {
    if (!loading && user && hasCourses) {
      router.push("/dashboard");
    }
  }, [loading, user, hasCourses, router]);

  // Track not-enrolled page visit
  useEffect(() => {
    if (!loading && user && !hasCourses) {
      trackVisit(user, { hasCourses: false, page: "not-enrolled" });
    }
  }, [loading, user, hasCourses]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2B0A30]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#edc168] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#2B0A30] font-sans text-white">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#2B0A30]/75 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="/" className="flex items-center gap-2 opacity-90 transition-opacity hover:opacity-70">
            <Image src="/tutedudelogo.webp" alt="Tutedude" width={30} height={30} />
            <span className="text-lg font-bold tracking-tight">Tutedude</span>
          </a>
        </nav>
      </header>

      {/* ── MAIN ── */}
      <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-16 sm:px-8">

        {/* grid */}
        <div className="section-grid" />

        {/* ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(237,193,104,0.10)_0%,rgba(180,60,220,0.08)_45%,transparent_72%)] blur-3xl" />

        <div className="relative z-10 w-full max-w-lg">
          <m.div
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`${CARD} flex flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-14`}
          >
            {/* icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 shadow-[0_0_24px_rgba(239,68,68,0.15)]">
              <ShieldX className="h-8 w-8 text-red-400" />
            </div>

            {/* heading */}
            <h1 className={`font-display text-2xl font-extrabold sm:text-3xl ${GOLD}`}>
              Exclusive for Tutedude Students
            </h1>

            {/* description */}
            <p className="mt-4 max-w-sm text-sm font-semibold leading-relaxed text-white/65 sm:text-base">
              The <strong className="text-white/90">Tutedude iPhone Challenge</strong> is open only to students who are currently enrolled in a Tutedude course.
            </p>

            {/* info cards */}
            <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#edc168]/20 bg-[#edc168]/[0.06] p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#edc168]">How to join</p>
                <p className="mt-1.5 text-sm font-medium text-white/70">
                  Enroll in any Tutedude course to become eligible for the challenge.
                </p>
              </div>
              <div className="rounded-xl border border-[#edc168]/20 bg-[#edc168]/[0.06] p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#edc168]">Grand Prize</p>
                <p className="mt-1.5 text-sm font-medium text-white/70">
                  Win an iPhone 17 worth ₹82,900 — completely free!
                </p>
              </div>
            </div>

            {/* extra info */}
            <p className="mt-6 text-xs font-medium text-white/40">
              Already enrolled? Try logging in with the same email you used on Tutedude.
            </p>

            {/* CTA */}
            <a
              href="https://www.tutedude.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(user, "explore_courses_click")}
              className={`mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold ${GOLD_BTN}`}
            >
              <ExternalLink className="h-4 w-4" /> Explore Tutedude Courses
            </a>

            {/* logout */}
            <button
              onClick={() => logout().then(() => router.push("/login"))}
              className="mt-4 text-sm font-semibold text-white/50 transition-colors hover:text-white/80"
            >
              Logout
            </button>
          </m.div>
        </div>
      </main>
    </div>
  );
}
