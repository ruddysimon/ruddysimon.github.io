import { useViewportFade } from "@/hooks/use-viewport-fade";

const ProjectsSection = () => {
  const { ref, opacity } = useViewportFade();

  const focusAreas = [
    {
      title: "Modeling and automation",
      description: "I built a full-stack machine learning product that blends automation, rule-based logic, and NLP modeling to bring consistency to default-rate predictions and streamline loan processing. Identifying payroll deposits from raw transaction text is one of the toughest problems in financial data they're inconsistent, vary across banks, and often overlap with other recurring transactions.\n\nTo solve this, I developed a BERT-based NLP model trained on large payroll datasets to accurately detect payroll strings, combined with an automated logic layer that verifies pay frequency and filters false positives. The workflow achieves around 85–90% accuracy, cutting manual review time and giving sales and underwriting teams a faster, more reliable view of a customer's financial health.",
    },
  ];

  return (
    <section ref={ref} id="projects" className="flex items-center justify-center p-8 py-16 transition-opacity duration-300" style={{ opacity }}>
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl md:text-3xl font-medium tracking-wide mb-12" style={{ color: 'hsl(45, 25%, 95%)' }}>
          Where My Focus Has Been
        </h2>
        
        <div className="space-y-6">
          {focusAreas.map((area, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-xl backdrop-blur-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              style={{ 
                backgroundColor: 'rgba(30, 45, 55, 0.55)',
                borderColor: 'rgba(80, 160, 180, 0.4)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(100, 180, 200, 0.25) inset'
              }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-5" style={{ color: 'hsl(180, 60%, 68%)' }}>
                {area.title}
              </h3>
              <p 
                className="text-sm md:text-base leading-relaxed font-normal whitespace-pre-line" 
                style={{ color: 'hsl(45, 20%, 93%)' }}
              >
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
