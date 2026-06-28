"use client";

import { useIsMobile } from "@/lib/useIsMobile";
import Image from "next/image";
import { m as motion } from "framer-motion";
import {
  Calendar,
  Trophy,
  Users,
  Smartphone,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { meta } from "@/lib/content";
import { GOLD, GOLD_BTN } from "@/lib/tokens";

import SectionWelcome from "@/components/sections/SectionWelcome";
import SectionHowItWorks from "@/components/sections/SectionHowItWorks";
import SectionPeopleParticipating from "@/components/sections/SectionPeopleParticipating";
import SectionWhoCanJoin from "@/components/sections/SectionWhoCanJoin";
import SectionPickYourStyle from "@/components/sections/SectionPickYourStyle";
import SectionPrizes from "@/components/sections/SectionPrizes";
import SectionRules from "@/components/sections/SectionRules";
import SectionFAQ from "@/components/sections/SectionFAQ";
import SectionClosingCTA from "@/components/sections/SectionClosingCTA";

/* ---- JSON-LD structured data for SEO / AEO ---- */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tutedude.com/#org",
      name: "Tutedude",
      url: "https://tutedude.com",
      logo: "https://tutedude.com/tutedudelogo.png",
      sameAs: ["https://www.instagram.com/tutedudeofficial/", "https://www.youtube.com/@tutedudeofficial", "https://facebook.com/tutedude.officials", "https://in.linkedin.com/company/tutedudeofficial"],
      contactPoint: { "@type": "ContactPoint", telephone: "+91-7999749959", contactType: "customer support", email: "support@tutedude.com" },
    },
    {
      "@type": "Event",
      name: "Tutedude iPhone Challenge — Win iPhone 17 by Posting Instagram Reels",
      description: "The Tutedude iPhone Challenge is an Instagram Reel contest where enrolled TuteDude students post reels about their learning journey and win an iPhone 17 worth ₹82,900. This is NOT a refund challenge or a fee-waiver program. It is a social media content challenge where the best reel wins a brand new iPhone 17. Post your reel on Instagram between July 1 and July 31, 2025, tag @tutedudeofficial, use #TutedudeiPhoneChallenge, and submit on the dashboard to enter.",
      startDate: "2025-07-01",
      endDate: "2025-07-31",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: { "@type": "VirtualLocation", url: "https://tutedude-challenge.vercel.app" },
      organizer: { "@id": "https://tutedude.com/#org" },
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR", availability: "https://schema.org/InStock", description: "Free to enter for all enrolled TuteDude students" },
      prize: "iPhone 17 worth ₹82,900",
      url: "https://tutedude-challenge.vercel.app",
      image: "https://tutedude-challenge.vercel.app/opengraph-image",
      keywords: "Tutedude iPhone Challenge, Instagram Reel Challenge India, Win iPhone 17, TutedudeiPhoneChallenge",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Tutedude iPhone Challenge kya hai?", acceptedAnswer: { "@type": "Answer", text: "Tutedude iPhone Challenge ek Instagram Reel contest hai jisme TuteDude ke enrolled students apni learning journey ke baare mein Instagram Reels banate hain aur best reel wale ko ek brand new iPhone 17 worth ₹82,900 milta hai. Yeh koi fee refund program nahi hai — yeh ek social media content challenge hai." } },
        { "@type": "Question", name: "What is the Tutedude iPhone Challenge?", acceptedAnswer: { "@type": "Answer", text: "The Tutedude iPhone Challenge is an Instagram Reel contest organized by TuteDude. Enrolled students create and post Instagram Reels about their learning journey with TuteDude between July 1–31, 2025. The best reel wins a brand new iPhone 17 worth ₹82,900. It is completely free to enter and is NOT related to the TuteDude refund or fee-waiver challenge." } },
        { "@type": "Question", name: "How to participate in Tutedude iPhone Challenge?", acceptedAnswer: { "@type": "Answer", text: "To participate: 1) Create an Instagram Reel about your TuteDude learning journey. 2) Post it between July 1–31, 2025. 3) Tag @tutedudeofficial in your reel. 4) Use hashtag #TutedudeiPhoneChallenge. 5) Submit your reel link on the TuteDude challenge dashboard. That's it — you're entered to win an iPhone 17." } },
        { "@type": "Question", name: "What is the prize for Tutedude iPhone Challenge?", acceptedAnswer: { "@type": "Answer", text: "The grand prize is a brand new iPhone 17 worth ₹82,900. Additional prizes include TuteDude course vouchers and merchandise." } },
        { "@type": "Question", name: "Is Tutedude iPhone Challenge free to enter?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Tutedude iPhone Challenge is completely free to enter for all enrolled TuteDude students. There is no registration fee." } },
        { "@type": "Question", name: "Who can participate in Tutedude iPhone Challenge?", acceptedAnswer: { "@type": "Answer", text: "Any student enrolled in any TuteDude course can participate. It is open to learners of all courses and skill levels." } },
        { "@type": "Question", name: "What kind of reels can I create for Tutedude iPhone Challenge?", acceptedAnswer: { "@type": "Answer", text: "Any reel that showcases your TuteDude learning journey — projects you built, skills you learned, tips you discovered, AI tools you used, or your progress story. Faceless videos, AI-generated content, screen recordings, and voiceovers are all accepted." } },
        { "@type": "Question", name: "When does the Tutedude iPhone Challenge end?", acceptedAnswer: { "@type": "Answer", text: "The Tutedude iPhone Challenge runs from July 1 to July 31, 2025. All reels must be posted on Instagram within this period." } },
        { "@type": "Question", name: "How will the winner of Tutedude iPhone Challenge be selected?", acceptedAnswer: { "@type": "Answer", text: "Winners are selected based on creativity, content quality, relevance to the learning journey, and overall reel performance. Follower count does not matter — a small account can win." } },
        { "@type": "Question", name: "What hashtag to use for Tutedude iPhone Challenge?", acceptedAnswer: { "@type": "Answer", text: "Use #TutedudeiPhoneChallenge on every reel and tag @tutedudeofficial to make sure your entry is counted." } },
      ],
    },
  ],
};

