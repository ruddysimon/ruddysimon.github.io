import { useState, useEffect } from "react";
import { useViewportFade } from "@/hooks/use-viewport-fade";
import { X } from "lucide-react";

const NavigationCards = () => {
  const { ref, opacity } = useViewportFade();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isAboutOpen || isExperienceOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAboutOpen, isExperienceOpen]);

  return (
    <>
      <section 
        ref={ref} 
        className={`flex items-center justify-center p-8 pt-4 pb-12 transition-opacity duration-300 ${isAboutOpen || isExperienceOpen ? 'pointer-events-none' : ''}`}
        style={{ 
          opacity: (isAboutOpen || isExperienceOpen) ? 0 : opacity,
          zIndex: (isAboutOpen || isExperienceOpen) ? 0 : 'auto'
        }}
      >
        <div className="max-w-5xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
            {/* About Me Card */}
            <button 
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className="group cursor-pointer"
            >
              <div className="relative h-full">
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ 
                    background: 'linear-gradient(135deg, hsla(180, 50%, 60%, 0.2), hsla(180, 45%, 45%, 0.1))',
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)',
                  }}
                />
                
                {/* Outline border with gradient effect */}
                <div 
                  className="absolute inset-0 rounded-2xl border-2 transition-all duration-500 group-hover:border-opacity-100 group-hover:scale-[1.02]"
                  style={{ 
                    borderColor: 'hsla(180, 50%, 60%, 0.5)',
                    boxShadow: '0 0 30px hsla(180, 50%, 60%, 0.2), inset 0 0 30px hsla(180, 50%, 60%, 0.1)',
                  }}
                />
                
                {/* Content container */}
                <div 
                  className="relative p-10 md:p-14 rounded-2xl text-center transition-all duration-500 group-hover:scale-[1.03]"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <h2 
                    className="text-xl md:text-2xl font-bold tracking-wide transition-colors duration-300"
                    style={{ 
                      color: 'hsl(45, 25%, 95%)',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    About Me
                  </h2>
                </div>
              </div>
            </button>

            {/* Experience Card */}
            <button 
              onClick={() => setIsExperienceOpen(!isExperienceOpen)}
              className="group cursor-pointer"
            >
              <div className="relative h-full">
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{ 
                    background: 'linear-gradient(135deg, hsla(180, 50%, 60%, 0.2), hsla(180, 45%, 45%, 0.1))',
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)',
                  }}
                />
                
                {/* Outline border with gradient effect */}
                <div 
                  className="absolute inset-0 rounded-2xl border-2 transition-all duration-500 group-hover:border-opacity-100 group-hover:scale-[1.02]"
                  style={{ 
                    borderColor: 'hsla(180, 50%, 60%, 0.5)',
                    boxShadow: '0 0 30px hsla(180, 50%, 60%, 0.2), inset 0 0 30px hsla(180, 50%, 60%, 0.1)',
                  }}
                />
                
                {/* Content container */}
                <div 
                  className="relative p-10 md:p-14 rounded-2xl text-center transition-all duration-500 group-hover:scale-[1.03]"
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <h2 
                    className="text-xl md:text-2xl font-bold tracking-wide transition-colors duration-300"
                    style={{ 
                      color: 'hsl(45, 25%, 95%)',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    Experience
                  </h2>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* About Me Modal */}
      {isAboutOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAboutOpen(false);
            }
          }}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto z-[101]">
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
                  backgroundColor: 'transparent',
                }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-medium tracking-wide flex-1 text-center" style={{ color: 'hsl(45, 25%, 95%)' }}>About Me</h2>
                  <button
                    onClick={() => setIsAboutOpen(false)}
                    className="ml-4 p-2 rounded-lg transition-all duration-200 hover:bg-white/10"
                    style={{ color: 'hsl(45, 25%, 95%)' }}
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <p className="text-sm md:text-base leading-relaxed font-normal" style={{ color: 'hsl(45, 30%, 85%)' }}>
                    My name is Ruddy Simonpour, and I am a Data Scientist at Rivo Holdings. I design, train, and deploy supervised machine learning systems that support lending decisions and financial services. My work covers every stage of model development, including data engineering, feature design, model training and evaluation, API integration, and production deployment. I build automated pipelines, centralized services, and scalable backend architectures that connect machine learning models to real business workflows.
                  </p>
                  
                  <p className="text-sm md:text-base leading-relaxed font-normal" style={{ color: 'hsl(45, 30%, 85%)' }}>
                    I earned my Bachelor's degree in Mechanical Engineering from Azad University (IAU) in Iran, and later completed my Master's in Data Science at the University of San Diego.
                  </p>
                  
                  <p className="text-sm md:text-base leading-relaxed font-normal" style={{ color: 'hsl(45, 30%, 85%)' }}>
                    Outside of work, I always dedicate time to my health and personal growth. I focus on improving both my body and mind, often reading new articles about health and science to understand how we can live smarter and healthier and I try to apply those ideas in my daily life. Exercise is non-negotiable for me; I train regularly, and sometimes play soccer or go hiking. The books I read aren't limited to data science or machine learning; I'm also interested in philosophy, big history, futurism, and speculative topics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {isExperienceOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsExperienceOpen(false);
            }
          }}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto z-[101]">
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
                  backgroundColor: 'transparent',
                }}
              >
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl md:text-3xl font-medium tracking-wide flex-1 text-center" style={{ color: 'hsl(45, 25%, 95%)' }}>Experience</h2>
                  <button
                    onClick={() => setIsExperienceOpen(false)}
                    className="ml-4 p-2 rounded-lg transition-all duration-200 hover:bg-white/10"
                    style={{ color: 'hsl(45, 25%, 95%)' }}
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-8">
                  {[
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
                  ].map((exp, index) => (
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
        </div>
      )}
    </>
  );
};

export default NavigationCards;

