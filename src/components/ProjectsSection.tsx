const ProjectsSection = () => {
  const projects = [
    {
      title: "Predictive Analytics Platform",
      description: "Built a scalable ML platform for forecasting customer behavior using Python, TensorFlow, and AWS.",
      tags: ["Python", "TensorFlow", "AWS", "Machine Learning"],
    },
    {
      title: "Real-time Data Pipeline",
      description: "Designed and implemented real-time data processing pipeline handling 1M+ events per day.",
      tags: ["Apache Kafka", "Spark", "Python", "SQL"],
    },
    {
      title: "Customer Segmentation Model",
      description: "Developed clustering algorithms to segment customers, improving marketing ROI by 30%.",
      tags: ["Python", "scikit-learn", "K-means", "Data Visualization"],
    },
  ];

  return (
    <section id="projects" className="flex items-center justify-center p-8 py-16">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-12">Projects</h2>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="group">
              <h3 className="text-lg md:text-xl font-medium text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed font-light text-foreground/80 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
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

export default ProjectsSection;
