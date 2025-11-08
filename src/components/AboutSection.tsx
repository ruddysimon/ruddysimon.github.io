const AboutSection = () => {
  return <section id="about" className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="flex items-center gap-2 mb-8">
          
          <h2 className="text-2xl md:text-3xl font-light tracking-wide">About Me</h2>
        </div>
        
        <div className="space-y-3 text-foreground/80">
          <p className="text-sm md:text-base leading-relaxed font-light">
            I'm a passionate data scientist with expertise in machine learning, statistical analysis, 
            and data visualization. With a strong foundation in mathematics and computer science, 
            I transform complex data into actionable insights.
          </p>
          
          <p className="text-sm md:text-base leading-relaxed font-light">
            My work focuses on developing innovative solutions using cutting-edge technologies 
            and methodologies. I'm experienced in Python, R, SQL, and various machine learning 
            frameworks including TensorFlow and scikit-learn.
          </p>
          
          <p className="text-sm md:text-base leading-relaxed font-light">
            I'm always eager to tackle challenging problems and contribute to data-driven 
            decision making that creates real-world impact.
          </p>
        </div>
      </div>
    </section>;
};
export default AboutSection;