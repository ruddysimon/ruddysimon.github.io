import { useViewportFade } from "@/hooks/use-viewport-fade";

const ExperienceSection = () => {
  const { ref, opacity } = useViewportFade();

  const experiences = [
    {
      title: "Data Scientist",
      company: "Rivo Holdings LLC",
      location: "San Diego, CA",
      period: "Mar 2025 – Present",
      logo: "/rivo.jpeg",
      description: "I build and deploy machine learning systems that automate decision making across our platform. I designed a full stack application using React, Next.js, and Flask, supported by hybrid models such as XGBoost, CatBoost, and Random Forest to predict risk and improve accuracy. I improved model performance through systematic tuning and added strong interpretability techniques that allow the business to trust and understand predictions. I built a real time machine learning pipeline that evaluates incoming applications and pushes updated risk scores directly into our CRM through API integrations. I maintain ongoing performance oversight through Tableau dashboards that highlight drift, shifts in customer behavior, and any patterns of misclassification, which helps keep the models reliable in production.",
    },
    {
      title: "Data Analyst I",
      company: "Rivo Holdings LLC",
      location: "San Diego, CA",
      period: "Feb 2024 – Mar 2025",
      logo: "/rivo.jpeg",
      description: "Automated cross-department data pipelines and built Tableau dashboards connected to SQL stored procedures. Created an early-warning system to flag critical data patterns and clean noisy model inputs. Helped speed up analytics and reporting across the company by integrating ML insights into daily operations.",
    },
    {
      title: "Data Analyst",
      company: "University of San Diego",
      location: "San Diego, CA",
      period: "Nov 2023 – Jun 2024",
      logo: "/usd%20.png",
      description: "Built an AI chatbot for the Computer Engineering Department using LangChain + OpenAI, integrated with Slack. Developed the knowledge base in Salesforce with embeddings for smarter, context-aware answers. Used Azure AI Studio to fine-tune models and improve query accuracy for 500+ students and staff.",
    },
    {
      title: "AI / Data Analyst Intern",
      company: "City of Palo Alto",
      location: "Palo Alto, CA",
      period: "Sep 2023 – Nov 2023",
      logo: "/palo-alto.jpeg",
      description: "Helped the team develop data-to-LLM integrations to improve information retrieval. Cleaned and optimized the knowledge base for more reliable responses. Used Python to analyze, structure, and automate data pipelines that supported council decision-making.",
    },
  ];

  return (
    <section ref={ref} id="experience" className="flex items-center justify-center p-8 py-16 transition-opacity duration-300" style={{ opacity }}>
      <div className="max-w-4xl w-full">
        <div className="relative">
          {/* Outline border with gradient effect */}
          <div 
            className="absolute inset-0 rounded-xl border-2"
            style={{ 
              borderColor: 'hsla(45, 25%, 95%, 0.6)',
              boxShadow: '0 0 40px hsla(45, 25%, 95%, 0.35)',
            }}
          />
          
          {/* Content container */}
          <div 
            className="relative p-8 md:p-12 rounded-xl"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h2 className="text-2xl md:text-3xl font-medium tracking-wide mb-12" style={{ color: 'hsl(45, 25%, 95%)' }}>Experience</h2>
            
            <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="border-l-2 pl-6 pb-8 last:pb-0" style={{ borderColor: 'hsl(180, 45%, 45%)' }}>
              <div className="flex items-center gap-3 mb-2">
                {exp.logo && (
                  <img 
                    src={exp.logo} 
                    alt={`${exp.company} logo`}
                    className="w-8 h-8 object-contain rounded"
                  />
                )}
                <div>
                  <h3 className="text-lg md:text-xl font-semibold" style={{ color: 'hsl(45, 25%, 95%)' }}>{exp.title}</h3>
                  <p className="text-sm font-normal mt-0.5" style={{ color: 'hsl(180, 50%, 60%)' }}>
                    {exp.company} • {exp.location}
                  </p>
                </div>
              </div>
              <p className="text-xs font-normal mt-1 mb-3" style={{ color: 'hsl(45, 20%, 75%)' }}>{exp.period}</p>
              <p className="text-sm md:text-base leading-relaxed font-normal" style={{ color: 'hsl(45, 30%, 85%)' }}>
                {exp.description}
              </p>
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
