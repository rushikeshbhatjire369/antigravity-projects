"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion, useTransform } from "framer-motion";

interface StatBlockProps {
  value: number;
  suffix: string;
  label: string;
}

export function StatBlock({ value, suffix, label }: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 100 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <div className="font-display font-extrabold text-5xl md:text-6xl text-accent flex items-baseline">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <span className="font-mono text-xs text-muted tracking-widest uppercase mt-2">{label}</span>
    </div>
  );
}
