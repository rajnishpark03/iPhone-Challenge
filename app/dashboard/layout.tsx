import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard · Tutedude iPhone Challenge",
  description: "Track your progress, submit your reel, and stay updated on the Tutedude iPhone Challenge.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
