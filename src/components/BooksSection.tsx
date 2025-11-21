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

  const books: Book[] = [
    {
      title: "An Introduction to Statistical Learning",
      author: "Gareth James, Daniela Witten, Trevor Hastie, Rob Tibshirani",
      description: "A broad and accessible introduction to statistical learning methods. This book provides a less technical treatment of key topics in statistical learning, making it perfect for anyone who wishes to use contemporary tools for data analysis. Available for free download in both R and Python editions.",
      imageUrl: "/ISLP_cover.webp",
      websiteUrl: "https://www.statlearning.com/",
      keyTopics: ["Statistical Learning", "Supervised Learning", "Unsupervised Learning", "Regression", "Classification"]
    },
    {
      title: "Natural Language Processing with Transformers",
      author: "Lewis Tunstall, Leandro von Werra, Thomas Wolf",
      description: "A comprehensive guide to building NLP applications with transformer models. This book covers everything from the fundamentals of transformers to advanced techniques for fine-tuning and deploying models. Learn how to use Hugging Face transformers to solve real-world NLP problems.",
      imageUrl: "/nlp_cover.jpeg",
      keyTopics: ["NLP", "Transformers", "Deep Learning", "Hugging Face", "BERT", "GPT"]
    }
  ];

  return (
    <section ref={ref} id="books" className="flex items-center justify-center p-8 pt-32 pb-16 min-h-screen">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          {books.map((book, index) => (
            <div key={index} className="relative w-full max-w-md mx-auto">
              {/* Outline border with gradient effect */}
              <div 
                className="absolute inset-0 rounded-xl border-2"
                style={{ 
                  borderColor: 'hsla(45, 25%, 95%, 0.6)',
                  boxShadow: '0 0 40px hsla(45, 25%, 95%, 0.35)',
                }}
              />
              
              {/* Content container */}
              <div 
                className="relative p-6 rounded-xl"
                style={{ 
                  backgroundColor: 'transparent',
                }}
              >
                {/* Book Cover */}
                <AspectRatio
                  ratio={2 / 3}
                  className="w-full mb-4 rounded-xl overflow-hidden"
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
                        <div className="text-6xl mb-2" style={{ color: 'hsl(45, 30%, 85%)' }}>📚</div>
                        <p className="text-sm" style={{ color: 'hsl(45, 30%, 85%)' }}>Book Cover</p>
                      </div>
                    </div>
                  )}
                </AspectRatio>

                {/* Book Info */}
                <h3 className="text-xl md:text-2xl font-semibold mb-2" style={{ color: 'hsl(45, 25%, 95%)' }}>
                  {book.title}
                </h3>
                <p className="text-sm mb-4 font-medium" style={{ color: 'hsl(45, 30%, 85%)' }}>
                  by {book.author}
                </p>
                <p 
                  className="text-sm md:text-base leading-relaxed mb-4 font-normal" 
                  style={{ color: 'hsl(45, 30%, 85%)' }}
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
                      style={{ color: 'hsl(180, 50%, 60%)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'hsl(180, 50%, 70%)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'hsl(180, 50%, 60%)'}
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
                        backgroundColor: 'hsla(45, 25%, 95%, 0.2)',
                        color: 'hsl(45, 30%, 85%)',
                        border: '1px solid hsla(45, 25%, 95%, 0.3)'
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSection;

