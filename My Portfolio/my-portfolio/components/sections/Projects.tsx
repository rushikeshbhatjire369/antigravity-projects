"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SkillPill } from "@/components/ui/SkillPill";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="work" className="bg-[#0F0F0F] px-6 py-16 md:px-16 md:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="PROJECTS / 06" />
        </motion.div>
        
        <motion.h2 variants={fadeUp} className="font-display font-extrabold text-4xl md:text-5xl text-text mt-2">
          Things I&apos;ve Actually Built.
        </motion.h2>

        <div className="flex flex-col gap-6 mt-16">
          {projects.map((project) => (
            <motion.div
              key={project.number}
              variants={fadeUp}
              className="bg-surface border border-[var(--border)] rounded-[4px] overflow-hidden hover:border-[var(--border-bright)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] h-full">
                {/* Left - Image */}
                <div className="border-b lg:border-b-0 lg:border-r border-[var(--border)] group-hover:border-[var(--border-bright)] transition-colors duration-300">
                  <PlaceholderImage
                    label={project.placeholder}
                    className="w-full h-64 lg:h-full min-h-[280px] border-none bg-transparent"
                  />
                </div>
                
                {/* Right - Content */}
                <div className="p-8 md:p-12 relative flex flex-col justify-center">
                  <div className="absolute top-0 md:top-4 right-6 select-none pointer-events-none font-display font-extrabold text-[80px] md:text-[120px] leading-none text-white opacity-[0.03]">
                    {project.number}
                  </div>
                  
                  <div className="font-mono text-[11px] text-accent tracking-widest mb-4 uppercase">
                    PROJECT {project.number}
                  </div>
                  
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-text leading-tight mb-6 max-w-[90%] md:max-w-xl">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <SkillPill key={tag} label={tag} />
                    ))}
                  </div>
                  
                  <ul className="space-y-3 relative z-10">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-[6px] h-[6px] shrink-0 rounded-full bg-accent mt-[6px]" />
                        <span className="font-body text-muted text-sm md:text-base leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
