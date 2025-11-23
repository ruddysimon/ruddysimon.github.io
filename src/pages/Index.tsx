import { useState } from "react";
import VideoBackground from "@/components/VideoBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NavigationCards from "@/components/NavigationCards";
import ProjectsSection from "@/components/ProjectsSection";
import SectionDivider from "@/components/SectionDivider";
import Sidebar from "@/components/Sidebar";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
// import ChatBot from "@/components/ChatBot"; // Temporarily disabled - will add back later with Supabase

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSectionChange = (section: string) => {
    // Toggle: if clicking the same section, close it
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="relative min-h-screen">
      <VideoBackground />
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <div className="md:ml-64 relative z-10 isolate">
        <Header />
        {!activeSection && (
          <HeroSection />
        )}
        {activeSection === 'about' && (
          <div className="flex items-center justify-center min-h-screen p-8">
            <div className="w-full max-w-4xl">
              <AboutSection />
            </div>
          </div>
        )}
        {activeSection === 'experience' && (
          <div className="flex items-center justify-center min-h-screen p-8">
            <div className="w-full max-w-4xl">
              <ExperienceSection />
            </div>
          </div>
        )}
        {activeSection === 'projects' && (
          <div className="flex items-center justify-center min-h-screen p-8">
            <div className="w-full max-w-4xl">
              <ProjectsSection />
            </div>
          </div>
        )}
        {/* <ChatBot /> */}
      </div>
    </div>
  );
};

export default Index;
