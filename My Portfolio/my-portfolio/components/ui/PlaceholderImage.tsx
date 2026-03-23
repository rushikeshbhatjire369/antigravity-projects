import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  label: string;
  className?: string;
}

export function PlaceholderImage({ label, className }: PlaceholderImageProps) {
  return (
    <div className={cn("border border-dashed border-[#333333] bg-surface flex items-center justify-center font-mono text-xs text-[#444444] uppercase tracking-widest", className)}>
      {label}
    </div>
  );
}
