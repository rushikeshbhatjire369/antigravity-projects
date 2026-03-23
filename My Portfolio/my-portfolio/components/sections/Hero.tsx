"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Marquee } from "@/components/ui/Marquee";
import { marqueeItems } from "@/lib/data";
import { useEffect, useState, useMemo } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

function TypewriterHeadline() {
  const lines = useMemo(() => ["BUILDING INFRA", "THAT DOESN'T", "BREAK."], []);
  const [displayedLines, setDisplayedLines] = useState(["", "", ""]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (idle) return;

    if (lineIdx >= lines.length) {
      setIdle(true);
      return;
    }

    const currentStr = lines[lineIdx];
    
    if (charIdx < currentStr.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const next = [...prev];
          next[lineIdx] = currentStr.substring(0, charIdx + 1);
          return next;
        });
        setCharIdx(prev => prev + 1);
      }, 65);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLineIdx(prev => prev + 1);
        setCharIdx(0);
      }, 400); // Wait 400ms after line completes
      return () => clearTimeout(timeout);
    }
  }, [charIdx, lineIdx, idle, lines]);

  // Idle glitch mode
  useEffect(() => {
    if (!idle) return;

    const glitchChars = ['█','▓','▒','░','#','@','%'];
    const glitchInterval = setInterval(() => {
      const targetLine = Math.floor(Math.random() * lines.length);
      const str = lines[targetLine];
      
      const charIndexes = [];
      for(let i=0; i<3; i++) charIndexes.push(Math.floor(Math.random() * str.length));
      
      const glitchedStr = str.split("");
      charIndexes.forEach(idx => glitchedStr[idx] = glitchChars[Math.floor(Math.random()*glitchChars.length)]);
      
      setDisplayedLines(prev => {
        const next = [...prev];
        next[targetLine] = glitchedStr.join("");
        return next;
      });

      setTimeout(() => {
        setDisplayedLines(prev => {
          const next = [...prev];
          next[targetLine] = str;
          return next;
        });
      }, 120);

    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [idle, lines]);

  return (
    <h1 className="font-display font-black text-[clamp(42px,7vw,100px)] leading-[0.9] tracking-tighter flex flex-col items-start">
      <div className="flex w-fit text-[var(--text)]">
        {displayedLines[0]}
        {!idle && lineIdx === 0 && <span className="text-[var(--accent)] animate-pulse w-4 bg-[var(--accent)]">▋</span>}
      </div>
      <div className="flex w-fit text-gradient-cyan">
        {displayedLines[1]}
        {!idle && lineIdx === 1 && <span className="text-[var(--accent)] animate-pulse w-4 bg-[var(--accent)]">▋</span>}
      </div>
      <div className="flex w-fit text-[var(--accent)] glow-text">
        {displayedLines[2]}
        {(idle || lineIdx === 2) && <span className="text-[var(--accent)] animate-pulse w-4 h-[0.8em] mt-[0.1em] ml-2 bg-[var(--accent)] block">▋</span>}
      </div>
    </h1>
  );
}

export function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-transparent grid-bg flex flex-col pt-32 pb-0 overflow-hidden relative z-10">
      <div className="px-6 md:px-16 flex-1 grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 items-center pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-start"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel label="CLOUD & INFRASTRUCTURE ENGINEER // NASHIK, INDIA" className="cursor-blink text-[var(--accent)]" />
          </motion.div>
          
          <motion.div variants={fadeUp} className="mt-2 min-h-[140px] md:min-h-[280px]">
            <TypewriterHeadline />
          </motion.div>

          <motion.p variants={fadeUp} className="font-body text-[var(--text-muted)] text-[16px] md:text-[17px] leading-[1.8] mt-6 max-w-md">
            3+ years managing OpenStack private clouds, Linux systems, and data center operations at production scale.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
            <MagneticButton 
              href="#work" 
              className="animated-border bg-transparent text-[var(--accent)] px-8 py-4 rounded-[4px] font-mono font-bold text-sm tracking-widest uppercase"
            >
              View My Work →
            </MagneticButton>
            <MagneticButton 
              href="/resume.pdf" 
              target="_blank" 
              className="border border-[var(--border-bright)] text-[var(--text-muted)] px-8 py-4 rounded-[4px] font-mono font-bold text-sm tracking-widest uppercase hover:text-[var(--accent-2)] whitespace-nowrap"
            >
              Download Resume
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: { opacity: 0, y: 32 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } }
          }}
          className="w-full flex justify-center p-4 relative"
        >
          <div className="w-full max-w-md aspect-[3/4] lg:aspect-[4/5] lg:-rotate-1 lg:translate-y-4 relative">
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,255,209,0.2)] pointer-events-none z-10" />
            <PlaceholderImage label="[PROFILE PHOTO]" className="w-full h-full border border-[var(--border-bright)] scanlines animated-border opacity-90" />
          </div>
        </motion.div>
      </div>

      <div className="mt-auto pt-0 w-full overflow-hidden border-y border-[rgba(0,255,209,0.08)] bg-[rgba(0,255,209,0.02)] relative z-20">
        <Marquee items={marqueeItems} className="py-4 md:py-6" />
      </div>
    </section>
  );
}
