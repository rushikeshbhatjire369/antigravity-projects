"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export function PageTransition() {
  const [phase, setPhase] = useState("PHASE_1"); // PHASE_1, PHASE_2, PHASE_3, DONE
  const [lines, setLines] = useState<string[]>([]);
  const fullLines = useMemo(() => [
    "INITIALIZING PORTFOLIO...",
    "LOADING INFRASTRUCTURE DATA...",
    "ESTABLISHING SECURE CONNECTION...",
    "ALL SYSTEMS ONLINE ✓"
  ], []);

  useEffect(() => {
    if (sessionStorage.getItem("booted")) {
      setPhase("DONE");
      return;
    }

    let isMounted = true;
    const timeoutIds: NodeJS.Timeout[] = [];

    const bootSequence = async () => {
      // 0 - 800ms
      let currentLineIdx = 0;
      let currentCharIdx = 0;
      const typeNextChar = () => {
        if (!isMounted) return;
        
        if (currentLineIdx >= fullLines.length) {
          // Move to phase 2 at ~800ms
          setPhase("PHASE_2");
          timeoutIds.push(setTimeout(() => {
            if (isMounted) setPhase("PHASE_3");
          }, 400)); // 800 + 400 = 1200ms
          
          timeoutIds.push(setTimeout(() => {
            if (isMounted) {
              setPhase("DONE");
              sessionStorage.setItem("booted", "true");
            }
          }, 800)); // 1200 + 400 = 1600ms
          return;
        }

        const line = fullLines[currentLineIdx];
        if (currentCharIdx === 0) {
          setLines(prev => [...prev, ""]);
        }

        setLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIdx] = line.substring(0, currentCharIdx + 1);
          return newLines;
        });

        currentCharIdx++;
        if (currentCharIdx >= line.length) {
          currentLineIdx++;
          currentCharIdx = 0;
          timeoutIds.push(setTimeout(typeNextChar, 10)); // tiny pause between lines
        } else {
          timeoutIds.push(setTimeout(typeNextChar, 12)); // 30ms might be too slow to hit 800ms limit, adjusted to ~12ms
        }
      };

      typeNextChar();
    };

    bootSequence();

    return () => {
      isMounted = false;
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  if (phase === "DONE") return null;

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none flex flex-col">
      {/* Top Half */}
      <div 
        className={cn(
          "w-full bg-[#010508] border-b border-[var(--accent)]/30 flex items-end justify-center pb-2 transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)]",
          phase === "PHASE_3" ? "h-1/2 -translate-y-full" : "h-1/2 translate-y-0"
        )}
      >
        <div className="font-mono text-[var(--accent)] text-[13px] w-full max-w-lg px-8 flex flex-col gap-1 relative top-4">
          {lines.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
      
      {/* Bottom Half */}
      <div 
        className={cn(
          "w-full bg-[#010508] flex flex-col items-center justify-start pt-8 transition-transform duration-400 ease-[cubic-bezier(0.77,0,0.175,1)]",
          phase === "PHASE_3" ? "h-1/2 translate-y-full" : "h-1/2 translate-y-0"
        )}
      >
        {phase === "PHASE_2" && (
          <div className="w-full max-w-lg px-8 flex flex-col items-center gap-2 animate-in fade-in duration-200">
            <div className="w-full h-[2px] bg-[var(--surface-3)] relative">
              <div className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] animate-[fillBar_400ms_ease-out_forwards]" 
                   style={ { animationFillMode: 'forwards' } } />
            </div>
            <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest mt-2">
              100% COMPLETE
            </div>
          </div>
        )}
        <style dangerouslySetInnerHTML={ {__html: `
          @keyframes fillBar { 0% { width: 0%; } 100% { width: 100%; } }
        `} } />
      </div>
    </div>
  );
}
