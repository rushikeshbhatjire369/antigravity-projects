"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillPill } from "@/components/ui/SkillPill";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="bg-transparent grid-bg px-6 py-16 md:px-16 md:py-32 overflow-hidden relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="max-w-5xl relative z-10"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="WORK HISTORY / 03" className="section-line" />
        </motion.div>
        <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-[var(--text)] mt-2">
          Where I&apos;ve Operated.
        </motion.h2>

        {/* Timeline Container */}
        <div className="relative mt-16 md:ml-[250px] pl-6 md:pl-0">
          {/* Timeline Line */}
          <div className="absolute left-0 md:-left-[40px] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent-2)] to-transparent overflow-hidden">
            <div className="absolute left-[-1.5px] w-1 h-1 bg-cyan-400 shadow-[0_0_6px_rgba(0,255,209,1)] opacity-0 animate-[packet-travel_4s_linear_infinite]" />
            <div className="absolute left-[-1.5px] w-1 h-1 bg-cyan-400 shadow-[0_0_6px_rgba(0,255,209,1)] opacity-0 animate-[packet-travel_4s_linear_infinite_1.33s]" />
            <div className="absolute left-[-1.5px] w-1 h-1 bg-cyan-400 shadow-[0_0_6px_rgba(0,255,209,1)] opacity-0 animate-[packet-travel_4s_linear_infinite_2.66s]" />
          </div>

          <style dangerouslySetInnerHTML={ {__html: `
            @keyframes packet-travel {
              0% { top: 0; opacity: 0; }
              5% { opacity: 1; }
              95% { opacity: 1; }
              100% { top: 100%; opacity: 0; }
            }
          `} } />

          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              variants={fadeUp}
              custom={i}
              className="relative flex flex-col md:flex-row gap-4 md:gap-12 mb-16 group"
            >
              {/* Date */}
              <div className="md:absolute md:right-full md:pr-[40px] md:w-[250px] md:text-right md:top-6">
                <span className="font-mono text-xs text-[var(--text-muted)] tracking-[0.2em] block uppercase">
                  {exp.period}
                </span>
                
                {/* Desktop Connector Dot */}
                <div className="hidden md:block absolute right-[-44px] top-[-3px] z-10">
                  {exp.current ? (
                    <span className="status-dot glow-cyan ring-4 ring-[#010508]"></span>
                  ) : (
                    <span className="block w-2.5 h-2.5 rounded-full bg-[var(--surface-2)] border border-[var(--border-bright)]"></span>
                  )}
                </div>
                
                {/* Mobile Connector Dot */}
                <div className="md:hidden absolute left-[-5px] top-[4px] z-10">
                  {exp.current ? (
                    <span className="status-dot glow-cyan ring-4 ring-[#010508] transform scale-75"></span>
                  ) : (
                    <span className="block w-2.5 h-2.5 rounded-full bg-[var(--surface-2)] border border-[var(--border-bright)]"></span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 bg-[var(--surface-2)] noise border border-[var(--border)] p-6 md:p-8 rounded-[4px] relative hover:border-[rgba(0,255,209,0.4)] hover:bg-[var(--surface-3)] hover:shadow-[0_0_40px_rgba(0,255,209,0.06)] transition-all duration-300">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-gradient-to-b group-hover:from-[var(--accent)] group-hover:to-[var(--accent-2)] transition-all duration-300 rounded-l-[4px]"></div>
                
                <h3 className="font-mono text-[11px] text-[var(--accent)] tracking-[0.25em] uppercase mb-1">
                  {exp.company}
                </h3>
                <h4 className="font-display font-bold text-xl text-[var(--text)] mb-4">
                  {exp.title}
                </h4>
                
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {exp.tags.map((tag) => (
                    <SkillPill key={tag} label={tag} />
                  ))}
                </div>
                
                <p className="font-body text-[var(--text-muted)] leading-relaxed relative z-10">
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
