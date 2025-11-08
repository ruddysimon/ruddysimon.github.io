import { useState } from "react";
import { Mail, Linkedin, ChevronDown } from "lucide-react";

const ContactDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-sm font-light hover:text-primary transition-colors flex items-center gap-1"
      >
        Contact Me
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full mt-2 right-0 min-w-[200px] rounded-xl bg-background border border-border shadow-lg overflow-hidden z-50 animate-in slide-in-from-top-2"
        >
          <a
            href="mailto:ruddy.simonpour@gmail.com"
            className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
          >
            <Mail className="w-5 h-5 text-primary" />
            <span className="text-sm">Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/ruddysimon/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
          >
            <Linkedin className="w-5 h-5 text-primary" />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default ContactDropdown;
