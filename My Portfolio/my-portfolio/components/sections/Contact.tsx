"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { meta } from "@/lib/data";
import { Mail, Phone, Linkedin } from "lucide-react";

export function Contact() {
  const contactCards = [
    { icon: Mail, label: "EMAIL", value: meta.email, href: `mailto:${meta.email}` },
    { icon: Phone, label: "PHONE", value: meta.phone, href: `tel:${meta.phone}` },
    { icon: Linkedin, label: "LINKEDIN", value: meta.linkedin, href: `https://${meta.linkedin}` },
  ];

  return (
    <section id="contact" className="min-h-[80vh] md:min-h-screen bg-bg px-6 py-16 md:px-16 md:py-32 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="font-display font-extrabold leading-none text-white opacity-[0.025] text-[clamp(80px,18vw,200px)] whitespace-nowrap">
          LET&apos;S CONNECT
        </span>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="relative z-10 max-w-3xl mx-auto w-full flex flex-col items-center"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel label="CONTACT / 08" className="mb-2 text-center flex justify-center w-full" />
        </motion.div>

        <motion.h2 variants={fadeUp} className="font-display font-extrabold text-text leading-tight mt-4 text-[clamp(40px,6vw,80px)]">
          Let&apos;s Build Something Reliable.
        </motion.h2>

        <motion.p variants={fadeUp} className="font-body text-muted text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          Available for roles in cloud infrastructure, Linux systems, and DevOps engineering. Open to full-time, contract, and remote opportunities.
        </motion.p>

        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl mx-auto text-left">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.label}
                href={card.href}
                target={card.label === "LINKEDIN" ? "_blank" : undefined}
                rel={card.label === "LINKEDIN" ? "noopener noreferrer" : undefined}
                className="bg-surface border border-[var(--border)] p-6 md:p-8 rounded-[4px] hover:border-accent hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start w-full"
              >
                <Icon className="text-accent w-6 h-6 mb-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-mono text-[11px] text-muted uppercase tracking-[0.2em] mb-2">
                  {card.label}
                </span>
                <span className="font-body text-text text-sm break-all group-hover:text-accent transition-colors duration-300">
                  {card.value}
                </span>
              </a>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16">
          <a
            href={`mailto:${meta.email}`}
            className="bg-accent text-white font-mono text-sm tracking-widest uppercase px-12 py-5 rounded-[4px] inline-flex items-center gap-3 hover:bg-accent-glow hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"
          >
            Send Me a Message →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
