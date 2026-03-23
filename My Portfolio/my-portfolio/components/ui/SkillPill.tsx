import { cn } from "@/lib/utils";

interface SkillPillProps {
  label: string;
  className?: string;
}

export function SkillPill({ label, className }: SkillPillProps) {
  return (
    <span className={cn("border border-[var(--border-bright)] text-[var(--text-muted)] font-mono text-[13px] px-3.5 py-1.5 md:py-2 rounded-[2px] whitespace-nowrap hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[rgba(0,255,209,0.06)] hover:shadow-[0_0_12px_rgba(0,255,209,0.2)] transition-all duration-200 cursor-default", className)}>
      {label}
    </span>
  );
}
