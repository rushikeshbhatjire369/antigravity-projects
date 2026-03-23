"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const sections = useMemo(() => ["hero", "about", "experience", "skills", "certifications", "work", "education", "contact"], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-40% 0px -60% 0px" });

    sections.forEach(sec => {
      const el = document.getElementById(sec);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeIndex = sections.indexOf(activeSection) + 1;

  return (
    <>
      {/* INDICATOR 1 - Left Edge Bar */}
      <div className="fixed left-0 top-0 bottom-0 w-[2px] bg-[var(--border)] z-50 pointer-events-none">
        <div 
          className="w-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent-2)] shadow-[0_0_8px_rgba(0,255,209,0.6)]"
          style={ { height: `${scrollProgress}%` } }
        />
      </div>

      {/* INDICATOR 2 - Right Edge Dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4">
        {/* Connecting line background */}
        <div className="absolute top-2 bottom-2 w-px bg-[var(--border)] -z-10" />
        
        {sections.map((sec) => (
          <div key={sec} className="relative group cursor-pointer flex items-center justify-center p-2" onClick={() => scrollTo(sec)}>
            {/* Tooltip */}
            <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap">
              <div className="bg-[var(--surface-2)] border border-[var(--accent)] text-[var(--accent)] font-mono text-xs px-3 py-1 rounded-[2px] shadow-[0_0_10px_rgba(0,255,209,0.2)] uppercase">
                {sec}
              </div>
            </div>
            
            {/* Dot */}
            <div className={cn(
              "rounded-full transition-all duration-300 relative z-10",
              activeSection === sec 
                ? "w-2.5 h-2.5 bg-[var(--accent)] shadow-[0_0_8px_rgba(0,255,209,1)]" 
                : "w-1.5 h-1.5 bg-[var(--border-bright)] group-hover:bg-[var(--accent)] group-hover:scale-150"
            )}>
              {activeSection === sec && (
                <div className="absolute -inset-1.5 rounded-full border border-[var(--accent)] shadow-[0_0_8px_rgba(0,255,209,0.5)] animate-ping opacity-50" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* INDICATOR 3 - Bottom Right Readout */}
      <div className={cn(
        "fixed bottom-6 right-6 z-50 pointer-events-none transition-opacity duration-500",
        scrollProgress > 2 ? "opacity-100" : "opacity-0"
      )}>
        <div className="bg-[var(--surface-2)] border border-[var(--border-bright)] font-mono text-[10px] text-[var(--accent)] p-3 rounded-[2px] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col leading-loose">
            <div>&gt; SCROLL {Math.round(scrollProgress)}%</div>
            <div>&gt; SECTION 0{activeIndex}/08</div>
          </div>
        </div>
      </div>
    </>
  );
}
