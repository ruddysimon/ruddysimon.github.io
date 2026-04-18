const SERIF = '"Newsreader", Georgia, serif';

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

            <p
              className="mt-3"
              style={{
                fontFamily: SERIF,
                fontSize: "14px",
                lineHeight: 1.6,
                color: ink,
              }}
            >
              {p.description}
            </p>
            <p
              className="mt-3"
              style={{
                fontFamily: SERIF,
                fontSize: "14px",
                lineHeight: 1.6,
                color: ink,
              }}
            >
              {p.description2}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
