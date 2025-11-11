import { useViewportFade } from "@/hooks/use-viewport-fade";

const AboutSection = () => {
  const { ref, opacity } = useViewportFade();

  return (
    <section ref={ref} id="about" className="flex items-center justify-center p-8 py-16 transition-opacity duration-300" style={{ opacity }}>
      <div className="max-w-4xl w-full">
        <div className="flex items-center gap-2 mb-8">
          <h2 className="text-2xl md:text-3xl font-medium tracking-wide" style={{ color: 'hsl(45, 25%, 95%)' }}>About Me</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm md:text-base leading-relaxed font-normal" style={{ color: 'hsl(45, 30%, 85%)' }}>
            My name is Ruddy Simonpour, and I'm currently working as a Data Scientist at Rivo Holdings. I design, train, and deploy machine learning models. My work spans model development, API integration, and end-to-end automation — from data pipelines to production environments.
          </p>
          
          <p className="text-sm md:text-base leading-relaxed font-normal" style={{ color: 'hsl(45, 30%, 85%)' }}>
            I earned my Bachelor's degree in Mechanical Engineering from Azad University (IAU) in Iran, and later completed my Master's in Data Science at the University of San Diego.
          </p>
          
          <p className="text-sm md:text-base leading-relaxed font-normal" style={{ color: 'hsl(45, 30%, 85%)' }}>
            During my internship with the City of Palo Alto, I helped the team develop AI-driven agentic systems using LangChain and LlamaIndex to automate and optimize internal workflows. That experience sparked my deeper interest in AI infrastructure and how intelligent systems can streamline complex operations.
          </p>
          
          <p className="text-sm md:text-base leading-relaxed font-normal" style={{ color: 'hsl(45, 30%, 85%)' }}>
            Outside of work, I always dedicate time to my health and personal growth. I focus on improving both my body and mind, often reading new articles about health and science to understand how we can live smarter and healthier and I try to apply those ideas in my daily life. Exercise is non-negotiable for me; I train regularly, and sometimes play soccer or go hiking. The books I read aren't limited to data science or machine learning; I'm also interested in philosophy, big history, futurism, and speculative topics.
          </p>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;