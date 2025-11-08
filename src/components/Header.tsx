import ContactDropdown from "./ContactDropdown";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeClick = () => {
    window.open('/resume.pdf', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-foreground">
            Data Scientist
          </h1>
          <p className="text-sm font-light text-muted-foreground mt-1">
            Ruddy Simonpour
          </p>
        </div>
        
        <nav className="flex items-center gap-6">
          <ContactDropdown />
          
          <button
            onClick={handleResumeClick}
            className="px-4 py-2 text-sm font-light hover:text-primary transition-colors"
          >
            Resume
          </button>
          
          <button
            onClick={() => scrollToSection('about')}
            className="px-4 py-2 text-sm font-light hover:text-primary transition-colors"
          >
            About Me
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
