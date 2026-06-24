"use client";

/**
 * One calm rocket that drifts forever in slow motion. It eases toward random
 * targets inside the viewport, is clamped to stay fully on screen (it never
 * flies off / disappears), and faces its direction of travel. A single cheap
 * rAF loop (one transform write per frame) — light enough for phones. For
 * reduced-motion users it simply sits still, still visible.
 */

import { useEffect, useRef } from "react";

export default function WanderingRocket() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // On phones the rocket is hidden (CSS) and we skip its rAF loop entirely.
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const margin = 80;
    const SPEED = coarse ? 0.5 : 0.7; // px per frame — slow drift

    const clampX = () => Math.min(w - margin, Math.max(margin, target.x));
    const clampY = () => Math.min(h - margin, Math.max(margin, target.y));

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const pos = { x: rnd(margin, w - margin), y: rnd(margin, h - margin) };
    const target = { x: rnd(margin, w - margin), y: rnd(margin, h - margin) };
    let vx = 0;
    let vy = 0;
    let angle = -90;
    let raf = 0;

    const newTarget = () => {
      target.x = rnd(margin, w - margin);
      target.y = rnd(margin, h - margin);
    };

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      target.x = clampX();
      target.y = clampY();
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) rotate(${angle}deg)`;
    };

    if (reduced) {
      draw();
      return () => window.removeEventListener("resize", onResize);
    }

    const tick = () => {
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist < 36) newTarget();

      // steer velocity toward the target, slowly (smooth, no jerk)
      vx += ((dx / dist) * SPEED - vx) * 0.02;
      vy += ((dy / dist) * SPEED - vy) * 0.02;

      pos.x = Math.min(w - margin, Math.max(margin, pos.x + vx));
      pos.y = Math.min(h - margin, Math.max(margin, pos.y + vy));

      // face direction of travel (nose is "up" in the art → +90°)
      const targetAngle = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
      let diff = targetAngle - angle;
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      angle += diff * 0.06;

      draw();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="wander-rocket pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        ref={ref}
        className="absolute left-0 top-0 will-change-transform"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      >
        {/* soft engine glow */}
        <span className="absolute left-1/2 top-[60%] h-12 w-12 -translate-x-1/2 rounded-full bg-violet-400/30 blur-xl" />
        {/* flame */}
        <span className="wr-flame absolute left-1/2 top-[78%] h-5 w-2.5 -translate-x-1/2" />
        <svg
          viewBox="0 0 40 70"
          className="relative h-[58px] w-[34px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* fins */}
          <path d="M12 44 L4 58 L12 52 Z" fill="#c0392b" />
          <path d="M28 44 L36 58 L28 52 Z" fill="#c0392b" />
          {/* body */}
          <path
            d="M20 4 C28 14 30 28 30 40 L30 50 C30 54 26 56 20 56 C14 56 10 54 10 50 L10 40 C10 28 12 14 20 4 Z"
            fill="#eef2f8"
          />
          {/* nose */}
          <path d="M20 4 C25 10 28 18 29 24 L11 24 C12 18 15 10 20 4 Z" fill="#e0473a" />
          {/* body shade */}
          <path d="M30 40 L30 50 C30 54 26 56 20 56 L20 24 C25 28 29 33 30 40 Z" fill="#000" opacity="0.06" />
          {/* window */}
          <circle cx="20" cy="30" r="5" fill="#2b86d6" stroke="#1b5fa6" strokeWidth="2" />
          {/* engine ring */}
          <rect x="12" y="53" width="16" height="5" rx="2.5" fill="#9aa3b2" />
        </svg>
      </div>

      <style jsx>{`
        .wr-flame {
          background: radial-gradient(
            50% 60% at 50% 20%,
            #fff 0%,
            #ffd56b 35%,
            #ff7a1a 70%,
            transparent 100%
          );
          border-radius: 50% 50% 50% 50% / 30% 30% 70% 70%;
          filter: blur(0.5px);
          animation: wr-flicker 0.18s ease-in-out infinite alternate;
        }
        @keyframes wr-flicker {
          from {
            transform: translateX(-50%) scaleY(0.8);
            opacity: 0.8;
          }
          to {
            transform: translateX(-50%) scaleY(1.15);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wr-flame {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
