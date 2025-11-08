import ContactDropdown from "./ContactDropdown";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <ContactDropdown />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
