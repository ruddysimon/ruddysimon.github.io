import { motion } from "framer-motion";

const experiences = [
  {
    title: "Data Scientist",
    company: "Rivo Holdings LLC",
    location: "San Diego, CA",
    period: "Mar 2025 – Present",
    logo: "/rivo.jpeg",
    description:
      "Build and deploy ML systems that automate decision-making across the platform. Designed a full-stack app (React, Next.js, Flask) backed by hybrid XGBoost / CatBoost / Random Forest models to predict risk. Monitor drift and misclassification with Tableau dashboards so the models stay trustworthy in production.",
  },
  {
    title: "Data Analyst I",
    company: "Rivo Holdings LLC",
    location: "San Diego, CA",
    period: "Feb 2024 – Mar 2025",
    logo: "/rivo.jpeg",
    description:
      "Automated cross-department data pipelines and built Tableau dashboards on top of SQL stored procedures. Created an early-warning system to flag critical data patterns and clean noisy model inputs.",
  },
  {
    title: "Data Analyst",
    company: "University of San Diego",
    location: "San Diego, CA",
    period: "Nov 2023 – Jun 2024",
    logo: "/usd%20.png",
    description:
      "Built an AI chatbot for the Computer Engineering Department using LangChain + OpenAI, integrated with Slack. Developed the knowledge base in Salesforce with embeddings for smarter, context-aware answers.",
  },
  {
    title: "AI / Data Analyst Intern",
    company: "City of Palo Alto",
    location: "Palo Alto, CA",
    period: "Sep 2023 – Nov 2023",
    logo: "/palo-alto.jpeg",
    description:
      "Developed data-to-LLM integrations to improve information retrieval. Cleaned and optimized the knowledge base for more reliable responses. Used Python to analyze, structure, and automate data pipelines that supported council decision-making.",
  },
];

export default function ExperienceApp() {
  return (
    <div className="p-8 md:p-10">
      <div className="flex items-center gap-2 mb-4 text-xs text-ink-soft">
        <span className="chip-os">~/experience</span>
      </div>
      <h1 className="text-3xl md:text-4xl mb-6 leading-tight">
        Track <span className="text-accent">record.</span>
      </h1>

      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.06 + i * 0.06 }}
            className="border border-ink/20 rounded-sm p-4 bg-cream-soft hover:border-accent transition-colors"
          >
            <div className="flex items-start gap-3 flex-wrap">
              {exp.logo && (
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="w-10 h-10 object-contain rounded-sm border border-ink/15 bg-surface p-1"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold leading-tight">{exp.title}</h3>
                <p className="text-xs text-accent mt-0.5">{exp.company} · {exp.location}</p>
                <p className="text-[10px] uppercase tracking-wider text-ink-soft mt-0.5">{exp.period}</p>
              </div>
            </div>
            <p className="mt-3 text-xs md:text-sm leading-relaxed text-ink-soft">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
