import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <span className={cn("font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] mb-6 flex items-center gap-2", className)}>
      <span className="text-[var(--accent)] mr-2 font-mono">{"//"}</span>
      {label}
    </span>
  );
}
