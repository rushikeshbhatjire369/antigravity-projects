"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { education } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="bg-bg px-6 py-16 md:px-16 md:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="max-w-4xl"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="EDUCATION / 07" />
        </motion.div>
        
        <motion.h2 variants={fadeUp} className="font-display font-extrabold text-4xl md:text-5xl text-text mt-2">
          Academic Foundation.
        </motion.h2>

        <div className="flex flex-col mt-16">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end border-b border-[var(--border)] py-8 hover:bg-surface/30 transition-colors duration-200 px-4 -mx-4 rounded-[4px]"
            >
              <div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-text leading-tight">
                  {edu.degree}
                </h3>
                <div className="font-mono text-xs text-muted tracking-widest mt-2 uppercase">
                  {edu.institution}
                </div>
              </div>
              
              <div className="md:text-right mt-2 md:mt-0">
                <div className="font-mono text-xs text-muted tracking-widest uppercase">
                  {edu.period}
                </div>
                <div className="font-mono text-sm text-accent font-bold mt-2">
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
