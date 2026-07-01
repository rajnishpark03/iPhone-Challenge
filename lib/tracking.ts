import axios from "axios";
import type { AuthUser } from "./auth";

const MAIN_APP_BASE_URL = process.env.NEXT_PUBLIC_MAIN_APP_BASE_URL || "";

const SOURCE_STORAGE_KEY = "ipc_source";
const SESSION_TRACKED_KEY = "ipc_session_tracked";

// ── Source detection (first-touch only, cached in localStorage) ──
// Rule: if ?utm_source=... is present, use it. Otherwise "direct".
export function detectSource(): string {
  if (typeof window === "undefined") return "direct";

  // Return cached source if already detected
  const cached = localStorage.getItem(SOURCE_STORAGE_KEY);
  if (cached) return cached;

  let src = "direct";
  try {
    const utm = new URLSearchParams(window.location.search).get("utm_source");
    if (utm && utm.trim()) src = utm.trim().toLowerCase();
  } catch {
    src = "direct";
  }

  localStorage.setItem(SOURCE_STORAGE_KEY, src);
  return src;
}

// ── Track a visit (once per session per page) ──
export async function trackVisit(
  user: AuthUser,
  opts: { hasCourses: boolean; page?: "dashboard" | "submit" | "not-enrolled" }
): Promise<void> {
  if (typeof window === "undefined") return;
  if (!MAIN_APP_BASE_URL) return;
  if (!user?.id) return;

  const sessionKey = `${SESSION_TRACKED_KEY}_${user.id}_${opts.page || "root"}`;
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, "1");

  try {
    await axios.post(`${MAIN_APP_BASE_URL}/lms/iphone-challenge/track`, {
      userId: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      hasCourses: opts.hasCourses,
      page: opts.page,
      source: detectSource(),
    });
  } catch {
    // silent — tracking must never break the UI
  }
}

// ── Track a discrete event (uses sendBeacon so it survives navigation) ──
export function trackEvent(user: AuthUser | null, event: string): void {
  if (typeof window === "undefined") return;
  if (!MAIN_APP_BASE_URL) return;
  if (!user?.id) return;

  const url = `${MAIN_APP_BASE_URL}/lms/iphone-challenge/track-event`;
  const payload = JSON.stringify({ userId: user.id, event });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(url, blob);
      return;
    }
  } catch {
    // fall through to axios
  }

  // Fallback (won't always complete before navigation)
  axios.post(url, { userId: user.id, event }).catch(() => {});
}
