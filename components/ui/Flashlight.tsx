"use client";

/**
 * A minimal "flashlight" that follows the pointer / touch and lifts local
 * contrast so low-contrast text pops into view. Theme-aware: a soft white glow
 * (screen blend) on dark mode, a soft dark glow (multiply) on light mode. It
 * fades in only while the user is moving a pointer/finger, never blocks input,
 * and is disabled for reduced-motion users (handled in CSS).
 */

import { useEffect, useRef } from "react";

export default function Flashlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Desktop pointers only — skip the rAF/listeners on touch for smoothness.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let hideTimer = 0;

    const show = () => {
      el.style.opacity = "1";
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => (el.style.opacity = "0"), 1600);
    };
    const onMouse = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      show();
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        tx = t.clientX;
        ty = t.clientY;
        show();
      }
    };
    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hideTimer);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flashlight pointer-events-none fixed left-0 top-0 z-[30] h-[320px] w-[320px] rounded-full opacity-0 transition-opacity duration-500"
      aria-hidden
    />
  );
}
