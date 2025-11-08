import { User } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="rounded-2xl bg-card border border-border backdrop-blur-md p-8 md:p-12" style={{ backgroundColor: 'hsl(var(--glass-background))' }}>
          <div className="flex items-center gap-3 mb-6">
            <User className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          </div>
          
          <div className="space-y-4 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              I'm a passionate data scientist with expertise in machine learning, statistical analysis, 
              and data visualization. With a strong foundation in mathematics and computer science, 
              I transform complex data into actionable insights.
            </p>
            
            <p className="text-lg leading-relaxed">
              My work focuses on developing innovative solutions using cutting-edge technologies 
              and methodologies. I'm experienced in Python, R, SQL, and various machine learning 
              frameworks including TensorFlow and scikit-learn.
            </p>
            
            <p className="text-lg leading-relaxed">
              I'm always eager to tackle challenging problems and contribute to data-driven 
              decision making that creates real-world impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
