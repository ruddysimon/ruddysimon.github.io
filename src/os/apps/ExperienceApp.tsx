const SERIF = '"Newsreader", Georgia, serif';

const CURRENT_FOCUS = [
  "Designing and deploying ML systems that automate lending and risk decisions at Rivo Holdings.",
  "Maintaining production model health with Tableau drift + misclassification dashboards.",
  "Exploring LangChain + retrieval pipelines for internal LLM tooling.",
];

type Entry = {
  title: string;
  company: string;
  employment: string;
  period: string;
  duration: string;
  location: string;
  mode: string;
  logo: string;
  current?: boolean;
  description: string;
};

const TIMELINE: Entry[] = [
  {
    title: "Data Scientist",
    company: "Rivo Holdings LLC",
    employment: "Full-time",
    period: "Mar 2025 – Present",
    duration: "1 yr 2 mos",
    location: "San Diego, CA",
    mode: "Hybrid",
    logo: "/rivo.jpeg",
    current: true,
    description:
      "Build and deploy ML systems that automate decision-making across the platform. Designed a full-stack app (React, Next.js, Flask) backed by hybrid XGBoost / CatBoost / Random Forest models to predict risk. Monitor drift and misclassification with Tableau dashboards so the models stay trustworthy in production.",
  },
  {
    title: "Data Analyst I",
    company: "Rivo Holdings LLC",
    employment: "Full-time",
    period: "Feb 2024 – Mar 2025",
    duration: "1 yr 2 mos",
    location: "San Diego, CA",
    mode: "On-site",
    logo: "/rivo.jpeg",
    description:
      "Automated cross-department data pipelines and built Tableau dashboards on top of SQL stored procedures. Created an early-warning system to flag critical data patterns and clean noisy model inputs.",
  },
  {
    title: "Data Analyst",
    company: "University of San Diego",
    employment: "Part-time",
    period: "Nov 2023 – Jun 2024",
    duration: "8 mos",
    location: "San Diego, CA",
    mode: "On-site",
    logo: "/usd%20.png",
    description:
      "Built an AI chatbot for the Computer Engineering Department using LangChain + OpenAI, integrated with Slack. Developed the knowledge base in Salesforce with embeddings for smarter, context-aware answers.",
  },
  {
    title: "AI / Data Analyst Intern",
    company: "City of Palo Alto",
    employment: "Internship",
    period: "Sep 2023 – Nov 2023",
    duration: "3 mos",
    location: "Palo Alto, CA",
    mode: "Hybrid",
    logo: "/palo-alto.jpeg",
    description:
      "Developed data-to-LLM integrations to improve information retrieval. Cleaned and optimized the knowledge base for more reliable responses. Used Python to analyze, structure, and automate data pipelines that supported council decision-making.",
  },
];

const ink = "hsl(var(--ink))";
const inkSoft = "hsl(var(--ink-soft))";
const border = "1px solid hsl(var(--ink) / 0.18)";
const subtleBg = "hsl(var(--cream-soft))";

export default function ExperienceApp() {
  return (
    <div className="px-8 py-7 max-w-[760px] mx-auto" style={{ color: ink, fontFamily: SERIF }}>
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "34px",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
        }}
      >
        Experience
      </h1>
      <p
        className="mt-1 mb-6"
        style={{ fontFamily: SERIF, fontSize: "14px", color: inkSoft }}
      >
        A detailed timeline of my experience, current focus, and professional growth.
      </p>

      {/* Current focus */}
      <Section label="CURRENT FOCUS">
        <ul className="list-none space-y-2 pl-0">
          {CURRENT_FOCUS.map((item, i) => (
            <li
              key={i}
              className="flex gap-2.5"
              style={{ fontFamily: SERIF, fontSize: "14px", lineHeight: 1.55 }}
            >
              <span style={{ color: ink, marginTop: "1px" }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Career timeline */}
      <Section label="CAREER TIMELINE">
        <div className="flex flex-col gap-4">
          {TIMELINE.map((exp, i) => (
            <article
              key={i}
              className="relative flex gap-4 items-start p-3"
              style={{ background: "hsl(var(--surface))", border: border }}
            >
              <img
                src={exp.logo}
                alt={exp.company}
                className="shrink-0 object-contain"
                style={{ width: "56px", height: "56px" }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontSize: "17px",
                      lineHeight: 1.25,
                      color: ink,
                    }}
                  >
                    {exp.title}
                    <span style={{ color: inkSoft, fontWeight: 400 }}>
                      {"  "}·{"  "}{exp.company} · {exp.employment}
                    </span>
                  </h3>
                  {exp.current && <CurrentBadge />}
                </div>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontSize: "13px",
                    color: inkSoft,
                    marginTop: "2px",
                  }}
                >
                  {exp.period} · {exp.duration}
                </p>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontSize: "13px",
                    color: inkSoft,
                    marginTop: "1px",
                  }}
                >
                  {exp.location} · {exp.mode}
                </p>
                <p
                  className="mt-2.5"
                  style={{
                    fontFamily: SERIF,
                    fontSize: "14px",
                    lineHeight: 1.55,
                    color: ink,
                  }}
                >
                  {exp.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section
      className="mb-5"
      style={{ background: subtleBg, border: border, padding: "16px 18px" }}
    >
      <div
        className="mb-3"
        style={{
          fontFamily: SERIF,
          fontSize: "11px",
          letterSpacing: "0.14em",
          color: inkSoft,
        }}
      >
        {label}
      </div>
      {children}
    </section>
  );
}

function CurrentBadge() {
  return (
    <span
      style={{
        fontFamily: SERIF,
        fontSize: "11px",
        padding: "1px 8px",
        background: "hsl(var(--cream))",
        border: "1px solid hsl(var(--ink) / 0.3)",
        color: "hsl(var(--ink))",
        letterSpacing: "0.02em",
      }}
    >
      Current
    </span>
  );
}
