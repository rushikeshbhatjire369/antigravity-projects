"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { certifications } from "@/lib/data";

export function Certifications() {
  return (
    <section id="certifications" className="bg-[#0D0D0D] px-6 py-16 md:px-16 md:py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="CERTIFICATIONS / 05" />
        </motion.div>
        
        <motion.h2 variants={fadeUp} className="font-display font-extrabold text-4xl md:text-5xl text-text mt-2">
          Certified. Verified. Production-Tested.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              className="relative overflow-hidden bg-surface border border-[var(--border)] p-8 rounded-[4px] hover:border-accent transition-all duration-300 group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
              
              <PlaceholderImage label={cert.logo} className="w-16 h-16 mb-6 rounded-[2px]" />
              
              <h3 className="font-display font-bold text-xl text-text leading-tight mt-2 min-h-[56px]">
                {cert.title}
              </h3>
              
              {cert.subtitle && (
                <div className="font-mono text-xs text-accent tracking-widest mt-1 uppercase">
                  {cert.subtitle}
                </div>
              )}
              
              <div className="font-body text-muted text-sm mt-4">
                {cert.issuer}
              </div>
              
              <div className="font-mono text-xs text-dim mt-1 tracking-widest uppercase">
                {cert.date}
              </div>
              
              {cert.id && (
                <div className="font-mono text-[10px] text-muted mt-3 uppercase tracking-widest break-words selection:bg-accent/30">
                  ID: {cert.id}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
