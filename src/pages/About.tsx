import VideoBackground from "@/components/VideoBackground";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import SectionDivider from "@/components/SectionDivider";

const About = () => {
  return (
    <div className="relative min-h-screen">
      <VideoBackground />
      <Header />
      <div className="pt-24 pb-12 relative z-10 isolate">
        <AboutSection />
      </div>
    </div>
  );
};

export default About;

