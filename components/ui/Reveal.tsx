"use client";

import React, { useRef } from "react";
import { m as motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/useIsMobile";

type Direction = "up" | "down" | "left" | "right" | "blur" | "scale";

const buildVariants = (dir: Direction, distance: number): Variants => {
  const hidden: Record<string, number | string> = { opacity: 0 };
  switch (dir) {
    case "up":    hidden.y = distance;           break;
    case "down":  hidden.y = -distance;          break;
    case "left":  hidden.x = distance;           break;
    case "right": hidden.x = -distance;          break;
    case "scale": hidden.scale = 0.86;           break;
    case "blur":
      hidden.filter = "blur(14px)";
      hidden.y = distance * 0.5;
      break;
  }
  return {
    hidden,
    show: {
      opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };
};

export function Reveal({
  children, className, direction = "up", distance = 40,
  delay = 0, once = true, as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  delay?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
}) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });
  // Track if this element has ever been in view so switching viewport never hides it
  const wasInView = useRef(false);
  if (inView) wasInView.current = true;

  const MotionTag = motion[as] as typeof motion.div;
  const variants = buildVariants(direction, distance);
  const visible = isMobile || inView || wasInView.current;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(className)}
      variants={variants}
      initial={isMobile ? false : "hidden"}
      animate={visible ? "show" : "hidden"}
      transition={{ delay: isMobile ? 0 : delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children, className, stagger = 0.08, once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const wasInView = useRef(false);
  if (inView) wasInView.current = true;

  const visible = isMobile || inView || wasInView.current;

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={isMobile ? false : "hidden"}
      animate={visible ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children, className, direction = "up", distance = 32,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
}) {
  return (
    <motion.div className={cn(className)} variants={buildVariants(direction, distance)}>
      {children}
    </motion.div>
  );
}
