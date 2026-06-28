"use client";

import { useState } from "react";
import { m as motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useIsMobile } from "@/lib/useIsMobile";
import { GOLD, CARD } from "@/lib/tokens";

interface FAQItem {
  q: string;
  a: string;
  detail: string;
}

const items: FAQItem[] = [
  {
    q: "What kind of reels can I create?",
    a: "ANY FORMAT",
    detail:
      "Anything that showcases your TuteDude learning journey — projects, tips, progress updates, tutorials, AI videos, or relatable learning content.",
  },
  {
    q: "Can I use AI to create my reels?",
    a: "YES",
    detail:
      "AI-generated videos, avatars, voiceovers, and creative AI tools are allowed, as long as the content is original.",
  },
  {
    q: "Do I need to show my face?",
    a: "NO",
    detail:
      "Videos showing face are encouraged but not compulsory. Faceless videos, screen recordings, voiceovers, and AI-generated content are all accepted.",
  },
  {
    q: "Do I need professional equipment?",
    a: "NO",
    detail: "Not at all. A smartphone and your creativity are all you need.",
  },
  {
    q: "How will the winner be selected?",
    a: "BY QUALITY",
    detail:
      "Winners will be chosen based on creativity, content quality, relevance to the challenge, and overall performance of the reel.",
  },
  {
    q: "Can I use trending music?",
    a: "YES",
    detail: "Yes, but make sure the audio is safe to use on Instagram.",
  },
  {
    q: "What happens after I submit my reel?",
    a: "REVIEWED",
    detail:
      "Once submitted through your dashboard, your reel will be reviewed and considered for the challenge.",
  },
  {
    q: "What can lead to disqualification?",
    a: "IMPORTANT",
    detail:
      "Copied content, fake engagement, misleading claims, offensive content, or failure to follow the challenge guidelines may result in disqualification.",
  },
  {
    q: "Can I participate if my account has very few followers?",
    a: "YES",
    detail: "Absolutely. Your creativity matters far more than your follower count.",
  },
  {
    q: "What to do if my account is private?",
    a: "GO PUBLIC",
    detail:
      "Your account needs to be public for your entry to be considered. You can either make your account public or create a new profile.",
  },
  {
    q: "Can I post more than 1 reel?",
    a: "YES",
    detail:
      "Of course! The more the merrier. Post multiple reels throughout the challenge. Make sure you submit each one on the dashboard — your most recent submission will be reviewed by our team.",
  },
];

export default function SectionFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const isMobile = useIsMobile();

  return (
    <section className="relative mx-auto max-w-3xl px-5 py-6 sm:px-8 sm:py-16">
      <div className="section-grid" />
      <Reveal direction="up">
        <h2 className="text-center font-display text-[clamp(1.9rem,4.5vw,3rem)] font-extrabold tracking-tight">
          Frequently{" "}
          <span className={GOLD}>asked.</span>
        </h2>
      </Reveal>

      <div className="mt-6 space-y-2 sm:mt-10 sm:space-y-3">
        {items.map((item, i) => {
          const isOpen = open === i;
          const hasBadge = item.a !== "";
          const isYes = item.a === "YES";
          const isNo = item.a === "NO";

          return (
            <Reveal key={item.q} direction="up" delay={i * 0.04}>
              <div className={`${CARD} overflow-hidden`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-base font-semibold sm:text-lg">{item.q}</span>
                  <div className="flex items-center gap-3">
                    {hasBadge && (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          isYes
                            ? "bg-emerald-500 text-white"
                            : isNo
                            ? "bg-rose-500 text-white"
                            : "bg-[#edc168]/20 text-[#edc168] border border-[#edc168]/30"
                        }`}
                      >
                        {item.a}
                      </span>
                    )}
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors sm:h-8 sm:w-8 ${
                        isOpen ? "bg-[#edc168] text-[#3a0f33]" : "bg-white/10 text-white"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                </button>

                {isMobile ? (
                  isOpen && (
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 text-sm leading-relaxed text-white/65 sm:px-6 sm:pb-6">{item.detail}</p>
                    </div>
                  )
                ) : (
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-white/65">{item.detail}</p>
                  </motion.div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal direction="up" className="mt-8 text-center">
        <p className="text-sm text-white/55">
          Still stuck? Drop your question in the Tutedude community — we reply fast.
        </p>
      </Reveal>
    </section>
  );
}
