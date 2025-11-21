import BooksVideoBackground from "@/components/BooksVideoBackground";
import Header from "@/components/Header";
import BooksSection from "@/components/BooksSection";

const Books = () => {
  return (
    <div className="relative min-h-screen">
      <BooksVideoBackground />
      <Header />
      <div className="relative z-10">
        <BooksSection />
      </div>
    </div>
  );
};

export default Books;

