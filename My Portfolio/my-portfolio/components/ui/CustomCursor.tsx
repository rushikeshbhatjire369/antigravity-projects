"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // Store previous ring positions for manual lerp
  const ringPos = useRef({ x: -100, y: -100 });
  const mousePos = useRef({ x: -100, y: -100 });
  const requestRef = useRef<number>();

  useEffect(() => {
    // Only run on non-touch devices
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
          ringRef.current.style.backgroundColor = "rgba(37, 99, 235, 0.1)"; // accent/10
        }
      } else {
        if (ringRef.current) {
          ringRef.current.dataset.hover = "false";
          ringRef.current.style.backgroundColor = "transparent";
        }
      }
    };

    const animateLoop = () => {
      // Lerp ring towards mouse
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        const isHover = ringRef.current.dataset.hover === "true";
        const scale = isHover ? "scale(2)" : "scale(1)";
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
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[100] -ml-1 -mt-1 will-change-transform"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        data-hover="false"
        className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[100] -ml-4 -mt-4 transition-colors duration-300 will-change-transform"
      />
    </>
  );
}
