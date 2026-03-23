import { Github, Linkedin, Mail } from "lucide-react";
import { meta } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-[var(--border)] h-auto md:h-20 py-6 md:py-0 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
      <div className="font-mono text-xs text-muted">
        © {new Date().getFullYear()} {meta.name}
      </div>
      
      <div className="font-mono text-xs text-muted hidden md:block">
        {meta.role} · Nashik, India
      </div>

      <div className="flex gap-5 items-center">
        <a href={`https://${meta.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href="https://github.com/rushikesh-bhatjire" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
          <Github className="w-4 h-4" />
        </a>
        <a href={`mailto:${meta.email}`} className="text-muted hover:text-accent transition-colors">
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
}
