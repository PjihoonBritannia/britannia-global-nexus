
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users, Shield } from "lucide-react";

const EsgHighlight = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const esgCategories = [
    {
      title: "Environmental",
      icon: <Globe size={24} />,
      description: "Minimizing environmental impact and pursuing sustainable business practices"
    },
    {
      title: "Social",
      icon: <Users size={24} />,
      description: "Creating social value through diversity and talent development"
    },
    {
      title: "Governance",
      icon: <Shield size={24} />,
      description: "Building trust through transparent governance and ethical management"
    }
  ];

  // Track section visibility for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
    
    // Auto rotate tabs every 4 seconds
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % esgCategories.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-base-dark to-black text-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-40 h-40 rounded-full bg-point/10 blur-xl"></div>
        <div className="absolute bottom-[10%] right-[5%] w-60 h-60 rounded-full bg-blue-500/10 blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div 
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="mb-2 w-16 h-1 bg-point mx-auto"></div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            ESG Commitment
          </h2>
          <p className="text-lg mb-10 font-light">
            Britannia integrates transparent governance, social responsibility, and environmental considerations into our business practices. Sustainability principles are reflected in all our business decisions and advisory services.
          </p>
          
          {/* Interactive ESG Categories */}
          <div className="mb-6 flex justify-center gap-3">
            {esgCategories.map((category, index) => (
              <button 
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === index 
                    ? 'bg-point text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-[35px] p-10 mb-10 transition-all duration-500">
            <div className="flex flex-col items-center mb-6">
              <div className={`text-point mb-4 transform transition-all duration-300 ${
                isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
              }`}>
                {esgCategories[activeTab].icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{esgCategories[activeTab].title}</h3>
              <p className="text-white/80 max-w-lg text-center">
                {esgCategories[activeTab].description}
              </p>
            </div>
            
            <div className="w-full bg-white/20 h-1 rounded-full mb-6">
              <div 
                className="bg-point h-1 rounded-full transition-all duration-300"
                style={{ width: `${((activeTab + 1) / esgCategories.length) * 100}%` }}
              ></div>
            </div>
            
            <Button 
              asChild 
              className="bg-white text-gray-900 hover:bg-gray-100 hover-lift"
              variant="secondary"
            >
              <Link to="/esg" className="inline-flex items-center">
                Learn more about our ESG philosophy
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EsgHighlight;
