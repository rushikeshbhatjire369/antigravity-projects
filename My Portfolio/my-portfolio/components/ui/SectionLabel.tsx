import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <span className={cn("font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-4 block", className)}>
      {label}
    </span>
  );
}
