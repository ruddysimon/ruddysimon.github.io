import VideoBackground from "@/components/VideoBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResumeSection from "@/components/ResumeSection";
import SectionDivider from "@/components/SectionDivider";
import ChatBot from "@/components/ChatBot";

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
      <SectionDivider />
      <ResumeSection />
      <ChatBot />
    </div>
  );
};

export default Index;
