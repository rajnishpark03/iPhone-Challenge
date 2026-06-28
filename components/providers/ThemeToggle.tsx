"use client";

import { useEffect, useState, useCallback } from "react";
import { Sun, Moon, MonitorSmartphone } from "lucide-react";
import { m as motion, AnimatePresence } from "framer-motion";

type Mode = "system" | "light" | "dark";
const STORAGE_KEY = "theme-mode";
const order: Mode[] = ["system", "light", "dark"];

const resolve = (mode: Mode): "light" | "dark" => {
  if (mode === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return mode;
};

const apply = (mode: Mode) => {
  document.documentElement.dataset.theme = resolve(mode);
};

/**
 * Theme toggle. Defaults to "system" so the site is automatic out of the box,
 * with an optional manual override (System → Light → Dark) that persists.
 */
export default function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Mode) || "system";
    setMode(stored);
    apply(stored);
    setMounted(true);
  }, []);

  // Follow the OS live while in "system" mode.
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mode]);

  const cycle = useCallback(() => {
    setMode((prev) => {
      const next = order[(order.indexOf(prev) + 1) % order.length];
      localStorage.setItem(STORAGE_KEY, next);
      apply(next);
      return next;
    });
  }, []);

  if (!mounted) {
    return <span className="h-9 w-9" aria-hidden />;
  }

  const Icon =
    mode === "system" ? MonitorSmartphone : mode === "light" ? Sun : Moon;
  const label =
    mode === "system" ? "System theme" : mode === "light" ? "Light" : "Dark";

  return (
    <button
      onClick={cycle}
      data-cursor="hover"
      data-cursor-label={label}
      aria-label={`Theme: ${label}. Click to change.`}
      title={`Theme: ${label}`}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full glass text-fg/80 transition-colors hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          initial={{ y: 14, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.25 }}
        >
          <Icon className="h-4 w-4" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
