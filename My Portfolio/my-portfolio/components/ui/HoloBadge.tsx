"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HoloBadgeProps {
  label: string;
  className?: string; // Should specify w-16 h-16 or similar
}

export function HoloBadge({ label, className }: HoloBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 32, y: 32 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    
    // Max rotation ±15deg
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotateY(((x - cx) / cx) * 15);
    setRotateX(((cy - y) / cy) * 15);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let rafId: number;
    // For 64x64 canvas
    const size = 64;
    const cx = size / 2;
    const cy = size / 2;
    
    const draw = (time: number) => {
      rafId = requestAnimationFrame(draw);
      
      ctx.clearRect(0,0,size,size);
      
      // Center hexagon gradient background
      ctx.beginPath();
      for(let i=0; i<6; i++) {
        const a = (Math.PI/3)*i - Math.PI/2;
        const r = 24;
        const px = cx + Math.cos(a)*r;
        const py = cy + Math.sin(a)*r;
        if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
      }
      ctx.closePath();
      
      const grad = ctx.createLinearGradient(0,0, size, size);
      grad.addColorStop(0, "rgba(0,255,209,0.2)");
      grad.addColorStop(1, "rgba(139,92,246,0.2)");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(0,255,209,0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Concentric Rings
      const t = time / 1000;
      
      // Ring 1
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 30 * Math.PI/180); // 0.5deg * 60fps = 30deg/s
      ctx.beginPath();
      ctx.arc(0,0, 20, 0, Math.PI*1.5);
      ctx.strokeStyle = "rgba(0,255,209,0.6)";
      ctx.stroke();
      ctx.restore();
      
      // Ring 2
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-t * 18 * Math.PI/180);
      ctx.beginPath();
      ctx.arc(0,0, 16, 0, Math.PI*1.2);
      ctx.strokeStyle = "rgba(139,92,246,0.4)";
      ctx.stroke();
      ctx.restore();
      
      // Orbiting dots
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 60 * Math.PI/180);
      for(let i=0; i<6; i++) {
        const a = (Math.PI/3)*i;
        ctx.beginPath();
        ctx.arc(Math.cos(a)*22, Math.sin(a)*22, 1.5, 0, Math.PI*2);
        ctx.fillStyle = "rgba(0,255,209,0.8)";
        ctx.fill();
      }
      ctx.restore();
    };
    
    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div 
      ref={badgeRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn("relative group cursor-default shadow-lg", className)}
      style={ { perspective: "300px" } }
    >
      <div 
        className="w-full h-full bg-[#030910] border border-[rgba(0,255,209,0.3)] rounded-[4px] relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
        style={ {
          transform: isHovered ? `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.1)` : "rotateY(0) rotateX(0) scale(1)",
          transformStyle: "preserve-3d"
        } }
      >
        <canvas ref={canvasRef} width={64} height={64} className="pointer-events-none absolute inset-0 mix-blend-screen" />
        
        {/* Render actual image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={label} 
            alt="Certification Logo" 
            className="w-full h-full object-contain rounded-sm drop-shadow-[0_0_8px_rgba(0,255,209,0.3)] opacity-90 transition-all duration-300" 
            style={ { transform: "translateZ(10px)" } }
          />
        </div>
        
        {/* Specular highlight */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-200 z-20 mix-blend-screen"
            style={ {
              background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.2) 0%, transparent 40%)`
            } }
          />
        )}
      </div>
    </div>
  );
}
