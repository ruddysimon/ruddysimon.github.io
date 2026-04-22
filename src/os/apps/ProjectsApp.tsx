const SERIF = '"Newsreader", Georgia, serif';

type Project = {
  badge: string;
  title: string;
  paragraphs: string[];
  tags: string[];
};

const projects: Project[] = [
  {
    badge: "Flagship",
    title: "Real-time XGBoost credit risk model",
    paragraphs: [
      "An end-to-end credit risk model powering underwriting decisions in real time. I trained an XGBoost classifier on application, bureau, and transaction-level features, tuned it with Optuna across hundreds of trials, and wired it into an in-house ML platform with a Flask API and a React frontend.",
      "Compared to the previous model, precision and recall both improved by ~15%, and default rates dropped from 15% to 12%. Out-of-the-box feature engineering — digging into customer behavior and journey patterns — consistently added another 2–3% per training cycle.",
    ],
    tags: ["XGBoost", "Optuna", "Python", "Flask", "React", "Azure"],
  },
  {
    badge: "NLP",
    title: "BERT-based transaction classifier",
    paragraphs: [
      "Raw bank transaction text is notoriously inconsistent — payroll deposits in particular overlap with other recurring flows and vary wildly across institutions. The old rule-based system couldn't keep up.",
      "I replaced it with a fine-tuned BERT model trained on a large, hand-curated payroll dataset, paired with a logic layer that verifies pay frequency and filters false positives. The pipeline lands at ~93–95% accuracy, cut manual review time, and gave sales and underwriting a much faster read on each customer's financial health.",
    ],
    tags: ["BERT", "NLP", "PyTorch", "Python", "Transformers"],
  },
  {
    badge: "In progress",
    title: "In-house LLM for underwriting",
    paragraphs: [
      "Leading the development of an LLM-based underwriting system that moves beyond rule-based logic. The goal: fine-tune an open-source model to reason over transaction-level data, customer behavior, and risk signals in a more contextual way — reducing manual effort and lowering underwriting costs.",
      "Current plan is to fine-tune a 7–8B parameter model (Mistral or LLaMA 3.1) with QLoRA. Inputs are structured around transaction data, and we're experimenting with having the model return a short reasoning trace alongside each prediction. A pilot is running on a subset of applications, benchmarked against existing underwriting workflows.",
    ],
    tags: ["LLM", "QLoRA", "Mistral", "LLaMA 3.1", "Fine-tuning"],
  },
  {
    badge: "Automation",
    title: "Loan decisioning pipeline",
    paragraphs: [
      "Built and automated a loan decisioning pipeline that evaluates every application against internal eligibility and risk criteria, routing only true edge cases to human analysts. The pipeline hits 92–95% accuracy and dramatically reduces analyst workload.",
      "Now extending this into an end-to-end automation layer for low-risk segment customers: applications flow through without manual underwriting, driven entirely by credit risk model outputs. Faster processing, lower operational cost, and a lending workflow that actually scales.",
    ],
    tags: ["Python", "Automation", "Flask", "SQL", "Azure"],
  },
];

const ink = "hsl(var(--ink))";
const inkSoft = "hsl(var(--ink-soft))";

export default function ProjectsApp() {
  return (
    <div
      className="px-8 py-7 max-w-[760px] mx-auto"
      style={{ color: ink, fontFamily: SERIF }}
    >
      <h1
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "34px",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
        }}
      >
        Projects
      </h1>
      <p
        className="mt-1 mb-6"
        style={{ fontFamily: SERIF, fontSize: "14px", color: inkSoft }}
      >
        Selected work and the thinking behind it.
      </p>

      <div className="flex flex-col gap-5">
        {projects.map((p, i) => (
          <article
            key={i}
            className="p-5"
            style={{
              background: "hsl(var(--surface))",
              border: "1px solid hsl(var(--ink) / 0.18)",
            }}
          >
            <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  color: inkSoft,
                }}
              >
                {p.badge.toUpperCase()}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: SERIF,
                      fontSize: "11px",
                      padding: "1px 8px",
                      background: "hsl(var(--cream))",
                      border: "1px solid hsl(var(--ink) / 0.22)",
                      color: ink,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "22px",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                color: ink,
              }}
            >
              {p.title}
            </h3>

            {p.paragraphs.map((para, j) => (
              <p
                key={j}
                className="mt-3"
                style={{
                  fontFamily: SERIF,
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: ink,
                }}
              >
                {para}
              </p>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}
