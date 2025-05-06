
import { Handshake } from "lucide-react";
import SectionTitle from "./SectionTitle";

const UkPropertyPartnership = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Your Partners in London: Britannia Global Nexus & Oliver James" 
          subtitle="A strategic alliance delivering seamless property solutions"
          align="center"
        />
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Handshake size={48} className="text-gray-800" />
          </div>
          
          <p className="text-gray-700 mb-10 leading-relaxed">
            Britannia Global Nexus and Oliver James London have established a strategic partnership that combines Britannia's deep understanding of Korean investors' needs with Oliver James's extensive expertise in London's prime property market. This alliance enables us to offer a seamless, end-to-end service that bridges cultural and market gaps, ensuring Korean clients receive both strategic investment guidance and flawless execution throughout the property acquisition or sale process.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="flex flex-col items-center">
              <img 
                src="/lovable-uploads/0992f3de-9abe-4580-ba52-44d85d0cc000.png" 
                alt="Britannia Global Nexus" 
                className="h-16 mb-3"
              />
              <p className="text-sm text-gray-600">Strategic Advisory & Korean Client Focus</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-16 mb-3 flex items-center justify-center">
                <p className="text-gray-800 font-semibold">Oliver James London</p>
              </div>
              <p className="text-sm text-gray-600">Prime London Property Specialists</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UkPropertyPartnership;
