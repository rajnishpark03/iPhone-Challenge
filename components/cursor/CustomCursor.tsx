"use client";

import { useEffect, useRef } from "react";
import { lerp } from "@/lib/utils";

/**
 * Image cursor — the Tutedude "hand holding the challenge phone" graphic
 * follows the pointer, with a small precise dot at the exact click point.
 *
 * The cursor elements are ALWAYS rendered (never gated behind state) so their
 * refs are valid the moment the effect runs; the effect just activates them.
 *
 * Opt-in per element via data attributes:
 *   data-cursor="hover" | "view"
 *   data-cursor-label="Explore"
 */

// Where the pointer "tip" sits inside the hand image (ratio of its size).
const HOTSPOT_X = 0.22;
const HOTSPOT_Y = 0.1;
const CURSOR_W = 60; // px

export default function CustomCursor() {
  const handRef = useRef<HTMLImageElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable where there is a real pointer (keep native cursor on touch).
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!fine) return;

    const hand = handRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!hand || !dot || !label) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.body.classList.add("has-custom-cursor");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    let vx = 0;
    let raf = 0;

    const state = {
      hovering: false,
      mode: "default" as "default" | "view",
      labelText: "",
      down: false,
    };

    // Show immediately, centered, so a cursor is visible before the first move.
    hand.style.opacity = "1";
    dot.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, select, [role='button']"
      );
      if (target) {
        state.hovering = true;
        state.mode =
          (target.getAttribute("data-cursor") as typeof state.mode) ||
          "default";
        state.labelText = target.getAttribute("data-cursor-label") || "";
      } else {
        state.hovering = false;
        state.mode = "default";
        state.labelText = "";
      }
    };

    const onDown = () => {
      state.down = true;
      spawnRipple(mouse.x, mouse.y);
    };
    const onUp = () => (state.down = false);

    const onEnter = () => {
      hand.style.opacity = "1";
      dot.style.opacity = "1";
    };
    const onLeave = () => {
      hand.style.opacity = "0";
      dot.style.opacity = "0";
      label.style.opacity = "0";
    };

    const spawnRipple = (x: number, y: number) => {
      const r = document.createElement("div");
      r.className = "cursor-ripple";
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      document.body.appendChild(r);
      r.addEventListener("animationend", () => r.remove());
    };

    const follow = reduced ? 1 : 0.22;
    const hotX = CURSOR_W * HOTSPOT_X;
    const hotY = CURSOR_W * HOTSPOT_Y;

    const render = () => {
      const prevX = pos.x;
      pos.x = lerp(pos.x, mouse.x, follow);
      pos.y = lerp(pos.y, mouse.y, follow);
      vx = pos.x - prevX;

      const tilt = reduced ? 0 : Math.max(-14, Math.min(14, vx * 1.1));

      let scale = state.mode === "view" ? 1.22 : state.hovering ? 1.12 : 1;
      if (state.down) scale *= 0.9;

      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${state.down ? 0.7 : 1})`;
      hand.style.transform = `translate3d(${pos.x - hotX}px, ${pos.y - hotY}px, 0) rotate(${tilt}deg) scale(${scale})`;

      if (state.labelText) {
        label.textContent = state.labelText;
        label.style.transform = `translate3d(${pos.x}px, ${pos.y + 44}px, 0) translate(-50%, 0) scale(1)`;
        label.style.opacity = "1";
      } else {
        label.style.opacity = "0";
        label.style.transform = `translate3d(${pos.x}px, ${pos.y + 44}px, 0) translate(-50%, 0) scale(0.7)`;
      }

      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      {/* Hand-holding-phone image cursor */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={handRef}
        src="/cursor-hand.svg"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 drop-shadow-[0_6px_10px_rgba(0,0,0,0.4)]"
        style={{ width: CURSOR_W, height: "auto", willChange: "transform" }}
      />
      {/* Crisp dot at the exact pointer position */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 rounded-full opacity-0"
        style={{
          backgroundColor: "rgb(var(--cursor-dot))",
          boxShadow: "0 0 0 1px var(--cursor-contrast)",
          willChange: "transform",
        }}
      />
      {/* Contextual label (data-cursor-label) */}
      <div
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold opacity-0 transition-opacity"
        style={{
          backgroundColor: "rgb(var(--cursor-ring))",
          color: "var(--bg)",
          willChange: "transform",
        }}
      />
      <style jsx global>{`
        .cursor-ripple {
          position: fixed;
          width: 12px;
          height: 12px;
          border-radius: 999px;
          border: 1.5px solid rgb(var(--cursor-ring) / 0.9);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9998;
          animation: cursor-ripple 0.7s ease-out forwards;
        }
        @keyframes cursor-ripple {
          0% {
            opacity: 0.8;
            width: 12px;
            height: 12px;
          }
          100% {
            opacity: 0;
            width: 90px;
            height: 90px;
          }
        }
      `}</style>
    </>
  );
}
