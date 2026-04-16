import { Download, FileText } from "lucide-react";

export default function ResumeApp() {
  return (
    <div className="p-8 md:p-10 flex flex-col gap-6">
      <div className="flex items-center gap-2 text-xs text-ink-soft">
        <span className="chip-os">~/resume.pdf</span>
      </div>

      <div className="border border-ink/25 rounded-sm p-6 bg-cream-soft max-w-xl">
        <FileText className="w-8 h-8 text-accent mb-3" />
        <h1 className="text-2xl md:text-3xl mb-3 leading-tight">
          Grab the <span className="text-accent">resume.</span>
        </h1>
        <p className="text-sm text-ink-soft leading-relaxed mb-5">
          Full experience, skills, and qualifications — one page, no fluff.
        </p>
        <a href="/Ruddy-Simonpour-Resume.pdf" download className="btn-os">
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </a>
      </div>

      <div className="text-xs text-ink-soft leading-relaxed">
        <span className="blink">▊</span> Tip: drag any window by its title bar.
      </div>
    </div>
  );
}