/* ---------------------------------------------------------------- page --- */
export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#2b0a30] font-sans text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* fixed background: gradient + grid + glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_-10%,#7a1e75_0%,#3d1040_42%,#1c0922_100%)]" />
        {/* subtle animated grid */}
        <div className="animate-grid-drift absolute inset-0" />
        <div className="absolute -right-[6%] top-[10%] h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle,rgba(206,46,160,0.55),transparent_70%)] blur-3xl" />
        <div className="absolute -left-[8%] top-[50%] h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.48),transparent_70%)] blur-3xl" />
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
      <section className="relative mx-auto max-w-6xl px-4 pb-4 pt-8 sm:px-8 sm:pb-6 sm:pt-12 lg:pb-8 lg:pt-16">
        <div className="section-grid" />

        {/* stacked on mobile, side-by-side on desktop */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:gap-8 lg:text-left">

          {/* ---- LEFT: text ---- */}
          <div className="flex w-full flex-col items-center lg:flex-1 lg:items-start">
            <motion.h1 initial={isMobile ? false : { y: 24 }} animate={isMobile ? {} : { y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <span className="block font-display text-[clamp(1.1rem,4vw,2.2rem)] font-extrabold leading-tight tracking-tight text-white/80">{meta.brand}</span>
                <span className={`block pb-2 font-display text-[clamp(2.8rem,12vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight ${GOLD}`}>iPhone<br />Challenge<sup className="align-super text-[0.28em] font-bold">™</sup></span>
              </motion.h1>

            <motion.p initial={isMobile ? false : { y: 20 }} animate={isMobile ? {} : { y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-white/70 sm:max-w-md sm:text-base">
                Create and post reels about your learning journey with Tutedude and stand a chance to win a Brand New iPhone 17.
              </motion.p>

            <motion.button whileHover={isMobile ? {} : { scale: 1.05, y: -2 }} whileTap={isMobile ? {} : { scale: 0.97 }} className={`mt-6 rounded-full px-6 py-3 text-sm font-bold sm:mt-8 sm:px-10 sm:py-4 sm:text-base ${GOLD_BTN}`}>
                Register Now for Free!
              </motion.button>
          </div>

          {/* ---- RIGHT: iPhone + price badge ---- */}
          <div className="flex flex-col items-center gap-4 lg:shrink-0">
            {/* iPhone — plain div on mobile, floating motion.div on desktop */}
            {(() => {
              const stars = [
                { top: "-14%", left: "78%",  size: 22, delay: 0,    dur: 2.8, color: "#f8e3a6", glow: true  },
                { top: "5%",   left: "-20%", size: 20, delay: 0.7,  dur: 3.0, color: "#edc168", glow: true  },
                { top: "88%",  left: "72%",  size: 18, delay: 1.3,  dur: 2.6, color: "#f8e3a6", glow: true  },
                { top: "-6%",  left: "28%",  size: 13, delay: 0.9,  dur: 2.3, color: "#edc168", glow: false },
                { top: "22%",  left: "94%",  size: 14, delay: 0.3,  dur: 2.7, color: "#f8e3a6", glow: false },
                { top: "38%",  left: "-24%", size: 12, delay: 1.6,  dur: 2.2, color: "#edc168", glow: false },
                { top: "60%",  left: "90%",  size: 13, delay: 0.5,  dur: 2.5, color: "#f8e3a6", glow: false },
                { top: "76%",  left: "-16%", size: 11, delay: 1.1,  dur: 2.4, color: "#edc168", glow: false },
                { top: "12%",  left: "55%",  size: 8,  delay: 1.8,  dur: 1.9, color: "#f8e3a6", glow: false },
                { top: "48%",  left: "-10%", size: 7,  delay: 0.4,  dur: 2.1, color: "#edc168", glow: false },
                { top: "70%",  left: "98%",  size: 8,  delay: 2.0,  dur: 1.8, color: "#f8e3a6", glow: false },
                { top: "-2%",  left: "-6%",  size: 6,  delay: 1.4,  dur: 2.0, color: "#edc168", glow: false },
              ];
              const inner = (
                <>
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10" style={{ transform: "translate(-50%, -50%)", width: "160%", height: "140%", borderRadius: "50%", background: "radial-gradient(ellipse at 50% 50%, rgba(237,193,104,0.55) 0%, rgba(180,60,220,0.22) 45%, transparent 72%)", filter: "blur(36px)" }} />
                  <Image src="/iphone-17-prize.webp" alt="iPhone 17" width={300} height={600} priority fetchPriority="high" className="h-[200px] max-w-[90vw] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] sm:h-[300px] lg:h-[420px]" />
                  <div className="absolute bottom-[10%] left-1/2 w-28 -translate-x-1/2 rounded-xl border-2 border-[#edc168] bg-[#2b0a30] p-2 shadow-[0_0_24px_rgba(237,193,104,0.35)] sm:w-40 sm:-rotate-[5deg] sm:rounded-2xl sm:p-3 lg:w-48">
                    <p className="text-[7px] font-bold uppercase tracking-widest text-[#edc168]/80 sm:text-[9px]">Grand Prize Worth</p>
                    <p className={`mt-0.5 font-display text-lg font-extrabold leading-none sm:text-2xl lg:text-3xl ${GOLD}`}>₹82,900</p>
                    <div className="my-1 h-px bg-[#edc168]/20 sm:my-2" />
                    <p className="text-[8px] font-bold uppercase tracking-wider text-white/55 sm:text-[10px]">🎉 Win for FREE</p>
                  </div>
                  {stars.map((s, i) => (
                    <div key={i} style={{ position: "absolute", top: s.top, left: s.left, pointerEvents: "none" }}>
                      {s.glow && <div style={{ position: "absolute", inset: -s.size, borderRadius: "50%", background: `radial-gradient(circle, ${s.color}55 0%, transparent 70%)`, filter: "blur(8px)" }} />}
                      <svg viewBox="0 0 24 24" className="star-twinkle" style={{ width: s.size, height: s.size, display: "block", "--star-dur": `${s.dur}s`, "--star-delay": `${s.delay}s` } as React.CSSProperties} aria-hidden>
                        <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" fill={s.color} />
                      </svg>
                    </div>
                  ))}
                </>
              );
              return <motion.div animate={isMobile ? {} : { y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }} className="relative isolate">{inner}</motion.div>;
            })()}

          </div>
        </div>

        {/* ── hero stat chips ── */}
        <RevealGroup
          className="relative z-10 mt-6 grid w-full grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4 sm:gap-4 lg:mt-10"
          stagger={0.1}
        >
          {[
            { label: "DURATION",   value: "July 1 – July 31",              Icon: Calendar },
            { label: "PLATFORM",   value: "Instagram Reels",                Icon: Smartphone },
            { label: "EXCLUSIVE",  value: "Exclusive to Tutedude Learners 👥", Icon: Users },
            { label: "GRAND PRIZE",value: "Win an iPhone",                  Icon: Trophy },
          ].map(({ label, value, Icon }) => (
            <RevealItem
              key={label}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#edc168]/30 bg-[#edc168]/10 text-[#edc168] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-[11px] uppercase tracking-wider text-white/60">
                {label}
              </span>
              <span className="-mt-1.5 max-w-[11rem] text-sm font-semibold leading-snug text-white/90">
                {value}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* -------------------------------------------------------- sections --- */}
      <SectionPeopleParticipating />
      <SectionWelcome />
      <SectionHowItWorks />
      <SectionWhoCanJoin />
      <SectionPickYourStyle />
      <SectionPrizes />
      <SectionRules />
      <SectionFAQ />
      <SectionClosingCTA />

      {/* ---------------------------------------------------------- footer --- */}
      <footer className="relative overflow-hidden border-t border-white/5 bg-[#1c0922]/60">
        {/* large watermark text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-8 select-none overflow-hidden"
        >
          <div className="relative">
            <div className="section-grid" />
            <p
              className="whitespace-nowrap text-center font-display font-extrabold leading-none tracking-tight text-white/[0.06]"
              style={{ fontSize: "clamp(3.5rem, 18vw, 18rem)" }}
            >
              Tutedude
            </p>
          </div>
        </div>

        {/* footer brand row */}
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 border-b border-white/[0.06] px-5 pb-10 pt-12 text-center sm:px-8">
          <Image src="/tutedudelogo.png" alt="Tutedude" width={44} height={44} className="opacity-90" />
          <span className="font-display text-xl font-extrabold tracking-tight text-white">Tutedude</span>
          <p className="max-w-xs text-xs text-white/55">Learn · Create · Share · Win — Tutedude iPhone Challenge 2026</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Other Links
            </h4>
            <ul className="space-y-2 text-sm text-white/55">
              {([
                { label: "About Us",        href: "https://tutedude.com/about" },
                { label: "Contact Us",      href: "tel:+917999749959" },
                { label: "Privacy Policy",  href: "https://tutedude.com/privacy" },
                { label: "Terms of Use",    href: "https://tutedude.com/terms-condition" },
              ] as const).map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="transition-colors hover:text-[#edc168]"
                  >
                    {label}
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
                <Phone className="h-4 w-4 text-[#edc168]" />
                <a href="tel:+917999749959" className="transition-colors hover:text-[#edc168]">
                  +91 7999749959
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Registered Office
            </h4>
            <p className="flex items-start gap-2 text-sm leading-relaxed text-white/55">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#edc168]" /> 1st floor, AltF, Orchid Business Park, Central Park II, Sector 48, Gurugram, Haryana 122018
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
