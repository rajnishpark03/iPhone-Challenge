import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · iPhone Challenge Analytics",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#0f0716] text-white">{children}</div>;
}
