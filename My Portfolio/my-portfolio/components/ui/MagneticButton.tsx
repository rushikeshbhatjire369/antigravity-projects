"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
}

export function MagneticButton({ children, className, onClick, href, target }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorLocal, setCursorLocal] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setPosition({
      x: (e.clientX - centerX) * 0.35,
      y: (e.clientY - centerY) * 0.35
    });

    // For background spotlight spotlight mapping (in percentages)
    setCursorLocal({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn("relative group", className)}
    >
      <Component
        href={href}
        target={target}
        onClick={onClick}
        animate={ { x: position.x, y: position.y } }
        transition={ {
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        } }
        className={cn(
          "block relative overflow-hidden z-10 transition-colors duration-300",
          "group-hover:border-[var(--accent)]/60"
        )}
      >
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none -z-10"
            style={ {
              background: `radial-gradient(circle at ${cursorLocal.x}% ${cursorLocal.y}%, rgba(0,255,209,0.08) 0%, transparent 60%)`
            } }
          />
        )}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {children}
        </div>
      </Component>
    </div>
  );
}
