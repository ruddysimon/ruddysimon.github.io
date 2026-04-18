const SERIF = '"Newsreader", Georgia, serif';

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

const ink = "hsl(var(--ink))";
const inkSoft = "hsl(var(--ink-soft))";

export default function BooksApp() {
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
        Library
      </h1>
      <p
        className="mt-1 mb-6"
        style={{ fontFamily: SERIF, fontSize: "14px", color: inkSoft }}
      >
        Currently reading and often revisiting.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {books.map((book, i) => (
          <article
            key={i}
            className="p-4"
            style={{
              background: "hsl(var(--surface))",
              border: "1px solid hsl(var(--ink) / 0.18)",
            }}
          >
            <div className="w-full mb-4 overflow-hidden relative" style={{ paddingBottom: "110%" }}>
              <img
                src={book.imageUrl}
                alt={book.title}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>

            <h3
              style={{
                fontFamily: SERIF,
                fontWeight: 400,
                fontSize: "17px",
                lineHeight: 1.25,
                color: ink,
              }}
            >
              {book.title}
            </h3>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: "13px",
                color: inkSoft,
                marginTop: "2px",
              }}
            >
              by {book.author}
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
              {book.description}
            </p>

            {book.websiteUrl && (
              <a
                href={book.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3"
                style={{
                  fontFamily: SERIF,
                  fontSize: "13px",
                  color: ink,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Download free PDF ↗
              </a>
            )}

            <div
              className="flex flex-wrap gap-1.5 mt-4 pt-3"
              style={{ borderTop: "1px solid hsl(var(--ink) / 0.12)" }}
            >
              {book.keyTopics.map((t) => (
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
          </article>
        ))}
      </div>
    </div>
  );
}
