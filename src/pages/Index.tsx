import VideoBackground from "@/components/VideoBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SectionDivider from "@/components/SectionDivider";
// import ChatBot from "@/components/ChatBot"; // Temporarily disabled - will add back later with Supabase

const Index = () => {
  return (
    <div className="relative">
      <VideoBackground />
      <Header />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <ProjectsSection />
      {/* <ChatBot /> */}
    </div>
  );
};

export default Index;
