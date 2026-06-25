import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/providers/SmoothScroll";
import MotionProvider from "@/components/providers/MotionProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import SiteChrome from "@/components/SiteChrome";

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
      data-theme="dark"
      className={`${inter.variable} ${sora.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-canvas text-foreground antialiased">
        <MotionProvider>
          <CustomCursor />
          <SmoothScroll>
            <SiteChrome>{children}</SiteChrome>
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
