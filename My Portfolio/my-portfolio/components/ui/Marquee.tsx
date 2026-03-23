import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden flex flex-row py-8", className)}>
      <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused] w-max">
        {/* Triplicating for seamless loop */}
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="font-display font-bold text-3xl md:text-4xl text-transparent [-webkit-text-stroke:1px_var(--border-bright)] mx-6 uppercase">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
