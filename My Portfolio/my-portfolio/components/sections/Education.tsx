"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { education } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="bg-transparent grid-bg px-6 py-16 md:px-16 md:py-32 relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="max-w-5xl relative z-10"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="EDUCATION / 07" className="section-line" />
        </motion.div>
        
        <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-[var(--text)] mt-2">
          Academic Foundation.
        </motion.h2>

        <div className="flex flex-col mt-16">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center border-b border-[var(--border)] py-10 hover:bg-[rgba(0,255,209,0.03)] transition-colors duration-200 px-6 -mx-6 rounded-[2px] group"
            >
              <div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--text)] leading-snug group-hover:text-white transition-colors duration-200">
                  {edu.degree}
                </h3>
                <div className="font-mono text-sm md:text-base text-[var(--text-muted)] tracking-[0.15em] mt-3 uppercase">
                  {edu.institution}
                </div>
              </div>
              
              <div className="md:text-right mt-2 md:mt-0 flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2">
                <div className="font-mono text-sm text-[var(--text-dim)] uppercase tracking-widest">
                  {edu.period}
                </div>
                <div className="font-display font-black text-xl md:text-2xl text-[var(--accent)] glow-text tracking-wider">
                  {edu.score}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
