"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillPill } from "@/components/ui/SkillPill";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="bg-surface px-6 py-16 md:px-16 md:py-32 overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="max-w-5xl"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="WORK HISTORY / 03" />
        </motion.div>
        <motion.h2 variants={fadeUp} className="font-display font-extrabold text-4xl md:text-5xl text-text mt-2">
          Where I&apos;ve Operated.
        </motion.h2>

        {/* Timeline Container */}
        <div className="relative mt-16 md:ml-[250px] border-l border-[var(--border)] md:border-l-0 pl-6 md:pl-0">
          {/* Desktop Timeline Line */}
          <div className="hidden md:block absolute left-[-40px] top-0 bottom-0 w-px bg-[var(--border)]"></div>

          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              variants={fadeUp}
              custom={i}
              className="relative flex flex-col md:flex-row gap-4 md:gap-12 mb-16 group"
            >
              {/* Date */}
              <div className="md:absolute md:right-full md:pr-[40px] md:w-[250px] md:text-right md:top-6">
                <span className="font-mono text-xs text-muted tracking-widest block uppercase">
                  {exp.period}
                </span>
                {/* Desktop Connector Dot */}
                <span className={cn(
                  "hidden md:block absolute right-[-46px] top-[-3px] w-3 h-3 rounded-full z-10 transition-colors duration-300",
                  exp.current 
                    ? "bg-accent ring-4 ring-accent/20" 
                    : "bg-surface border-2 border-[var(--border-bright)]"
                )}></span>
                
                {/* Mobile Connector Dot */}
                <span className={cn(
                  "md:hidden absolute left-[-29px] top-[4px] w-2.5 h-2.5 rounded-full z-10",
                  exp.current 
                    ? "bg-accent ring-2 ring-accent/20" 
                    : "bg-surface border border-[var(--border-bright)]"
                )}></span>
              </div>

              {/* Content */}
              <div className="flex-1 bg-surface-2 border border-[var(--border)] p-6 md:p-8 rounded-[4px] relative group-hover:border-[var(--border-bright)] transition-colors duration-300">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-accent transition-colors duration-300 rounded-l-[4px]"></div>
                
                <h3 className="font-mono text-[11px] text-accent tracking-[0.2em] uppercase mb-1">
                  {exp.company}
                </h3>
                <h4 className="font-display font-bold text-2xl text-text mb-4">
                  {exp.title}
                </h4>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {exp.tags.map((tag) => (
                    <SkillPill key={tag} label={tag} />
                  ))}
                </div>
                
                <p className="font-body text-muted leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
