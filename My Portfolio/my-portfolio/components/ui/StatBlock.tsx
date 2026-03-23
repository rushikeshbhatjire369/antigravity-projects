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
      <div className="font-display font-black text-[56px] md:text-[72px] flex items-baseline">
        <motion.span className="text-gradient-cyan">{rounded}</motion.span>
        <span className="text-[var(--accent)] opacity-70 ml-1">{suffix}</span>
      </div>
      <div className="w-12 h-[2px] mt-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]" />
      <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.25em] uppercase mt-2">{label}</span>
    </div>
  );
}
