import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
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
  weight: ["800"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tutedude-iphone-challenge.pages.dev";

const SITE_TITLE = "Win iPhone 17 – Tutedude Instagram Reel Challenge 2026";
const SITE_DESC =
  "Join the Tutedude iPhone Challenge — create Instagram Reels about your learning journey and win an iPhone 17 worth ₹82,900. Free to enter. Open to all TuteDude students. Post July 1–31, 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Tutedude iPhone Challenge",
  },
  description: SITE_DESC,
  keywords: [
    "Tutedude iPhone Challenge",
    "Instagram Reel Challenge India",
    "Win iPhone 17 India",
    "Instagram Challenge Win Prize",
    "TutedudeiPhoneChallenge",
    "Instagram Learning Challenge",
    "Win iPhone Instagram India 2026",
    "Tutedude Contest",
    "Create Reels Win iPhone",
    "Student Instagram Challenge India",
    "Free iPhone Contest India",
    "Tutedude",
    "Instagram Reels Competition",
  ],
  authors: [{ name: "Tutedude", url: "https://tutedude.com" }],
  creator: "Tutedude",
  publisher: "Tutedude",
  alternates: { canonical: "/" },
  icons: {
    icon: "/tutedudelogo.png",
    apple: "/tutedudelogo.png",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: "website",
    url: "/",
    siteName: "Tutedude iPhone Challenge",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tutedude iPhone Challenge – Win iPhone 17 worth ₹82,900",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    creator: "@tutedude",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#2B0A30",
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
      className={`${inter.variable} ${sora.variable}`}
    >
      <head />
      <body className="min-h-screen bg-canvas text-foreground antialiased">
        <MotionProvider>
          <SiteChrome>{children}</SiteChrome>
        </MotionProvider>
      </body>
    </html>
  );
}
