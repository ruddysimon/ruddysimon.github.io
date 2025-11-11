import { useViewportFade } from "@/hooks/use-viewport-fade";

const SectionDivider = () => {
  const { ref, opacity } = useViewportFade();

  return (
    <div ref={ref} className="w-full py-4 flex items-center justify-center transition-opacity duration-300" style={{ opacity }}>
      <div 
        className="w-full max-w-4xl h-px" 
        style={{ 
          background: 'linear-gradient(to right, transparent, hsl(180, 45%, 45%, 0.4), transparent)' 
        }} 
      />
    </div>
  );
};

export default SectionDivider;
