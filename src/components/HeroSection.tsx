import ContactDropdown from "./ContactDropdown";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Data Scientist
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Transforming Data into Insights
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <ContactDropdown />
          
          <button
            onClick={() => scrollToSection('resume')}
            className="px-6 py-2.5 rounded-xl bg-transparent border border-border hover:bg-secondary transition-all duration-300 backdrop-blur-md"
          >
            Resume
          </button>
          
          <button
            onClick={() => scrollToSection('about')}
            className="px-6 py-2.5 rounded-xl bg-transparent border border-border hover:bg-secondary transition-all duration-300 backdrop-blur-md"
          >
            About Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
