import VideoBackground from "@/components/VideoBackground";
import Header from "@/components/Header";
import ExperienceSection from "@/components/ExperienceSection";
import SectionDivider from "@/components/SectionDivider";

const Experience = () => {
  return (
    <div className="relative min-h-screen">
      <VideoBackground />
      <Header />
      <div className="pt-24 pb-12 relative z-10">
        <ExperienceSection />
      </div>
    </div>
  );
};

export default Experience;

