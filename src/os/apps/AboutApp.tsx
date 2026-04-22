const SERIF = '"Newsreader", Georgia, serif';

const paragraphs = [
  "My name is Ruddy Simonpour, and I am a Data Scientist at Rivo Holdings in San Diego. I design, train, and deploy machine learning systems that power underwriting and lending decisions — covering the full arc of model development, from data engineering and feature design to model training, API integration, and production deployment.",
  "My recent work centers on real-time credit risk modeling with XGBoost and Optuna, a BERT-based NLP classifier for noisy transaction data, and an in-progress LLM-based underwriting system built on a fine-tuned open-source model (Mistral / LLaMA 3.1 with QLoRA). Alongside the modeling work, I build the automation pipelines that let low-risk applications flow end-to-end without manual underwriting.",
  "I earned my Bachelor's in Mechanical Engineering from Azad University (IAU) in Iran, and my Master's in Applied Data Science at the University of San Diego. I'm AWS and Azure AI certified, and currently working through the Applied Generative AI program at Johns Hopkins.",
  "Outside of work, I spend time on health and personal growth — training, hiking, soccer, and reading across philosophy, big history, futurism, and speculative science. The goal is always to live sharper and smarter.",
];

export default function AboutApp() {
  return (
    <div
      className="px-8 py-7 max-w-[720px] mx-auto"
      style={{ color: "hsl(var(--ink))", fontFamily: SERIF }}
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
        Ruddy Simonpour
      </h1>
      <p
        className="mt-1 mb-6"
        style={{ fontFamily: SERIF, fontSize: "14px", color: "hsl(var(--ink-soft))" }}
      >
        Data Scientist
      </p>

      <div className="flex flex-col gap-4">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: 1.6,
              color: "hsl(var(--ink))",
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
