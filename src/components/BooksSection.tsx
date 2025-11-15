import { useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Book {
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
  websiteUrl?: string;
  keyTopics: string[];
}

const BooksSection = () => {
  const ref = useRef<HTMLElement>(null);

  const book: Book = {
    title: "An Introduction to Statistical Learning",
    author: "Gareth James, Daniela Witten, Trevor Hastie, Rob Tibshirani",
    description: "A broad and accessible introduction to statistical learning methods. This book provides a less technical treatment of key topics in statistical learning, making it perfect for anyone who wishes to use contemporary tools for data analysis. Available for free download in both R and Python editions.",
    imageUrl: "/ISLP_cover.webp",
    websiteUrl: "https://www.statlearning.com/",
    keyTopics: ["Statistical Learning", "Supervised Learning", "Unsupervised Learning", "Regression", "Classification"]
  };

  return (
    <section ref={ref} id="books" className="flex items-center justify-center p-8 pt-32 pb-16 min-h-screen">
      <div className="max-w-4xl w-full">
        <div className="flex justify-center">
          <div 
            className="group p-6 rounded-xl backdrop-blur-2xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl w-full max-w-md"
              style={{ 
                background: 'linear-gradient(to bottom, rgba(255, 245, 230, 0.65), rgba(230, 240, 255, 0.45))',
                borderColor: 'rgba(255, 255, 255, 0.35)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.15) inset',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
              {/* Book Cover */}
              <AspectRatio
                ratio={2 / 3}
                className="w-full mb-4 rounded-xl overflow-hidden border"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  borderColor: 'rgba(255, 255, 255, 0.35)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)'
                }}
              >
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={`${book.title} cover`}
                    className="h-full w-full object-contain md:object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="text-6xl mb-2" style={{ color: 'hsl(30, 30%, 50%)' }}>📚</div>
                      <p className="text-sm" style={{ color: 'hsl(30, 20%, 40%)' }}>Book Cover</p>
                    </div>
                  </div>
                )}
              </AspectRatio>

              {/* Book Info */}
              <h3 className="text-xl md:text-2xl font-semibold mb-2" style={{ color: 'rgba(20, 28, 35, 0.9)' }}>
                {book.title}
              </h3>
              <p className="text-sm mb-4 font-medium" style={{ color: 'rgba(20, 28, 35, 0.7)' }}>
                by {book.author}
              </p>
              <p 
                className="text-sm md:text-base leading-relaxed mb-4 font-normal" 
                style={{ color: 'rgba(20, 28, 35, 0.8)' }}
              >
                {book.description}
              </p>
              
              {/* Website Link */}
              {book.websiteUrl && (
                <div className="mb-4">
                  <a
                    href={book.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium transition-colors hover:underline"
                    style={{ color: 'rgba(0, 120, 135, 0.85)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(0, 140, 155, 1)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(0, 120, 135, 0.85)'}
                  >
                    Download Free PDF →
                  </a>
                </div>
              )}
              
              {/* Key Topics */}
              <div className="flex flex-wrap gap-2 mt-4">
                {book.keyTopics.map((topic, topicIndex) => (
                  <span
                    key={topicIndex}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.35)',
                      color: 'rgba(20, 28, 35, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.45)'
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksSection;

