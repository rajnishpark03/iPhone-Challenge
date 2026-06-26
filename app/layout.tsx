import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import MotionProvider from "@/components/providers/MotionProvider";
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

const SITE_TITLE = "Tutedude iPhone Challenge";
const SITE_DESC =
  "Learn. Create. Share. Win. The official Tutedude iPhone Challenge — share your learning journey on Instagram Reels and win an iPhone 17 worth ₹82,900.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s · Tutedude",
  },
  description: SITE_DESC,
  keywords: [
    "Tutedude",
    "iPhone Challenge",
    "iPhone 17",
    "Instagram Reels",
    "30 Day Challenge",
    "Learn AI",
    "Win iPhone",
  ],
  authors: [{ name: "Tutedude" }],
  icons: {
    icon: "/tutedudelogo.png",
    apple: "/tutedudelogo.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: "website",
    siteName: "Tutedude iPhone Challenge",
    images: [{ url: "/tutedudelogo.png", width: 512, height: 512, alt: "Tutedude" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["/tutedudelogo.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070711",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
          <SiteChrome>{children}</SiteChrome>
        </MotionProvider>
      </body>
    </html>
  );
}
