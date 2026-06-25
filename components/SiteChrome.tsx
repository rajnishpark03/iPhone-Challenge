"use client";

import { usePathname } from "next/navigation";
import AuroraBackground from "@/components/ui/AuroraBackground";
import SpaceBackground from "@/components/ui/SpaceBackground";
import PlanetBackground from "@/components/three/PlanetBackground";
import WanderingRocket from "@/components/ui/WanderingRocket";
import IntroLoader from "@/components/ui/IntroLoader";
import Navbar from "@/components/sections/Navbar";
import Dock from "@/components/sections/Dock";

/**
 * Renders the global space-themed chrome (backgrounds, rocket, intro loader,
 * navbar, dock) around the page — EXCEPT on standalone routes like
 * `/buildathon`, which bring their own theme and chrome. Those get a bare
 * <main> so the space decorations never bleed through.
 */
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const standalone = pathname?.startsWith("/buildathon");

  if (standalone) {
    return <main className="relative z-10">{children}</main>;
  }

  return (
    <>
      <AuroraBackground />
      <SpaceBackground />
      <PlanetBackground />
      <WanderingRocket />
      <IntroLoader />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Dock />
    </>
  );
}
