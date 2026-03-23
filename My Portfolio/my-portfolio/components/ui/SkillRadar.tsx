"use client";

import { useEffect, useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function SkillRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let rafId: number;
    // Axis data:
    const axes = [
      { label: "Cloud & Virt", val: 95 },
      { label: "Linux & Sys", val: 90 },
      { label: "Networking", val: 85 },
      { label: "Automation", val: 88 },
      { label: "Storage", val: 80 },
      { label: "Operations", val: 92 },
    ];
    
    // Animate from 0 to actual over 1.5s
    const startTime = performance.now();
    const duration = 1500;
    
    const mouse = { x: -100, y: -100 };
    let hoveredAxis = -1;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", () => { hoveredAxis = -1; mouse.x = -100; mouse.y = -100; });
    
    // Ease out cubic
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    
    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);
      
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.min(cx, cy) - 40; // leave edge for text
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw 5 polygon Rings
      const rings = 5;
      for (let r = 1; r <= rings; r++) {
        const radius = maxRadius * (r / rings);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(0,255,209,0.06)";
        ctx.stroke();
      }
      
      // Draw Axes lines & Labels
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
        const px = cx + Math.cos(angle) * maxRadius;
        const py = cy + Math.sin(angle) * maxRadius;
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = "rgba(0,255,209,0.1)";
        ctx.stroke();
        
        ctx.fillStyle = "rgba(0,255,209,0.5)";
        const labelRadius = maxRadius + 20;
        const lx = cx + Math.cos(angle) * labelRadius;
        const ly = cy + Math.sin(angle) * labelRadius;
        ctx.fillText(axes[i].label, lx, ly);
      }
      
      // Rotating outer dashed ring
      const timeSecs = now / 1000;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(timeSecs * 0.3 * (Math.PI / 180));
      ctx.beginPath();
      ctx.arc(0, 0, maxRadius + 5, 0, Math.PI * 2);
      ctx.setLineDash([4, 10]);
      ctx.strokeStyle = "rgba(0,255,209,0.15)";
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Tick marks every 60 deg
      for(let i=0; i<6; i++) {
         const angle = (Math.PI * 2 / 6) * i;
         ctx.beginPath();
         ctx.moveTo(Math.cos(angle)*(maxRadius+2), Math.sin(angle)*(maxRadius+2));
         ctx.lineTo(Math.cos(angle)*(maxRadius+8), Math.sin(angle)*(maxRadius+8));
         ctx.strokeStyle = "rgba(0,255,209,0.4)";
         ctx.stroke();
      }
      ctx.restore();
      
      // Animated Data Polygon
      let progress = (now - startTime) / duration;
      if (progress > 1) progress = 1;
      const eased = easeOutCubic(progress);
      
      ctx.beginPath();
      const points = [];
      hoveredAxis = -1;
      
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
        const currentVal = axes[i].val * eased;
        const r = maxRadius * (currentVal / 100);
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        points.push({x: px, y: py, val: axes[i].val, label: axes[i].label});
        
        if (i === 0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
        
        // Detect hover
        const dist = Math.sqrt((mouse.x - px)**2 + (mouse.y - py)**2);
        if (dist < 15) hoveredAxis = i;
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(0,255,209,0.08)";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,255,209,0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Draw Vertices
      for (let i = 0; i < 6; i++) {
        const p = points[i];
        const isHovered = i === hoveredAxis;
        ctx.beginPath();
        ctx.arc(p.x, p.y, isHovered ? 6 : 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,209,1)";
        ctx.shadowBlur = isHovered ? 12 : 8;
        ctx.shadowColor = "rgba(0,255,209,0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      // Rotating scan line
      ctx.save();
      ctx.translate(cx, cy);
      const scanAngle = timeSecs * 60 * (Math.PI / 180); // 1deg per frame at 60fps = 60deg/sec
      ctx.rotate(scanAngle);
      
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.lineTo(0, -maxRadius);
      const scanGrad = ctx.createLinearGradient(0,0, 0, -maxRadius);
      scanGrad.addColorStop(0, "rgba(0,255,209,0.4)");
      scanGrad.addColorStop(1, "transparent");
      ctx.strokeStyle = scanGrad;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Sub-sector fill behind scanline
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.arc(0, 0, maxRadius, -Math.PI/2 - 0.2, -Math.PI/2);
      ctx.closePath();
      ctx.fillStyle = "rgba(0,255,209,0.02)";
      ctx.fill();
      
      ctx.restore();
      
      // Draw tooltip if hovered
      if (hoveredAxis !== -1) {
        const p = points[hoveredAxis];
        ctx.fillStyle = "rgba(10, 21, 32, 0.9)"; // surface-2 approx
        ctx.strokeStyle = "rgba(0,255,209,0.5)";
        ctx.lineWidth = 1;
        const text = `${p.label}: ${Math.round(p.val * eased)}%`;
        const textW = ctx.measureText(text).width;
        ctx.fillRect(p.x - textW/2 - 8, p.y - 30, textW + 16, 20);
        ctx.strokeRect(p.x - textW/2 - 8, p.y - 30, textW + 16, 20);
        
        ctx.fillStyle = "rgba(0,255,209,1)";
        ctx.fillText(text, p.x, p.y - 20);
      }
    };
    
    rafId = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="noise bg-[var(--surface-2)] border border-[var(--border)] p-6 md:p-8 rounded-[4px] relative lg:col-span-3 flex flex-col items-center justify-center">
      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <SectionLabel label="SKILL MATRIX / 04.1" />
      </div>
      <canvas ref={canvasRef} width={340} height={280} className="mt-8 scale-90 md:scale-100" />
    </div>
  );
}
