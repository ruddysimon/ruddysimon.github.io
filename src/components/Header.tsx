import { Mail, Linkedin, Github, FileText, Book } from "lucide-react";
import { Link } from "react-router-dom";
import { useHeaderFade, useHeaderHide } from "@/hooks/use-viewport-fade";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Header = () => {
  const headerOpacity = useHeaderFade();
  const isHidden = useHeaderHide();

  const handleResumeClick = () => {
    window.open('/Ruddy-Simonpour-Resume.pdf', '_blank');
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 p-6 transition-all duration-500 ease-in-out" 
      style={{ 
        opacity: headerOpacity,
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="cursor-pointer">
          <h1 className="text-2xl font-medium tracking-tight transition-colors" style={{ color: 'hsl(45, 25%, 95%)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(180, 50%, 60%)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(45, 25%, 95%)'}>
            Data Scientist
          </h1>
          <p className="text-sm font-normal mt-1" style={{ color: 'hsl(45, 30%, 85%)' }}>
            Ruddy Simonpour
          </p>
        </Link>
        
        <nav className="flex items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://www.linkedin.com/in/ruddysimon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-colors"
                  style={{ color: 'hsl(45, 25%, 95%)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(180, 50%, 60%)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(45, 25%, 95%)'}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent 
                side="bottom"
                style={{ 
                  backgroundColor: 'hsl(180, 45%, 45%)',
                  color: 'hsl(45, 25%, 95%)',
                  borderColor: 'hsl(180, 50%, 60%)'
                }}
              >
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/ruddysimon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-colors"
                  style={{ color: 'hsl(45, 25%, 95%)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(180, 50%, 60%)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(45, 25%, 95%)'}
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent 
                side="bottom"
                style={{ 
                  backgroundColor: 'hsl(180, 45%, 45%)',
                  color: 'hsl(45, 25%, 95%)',
                  borderColor: 'hsl(180, 50%, 60%)'
                }}
              >
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="mailto:ruddy.simonpour@gmail.com"
                  className="p-2 transition-colors"
                  style={{ color: 'hsl(45, 25%, 95%)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(180, 50%, 60%)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(45, 25%, 95%)'}
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent 
                side="bottom"
                style={{ 
                  backgroundColor: 'hsl(180, 45%, 45%)',
                  color: 'hsl(45, 25%, 95%)',
                  borderColor: 'hsl(180, 50%, 60%)'
                }}
              >
                <p>Email</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/books"
                className="p-2 transition-colors"
                style={{ color: 'hsl(45, 25%, 95%)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(180, 50%, 60%)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(45, 25%, 95%)'}
                aria-label="Books"
              >
                <Book className="w-5 h-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent 
              side="bottom"
              style={{ 
                backgroundColor: 'hsl(180, 45%, 45%)',
                color: 'hsl(45, 25%, 95%)',
                borderColor: 'hsl(180, 50%, 60%)'
              }}
            >
              <p>Books</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleResumeClick}
                className="p-2 transition-colors"
                style={{ color: 'hsl(45, 25%, 95%)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(180, 50%, 60%)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(45, 25%, 95%)'}
                aria-label="Resume"
              >
                <FileText className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent 
              side="bottom"
              style={{ 
                backgroundColor: 'hsl(180, 45%, 45%)',
                color: 'hsl(45, 25%, 95%)',
                borderColor: 'hsl(180, 50%, 60%)'
              }}
            >
              <p>Resume</p>
            </TooltipContent>
          </Tooltip>
        </nav>
      </div>
    </header>
  );
};

export default Header;
