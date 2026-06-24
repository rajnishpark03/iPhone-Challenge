import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/cursor/CustomCursor";
import AuroraBackground from "@/components/ui/AuroraBackground";
import SpaceBackground from "@/components/ui/SpaceBackground";
import PlanetBackground from "@/components/three/PlanetBackground";
import IntroLoader from "@/components/ui/IntroLoader";
import Flashlight from "@/components/ui/Flashlight";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/sections/Navbar";
import Dock from "@/components/sections/Dock";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});
const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_TITLE = "Creator's Handbook — Tutedude iPhone Challenge";
const SITE_DESC =
  "Learn. Create. Share. Win. The official Tutedude Creator's Handbook for the #30DayTutedudeChallenge — reimagined as an immersive, award-grade experience.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s · Tutedude",
  },
  description: SITE_DESC,
  keywords: [
    "Tutedude",
    "Creator Handbook",
    "iPhone Challenge",
    "Instagram Reels",
    "30 Day Challenge",
    "Learn AI",
  ],
  authors: [{ name: "Tutedude" }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: "website",
    siteName: "Tutedude Creator's Handbook",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070711",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Resolve theme before first paint to avoid a flash.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('theme-mode')||'system';var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=(m==='system'?(d?'dark':'light'):m);}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-canvas text-foreground antialiased">
        <AuroraBackground />
        <SpaceBackground />
        <PlanetBackground />
        <div className="noise-overlay" />
        <IntroLoader />
        <Flashlight />
        <ScrollProgress />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Dock />
        </SmoothScroll>
      </body>
    </html>
  );
}
