"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth-scroll wired into GSAP's ticker so ScrollTrigger and Lenis
 * share a single rAF loop and never fight each other.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // On touch devices, native momentum scrolling is far smoother than a JS
    // smooth-scroll loop. Skip Lenis there (ScrollTrigger still works on the
    // native scroll) so phones/tablets feel buttery.
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || coarsePointer) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Expose for anchor navigation
    // @ts-expect-error attach to window for nav scroll-to
    window.__lenis = lenis;

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      // @ts-expect-error cleanup
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}

/** Programmatic scroll used by the navigation + dock. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  // @ts-expect-error global lenis instance
  const lenis = window.__lenis as
    | { scrollTo: (t: Element, o?: object) => void }
    | undefined;
  if (lenis) {
    lenis.scrollTo(el, { offset: -10, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
