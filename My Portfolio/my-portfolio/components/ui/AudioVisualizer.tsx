"use client";

import { useEffect, useRef, useState } from "react";

export function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      
      if (progress > 0.8) setIsEnding(true);
      else setIsEnding(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    const height = 48;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      canvas.width = width;
    };
    window.addEventListener("resize", resize);

    let rafId: number;
    let lastTime = 0;
    const FPS = 30;
    const interval = 1000 / FPS;

    let endingPhase = 0; // 0 to 1
    let time = 0;

    // simple 1D noise for the animation
    const MAX_VERTICES = 256;
    const r = Array.from({ length: MAX_VERTICES }, () => Math.random());
    const smoothNoise = (x: number) => {
      const i = Math.floor(x);
      const f = x - i;
      const u = f * f * (3.0 - 2.0 * f);
      return r[i % MAX_VERTICES] * (1.0 - u) + r[(i + 1) % MAX_VERTICES] * u;
    };

    const draw = (t: number) => {
      rafId = requestAnimationFrame(draw);
      if (document.hidden) return;
      const delta = t - lastTime;
      if (delta < interval) return;
      lastTime = t - (delta % interval);

      time += 0.05;

      if (isEnding) {
        endingPhase += 0.01;
        if (endingPhase > 1) endingPhase = 1;
      } else {
        endingPhase -= 0.02;
        if (endingPhase < 0) endingPhase = 0;
      }

      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "transparent");
      bgGrad.addColorStop(1, "rgba(1,5,8,0.8)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const numBars = 120;
      const barWidth = (width / numBars) - 1;

      for (let i = 0; i < numBars; i++) {
        // Bell curve weight (0 near edges, 1 at center)
        const normalizeIndex = (i / numBars) * 2 - 1; // -1 to 1
        const bellWeight = Math.max(0, 1 - normalizeIndex * normalizeIndex);

        let barHeight = 8 + 24 * smoothNoise(i * 0.08 + time * 0.6);
        barHeight *= bellWeight;

        // Transition to flatline
        const flatHeight = 2; // Flatline height
        
        // Add heartbeat blip every ~3 seconds roughly during flatline
        let heartbeat = 0;
        if (endingPhase > 0.9 && (t % 3000) < 200) {
          const beatCenter = numBars / 2;
          const distToBeat = Math.abs(i - beatCenter);
          if (distToBeat < 5) {
             heartbeat = (5 - distToBeat) * 8 * Math.sin((t % 3000) / 200 * Math.PI);
          }
        }

        const currentHeight = barHeight * (1 - endingPhase) + (flatHeight + heartbeat) * endingPhase;
        
        const x = i * (width / numBars);
        const y = height - currentHeight;

        let alpha = currentHeight / 32;
        if (alpha > 1) alpha = 1;
        if (alpha < 0.15) alpha = 0.15;

        // Determine if tall bar
        const isTall = currentHeight > 16;
        
        ctx.fillStyle = `rgba(0, 255, 209, ${isTall ? 0.4 : 0.15})`;
        
        if (isTall) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(0, 255, 209, 0.6)";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillRect(x, y, Math.max(1, barWidth), currentHeight);
      }
      ctx.shadowBlur = 0;
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [isEnding]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-1 pointer-events-none w-full h-12">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
