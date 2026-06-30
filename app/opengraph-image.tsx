import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt ="Tutedude iPhone Challenge – Win iPhone 17 worth ₹82,900";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2b0a30 0%, #3d1040 45%, #1c0922 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* background glow blobs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(206,46,160,0.45) 0%, transparent 70%)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)", display: "flex" }} />

        {/* badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(237,193,104,0.15)", border: "1px solid rgba(237,193,104,0.4)", borderRadius: 40, padding: "10px 28px", marginBottom: 24 }}>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "#edc168" }}>
            July 1 – 31, 2026
          </span>
        </div>

        {/* headline */}
        <div style={{ fontSize: 68, fontWeight: 900, textAlign: "center", lineHeight: 1.05, letterSpacing: -2, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ color: "#ffffff" }}>Win an </span>
          <span style={{ background: "linear-gradient(90deg, #f8e3a6, #edc168, #d99a2b)", backgroundClip: "text", color: "transparent" }}>
            iPhone 17
          </span>
        </div>

        {/* sub */}
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.65)", marginTop: 20, textAlign: "center", maxWidth: 700, lineHeight: 1.45, display: "flex" }}>
          Create Instagram Reels about your learning journey with TuteDude
        </div>

        {/* prize chip */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36, background: "rgba(237,193,104,0.12)", border: "1.5px solid rgba(237,193,104,0.35)", borderRadius: 16, padding: "14px 32px" }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#edc168" }}>Prize Worth ₹82,900 · Free to Enter</span>
        </div>

        {/* brand */}
        <div style={{ position: "absolute", bottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>
            #TutedudeiPhoneChallenge
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
