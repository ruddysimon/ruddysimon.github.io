const SERIF = '"Newsreader", Georgia, serif';

const paragraphs = [
  "My name is Ruddy Simonpour, and I am a Data Scientist at Rivo Holdings. I design, train, and deploy supervised machine learning systems that support lending decisions and financial services. My work covers every stage of model development — data engineering, feature design, model training and evaluation, API integration, and production deployment.",
  "I earned my Bachelor's degree in Mechanical Engineering from Azad University (IAU) in Iran, and later completed my Master's in Data Science at the University of San Diego.",
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
