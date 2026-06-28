<div align="center">

<img src="https://raw.githubusercontent.com/rajnishpark03/iPhone-Challenge/main/public/iphone-17-prize.webp" alt="iPhone 17 Prize" width="320" />

# TuteDude iPhone Challenge

**A cinematic web experience built around TuteDude's official challenge handbook.**
Every section is reimagined with animations, 3D, and a dark futuristic UI — the content stays true, the presentation goes all out.

[![Live Site](https://img.shields.io/badge/Live%20Site-tutedude--challenge.vercel.app-black?style=for-the-badge&logo=vercel)](https://tutedude-challenge.vercel.app)

</div>

---

## What this is

I took the TuteDude Creator's Handbook PDF and turned it into an interactive website — not just a document dump, but something that actually feels good to scroll through. Think Apple keynote energy with glassmorphic UI, smooth scroll, and per-section animations.

The content is verbatim from the handbook. The experience is not.

---

## What makes it different

- A floating 3D iPhone + trophy in the hero, built with React Three Fiber — complete with dynamic lighting, sparkle particles, and mouse parallax
- A custom cursor that stretches, glows, changes on hover, and shows ripples on click — because defaults are boring
- Every section has its own animation personality: scroll-triggered timelines, 3D tilt cards, animated scoring bars, spotlight cards, infinite marquees, particle fields
- Lenis smooth scroll hooked into GSAP's ScrollTrigger so everything feels physically correct
- Dark, futuristic design system — glassmorphism, organic gradients, noise texture, animated grid lines

---

## Tech Stack

| | Tool |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion + GSAP + ScrollTrigger |
| Smooth Scroll | Lenis |
| 3D | Three.js / React Three Fiber |
| Icons | Lucide + React Icons |

---

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`

---

## Project structure

```
app/
  layout.tsx        # global chrome: cursor, nav, aurora, SEO
  page.tsx          # all handbook sections assembled in order
  globals.css       # design tokens, glass utilities, cursor styles

components/
  providers/        # Lenis smooth-scroll setup
  cursor/           # custom cursor (blob + dot + behaviors)
  three/            # React Three Fiber hero scene
  ui/               # reusable animation primitives
  sections/         # one component per handbook section

lib/
  content.ts        # all handbook copy, verbatim from the PDF
  gsap.ts           # GSAP + ScrollTrigger init
  utils.ts          # cn(), lerp(), clamp()
```

---

## Content

Everything — titles, rules, prize breakdown, scoring rubric, FAQs, timeline — lives in `lib/content.ts`, copied directly from the official PDF. Nothing rewritten, nothing summarized.

---

## Accessibility

`prefers-reduced-motion` is respected everywhere — animations degrade to static states, smooth scroll turns off, particles pause. The custom cursor is automatically replaced with the native cursor on touch/coarse-pointer devices.

---

<div align="center">

Built for the **#30DayTuteDudeChallenge**

</div>
