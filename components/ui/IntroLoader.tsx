"use client";

/**
 * Cinematic intro loader.
 *
 * A small rocket ignites at the bottom and launches straight up, trailing
 * smoke. As it climbs, the dark sky panel "unzips" upward (clip-path) so the
 * landing page is revealed from the bottom up — simultaneously with the rising
 * smoke. Deliberately a little slow (~3.2s). Scroll is locked during the
 * sequence and the whole thing is skipped for reduced-motion users.
 */

import { useEffect, useState } from "react";

const DURATION = 3200;

export default function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShow(false);
      return;
    }
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const t = window.setTimeout(() => setShow(false), DURATION);
    return () => {
      window.clearTimeout(t);
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  // restore scroll the instant we unmount the panel
  useEffect(() => {
    if (!show) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="intro" aria-hidden>
      {/* brand mark that fades as the rocket launches */}
      <div className="intro-brand">
        <span className="intro-brand-name">Tutedude</span>
        <span className="intro-brand-sub">Preparing for launch…</span>
      </div>

      {/* the launching rocket + its exhaust */}
      <div className="intro-rocket">
        <span className="intro-trail" />
        <span className="intro-puff intro-puff1" />
        <span className="intro-puff intro-puff2" />
        <span className="intro-puff intro-puff3" />
        <span className="intro-flame" />
        <svg viewBox="0 0 60 96" className="intro-ship" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 60 L8 78 L18 72 Z" fill="#c0392b" />
          <path d="M42 60 L52 78 L42 72 Z" fill="#c0392b" />
          <path
            d="M30 4 C42 16 44 34 44 50 L44 66 C44 70 40 73 30 73 C20 73 16 70 16 66 L16 50 C16 34 18 16 30 4 Z"
            fill="#e9edf5"
          />
          <path d="M30 4 C36 11 40 20 41 28 L19 28 C20 20 24 11 30 4 Z" fill="#e0473a" />
          <circle cx="30" cy="38" r="7" fill="#2b86d6" stroke="#1b5fa6" strokeWidth="2.5" />
          <rect x="18" y="69" width="24" height="6" rx="3" fill="#9aa3b2" />
        </svg>
      </div>

      <style jsx>{`
        .intro {
          position: fixed;
          inset: 0;
          z-index: 200;
          overflow: hidden;
          background: radial-gradient(
              130% 120% at 50% 8%,
              #1a1442 0%,
              #0a0a1c 46%,
              #05050f 100%
            );
          clip-path: inset(0 0 0 0);
          animation: intro-reveal ${DURATION}ms cubic-bezier(0.7, 0, 0.84, 0) forwards;
        }

        /* page reveals from the bottom up, tracking the rocket */
        @keyframes intro-reveal {
          0%,
          14% {
            clip-path: inset(0 0 0 0);
          }
          100% {
            clip-path: inset(0 0 100% 0);
          }
        }

        .intro-brand {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-align: center;
          animation: intro-brand-out 1.4s ease forwards;
        }
        .intro-brand-name {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 800;
          font-size: clamp(1.6rem, 5vw, 2.6rem);
          letter-spacing: -0.02em;
          background: linear-gradient(120deg, #b7a4ff 0%, #6d4df2 60%, #8b6ef5 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .intro-brand-sub {
          font-size: 0.8rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(236, 236, 247, 0.55);
        }
        @keyframes intro-brand-out {
          0%,
          30% {
            opacity: 0;
            transform: translateX(-50%) translateY(8px);
          }
          55% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
        }

        .intro-rocket {
          position: absolute;
          left: 50%;
          bottom: 9%;
          width: 34px;
          height: 54px;
          transform: translate(-50%, 0);
          animation: intro-launch ${DURATION}ms cubic-bezier(0.55, 0, 0.85, 0.2) forwards;
        }
        .intro-ship {
          position: absolute;
          inset: 0;
          width: 34px;
          height: 54px;
          filter: drop-shadow(0 0 12px rgba(183, 164, 255, 0.5));
        }
        @keyframes intro-launch {
          0% {
            transform: translate(-50%, 40px);
            opacity: 0;
          }
          10% {
            transform: translate(-50%, 0);
            opacity: 1;
          }
          16% {
            transform: translate(-50%, 0);
          }
          100% {
            transform: translate(-50%, -118vh) scale(0.7);
            opacity: 1;
          }
        }

        /* exhaust flame just under the engine */
        .intro-flame {
          position: absolute;
          top: 50px;
          left: 50%;
          width: 12px;
          height: 22px;
          transform: translateX(-50%);
          background: radial-gradient(
            50% 60% at 50% 25%,
            #fff 0%,
            #ffd56b 35%,
            #ff7a1a 70%,
            transparent 100%
          );
          border-radius: 50% 50% 50% 50% / 30% 30% 70% 70%;
          filter: blur(0.5px);
          animation: intro-flicker 0.16s ease-in-out infinite alternate;
        }
        @keyframes intro-flicker {
          from {
            transform: translateX(-50%) scaleY(0.8);
            opacity: 0.85;
          }
          to {
            transform: translateX(-50%) scaleY(1.2);
            opacity: 1;
          }
        }

        /* tapering smoke column beneath the rocket */
        .intro-trail {
          position: absolute;
          top: 56px;
          left: 50%;
          width: 26px;
          height: 60vh;
          transform: translateX(-50%);
          transform-origin: top center;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.5),
            rgba(208, 205, 230, 0.22) 30%,
            rgba(180, 180, 210, 0.08) 60%,
            transparent 100%
          );
          border-radius: 50%;
          filter: blur(10px);
          animation: intro-trail 3.2s ease-in forwards;
        }
        @keyframes intro-trail {
          0%,
          14% {
            opacity: 0;
            transform: translateX(-50%) scaleY(0.1);
          }
          30% {
            opacity: 0.9;
          }
          100% {
            opacity: 0.7;
            transform: translateX(-50%) scaleY(1.3);
          }
        }

        .intro-puff {
          position: absolute;
          left: 50%;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.5),
            rgba(210, 210, 230, 0)
          );
          filter: blur(3px);
          transform: translateX(-50%);
          opacity: 0;
        }
        .intro-puff1 {
          top: 70px;
          animation: intro-puff 1.6s ease-out 0.3s infinite;
        }
        .intro-puff2 {
          top: 110px;
          animation: intro-puff 1.6s ease-out 0.7s infinite;
        }
        .intro-puff3 {
          top: 150px;
          animation: intro-puff 1.6s ease-out 1.1s infinite;
        }
        @keyframes intro-puff {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.5);
          }
          30% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) scale(1.9);
          }
        }
      `}</style>
    </div>
  );
}
