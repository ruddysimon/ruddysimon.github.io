import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const books = [
  {
    title: "An Introduction to Statistical Learning",
    author: "James, Witten, Hastie, Tibshirani",
    description:
      "A broad and accessible introduction to statistical learning. Less-technical treatment of the key topics — perfect for anyone who wants to use contemporary tools for data analysis. Free download, R and Python editions.",
    imageUrl: "/ISLP_cover.webp",
    websiteUrl: "https://www.statlearning.com/",
    keyTopics: ["Stat Learning", "Supervised", "Unsupervised", "Regression"],
  },
  {
    title: "NLP with Transformers",
    author: "Tunstall, von Werra, Wolf",
    description:
      "A comprehensive guide to building NLP apps with transformer models. Everything from the fundamentals to fine-tuning and deploying. Strong on Hugging Face end-to-end.",
    imageUrl: "/nlp_cover.jpeg",
    keyTopics: ["NLP", "Transformers", "Deep Learning", "BERT", "GPT"],
  },
];

export default function BooksApp() {
  return (
    <div className="p-8 md:p-10">
      <div className="flex items-center gap-2 mb-4 text-xs text-ink-soft">
        <span className="chip-os">~/library</span>
      </div>
      <h1 className="text-3xl md:text-4xl mb-6 leading-tight">
        On the <span className="text-accent">shelf.</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {books.map((book, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 + i * 0.08 }}
            className="border border-ink/25 rounded-sm p-4 bg-cream-soft"
          >
            <div className="w-full mb-3 rounded-sm overflow-hidden border border-ink/20 bg-surface relative" style={{ paddingBottom: "120%" }}>
              <div className="absolute inset-0">
                {book.imageUrl ? (
                  <img src={book.imageUrl} alt={book.title} className="h-full w-full object-contain" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-accent/20 text-4xl">📚</div>
                )}
              </div>
            </div>
            <h3 className="text-base font-semibold leading-tight mb-1">{book.title}</h3>
            <p className="text-xs text-accent mb-2">by {book.author}</p>
            <p className="text-xs leading-relaxed text-ink-soft mb-3">{book.description}</p>
            {book.websiteUrl && (
              <a
                href={book.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline mb-3"
              >
                Download free PDF <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <div className="flex flex-wrap gap-1 pt-3 border-t border-ink/10">
              {book.keyTopics.map((t) => (
                <span key={t} className="chip-os">{t}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
