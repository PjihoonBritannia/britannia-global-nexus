
import { useRef, useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";
import Card from "@/components/Card";
import { MapPin } from "lucide-react";

const UkPropertyAreas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const areas = [
    {
      title: "Mayfair",
      description: "London's most prestigious address, offering unparalleled luxury, world-class dining, and exceptional investment stability with consistent premium valuation.",
      imageUrl: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=600"
    },
    {
      title: "Marylebone",
      description: "A sophisticated urban village combining period architecture with contemporary amenities, attracting discerning residents seeking central living with neighborhood charm.",
      imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=600"
    },
    {
      title: "Kensington",
      description: "Historic elegance and cultural richness with world-renowned museums, royal gardens, and exceptional schools, offering enduring appeal to international investors.",
      imageUrl: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?q=80&w=600"
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
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-30 bg-gradient-to-b from-bg-cream to-base-light">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Key Areas of Focus" 
          subtitle="Prime London neighborhoods with exceptional investment potential"
          align="center"
        />
        
        <div className="grid md:grid-cols-3 gap-10 mt-14">
          {areas.map((area, index) => (
            <div 
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Card
                key={index}
                title={area.title}
                description={area.description}
                icon={<MapPin size={24} className="text-point" />}
                imageUrl={area.imageUrl}
              />
            </div>
          ))}
        </div>
        
        {/* Interactive Map Element */}
        <div 
          className={`mt-20 p-8 bg-white rounded-[35px] shadow-lg hover-lift transition-all duration-500 relative overflow-hidden ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-point via-yellow-400 to-blue-500"></div>
          
          <h3 className="text-xl font-bold mb-4">Interactive London Property Map</h3>
          <p className="text-gray-700 mb-6 font-light">
            Explore prime London neighborhoods with our interactive map highlighting current market trends, average property values, and investment opportunities across the city's most prestigious areas.
          </p>
          
          <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1529528744093-6f8abeee511d?q=80&w=1000" 
              alt="London Map" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-lg">
                <p className="font-medium">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UkPropertyAreas;
