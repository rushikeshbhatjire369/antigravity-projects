"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HoloBadge } from "@/components/ui/HoloBadge";
import { certifications } from "@/lib/data";

export function Certifications() {
  return (
    <section id="certifications" className="bg-transparent grid-bg px-6 py-16 md:px-16 md:py-32 relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="relative z-10"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="CERTIFICATIONS / 05" className="section-line" />
        </motion.div>
        
        <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-[var(--text)] mt-2">
          Certified. Verified. Production-Tested.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              className="animated-border noise bg-[var(--surface-2)] p-8 rounded-[4px] transition-all duration-300 group hover:shadow-[0_0_50px_rgba(0,255,209,0.12)] relative"
            >
              <div className="absolute inset-0 bg-transparent group-hover:bg-gradient-to-br group-hover:from-[rgba(0,255,209,0.05)] group-hover:to-[rgba(139,92,246,0.05)] transition-all duration-300 pointer-events-none rounded-inherit" />
              
              <div className="relative z-10">
                <HoloBadge label={cert.logo} className="w-16 h-16 mb-8" />
                
                <h3 className="font-display font-bold text-xl text-[var(--text)] leading-tight mt-2 min-h-[56px]">
                  {cert.title}
                </h3>
                
                {cert.subtitle && (
                  <div className="font-mono text-xs text-[var(--accent)] tracking-wider mt-2 uppercase">
                    {cert.subtitle}
                  </div>
                )}
                
                <div className="font-body text-[var(--text-muted)] text-[15px] mt-4">
                  {cert.issuer}
                </div>
                
                <div className="font-mono text-[11px] text-[var(--text-dim)] mt-2 tracking-widest uppercase">
                  {cert.date}
                </div>
                
                {cert.id && (
                  <div className="font-mono text-[10px] text-[var(--text-dim)] mt-4 uppercase tracking-widest bg-[rgba(0,255,209,0.04)] px-3 py-1.5 rounded-[2px] border border-[var(--border)] w-fit">
                    ID: {cert.id}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
