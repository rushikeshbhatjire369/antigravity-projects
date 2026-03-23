"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: -100, y: -100 });
  const mousePos = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number>();

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(hover: none)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) {
        if (ringRef.current) {
          ringRef.current.dataset.hover = "true";
          ringRef.current.style.backgroundColor = "rgba(0, 255, 209, 0.06)";
          ringRef.current.style.borderColor = "var(--accent)";
        }
      } else {
        if (ringRef.current) {
          ringRef.current.dataset.hover = "false";
          ringRef.current.style.backgroundColor = "transparent";
          ringRef.current.style.borderColor = "rgba(0, 255, 209, 0.5)";
        }
      }
    };

    const animateLoop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        const isHover = ringRef.current.dataset.hover === "true";
        const scale = isHover ? "scale(2.2)" : "scale(1)";
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) ${scale}`;
      }

      requestRef.current = requestAnimationFrame(animateLoop);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    requestRef.current = requestAnimationFrame(animateLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[100] -ml-[3px] -mt-[3px] will-change-transform shadow-[0_0_8px_rgba(0,255,209,0.9)]"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        data-hover="false"
        className="hidden md:block fixed top-0 left-0 w-7 h-7 border border-[rgba(0,255,209,0.5)] bg-transparent rounded-full pointer-events-none z-[100] -ml-[14px] -mt-[14px] transition-colors duration-200 will-change-transform"
      />
    </>
  );
}
