const ExperienceSection = () => {
  const experiences = [
    {
      title: "Senior Data Scientist",
      company: "Tech Company",
      period: "2022 - Present",
      description: "Leading data science initiatives and developing machine learning models for production systems.",
    },
    {
      title: "Data Scientist",
      company: "Analytics Firm",
      period: "2020 - 2022",
      description: "Built predictive models and implemented data pipelines for business intelligence.",
    },
    {
      title: "Junior Data Analyst",
      company: "Startup Inc",
      period: "2018 - 2020",
      description: "Performed data analysis and created visualizations to support business decisions.",
    },
  ];

  return (
    <section id="experience" className="flex items-center justify-center p-8 py-16">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-12">Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="border-l-2 border-primary/30 pl-6 pb-8 last:pb-0">
              <h3 className="text-lg md:text-xl font-medium text-foreground">{exp.title}</h3>
              <p className="text-sm text-primary font-light mt-1">{exp.company}</p>
              <p className="text-xs text-foreground/60 mt-1">{exp.period}</p>
              <p className="text-sm md:text-base leading-relaxed font-light text-foreground/80 mt-3">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
