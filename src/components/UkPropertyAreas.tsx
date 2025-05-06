
import SectionTitle from "./SectionTitle";
import Card from "@/components/Card";
import { MapPin } from "lucide-react";

const UkPropertyAreas = () => {
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

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Key Areas of Focus" 
          subtitle="Prime London neighborhoods with exceptional investment potential"
          align="center"
        />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {areas.map((area, index) => (
            <Card
              key={index}
              title={area.title}
              description={area.description}
              icon={<MapPin size={24} />}
              imageUrl={area.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UkPropertyAreas;
