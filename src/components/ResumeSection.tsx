import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
const ResumeSection = () => {
  return (
    <section id="resume" className="flex items-center justify-center p-8 py-16">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-8">Resume</h2>
        
        <div className="space-y-6">
          <p className="text-sm md:text-base leading-relaxed font-light text-foreground/80">
            Download my resume to learn more about my experience, skills, and qualifications.
          </p>
          
          <Button asChild variant="default" size="lg" className="gap-2">
            <a href="/resume.pdf" download>
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default ResumeSection;