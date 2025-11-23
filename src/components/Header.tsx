import { Mail, Linkedin, Github, FileText, Book } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useHeaderFade, useHeaderHide } from "@/hooks/use-viewport-fade";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Header = () => {
  const headerOpacity = useHeaderFade();
  const isHidden = useHeaderHide();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleResumeClick = () => {
    window.open('/Ruddy-Simonpour-Resume.pdf', '_blank');
  };

  return (
    <header 
      className="fixed top-0 right-0 z-50 p-4 md:p-6 transition-all duration-500 ease-in-out left-0 md:left-64" 
      style={{ 
        opacity: headerOpacity,
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div className={`flex items-center ${isHomePage ? 'justify-end' : 'justify-between'}`}>
        {/* Name and Title - Left Side (only show on non-home pages) */}
        {!isHomePage && (
          <Link 
            to="/" 
            className="cursor-pointer"
          >
            <h1 
              className="text-2xl md:text-3xl font-semibold transition-colors" 
              style={{ 
                color: 'hsl(45, 25%, 95%)',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(180, 50%, 60%)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(45, 25%, 95%)'}
            >
              Ruddy Simonpour
            </h1>
            <p 
              className="text-sm mt-1" 
              style={{ 
                color: 'hsl(45, 30%, 75%)',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Data Scientist
            </p>
          </Link>
        )}

        <nav className="flex items-center gap-2 md:gap-4">
          {/* LinkedIn */}
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-xl border-2"
              style={{ 
                borderColor: 'hsla(45, 25%, 95%, 0.6)',
                boxShadow: '0 0 40px hsla(45, 25%, 95%, 0.35)',
              }}
            />
            <div 
              className="relative px-2 py-2 md:px-4 md:py-3 rounded-xl"
              style={{ 
                backgroundColor: 'transparent',
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://www.linkedin.com/in/ruddysimon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
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
            </div>
          </div>

          {/* GitHub */}
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-xl border-2"
              style={{ 
                borderColor: 'hsla(45, 25%, 95%, 0.6)',
                boxShadow: '0 0 40px hsla(45, 25%, 95%, 0.35)',
              }}
            />
            <div 
              className="relative px-4 py-3 rounded-xl"
              style={{ 
                backgroundColor: 'transparent',
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://github.com/ruddysimon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
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
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-xl border-2"
              style={{ 
                borderColor: 'hsla(45, 25%, 95%, 0.6)',
                boxShadow: '0 0 40px hsla(45, 25%, 95%, 0.35)',
              }}
            />
            <div 
              className="relative px-4 py-3 rounded-xl"
              style={{ 
                backgroundColor: 'transparent',
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="mailto:ruddy.simonpour@gmail.com"
                    className="transition-colors"
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
          </div>

          {/* Books */}
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-xl border-2"
              style={{ 
                borderColor: 'hsla(45, 25%, 95%, 0.6)',
                boxShadow: '0 0 40px hsla(45, 25%, 95%, 0.35)',
              }}
            />
            <div 
              className="relative px-4 py-3 rounded-xl"
              style={{ 
                backgroundColor: 'transparent',
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/books"
                    className="transition-colors"
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
            </div>
          </div>

          {/* Resume */}
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-xl border-2"
              style={{ 
                borderColor: 'hsla(45, 25%, 95%, 0.6)',
                boxShadow: '0 0 40px hsla(45, 25%, 95%, 0.35)',
              }}
            />
            <div 
              className="relative px-4 py-3 rounded-xl"
              style={{ 
                backgroundColor: 'transparent',
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleResumeClick}
                    className="transition-colors border-0 bg-transparent p-0 flex items-center justify-center"
                    style={{ color: 'hsl(45, 25%, 95%)', appearance: 'none' }}
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
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
