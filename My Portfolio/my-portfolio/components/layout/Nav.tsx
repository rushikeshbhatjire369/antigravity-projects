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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-[var(--border)] h-16 px-8 md:px-16 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-xl text-text">RB</a>
        
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-xs tracking-widest relative pb-1 group transition-colors",
                active === link.href ? "text-accent" : "text-muted hover:text-text"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute left-0 bottom-0 h-px bg-accent transition-all duration-300",
                active === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </a>
          ))}
        </div>

        <button className="md:hidden text-text" onClick={() => setIsOpen(true)}>
          <Menu />
        </button>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-bg flex flex-col justify-center items-center">
          <button className="absolute top-5 right-8 text-text" onClick={() => setIsOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          <div className="flex flex-col gap-8 items-center text-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "font-display text-4xl",
                  active === link.href ? "text-accent" : "text-text"
                )}
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
