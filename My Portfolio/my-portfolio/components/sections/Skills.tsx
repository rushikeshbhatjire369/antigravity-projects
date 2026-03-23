"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillPill } from "@/components/ui/SkillPill";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="bg-bg px-6 py-16 md:px-16 md:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="SKILLS & TOOLS / 04" />
        </motion.div>
        
        <motion.h2 variants={fadeUp} className="font-display font-extrabold text-4xl md:text-5xl text-text mt-2">
          The Stack I Live In.
        </motion.h2>
        
        <motion.p variants={fadeUp} className="font-body text-muted mt-4 text-lg">
          Not a list of buzzwords — tools I use daily in production.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {skills.map((item) => (
            <motion.div
              key={item.category}
              variants={fadeUp}
              className={cn(
                "bg-surface-2 border border-[var(--border)] p-6 md:p-8 rounded-[4px] hover:border-[var(--border-bright)] hover:-translate-y-1 transition-all duration-300",
                item.span
              )}
            >
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-6">
                {item.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.items.map(skill => (
                  <SkillPill key={skill} label={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
