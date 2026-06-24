"use client";

import { useSyncExternalStore } from "react";

/** Phone-sized viewport — matches Tailwind's `md` breakpoint (< 768px). */
export const MOBILE_QUERY = "(max-width: 767px)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

// Desktop-first on the server; the real value resolves on the client. Using
// useSyncExternalStore lets React reconcile that switch without a hydration
// warning, so the desktop render is never affected.
function getServerSnapshot() {
  return false;
}

/** Reactive `true` when the viewport is phone-sized (< 768px). */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
