import { useViewportFade } from "@/hooks/use-viewport-fade";
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
  const { ref, opacity } = useViewportFade();

  const books: Book[] = [
    {
      title: "Hands-On Machine Learning",
      author: "Aurélien Géron",
      description: "A comprehensive guide to machine learning concepts and practical implementation. This book covers everything from the fundamentals to advanced deep learning techniques, with hands-on examples using Python and popular libraries like Scikit-Learn, Keras, and TensorFlow.",
      keyTopics: ["Machine Learning", "Deep Learning", "TensorFlow", "Scikit-Learn", "Neural Networks"]
    },
    {
      title: "Python for Data Analysis",
      author: "Wes McKinney",
      description: "The definitive guide to data manipulation and analysis with Python. Learn how to use pandas, NumPy, and other essential tools for data wrangling, cleaning, and analysis. Perfect for data scientists and analysts working with structured data.",
      keyTopics: ["Pandas", "NumPy", "Data Wrangling", "Data Analysis", "Python"]
    },
    {
      title: "An Introduction to Statistical Learning",
      author: "Gareth James, Daniela Witten, Trevor Hastie, Rob Tibshirani",
      description: "A broad and accessible introduction to statistical learning methods. This book provides a less technical treatment of key topics in statistical learning, making it perfect for anyone who wishes to use contemporary tools for data analysis. Available for free download in both R and Python editions.",
      imageUrl: "/ISLP_cover.webp",
      websiteUrl: "https://www.statlearning.com/",
      keyTopics: ["Statistical Learning", "Supervised Learning", "Unsupervised Learning", "Regression", "Classification"]
    },
    {
      title: "Deep Learning",
      author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
      description: "The foundational textbook on deep learning. This comprehensive guide covers the mathematical foundations, practical algorithms, and applications of deep learning, making it essential reading for anyone serious about neural networks and AI.",
      keyTopics: ["Deep Learning", "Neural Networks", "AI", "Backpropagation", "Convolutional Networks"]
    },
    {
      title: "Pattern Recognition and Machine Learning",
      author: "Christopher M. Bishop",
      description: "A comprehensive introduction to pattern recognition and machine learning from a Bayesian perspective. This book covers probabilistic models, graphical models, and various machine learning algorithms with a strong mathematical foundation.",
      keyTopics: ["Pattern Recognition", "Bayesian Methods", "Probabilistic Models", "Graphical Models", "Machine Learning"]
    },
    {
      title: "Data Science from Scratch",
      author: "Joel Grus",
      description: "Learn data science fundamentals by building everything from scratch. This book teaches you the core concepts of data science, including statistics, probability, machine learning, and data visualization, all implemented in Python without relying on heavy libraries.",
      keyTopics: ["Data Science", "Statistics", "Probability", "Machine Learning", "Python"]
    }
  ];

  return (
    <section ref={ref} id="books" className="flex items-center justify-center p-8 pt-32 pb-16 min-h-screen transition-opacity duration-300" style={{ opacity }}>
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-xl backdrop-blur-2xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSection;

