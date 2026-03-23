import { cn } from "@/lib/utils";

interface SkillPillProps {
  label: string;
  className?: string;
}

export function SkillPill({ label, className }: SkillPillProps) {
  return (
    <span className={cn("border border-[var(--border-bright)] text-muted font-mono text-[11px] px-3 py-1 rounded-[4px] whitespace-nowrap", className)}>
      {label}
    </span>
  );
}
