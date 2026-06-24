"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Mode = "chars" | "words";

/**
 * GSAP-powered split-text reveal. Splits into words (and optionally chars),
 * then staggers them in on scroll with a blur + rise.
 */
export default function SplitText({
  text,
  className,
  mode = "words",
  stagger = 0.045,
  delay = 0,
  y = 40,
  blur = true,
  trigger = true,
}: {
  text: string;
  className?: string;
  mode?: Mode;
  stagger?: number;
  delay?: number;
  y?: number;
  blur?: boolean;
  trigger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches;

    const targets = el.querySelectorAll<HTMLElement>(".anim-piece");
    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, {
        opacity: 0,
        y,
        filter: blur ? "blur(10px)" : "blur(0px)",
        rotateX: 30,
      });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger,
        delay,
        scrollTrigger: trigger
          ? {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          : undefined,
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [text, stagger, delay, y, blur, mode, trigger]);

  const pieces =
    mode === "words" ? text.split(/(\s+)/) : Array.from(text);

  return (
    <div ref={ref} className={cn("perspective-1000", className)}>
      {pieces.map((piece, i) => {
        if (/^\s+$/.test(piece)) return <span key={i}> </span>;
        return (
          <span
            key={i}
            className="anim-piece inline-block will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {piece}
            {mode === "words" ? " " : ""}
          </span>
        );
      })}
    </div>
  );
}
