import { Mail, Linkedin, Github } from "lucide-react";

const links = [
  { label: "Email", value: "ruddy.simonpour@gmail.com", href: "mailto:ruddy.simonpour@gmail.com", icon: Mail },
  { label: "LinkedIn", value: "/in/ruddysimon", href: "https://www.linkedin.com/in/ruddysimon/", icon: Linkedin, external: true },
  { label: "GitHub", value: "@ruddysimon", href: "https://github.com/ruddysimon", icon: Github, external: true },
];

export default function ContactApp() {
  return (
    <div className="p-8 md:p-10 max-w-xl">
      <div className="flex items-center gap-2 mb-4 text-xs text-ink-soft">
        <span className="chip-os">~/contact</span>
      </div>
      <h1 className="text-3xl md:text-4xl mb-2 leading-tight">
        Say <span className="text-accent">hi.</span>
      </h1>
      <p className="text-sm text-ink-soft mb-6 leading-relaxed">
        Open to interesting data / ML problems and teams that ship.
      </p>

      <div className="space-y-2">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 p-3 border border-ink/20 rounded-sm bg-cream-soft hover:border-accent hover:bg-accent/10 transition-colors group"
            >
              <div className="w-8 h-8 rounded-sm bg-accent text-cream flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-ink-soft uppercase tracking-wide">{l.label}</div>
                <div className="text-sm text-ink group-hover:text-accent transition-colors truncate">{l.value}</div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
