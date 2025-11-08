import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ResumeSection = () => {
  return (
    <section id="resume" className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="rounded-2xl bg-card border border-border backdrop-blur-md p-8 md:p-12" style={{ backgroundColor: 'hsl(var(--glass-background))' }}>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Resume</h2>
          </div>
          
          <p className="text-muted-foreground mb-8">
            Download my resume to learn more about my experience, skills, and achievements in data science.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a href="/resume.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              className="border-border hover:bg-secondary"
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" />
                View Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
