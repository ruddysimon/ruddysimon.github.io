import { motion } from "framer-motion";

const paragraphs = [
  "My name is Ruddy Simonpour, and I am a Data Scientist at Rivo Holdings. I design, train, and deploy supervised machine learning systems that support lending decisions and financial services. My work covers every stage of model development — data engineering, feature design, model training and evaluation, API integration, and production deployment.",
  "I earned my Bachelor's degree in Mechanical Engineering from Azad University (IAU) in Iran, and later completed my Master's in Data Science at the University of San Diego.",
  "Outside of work, I spend time on health and personal growth — training, hiking, soccer, and reading across philosophy, big history, futurism, and speculative science. The goal is always to live sharper and smarter.",
];

export default function AboutApp() {
  return (
    <div className="p-8 md:p-10 max-w-3xl">
      <div className="flex items-center gap-2 mb-4 text-xs text-ink-soft">
        <span className="chip-os">~/about.txt</span>
        <span>read-only</span>
      </div>
      <h1 className="text-3xl md:text-4xl mb-6 leading-tight">
        Ruddy Simonpour <span className="text-accent">— Data Scientist.</span>
      </h1>
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 + i * 0.08 }}
            className="text-sm md:text-[15px] leading-relaxed text-ink-soft"
          >
            {p}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
