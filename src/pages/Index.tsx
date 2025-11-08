import VideoBackground from "@/components/VideoBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="relative">
      <VideoBackground />
      <HeroSection />
      <AboutSection />
      <ResumeSection />
      <ChatBot />
    </div>
  );
};

export default Index;
