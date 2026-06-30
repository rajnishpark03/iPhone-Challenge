import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In · Tutedude iPhone Challenge",
  description: "Sign in to access your Tutedude iPhone Challenge dashboard.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
