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
        <div className="space-y-6">
          {focusAreas.map((area, index) => (
            <div key={index} className="relative">
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
                className="relative p-8 md:p-12 rounded-xl"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-5" style={{ color: 'hsl(180, 60%, 68%)' }}>
                  {area.title}
                </h3>
                <p 
                  className="text-sm md:text-base leading-relaxed font-normal whitespace-pre-line" 
                  style={{ color: 'hsl(45, 30%, 85%)' }}
                >
                  {area.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
