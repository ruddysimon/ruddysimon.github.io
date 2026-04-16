import { motion } from "framer-motion";

const projects = [
  {
    badge: "Flagship",
    title: "Modeling & automation",
    description:
      "A full-stack ML product that blends automation, rule-based logic, and NLP modeling to bring consistency to default-rate predictions and streamline loan processing. Identifying payroll deposits from raw transaction text is one of the toughest problems in financial data — inconsistent across banks, and often overlapping with other recurring transactions.",
    description2:
      "I developed a BERT-based NLP model trained on large payroll datasets to detect payroll strings, paired with an automated logic layer that verifies pay frequency and filters false positives. The pipeline lands at 85–90% accuracy, cutting manual review time and giving sales and underwriting a faster, more reliable view of a customer's financial health.",
    tags: ["BERT", "NLP", "Python", "XGBoost", "Flask"],
  },
];

export default function ProjectsApp() {
  return (
    <div className="p-8 md:p-10">
      <div className="flex items-center gap-2 mb-4 text-xs text-ink-soft">
        <span className="chip-os">~/projects</span>
      </div>
      <h1 className="text-3xl md:text-4xl mb-6 leading-tight">
        The <span className="text-accent">work.</span>
      </h1>

      <div className="space-y-5">
        {projects.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="border border-ink/25 rounded-sm p-5 md:p-6 bg-cream-soft relative"
          >
            <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
              <span className="chip-os bg-accent/25">{p.badge}</span>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-ink/10 text-ink border border-ink/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="text-xl md:text-2xl text-accent leading-tight mb-4 font-semibold">
              {p.title}
            </h3>
            <div className="space-y-3 max-w-2xl">
              <p className="text-sm leading-relaxed text-ink-soft">{p.description}</p>
              <p className="text-sm leading-relaxed text-ink-soft">{p.description2}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
