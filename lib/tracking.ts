import axios from "axios";
import type { AuthUser } from "./auth";

const MAIN_APP_BASE_URL = process.env.NEXT_PUBLIC_MAIN_APP_BASE_URL || "";

const SOURCE_STORAGE_KEY = "ipc_source";
const SESSION_TRACKED_KEY = "ipc_session_tracked";

// ── Source detection ──
// Priority: 1) URL ?utm_source=...  2) localStorage cache  3) "direct"
// URL always wins so a fresh campaign link overrides an older cached value.
// Whenever we find utm_source in the URL, we (re)write it to localStorage
// so subsequent navigations (which lose the query string) still know the source.
export function detectSource(): string {
  if (typeof window === "undefined") return "direct";

  // 1) URL takes priority
  try {
    const utm = new URLSearchParams(window.location.search).get("utm_source");
    if (utm && utm.trim()) {
      const src = utm.trim().toLowerCase();
      localStorage.setItem(SOURCE_STORAGE_KEY, src);
      return src;
    }
  } catch {
    // ignore and fall through
  }

  // 2) localStorage fallback (from a previous visit in this browser)
  const cached = localStorage.getItem(SOURCE_STORAGE_KEY);
  if (cached) return cached;

  // 3) Default
  return "direct";
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

// ── "I'm Participating" registration (explicit opt-in) ──
export async function registerParticipation(
  user: AuthUser
): Promise<{ ok: boolean; error?: string }> {
  if (!MAIN_APP_BASE_URL) return { ok: false, error: "API not configured" };
  if (!user?.id) return { ok: false, error: "Not logged in" };

  try {
    await axios.post(
      `${MAIN_APP_BASE_URL}/lms/iphone-challenge/register-participation`,
      { userId: user.id }
    );
    return { ok: true };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        ok: false,
        error: err.response?.data?.message || err.message || "Failed",
      };
    }
    return { ok: false, error: "Failed" };
  }
}

export async function fetchParticipationStatus(
  user: AuthUser
): Promise<{ registered: boolean; hasSubmitted: boolean } | null> {
  if (!MAIN_APP_BASE_URL || !user?.id) return null;
  try {
    const res = await axios.get(
      `${MAIN_APP_BASE_URL}/lms/iphone-challenge/participation-status/${user.id}`
    );
    return {
      registered: !!res.data?.registered,
      hasSubmitted: !!res.data?.hasSubmitted,
    };
  } catch {
    return null;
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
