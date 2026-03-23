"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillPill } from "@/components/ui/SkillPill";
import { skills } from "@/lib/data";
import { cn } from "@/lib/utils";

import { SkillRadar } from "@/components/ui/SkillRadar";

export function Skills() {
  return (
    <section id="skills" className="bg-transparent noise px-6 py-16 md:px-16 md:py-32 relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="relative z-10"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="SKILLS & TOOLS / 04" className="section-line" />
        </motion.div>
        
        <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-[var(--text)] mt-2">
          The Stack I Live In.
        </motion.h2>
        
        <motion.p variants={fadeUp} className="font-body text-[var(--text-muted)] mt-4 text-[16px] md:text-[17px]">
          Not a list of buzzwords — tools I use daily in production.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          <SkillRadar />
          {skills.map((item) => (
            <motion.div
              key={item.category}
              variants={fadeUp}
              className={cn(
                "noise bg-[var(--surface-2)] border border-[var(--border)] p-6 md:p-8 rounded-[4px] relative transition-all duration-300 h-full flex flex-col",
                "hover:border-[var(--accent)] hover:-translate-y-[2px] hover:shadow-[0_0_30px_rgba(0,255,209,0.08),inset_0_0_30px_rgba(0,255,209,0.02)]"
              )}
              style={ {
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.035\'/%3E%3C/svg%3E"), radial-gradient(circle at top left, rgba(0,255,209,0.00) 0%, var(--surface-2) 60%)'
              } }
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(0,255,209,0.05)_0%,transparent_60%)] transition-opacity duration-300 pointer-events-none rounded-[4px]" />
              
              <div className="relative z-10 border-b border-[var(--accent)]/30 pb-3 mb-6">
                <h3 className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-gradient-cyan font-bold">
                  {item.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3 relative z-10 flex-1 content-start">
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
