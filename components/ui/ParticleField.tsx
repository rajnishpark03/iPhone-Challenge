"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas particle field with subtle parallax toward the cursor.
 * GPU-friendly: a single canvas, capped particle count, paused when offscreen.
 */
export default function ParticleField({
  density = 60,
  className,
  color = "124,92,252",
  interactive = true,
}: {
  density?: number;
  className?: string;
  color?: string;
  interactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Phones get a single static frame — no rAF loop.
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: P[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent ? parent.clientWidth : window.innerWidth;
      h = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(density, Math.floor((w * h) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 0.4,
        a: Math.random() * 0.5 + 0.15,
      }));
    };

    let raf = 0;
    let running = true;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (interactive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            p.x += (dx / dist) * 0.6;
            p.y += (dy / dist) * 0.6;
          }
        }

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.a})`;
        ctx.fill();

        // link nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 96) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${color},${0.05 * (1 - d / 96)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      if (running) raf = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !prefersReduced;
        if (running) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );

    resize();
    io.observe(canvas);
    // ResizeObserver tracks the parent even when no window 'resize' fires
    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);
    if (interactive) window.addEventListener("mousemove", onMouse, { passive: true });
    if (!prefersReduced) raf = requestAnimationFrame(draw);
    else draw();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [density, color, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden
    />
  );
}
