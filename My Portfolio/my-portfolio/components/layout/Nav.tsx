"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let currentActive = "";
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentActive = `#${entry.target.id}`;
          }
        });
        if (currentActive) {
          setActive(currentActive);
        }
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    NAV_LINKS.forEach((link) => {
      const id = link.href.substring(1);
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(1,5,8,0.92)] backdrop-blur-2xl border-b border-[rgba(0,255,209,0.08)] h-16 px-8 md:px-16 flex items-center justify-between">
        <a href="#" className="relative group font-display font-bold text-xl text-gradient-cyan flex items-center">
          RB<span className="status-dot ml-2" />
        </a>
        
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-[11px] tracking-[0.2em] uppercase relative pb-1 group transition-all duration-300",
                active === link.href ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:text-[var(--accent)] hover:glow-text"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute left-0 bottom-0 h-px bg-[var(--accent)] transition-all duration-300",
                active === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </a>
          ))}
        </div>

        <button className="md:hidden text-[var(--accent)]" onClick={() => setIsOpen(true)}>
          <Menu />
        </button>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-[var(--bg)] grid-bg flex flex-col justify-center items-center">
          <button className="absolute top-5 right-8 text-[var(--accent)]" onClick={() => setIsOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          <div className="flex flex-col gap-8 items-center text-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-display text-4xl font-bold text-gradient-cyan"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
