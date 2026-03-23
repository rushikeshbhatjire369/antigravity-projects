"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { meta } from "@/lib/data";
import { Mail, Phone, Linkedin } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useEffect, useState } from "react";

function SystemStatus() {
  const [widths, setWidths] = useState([0, 0]); // two progress bars

  useEffect(() => {
    // animate progress bars after a slight delay
    const t = setTimeout(() => {
      setWidths([100, 85]);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div variants={fadeUp} className="w-full max-w-2xl mx-auto mb-16 text-left">
      <div className="bg-[var(--surface-2)] border border-[var(--border-bright)] rounded-[4px] font-mono text-[11px] noise overflow-hidden shadow-lg">
        <div className="bg-[var(--surface-3)] px-4 py-2 border-b border-[var(--border)] flex justify-between items-center text-[var(--text-muted)]">
          <span>SYSTEM STATUS</span>
          <span className="text-[var(--accent)] flex items-center gap-2">
            LIVE <span className="status-dot relative top-px" />
          </span>
        </div>
        
        <div className="p-5 flex flex-col gap-4">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <div className="text-[var(--text-muted)] w-36 shrink-0">AVAILABILITY</div>
            <div className="flex-1 w-full flex items-center gap-4">
              <div className="h-[3px] flex-1 bg-[var(--border)] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-all duration-1000 ease-out"
                  style={ { width: `${widths[0]}%` } } 
                />
              </div>
              <div className="text-[var(--accent)] w-12 text-right">OPEN</div>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <div className="text-[var(--text-muted)] w-36 shrink-0">RESPONSE TIME</div>
            <div className="flex-1 w-full flex items-center gap-4">
              <div className="h-[3px] flex-1 bg-[var(--border)] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-all duration-1000 ease-out delay-150"
                  style={ { width: `${widths[1]}%` } } 
                />
              </div>
              <div className="text-[var(--accent)] w-12 text-right">&lt; 24h</div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4 mt-2">
            <div className="text-[var(--text-muted)] w-36 shrink-0">CURRENT STATUS</div>
            <div className="flex items-center gap-2 text-[var(--text)]">
              <span className="status-dot w-2 h-2" /> ACTIVELY SEEKING ROLES
            </div>
          </div>
          
          {/* Row 4 */}
          <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4">
            <div className="text-[var(--text-muted)] w-36 shrink-0">LOCATION</div>
            <div className="text-[var(--text)]">NASHIK, INDIA</div>
          </div>
          
          {/* Row 5 */}
          <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4">
            <div className="text-[var(--text-muted)] w-36 shrink-0">TIMEZONE</div>
            <div className="text-[var(--text)]">IST (UTC+5:30)</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Contact() {
  const contactCards = [
    { icon: Mail, label: "EMAIL", value: meta.email, href: `mailto:${meta.email}` },
    { icon: Phone, label: "PHONE", value: meta.phone, href: `tel:${meta.phone}` },
    { icon: Linkedin, label: "LINKEDIN", value: meta.linkedin, href: `https://${meta.linkedin}` },
  ];

  return (
    <section id="contact" className="min-h-[80vh] md:min-h-screen bg-transparent grid-bg px-6 py-16 md:px-16 md:py-32 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="font-display font-black leading-none text-gradient-cyan opacity-[0.04] text-[clamp(80px,18vw,200px)] whitespace-nowrap">
          LET&apos;S CONNECT
        </span>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="CONTACT / 08" className="mb-2 text-center flex justify-center w-full cursor-blink text-[var(--accent)] gap-0" />
        </motion.div>

        <motion.h2 variants={fadeUp} className="font-display font-black leading-tight mt-6 text-[clamp(40px,6vw,80px)] mb-16">
          <span className="text-[var(--text)]">Let&apos;s Build </span>
          <br className="md:hidden" />
          <span className="text-gradient-cyan">Something </span>
          <br className="md:hidden" />
          <span className="text-[var(--text)]">Reliable.</span>
        </motion.h2>

        <SystemStatus />

        <motion.div variants={fadeUp} className="flex flex-col gap-4 mt-8 w-full text-left">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.label}
                href={card.href}
                target={card.label === "LINKEDIN" ? "_blank" : undefined}
                rel={card.label === "LINKEDIN" ? "noopener noreferrer" : undefined}
                className="animated-border noise bg-[var(--surface-2)] px-8 py-5 rounded-[4px] hover:glow-cyan hover:-translate-y-1 transition-all duration-300 group flex flex-row items-center gap-6 w-full relative z-10"
              >
                <Icon className="text-[var(--accent)] w-5 h-5 shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(0,255,209,0.8)] transition-all duration-300" />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--text-muted)] uppercase mb-1">
                    {card.label}
                  </span>
                  <span className="font-mono text-[var(--text)] text-sm whitespace-nowrap group-hover:text-[var(--accent)] transition-colors duration-300">
                    {card.value}
                  </span>
                </div>
              </a>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-20">
          <MagneticButton 
            href={`mailto:${meta.email}`}
            className="animated-border bg-[var(--surface-2)] text-[var(--accent)] font-mono font-bold tracking-wider uppercase px-12 py-5 rounded-[4px] inline-flex items-center hover:bg-[rgba(0,255,209,0.08)] hover:glow-cyan"
          >
            <span className="text-[var(--accent)] mr-3 text-lg">&gt;</span>
            Send Me a Message
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
