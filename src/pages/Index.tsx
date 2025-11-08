import VideoBackground from "@/components/VideoBackground";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";

const Index = () => {
  return (
    <div className="relative">
      <VideoBackground />
      <HeroSection />
      <AboutSection />
      <ResumeSection />
    </div>
  );
};

export default Index;
