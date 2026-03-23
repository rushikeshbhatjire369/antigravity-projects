"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatBlock } from "@/components/ui/StatBlock";
import { stats } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="bg-transparent noise px-6 py-16 md:px-16 md:py-32 relative">
      <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-16 items-start relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel label="ABOUT / 02" className="section-line" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-[var(--text)] leading-tight mt-2">
            Infrastructure is my native language.
          </motion.h2>
          
          <motion.p variants={fadeUp} className="font-body text-[var(--text-muted)] text-lg leading-relaxed mt-6">
            I specialize in architecting, managing, and automating high-availability environments. My focus is on OpenStack private clouds and Linux distributions where reliability is critical. Every configuration, script, and architecture decision is made to ensure zero-downtime operations.
          </motion.p>
          <motion.p variants={fadeUp} className="font-body text-[var(--text-muted)] text-lg leading-relaxed mt-6">
            With a solid foundation in automation scripts and patch management, I reduce manual effort significantly—empowering teams to operate with fewer incidents and higher velocity across bare-metal and virtualized infrastructures.
          </motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-8 mt-12 w-full max-w-lg">
            {stats.map((stat, i) => (
              <StatBlock key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
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
          className="w-full relative h-full lg:min-h-[600px]"
        >
          <div className="sticky top-24 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/datacenter.png"
              alt="Data Center Infrastructure"
              className="w-full aspect-square object-cover object-center rounded-[4px] animated-border border border-[var(--border-bright)] shadow-[0_0_40px_rgba(0,255,209,0.1)]"
            />
            <p className="font-mono text-xs text-[var(--text-muted)] mt-4 tracking-widest flex items-center">
              <span className="status-dot mr-3 shrink-0" /> AVAILABLE FOR HIRE · NASHIK, INDIA
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
