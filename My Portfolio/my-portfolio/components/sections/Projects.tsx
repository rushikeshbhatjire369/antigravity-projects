"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillPill } from "@/components/ui/SkillPill";
import { TerminalPreview } from "@/components/ui/TerminalPreview";
import { projects } from "@/lib/data";

const terminalLinesMap: Record<string, string[]> = {
  "01": [
    "$ ./monitor.sh --cluster openstack-prod",
    "> Checking Nova service... [████████░░] 80%",
    "> Neutron API: ONLINE ✓",
    "> VM anomalies detected: 0",
    "> Auto-healing triggers: 3 resolved",
    "> Uptime: 99.97% ▲"
  ],
  "02": [
    "$ ansible-playbook patch_compliance.yml",
    "> Scanning 9000+ servers...",
    "> Vulnerabilities found: 500",
    "> Applying patches: [██████████] 100%",
    "> Compliance score: 100% ✓",
    "> Vulnerabilities resolved: 500 ▲"
  ],
  "03": [
    "$ ./provision.sh --domain example.com",
    "> Configuring Nginx... ✓",
    "> DNS propagation: COMPLETE",
    "> SSL cert issued: Let's Encrypt ✓",
    "> Health check: ALL SYSTEMS GO",
    "> Deploy time: 4m 32s ▲"
  ]
};

export function Projects() {
  return (
    <section id="work" className="bg-transparent noise px-6 py-16 md:px-16 md:py-32 relative">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="PROJECTS / 06" className="section-line" />
        </motion.div>
        
        <motion.h2 variants={fadeUp} className="font-display font-bold text-4xl md:text-5xl text-[var(--text)] mt-2">
          Things I&apos;ve Actually Built.
        </motion.h2>

        <div className="flex flex-col gap-10 mt-16">
          {projects.map((project) => (
            <motion.div
              key={project.number}
              variants={fadeUp}
              className="bg-[var(--surface-2)] border border-[var(--border)] rounded-[4px] overflow-hidden group transition-all duration-300 relative hover:border-[rgba(0,255,209,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,255,209,0.08),0_0_0_1px_rgba(0,255,209,0.1)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] h-full relative z-10">
                {/* Left - Terminal Preview */}
                <div className="border-b lg:border-b-0 lg:border-r border-[var(--border)] relative overflow-hidden group-hover:border-[var(--border-bright)] transition-colors duration-300 min-h-[280px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,209,0.15)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none mix-blend-overlay" />
                  
                  <TerminalPreview 
                    lines={terminalLinesMap[project.number] || []} 
                    className="border-none rounded-none"
                  />
                </div>
                
                {/* Right - Content */}
                <div className="p-8 md:p-12 relative flex flex-col justify-center overflow-hidden">
                  <div className="absolute top-0 md:top-4 right-6 select-none pointer-events-none font-display font-black text-[120px] leading-none text-gradient-cyan opacity-[0.05]">
                    {project.number}
                  </div>
                  
                  <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)] mb-4 uppercase">
                    &gt; PROJECT {project.number}
                  </div>
                  
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--text)] leading-tight mb-6 max-w-[90%] md:max-w-xl relative z-10">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                    {project.tags.map((tag) => (
                      <SkillPill key={tag} label={tag} className="hover:glow-cyan" />
                    ))}
                  </div>
                  
                  <ul className="space-y-4 relative z-10">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-1 h-1 shrink-0 rounded-full bg-[var(--accent)] mt-[10px] shadow-[0_0_6px_rgba(0,255,209,0.8)]" />
                        <span className="font-body text-[var(--text-muted)] text-[15px] leading-relaxed">
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
