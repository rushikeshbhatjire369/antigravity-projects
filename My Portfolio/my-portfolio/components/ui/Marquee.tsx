import { cn } from "@/lib/utils";
import { Fragment } from "react";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden flex flex-row", className)}>
      <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused] w-max items-center">
        {/* Triplicating for seamless loop */}
        {[...items, ...items, ...items].map((item, i) => (
          <Fragment key={i}>
            <span className="font-display font-bold text-2xl md:text-3xl uppercase text-gradient-cyan">
              {item}
            </span>
            <span className="text-[var(--border-active)] mx-6 md:mx-10 text-xl">·</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
