"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  color: string;
  index: number;
}

interface CharColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId: number;
    let lastTime = 0;
    const FRAME_RATE = 60;
    const FRAME_DURATION = 1000 / FRAME_RATE;

    const mouse = { x: -1000, y: -1000 };
    
    // System 1 Setup
    const nodes: Node[] = Array.from({ length: 60 }).map((_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.5 + 1.5,
      pulsePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.3 ? "0, 255, 209" : "139, 92, 246",
      index: i,
    }));

    // System 3 Setup
    const GLYPHS = ['0','1','∇','λ','∑','⟨','⟩','|','→','∞','π','Δ','░','▒','▓'];
    const columns: CharColumn[] = Array.from({ length: 8 }).map((_, i) => ({
      x: (width / 9) * (i + 1),
      y: -Math.random() * 500,
      speed: Math.random() * 0.8 + 0.4,
      chars: Array.from({ length: Math.floor(Math.random() * 5 + 15) }).map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
    }));

    // System 4 Setup
    let scanY = 0;
    const ripples: { y: number, time: number }[] = [];

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Re-space columns
      columns.forEach((col, i) => {
        col.x = (width / 9) * (i + 1);
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = (time: number) => {
      rafId = requestAnimationFrame(draw);
      
      if (document.hidden) return; // Pause when tab hidden
      
      const delta = time - lastTime;
      if (delta < FRAME_DURATION) return;
      lastTime = time - (delta % FRAME_DURATION);

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'screen';

      // --- SYSTEM 3: DATA STREAM COLUMNS ---
      ctx.font = "11px monospace"; // Space Mono conceptually
      columns.forEach(col => {
        col.y += col.speed;
        if (col.y > height + col.chars.length * 14) {
          col.y = -Math.random() * 500;
        }

        col.chars.forEach((char, i) => {
          const charY = col.y - (i * 14);
          if (charY > 0 && charY < height) {
            // Fade based on trailing position
            const alpha = Math.max(0, 1 - (i / col.chars.length));
            ctx.fillStyle = `rgba(0,255,209,${alpha * 0.3})`;
            ctx.fillText(char, col.x, charY);
          }
        });
      });

      // --- SYSTEM 4: HORIZONTAL SCAN PULSE ---
      scanY += (height / (60 * 12)); // 12 seconds to bottom
      if (scanY > height) {
        scanY = 0;
        ripples.push({ y: height / 2, time: 0 }); // trigger ripple conceptually from center
      }

      const gradient = ctx.createLinearGradient(width * 0.2, 0, width * 0.8, 0);
      gradient.addColorStop(0, "rgba(0,255,209,0)");
      gradient.addColorStop(0.5, "rgba(0,255,209,0.15)");
      gradient.addColorStop(1, "rgba(0,255,209,0)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(width * 0.2, scanY, width * 0.6, 1);
      
      const fadeGradient = ctx.createLinearGradient(0, scanY, 0, scanY + 30);
      fadeGradient.addColorStop(0, "rgba(0,255,209,0.03)");
      fadeGradient.addColorStop(1, "rgba(0,255,209,0)");
      ctx.fillStyle = fadeGradient;
      ctx.fillRect(width * 0.2, scanY + 1, width * 0.6, 30);

      // Draw Ripples
      ripples.forEach((r, idx) => {
        r.time += 16;
        if (r.time > 1500) {
          ripples.splice(idx, 1);
        } else {
          const progress = r.time / 1500;
          ctx.beginPath();
          ctx.arc(width / 2, scanY, progress * 400, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,255,209,${(1 - progress) * 0.05})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      let drawnMouseLines = 0;

      // --- SYSTEM 1 & 2 & 5: NODES & CONNECTIONS ---
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Velocity wiggle
        n.vx += (Math.random() * 0.01 - 0.005);
        n.vy += (Math.random() * 0.01 - 0.005);
        // Clamp
        if (n.vx > 0.15) n.vx = 0.15; if (n.vx < -0.15) n.vx = -0.15;
        if (n.vy > 0.15) n.vy = 0.15; if (n.vy < -0.15) n.vy = -0.15;

        // SYSTEM 5: MOUSE GRAVITY
        const dxMouse = n.x - mouse.x;
        const dyMouse = n.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < 200 && distMouse > 0) {
          const force = 0.0008 * (200 - distMouse);
          n.vx -= (dxMouse / distMouse) * force;
          n.vy -= (dyMouse / distMouse) * force;
          
          if (drawnMouseLines < 5) {
            const grad = ctx.createLinearGradient(mouse.x, mouse.y, n.x, n.y);
            grad.addColorStop(0, "rgba(0,255,209,0.4)");
            grad.addColorStop(1, "transparent");
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            drawnMouseLines++;
          }
        }

        n.x += n.vx;
        n.y += n.vy;

        // Bounce
        if (n.x < 0) { n.x = 0; n.vx *= -0.8; }
        if (n.x > width) { n.x = width; n.vx *= -0.8; }
        if (n.y < 0) { n.y = 0; n.vy *= -0.8; }
        if (n.y > height) { n.y = height; n.vy *= -0.8; }

        ctx.shadowBlur = 0;

        // SYSTEM 2: CONNECTIONS
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx*dx + dy*dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.15;
            ctx.lineWidth = (1 - dist / 150) * 1.2;
            const isViolet = (n.index + n2.index) % 2 === 0;
            const colorRGB = isViolet ? "139,92,246" : "0,255,209";
            
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(${colorRGB}, ${alpha})`;
            ctx.stroke();

            // Electron
            const t = (time * 0.0003 + n.index * 0.1) % 1;
            const ex = n.x + (n2.x - n.x) * t;
            const ey = n.y + (n2.y - n.y) * t;
            
            ctx.beginPath();
            ctx.arc(ex, ey, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colorRGB}, ${alpha * 4})`; // brighter
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(${colorRGB}, 1)`;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // Draw node
        const alpha = 0.3 + 0.5 * Math.sin(time * 0.0008 + n.pulsePhase);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color}, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${n.color}, 0.6)`;
        ctx.fill();
      }
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none" 
    />
  );
}
