import { meta } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-[rgba(1,5,8,0.98)] border-t border-[rgba(0,255,209,0.06)] h-auto md:h-16 py-6 md:py-0 px-8 flex items-center justify-center relative z-10 w-full text-center">
      <div className="font-mono text-[11px] tracking-[0.2em] text-[var(--text-dim)] uppercase">
        © {new Date().getFullYear()} {meta.name} — {meta.role} · Nashik, India
      </div>
    </footer>
  );
}
