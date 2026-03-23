"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Marquee } from "@/components/ui/Marquee";
import { marqueeItems } from "@/lib/data";

export function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-bg flex flex-col pt-32 pb-0 overflow-hidden">
      <div className="px-6 md:px-16 flex-1 grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 items-center pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-start"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel label="CLOUD & INFRASTRUCTURE ENGINEER // NASHIK, INDIA" />
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="font-display font-extrabold text-[clamp(40px,10vw,120px)] md:text-[clamp(56px,8vw,120px)] text-text leading-[0.9] tracking-tight mt-2">
            BUILDING INFRA<br/>THAT DOESN&apos;T<br/>BREAK.
          </motion.h1>

          <motion.p variants={fadeUp} className="font-body text-muted text-lg leading-relaxed mt-6 max-w-md">
            3+ years managing OpenStack private clouds, Linux systems, and data center operations at production scale.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
            <a href="#work" className="bg-accent text-white px-8 py-4 rounded-[4px] font-mono text-sm tracking-widest uppercase hover:bg-accent-glow transition-colors duration-200">
              View My Work →
            </a>
            <a href="/resume.pdf" target="_blank" className="border border-[var(--border-bright)] text-text px-8 py-4 rounded-[4px] font-mono text-sm tracking-widest uppercase hover:border-text transition-colors duration-200 whitespace-nowrap">
              Download Resume
            </a>
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
          className="w-full flex justify-center"
        >
          <PlaceholderImage label="[PROFILE PHOTO]" className="w-full max-w-md aspect-[3/4] lg:aspect-[4/5] lg:-rotate-1 lg:translate-y-4" />
        </motion.div>
      </div>

      <div className="border-t border-[var(--border)] mt-auto pt-0 w-full overflow-hidden">
        <Marquee items={marqueeItems} className="border-y-0 bg-transparent py-4 md:py-6" />
      </div>
    </section>
  );
}
