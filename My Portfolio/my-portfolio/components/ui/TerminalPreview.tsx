"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalPreviewProps {
  lines: string[];
  className?: string;
}

export function TerminalPreview({ lines, className }: TerminalPreviewProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [charIndex, setCharIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [idle, setIdle] = useState(false);
  
  const compRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        setDisplayedLines([""]);
      }
    }, { threshold: 0.5 });
    
    if (compRef.current) observer.observe(compRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started.current || idle) return;
    
    if (lineIndex >= lines.length) {
      setIdle(true);
      return;
    }
    
    const currentLine = lines[lineIndex];
    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[lineIndex] = currentLine.substring(0, charIndex + 1);
          return newLines;
        });
        setCharIndex(prev => prev + 1);
      }, 40); // 40ms per char
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLineIndex(prev => prev + 1);
        setCharIndex(0);
        if (lineIndex + 1 < lines.length) {
          setDisplayedLines(prev => [...prev, ""]);
        }
      }, 300); // 300ms pause between lines
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex, lines, idle, displayedLines]);

  // Idle animation (re-run a random line every 6s)
  useEffect(() => {
    if (!idle) return;
    const interval = setInterval(() => {
      const targetIdx = Math.floor(Math.random() * lines.length);
      if (targetIdx === 0) return; // skip command line usually
      
      const parts = lines[targetIdx].split(/(:\s|...\s|\[)/); // rough split to keep label
      const prefix = parts[0] + (parts[1] || "");
      const newSuffix = " UPDATED " + Math.floor(Math.random()*100) + "ms";
      
      setDisplayedLines(prev => {
        const next = [...prev];
        next[targetIdx] = prefix + newSuffix;
        return next;
      });
      
      // Return to original after 1.5s
      setTimeout(() => {
        setDisplayedLines(prev => {
          const next = [...prev];
          next[targetIdx] = lines[targetIdx];
          return next;
        });
      }, 1500);
      
    }, 6000);
    return () => clearInterval(interval);
  }, [idle, lines]);

  return (
    <div ref={compRef} className={cn("w-full h-full flex flex-col font-mono text-[12px] bg-[#010508] border border-[var(--border)] rounded-[4px] overflow-hidden", className)}>
      <div className="bg-[var(--surface-3)] px-3 py-2 border-b border-[var(--border)] flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <div className="ml-4 text-[10px] text-[var(--text-muted)] tracking-widest uppercase">bash — root@infra-prod</div>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-1.5 overflow-hidden relative">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex whitespace-pre-wrap leading-relaxed">
            {line.startsWith("$") ? (
              <span className="text-[var(--accent)]">{line}</span>
            ) : line.startsWith(">") ? (
              <span>
                <span className="text-[var(--accent)] opacity-70">&gt; </span>
                <span className="text-[var(--text)]">{line.substring(2)}</span>
              </span>
            ) : (
              <span className="text-[var(--text)]">{line}</span>
            )}
            {i === lineIndex && !idle && <span className="bg-[var(--accent)] w-2 h-3.5 inline-block ml-1 animate-pulse" />}
          </div>
        ))}
        {idle && (
          <div className="flex">
            <span className="text-[var(--text-muted)] opacity-50">_</span>
            <span className="bg-[var(--accent)] w-2 h-3.5 inline-block ml-1 animate-pulse" />
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />
      </div>
    </div>
  );
}
